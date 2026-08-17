# Alongside: Learn — Master Schedule
## 11 Aug 2026 v20

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

**v20 is a full rebuild.** Versions v12–v19 had degraded into session diffs — each one recorded only what changed that session, so the document no longer described the state of the project. This version restores it as a standing record: anyone picking this file up cold should be able to reconstruct where Learn is without reading the chat history. Sections 2–6 are standing registers, carried forward and amended each session rather than replaced.

---

## 0. Launch readiness snapshot — 11 Aug 2026

| Item | Status |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only, not public |
| Build days remaining | **11** (see §6) |
| Core beta-blocking build items | Complete |
| Safeguarding copy sign-off | **Outstanding** — see `safeguarding_copy_review_11aug2026_v1.md` |
| External reviewers (solicitor, DSL) | **Not yet engaged** — critical path, see §6 |
| Privacy notice / parental consent record | **Does not exist** — see §4 R1 |
| PWA installability | **Not installable** — no manifest or icons, see §5 D1 |
| Pricing | Deferred to pre-public-launch |

**Honest read on 1 Sept:** the software will be ready. The governance around it — reviewed safeguarding copy, a privacy notice, a documented escalation position, engaged reviewers — will not be unless it starts this week. That is now the critical path, not code.

---

## 1. Build inventory — what actually exists

Everything below is built, deployed to GitHub Pages, and confirmed working unless noted.

### Infrastructure

| Component | File(s) | Notes |
|---|---|---|
| Repo + Pages hosting | — | `build-new-habits/Alongside-Learn`, live at `build-new-habits.github.io/Alongside-Learn/` |
| Design token system | `css/variables.css`, `base.css`, `components.css`, `responsive.css` | Full token set |
| Supabase project | Frankfurt region | Separate project from sibling product Move |
| Database schema | `sql/001_initial_schema.sql`, `002_mood_meter.sql`, `003_family_join.sql` | All three migrations run and confirmed |
| Custom SMTP | Resend, `buildnewhabits.co.uk` | DKIM/MX/SPF verified. Replaces Supabase's low-limit built-in sender |
| Service worker | `sw.js` | Registered with explicit scope. Scope-claim only — deliberately no fetch/caching logic |

### Application

| Feature | File(s) | Notes |
|---|---|---|
| App shell, role-based routing, nav tabs | `js/app.js` | Parent → dashboard; learner → 4-tab nav |
| Auth: sign-up, sign-in, sign-out, email confirmation, resend | `js/auth.js` | Includes optional family-code join at sign-up |
| Duplicate-signup notification | `supabase/functions/notify-existing-account/` | Notifies the existing account holder without leaking account existence to the requester |
| Family create / join | `js/family-setup.js`, `sql/003` | Server-side RPCs enforce 2-parent / 5-learner caps |
| Learner daily check-in | `js/checkin.js` | Conversational chat-style flow: energy → good/hard → mood word → sleep → [stress → free text] → subject focus |
| Mood Meter word sets | `js/data/mood-meter.js` | Marc Brackett / RULER. Teen set is default; adult set included |
| Free-text signal vocabulary | `js/data/signal-words.js` | Deterministic string match, 4 categories. Not AI sentiment analysis — auditable and versioned |
| Unified safeguarding assessment | `js/safeguarding.js` | Combines mood flag + free-text scan + stress into levels 1–3 |
| Coach voice content | `js/data/coach-voice.js` | Greetings, acknowledgements, safeguarding responses, always-on resources |
| Support resources rendering | `js/resources.js` | Rendered unconditionally before auth — reachable without signing in |
| Parent dashboard | `js/parent-dashboard.js` | Reads via masked `risk_matrix_parent_view` |
| Learner assignments | `js/assignments.js` | Add / track |
| Flashcards | `js/flashcards.js` | Simple spaced repetition |
| Revision timetable | `js/revision-timetable.js` | Plus parent visibility |
| Data layer + phase calculation | `js/store.js` | Phase is a pure function, never a stored field |

### Schema tables with no application code behind them

These exist in the database and are documented in `schema.md`, but nothing reads or writes them:

- **`parent_checkin`** — parents cannot check in at all. Whole feature unbuilt.
- **`notification_log`** — nothing logs. The `consented_by_learner` rule that `schema.md` §2 treats as a hard requirement is therefore unenforced, because nothing notifies.
- **`risk_matrix`** — read path exists (`fetchRiskSummary`), write path does not. The parent dashboard reads a table that is always empty.

---

## 2. Decisions log

| # | Decision | Date | Rationale |
|---|---|---|---|
| D1 | Private beta with trusted families, not public launch | 10 Aug | Manageable safeguarding surface at first real-user contact |
| D2 | Vanilla JS PWA + Supabase, no framework | 10 Aug | Matches Move; no build step |
| D3 | Schema-first — no file reads a field not documented in `schema.md` | 10 Aug | file 07 §1/§4 |
| D4 | Nurturing coach voice only, no style picker | 10 Aug | files 02 §2, 04 §8 |
| D5 | No streak mechanic — `checkin_streak_shown` exists purely to prevent one being added by mistake | 10 Aug | Streaks are coercive for this audience |
| D6 | Numeric mood scale replaced with real Mood Meter word-picker | 10 Aug | Closed the gap between file 06's word-based detection policy and file 04's numeric spec |
| D7 | Check-in reworked to conversational chat flow; energy + good/hard "unlocks" one quadrant's words | 10 Aug | Graeme's UX direction; also how RULER is actually taught |
| D8 | Support resources rendered before auth, and at the end of *every* check-in, not only when flagged | 10 Aug | Someone opening the app while distressed shouldn't have to sign up first |
| D9 | Detection is deterministic string matching, never AI sentiment analysis | 10 Aug | Auditable and versionable; a reviewer can read the exact list |
| D10 | Journal Privacy Rule — free-text scanning applies to `checkin.free_text` only, never extended to any future journal feature without an explicit documented decision | 10 Aug | file 06 §4 |
| D11 | Raw risk scores masked from parents at query level via `risk_matrix_parent_view`, not just in UI | 10 Aug | file 04 §7 |
| D12 | `family_id` doubles as the beta invite code, shared out-of-band | 10 Aug | Proportionate for a handful of trusted families |
| D13 | Beta families default to `athena` tier; pricing deferred | 10 Aug | No paywall before public launch |
| D14 | Service worker exists only to claim scope — no caching strategy | 10 Aug | Caching is a separate deliberate decision, not bundled into a bug fix |
| D15 | Duplicate sign-up notifies the existing account holder rather than telling the requester the account exists | 11 Aug | Avoids account enumeration |
| D16 | Master schedule restored to standing-record format | 11 Aug | v12–v19 had degraded to session diffs |

---

## 3. Open items register

Priority order. "Blocking" means blocking the 1 Sept private beta specifically.

| # | Item | Owner | Blocking? | Status |
|---|---|---|---|---|
| O1 | Safeguarding response copy — review and sign-off against PAPYRUS guidance | Graeme (named reviewer) | **Yes** | Review pack produced 11 Aug: `safeguarding_copy_review_11aug2026_v1.md`. Awaiting decisions on 9 items |
| O2 | Escalation position — decide and document what happens on a level 3 crisis flag | Graeme + DSL | **Yes** | Currently signpost-only with no human alerted. See §4 R2 |
| O3 | Privacy notice + parental consent record for under-18 data | Graeme + solicitor | **Yes** | Does not exist. See §4 R1 |
| O4 | Formally engage solicitor reviewer | Graeme | **Yes** | Not started. Must begin before 19 Aug |
| O5 | Formally engage school DSL reviewer | Graeme | **Yes** | Not started. Must begin before 19 Aug |
| O6 | PWA manifest + icons | Claude | Likely | Not built. See §5 D1 |
| O7 | Accessibility pass to WCAG 2.2 AA | Claude | Likely | Known defects at §5 D2. No full audit done |
| O8 | RLS adversarial testing (cross-family, cross-learner reads via direct API) | Claude | **Yes** | First-pass policies written, never attacked. `schema.md` §2 calls this the highest-risk item in the pack |
| O9 | Coach-suggested content | Claude | No | `coach_suggested` / `coach_generated` always written `false` |
| O10 | Notifications | Claude | No | Not started. Depends on O2 |
| O11 | Rate limiting on `notify-existing-account` Edge Function | Claude | No | Fine at beta scale |
| O12 | Combination-flag detection across recent check-ins, not just the current one | Claude | No | file 06 allows a history window; needs a Supabase history query |
| O13 | Real invite-link system to replace raw UUID sharing | Claude | No | Fine at beta scale (D12) |
| O14 | Family calendar structure | Claude | No | Deferred at schema pass |
| O15 | Race-safety on concurrent family joins | Claude | No | Fine at beta scale |

---

## 4. Risk register

**R1 — No privacy notice or parental consent record. Severity: high.**
Learn will hold mood, sleep, stress and free-text disclosures from named 13–17 year olds. UK GDPR and the ICO's Age Appropriate Design Code apply to a private beta with real families exactly as they do to a public launch. There is currently no privacy notice, no record of parental consent, no stated retention period, and no documented process for a family asking for their data back or deleted. This is also the artefact the solicitor needs in order to have anything to review. *Mitigation: draft in Window A, solicitor review before 19 Aug.*

**R2 — A level 3 crisis flag alerts no human being. Severity: high.**
`safeguarding.js` returns level 3 on a crisis-signal match. `checkin.js` displays the fixed response and calls `updateSafeguardingLevel`. Nothing else happens: `learner_profile.safeguarding_level` is written but is not read by the parent dashboard or anything else, `notification_log` has no code behind it, and no parent, coach or adult is notified. Signpost-only may well be the right and defensible model for beta — but it must be an explicit, reviewed, documented decision, and beta families must be told plainly at onboarding what the app does and does not do. Right now it is an unstated consequence of unbuilt code. *Mitigation: O2, with DSL input.*

**R3 — Documented safeguarding rules and implemented rules have diverged. Severity: medium-high.**
The header comment in `safeguarding.js` states that stress = 5 combined with any free text produces level 2. The implemented function does not do this, and the `combineWithStress` helper written for it is exported but never called — dead code. A reviewer reading the comments would sign off behaviour the app does not have. *Mitigation: covered as item 8 in the copy review pack; fix after sign-off.*

**R4 — External reviewers cannot be compressed. Severity: high.**
A solicitor and a school DSL both have their own schedules. Graeme is away 19–28 Aug. If engagement does not start in Window A, sign-off before 1 Sept is not realistic, and the beta would launch with unreviewed safeguarding content in front of real teenagers. *Mitigation: §6 puts reviewer engagement on 12 Aug, ahead of all code work.*

**R5 — RLS never adversarially tested. Severity: medium-high.**
First-pass, sensible policies exist. Nobody has actually tried to read another family's data through the API. `schema.md` §2 already names this the highest-risk item across the whole planning pack. *Mitigation: O8, scheduled Window A.*

**R6 — Cross-app interference from Move on a shared origin. Severity: medium, now mitigated.**
Move's service worker was registered with `/` scope on `build-new-habits.github.io` and was controlling Learn's pages, serving stale JS. Fixed 10 Aug by registering Learn's own SW with explicit scope. *Residual risk: both products share an origin. Any future Move SW change can affect Learn. Worth a note in Move's own schedule.*

---

## 5. Known defects and gaps

**D1 — Not an installable PWA.** No `manifest.json`, no icon set. `sw.js` registers, but with no manifest there is no add-to-home-screen. For a teen product the home-screen icon is effectively the delivery mechanism. Favicon is still an inline SVG placeholder.

**D2 — Accessibility defects (WCAG 2.2 AA).**

- Nested live regions in the check-in: `#checkin-root` has `aria-live="polite"`, `.chat-log` has `aria-live="polite"`, and every coach bubble additionally carries `role="status"`. Screen readers will announce content two or three times. This is the flow learners use daily. (SC 4.1.3)
- No full audit has been run against 2.2 AA — target size, focus appearance, and focus-not-obscured in particular are unchecked.

**D3 — `checkin.js` hardcodes `teenLevel2` / `teenLevel3`** regardless of `ctx.ageBand`, so an adult would receive teen-worded safeguarding copy. Currently latent, since only learners reach the check-in.

**D4 — `safeguarding_level` is sticky.** `updateSafeguardingLevel` is only called when level > 1, so a learner flagged once stays flagged in `learner_profile` permanently. It never returns to 1.

**D5 — `js/router.js` is a 3-line placeholder.** Navigation is handled inline in `app.js`. Either build it or delete it; a stub file implies structure that doesn't exist.

**D6 — Stale comment in `js/data/signal-words.js`.** A prominent "FLAGGED GAP" block states that Learn has no mood word-picker and that the file therefore implements only free-text matching. That was true when written and is now wrong — the word-picker was built the same day. The comment actively misleads a reviewer reading the file cold.

**D7 — `schema.md` internal inconsistency.** Header says v3, footer says v2, and section numbering jumps §4 → §7.

**Snag list (low priority):** email confirmation magic link opens in a new tab rather than returning to the original; placeholder favicon (folded into D1).

---

## 6. Run to 1 Sept

**11 build days.** Window A: 11–18 Aug (8 days). Graeme away 19–28 Aug, phone only, no laptop or Supabase access. Window B: 29–31 Aug (3 days). Launch 1 Sept.

Window B is too short to absorb anything that slips. Treat it as buffer and final testing, not build time.

| Date | Focus |
|---|---|
| **11 Aug** (today) | Master schedule rebuilt to v20. Safeguarding copy review pack produced for sign-off. |
| **12 Aug** | **Reviewer engagement day — highest priority, ahead of all code.** Send solicitor and DSL friend a formal scope of what they're being asked to review, with the copy review pack attached. Draft privacy notice and parental consent wording so the solicitor has an artefact. |
| 13 Aug | Graeme returns O1 decisions. Apply agreed copy changes. Decide and document O2 escalation position. |
| 14 Aug | RLS adversarial testing (O8). Fix anything it surfaces. |
| 15 Aug | PWA manifest + icons (O6). Fix D3, D4, D5, D6, D7. |
| 16 Aug | Accessibility pass to WCAG 2.2 AA (O7), starting with D2. |
| 17 Aug | Beta onboarding materials: what the app does, what it does not do, what happens to data, what happens when something is flagged. |
| 18 Aug | Full end-to-end test as a real family: two parents, two learners. Close Window A cleanly with everything committed and documented. |
| 19–28 Aug | **Graeme away.** No build. Reviewer responses arrive by email; log them, act on return. |
| 29 Aug | Apply reviewer feedback. |
| 30 Aug | Final regression test across all flows. |
| 31 Aug | Buffer. Onboard the first beta family manually as a live rehearsal. |
| **1 Sept** | Private beta opens. |

---

## 7. Version history

| Version | Date | Change |
|---|---|---|
| v1–v18 | 10 Aug 2026 | See `Past MS/`. |
| v19 | 10 Aug 2026 | Cross-app service worker interference from Move diagnosed and fixed. Resend domain verified; Supabase SMTP live via Resend. |
| v20 | 11 Aug 2026 | Full rebuild to standing-record format after v12–v19 degraded into session diffs. Added build inventory, decisions log, open items register, risk register, defect list, and dated run to 1 Sept. New findings: no privacy notice or consent record (R1), level 3 flags alert no human (R2), documented and implemented safeguarding rules diverged (R3), not an installable PWA (D1), nested live regions (D2), sticky safeguarding level (D4). Safeguarding copy review pack produced. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 11 Aug 2026 v20*
