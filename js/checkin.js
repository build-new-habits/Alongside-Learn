// Alongside: Learn — Coach shell + learner daily check-in
// 10 Aug 2026 v1
// Implements: coach-speaks-first (file 04 §1), free-tier check-in fields,
// Athena-gated stress/free-text fields, signal-word detection wired to the
// fixed safeguarding response (file 06 §3).
//
// KNOWN GAP, flagged not hidden: this module assumes a signed-in user and
// takes userId/tier as arguments — Supabase Auth (sign-up/login) is not yet
// built. That's real next-session work, not silently skipped.

import { submitCheckin, updateSafeguardingLevel } from './store.js';
import { scanFreeText, combineWithStress } from './data/signal-words.js';
import {
  checkinGreetings,
  checkinAcknowledgements,
  safeguardingResponses,
  alwaysOnResources,
} from './data/coach-voice.js';

const SCALE_LABELS = ['Very low', 'Low', 'Okay', 'Good', 'High'];
const SLEEP_LABELS = ['Very poor', 'Poor', 'Okay', 'Good', 'Great'];
const STRESS_LABELS = ['Very low', 'Low', 'Manageable', 'High', 'Overwhelming'];

/**
 * Renders the coach shell + check-in flow into a container element.
 * @param {HTMLElement} container
 * @param {{ userId: string, tier: 'free'|'athena', ageBand: 'teen'|'adult' }} ctx
 */
export function renderCheckin(container, ctx) {
  const state = {
    energy: null,
    mood: null,
    sleep: null,
    stress: null,
    freeText: '',
    subjectFocus: '',
  };

  container.innerHTML = '';
  container.appendChild(coachMessage(pickGreeting()));

  const form = document.createElement('form');
  form.setAttribute('aria-label', 'Daily check-in');
  form.appendChild(tapRow('energy', 'How is your energy right now?', SCALE_LABELS, v => (state.energy = v)));
  form.appendChild(tapRow('mood', 'How are you feeling in general today?', SCALE_LABELS, v => (state.mood = v)));
  form.appendChild(tapRow('sleep', 'How did you sleep last night?', SLEEP_LABELS, v => (state.sleep = v)));

  if (ctx.tier === 'athena') {
    form.appendChild(
      tapRow('stress', 'How stressed are you feeling about your studies right now?', STRESS_LABELS, v => (state.stress = v))
    );
    form.appendChild(freeTextField(v => (state.freeText = v)));
  }

  form.appendChild(subjectField(v => (state.subjectFocus = v)));

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Check in';
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleSubmit(container, ctx, state);
  });

  container.appendChild(form);
}

async function handleSubmit(container, ctx, state) {
  let level = 1;

  if (ctx.tier === 'athena') {
    const scan = scanFreeText(state.freeText);
    const combined = combineWithStress(scan, state.stress);
    level = combined.level;
  }

  let savedOk = true;
  try {
    await submitCheckin({
      userId: ctx.userId,
      energy: state.energy,
      mood: state.mood,
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

  container.innerHTML = '';

  if (level >= 2) {
    container.appendChild(renderSafeguardingResponse(level, ctx.ageBand));
    return;
  }

  container.appendChild(coachMessage(pickAcknowledgement(state)));
  if (!savedOk) {
    const warning = document.createElement('p');
    warning.className = 'checkin-error';
    warning.setAttribute('role', 'alert');
    warning.textContent = "That didn't save properly — please try checking in again.";
    container.appendChild(warning);
  }
}

function renderSafeguardingResponse(level, ageBand) {
  // Adult word set exists in file 06 but Learn's primary audience is 13-17
  // (file 06 §2) — teen copy only implemented this session; adult copy is a
  // straightforward follow-up once needed for two-parent-household edge cases.
  const key = level === 3 ? 'teenLevel3' : 'teenLevel2';
  const response = safeguardingResponses[key];

  const wrapper = document.createElement('div');
  wrapper.className = 'coach-card safeguarding-card';
  wrapper.setAttribute('role', 'alert');

  const msg = document.createElement('p');
  msg.textContent = response.message;
  wrapper.appendChild(msg);

  const list = document.createElement('ul');
  list.className = 'resource-list';
  response.resources.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.name}</strong> — ${r.detail}`;
    list.appendChild(li);
  });
  wrapper.appendChild(list);

  return wrapper;
}

/** Always-visible in-app resources — not push-notified, always reachable (file 04 §5) */
export function renderAlwaysOnResources(container) {
  const section = document.createElement('section');
  section.setAttribute('aria-label', 'Support resources');
  const h = document.createElement('h3');
  h.textContent = 'Need to talk to someone?';
  section.appendChild(h);
  const list = document.createElement('ul');
  list.className = 'resource-list';
  alwaysOnResources.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.name}</strong> — ${r.detail}`;
    list.appendChild(li);
  });
  section.appendChild(list);
  container.appendChild(section);
}

// --- UI building blocks -----------------------------------------------

function coachMessage(text) {
  const div = document.createElement('div');
  div.className = 'coach-card';
  div.setAttribute('role', 'status');
  div.textContent = text;
  return div;
}

function tapRow(name, question, labels, onChange) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'tap-row';
  const legend = document.createElement('legend');
  legend.textContent = question;
  fieldset.appendChild(legend);

  const group = document.createElement('div');
  group.setAttribute('role', 'radiogroup');
  group.setAttribute('aria-label', question);

  labels.forEach((label, i) => {
    const value = i + 1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tap-row-option';
    btn.textContent = label;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.addEventListener('click', () => {
      group.querySelectorAll('[role="radio"]').forEach(b => b.setAttribute('aria-checked', 'false'));
      btn.setAttribute('aria-checked', 'true');
      onChange(value);
    });
    group.appendChild(btn);
  });

  fieldset.appendChild(group);
  return fieldset;
}

function freeTextField(onChange) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = 'checkin-freetext';
  label.textContent = 'Anything specific on your mind today? (optional)';
  const textarea = document.createElement('textarea');
  textarea.id = 'checkin-freetext';
  textarea.maxLength = 200;
  textarea.addEventListener('input', e => onChange(e.target.value));
  wrapper.appendChild(label);
  wrapper.appendChild(textarea);
  return wrapper;
}

function subjectField(onChange) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = 'checkin-subject';
  label.textContent = 'What subject are you planning to focus on today? (optional)';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'checkin-subject';
  input.addEventListener('input', e => onChange(e.target.value));
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return wrapper;
}

function pickGreeting() {
  return checkinGreetings[Math.floor(Math.random() * checkinGreetings.length)];
}

function pickAcknowledgement(state) {
  if (state.stress === 5) return checkinAcknowledgements.stressHigh;
  if (state.mood <= 2) return checkinAcknowledgements.moodLow;
  if (state.energy <= 2) return checkinAcknowledgements.energyLow;
  return checkinAcknowledgements.moodOk;
}
