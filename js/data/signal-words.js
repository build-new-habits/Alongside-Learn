// Alongside: Learn — Free-text signal vocabulary
// 10 Aug 2026 v1
// Source: Documents/Planning/alongside_learn_04_coach_logic_features_09aug2026_v1.md §3
// Deterministic string-match only — NOT AI sentiment analysis, matches Move's
// signal-words.js approach: auditable and versioned.
//
// Journal Privacy Rule (file 06 §4): this scan applies ONLY to the dedicated
// checkin.free_text field. Never wire this into any future journal/reflection
// feature without an explicit, documented decision from Graeme.
//
// RESOLVED 11 Aug 2026 (defect D6). This file previously carried a prominent
// "FLAGGED GAP" note stating that Learn had no Mood Meter word-picker and that
// only free-text matching was therefore implemented. That was true when written
// and became wrong the same day: the word-picker was built (js/data/mood-meter.js)
// and js/safeguarding.js now combines both signals. The stale note was actively
// misleading anyone reading this file cold — removed.
//
// Also removed 11 Aug 2026: a `combineWithStress` helper that was exported but
// never called anywhere. Stress handling lives in js/safeguarding.js. See item 8
// of safeguarding_copy_review_11aug2026_v1.md.

export const SIGNAL_VOCABULARY = {
  hopelessness: [
    'nothing will help', 'pointless', 'no point', 'it does not matter',
    'it doesnt matter', "it doesn't matter", 'i give up', 'what is the point',
    "what's the point",
  ],
  withdrawal: [
    'i do not want to do anything', "i don't want to do anything",
    'i cannot face it', "i can't face it", 'i just want to stay in bed',
    'cannot be bothered', "can't be bothered",
  ],
  selfCriticalSpiralling: [
    'i am stupid', "i'm stupid", 'i always fail', 'i am useless',
    "i'm useless", 'i cannot do anything right', "i can't do anything right",
    'everyone else is better',
  ],
  // Crisis list expanded 11 Aug 2026 (copy review item 7a, Graeme authorised).
  // The list previously covered indirect phrasings only and omitted the most
  // direct statements of intent — the category most likely to appear when a
  // young person has decided to say it plainly. Two entries were also NARROWED
  // rather than added: bare 'disappear' and bare 'end it' were firing the
  // strongest response the app has on everyday idiom ("I want this week to
  // disappear", "let's end it there"). They now require the fuller phrasing.
  // Graeme: revert either if you disagree — these are the only two judgement
  // calls in here, everything else is an addition.
  crisisSignal: [
    'hurt myself', 'hurting myself', 'self harm', 'self-harm',
    'kill myself', 'killing myself', 'end my life', 'ending my life',
    'take my own life', 'want to die', 'wish i was dead', 'wish i were dead',
    'better off without me', 'no reason to live', 'nothing to live for',
    'do not want to be alive', "don't want to be alive",
    'not here anymore', 'want to disappear', 'just disappear', 'end it all',
    'cannot go on', "can't go on", 'suicidal', 'suicide',
  ],
};

/**
 * Matches a phrase on word boundaries rather than as a bare substring.
 * Added 11 Aug 2026 (copy review item 7). Previously 'disappear' matched
 * "disappeared" and "disappearing", and 'end it' matched "let's end it there".
 * Firing the strongest response the app has on an idiom teaches a learner that
 * it over-reads, after which they stop writing anything real in the box — which
 * costs far more than the false positive saves. Pure accuracy change: nothing
 * that genuinely matched before stops matching now.
 * @param {string} text lowercased free text
 * @param {string} phrase lowercased vocabulary entry
 */
function containsPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(text);
}

/**
 * Scans free-text against the vocabulary above.
 * Returns { level, matchedCategories } — level is a SUGGESTED safeguarding
 * level based on category, not a clinical judgement. This vocabulary list
 * has NOT yet been reviewed by a qualified mental health professional
 * (file 04 §3) — treat detection as functionally real but not clinically
 * validated until that review happens.
 *
 * @param {string} freeText
 * @returns {{ level: 1|2|3, matchedCategories: string[] }}
 */
export function scanFreeText(freeText) {
  if (!freeText || typeof freeText !== 'string') {
    return { level: 1, matchedCategories: [] };
  }
  const text = freeText.toLowerCase();
  const matched = [];

  for (const phrase of SIGNAL_VOCABULARY.crisisSignal) {
    if (containsPhrase(text, phrase)) matched.push('crisisSignal');
  }
  if (matched.includes('crisisSignal')) {
    return { level: 3, matchedCategories: [...new Set(matched)] };
  }

  for (const [category, phrases] of Object.entries(SIGNAL_VOCABULARY)) {
    if (category === 'crisisSignal') continue;
    for (const phrase of phrases) {
      if (containsPhrase(text, phrase)) matched.push(category);
    }
  }

  if (matched.length > 0) {
    return { level: 2, matchedCategories: [...new Set(matched)] };
  }

  return { level: 1, matchedCategories: [] };
}
