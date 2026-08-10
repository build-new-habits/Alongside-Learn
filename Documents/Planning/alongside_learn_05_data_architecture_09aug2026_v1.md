# Alongside: Learn — Data & Architecture Scaffold
## 09 Aug 2026 v1

Build New Habits Ltd | **NOT a confirmed spec.** Doc 2 (Schema) and Doc 3 (File Architecture) were planned for Learn but never written. This file is a scaffold derived from (a) Move's proven architecture patterns and (b) the features explicitly named in file 04 (Coach Logic & Features). Treat every field name and structural choice here as a **proposal for the first Learn build session to confirm or amend**, not as settled fact. Do not schema-lock any of this without a deliberate decision, the same discipline Move applies to its own schema.

---

## 1. Recommended stack — inherited from Move, not yet confirmed for Learn

Move's stack: vanilla JS PWA, GitHub Pages hosting, no framework, no bundler, Supabase backend (Frankfurt, eu-central-1), hybrid relational + JSONB, per-user Row Level Security.

**Recommendation:** Learn should inherit the same stack for consistency, code reuse, and because the design system (file 01) is built as CSS custom properties specifically to support this pattern across products. **Not yet confirmed by Graeme for Learn specifically — confirm before the first architecture decision is locked.**

**Key structural difference from Move that must shape the schema from day one:** Learn is a **multi-user family account model**, not a single-user model like Move. This has real consequences:
- A single Supabase project for Learn should almost certainly use a separate project from Move's (matching the "separate data infrastructure" commitment in file 03, Section 2), likely also Frankfurt eu-central-1 for consistency.
- Row Level Security needs a **family-scoped** model, not a purely per-user model: a parent needs read access to certain learner data (with the learner's consent per feature — see file 04 Section 4), and RLS policies need to enforce that correctly per data type, not as a blanket family-wide read.
- This RLS design was explicitly flagged in Doc 1 as needing review ("Supabase RLS policy audit... correct hard wall enforcement") and never completed. It is one of the single highest-risk gaps in this whole pack — get it reviewed before real family data touches it.

---

## 2. Proposed high-level data model

This is a draft only. Names, nesting, and types should be treated as a starting proposal, following Move's proven pattern of nested objects grouped by feature area rather than one flat table.

```
family {
  familyId
  createdAt
  parentIds: []          // 1 or 2 parent user IDs
  learnerIds: []          // up to 5 learner user IDs
  tier: "free" | "athena"
}

user {
  userId
  familyId
  role: "parent" | "learner"
  name
  dateOfBirth              // required for learners — safeguarding/age-band routing
  coachVoice: "nurturing"  // internal only, never user-facing (see file 02)
}

learnerProfile {
  userId
  subjects: []              // subject/topic map
  currentPhase              // derived from family calendar, not stored redundantly if avoidable
  safeguardingLevel         // 1, 2, or 3 — see file 06
  checkinHistory: []
}

checkin {
  userId
  date
  energy                    // 1–5
  mood                      // 1–5
  sleep                      // 1–5
  stress                     // 1–5, Athena only
  freeText                  // Athena only — subject to signal-word scan, file 06
  subjectFocus
  timestamp
}

parentProfile {
  userId
  weeklyCheckinResponses: [] // private per parent, never visible to co-parent
  notificationPrefs: {}
}

assignmentTracker {
  learnerId
  items: [{ subject, title, dueDate, status, detailsMode: bool }]  // detailsMode Athena only
}

flashcards {
  learnerId
  cards: [{ subject, topic, question, answer, nextReviewDate }]   // spaced repetition
  coachSuggested: bool        // Athena only
}

revisionTimetable {
  learnerId
  entries: []                 // Athena only, coach-generated adaptive
}

riskMatrix {
  learnerId
  subjectConfidence: {}       // per-subject, post-mock — Athena only
  parentFacingSummary          // synthesised text only — raw scores never exposed to parent, per file 04
}

notificationLog {
  userId
  type
  sentAt
  consentedByLearner: bool    // required for any parent-facing message about a learner
}
```

---

## 3. Fields implied directly by file 04 but not yet named — flag for first build session

- Family calendar structure (shared events vs. per-learner events, exam dates, deadlines)
- Phase calculation logic — likely derived from a stored academic-year start date + fixed phase boundaries (Sept/Nov/Feb/May/Jun), not stored as a raw field per user
- Multi-learner switching state on the parent dashboard (which learner view is currently active)
- Two-parent connection-prompt frequency tracking (Peak/Exam phase increase — needs a counter or last-shown timestamp)
- Re-engagement prompt "shown once per event window" — needs an event-window identifier and a shown-flag, matching the pattern Move uses for similar once-per-window prompts

---

## 4. Schema-first discipline — apply from day one

Follow Move's non-negotiable rule exactly: **no file is written that reads a field that doesn't exist yet in the schema.** Write `schema.md` and the equivalent of `store.js` in a single deliberate pass, informed by this scaffold, before any feature code touches new fields. Move's own schema went through real churn (see file 07/08 pattern of dormant vs. live fields) — better to spend the extra planning time up front on Learn than repeat that cleanup debt.

---

## 5. Safeguarding-relevant architecture note

Because levels 2 and 3 safeguarding detection depend on the stress question and free-text field (Athena-tier only, per file 04), and because file 06/08 flags this tier-gating as an open safeguarding concern, the schema should **not** hard-couple safeguarding detection logic to tier status at the data layer. Keep the detection function tier-agnostic even if the *triggering fields* are currently only populated for Athena users — this makes it a one-line policy change, not a schema migration, if the tier-gating decision changes after safeguarding review.

---

## 6. What this file deliberately does not attempt

- Exact Supabase table/column definitions with types and constraints — needs a dedicated schema-design session, following the same rigour as Move's `alongside_blueprint_supabase-schema-design_31jul2026_v1.md`.
- RLS policy syntax — needs its own review given the family-access-consent complexity flagged in Section 1.
- File/module architecture (which `.js` files own which logic) — Doc 3 never existed for Learn; this needs its own session once the schema above is confirmed.

See file 08 for this gap logged alongside the others.

---

*Build New Habits Ltd · Alongside: Learn · Data & Architecture Scaffold · 09 Aug 2026 v1*
