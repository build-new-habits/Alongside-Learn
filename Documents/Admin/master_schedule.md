# Alongside: Learn — Master Schedule
## 10 Aug 2026 v16

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Join-at-sign-up** | **Built.** A family code + role can now be entered directly on the sign-up form — joining is one step instead of four (create account → confirm → sign in → separately find family setup → join). |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. What happened, and the fix

Graeme correctly flagged that becoming a learner required a separate account-creation-then-join flow, and asked whether sign-up should just take a family code directly. It should, and now does — an optional "Family code" field appears on sign-up; entering one reveals a role choice (learner/parent), and joining happens automatically the moment the account is confirmed and first signed into. Leaving it blank behaves exactly as before (family-setup screen afterwards). `family-setup.js` is unchanged and still handles the no-code and create-new-family cases.

**Separately diagnosed:** the 404 Graeme hit was very likely an old confirmation email (sent before the Site URL fix earlier today) being clicked instead of a fresh one — not a new bug. Worth deleting stale "Confirm your email" emails from testing today so only the latest is ever clicked by mistake.

---

## 2. What's testable now

Sign up with a fresh email → family code field appears → paste a valid family code → choose learner or parent → confirm email (using the newest email only) → sign in → should land directly on the right screen (check-in for learner, dashboard for parent) with no separate join step needed.

---

## 3. Beta-blocking vs public-launch-blocking

Unchanged from v15 — all core beta-blocking build items remain complete. This was a genuine UX fix, not a new feature category.

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1–v15 | 10 Aug 2026 | See `Past MS/`. |
| v16 | 10 Aug 2026 | Family code + role join built directly into sign-up, removing a separate post-signup step. Diagnosed a 404 as a stale confirmation email, not a new bug. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v16*
