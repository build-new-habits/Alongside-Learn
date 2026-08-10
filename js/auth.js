// Alongside: Learn — Auth
// 10 Aug 2026 v1
// Email/password sign-up and login via Supabase Auth, plus the matching
// `profiles` row (schema.md §1). Family creation and learner-invite flow are
// NOT built this session — flagged, not hidden. A sign-up here creates a
// profile with family_id = null; family assignment is next-session work.

import { supabase } from './store.js';

/**
 * @param {{ email: string, password: string, name: string, role: 'parent'|'learner', dateOfBirth: string }} input
 */
export async function signUp({ email, password, name, role, dateOfBirth }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) {
    // Email confirmation may be required before a session exists — the
    // profile row is created on first sign-in instead, via ensureProfile().
    return { pendingConfirmation: true };
  }

  const { error: profileError } = await supabase.from('profiles').insert({
    user_id: userId,
    family_id: null, // TODO: family creation/invite flow — next session
    role,
    name,
    date_of_birth: dateOfBirth || null,
    coach_voice: 'nurturing',
  });
  if (profileError) throw profileError;

  return { pendingConfirmation: false, userId };
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Returns the current authenticated user, or null. */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

/**
 * Fetches the profile row for a user, and — if it has a family — the
 * family's tier, to build the check-in context (js/checkin.js's ctx shape).
 * Returns null if no profile exists yet.
 */
export async function loadCheckinContext(userId) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('user_id, family_id, role, date_of_birth')
    .eq('user_id', userId)
    .single();
  if (profileError || !profile) return null;

  let tier = 'athena'; // default during beta — no pricing/paywall yet (master_schedule.md §1)
  if (profile.family_id) {
    const { data: family } = await supabase
      .from('families')
      .select('tier')
      .eq('family_id', profile.family_id)
      .single();
    if (family) tier = family.tier;
  }

  return {
    userId: profile.user_id,
    tier,
    ageBand: calculateAgeBand(profile.date_of_birth),
  };
}

function calculateAgeBand(dateOfBirth) {
  if (!dateOfBirth) return 'teen'; // safest default — most Learn users are 13-17 (file 06 §2)
  const dob = new Date(dateOfBirth);
  const ageMs = Date.now() - dob.getTime();
  const age = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 365.25));
  return age >= 18 ? 'adult' : 'teen';
}
