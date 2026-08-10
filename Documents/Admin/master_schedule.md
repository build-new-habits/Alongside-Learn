# Alongside: Learn — Master Schedule
## 10 Aug 2026 v8

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Infrastructure | Scaffold, schema (v3), Supabase (RLS confirmed), Mood Meter, unified safeguarding assessment, auth, **family creation + invite-code join** — all built and live. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

**End-to-end signup → family → check-in flow is now functionally complete.** This is the first point where a real person could plausibly sign up, create or join a family, and do a check-in with safeguarding detection active — pending the action below and the copy/mapping sign-off already flagged in v7.

---

## 1. Action needed from Graeme — right now

**Run `sql/003_family_join.sql`** in the Supabase SQL Editor (after 001 and 002, which are done). Adds: family creation and invite-code join as two server-side functions, plus a missing INSERT policy on `families` that was a gap from session 1. Sanity check included in the file.

**How the invite code works, so you know what to expect:** when a parent creates a family, the app shows them the family's ID (a long code) to text/share with whoever's joining — co-parent or learners. There's no email-invite system this session; for a handful of trusted beta families, sharing a code directly is proportionate. Flagged if this needs to become a proper invite-link system later.

---

## 2. What's built vs. what's next

**Built today (session 3, continuing session 2):**
- Family creation (`create_family` RPC) — first parent, gets a shareable code
- Join-by-code flow (`join_family` RPC) — enforces 2-parent/5-learner caps
- `app.js` now routes: signed out → auth form; signed in, no family → family setup; signed in with family → check-in
- `schema.md` v3 documents both RPCs and the now-nullable `profiles.role`

**Known gaps, flagged not hidden:**
- Invite mechanism is a raw shared code, not an email/link system
- Family-join isn't fully race-safe under simultaneous concurrent joins — fine at beta scale, needs hardening if it grows
- No parent dashboard yet — a parent who joins a family has nowhere to see their learners' data yet, even though the RLS policies from session 1 already support it
- Role selection during "join" trusts the person to pick correctly (learner vs parent) — no verification step

**Still needs Graeme's sign-off, not a build task (carried from v7):** safeguarding response copy, mood-word-to-level mapping.

---

## 3. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅, RLS ✅, Journal Privacy Rule ✅, auth ✅, family creation/join ✅. **Parent dashboard is now the next beta-blocking item** — a family isn't really usable as a family until a parent can see something.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system (upgrade from shared-code).

---

## 4. Build windows

- **Window A** (10–18 Aug): infrastructure ✅, check-in ✅, Mood Meter ✅, auth ✅, family creation/join ✅. Remaining: parent dashboard, safeguarding copy sign-off.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy, safeguarding copy review.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1–v7 | 10 Aug 2026 | See `Past MS/`. |
| v8 | 10 Aug 2026 | Family creation + invite-code join built (`sql/003_family_join.sql`, `js/family-setup.js`). Signup → family → check-in flow now end-to-end functional pending copy sign-off. Parent dashboard flagged as next beta-blocking item. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v8*
