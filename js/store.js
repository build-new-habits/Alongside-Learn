// Alongside: Learn — Data store
// 10 Aug 2026 v2
// Schema-first discipline (file 07 §4): this file must never read a field
// that isn't documented in Documents/Admin/schema.md.
//
// Supabase project: Frankfurt (eu-central-1), separate from Move.
// Uses the publishable ("anon") key only — this is safe to be public, RLS
// enforces access control server-side. Never put the service_role key here.

const SUPABASE_URL = 'https://jbajchcwnbqughesaepc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_z1NROY5jf7O_i-jJzgF3DQ_8ggpTe5N';

// TODO: import the Supabase JS client and initialise:
// import { createClient } from '@supabase/supabase-js';
// export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const store = {
  supabaseUrl: SUPABASE_URL,
};
