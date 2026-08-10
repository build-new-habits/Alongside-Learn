// Alongside: Learn — Coach voice content
// 10 Aug 2026 v2
// Nurturing voice only — no coachStyle picker for Learn (file 02 §2, file 04 §8).
// Tone rules applied throughout: state don't ask where no real choice exists,
// specific over generic, end on agency, banned-words list respected (file 02 §4).

export const coachVoice = {
  style: 'nurturing', // internal only, never user-facing
};

// --- Check-in opening messages -------------------------------------------
// Coach speaks first, every session (file 04 §1). Rotate to avoid staleness;
// real variation/context-awareness (phase, recent activity) is a later pass —
// this is the Window A baseline.
export const checkinGreetings = [
  "Hello. I'm glad you're here. How are you feeling today — really?",
  "Hi. Whatever kind of day this is, I'm glad you checked in.",
];

// --- Per-question acknowledgements ----------------------------------------
// Shown briefly after each answer, before moving to the next question.
// Never evaluative ("well done"), always receiving what was actually said.
export const checkinAcknowledgements = {
  energyLow: "Thanks for telling me. Low energy days are real days too.",
  energyOk: "Got it. Thanks for letting me know.",
  moodLow: "I hear you. That's worth naming, not brushing past.",
  moodOk: "Thanks for sharing that.",
  stressHigh: "That sounds like a lot to be carrying. I'm glad you told me.",
};

// --- Safeguarding fixed responses ------------------------------------------
// STATUS: DRAFT. Per Documents/Planning/alongside_learn_06_safeguarding_legal
// §6 item 2, teen-facing crisis messages need review against full PAPYRUS
// guidance by a named youth-safeguarding credential holder before real use.
// Graeme is the named safeguarding reviewer for Learn — this content needs
// his explicit sign-off before any beta family sees it, not just a build pass.
//
// Crisis resource numbers verified current as of 10 Aug 2026:
// Childline 0800 1111 | Shout text 85258 | Samaritans 116 123 | Papyrus HOPELINEUK 0800 068 4141

export const safeguardingResponses = {
  // Level 3 — crisis signal vocabulary matched (file 04 §3)
  teenLevel3: {
    message: "Thank you for telling me. What you're feeling matters, and you don't have to carry it alone. Please reach out to one of these right now, or as soon as you can:",
    resources: [
      { name: 'Childline', detail: 'Call 0800 1111 — free, 24/7, confidential' },
      { name: 'Shout', detail: 'Text 85258 — free, 24/7 text support' },
      { name: 'Papyrus HOPELINEUK', detail: '0800 068 4141 — for under-35s having thoughts of suicide' },
      { name: 'Emergency', detail: 'If you are in immediate danger, call 999' },
    ],
  },
  // Level 2 — hopelessness/withdrawal/self-critical vocabulary or high stress
  teenLevel2: {
    message: "That sounds really hard. I want you to know that struggling doesn't mean failing — you showed up and told me, and that matters. If it would help to talk to someone, these are always here:",
    resources: [
      { name: 'Childline', detail: 'Call 0800 1111 or chat online — free, 24/7' },
      { name: 'Shout', detail: 'Text 85258 — free, 24/7 text support' },
    ],
  },
};

// Always-accessible in-app resources (not push-notified) — file 04 §5, file 06 §3
export const alwaysOnResources = [
  { name: 'Childline', detail: '0800 1111 · childline.org.uk' },
  { name: 'Shout', detail: 'Text 85258 · giveusashout.org' },
  { name: 'Samaritans', detail: '116 123 · samaritans.org' },
];
