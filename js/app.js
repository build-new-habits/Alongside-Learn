// Alongside: Learn — App entry point
// 10 Aug 2026 v4
// Real Supabase Auth session check on load. If signed in with no family yet,
// shows family creation/join. Once a family exists, loads the check-in
// context (profile + family tier) and renders the check-in flow. If not
// signed in, renders a minimal sign-up/login form.

import { getCurrentUser, signIn, signUp, loadCheckinContext } from './auth.js';
import { renderCheckin, renderAlwaysOnResources } from './checkin.js';
import { renderFamilySetup } from './family-setup.js';

const mainContainer = document.getElementById('checkin-root');
const resourcesContainer = document.getElementById('resources-root');

async function bootstrap() {
  const user = await getCurrentUser();

  if (!user) {
    renderAuthForm(mainContainer);
    return;
  }

  const ctx = await loadCheckinContext(user.id);
  if (!ctx) {
    mainContainer.innerHTML = '';
    const msg = document.createElement('p');
    msg.textContent = "Signed in, but no profile found for this account yet.";
    mainContainer.appendChild(msg);
    return;
  }

  if (!ctx.familyId) {
    renderFamilySetup(mainContainer, bootstrap);
    return;
  }

  renderCheckin(mainContainer, ctx);
  if (resourcesContainer) renderAlwaysOnResources(resourcesContainer);
}

function renderAuthForm(container) {
  container.innerHTML = '';
  let mode = 'signIn'; // 'signIn' | 'signUp'

  const heading = document.createElement('h2');
  heading.textContent = 'Sign in';
  container.appendChild(heading);

  const form = document.createElement('form');
  form.setAttribute('aria-label', 'Sign in or sign up');

  const emailField = labelledInput('auth-email', 'Email', 'email');
  const passwordField = labelledInput('auth-password', 'Password', 'password');
  form.appendChild(emailField.wrapper);
  form.appendChild(passwordField.wrapper);

  // Sign-up-only fields, hidden in sign-in mode
  const nameField = labelledInput('auth-name', 'Name', 'text');
  const dobField = labelledInput('auth-dob', 'Date of birth', 'date');
  nameField.wrapper.style.display = 'none';
  dobField.wrapper.style.display = 'none';
  form.appendChild(nameField.wrapper);
  form.appendChild(dobField.wrapper);

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');
  form.appendChild(errorMsg);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Sign in';
  form.appendChild(submitBtn);

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'btn-secondary';
  toggleBtn.textContent = "New here? Create an account";
  form.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    mode = mode === 'signIn' ? 'signUp' : 'signIn';
    heading.textContent = mode === 'signIn' ? 'Sign in' : 'Create an account';
    submitBtn.textContent = mode === 'signIn' ? 'Sign in' : 'Create account';
    toggleBtn.textContent = mode === 'signIn' ? 'New here? Create an account' : 'Already have an account? Sign in';
    nameField.wrapper.style.display = mode === 'signUp' ? '' : 'none';
    dobField.wrapper.style.display = mode === 'signUp' ? '' : 'none';
    errorMsg.textContent = '';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    try {
      if (mode === 'signIn') {
        await signIn({ email: emailField.input.value, password: passwordField.input.value });
      } else {
        const result = await signUp({
          email: emailField.input.value,
          password: passwordField.input.value,
          name: nameField.input.value,
          dateOfBirth: dobField.input.value,
        });
        if (result.pendingConfirmation) {
          errorMsg.className = 'checkin-error';
          errorMsg.style.color = 'var(--color-success)';
          errorMsg.textContent = 'Check your email to confirm your account, then sign in.';
          return;
        }
      }
      await bootstrap();
    } catch (err) {
      errorMsg.textContent = err.message || 'Something went wrong — please try again.';
      console.error(err);
    }
  });

  container.appendChild(form);
}

function labelledInput(id, labelText, type) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = type !== 'date';
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return { wrapper, input };
}

bootstrap();
