# Alongside: Learn — Master Schedule
## 10 Aug 2026 v18

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Family code field bug — fixed** | The optional family-code field on sign-up was silently blocking submission when left blank (the valid case for starting a new family) — `labelledInput()` defaults to required, and this was the one field that never got explicitly overridden. |
| **Resend confirmation email — unresolved, likely rate-limited** | Graeme reports no email arrives on resend. Leading theory: Supabase's built-in test email sender has a low hourly cap, and today's testing has sent a lot of confirmation/resend emails. Not yet confirmed via Supabase's own Auth logs — next step, see below. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Pattern worth naming: hidden/optional fields and `required`

Three bugs today have been the same root shape: an HTML input's visibility was changed (hidden, or meant to be optional) without also changing its `required` state to match. This hit: the sign-in form's Name/DOB fields (v10), and now the family-code field. `labelledInput()` defaults every non-date field to `required=true`, and each new optional field needs an explicit override — easy to forget, as this session shows. Worth a quick audit of any future form fields against this specific failure mode before adding new ones.

---

## 2. Next step on the email issue

Check Supabase dashboard → **Authentication** → **Logs** to see whether resend requests are actually reaching Supabase and what happens to them (rate-limited vs. genuinely not sending). If confirmed as a rate limit, the real fix is custom SMTP (Dashboard → Authentication → Emails → SMTP Settings) — a provider like Resend has a workable free tier. This needs Graeme's dashboard access and an external account, not something doable from the repo alone. Flagged as the next concrete step, not yet actioned.

---

## 3. What's testable now

Sign-up form: family code field should now accept being left blank without any "please fill in this field" error, and correctly reveal the role choice once something is typed into it.

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1–v17 | 10 Aug 2026 | See `Past MS/`. |
| v18 | 10 Aug 2026 | Fixed family-code field wrongly requiring input when blank was valid. Named the recurring required/visibility bug pattern. Resend-email issue still open — Auth logs check is the next diagnostic step. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v18*
