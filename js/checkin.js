// Alongside: Learn — Coach shell + learner daily check-in
// 10 Aug 2026 v3
// Reworked to a conversational, message-by-message flow per Graeme's
// direction: feels like a chat rather than a form, and the mood word list is
// "unlocked" by two simple questions (energy, then good/hard) rather than
// showing all four Mood Meter quadrants at once. This is also closer to how
// the Mood Meter is actually taught (RULER: energy axis, then pleasantness
// axis, then the specific word) — not a deviation from it.

import { submitCheckin, updateSafeguardingLevel, logConsentedParentAlert } from './store.js';
import { assessCheckin } from './safeguarding.js';
import { MOOD_WORDS, determineQuadrant, energyToTier } from './data/mood-meter.js';
import {
  checkinGreetings,
  checkinAcknowledgements,
  safeguardingResponses,
} from './data/coach-voice.js';
import { renderAlwaysOnResources } from './resources.js';

const ENERGY_LABELS = ['Very low', 'Low', 'Okay', 'Good', 'High'];
const SLEEP_LABELS = ['Very poor', 'Poor', 'Okay', 'Good', 'Great'];
// 'Overwhelming' replaced 11 Aug 2026 (Graeme): it has become everyday
// language ("I'm finding these questions overwhelming") and no longer marks
// the top of a distress scale. The replacement is harder to use casually.
const STRESS_LABELS = ['Very low', 'Low', 'Manageable', 'High', 'More than I can handle'];

/**
 * @param {HTMLElement} container
 * @param {{ userId: string, tier: 'free'|'athena', ageBand: 'teen'|'adult' }} ctx
 */
export function renderCheckin(container, ctx) {
  container.innerHTML = '';
  const chatLog = document.createElement('div');
  chatLog.className = 'chat-log';
  chatLog.setAttribute('aria-live', 'polite');
  container.appendChild(chatLog);

  const state = {
    energy: null,
    moodQuadrant: null,
    moodWord: null,
    sleep: null,
    stress: null,
    freeText: '',
    subjectFocus: '',
  };

  appendCoachBubble(chatLog, pickGreeting());
  askEnergy(chatLog, ctx, state);
}

// --- Conversation steps, one leading into the next ------------------------

function askEnergy(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'How is your energy right now?');
  appendOptions(chatLog, ENERGY_LABELS.map((label, i) => ({ label, value: i + 1 })), (value, label) => {
    state.energy = value;
    askValence(chatLog, ctx, state);
  });
}

function askValence(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'And does today feel more good, or more hard?');
  appendOptions(chatLog, [{ label: 'More good', value: 'good' }, { label: 'More hard', value: 'hard' }], (value, label) => {
    state.valence = value;
    askMoodWord(chatLog, ctx, state);
  });
}

function askMoodWord(chatLog, ctx, state) {
  const quadrant = determineQuadrant(energyToTier(state.energy), state.valence);
  state.moodQuadrant = quadrant;
  const wordSet = MOOD_WORDS[ctx.ageBand] ?? MOOD_WORDS.teen;
  const words = wordSet[quadrant].words.map(w => ({ label: w.word, value: w.word }));

  appendCoachBubble(chatLog, 'Which of these feels closest?');
  appendOptions(chatLog, words, (value, label) => {
    state.moodWord = value;
    askSleep(chatLog, ctx, state);
  });
}

function askSleep(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'How did you sleep last night?');
  appendOptions(chatLog, SLEEP_LABELS.map((label, i) => ({ label, value: i + 1 })), (value) => {
    state.sleep = value;
    if (ctx.tier === 'athena') {
      askStress(chatLog, ctx, state);
    } else {
      askSubjectFocus(chatLog, ctx, state);
    }
  });
}

function askStress(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'How stressed are you feeling about your studies right now?');
  appendOptions(chatLog, STRESS_LABELS.map((label, i) => ({ label, value: i + 1 })), (value) => {
    state.stress = value;
    askFreeText(chatLog, ctx, state);
  });
}

function askFreeText(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'Anything specific on your mind today? Totally optional.');
  appendTextInput(chatLog, { multiline: true, maxLength: 200, skippable: true }, (value) => {
    state.freeText = value;
    askSubjectFocus(chatLog, ctx, state);
  });
}

function askSubjectFocus(chatLog, ctx, state) {
  appendCoachBubble(chatLog, 'What subject are you planning to focus on today? Optional too.');
  appendTextInput(chatLog, { multiline: false, skippable: true }, (value) => {
    state.subjectFocus = value;
    finishCheckin(chatLog, ctx, state);
  });
}

async function finishCheckin(chatLog, ctx, state) {
  const { level } = assessCheckin({
    moodQuadrant: state.moodQuadrant,
    moodWord: state.moodWord,
    freeText: ctx.tier === 'athena' ? state.freeText : '',
    stress: ctx.tier === 'athena' ? state.stress : null,
    ageBand: ctx.ageBand,
  });

  let savedOk = true;
  try {
    await submitCheckin({
      userId: ctx.userId,
      energy: state.energy,
      moodQuadrant: state.moodQuadrant,
      moodWord: state.moodWord,
      sleep: state.sleep,
      stress: state.stress,
      freeText: state.freeText || null,
      subjectFocus: state.subjectFocus || null,
    });
    if (level > 1) {
      await updateSafeguardingLevel(ctx.userId, level);
    }
  } catch (err) {
    savedOk = false;
    console.error('Check-in save failed', err);
  }

  if (level >= 2) {
    const key = level === 3 ? 'teenLevel3' : 'teenLevel2';
    const response = safeguardingResponses[key];
    appendCoachBubble(chatLog, response.message);
    renderAlwaysOnResources(chatLog, { heading: null, resources: response.resources });
    offerParentContact(chatLog, ctx);
  } else {
    appendCoachBubble(chatLog, pickAcknowledgement(state));
  }

  if (!savedOk) {
    const warning = document.createElement('p');
    warning.className = 'checkin-error';
    warning.setAttribute('role', 'alert');
    warning.textContent = "That didn't save properly — please try checking in again.";
    chatLog.appendChild(warning);
  }

  // Reflection close — not just when flagged (Graeme's direction 10 Aug 2026:
  // keep support resources visible as a normal part of finishing a check-in,
  // not something that only appears when something's wrong).
  //
  // EXCEPT at level 3 (copy review item 4, Graeme approved 11 Aug 2026). The
  // crisis response already lists four resources, three of which repeat here,
  // and a light "before you go" immediately after a crisis disclosure reads as
  // the app moving on. The every-time rule was written before the crisis path
  // existed; this is the one place it works against itself.
  if (level < 3) {
    appendCoachBubble(chatLog, "Before you go — these are always here if you ever want to talk to someone:");
    renderAlwaysOnResources(chatLog);
  }
}

/**
 * The consent route (copy review item 3a, Graeme approved 11 Aug 2026).
 *
 * Learn does not tell a parent anything on its own. This is the only path by
 * which a flagged check-in reaches a parent, and the learner has to press it.
 * Declining is a real, equally-weighted option, not a dismissal — a learner
 * who feels nudged into consenting hasn't consented.
 *
 * The alert carries no content. A parent sees that their child asked to talk,
 * never what was said or what triggered it.
 */
function offerParentContact(chatLog, ctx) {
  appendCoachBubble(chatLog, 'Would you like me to let one of your parents know you could use a chat? I will not tell them anything you said — only that you asked.');

  appendOptions(chatLog, [
    { label: 'Yes, please tell them', value: 'yes' },
    { label: 'No thanks', value: 'no' },
  ], async (value) => {
    if (value !== 'yes') {
      appendCoachBubble(chatLog, "That's completely fine. Nothing will be sent, and you can change your mind any time.");
      return;
    }
    try {
      await logConsentedParentAlert(ctx.userId);
      appendCoachBubble(chatLog, "Done — they'll see that you asked to talk. Nothing about what you told me.");
    } catch (err) {
      console.error('Consented parent alert failed', err);
      const warning = document.createElement('p');
      warning.className = 'checkin-error';
      warning.setAttribute('role', 'alert');
      warning.textContent = "I couldn't send that just now. Please try again, or tell someone directly.";
      chatLog.appendChild(warning);
    }
  });
}

// --- Chat-bubble UI primitives ---------------------------------------------

function appendCoachBubble(chatLog, text) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble-coach';
  bubble.setAttribute('role', 'status');
  bubble.textContent = text;
  chatLog.appendChild(bubble);
  bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return bubble;
}

function appendUserBubble(chatLog, text) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble-user';
  bubble.textContent = text;
  chatLog.appendChild(bubble);
  bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

/**
 * Renders a row of answer-option buttons after the most recent coach bubble.
 * Once one is picked, the options are replaced with a user-style bubble
 * showing what was chosen, and onSelect fires to continue the flow.
 */
function appendOptions(chatLog, options, onSelect) {
  const wrap = document.createElement('div');
  wrap.className = 'answer-options';
  wrap.setAttribute('role', 'group');

  options.forEach(({ label, value }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer-option-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      wrap.remove();
      appendUserBubble(chatLog, label);
      onSelect(value, label);
    });
    wrap.appendChild(btn);
  });

  chatLog.appendChild(wrap);
  wrap.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function appendTextInput(chatLog, { multiline, maxLength, skippable }, onSubmit) {
  const wrap = document.createElement('div');
  wrap.className = 'answer-text-input';

  const input = multiline ? document.createElement('textarea') : document.createElement('input');
  if (!multiline) input.type = 'text';
  if (maxLength) input.maxLength = maxLength;
  input.setAttribute('aria-label', 'Your answer');
  wrap.appendChild(input);

  const btnRow = document.createElement('div');
  btnRow.className = 'answer-text-btn-row';

  const sendBtn = document.createElement('button');
  sendBtn.type = 'button';
  sendBtn.className = 'answer-option-btn';
  sendBtn.textContent = 'Send';
  sendBtn.addEventListener('click', () => submit(input.value.trim()));
  btnRow.appendChild(sendBtn);

  if (skippable) {
    const skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'answer-option-btn answer-option-skip';
    skipBtn.textContent = 'Skip';
    skipBtn.addEventListener('click', () => submit(''));
    btnRow.appendChild(skipBtn);
  }

  wrap.appendChild(btnRow);
  chatLog.appendChild(wrap);
  wrap.scrollIntoView({ behavior: 'smooth', block: 'end' });
  input.focus();

  function submit(value) {
    wrap.remove();
    appendUserBubble(chatLog, value || '(skipped)');
    onSubmit(value);
  }
}

function pickGreeting() {
  return checkinGreetings[Math.floor(Math.random() * checkinGreetings.length)];
}

function pickAcknowledgement(state) {
  if (state.stress === 5) return checkinAcknowledgements.stressHigh;
  if (state.moodQuadrant === 'blue' || state.moodQuadrant === 'red') return checkinAcknowledgements.moodLow;
  if (state.energy <= 2) return checkinAcknowledgements.energyLow;
  return checkinAcknowledgements.moodOk;
}
