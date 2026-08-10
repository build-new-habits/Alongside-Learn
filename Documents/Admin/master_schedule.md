# Alongside: Learn — Master Schedule
## 10 Aug 2026 v10

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **First successful end-to-end test** | Graeme signed up, confirmed email, signed in, and reached family setup — all working live on GitHub Pages today. |
| Infrastructure | Scaffold, schema (v3), Supabase (RLS + 3 migrations run), Mood Meter, safeguarding assessment, auth, family creation/join — all built and now proven to work in a real browser. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Bugs found and fixed this session (three, all from real browser testing)

1. **Sign-up RLS error** — email-confirmation session timing, fixed (v9).
2. **CSS field styling** — selector only covered `type="text"`, fixed (v9).
3. **Sign-in silently did nothing** — the Name/Date-of-birth fields stayed `required` even when hidden in sign-in mode, so the browser's native form validation blocked submission before the code even ran, with no visible error. Fixed by toggling `required` alongside visibility, both at initial load and on mode switch.

**Also fixed:** resend-confirmation errors were only logged to the console, invisible to the person using the app — now shown directly. Added a placeholder favicon (was 404-ing, harmless but noisy in the console) — a real brand icon is a design-pass item, not urgent.

**Root cause pattern worth naming:** two of three bugs were about hidden/disabled state not being fully applied (CSS selector too narrow; `required` attribute not toggled with visibility). Worth double-checking this pattern in future UI work — visibility and validity/interactivity need to be set together, not just visibility.

**Config fix (Graeme, done):** Supabase Site URL and Redirect URLs corrected from the `localhost:3000` default to the live GitHub Pages URL.

---

## 2. Snag list — logged, not urgent

| Snag | Detail | Priority |
|---|---|---|
| Magic-link opens in a new browser tab/session | Clicking the email confirmation link opens a fresh tab rather than returning to the original one — the original tab is left showing a stale state. Not broken, just a bit disorienting. Revisit during a UX pass, not blocking. | Low |
| Placeholder favicon | Functional (stops the 404), not a real brand icon. | Low, cosmetic |
| Supabase built-in email service | Low rate limit, fine for solo testing, may need custom SMTP before real beta families rely on it for confirmation/reset emails. | Revisit before Window C |

---

## 3. Right now — continue testing

Family setup screen is live and working. Next test: click **"Start a new family"**, confirm the family code appears, then the flow should land on the actual check-in screen (Mood Meter, energy/sleep tap-rows, etc.) — that hasn't been tested live yet this session.

---

## 4. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅, RLS ✅, Journal Privacy Rule ✅, auth ✅ (now tested end-to-end), family creation/join ✅ (family setup screen tested, creation/check-in not yet tested). Parent dashboard — next build item.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system, possibly custom SMTP.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1–v9 | 10 Aug 2026 | See `Past MS/`. |
| v10 | 10 Aug 2026 | First full end-to-end test (signup → confirm → sign in → family setup) succeeded live. Fixed a third real bug (hidden required fields blocking sign-in silently) plus resend-error visibility and a placeholder favicon. Added a snag list for low-priority items. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v10*
