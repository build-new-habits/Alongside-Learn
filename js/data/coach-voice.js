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
// STATUS: PARTIALLY SIGNED OFF, 11 Aug 2026. Items 1, 2, 4, 5, 6, 8 and 9 of
// safeguarding_copy_review_11aug2026_v1.md are decided and applied. Items 3
// (escalation model) and 7 (free-text policy) remain open. Still not reviewed
// by the solicitor or school DSL reviewer.
//
// Item 9 (Graeme approved): the level 2 message previously read "struggling
// doesn't mean failing". Level 2 fires on self-critical language among other
// triggers, so the reply was introducing "failing" — a word the learner may
// not have used. Countering a thought by naming it. Rewritten to avoid any
// negative framing the learner did not bring themselves.
//
// Item 3a (Graeme approved): both responses now prompt the learner toward a
// trusted adult rather than a parent specifically. Deliberate — "trusted
// adult" is the standard safeguarding formulation precisely because the
// family is sometimes the source of harm.
//
// ORIGINAL STATUS NOTE, retained: Per Documents/Planning/alongside_learn_06_safeguarding_legal
// §6 item 2, teen-facing crisis messages need review against full PAPYRUS
// guidance by a named youth-safeguarding credential holder before real use.
// Graeme is the named safeguarding reviewer for Learn — this content needs
// his explicit sign-off before any beta family sees it, not just a build pass.
//
// Crisis resource numbers verified current as of 11 Aug 2026:
// Childline 0800 1111 | Shout text 85258 | Samaritans 116 123 | Papyrus HOPELINE247 0800 068 4141 / text 88247
//
// 11 Aug 2026 (copy review item 1, Graeme approved): PAPYRUS renamed HOPELINEUK
// to HOPELINE247 and the service is now 24/7 — the old HOPELINEUK ran 10am-10pm
// weekdays. Our copy named the old service, implying to a learner reading this
// at 2am that it might be closed. Number unchanged; text line 88247 added.
// Factual corrections to crisis resource details do not require sign-off
// (Graeme, 11 Aug 2026) — wording changes still do.

export const safeguardingResponses = {
  // Level 3 — crisis signal vocabulary matched (file 04 §3)
  teenLevel3: {
    message: "Thank you for telling me. What you're feeling matters, and you don't have to carry it alone. If there is an adult you trust nearby — a parent, a teacher, someone at school — please tell them too. And please reach out to one of these right now, or as soon as you can:",
    resources: [
      { name: 'Childline', detail: 'Call 0800 1111 — free, 24/7, confidential', tel: '08001111' },
      { name: 'Shout', detail: 'Text 85258 — free, 24/7 text support', sms: '85258' },
      { name: 'Papyrus HOPELINE247', detail: '0800 068 4141 or text 88247 — free, 24/7, for anyone 35 and under having thoughts of suicide', tel: '08000684141', sms: '88247' },
      { name: 'Emergency', detail: 'If you are in immediate danger, call 999', tel: '999' },
    ],
  },
  // Level 2 — hopelessness/withdrawal/self-critical vocabulary or high stress
  teenLevel2: {
    message: "That sounds really hard. Struggling is real, and showing up and telling me is what matters. Is there an adult you trust — a parent, a teacher, someone at school — you could tell as well? These are always here too:",
    resources: [
      { name: 'Childline', detail: 'Call 0800 1111 or chat online — free, 24/7', tel: '08001111', url: 'https://www.childline.org.uk' },
      { name: 'Shout', detail: 'Text 85258 — free, 24/7 text support', sms: '85258' },
    ],
  },
};

// Always-accessible in-app resources (not push-notified) — file 04 §5, file 06 §3
export const alwaysOnResources = [
  { name: 'Childline', detail: '0800 1111 · childline.org.uk', tel: '08001111', url: 'https://www.childline.org.uk' },
  { name: 'Shout', detail: 'Text 85258 · giveusashout.org', sms: '85258', url: 'https://giveusashout.org' },
  { name: 'Samaritans', detail: '116 123 · samaritans.org', tel: '116123', url: 'https://www.samaritans.org' },
  {
    name: 'Kooth',
    detail: 'kooth.com — free online counselling and chat with a real practitioner. Availability depends on where you live (locally commissioned, not everywhere in the UK yet) — check the website.',
    url: 'https://www.kooth.com',
  },
];
