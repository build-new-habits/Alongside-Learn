// Alongside: Learn — Auth
// 10 Aug 2026 v2
// Email/password sign-up and login via Supabase Auth, plus the matching
// `profiles` row (schema.md §1).
//
// CHANGED 10 Aug 2026: sign-up now accepts an optional family code + role
// directly, per Graeme's feedback — previously joining a family was a
// separate step after account creation (create account -> confirm email ->
// sign in -> navigate to family setup -> join), which is one step too many.
// The code/role are stashed in the auth user's metadata at sign-up time
// (same pattern as name/DOB) and consumed automatically by ensureProfile()
// on first real sign-in, since a session doesn't exist yet if email
// confirmation is required — there's nowhere to write the join immediately.

import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './store.js';

/**
 * @param {{ email: string, password: string, name: string, dateOfBirth: string,
 *   familyCode?: string, joinRole?: 'parent'|'learner' }} input
 * If familyCode is omitted, behaviour is unchanged — profile is created with
 * no family, and the person goes through family-setup.js afterwards
 * (creating a new family, or joining one, at that point instead).
 */
export async function signUp({ email, password, name, dateOfBirth, familyCode, joinRole }) {
  // Fire-and-forget, 10 Aug 2026: notifies the real account holder if this
  // email is already registered, without telling the person on screen
  // anything different — see supabase/functions/notify-existing-account for
  // why this is the secure way to do it. Never awaited, never lets an error
  // here affect the actual sign-up flow.
  // NOTE: the Edge Function is named "notify-existing-account" in the
  // Supabase dashboard, but its actual URL slug ended up as "quick-handler"
  // (a dashboard quirk — display name and URL slug aren't always the same
  // field). Pointing at the real deployed URL rather than making Graeme
  // recreate the function a third time to match.
  fetch(`${SUPABASE_URL}/functions/v1/quick-handler`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}` },
    body: JSON.stringify({ email }),
  }).catch(() => {});

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // FIXED 10 Aug 2026: without this, supabase-js defaults the
      // confirmation link's redirect to window.location.origin, which is
      // ONLY protocol+host — it silently drops the /Alongside-Learn/ path,
      // even though the Supabase dashboard's Site URL is set correctly.
      // That default is what produced the 404 (redirected to
      // build-new-habits.github.io/ instead of .../Alongside-Learn/), on a
      // genuinely fresh sign-up — not a stale-link issue as first suspected.
      emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
      data: {
        name,
        date_of_birth: dateOfBirth || null,
        pending_family_code: familyCode || null,
        pending_join_role: joinRole || null,
      },
    },
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
 * signUp() above. If a family code was supplied at sign-up, joins it here too
 * — the one place guaranteed to run exactly once, on first real session.
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

  // Auto-join a family if a code was supplied at sign-up time. Failure here
  // is deliberately non-fatal — the person still has a working account and
  // can join manually via family-setup.js if the code was wrong or the
  // family filled up between sign-up and confirmation.
  const pendingCode = user.user_metadata?.pending_family_code;
  const pendingRole = user.user_metadata?.pending_join_role;
  if (pendingCode && pendingRole) {
    try {
      await joinFamily(pendingCode, pendingRole);
    } catch (joinErr) {
      console.error('Auto-join from sign-up failed, falling back to manual family setup:', joinErr);
    }
  }
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

/**
 * Resends the sign-up confirmation email. Needed after the Supabase project's
 * Site URL setting is corrected (see master_schedule.md) — links sent before
 * that fix point at localhost and will always fail, however many times
 * they're clicked. A fresh send after the fix will use the corrected URL.
 */
export async function resendConfirmation(email) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    // Same fix as signUp() above — without this, the resent link would have
    // the same wrong-redirect problem, defaulting to window.location.origin.
    options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` },
  });
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
