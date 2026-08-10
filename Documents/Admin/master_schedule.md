# Alongside: Learn — Master Schedule
## 10 Aug 2026 v3

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Stack | Vanilla JS PWA, GitHub Pages, Supabase (separate project, Frankfurt eu-central-1) |
| Repo state | Planning pack + Admin schedule live. Scaffold and schema.md added today (Section 2). |
| Safeguarding reviewers | Graeme (safeguarding-trained, 20+ years) — self, ongoing. A solicitor — to be confirmed. A school DSL (Designated Safeguarding Lead), personal contact — to be confirmed. **Logged, not yet formally engaged/signed off.** |
| Pricing | Deferred deliberately. Revisit before any public launch — do not build paywall copy until then. |

---

## 1. Decisions log

| # | Decision | Status |
|---|---|---|
| 1 | Launch scope: private beta, trusted families | Confirmed 10 Aug |
| 2 | Stack: vanilla JS PWA + Supabase (Frankfurt, separate project) | Confirmed 10 Aug |
| 3 | Tracker location: `Documents/Admin/master_schedule.md` | In use |
| 4 | Safeguarding reviewers named: Graeme (self), solicitor (TBC), school DSL friend (TBC) | Confirmed 10 Aug — engagement/formal sign-off still to happen |
| 5 | Pricing | Deferred to pre-public-launch, confirmed 10 Aug |

---

## 2. Today — 10 Aug 2026

**Aim:** get the repo from "planning docs only" to "scaffold exists, schema is real, build can start the moment Supabase is live."

| Task | Owner | Success criteria |
|---|---|---|
| Repo folder scaffold (`index.html`, `css/`, `js/`, `sw.js` stub) per file 00 §3 | Claude | Pushed to `main`, verified by fresh clone |
| `variables.css` populated with confirmed design tokens (file 01) | Claude | All colour/spacing/radius/type tokens present, Learn indigo palette used, contrast values match file 01 table |
| `schema.md` — real schema, replacing file 05's scaffold status | Claude | Every table/field from file 05 reviewed and either kept, renamed, or dropped; family-scoped RLS approach stated in plain terms for later policy-writing; no field left as "TBC" without being logged as a gap |
| **Supabase project created (Frankfurt, separate from Move)** | **Graeme** | Project exists; connection URL + keys shared with me so I can start wiring the schema in |
| Reviewer engagement — first message to solicitor and DSL friend, even informal | Graeme | Not blocking today's build, but the sooner this starts the less it threatens the beta date |

**What "done" looks like by end of today:** scaffold and schema live in the repo, fresh-clone verified, master schedule updated to v4 reflecting it. The one thing I can't do myself is create the Supabase project — that's the one action item that's actually yours today.

---

## 3. Beta-blocking vs public-launch-blocking (unchanged from v2, restated for reference)

**Beta-blocking:** crisis-signal detection wired and tested, fixed safeguarding response + always-visible resources live, resource links verified, RLS family hard-wall tested, Journal Privacy Rule enforced from day one.

**Public-launch-blocking (not needed for beta):** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall.

---

## 4. Build windows (unchanged from v2)

- **Window A** (10–18 Aug): scaffold, schema, Supabase, RLS first pass, coach shell, check-in flows incl. safeguarding detection, design system components.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy — no Supabase needed.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1 | 10 Aug 2026 | First master schedule. |
| v2 | 10 Aug 2026 | Launch scope + stack confirmed. Beta vs public-launch blockers split. |
| v3 | 10 Aug 2026 | Safeguarding reviewers named (Graeme, solicitor TBC, DSL friend TBC). Pricing deferred. Today's task list and success criteria added. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v3*
