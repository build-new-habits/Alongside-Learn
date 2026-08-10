// Alongside: Learn — Family creation & join
// 10 Aug 2026 v1
// Shown once a person is signed in but has no family_id on their profile yet.
// Two paths: create a new family (becomes its first parent) or join an
// existing one using the family code shared by whoever created it.
//
// KNOWN GAP, flagged not hidden: invite mechanism is a raw UUID shared
// out-of-band (text/WhatsApp) — proportionate for a small trusted-families
// beta, not a real invite-link/email system. Revisit if the model scales.

import { createFamily, joinFamily } from './auth.js';

/**
 * @param {HTMLElement} container
 * @param {() => void} onComplete — called after family setup succeeds, to
 *   re-run the app's bootstrap and load the real check-in context.
 */
export function renderFamilySetup(container, onComplete) {
  container.innerHTML = '';

  const intro = document.createElement('div');
  intro.className = 'coach-card';
  intro.textContent = "Let's get your family set up. Are you starting a new family, or joining one someone already started?";
  container.appendChild(intro);

  const buttonRow = document.createElement('div');
  buttonRow.className = 'family-setup-choice';

  const createBtn = document.createElement('button');
  createBtn.type = 'button';
  createBtn.className = 'btn-primary';
  createBtn.textContent = 'Start a new family';

  const joinBtn = document.createElement('button');
  joinBtn.type = 'button';
  joinBtn.className = 'btn-secondary';
  joinBtn.textContent = 'Join a family with a code';

  buttonRow.appendChild(createBtn);
  buttonRow.appendChild(joinBtn);
  container.appendChild(buttonRow);

  createBtn.addEventListener('click', () => renderCreateFlow(container, onComplete));
  joinBtn.addEventListener('click', () => renderJoinFlow(container, onComplete));
}

function renderCreateFlow(container, onComplete) {
  container.innerHTML = '';

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-primary';
  btn.textContent = 'Create my family';

  const explain = document.createElement('p');
  explain.textContent = "You'll be the first parent on the account. Once it's created, you'll get a code to share with anyone else joining — your co-parent, or your children.";

  container.appendChild(explain);
  container.appendChild(errorMsg);
  container.appendChild(btn);

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      const familyId = await createFamily();
      renderFamilyCode(container, familyId, onComplete);
    } catch (err) {
      errorMsg.textContent = err.message || 'Something went wrong creating your family.';
      btn.disabled = false;
    }
  });
}

function renderFamilyCode(container, familyId, onComplete) {
  container.innerHTML = '';

  const msg = document.createElement('div');
  msg.className = 'coach-card';
  msg.textContent = "Your family is set up. Share this code with anyone joining you — a co-parent or your children.";
  container.appendChild(msg);

  const codeBox = document.createElement('p');
  codeBox.className = 'family-code';
  codeBox.textContent = familyId;
  container.appendChild(codeBox);

  const continueBtn = document.createElement('button');
  continueBtn.type = 'button';
  continueBtn.className = 'btn-primary';
  continueBtn.textContent = 'Continue';
  continueBtn.addEventListener('click', onComplete);
  container.appendChild(continueBtn);
}

function renderJoinFlow(container, onComplete) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.setAttribute('aria-label', 'Join a family');

  const codeLabel = document.createElement('label');
  codeLabel.htmlFor = 'family-code-input';
  codeLabel.textContent = 'Family code';
  const codeInput = document.createElement('input');
  codeInput.type = 'text';
  codeInput.id = 'family-code-input';
  codeInput.required = true;

  const roleFieldset = document.createElement('fieldset');
  const roleLegend = document.createElement('legend');
  roleLegend.textContent = 'Joining as';
  roleFieldset.appendChild(roleLegend);

  let selectedRole = 'learner';
  ['learner', 'parent'].forEach(role => {
    const label = document.createElement('label');
    label.className = 'radio-inline';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'join-role';
    input.value = role;
    input.checked = role === 'learner';
    input.addEventListener('change', () => (selectedRole = role));
    label.appendChild(input);
    label.append(` ${role === 'learner' ? 'A learner (student)' : 'A parent'}`);
    roleFieldset.appendChild(label);
  });

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Join family';

  const field = document.createElement('div');
  field.className = 'field';
  field.appendChild(codeLabel);
  field.appendChild(codeInput);

  form.appendChild(field);
  form.appendChild(roleFieldset);
  form.appendChild(errorMsg);
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
      await joinFamily(codeInput.value.trim(), selectedRole);
      onComplete();
    } catch (err) {
      errorMsg.textContent = err.message || "Couldn't join that family — check the code and try again.";
      submitBtn.disabled = false;
    }
  });

  container.appendChild(form);
}
