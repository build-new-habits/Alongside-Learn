# Alongside: Learn — Master Schedule
## 17 Aug 2026 v21

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

Standing-record format, established at v20 and continued here: sections 2–6 are registers, carried forward and amended rather than replaced. Anyone picking this file up cold should be able to reconstruct where Learn is without reading the chat history.

---

## 0. Launch readiness snapshot — 17 Aug 2026

| Item | Status |
|---|---|
| Target date | 1 Sept 2026 — **at risk, scope decision pending (O16)** |
| Launch scope | **Under review.** See §6 |
| Build days remaining | **5** (17–18 Aug, then 29–31 Aug) |
| Core beta-blocking build items | Complete |
| Safeguarding copy sign-off | **Outstanding** — nine review items unreturned since 11 Aug |
| External reviewers (solicitor, DSL) | **Will not be engaged before 19 Aug** (Graeme, 17 Aug). Sign-off before 1 Sept is not achievable |
| Privacy notice / parental consent record | **Does not exist.** Drafting held pending O16 — see §3 |
| PWA installability | **Done 17 Aug** — manifest and icon set built |
| Accessibility | Check-in flow pass done 17 Aug. Wider audit outstanding — see O7 |
| Pricing | Deferred to pre-public-launch |

**Honest read on 1 Sept.** Six of the eight Window A days planned at v20 passed without work: reviewer engagement (12 Aug), copy decisions (13 Aug), RLS testing (14 Aug) and the accessibility/PWA day (15–16 Aug) did not happen on schedule. The PWA and accessibility work has now been done in one pass on 17 Aug. The rest has not.

The decisive change since v20 is that **external review is off the table before launch.** That is not a delay to be absorbed; it changes what can honestly be launched on 1 Sept. The software will be ready. Reviewed safeguarding content, a privacy notice and a documented escalation position will not be. §6 sets out the three ways forward and the recommendation.

---

## 1. Build inventory — what actually exists

Everything below is built, deployed to GitHub Pages, and confirmed working unless noted.

### Infrastructure

| Component | File(s) | Notes |
|---|---|---|
| Repo + Pages hosting | — | `build-new-habits/Alongside-Learn`, live at `build-new-habits.github.io/Alongside-Learn/` |
| Design token system | `css/variables.css`, `base.css`, `components.css`, `responsive.css` | Full token set |
| Supabase project | Frankfurt region | Separate project from sibling product Move |
| Database schema | `sql/001`, `002`, `003` run and confirmed. **`sql/004_consented_parent_alerts.sql` written but NOT YET RUN** | 004 must be executed manually in the SQL Editor before the parent-alert feature works at all |
| Custom SMTP | Resend, `buildnewhabits.co.uk` | DKIM/MX/SPF verified |
| Service worker | `sw.js` | Registered with explicit scope. Scope-claim only — deliberately no fetch/caching logic |
| PWA manifest + icons | `manifest.json`, `icons/` | Added 17 Aug. Installable to home screen. Distinct app `id` so it does not collide with Move on the shared origin |

### Application

| Feature | File(s) | Notes |
|---|---|---|
| App shell, role-based routing, nav tabs | `js/app.js` | Parent → dashboard; learner → 4-tab nav |
| Auth: sign-up, sign-in, sign-out, email confirmation, resend | `js/auth.js` | Includes optional family-code join at sign-up |
| Duplicate-signup notification | `supabase/functions/notify-existing-account/` | Deployed under the slug `quick-handler` — that is the canonical production name |
| Family create / join | `js/family-setup.js`, `sql/003` | Server-side RPCs enforce 2-parent / 5-learner caps |
| Learner daily check-in | `js/checkin.js` (v4) | Conversational chat flow. Focus-managed for screen readers as of 17 Aug |
| Mood Meter word sets | `js/data/mood-meter.js` | Marc Brackett / RULER. Teen set default; adult set included |
| Free-text signal vocabulary | `js/data/signal-words.js` | Deterministic string match, word-boundary matched. Not AI sentiment analysis |
| Unified safeguarding assessment | `js/safeguarding.js` | Combines mood flag + free-text scan + stress into levels 1–3 |
| Coach voice content | `js/data/coach-voice.js` | Greetings, acknowledgements, safeguarding responses, always-on resources |
| Support resources rendering | `js/resources.js` | Rendered unconditionally before auth — reachable without signing in |
| Parent dashboard | `js/parent-dashboard.js` | Reads via masked `risk_matrix_parent_view` |
| Learner assignments | `js/assignments.js` | Add / track |
| Flashcards | `js/flashcards.js` | Simple spaced repetition |
| Revision timetable | `js/revision-timetable.js` | Plus parent visibility |
| Data layer + phase calculation | `js/store.js` | Phase is a pure function, never a stored field |

### Schema tables with no application code behind them

Exist in the database and documented in `schema.md`, but nothing reads or writes them:

- **`parent_checkin`** — parents cannot check in at all. Whole feature unbuilt.
- **`notification_log`** — nothing logs.
- **`risk_matrix`** — read path exists (`fetchRiskSummary`), write path does not. The parent dashboard reads a table that is always empty.

### Check-ins are write-only

`submitCheckin` writes. **Nothing reads a check-in back** — not to the learner, not to the parent view. A learner cannot see their own history. This is a product gap, not just a defect, and it is unscheduled.

### Copy that does not exist

`coach-voice.js` has `teenLevel2` / `teenLevel3` only. There is no adult safeguarding copy. As of 17 Aug the code looks for the age band's own copy and falls back to teen wording; writing adult copy is a sign-off task and has deliberately not been done in code.

---

## 2. Decisions log

| # | Decision | Date | Rationale |
|---|---|---|---|
| D1 | Private beta with trusted families, not public launch | 10 Aug | Manageable safeguarding surface at first real-user contact |
| D2 | Vanilla JS PWA + Supabase, no framework | 10 Aug | Matches Move; no build step |
| D3 | Schema-first — no file reads a field not documented in `schema.md` | 10 Aug | file 07 §1/§4 |
| D4 | Nurturing coach voice only, no style picker | 10 Aug | files 02 §2, 04 §8 |
| D5 | No streak mechanic — `checkin_streak_shown` exists purely to prevent one being added by mistake | 10 Aug | Streaks are coercive for this audience |
| D6 | Numeric mood scale replaced with real Mood Meter word-picker | 10 Aug | Closed the gap between file 06 and file 04 |
| D7 | Check-in reworked to conversational chat flow | 10 Aug | Graeme's UX direction; also how RULER is taught |
| D8 | Support resources rendered before auth, and at the end of every check-in | 10 Aug | Someone opening the app while distressed shouldn't have to sign up first |
| D9 | Detection is deterministic string matching, never AI sentiment analysis | 10 Aug | Auditable and versionable |
| D10 | Journal Privacy Rule — free-text scanning applies to `checkin.free_text` only | 10 Aug | file 06 §4 |
| D11 | Raw risk scores masked from parents at query level, not just in UI | 10 Aug | file 04 §7 |
| D12 | `family_id` doubles as the beta invite code, shared out-of-band | 10 Aug | Proportionate for a handful of trusted families |
| D13 | Beta families default to `athena` tier; pricing deferred | 10 Aug | No paywall before public launch |
| D14 | Service worker exists only to claim scope — no caching strategy | 10 Aug | Caching is a separate deliberate decision |
| D15 | Duplicate sign-up notifies the existing account holder rather than telling the requester | 11 Aug | Avoids account enumeration |
| D16 | Master schedule restored to standing-record format | 11 Aug | v12–v19 had degraded to session diffs |
| D17 | Factual corrections to crisis resource information (names, hours, numbers) may be made without sign-off | 11 Aug | Wrong contact details are a live hazard; waiting on review to fix them is worse than fixing them |
| D18 | Check-in uses focus management, not live regions | 17 Aug | Three nested live regions were announcing every message two or three times; focus management also fixes focus being dropped to `<body>` after every answer |

---

## 3. Open items register

Priority order. "Blocking" means blocking the 1 Sept private beta.

| # | Item | Owner | Blocking? | Status |
|---|---|---|---|---|
| **O16** | **Beta scope decision — what launches on 1 Sept given no external review** | **Graeme** | **Yes — gates everything below** | Raised 17 Aug. Three options in §6. Recommendation: Option 2 |
| O1 | Safeguarding response copy — review and sign-off | Graeme (named reviewer) | Yes, if check-in ships | Review pack issued 11 Aug: `safeguarding_copy_review_11aug2026_v1.md`. Nine items still unreturned |
| O2 | Escalation position — decide and document what happens on a level 3 flag | Graeme + DSL | Yes, if check-in ships | Still signpost-only with no human alerted. See §4 R2 |
| O3 | Privacy notice + parental consent record | Graeme + solicitor | **Yes under all three options** | Does not exist. **Drafting deliberately held pending O16** — full-scope and study-only notices are materially different documents and drafting now means drafting twice |
| O17 | Item 7b — free-text handling and crisis detection architecture | Graeme | Yes, if check-in ships | Open since 11 Aug. Proposal was to store free text privately for the learner rather than scan it, which would make level 3 unreachable under the current architecture. Detection was left in place on the logic that removing it deliberately later is safer than the reverse |
| O18 | Run `sql/004_consented_parent_alerts.sql` in Supabase | Graeme | Yes, if check-in ships | Written 11 Aug, never executed. The learner-pressed parent alert does not work until it is. Cannot be done from a phone |
| O4 | Formally engage solicitor reviewer | Graeme | Yes for public launch | **Slipped past Window A.** Now a return-from-leave task |
| O5 | Formally engage school DSL reviewer | Graeme | Yes for public launch | **Slipped past Window A.** Now a return-from-leave task |
| O8 | RLS adversarial testing (cross-family, cross-learner reads via direct API) | Claude | **Yes** | Unauthenticated probing can be done unattended. Cross-family testing needs two real test families and has not been done. `schema.md` §2 calls this the highest-risk item in the pack |
| O7 | Accessibility pass to WCAG 2.2 AA | Claude | Likely | Check-in flow done 17 Aug (D2, and reduced-motion scrolling). Auth, parent dashboard, assignments, flashcards and timetable not yet audited |
| O19 | Read-back of check-in data to learner and parent views | Claude | No, but a visible product hole | Check-ins are write-only. Nothing shows a learner their own history |
| O9 | Coach-suggested content | Claude | No | `coach_suggested` / `coach_generated` always written `false` |
| O10 | Notifications | Claude | No | Depends on O2 |
| O11 | Rate limiting on the `notify-existing-account` Edge Function | Claude | No | Fine at beta scale |
| O12 | Combination-flag detection across recent check-ins | Claude | No | file 06 allows a history window; needs a Supabase history query |
| O13 | Real invite-link system to replace raw UUID sharing | Claude | No | Fine at beta scale (D12) |
| O14 | Family calendar structure | Claude | No | Deferred at schema pass |
| O15 | Race-safety on concurrent family joins | Claude | No | Fine at beta scale |

---

## 4. Risk register

**R1 — No privacy notice or parental consent record. Severity: high.**
Learn will hold mood, sleep, stress and free-text disclosures from named 13–17 year olds. UK GDPR and the ICO's Age Appropriate Design Code apply to a private beta with real families exactly as to a public launch. There is no privacy notice, no record of parental consent, no stated retention period, and no documented process for a family asking for their data back or deleted. *Unchanged since v20. Mitigation now gated on O16 — the notice cannot be drafted sensibly until the scope is fixed.*

**R2 — A level 3 crisis flag alerts no human being. Severity: high.**
`safeguarding.js` returns level 3 on a crisis-signal match; `checkin.js` shows the fixed response and offers the learner a consent button. Nothing else happens. `learner_profile.safeguarding_level` is written but read by nothing, `notification_log` has no code behind it, and no parent, coach or adult is notified unless the learner presses the button — and `sql/004`, which that button depends on, has not been run. Signpost-only may be the right model for beta, but it must be an explicit, documented, communicated decision. *Escalated at v21: with no DSL review before launch, this is the single strongest argument for holding the check-in back.*

**R4 — External reviewers cannot be compressed. Severity: high — now realised.**
This was a risk at v20; as of 17 Aug it has happened. Neither reviewer will be engaged before Graeme goes away on the 19th, and returning on the 29th leaves three days. *No longer a risk to mitigate but a fact to plan around. See §6.*

**R5 — RLS never adversarially tested. Severity: medium-high.**
First-pass, sensible policies exist. Nobody has tried to read another family's data through the API. `schema.md` §2 names this the highest-risk item across the whole planning pack. *Mitigation: O8. Unattended unauthenticated probing can start immediately; the cross-family half needs test accounts.*

**R6 — Cross-app interference from Move on a shared origin. Severity: medium, mitigated.**
Move's service worker held `/` scope on `build-new-habits.github.io` and was serving Learn stale JS. Fixed 10 Aug by registering Learn's own SW with explicit scope. *Residual: both products share an origin, so any future Move SW change can affect Learn. The new manifest sets a distinct app `id` to keep installs separate. Worth a note in Move's own schedule.*

**R7 — Schedule adherence. Severity: medium. New at v21.**
Six of eight Window A days passed with no commits between 11 and 17 Aug. The plan was not wrong; it was not executed. Window B is three days and was always intended as buffer. Any further plan should assume roughly two working days before leave, not eight.

*R3 (documented and implemented safeguarding rules diverged) closed 11 Aug — the stress rule was corrected in documentation to match the tighter implemented behaviour and the dead `combineWithStress` helper removed.*

---

## 5. Known defects and gaps

**D4 — `safeguarding_level` is sticky. OPEN.** `updateSafeguardingLevel` is only called when level > 1, so a learner flagged once stays flagged in `learner_profile` permanently. It never returns to 1. *Deliberately not fixed in code: how and when a safeguarding flag decays is a policy question for the DSL, not a bug fix. Needs a decision alongside O2.*

**Wider accessibility audit — OPEN (O7).** Auth, parent dashboard, assignments, flashcards and revision timetable have not been checked against 2.2 AA. Target size and focus appearance look well handled at token level (`--touch-target-min: 44px`, global 3px `:focus-visible` outline), but that is a code reading, not a test.

**Snag list (low priority):** email confirmation magic link opens in a new tab rather than returning to the original.

*Closed since v20:*
- *D1 — not installable. Fixed 17 Aug: `manifest.json` plus 192/512 any and maskable icons, apple-touch icon and favicons. Inline SVG placeholder favicon gone.*
- *D2 — nested live regions. Fixed 17 Aug: all three removed, replaced with focus management (decision D18). Reduced-motion scrolling fixed at the same time — `scrollIntoView({behavior:'smooth'})` from JS was overriding the CSS reduced-motion rule. Free-text fields renamed after the question asked and no longer auto-focused.*
- *D3 — teen safeguarding copy hardcoded regardless of age band. Fixed 17 Aug, with the gap in adult copy documented rather than filled.*
- *D5 — `js/router.js` placeholder. Deleted 17 Aug; nothing referenced it.*
- *D6 — stale "FLAGGED GAP" comment in `signal-words.js`. Fixed 11 Aug.*
- *D7 — `schema.md` version and section numbering. Fixed 17 Aug.*

---

## 6. Run to 1 Sept — replan

**5 build days.** 17–18 Aug (2 days). Graeme away 19–28 Aug, phone only, no laptop or Supabase access. 29–31 Aug (3 days). Launch 1 Sept.

### The decision (O16)

External review will not happen before launch. Three ways forward:

**Option 1 — slip the date.** Move the beta to late September. Engage both reviewers on return, launch the full product reviewed. Cleanest and lowest risk. Costs three to four weeks.

**Option 2 — narrow the beta to the study tools. *Recommended.*** Launch 1 Sept with assignments, flashcards and the revision timetable. Hold the check-in back. This removes the free-text capture, the mood data, the safeguarding assessment and the crisis routing — nearly all of the special-category data and effectively all of the safeguarding surface. Real families use the product on the date set; the check-in ships later as a smaller, cleaner thing to get signed off. Also parks O1, O2, O17 and O18 rather than rushing them, and reduces the privacy notice to something a solicitor can review quickly.

**Option 3 — launch the full beta unreviewed,** with families told plainly what the app does and does not do. Not recommended. R2 stands: a level 3 flag alerts no human being, `sql/004` has not been run, and that would be going in front of real thirteen-year-olds with no DSL having read the copy.

### Conditional plan

| Date | If Option 2 (recommended) | If Option 1 |
|---|---|---|
| **17 Aug** | PWA + accessibility + defects done. Replan raised. | Same |
| **18 Aug** | Decide O16. If Option 2: agree exactly what is hidden and how. Claude runs unauthenticated RLS probing (part of O8). | Decide O16 and set the new date |
| 19–28 Aug | **Graeme away.** No Supabase, no laptop. Claude can continue non-blocking work if instructed. | Same |
| 29 Aug | Gate the check-in behind a flag. Draft the study-only privacy notice and parental consent record. | Engage both reviewers |
| 30 Aug | Cross-family RLS testing with two real test families. Full regression across the shipping flows. | Full regression |
| 31 Aug | Buffer. Onboard the first beta family manually as a live rehearsal. | Buffer |
| **1 Sept** | Study-tools private beta opens. Check-in follows once reviewed. | No launch — new date set |

### What Claude can do without Graeme

Unattended and safe under any option: unauthenticated RLS probing, the wider 2.2 AA audit (O7), check-in read-back (O19), and non-safeguarding defect work. **Not** unattended: anything touching safeguarding copy, the escalation position, the privacy notice, or Supabase execution.

---

## 7. Version history

| Version | Date | Change |
|---|---|---|
| v1–v19 | 10 Aug 2026 | See `Past MS/`. |
| v20 | 11 Aug 2026 | Full rebuild to standing-record format. Added build inventory, decisions log, open items register, risk register, defect list, dated run. New findings: no privacy notice (R1), level 3 flags alert no human (R2), rules diverged (R3), not installable (D1), nested live regions (D2), sticky safeguarding level (D4). |
| v21 | 17 Aug 2026 | Replan. Reviewer engagement will not happen before leave, so external sign-off before 1 Sept is not achievable — R4 realised, three scope options set out at §6 with Option 2 (study-tools-only beta) recommended, raised as blocking item O16. Six of eight Window A days lost, logged as R7. D1, D2, D3, D5, D7 closed; PWA manifest and icon set built; check-in accessibility pass done and recorded as decision D18. New open items: O17 (item 7b), O18 (`sql/004` never run), O19 (check-ins write-only). Privacy notice drafting held pending O16. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 17 Aug 2026 v21*
