// Alongside: Learn — Data store
// 10 Aug 2026 v3
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
export async function submitCheckin({ userId, energy, mood, sleep, stress, freeText, subjectFocus }) {
  const payload = {
    user_id: userId,
    date: new Date().toISOString().slice(0, 10),
    energy,
    mood,
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
