// Alongside: Learn — Mood Meter (Marc Brackett / Yale Center for Emotional
// Intelligence, RULER, CASEL-recognised)
// 10 Aug 2026 v1
// Source: Documents/Planning/alongside_learn_06_safeguarding_legal_09aug2026_v1.md §2
//
// Resolves the gap flagged in master_schedule.md v6: Learn's check-in now
// includes a real word-picker mood input, matching the shared family policy,
// using the teen-adjusted word set as the default (file 06: "most Learn
// learners fall in the 13-17 age band... teen word set is the primary one").
// Adult set included for completeness/future parent-facing use.
//
// Quadrants follow the standard Mood Meter axes: energy (high/low) x
// pleasantness (pleasant/unpleasant).
//   yellow = high energy, pleasant      green = low energy, pleasant
//   red    = high energy, unpleasant    blue  = low energy, unpleasant
//
// flag: 'none' | 'direct' | 'combination'
//   direct       -> triggers the fixed safeguarding response on its own
//   combination  -> only triggers when paired with a second flagged signal
//                   in the same check-in (file 06 "combination rule")
//
// REVIEW DECISIONS, 11 Aug 2026 (safeguarding_copy_review_11aug2026_v1.md):
//
// Item 5 — "trapped" is now a DIRECT flag in every quadrant it appears in,
// teen and adult. It was previously direct in red and combination in blue,
// meaning a learner feeling trapped on a low-energy day usually got no
// response at all. The Mood Meter cannot adjudicate this: it is an emotional
// granularity instrument, not a risk-stratification tool, and carries no view
// on which words indicate danger. The suicide-prevention literature does —
// entrapment is a central construct in O'Connor's Integrated Motivational-
// Volitional model, where defeat and entrapment drive the emergence of
// suicidal ideation, and the entrapment it describes is paired with defeat:
// a flattened, depleted state, i.e. exactly the blue quadrant we were
// flagging weakest. Rather than pick a quadrant on thin evidence, the word
// now flags directly wherever it appears. Graeme approved 11 Aug 2026.
//
// Item 6 — teen and adult sets diverge deliberately, not by oversight:
// "numb" flags directly for teens but not adults, because dissociation and
// flat affect present differently in adolescence and warrant a lower trigger
// threshold; "despair" and "panicked" are omitted from the teen set as less
// commonly self-selected vocabulary in that age band. Graeme confirmed
// 11 Aug 2026. Do not "tidy" these into alignment.

export const MOOD_WORDS = {
  teen: {
    yellow: { label: 'High energy, feeling good', words: [
      { word: 'happy', flag: 'none' }, { word: 'excited', flag: 'none' },
      { word: 'proud', flag: 'none' }, { word: 'good', flag: 'none' },
    ]},
    green: { label: 'Calm, feeling good', words: [
      { word: 'calm', flag: 'none' }, { word: 'okay', flag: 'none' },
      { word: 'relaxed', flag: 'none' }, { word: 'chill', flag: 'none' },
    ]},
    red: { label: 'High energy, feeling hard', words: [
      { word: 'angry', flag: 'none' }, { word: 'stressed', flag: 'none' },
      { word: 'worried', flag: 'none' }, { word: 'scared', flag: 'none' },
      { word: 'overwhelmed', flag: 'combination' }, { word: 'trapped', flag: 'direct' },
    ]},
    blue: { label: 'Low energy, feeling hard', words: [
      { word: 'sad', flag: 'none' }, { word: 'lonely', flag: 'none' },
      { word: 'tired', flag: 'none' }, { word: 'fed up', flag: 'none' },
      { word: 'empty', flag: 'direct' }, { word: 'hopeless', flag: 'direct' },
      { word: 'worthless', flag: 'direct' }, { word: 'numb', flag: 'direct' },
      { word: 'trapped', flag: 'direct' },
    ]},
  },
  adult: {
    yellow: { label: 'High energy, feeling good', words: [
      { word: 'excited', flag: 'none' }, { word: 'joyful', flag: 'none' },
      { word: 'motivated', flag: 'none' }, { word: 'inspired', flag: 'none' },
      { word: 'happy', flag: 'none' }, { word: 'enthusiastic', flag: 'none' },
      { word: 'optimistic', flag: 'none' }, { word: 'elated', flag: 'none' },
    ]},
    green: { label: 'Calm, feeling good', words: [
      { word: 'calm', flag: 'none' }, { word: 'relaxed', flag: 'none' },
      { word: 'content', flag: 'none' }, { word: 'peaceful', flag: 'none' },
      { word: 'serene', flag: 'none' }, { word: 'balanced', flag: 'none' },
      { word: 'at ease', flag: 'none' }, { word: 'satisfied', flag: 'none' },
    ]},
    red: { label: 'High energy, feeling hard', words: [
      { word: 'angry', flag: 'none' }, { word: 'anxious', flag: 'none' },
      { word: 'frustrated', flag: 'none' }, { word: 'fearful', flag: 'none' },
      { word: 'stressed', flag: 'none' }, { word: 'irritated', flag: 'none' },
      { word: 'tense', flag: 'none' }, { word: 'nervous', flag: 'none' },
      { word: 'panicked', flag: 'combination' }, { word: 'overwhelmed', flag: 'combination' },
      { word: 'trapped', flag: 'direct' },
    ]},
    blue: { label: 'Low energy, feeling hard', words: [
      { word: 'sad', flag: 'none' }, { word: 'lonely', flag: 'none' },
      { word: 'tired', flag: 'none' }, { word: 'discouraged', flag: 'none' },
      { word: 'disappointed', flag: 'none' }, { word: 'bored', flag: 'none' },
      { word: 'gloomy', flag: 'none' }, { word: 'dejected', flag: 'none' },
      { word: 'despair', flag: 'direct' }, { word: 'hopeless', flag: 'direct' },
      { word: 'worthless', flag: 'direct' }, { word: 'empty', flag: 'direct' },
      { word: 'numb', flag: 'none' }, { word: 'drained', flag: 'none' },
      { word: 'trapped', flag: 'direct' },
    ]},
  },
};

/**
 * @param {'teen'|'adult'} ageBand
 * @param {'yellow'|'green'|'red'|'blue'} quadrant
 * @param {string} word
 * @returns {'none'|'direct'|'combination'}
 */
export function getMoodFlag(ageBand, quadrant, word) {
  const set = MOOD_WORDS[ageBand] ?? MOOD_WORDS.teen;
  const entry = set[quadrant]?.words.find(w => w.word === word);
  return entry ? entry.flag : 'none';
}

/**
 * Determines the Mood Meter quadrant from two simple signals, so the person
 * only ever sees ONE quadrant's word list (4-9 words) rather than all four
 * at once (20+ words) — added 10 Aug 2026 per Graeme's UX direction: "score
 * unlocks the words" is also how the Mood Meter is actually taught (RULER
 * places you on the energy axis, then the pleasantness axis, before you
 * pick a specific word).
 * @param {'high'|'low'} energyTier
 * @param {'good'|'hard'} valenceTier
 */
export function determineQuadrant(energyTier, valenceTier) {
  if (energyTier === 'high' && valenceTier === 'good') return 'yellow';
  if (energyTier === 'high' && valenceTier === 'hard') return 'red';
  if (energyTier === 'low' && valenceTier === 'good') return 'green';
  return 'blue';
}

/** Existing 5-point energy scale bucketed into the Mood Meter's high/low axis. */
export function energyToTier(energyLevel) {
  return energyLevel >= 4 ? 'high' : 'low';
}
