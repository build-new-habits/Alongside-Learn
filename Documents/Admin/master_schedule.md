# Alongside: Learn — Master Schedule
## 10 Aug 2026 v1

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target launch | 1 Sept 2026 |
| Days available (excl. holiday) | 9 (10–18 Aug) + 3 (29–31 Aug) = 12 build days |
| Holiday gap | 19–28 Aug — phone only, no laptop, no Supabase access |
| Repo state | Created today. Only `Documents/Planning/` (9-file spec pack) exists. No app code, no Supabase project, no schema. |
| **Launch scope** | **UNCONFIRMED — see Section 1, top open item** |

**Honest PM assessment:** a full public launch of every Athena-tier feature, including safeguarding levels 2/3, on real minors' data by 1 Sept is not realistically achievable and defensible. Three safeguarding/legal reviewer roles are unfilled, no DPIA exists, and the family-scoped RLS "hard wall" has never been audited. These are not build tasks — they require named external professionals and cannot be compressed into 12 days. This schedule is built around a scope decision that keeps 1 Sept honest rather than aimed at a definition of "launch" that quietly ignores this.

---

## 1. Open items requiring your decision — nothing below is built until these are answered

| # | Decision | Why it can't wait |
|---|---|---|
| 1 | **What does "1 Sept" actually mean?** Public launch / private beta with named trusted families / free-tier-only soft launch (Athena + safeguarding L2/3 held back) / push the date | Determines almost every task below |
| 2 | Confirm stack: vanilla JS PWA + Supabase (Frankfurt, separate project from Move) — same pattern as Move? | Blocks all architecture work |
| 3 | Documents/Admin/master_schedule.md (matching Move's convention, file 07) vs. a different structure — this file currently lives at the former; flag if you want it moved | Avoids touching this file twice |
| 4 | Who are the three safeguarding reviewers (youth-safeguarding/PAPYRUS-affiliated, legal, third TBD)? Even a "not yet, in progress" answer unblocks scheduling their review window | Blocks any real-data safeguarding sign-off |
| 5 | Pricing for Athena tier | Blocks paywall/upgrade copy |

---

## 2. Critical path blockers (from file 08, tracked not resolved)

- [ ] Three safeguarding reviewer roles unfilled (youth-safeguarding, legal, third TBD) — **launch-blocking for any real user data from minors**
- [ ] Safeguarding/crisis policy is DRAFT FOR REVIEW, not signed off
- [ ] DPIA — not started, scope undefined
- [ ] ICO registration for Learn (separate from Move's)
- [ ] Article 22 UK GDPR position on the automated fixed-message safeguarding response — unresolved
- [ ] Online Safety Act applicability to Learn's family/multi-user structure — unresolved
- [ ] Parental-notification policy when a 13–17 y/o flags distress — Learn-specific, unresolved
- [ ] Supabase RLS "hard wall" family-access audit — never done, flagged as highest-risk architecture gap
- [ ] Age verification / GDPR-K compliance for under-16 data
- [ ] Crisis resource links/numbers — must be independently re-verified for Learn before any real use

---

## 3. Build windows

### Window A — Foundation (Mon 10 – Tue 18 Aug, 9 days, full access)
Priority: schema-first, repo scaffold, design system CSS, core check-in + coach shell. No feature depending on unresolved safeguarding items goes live to real users this window.

- [ ] Confirm Section 1 decisions with Graeme (Day 1)
- [ ] Repo scaffold: folder structure per file 00 Section 3, `variables.css` from file 01
- [ ] Supabase project created (Frankfurt), schema-design session (file 05 → real `schema.md`, `store.js`)
- [ ] RLS policy first pass for family-scoped model (flag for later audit, not a substitute for it)
- [ ] Core coach shell: coach-speaks-first pattern, Nurturing voice only
- [ ] Learner daily check-in (free-tier fields: energy/mood/sleep/subject)
- [ ] Athena-gated check-in fields (stress + free text) — build the UI, but safeguarding detection logic stays OFF for real users until Section 2 items are addressed
- [ ] Design system component build: buttons, cards, sliders per file 01 Section 7

### Window B — Holiday (Wed 19 – Fri 28 Aug, phone-only, no Supabase)
Content and planning work only — nothing requiring Supabase, terminal, or laptop.

- [ ] Coach-voice script drafting (Nurturing tone, banned-words list applied) — file 02
- [ ] Parent coaching content — eight themes, phase-specific focus text — file 04 Section 4
- [ ] Notification copy drafting — file 04 Section 5
- [ ] Review/reply to safeguarding reviewer outreach if in progress
- [ ] Direct me via chat for anything phone-reviewable (copy review, priority calls)

### Window C — Final sprint (Sat 29 – Mon 31 Aug, 3 days)
- [ ] Wire drafted content into build
- [ ] Full device QA pass (phone primary, per file 07 Section 6)
- [ ] Non-ASCII / syntax check before final commits
- [ ] Confirm launch-scope decision still holds given actual state of Section 2 blockers
- [ ] `sw.js` bumped last, changelog entry

### Post-launch / not this window
- August transition (Reflect phase, late) content — flagged incomplete in source material
- A-level/T-level expansion, lifetime tier design, parent-as-learner dual role — all explicitly future scope

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1 | 10 Aug 2026 | First master schedule. Read all 9 planning files. Repo confirmed to contain only `Documents/Planning/`. Flagged launch-scope decision as blocking before further build work is scheduled. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v1*
