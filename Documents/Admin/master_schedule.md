# Alongside: Learn — Master Schedule
## 10 Aug 2026 v5

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Stack | Vanilla JS PWA, GitHub Pages, Supabase (Frankfurt) |
| Supabase project | **Live and schema applied.** 10 tables, RLS enabled and confirmed on all 10, first-pass family-scoped policies in place. |
| Safeguarding reviewers | Graeme (self, 20+ yrs trained) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

**Window A infrastructure work is done as of today.** Schema, scaffold, and live database are all in place on day one of a 9-day window — ahead of where the plan expected to be. Remaining Window A time goes to actual feature build: coach shell, check-in flow, safeguarding detection.

---

## 1. Decisions log

| # | Decision | Status |
|---|---|---|
| 1 | Launch scope: private beta, trusted families | Confirmed 10 Aug |
| 2 | Stack: vanilla JS PWA + Supabase (Frankfurt, separate project) | Confirmed 10 Aug |
| 3 | Tracker location: `Documents/Admin/master_schedule.md` | In use |
| 4 | Safeguarding reviewers named | Confirmed 10 Aug — engagement/sign-off still to happen |
| 5 | Pricing | Deferred to pre-public-launch |
| 6 | Supabase project created (Frankfurt) | Done 10 Aug |
| 7 | Schema migration run — 10 tables, RLS confirmed on all | **Done 10 Aug** |

---

## 2. Next session — coach shell + check-in flow

Priority order, per the beta-blocking framing already established:

1. Coach shell — coach-speaks-first pattern (file 04 §1), Nurturing voice only
2. Learner daily check-in — free-tier fields first (energy/mood/sleep/subject), writing to `checkins` table
3. Athena-gated fields (stress + free text) with the signal-word scan wired in (file 04 §3) — this is the beta-blocking safeguarding piece, build and manually test it in this same session rather than deferring it
4. Fixed safeguarding response message + always-visible in-app resources (file 06 §3)

Not this session: parent dashboard, notifications, revision timetable, risk matrix — those come after the learner-facing core is solid.

---

## 3. Beta-blocking vs public-launch-blocking (unchanged)

**Beta-blocking:** crisis-signal detection wired and tested, fixed safeguarding response + always-visible resources live, resource links verified, RLS family hard-wall (schema live, needs real adversarial testing once there's real data to test against), Journal Privacy Rule enforced.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall.

---

## 4. Build windows

- **Window A** (10–18 Aug): infrastructure ✅ (scaffold, schema, Supabase, RLS). Remaining: coach shell, check-in flow incl. safeguarding detection, design system components.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1 | 10 Aug 2026 | First master schedule. |
| v2 | 10 Aug 2026 | Launch scope + stack confirmed. |
| v3 | 10 Aug 2026 | Reviewers named, pricing deferred. |
| v4 | 10 Aug 2026 | Scaffold, schema.md, Supabase project created, SQL migration written. |
| v5 | 10 Aug 2026 | Migration run and confirmed — 10 tables live, RLS enabled on all. Window A infrastructure complete. Next session scoped: coach shell + check-in flow, safeguarding detection prioritised. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v5*
