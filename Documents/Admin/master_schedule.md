# Alongside: Learn — Master Schedule
## 10 Aug 2026 v15

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Revision timetable** | **Built.** Add/remove sessions (subject + date/time), fourth nav tab. Parent dashboard now shows each learner's next 5 upcoming sessions too. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. What's testable now

Learner: **Revision** tab → add a session with a subject and date/time → it appears in the upcoming list, removable if added by mistake.

Parent: dashboard now shows a third section per learner — upcoming revision sessions alongside assignments and the risk summary. Same visibility rule as assignments (read-only, same family).

---

## 2. Where the build stands — full picture

The learner side now has four real tools: check-in (with safeguarding detection), assignments, flashcards, revision timetable — all writing to real data, all visible to a parent where appropriate, all respecting the RLS boundaries set up on day one (parent never sees raw check-in content, only what's meant to be shared).

**Everything currently in the app is learner-entered.** No feature yet has the coach actually generating or suggesting content (`coach_suggested` / `coach_generated` flags exist in the schema for this, unused so far) — that's the natural next layer once the basic tools are solid.

---

## 3. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅, RLS ✅, Journal Privacy Rule ✅, auth ✅, family creation/join ✅, parent dashboard ✅, role-based routing ✅, learner assignments ✅, flashcards ✅, **revision timetable ✅**.

All core beta-blocking build items are now done. What's left before beta is no longer "build the app" — it's the safeguarding copy sign-off (flagged since v7/v9), the reviewer roles (Graeme + solicitor + DSL friend, all still to formally engage), and real device/family testing.

**Public-launch-blocking (unchanged):** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system, possibly custom SMTP.

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1–v14 | 10 Aug 2026 | See `Past MS/`. |
| v15 | 10 Aug 2026 | Revision timetable built, parent dashboard extended to show it. All core beta-blocking build items now complete — remaining beta gate is sign-off and testing, not building. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v15*
