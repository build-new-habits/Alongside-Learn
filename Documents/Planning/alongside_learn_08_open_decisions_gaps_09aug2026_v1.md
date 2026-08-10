# Alongside: Learn — Open Decisions & Gaps
## 09 Aug 2026 v1

Build New Habits Ltd | Every gap, unresolved decision, and item needing Graeme's or a professional reviewer's confirmation, pulled from across this whole pack into one place. **Read this file before starting the first build session** — it's the honesty check for the rest of the pack.

---

## 1. Missing spec documents

Learn's original 5-doc spec plan named Docs 2 (Schema), 3 (File Architecture), 6 (Safeguarding/Legal detail), and 7 (Safety by Design) as needed alongside the three that were completed (Docs 1, 4, 5). None of the four were ever written.

- **Doc 2 (Schema):** file 05 in this pack is a scaffold derived from the completed docs, not a substitute. Needs a dedicated schema-design session before real data touches it.
- **Doc 3 (File Architecture):** not attempted in this pack at all beyond a stack recommendation (file 05, Section 1). Needs its own session once the schema is confirmed.
- **Doc 6 (Safeguarding/Legal detail):** file 06 compiles what exists in the shared family Crisis & Safeguarding Policy plus Doc 1's open items — it is not a replacement for a Learn-specific safeguarding/legal document.
- **Doc 7 (Safety by Design):** not written, not attempted in this pack. Flag for a dedicated session.

---

## 2. Repo and infrastructure — nothing exists yet

- No GitHub repo for Learn exists. File 00 gives setup steps.
- No Supabase project exists for Learn. File 05 recommends Frankfurt/eu-central-1 for consistency with Move but this is not confirmed.
- No fine-grained GitHub token has been generated for Learn — file 00 gives the setup steps, same 7-day-expiry convention as Move.
- No new Claude project has been created yet — this pack is intended to seed one.

---

## 3. Pricing — undecided

Move has confirmed price points (per its own freemium model documentation). Learn does not. File 03 notes referral-code mechanics as a reasonable starting assumption but explicitly flags this as unconfirmed. **Do not build any paywall or upgrade flow copy for Learn assuming specific price points until this is set.**

---

## 4. Safeguarding and legal — the largest cluster of open items

All detailed in file 06. Summary list for quick reference:

1. Word list verification against Learn's actual live check-in screen (once built).
2. Teen message (13–17) review against full PAPYRUS guidance by a named youth-safeguarding credential holder.
3. Article 22 UK GDPR position on the automated fixed-message response.
4. Parental notification policy when a 13–17 year-old learner selects a flagged word — **more urgent for Learn than for Move**, since Learn has a live parent-facing account structure and Move currently doesn't.
5. DPIA requirement and scope.
6. Online Safety Act applicability to Learn's multi-user family structure specifically.
7. Whether safeguarding levels 2 and 3 should really be tier-gated to Athena-only, given they depend on Athena-only fields (file 04, Section 2; file 06, Section 5).
8. ICO registration for Learn (separate from Move's, since Learn processes minors' data).
9. Age verification / GDPR-K compliance for under-16 data handling.
10. Supabase RLS "hard wall" audit for the family-scoped access model (file 05, Section 1) — has never been reviewed and is flagged as one of the highest-risk gaps in the whole pack.
11. Three safeguarding reviewer roles (youth-safeguarding, legal, third TBD) remain entirely unfilled across the whole product family — blocks Learn launch outright, given Learn's under-18 primary audience.

---

## 5. Product-spec gaps

- **August transition phase** (file 03, Section 4 / file 04, Section 9): noted in the source material but never fully specified. Needs its own scoping session before Reflect-phase build work reaches that far.
- **Parent-as-learner dual role:** flagged in Doc 1 as a future scope item, not resolved.
- **A-level / T-level expansion:** flagged as a future version consideration, not scoped.
- **Lifetime tier design:** flagged as post-launch, not scoped.

---

## 6. Architecture gaps requiring a dedicated session before build

- Exact Supabase table/column definitions and RLS policy syntax for the family-access-consent model (file 05, Section 6).
- File/module ownership map — which `.js` file owns which piece of coach logic, mirroring Move's technical-blueprint level of detail (never produced for Learn).
- Phase-calculation logic implementation (derived from academic-year start date vs. stored per-user — file 05, Section 3).

---

## 7. What is genuinely settled and safe to build from without further confirmation

To keep this file from reading as universally uncertain — these are real, confirmed, and stable:

- Product vision, five-phase arc, user/family model (file 03).
- Coach voice: Nurturing only, permanently, no other styles (file 02) — confirmed explicitly this session, superseding the older Doc 5 tier table that listed four coach styles as an Athena feature.
- Shared design system and Learn's colour palette (file 01).
- Feature list and tier-gating table, aside from the safeguarding-levels question flagged above (file 04).
- The core detection *mechanism* for crisis/safeguarding (word-based, deterministic, no AI sentiment analysis) — the mechanism itself is settled; several policy questions around its application to Learn are not.

---

## 8. Recommended first session in the new project

A planning-only session: read all nine files in this pack in full, confirm or amend the repo/stack recommendations in file 00 and file 05, and produce Learn's first real master schedule (file 07, Section 3) that explicitly lists every item in this file as a tracked open item — not resolved, just tracked, so nothing here gets silently lost the way it was between the original Doc 2/3/6/7 gap and now.

---

*Build New Habits Ltd · Alongside: Learn · Open Decisions & Gaps · 09 Aug 2026 v1*
