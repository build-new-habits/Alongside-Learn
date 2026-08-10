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
      { word: 'trapped', flag: 'combination' },
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
      { word: 'trapped', flag: 'combination' },
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
