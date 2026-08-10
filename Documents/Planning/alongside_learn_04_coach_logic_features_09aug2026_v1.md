# Alongside: Learn — Coach Logic & Features
## 09 Aug 2026 v1

Build New Habits Ltd | Confirmed spec, drawn directly from `alongside_learn_doc4_coach_logic_07jun2026_v2.docx` (Doc 4 of 5) and `alongside_learn_doc5_features_07jun2026_v2.docx` (Doc 5 of 5), both 07 Jun 2026 v2.

---

## 1. Coach engine principles

The Alongside: Learn coach is **heuristic — rule-based and deterministic. It is not powered by an AI language model.** Every coach response is authored in advance and selected at runtime based on conditions: user inputs, calendar state, phase, scores, pattern history, and tier. This matches Move's approach exactly and should not be treated as a design choice open for reconsideration without a very deliberate decision.

- Coach speaks first — every session opens with a coach message, not a dashboard.
- Coach uses the learner's name and their specific subject names — never generic language.
- Coach never uses category labels — describes what it has noticed in specific, concrete terms.
- Coach never compares learners to other students.
- Coach never references missed days as failure — return is always treated as a beginning.
- In families with multiple learners, each learner's coaching is fully independent.

---

## 2. Learner daily check-in structure

The check-in is the core learner interaction — short, conversational, coach-led. The coach opens with a contextually appropriate message referencing the day, the phase, recent activity, or upcoming events.

| Question | Type / options | Tier |
|---|---|---|
| Energy: how is your energy right now? | 5-point emoji tap row: very low / low / okay / good / high | Free |
| Mood: how are you feeling in general today? | 5-point emoji tap row: very low / low / okay / good / high | Free |
| Sleep: how did you sleep last night? | 5-point tap row: very poor / poor / okay / good / great | Free |
| Stress: how stressed are you feeling about your studies right now? | 5-point tap row: very low / low / manageable / high / overwhelming | **Athena only** |
| Anything specific on your mind today? | Free text, skippable, max 200 chars | **Athena only** |
| What subject are you planning to focus on today? | Subject picker, skippable | Free |

**Critical safeguarding note:** the stress question and free-text field are Athena-tier features and are the **primary safeguarding signals**. Free-tier learners receive only the basic check-in (energy, mood, sleep, subject). Safeguarding level 1 pattern detection operates on the basic check-in alone. Levels 2 and 3 require the stress question and free-text field, and are therefore currently gated to paying users only — flagged explicitly in the source doc as something the safeguarding lead review should specifically address (does full safeguarding capability need to be available regardless of tier?). See file 06/08.

---

## 3. Free-text signal vocabulary (Athena)

The optional free-text field is scanned for signal patterns using a simple string-match against a maintained vocabulary list — **not** AI sentiment analysis. This mirrors Move's signal-words.js approach: deterministic, auditable, versioned.

| Signal category | Example phrases (illustrative, not exhaustive) |
|---|---|
| Hopelessness | nothing will help, pointless, no point, it does not matter, I give up, what is the point |
| Withdrawal | I do not want to do anything, I cannot face it, I just want to stay in bed, cannot be bothered |
| Self-critical spiralling | I am stupid, I always fail, I am useless, I cannot do anything right, everyone else is better |
| Crisis signal | hurt myself, self harm, not here anymore, disappear, end it, cannot go on |

Crisis signal vocabulary triggers safeguarding level 3 immediately, regardless of stress score. **This vocabulary list must be reviewed by a qualified mental health professional before launch and reviewed at least annually thereafter** — not yet done, flagged in file 06/08.

**Journal Privacy Rule applies identically here as it does in Move:** this scan applies only to the dedicated free-text safeguarding field, never to any general journal or reflection content. If Learn ever introduces a private journal feature, it must never be subject to signal detection — non-negotiable, matching Move's standing rule.

---

## 4. Parent coaching — eight themes

Full parent coaching arc is an Athena-tier feature (free tier gets a single weekly check-in question only — see Section 8 tier table).

| # | Theme | Focus |
|---|---|---|
| 1 | (Introductory) | System introduction, home environment setup |
| 2 | Conversation skills | Talking with a teenager under pressure without adding to it |
| 3 | Teenage brain content | What's developmentally happening, why it looks like it does |
| 4 | Mock support | How to support around mock exams |
| 5 | Post-mock coaching | Household atmosphere, what to celebrate, when to back off |
| 6 | Stress reduction for the parent | The oxygen mask principle — managing parental anxiety, sleep, routine, household load |
| 7 | What to celebrate and what to leave alone | Recognising small wins; when silence is the right response |
| 8 | Positive ideas and connection | Concrete suggestions for lightness and connection without talking about revision |

**Phase-specific parent focus:**

| Phase | Parent coach focus |
|---|---|
| Foundation | Introduction to the system, home environment, oxygen mask introduced early, what to expect emotionally |
| Build | Conversation skills, mock preparation coaching, next-step decisions, teenage brain content |
| Peak | Post-mock coaching, risk-matrix-generated parent message about subjects needing support (no raw scores shown), revision timetable sharing |
| Exam | Exam-week coaching, morning routines, exam-day handling, managing own anxiety |
| Reflect | Results-day coaching before and after, response to any result, transition support |

**Multi-learner parent coaching:** in families with multiple learners, the parent coach manages the complexity of supporting children at different stages simultaneously — a real differentiator. Coach addresses the household as a whole in weekly check-ins; event-triggered coaching is learner-specific (a mock for one learner triggers coaching relevant to that learner only). Coach may occasionally acknowledge cumulative parental load: *"Supporting two children through different exam pressures at the same time takes a lot. How are you holding up?"* Parent dashboard shows each learner as a named view, switchable.

**Two-parent household:** each parent coached independently — check-in responses are private between each parent and the coach. Coach occasionally prompts both parents to connect with each other, with frequency increasing in Peak and Exam phases. Neither parent can see the other's check-in responses.

**Workload alert message pattern:**
> *"[Learner name] has some overlapping deadlines coming up — a [Subject] essay due [date] alongside [Subject] coursework due [date]. They have chosen to [plan / ask for help / handle it independently]. You might want to know this so you can help manage the atmosphere around them, or check in to see if the plan is working."*

**Consent rule, non-negotiable:** the learner always sees what the coach sends to parents. The learner always chooses whether the coach sends anything at all.

---

## 5. Notification logic

**Learner notifications:**

| Type | Default | Trigger / content |
|---|---|---|
| Morning briefing | On | Time set by learner (default 7:30am). Coach-voice message referencing today's plan, upcoming deadlines, warm close. |
| Study reminders | On | Linked to planned revision session — "Your [Subject] session is up next. Whenever you are ready." |
| Exam and deadline countdowns | On | 7 days and 1 day before, per subject. Warm, not alarming. |
| Safeguarding resources | Always in-app | Not a push notification — always accessible within the app. Surfaced at safeguarding level 2 and 3. |

**Parent notifications:**

| Type | Default | Trigger / content |
|---|---|---|
| Weekly check-in prompt | On | Day and time set by each parent. |
| Exam reminders per learner | On | 7 days and 1 day before each learner's exams. |
| Event-triggered coaching | On | After mock results entered, workload alert (with learner consent), safeguarding level 1 nudge. |
| Phase transition prompts | On | Start of each new phase — what's coming and how to prepare. |
| Safeguarding level 2 and 3 | Always on | Cannot be turned off. |

**Re-engagement prompt:** two weeks before mock exams, if a learner or parent has key notification types off, the coach surfaces a single in-app prompt explaining the benefit and offering to turn them on. Shown once per event window only.

---

## 6. Revision technique coaching, by phase

| Phase | Techniques introduced |
|---|---|
| Foundation | Active recall, spaced practice, brain dump |
| Build | Flashcard creation, interleaving, practice questions |
| Peak | Timed practice, building an honest revision timetable, topic confidence mapping |
| Exam | Exam-day routine, reading/planning time, handling a hard question, between-exam recovery |
| Reflect | Learning from the year, setting new intentions for next stage |

---

## 7. Confidence mapping and risk matrix

- After each revision session: how did that feel? (per subject, 5-point scale)
- Optional weekly: which subject are you feeling most confident about right now?
- Optional weekly: which subject would you most like more time on?
- Post-mock risk matrix (Athena only) generates a parent-facing message about subjects needing support — no raw scores ever shown to parents, only the coach's synthesised summary.

---

## 8. Tier gating summary — Free vs. Athena

| Feature | Free | Athena |
|---|---|---|
| School timetable | Full access | Full access |
| Family calendar | Full access | Full access |
| Subject and topic map | Full access | Full access |
| Flashcards (manual, spaced repetition) | Full access | Full access |
| Pomodoro study timer | Full access | Full access |
| Daily learner check-in | Basic (energy, mood, sleep) | Full, including stress question and free text |
| Parent dashboard (baseline per learner) | Full access | Full access |
| Weekly parent check-in | Single question | Full check-in |
| Assignment tracker (basic) | Full access | Full access |
| Notification system | Full access | Full access |
| Results day coaching | Full access | Full access |
| Coach-suggested flashcards | Not available | Full access |
| Assignment details mode | Not available | Full access |
| Revision timetable (coach-generated, adaptive) | Not available | Full access |
| Post-mock risk matrix | Not available | Full access |
| Full parent coaching arc (all 8 themes) | Not available | Full access |
| Parent wellbeing coaching (oxygen mask) | Not available | Full access |
| Next-step planning coaching | Not available | Full access |
| Safeguarding levels 1, 2, 3 | Level 1 only | All 3 levels |
| Coach voice | Nurturing only (confirmed for all tiers — see file 02) | Nurturing only |
| Multi-learner family | Up to 2 learners | Up to 5 learners |

Note: the original Doc 5 table listed "all 4 coach styles" as an Athena-tier feature — superseded this session. Learn's coach is Nurturing-only at every tier, matching Move's confirmed decision. Don't build a coach-style picker for Learn.

---

## 9. August transition (Reflect phase, late)

Late July–August: the coach helps the learner look back on the year and prepare for the next stage.

- What revision techniques actually worked? What would you tell a Year 10 version of yourself?
- What are you most looking forward to about next year?
- For confirmed sixth form or college: transition preparation content.

**Flagged gap:** this phase is noted but not fully specified in the source material — full scoping was deferred and never completed. See file 08.

**Results day pathway:** if a result is disappointing, the coach sends practical next steps (appeals process, clearing, alternative pathways) rather than platitudes.

---

*Build New Habits Ltd · Alongside: Learn · Coach Logic & Features · 09 Aug 2026 v1*
