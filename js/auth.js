// Alongside: Learn — Auth
// 10 Aug 2026 v1
// Email/password sign-up and login via Supabase Auth, plus the matching
// `profiles` row (schema.md §1). Family creation and learner-invite flow are
// NOT built this session — flagged, not hidden. A sign-up here creates a
// profile with family_id = null; family assignment is next-session work.

import { supabase } from './store.js';

/**
 * @param {{ email: string, password: string, name: string, dateOfBirth: string }} input
 * Role is intentionally not set here — it's determined by whichever of
 * createFamily() (role becomes 'parent') or joinFamily() (role passed in)
 * the person completes next, in the family-setup step.
 *
 * FIXED 10 Aug 2026: this project requires email confirmation, so signUp()
 * returns a user object but NO session until the email is confirmed. The
 * original code checked `!userId` to decide whether to defer profile
 * creation — userId is basically always present, so it tried to insert the
 * profile immediately with no active session, and RLS correctly rejected it
 * (auth.uid() is null with no session). Now checks the actual session, and
 * stashes name/DOB in the auth user's metadata so ensureProfile() can create
 * the profile row on first real sign-in instead.
 */
export async function signUp({ email, password, name, dateOfBirth }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, date_of_birth: dateOfBirth || null } },
  });
  if (authError) throw authError;

  if (!authData.session) {
    return { pendingConfirmation: true };
  }

  await ensureProfile(authData.user);
  return { pendingConfirmation: false, userId: authData.user.id };
}

/**
 * Creates the profile row if it doesn't exist yet — covers both a normal
 * sign-up (session available immediately) and the email-confirmation case
 * (profile wasn't created at sign-up time, created here on first real sign-in
 * instead). Reads name/date_of_birth from auth user_metadata, set during
 * signUp() above.
 */
export async function ensureProfile(user) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();
  if (existing) return;

  const { error } = await supabase.from('profiles').insert({
    user_id: user.id,
    family_id: null,
    role: null,
    name: user.user_metadata?.name || user.email,
    date_of_birth: user.user_metadata?.date_of_birth || null,
    coach_voice: 'nurturing',
  });
  if (error) throw error;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  await ensureProfile(data.user);
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
    familyId: profile.family_id,
    role: profile.role,
    tier,
    ageBand: calculateAgeBand(profile.date_of_birth),
  };
}

/**
 * Creates a new family and makes the current user its first parent.
 * Server-side RPC (sql/003_family_join.sql) — atomic, enforces role='parent'
 * on the profile as a side effect.
 * @returns {Promise<string>} the new family_id, to be shared as the invite code
 */
export async function createFamily(academicYearStart) {
  const { data, error } = await supabase.rpc('create_family', {
    academic_year_start_input: academicYearStart || null,
  });
  if (error) throw error;
  return data;
}

/**
 * Joins an existing family using its family_id as the invite code.
 * Server-side RPC enforces the 2-parent / 5-learner caps (file 03 §3).
 * @param {string} familyId
 * @param {'parent'|'learner'} role
 */
export async function joinFamily(familyId, role) {
  const { error } = await supabase.rpc('join_family', {
    family_id_input: familyId,
    join_as_role: role,
  });
  if (error) throw error;
}

function calculateAgeBand(dateOfBirth) {
  if (!dateOfBirth) return 'teen'; // safest default — most Learn users are 13-17 (file 06 §2)
  const dob = new Date(dateOfBirth);
  const ageMs = Date.now() - dob.getTime();
  const age = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 365.25));
  return age >= 18 ? 'adult' : 'teen';
}
