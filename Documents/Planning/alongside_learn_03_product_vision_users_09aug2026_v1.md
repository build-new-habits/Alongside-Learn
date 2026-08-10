# Alongside: Learn — Product Vision, Users & Business Context
## 09 Aug 2026 v1

Build New Habits Ltd | Confirmed spec, drawn directly from `alongside_learn_doc1_vision_07jun2026_v2.docx` (Doc 1 of 5, 07 Jun 2026 v2) plus family-context material. This is Learn's most complete source document — treat it as close to primary-source as this pack gets.

---

## 1. Purpose and product vision

Alongside: Learn is a coaching application for GCSE students and their families. It supports students through the academic, emotional, and organisational demands of Year 11 — and coaches their parents through the experience of supporting a teenager under pressure without adding to that pressure.

Built on three convictions:

- Teenagers under exam stress are not failing to cope — they are communicating. Withdrawal, avoidance, or struggle is information, not character.
- Parents who love their children can still make things harder without meaning to. They need coaching, not criticism.
- A household that functions well is the most powerful revision tool available.

Alongside: Learn does not replace teachers, tutors, or revision guides. It holds the human architecture around the student — habits, household, confidence, the parent-child relationship — and coaches all of it, simultaneously and separately.

---

## 2. Product family context

Alongside: Learn is the second product in the Alongside family, built by Build New Habits Ltd. The family shares a design system, a coaching philosophy, and a business model — each product has its own data infrastructure, visual identity, and user base.

| Product | Personal tier name | Domain | Status |
|---|---|---|---|
| Alongside: Move | Apollo | Adaptive fitness coaching | Live/active build — flagship, pre-beta |
| **Alongside: Learn** | **Athena** | **GCSE family coaching (student + parent)** | **Full spec exists (blueprint phase) — this pack** |
| Alongside: Rest | Hypnos | Restoration | Name only |
| Alongside: Love | Aphrodite | Coaching for carers/supporters | Name only |
| Alongside: Life | Hestia | Independence/life skills for young adults | Confirmed scope, coming soon; natural forward connection from Learn |
| Alongside: Lead | Themis | Leadership coaching | Name only |
| Alongside: Compass | Nestor | Over-60s digital navigation | Name only |
| Alongside: Savvy | Iris | Under-16s digital capability | Name only |

**Forward connection:** Learn's multi-learner family model has a natural link to Alongside: Life, which supports independent living and whole-life coaching. A family using Learn across multiple children at different educational stages is already the target user for Life once those children move on.

---

## 3. The users

Alongside: Learn serves a family unit. One parent creates the family and can invite up to **five learners** (children or young people at any stage of education) and **one additional parent or trusted adult**. Each user has their own account, their own coaching experience, and their own data boundary.

The five-learner model supports large families and families with children at different educational stages simultaneously — a family might have one child doing GCSEs, another doing A-levels, and a third starting Year 10, all within one family account, each with their own coaching arc.

**3.1 The student (learner)** — any young person invited into the family by a parent. Full account, own coach relationship, own privacy boundary within the family structure.

**3.2 The parent(s)** — the account creator and, optionally, one additional parent or trusted adult. Each parent coached independently; check-in responses are private between each parent and the coach (see file 04, Section on two-parent households).

---

## 4. The five-phase coaching arc (September to August)

The coach arc runs from September through the exam year and into the transition to the next stage. Each phase has a distinct coaching focus, check-in cadence, and parent coaching intensity. Phase is determined by the current date relative to the family calendar.

| Phase | Months | Learner focus | Parent focus |
|---|---|---|---|
| 1. Foundation | Sept–Oct | Building habits, understanding the year, settling into check-ins, exploring revision techniques | Home environment, understanding the year ahead, oxygen mask introduction |
| 2. Build | Nov–Jan | Deepening revision, mock preparation, confidence mapping, next-step decisions | Conversation coaching, teenage brain content, managing pressure, mock support |
| 3. Peak | Feb–Apr | Post-mock risk matrix, revision timetable, intensifying revision, workload management | Post-mock coaching, household atmosphere, what to celebrate, when to back off |
| 4. Exam | May–Jun | Daily coach support, exam-day preparation, between-exam recovery | How to be present without adding pressure, exam-day logistics, celebrating effort |
| 5. Reflect | Jun–Aug | Processing results, celebrating the year, next-step planning, late August transition preparation | Results day coaching, future planning conversations, transition support |

**Gap flagged in the source material:** the August transition phase (late July–August) is noted but not fully specified — covers preparation for next-stage entry (sixth form, college, apprenticeship). Full scoping was deferred to a future Doc 1 version that was never written. See file 08.

---

## 5. Visual identity — pointer

Full detail lives in file 01 (Brand & Design System). Learn inherits the family design system (typography, spacing tokens, component patterns, 44px touch targets, WCAG 2.2 AA) with its own deep-indigo colour palette layered on top.

---

## 6. Philosophical foundations

**Behaviour is communication.** A learner who withdraws, snaps, or avoids the app is not failing. They are communicating that something is not working. The coach's job is to receive that communication accurately and respond to it.

**The coach at the door.** The coach speaks first. Every session opens with the coach — not a dashboard, not a task list. Content follows conversation.

**Empathy transfer.** A learner who feels genuinely understood becomes better at understanding others, including their parents. A parent who feels coached rather than blamed becomes better at holding space for their child. The household gets better at being a household.

**No category language.** The coach never uses diagnostic or category labels. It describes what it has noticed, specifically and concretely, and asks whether that lands.

**The oxygen mask principle.** Parents cannot support their children through exam stress if they are drowning in it themselves. Parent coaching is an equal and essential part of the product, not a secondary function.

**No shame architecture.** No streak mechanics. No missed-day penalties. No comparison with other students. Return after absence is always treated as a beginning, not a contrast.

---

## 7. Business model context

Learn shares Move's coaching engine, philosophy, and business model shape — but its own pricing has not been set (see file 08). Referral-code mechanics used elsewhere in the family (network-effect discounting) are a reasonable starting assumption for Learn, but this has not been confirmed for Learn specifically and should not be treated as decided.

---

## 8. Open items before launch (from Doc 1, Section 10 — still open as of this pack)

| Item | Owner / notes |
|---|---|
| Safeguarding policy document | Requires named youth-safeguarding reviewer sign-off before any testing with minors — role still unfilled (see file 06/08) |
| ICO registration for Learn | Separate registration — Learn processes data about minors |
| Age verification and GDPR-K compliance | Legal review required for under-16 data handling |
| Supabase RLS policy audit | Correct hard-wall enforcement between family members' data — no Doc 2 exists yet to audit against (see file 05) |
| Crisis resource verification | All helpline numbers and URLs must be verified before launch |
| Lifetime tier design | Post-launch — survey existing subscribers at 12 months |
| A-level and T-level scoping | Future version — expands beyond GCSE |
| Gold contrast audit | All gold usage reviewed against WCAG 2.2 AA before design handoff — file 01 already applies the correct contrast-safe token |
| August transition arc | Not fully specified — see Section 4 gap above |
| Parent-as-learner dual role | Future scope — flagged for post-launch consideration |

---

*Build New Habits Ltd · Alongside: Learn · Product Vision, Users & Business Context · 09 Aug 2026 v1*
