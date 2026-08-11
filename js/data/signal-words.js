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
  crisisSignal: [
    'hurt myself', 'self harm', 'self-harm', 'not here anymore', 'disappear',
    'end it', 'cannot go on', "can't go on",
  ],
};

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
    if (text.includes(phrase)) matched.push('crisisSignal');
  }
  if (matched.includes('crisisSignal')) {
    return { level: 3, matchedCategories: [...new Set(matched)] };
  }

  for (const [category, phrases] of Object.entries(SIGNAL_VOCABULARY)) {
    if (category === 'crisisSignal') continue;
    for (const phrase of phrases) {
      if (text.includes(phrase)) matched.push(category);
    }
  }

  if (matched.length > 0) {
    return { level: 2, matchedCategories: [...new Set(matched)] };
  }

  return { level: 1, matchedCategories: [] };
}
