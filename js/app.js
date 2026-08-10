// Alongside: Learn — App entry point
// 10 Aug 2026 v2
// Bootstraps the check-in flow. No auth yet — TEMP hardcoded test context,
// flagged clearly, must be replaced once Supabase Auth is wired in.

import { renderCheckin, renderAlwaysOnResources } from './checkin.js';

const TEMP_TEST_CONTEXT = {
  // TODO: replace with real authenticated user once auth is built.
  // This UUID will not exist in the profiles table until a test row is
  // manually inserted — check-in submission will fail against real Supabase
  // until then. Safe for UI/logic testing, not for real data yet.
  userId: '00000000-0000-0000-0000-000000000000',
  tier: 'athena', // set to 'free' to test the free-tier-only field set
  ageBand: 'teen',
};

const checkinContainer = document.getElementById('checkin-root');
if (checkinContainer) {
  renderCheckin(checkinContainer, TEMP_TEST_CONTEXT);
}

const resourcesContainer = document.getElementById('resources-root');
if (resourcesContainer) {
  renderAlwaysOnResources(resourcesContainer);
}
