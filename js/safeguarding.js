// Alongside: Learn — Unified safeguarding assessment
// 10 Aug 2026 v1
// Combines the three signal sources into one safeguarding level per check-in:
//   - Mood Meter word flag (file 06 §2)
//   - Free-text vocabulary scan (file 04 §3)
//   - Stress score (file 04 §2)
//
// This vocabulary/word-flag mapping has NOT been reviewed by a qualified
// mental health professional or PAPYRUS-affiliated reviewer (file 06 §6
// item 2, file 04 §3). Functionally real, not yet clinically validated —
// Graeme's sign-off is required before any beta family sees this live.
//
// Level mapping (a build-time decision, flagged for reviewer confirmation):
//   3 = crisis-signal free-text phrase (unambiguous, e.g. "hurt myself")
//   2 = a direct-flagged mood word, OR a hopelessness/withdrawal/self-critical
//       free-text match, OR a combination-flagged signal paired with another
//       flagged signal in the same check-in, OR stress = 5 combined with any
//       free text at all
//   1 = baseline, nothing flagged

import { scanFreeText } from './data/signal-words.js';
import { getMoodFlag } from './data/mood-meter.js';

/**
 * @param {{
 *   moodQuadrant: string, moodWord: string, freeText: string,
 *   stress: number|null, ageBand: 'teen'|'adult'
 * }} input
 * @returns {{ level: 1|2|3, reasons: string[] }}
 */
export function assessCheckin({ moodQuadrant, moodWord, freeText, stress, ageBand }) {
  const reasons = [];

  const moodFlag = moodQuadrant && moodWord ? getMoodFlag(ageBand, moodQuadrant, moodWord) : 'none';
  const textScan = scanFreeText(freeText);

  // Crisis signal always wins outright — level 3, no combination needed.
  if (textScan.matchedCategories.includes('crisisSignal')) {
    return { level: 3, reasons: ['freeTextCrisisSignal'] };
  }

  const hasDirectSignal = moodFlag === 'direct' || textScan.level === 2;
  const hasCombinationMoodWord = moodFlag === 'combination';
  const hasHighStress = stress === 5;

  if (hasDirectSignal) {
    if (moodFlag === 'direct') reasons.push('moodWordDirect');
    if (textScan.level === 2) reasons.push(...textScan.matchedCategories);
    return { level: 2, reasons };
  }

  // Combination-only signals (e.g. "overwhelmed", "trapped"-in-blue) need a
  // second flagged signal present in the same check-in to trigger — here,
  // that second signal is a high stress score, since a direct text/mood
  // match would already have triggered the branch above.
  // NOTE: this only checks the current check-in, not recent history — file 06
  // also allows the combination window to span recent check-ins. That needs a
  // Supabase history query, not yet built. Flagged as a known gap.
  if (hasCombinationMoodWord && hasHighStress) {
    return { level: 2, reasons: ['moodWordCombination', 'highStressScore'] };
  }

  return { level: 1, reasons: [] };
}
