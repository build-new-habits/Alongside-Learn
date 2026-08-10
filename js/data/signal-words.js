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
// FLAGGED GAP (surfaced during build, 10 Aug 2026): file 06's crisis policy
// describes detection via a Yale Mood Meter word-picker (quadrant system with
// a combination rule for words like "overwhelmed"/"trapped"). Learn's actual
// check-in structure (file 04 §2) has no word-picker — mood/energy/sleep/stress
// are 5-point tap-row scales, and free text is the only word-based input.
// This file implements ONLY the free-text vocabulary match, which is the part
// that actually maps onto Learn's real UI. The mood-meter quadrant/combination
// system in file 06 is not implemented here because there is no corresponding
// input to apply it to. Flagged in master_schedule.md — needs Graeme's and the
// eventual safeguarding reviewer's attention: either add a word-picker input to
// match the shared policy, or formally adapt the policy for Learn's actual UI.

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

/**
 * Stress score alone can also elevate safeguarding level when combined with
 * any free text at all, even non-matching text — a build-time default, NOT
 * a clinical rule. Flag for safeguarding reviewer sign-off before beta.
 * "Overwhelming" = 5 on the stress scale (file 04 §2).
 */
export function combineWithStress(scanResult, stressScore) {
  if (scanResult.level === 3) return scanResult; // crisis always wins
  if (stressScore === 5 && scanResult.level < 2) {
    return { level: 2, matchedCategories: [...scanResult.matchedCategories, 'highStressScore'] };
  }
  return scanResult;
}
