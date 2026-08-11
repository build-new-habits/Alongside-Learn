# Alongside: Learn — Master Schedule
## 10 Aug 2026 v17

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Confirmation link 404 — actually fixed** | Corrected v16's diagnosis: Graeme confirmed the failing link was a genuinely fresh sign-up at 11:10am, not a stale email. Real cause: `signUp()`/`resend()` weren't explicitly setting where the confirmation link should redirect to, so the client library's default silently dropped the `/Alongside-Learn/` path. Fixed by explicitly setting it on every call. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Correction to v16

v16 guessed the 404 was a stale confirmation email from earlier testing. Graeme correctly pushed back — the email was sent at 11:10am to a previously-unused address, ruling that out. Real cause found and fixed: neither `signUp()` nor `resendConfirmation()` in `js/auth.js` were explicitly telling Supabase where the confirmation link should point, so it fell back to a default that doesn't include the GitHub Pages repo subpath. Both now explicitly set it from the actual page URL at the moment of signing up — removes the whole failure class rather than patching the symptom.

**Honesty note:** the exact default-resolution mechanism that was failing isn't something I could verify directly (no live access to supabase.co from here), so the diagnosis is inference from the symptom, not a confirmed root cause from testing. The fix itself doesn't depend on that being exactly right — it works either way.

---

## 2. What's testable now

Sign up with a genuinely new email address → confirm → link should land on `build-new-habits.github.io/Alongside-Learn/` correctly this time, not the bare domain 404.

---

## 3. Unchanged from v16

All core beta-blocking build items remain complete. Beta-blocking checklist and open items are as per v15/v16.

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1–v16 | 10 Aug 2026 | See `Past MS/`. |
| v17 | 10 Aug 2026 | Corrected v16's stale-email diagnosis after Graeme pushed back with evidence. Found and fixed the real cause: missing explicit `emailRedirectTo` on sign-up and resend, which let the client default silently drop the repo subpath from the confirmation link. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v17*
