# Alongside: Learn — Master Schedule
## 10 Aug 2026 v4

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| Stack | Vanilla JS PWA, GitHub Pages, Supabase (Frankfurt, project live) |
| Supabase project | **Live.** URL: `https://jbajchcwnbqughesaepc.supabase.co`. Publishable key wired into `js/store.js`. Schema not yet applied — SQL migration ready, waiting on Graeme to run it (Section 2). |
| Safeguarding reviewers | Graeme (self, 20+ yrs trained) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Decisions log

| # | Decision | Status |
|---|---|---|
| 1 | Launch scope: private beta, trusted families | Confirmed 10 Aug |
| 2 | Stack: vanilla JS PWA + Supabase (Frankfurt, separate project) | Confirmed 10 Aug |
| 3 | Tracker location: `Documents/Admin/master_schedule.md` | In use |
| 4 | Safeguarding reviewers named | Confirmed 10 Aug — engagement/sign-off still to happen |
| 5 | Pricing | Deferred to pre-public-launch |
| 6 | Supabase project created (Frankfurt) | **Done 10 Aug** — URL and publishable key received and wired in |

---

## 2. Right now — action needed from Graeme

**Run the schema migration.** SQL file is live at `sql/001_initial_schema.sql` in the repo. Creates every table from `schema.md` v1, enables RLS on all of them, and applies the first-pass family-scoped policies (owner-only on `checkins`, `parent_checkins`, and `risk_matrices` raw scores — parents read only through the masked `risk_matrix_parent_view`).

Steps:
1. Supabase dashboard → your `Alongside-Learn` project → left sidebar → **SQL Editor**
2. **New query**
3. Open `sql/001_initial_schema.sql` from the repo (or I can paste the contents directly if easier on mobile), paste the whole thing in
4. Click **Run**
5. Sanity check — run this after, should return 10 rows all with `rowsecurity = true`:
   ```sql
   select tablename, rowsecurity from pg_tables where schemaname = 'public';
   ```

Once that's run and confirmed, the app can actually talk to real data and I can start building the coach shell and check-in flow against it.

---

## 3. Beta-blocking vs public-launch-blocking (unchanged)

**Beta-blocking:** crisis-signal detection wired and tested, fixed safeguarding response + always-visible resources live, resource links verified, RLS family hard-wall tested (first-pass now written, needs real testing once schema is applied), Journal Privacy Rule enforced.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall.

---

## 4. Build windows

- **Window A** (10–18 Aug): scaffold ✅, schema written ✅, Supabase live ✅, migration pending Graeme's run, then: RLS testing, coach shell, check-in flow incl. safeguarding detection, design system components.
- **Window B** (19–28 Aug, holiday, phone-only): coach-voice scripts, parent coaching content, notification copy.
- **Window C** (29–31 Aug): wire content in, QA, re-verify crisis links, final commits, invite first beta families.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1 | 10 Aug 2026 | First master schedule. |
| v2 | 10 Aug 2026 | Launch scope + stack confirmed. |
| v3 | 10 Aug 2026 | Reviewers named, pricing deferred, today's plan added. |
| v4 | 10 Aug 2026 | Repo scaffold, `variables.css`, and `schema.md` v1 pushed. Supabase project created and connection details wired into `store.js`. SQL migration (`sql/001_initial_schema.sql`) written and pushed — awaiting Graeme to run it in the Supabase SQL editor. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v4*
