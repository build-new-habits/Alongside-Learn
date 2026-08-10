# Alongside: Learn — Master Schedule
## 10 Aug 2026 v9

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| GitHub Pages | **Live** at `build-new-habits.github.io/Alongside-Learn/` — real browser preview available for the first time today. |
| Infrastructure | Scaffold, schema (v3), Supabase (RLS confirmed, all 3 migrations run), Mood Meter, safeguarding assessment, auth, family creation/join — all built. Sign-up bug (below) fixed same session. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Bug found and fixed today — first real browser test

**What happened:** Graeme tried to sign up in the live browser preview and got `new row violates row-level security policy for table "profiles"`.

**Root cause:** the Supabase project requires email confirmation. `signUp()` returns a user object immediately, but no active session until the email is confirmed. The code was checking the wrong thing (`!userId`, which is basically always true) to decide whether to defer profile creation, so it tried to write the profile row with no authenticated session — RLS correctly rejected it.

**Fix:** now checks the actual session, stashes name/date-of-birth in the Supabase auth user's metadata at sign-up, and creates the profile row via a new `ensureProfile()` function — called either immediately (if no confirmation needed) or on first real sign-in (if it was). Fixed and pushed same session, no SQL change needed.

**Also fixed:** `.field` CSS only styled `input[type="text"]`, so email/password/date inputs rendered as unstyled browser defaults while only the Name field got the intended look — this is what Graeme saw as "aesthetics off." Broadened the selector to cover all input types used in the app, and added a page container (max-width, centred, padded) so desktop/tablet views don't stretch edge-to-edge. Both were genuine bugs, not just early-build roughness, and worth fixing immediately rather than deferring — a broken sign-up blocks everything downstream, and a mis-scoped CSS selector would have silently affected every future form too.

**Open question for Graeme, not urgent:** the project currently requires email confirmation. For a small trusted-families beta this adds a step (checking email, clicking a link) that may not be necessary — Supabase Dashboard → Authentication → Providers → Email → toggle "Confirm email" off, if you'd rather beta families skip that step. No action needed unless you want it changed.

---

## 2. Right now — retest signup

Worth trying sign-up again in the browser now that the fix is live (may need a hard refresh — Ctrl+Shift+R / Cmd+Shift+R — since GitHub Pages can cache briefly). If the same email from the failed attempt won't work a second time, try a fresh one — the first attempt likely created an auth user without a profile.

---

## 3. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅, RLS ✅, Journal Privacy Rule ✅, auth ✅ (bug fixed), family creation/join ✅. Parent dashboard — next item.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system.

---

## 4. Build windows

- **Window A** (10–18 Aug): infrastructure ✅, check-in ✅, Mood Meter ✅, auth ✅ (bug fixed), family creation/join ✅, GitHub Pages live ✅. Remaining: parent dashboard, safeguarding copy sign-off.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy, safeguarding copy review — browser preview means these can now be checked visually on the phone too.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1–v8 | 10 Aug 2026 | See `Past MS/`. |
| v9 | 10 Aug 2026 | GitHub Pages enabled — first real browser test. Found and fixed a sign-up-blocking RLS bug (email-confirmation session timing) and a CSS field-styling bug. Flagged the email-confirmation-on-by-default setting as an optional simplification for Graeme to consider. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v9*
