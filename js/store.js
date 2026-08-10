// Alongside: Learn — Data store
// 10 Aug 2026 v8
// Schema-first discipline (file 07 §4): this file must never read/write a
// field that isn't documented in Documents/Admin/schema.md.
//
// Supabase project: Frankfurt (eu-central-1), separate from Move.
// Uses the publishable key only — safe to be public, RLS enforces access
// control server-side. Never put the service_role key here.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://jbajchcwnbqughesaepc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_z1NROY5jf7O_i-jJzgF3DQ_8ggpTe5N';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

/**
 * Writes a learner check-in row. Free-tier fields always sent; stress/free_text
 * only sent if provided (Athena-gated per file 04 §2, nullable in schema).
 * Returns the inserted row, or throws — caller handles UI error state.
 */
export async function submitCheckin({ userId, energy, moodQuadrant, moodWord, sleep, stress, freeText, subjectFocus }) {
  const payload = {
    user_id: userId,
    date: new Date().toISOString().slice(0, 10),
    energy,
    mood_quadrant: moodQuadrant,
    mood_word: moodWord,
    sleep,
    stress: stress ?? null,
    free_text: freeText ?? null,
    subject_focus: subjectFocus ?? null,
  };
  const { data, error } = await supabase.from('checkins').insert(payload).select().single();
  if (error) throw error;
  return data;
}

/**
 * Updates the derived safeguarding_level on learner_profiles after a check-in
 * is scanned. Tier-agnostic function per file 05 §5 — the detection logic
 * itself never checks tier, only whether the triggering fields were present.
 */
export async function updateSafeguardingLevel(userId, level) {
  const { error } = await supabase
    .from('learner_profiles')
    .update({ safeguarding_level: level })
    .eq('user_id', userId);
  if (error) throw error;
}

// --- Parent dashboard reads --------------------------------------------
// All of these rely on RLS already granted in sql/001 (assignments,
// flashcards, revision_timetable_entries: same_family + is_parent SELECT
// policy) and sql/001's risk_matrix_parent_view (masked columns only —
// never exposes risk_matrices.subject_confidence directly, see schema.md §2).

export async function fetchFamily(familyId) {
  const { data, error } = await supabase
    .from('families')
    .select('family_id, learner_ids, parent_ids, tier')
    .eq('family_id', familyId)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchProfiles(userIds) {
  if (!userIds || userIds.length === 0) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, name, role, date_of_birth')
    .in('user_id', userIds);
  if (error) throw error;
  return data;
}

export async function fetchAssignments(learnerId) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('learner_id', learnerId)
    .order('due_date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchRiskSummary(learnerId) {
  const { data, error } = await supabase
    .from('risk_matrix_parent_view')
    .select('parent_facing_summary')
    .eq('learner_id', learnerId)
    .maybeSingle();
  if (error) return null; // fail quiet here — a missing summary isn't an error state
  return data;
}

// --- Learner assignment writes ------------------------------------------
// RLS: assignments_learner_all policy (sql/001) already grants the learner
// full CRUD on their own rows — nothing new needed server-side.

export async function createAssignment({ learnerId, subject, title, dueDate }) {
  const { error } = await supabase.from('assignments').insert({
    learner_id: learnerId,
    subject: subject || null,
    title,
    due_date: dueDate || null,
    status: 'not started',
  });
  if (error) throw error;
}

export async function updateAssignmentStatus(assignmentId, status) {
  const { error } = await supabase.from('assignments').update({ status }).eq('assignment_id', assignmentId);
  if (error) throw error;
}

// --- Flashcards -----------------------------------------------------------
// RLS: flashcards_learner_all policy (sql/001) grants the learner full CRUD
// on their own rows. next_review_date is the only spacing data stored —
// interval is derived at review time, not stored, matching the "derived not
// stored" pattern already used for phase calculation (schema.md §3).

export async function createFlashcard({ learnerId, subject, topic, question, answer }) {
  const today = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from('flashcards').insert({
    learner_id: learnerId,
    subject: subject || null,
    topic: topic || null,
    question,
    answer,
    next_review_date: today,
    coach_suggested: false,
  });
  if (error) throw error;
}

export async function fetchAllFlashcards(learnerId) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('learner_id', learnerId)
    .order('next_review_date', { ascending: true });
  if (error) throw error;
  return data;
}

export async function fetchDueFlashcards(learnerId) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('learner_id', learnerId)
    .lte('next_review_date', today)
    .order('next_review_date', { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Simple spaced-repetition step. No interval is stored — derived from the gap
 * between the card's last scheduled date and today. Correct doubles that gap
 * (min 1 day, capped at 30); incorrect resets to 1 day. A real algorithm
 * (SM-2 or similar) is a reasonable future improvement, not needed for beta.
 */
export async function reviewFlashcard(card, wasCorrect) {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  let nextDate;

  if (!wasCorrect) {
    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + 1);
  } else {
    const lastScheduled = new Date(card.next_review_date);
    const gapDays = Math.max(1, Math.round((today - lastScheduled) / (1000 * 60 * 60 * 24)));
    const nextGap = Math.min(30, Math.max(1, gapDays * 2));
    nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + nextGap);
  }

  const { error } = await supabase
    .from('flashcards')
    .update({ next_review_date: nextDate.toISOString().slice(0, 10) })
    .eq('card_id', card.card_id);
  if (error) throw error;
}

// --- Revision timetable -----------------------------------------------
// RLS: revision_timetable_learner_all (learner full CRUD on own rows) and
// revision_timetable_parent_select (parent read-only, same family) — both
// from sql/001, nothing new needed server-side.

export async function createRevisionEntry({ learnerId, subject, scheduledAt }) {
  const { error } = await supabase.from('revision_timetable_entries').insert({
    learner_id: learnerId,
    subject: subject || null,
    scheduled_at: scheduledAt,
    coach_generated: false,
  });
  if (error) throw error;
}

export async function fetchRevisionEntries(learnerId) {
  const { data, error } = await supabase
    .from('revision_timetable_entries')
    .select('*')
    .eq('learner_id', learnerId)
    .order('scheduled_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function deleteRevisionEntry(entryId) {
  const { error } = await supabase.from('revision_timetable_entries').delete().eq('entry_id', entryId);
  if (error) throw error;
}
