# Alongside: Learn — Master Schedule
## 10 Aug 2026 v2

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| **Launch scope (confirmed)** | **Private beta — trusted families only, not a public launch** |
| Days available (excl. holiday) | 9 (10–18 Aug) + 3 (29–31 Aug) = 12 build days |
| Holiday gap | 19–28 Aug — phone only, no laptop, no Supabase access |
| Repo state | `Documents/Planning/` (spec pack) + `Documents/Admin/master_schedule.md` (this file). No app code yet. |
| Stack (confirmed) | Vanilla JS PWA, GitHub Pages, Supabase (separate project, Frankfurt eu-central-1) — same pattern as Move. Future note: this architecture supports a later Google/TWA wrap for Play Store distribution post-safeguarding-signoff — no conflict, no change needed now. |

**PM note on what "private beta" changes and what it doesn't:** trusted families under informed consent lowers the urgency of ICO registration, DPIA sign-off, and Article 22/Online Safety Act positioning — those become pre-*public*-launch gates, not pre-*beta* gates. It does **not** lower the bar on the crisis/safeguarding detection system itself. Beta families are still real families with real teenagers; if a learner selects a flagged word or writes a crisis-signal phrase, the response has to actually work. Section 2 keeps the detection-quality items as beta-blocking; it reclassifies the registration/certification items as public-launch-blocking instead.

---

## 1. Decisions

| # | Decision | Status |
|---|---|---|
| 1 | Launch scope: private beta, trusted families | **Confirmed 10 Aug** |
| 2 | Stack: vanilla JS PWA + Supabase (Frankfurt, separate project) | **Confirmed 10 Aug** |
| 3 | Tracker location: `Documents/Admin/master_schedule.md` (matches file 07 / Move) | Used, no objection raised |
| 4 | Safeguarding reviewers — youth-safeguarding, legal, third TBD | **Open** |
| 5 | Pricing for Athena tier | **Open** — not needed for beta if beta is invite-only/free during trial, but flag before any beta family sees a paywall |

---

## 2. Blockers, split by what beta actually requires

### Beta-blocking (must be solid before any trusted family gets real access)
- [ ] Crisis-signal word list (file 04 §3) implemented and manually tested against real phrasing — not yet reviewed by a mental-health professional, but must at minimum functionally trigger correctly before beta
- [ ] Fixed safeguarding response message + always-accessible in-app resources (file 06 §3) — live and correct
- [ ] Crisis resource numbers/links independently verified as current (file 06 §8) — non-negotiable even at beta scale
- [ ] Supabase RLS family-scoped "hard wall" — beta families are real, so a data leak between a parent and a learner (or between families) is a real harm even in beta. First-pass RLS from Window A, tested before any beta family's data goes in.
- [ ] Journal Privacy Rule enforced (signal detection never touches general journal content, only the dedicated field) — build correctly from day one, don't retrofit

### Public-launch-blocking (needed before beta → public, not before beta itself)
- [ ] Three safeguarding reviewer roles filled and sign-off obtained
- [ ] DPIA completed
- [ ] ICO registration for Learn
- [ ] Article 22 UK GDPR position resolved
- [ ] Online Safety Act applicability resolved
- [ ] Parental-notification policy for 13–17 y/o flagged words — recommend deciding this before beta even though not strictly beta-blocking, since real beta families will hit this question in practice
- [ ] Age verification / GDPR-K compliance
- [ ] Pricing finalised, paywall copy built

---

## 3. Build windows

### Window A — Foundation (Mon 10 – Tue 18 Aug, 9 days, full access)
- [ ] Repo scaffold per file 00 §3; `variables.css` from file 01
- [ ] Supabase project created (Frankfurt), schema-design session → real `schema.md`, `store.js` (file 05 is a scaffold only — confirm/amend before coding against it)
- [ ] RLS first pass for family-scoped model — treat as beta-blocking, not just flagged for later
- [ ] Core coach shell: coach-speaks-first, Nurturing voice only, no style picker
- [ ] Learner daily check-in — free-tier fields (energy/mood/sleep/subject)
- [ ] Athena-gated check-in fields (stress + free text) with signal-word detection wired and tested — this is the beta-blocking safeguarding piece, prioritise it inside this window rather than leaving it late
- [ ] Design system components: buttons, cards, sliders (file 01 §7)
- [ ] Decide and log: parental-notification policy for flagged words (recommend resolving before beta families are invited)

### Window B — Holiday (Wed 19 – Fri 28 Aug, phone-only, no Supabase)
- [ ] Coach-voice script drafting, Nurturing tone, banned-words list applied (file 02)
- [ ] Parent coaching content — eight themes (file 04 §4)
- [ ] Notification copy drafting (file 04 §5)
- [ ] Safeguarding reviewer outreach/follow-up if in progress (doesn't need Supabase)
- [ ] Direct via chat: copy review, priority calls, anything phone-reviewable

### Window C — Final sprint (Sat 29 – Mon 31 Aug, 3 days)
- [ ] Wire drafted content into build
- [ ] Full device QA — phone primary
- [ ] Re-verify crisis resource links one more time before any beta family gets access
- [ ] Non-ASCII / syntax check before final commits
- [ ] Confirm beta-blocking list (Section 2) is actually clear — if not, beta start slips, it doesn't launch with gaps
- [ ] `sw.js` bumped last, changelog entry
- [ ] Invite first trusted beta families

### Explicitly not in scope for beta
- August transition (Reflect phase, late) content — incomplete in source material, not needed until beta families reach that point in the year
- A-level/T-level expansion, lifetime tier design, parent-as-learner dual role, public pricing/paywall, Google/TWA wrap — all post-beta

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1 | 10 Aug 2026 | First master schedule. Flagged launch-scope decision as blocking. |
| v2 | 10 Aug 2026 | Launch scope confirmed as private beta (trusted families). Stack confirmed (vanilla JS PWA + Supabase Frankfurt, matching Move). Split blockers into beta-blocking vs. public-launch-blocking. Reprioritised Window A to put safeguarding detection ahead of other Athena features. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v2*
