# Alongside: Learn — Master Schedule
## 10 Aug 2026 v7

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Stack | Vanilla JS PWA, Supabase (Frankfurt, RLS confirmed) |
| Mood Meter | **Built.** Real Marc Brackett word-picker, teen-adjusted set as default, adult set included. Resolves the v6 gap — Learn's detection method now matches the shared family policy's word-based mechanism instead of diverging from it. |
| Safeguarding assessment | Unified across mood word + free text + stress in `js/safeguarding.js`. Functional, not yet reviewed. |
| Auth | **Built.** Sign-up/login/logout via Supabase Auth, creates a `profiles` row. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Action needed from Graeme — right now

**Run `sql/002_mood_meter.sql`** in the Supabase SQL Editor — same process as before (SQL Editor → New query → paste → Run). It replaces the old numeric `mood` column with `mood_quadrant` + `mood_word`. Safe to run any time, no live data exists yet. Sanity check included in the file's comments.

Everything else from today (auth, Mood Meter code, safeguarding logic) is already live in the repo and doesn't need anything from you to deploy — it needs this one migration to actually work end-to-end.

---

## 2. What's built vs. what's next

**Built today (session 2):**
- Marc Brackett Mood Meter word-picker (`js/data/mood-meter.js`), teen set default, adult set included for future parent-facing use
- Unified safeguarding assessment (`js/safeguarding.js`) combining mood word, free text, and stress into one level, replacing the ad-hoc logic from session 1
- Supabase Auth: sign-up, sign-in, sign-out, session check on load (`js/auth.js`), wired into `app.js` with a real (if minimal) sign-up/login form
- `schema.md` v2 — corrected the `user`→`profiles` naming drift from session 1 and documented the new mood fields

**Known gaps, flagged not hidden:**
- No family creation / learner-invite flow yet — a new sign-up gets a profile with `family_id = null`. Parent dashboard and multi-learner switching depend on this.
- Combination-flag mood words (e.g. "overwhelmed") only check the current check-in for a second signal, not recent history — file 06 allows a recent-history window; that needs a Supabase query not yet built.
- Adult-facing safeguarding response copy not written (teen-only so far, correctly prioritised since teen is Learn's primary audience).
- Role is hardcoded to `'learner'` on sign-up — role selection needs the family/invite flow to make sense.

**Still needs Graeme's sign-off, not a build task:** the actual wording of the fixed safeguarding response messages (Level 2/3), and the mood-word-to-safeguarding-level mapping documented in `js/safeguarding.js`'s header comment — both are functional first-pass drafts.

---

## 3. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅ built (Mood Meter + free text + stress, unified), needs copy/mapping sign-off. Fixed response + resources ✅ built. RLS ✅ live. Journal Privacy Rule ✅ enforced. **Auth ✅ built** — was the last beta-blocking infrastructure gap. **Family/invite flow — now the next beta-blocking item**, since a beta family can't actually function as a family without it.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall.

---

## 4. Build windows

- **Window A** (10–18 Aug): infrastructure ✅, coach shell + check-in ✅, Mood Meter ✅, auth ✅. Remaining: family creation/invite flow, parent dashboard start, safeguarding copy sign-off.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy, safeguarding copy review.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1–v6 | 10 Aug 2026 | See `Past MS/`. |
| v7 | 10 Aug 2026 | Mood Meter word-picker built (resolves v6 gap), unified safeguarding assessment, Supabase Auth built, schema v2 (naming fix + mood fields). Flagged: family/invite flow is the next beta-blocking item. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v7*
