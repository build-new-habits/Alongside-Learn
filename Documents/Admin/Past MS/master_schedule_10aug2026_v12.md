# Alongside: Learn — Master Schedule
## 10 Aug 2026 v12

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Parent dashboard** | **Built.** Shows family learners, upcoming assignments, and the coach-synthesised risk summary. Deliberately does not show mood/energy/sleep detail — that's the database's owner-only RLS rule doing its job, not a missing feature. |
| Role-based routing | **Fixed.** App previously sent every signed-in family member to the learner check-in regardless of role — a parent would have landed on the wrong screen. Now routes parent → dashboard, learner → check-in. |
| Sign-out | Added — needed for testing both roles, useful for real use too. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. What you'll see testing this

Sign in as the parent account (the one that created the family) → you'll now land on a dashboard instead of the check-in. Since no learner has joined yet and no assignments exist, it'll mostly show empty states ("No learners have joined yet", your family code again for reference). That's expected, not broken — worth joining a second (learner) account with the family code to see the dashboard populate with a real name, even though assignments will still be empty until that's built.

---

## 2. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅ (always-reachable), RLS ✅, Journal Privacy Rule ✅, auth ✅, family creation/join ✅, **parent dashboard ✅**, role-based routing ✅.

**Next build items, none launch-blocking on their own:** a way for learners to actually create assignments/flashcards (currently only readable, not writable, from the UI — the dashboard has nothing to show until that exists), notifications, revision timetable.

**Public-launch-blocking (unchanged):** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system, possibly custom SMTP.

---

## 3. Version history

| Version | Date | Change |
|---|---|---|
| v1–v11 | 10 Aug 2026 | See `Past MS/`. |
| v12 | 10 Aug 2026 | Parent dashboard built (learners, assignments, risk summary — no check-in detail, by design). Fixed role-based routing bug (parents were landing on the learner check-in). Sign-out added. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v12*
