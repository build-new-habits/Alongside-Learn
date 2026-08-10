# Alongside: Learn — Schema
## 10 Aug 2026 v1

Build New Habits Ltd | Confirmed working schema, replacing the scaffold status of Documents/Planning file 05. Written schema-first per file 07 §1/§4: no application file reads a field not documented here. Any change to this file supersedes it with an incremented version — no silent field additions.

**Status: proposal for Graeme's review before first code touches it (file 07 §2, session checklist).** Not yet locked.

---

## 1. Core tables

### `family`
| Field | Type | Notes |
|---|---|---|
| family_id | uuid, PK | |
| created_at | timestamptz | |
| parent_ids | uuid[] | 1–2 parent user IDs |
| learner_ids | uuid[] | up to 5 learner user IDs |
| tier | text | `free` \| `athena` — beta families default to `athena` unless stated otherwise, per beta scope |
| academic_year_start | date | drives phase calculation (see §5) |

### `user`
| Field | Type | Notes |
|---|---|---|
| user_id | uuid, PK | Supabase auth.users linked |
| family_id | uuid, FK → family | |
| role | text | `parent` \| `learner` |
| name | text | |
| date_of_birth | date | required for learners — drives age-band routing for safeguarding word sets (file 06 §2) |
| coach_voice | text | always `nurturing` — internal only, never exposed in UI (file 02 §2) |

### `learner_profile`
| Field | Type | Notes |
|---|---|---|
| user_id | uuid, PK/FK → user | |
| subjects | jsonb | subject/topic map |
| safeguarding_level | int | 1, 2, or 3 — computed, not user-set. Tier-agnostic detection function (file 05 §5) even though triggering fields are currently Athena-only |
| checkin_streak_shown | bool | always `false` — Learn has no streak mechanic, field exists only to prevent one being added by mistake |

### `checkin`
| Field | Type | Notes |
|---|---|---|
| checkin_id | uuid, PK | |
| user_id | uuid, FK → user | |
| date | date | |
| energy | int 1–5 | Free tier |
| mood | int 1–5 | Free tier |
| sleep | int 1–5 | Free tier |
| stress | int 1–5, nullable | Athena only |
| free_text | text, nullable, max 200 chars | Athena only. **Subject to signal-word scan (file 04 §3). Journal Privacy Rule: this field only — never extended to any future journal feature without an explicit documented decision.** |
| subject_focus | text, nullable | |
| timestamp | timestamptz | |

### `parent_profile`
| Field | Type | Notes |
|---|---|---|
| user_id | uuid, PK/FK → user | |
| notification_prefs | jsonb | |

### `parent_checkin`
| Field | Type | Notes |
|---|---|---|
| checkin_id | uuid, PK | |
| user_id | uuid, FK → user (parent) | **Private to this parent — RLS must never allow the co-parent to read this row.** |
| response | jsonb | |
| date | date | |

### `assignment`
| Field | Type | Notes |
|---|---|---|
| assignment_id | uuid, PK | |
| learner_id | uuid, FK → user | |
| subject | text | |
| title | text | |
| due_date | date | |
| status | text | |
| details_mode | bool | Athena only |

### `flashcard`
| Field | Type | Notes |
|---|---|---|
| card_id | uuid, PK | |
| learner_id | uuid, FK → user | |
| subject | text | |
| topic | text | |
| question | text | |
| answer | text | |
| next_review_date | date | spaced repetition |
| coach_suggested | bool | Athena only |

### `revision_timetable_entry`
| Field | Type | Notes |
|---|---|---|
| entry_id | uuid, PK | |
| learner_id | uuid, FK → user | Athena only feature |
| subject | text | |
| scheduled_at | timestamptz | |
| coach_generated | bool | |

### `risk_matrix`
| Field | Type | Notes |
|---|---|---|
| learner_id | uuid, PK/FK → user | Athena only |
| subject_confidence | jsonb | per-subject, post-mock |
| parent_facing_summary | text | synthesised only — **raw scores never exposed to parent, enforce at query level, not just UI** (file 04 §7) |

### `notification_log`
| Field | Type | Notes |
|---|---|---|
| log_id | uuid, PK | |
| user_id | uuid, FK → user | |
| type | text | |
| sent_at | timestamptz | |
| consented_by_learner | bool | required true for any parent-facing message about a learner (file 04 §4 consent rule) |

---

## 2. Row Level Security — family-scoped model (first-pass policy, beta-blocking per master_schedule.md §2)

This is the single highest-risk item flagged across the whole planning pack (file 05 §1). First-pass rules, to be tested against real scenarios before any beta family's data goes in:

1. A user can always read/write their own rows (`user_id = auth.uid()`).
2. A parent can read a learner's `checkin`, `assignment`, `flashcard`, `revision_timetable_entry`, and `risk_matrix.parent_facing_summary` **only** — never `risk_matrix.subject_confidence` (raw scores), never `checkin.free_text` directly, and never another parent's `parent_checkin` rows.
3. A learner's `checkin.free_text` and `stress` fields are never readable by a parent directly — only the coach-synthesised outputs derived from them (workload alerts, risk matrix summary) are, and only with `notification_log.consented_by_learner = true`.
4. No cross-learner visibility — a parent viewing Learner A's dashboard must never be able to query Learner B's rows through the same session, even within the same family.
5. `parent_checkin` rows are visible only to the parent who wrote them — enforce at the RLS policy level, not just app logic.

**Not yet done:** formal policy syntax, adversarial testing (e.g. attempting cross-family or cross-learner reads directly via API), and sign-off. This is a first pass to build against — full audit remains a public-launch-blocking item.

---

## 3. Phase calculation (file 05 §3)

`current_phase` is derived, not stored per user:

```
phase = f(today's date, family.academic_year_start)
Foundation: Sept–Oct
Build: Nov–Jan
Peak: Feb–Apr
Exam: May–Jun
Reflect: Jun–Aug
```

Implemented as a pure function in `store.js`, not a database field, to avoid a nightly stale-phase bug class.

---

## 4. Explicitly deferred from this schema pass

- Family calendar structure (shared vs. per-learner events) — needs its own short session, not blocking Window A start
- Two-parent connection-prompt frequency counter — add when that notification is actually built
- Re-engagement prompt shown-flag/event-window ID — add when that notification is actually built

These are genuinely fine to add later without breaking anything above — none of Window A's beta-blocking work depends on them.

---

*Build New Habits Ltd · Alongside: Learn · Schema · 10 Aug 2026 v1*
