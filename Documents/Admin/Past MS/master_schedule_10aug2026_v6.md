# Alongside: Learn — Master Schedule
## 10 Aug 2026 v6

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Stack | Vanilla JS PWA, GitHub Pages, Supabase (Frankfurt, live, RLS confirmed on all 10 tables) |
| Coach shell + check-in | **Built.** Coach-speaks-first, free-tier fields (energy/mood/sleep/subject), Athena-gated fields (stress/free text), signal-word safeguarding detection wired and writing to `checkins` + `learner_profiles.safeguarding_level`. |
| Safeguarding reviewers | Graeme (self, 20+ yrs trained) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Decisions log

| # | Decision | Status |
|---|---|---|
| 1–7 | (unchanged — see v5) | |
| 8 | Coach shell + check-in flow built, safeguarding detection wired | Done 10 Aug |

---

## 2. Gap surfaced during today's build — needs Graeme's read

**File 06 (shared crisis policy) describes a Yale Mood Meter word-picker as the detection input — Learn's actual check-in (file 04) doesn't have one.** Learn's mood/energy/sleep/stress are 5-point tap-row scales, not a word-selection grid. Only the free-text field is word-based.

What I built reflects Learn's real check-in structure: the free-text vocabulary scan (file 04 §3) is implemented and wired to a fixed safeguarding response. The mood-meter quadrant/combination-word system from file 06 (trapped, overwhelmed, etc. as selectable words) is **not** implemented, because there's no matching input in Learn's UI to apply it to.

**This needs one of two resolutions, and it's squarely a safeguarding-reviewer-and-you decision, not a build one:**
- (a) Add a word-picker input to Learn's check-in to match the shared family policy, or
- (b) Formally document that Learn's detection method differs from Move's and is free-text-vocabulary-based instead — which then needs its own sign-off rather than inheriting Move's.

Flagging now rather than letting it sit quietly, per the honesty standard the planning pack itself sets.

**Also flagged in code, not yet content-final:** the fixed safeguarding response message text (Level 2/3, teen wording) is a first-pass draft I wrote to make the flow functional — it is **not** reviewed against PAPYRUS guidance (file 06 §6 item 2). Crisis resource numbers (Childline 0800 1111, Shout 85258, Samaritans 116 123, Papyrus HOPELINEUK 0800 068 4141) were verified current today. The message wording itself needs your sign-off as named reviewer before any beta family sees it.

---

## 3. What's built vs. what's next

**Built today:** repo scaffold, design tokens, schema, live Supabase with RLS, coach shell, learner check-in (free + Athena fields), signal-word detection, fixed safeguarding response UI, always-on resource list.

**Known gaps, not hidden:** no auth/login yet (`app.js` uses a temporary hardcoded test user ID — check-ins won't actually save against real Supabase until a real user exists), mood-meter/word-picker question above, safeguarding response copy needs your review, parent dashboard not started, notifications not started.

**Next session:** resolve the mood-meter question, get your sign-off on the safeguarding response copy, then Supabase Auth (sign-up/login) — check-in can't go live to a real beta family without it.

---

## 4. Beta-blocking vs public-launch-blocking (unchanged)

**Beta-blocking:** crisis-signal detection ✅ built, needs copy sign-off. Fixed response + always-visible resources ✅ built, needs copy sign-off. Resource links ✅ verified today. RLS family hard-wall ✅ live, needs adversarial testing with real accounts. Journal Privacy Rule ✅ enforced (scan only touches the dedicated field). Auth — not built, beta-blocking.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall.

---

## 5. Build windows

- **Window A** (10–18 Aug): infrastructure ✅, coach shell + check-in ✅. Remaining: auth, mood-meter decision, safeguarding copy sign-off, parent dashboard start.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy, safeguarding copy review (phone-reviewable).
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 6. Version history

| Version | Date | Change |
|---|---|---|
| v1–v5 | 10 Aug 2026 | See archived versions in `Past MS/`. |
| v6 | 10 Aug 2026 | Coach shell + check-in flow built and pushed, signal-word detection wired. Flagged: file 06/file 04 mood-meter vs. check-in-structure mismatch, needs Graeme + reviewer decision. Safeguarding response copy is functional draft, not yet signed off. Auth identified as next beta-blocking build item. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v6*
