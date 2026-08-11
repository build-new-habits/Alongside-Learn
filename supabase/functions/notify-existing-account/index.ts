// Alongside: Learn — Notify existing account holder
// 10 Aug 2026 v1
//
// Deployed as a Supabase Edge Function. Called by the client on every
// sign-up attempt (js/auth.js), fire-and-forget, response never inspected.
//
// Purpose: when someone tries to sign up with an email that's already
// registered, Supabase deliberately shows the SAME "check your email"
// message as a genuine new sign-up — this prevents account enumeration
// (letting anyone probe which emails are registered). But that leaves a
// real person stuck with no way to know they already have an account.
//
// This function closes that gap the secure way: it checks server-side
// (using the service_role key, which only exists here, never in the
// browser) whether the email already belongs to a confirmed account, and
// if so, emails THAT person directly — not the screen — with a sign-in
// link. Someone who doesn't own the email never sees this message, because
// it goes to an inbox they don't control. The on-screen response to the
// person submitting the form is identical either way, so no enumeration
// signal leaks through the UI.
//
// KNOWN LIMITATION: uses auth.admin.listUsers() and filters client-side in
// this function, since paginated admin listing is what's reliably available
// — fine at beta scale (a handful of families), would need a more targeted
// lookup if the user base grows significantly.
//
// KNOWN LIMITATION: no rate limiting on this endpoint yet — someone could
// repeatedly "attempt sign-up" with a stranger's email to send them
// repeated notification emails. Low risk for a small trusted-families beta;
// worth addressing before any wider/public use.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Always return the same generic response, whatever happens inside —
  // this endpoint's job is a side effect (maybe sending an email), never a
  // signal the client should act on differently.
  const genericResponse = () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') return genericResponse();

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: usersPage } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const existing = usersPage?.users?.find(
      u => u.email?.toLowerCase() === email.toLowerCase() && u.email_confirmed_at
    );

    if (existing) {
      const resendKey = Deno.env.get('RESEND_API_KEY');
      if (resendKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Alongside: Learn <noreply@buildnewhabits.co.uk>',
            to: email,
            subject: 'You already have an Alongside: Learn account',
            html: `
              <p>Someone just tried to create a new Alongside: Learn account using this email address — but you already have one.</p>
              <p>If that was you, no problem — <a href="https://build-new-habits.github.io/Alongside-Learn/">sign in</a> instead of creating a new account.</p>
              <p>If it wasn't you, you don't need to do anything. Your account is safe — no one can get into it without your password.</p>
            `,
          }),
        });
      }
    }
  } catch (_err) {
    // Deliberately swallowed — this function must never surface an error
    // state that differs from the "nothing happened" case.
  }

  return genericResponse();
});
