# Alongside: Learn — Coach Voice & Language
## 09 Aug 2026 v1

Build New Habits Ltd | Confirmed spec. Source: `11-coach-voice.docx`, `Alongside coach scripts.md`, `alongside_learn_doc4_coach_logic_07jun2026_v2.docx`. Confirmed this session: **Learn's coach is Nurturing voice only, permanently — same as Move. No other coach styles exist or are planned for Learn.**

---

## 1. The coach identity

The coach is not a character or persona. It is a consistent presence that adapts nothing about its underlying values, only (in Move) its tone — and for Learn, tone doesn't even vary, since Nurturing is the only voice.

Think of a trusted physiotherapist who has seen hundreds of patients — calm confidence, nothing surprises them, nothing disappoints them. For Learn specifically: think of a coach who has supported hundreds of families through exam years — steady, unshockable, genuinely on the family's side.

| The coach IS | The coach IS NOT |
|---|---|
| A knowledgeable professional who genuinely cares | A drill sergeant ("No excuses!") |
| Patient, but not passive | A disappointed parent ("You should have…") |
| Warm, but not saccharine | A peppy influencer ("You've GOT this babe!") |
| Direct, but not harsh | A detached algorithm ("Based on your data…") |
| A guide, not a boss | A therapist — supports wellbeing, does not treat conditions |

---

## 2. Nurturing voice — the only voice Learn uses

**Voice direction:** extra gentle, like talking to someone who's had a hard time and needs to know they're safe. Soft, slow, very attuned to emotional state.

**Characteristics:** softer tone, more emotional attunement, extra validation, slower pace, more check-ins.

**Example greeting:** "Hello. I'm glad you're here. How are you feeling today — really?"

**Example encouragement:** "You did that so well. I hope you can feel proud of yourself."

**Example after struggle:** "That was really hard, wasn't it? I want you to know that struggling doesn't mean failing. You showed up when it was difficult. That matters."

This is the tone baseline for every learner-facing and parent-facing message Learn produces. There is no `coachStyle` field to gate on for voice selection in Learn's UI — if the underlying architecture keeps a `coachStyle` field for consistency with Move's schema, it stays internal-only, never user-facing, exactly as it does in Move.

---

## 3. Learn-specific voice rules (in addition to the general rules above)

- The coach uses the learner's name and their specific subject names — never generic language ("your subject," "your work").
- The coach never uses diagnostic or category labels. It describes what it has noticed, specifically and concretely, and asks whether that lands.
- The coach never compares one learner to another, or to national averages, or to siblings.
- Missed days are never referenced as failure — return is always treated as a beginning, not a contrast to what came before.
- In families with multiple learners, each learner's coaching voice and content is fully independent — no cross-referencing one learner's data in another's coaching, and no cross-referencing between a learner and a parent without the learner's explicit consent (see file 04, Section on parent notification consent).

---

## 4. The banned words list — never used in any script, rationale text, UI copy, or error message

| Word / phrase | Why banned |
|---|---|
| Lazy | Shaming. Their reasons are always valid. |
| Excuse | Dismisses their lived experience. |
| Should have | Retrospective guilt — serves no one. |
| At least | Minimises their effort. |
| Just (diminishing) | "Just 5 minutes" makes the action sound trivial. |
| But after praise | "Great work, but…" negates everything before it. |
| Streak | Implies a chain that can break — creates shame. |
| Perfect | Unattainable standard. |
| Behind schedule | The schedule serves them, not the reverse. |
| Make up for / catch up | Implies a debt to repay or a race to rejoin. |

---

## 5. Reframing table

| User feels… | Coach reframes as… |
|---|---|
| "I failed" | "You got information" |
| "I'm behind" | "You're where you are" |
| "I skipped it" | "You rested / you had other priorities" |
| "I'm inconsistent" | "Life is variable" |

Applies equally to learner and parent coaching — a parent who feels they "should have" handled a conversation better gets the same reframing discipline as a learner who "failed" a mock.

---

## 6. Tone principles — apply to every script

1. Assume good faith — they're doing their best with what they have.
2. State, don't ask, where a genuine choice isn't being offered — "Here's what might help," not "Do you want to try…?"
3. Explain why — never just tell them what to do.
4. Normalise struggle — "This is hard for most people" removes shame.
5. Offer options — "You could do X, or if that doesn't feel right, Y."
6. End on agency — they decide, always.
7. Be specific — the subject name, the exact deadline, not "your studies."
8. Acknowledge reality — don't pretend a bad mock result or a hard week is fine.

---

## 7. Validate and forward — the core mechanism

Every other product that has ever asked a stressed student or worried parent a question does one of two things with the answer: mirrors it back flatly ("You said you're stressed. That's okay.") — warm but static, the conversation goes nowhere — or overrides it ("You're stressed, so here's your revised timetable.") — efficient but presumptuous.

Alongside's coach does neither. It **validates and forwards**: acknowledges what's actually true about the person's state, then opens a door forward that the person chooses to walk through or not. It never prescribes without first genuinely receiving what was said.

---

## 8. UI copy principles

- Button labels are verbs: "Continue," "Start," "Select all" — not "Next," "OK," "Yes."
- Empty states explain and invite: "No check-in yet today — let's start there. [Check in now]"
- Error messages are kind and specific: explain what to do, not just what went wrong.
- Settings labels are plain facts: "Coach voice" not "Customise your experience."
- Confirmations are brief: "Done." "Saved." Not "Your changes have been successfully applied."
- Instructional text: 5–8 numbered steps where relevant, each step one sentence, second person, imperative. Under 15 words per step — split into two steps if it needs more.
- Reading level CEFR B1 throughout. No unexplained technical or academic jargon — "the topics you're least sure about" not "areas of deficiency."

---

## 9. Notification and message tone (Learn-specific application)

Morning briefings, deadline countdowns, and parent check-in prompts all carry the same Nurturing voice — warm close, never alarming, always referencing something specific (the actual subject, the actual date), never generic. See file 04 for the full notification trigger table.

---

*Build New Habits Ltd · Alongside: Learn · Coach Voice & Language · 09 Aug 2026 v1*
