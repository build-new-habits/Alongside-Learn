// Alongside: Learn — App entry point
// 17 Aug 2026 v5
// Real Supabase Auth session check on load. If signed in with no family yet,
// shows family creation/join. Once a family exists, loads the check-in
// context (profile + family tier) and renders the check-in flow. If not
// signed in, renders a minimal sign-up/login form.

import { getCurrentUser, signIn, signUp, signOut, loadCheckinContext, resendConfirmation } from './auth.js';
import { renderCheckin } from './checkin.js';
import { renderParentDashboard } from './parent-dashboard.js';
import { renderAssignments } from './assignments.js';
import { renderFlashcards } from './flashcards.js';
import { renderRevisionTimetable } from './revision-timetable.js';
import { renderAlwaysOnResources } from './resources.js';
import { renderFamilySetup } from './family-setup.js';
import { focusTarget } from './a11y.js';

const mainContainer = document.getElementById('checkin-root');
const resourcesContainer = document.getElementById('resources-root');
const headerContainer = document.getElementById('header-actions');
const navContainer = document.getElementById('nav-actions');

// SAFETY FIX 10 Aug 2026: resources must be reachable without signing in —
// someone opening the app while distressed shouldn't have to sign up first.
// Rendered immediately, unconditionally, not tied to the auth/check-in flow.
if (resourcesContainer) renderAlwaysOnResources(resourcesContainer, { heading: null });

async function bootstrap() {
  const user = await getCurrentUser();

  if (!user) {
    if (headerContainer) headerContainer.innerHTML = '';
    if (navContainer) navContainer.innerHTML = '';
    renderAuthForm(mainContainer);
    return;
  }

  renderSignOutControl();

  const ctx = await loadCheckinContext(user.id);
  if (!ctx) {
    if (navContainer) navContainer.innerHTML = '';
    mainContainer.innerHTML = '';
    const msg = document.createElement('p');
    msg.textContent = "Signed in, but no profile found for this account yet.";
    mainContainer.appendChild(msg);
    return;
  }

  if (!ctx.familyId) {
    if (navContainer) navContainer.innerHTML = '';
    renderFamilySetup(mainContainer, bootstrap);
    return;
  }

  // ROUTING FIX 10 Aug 2026: previously always rendered the learner check-in
  // regardless of role — a parent would have incorrectly landed on it.
  if (ctx.role === 'parent') {
    if (navContainer) navContainer.innerHTML = '';
    renderParentDashboard(mainContainer, ctx);
  } else {
    renderLearnerNav(ctx);
  }
}

/**
 * Learner-only nav (Check in / My work). Added 10 Aug 2026 — before this,
 * a learner had no way to reach anything except the check-in flow; the
 * assignments view built the same session would have been unreachable.
 */
function renderLearnerNav(ctx) {
  if (!navContainer) {
    renderCheckin(mainContainer, ctx); // fallback if nav container is missing for any reason
    return;
  }
  navContainer.innerHTML = '';

  const checkinTab = document.createElement('button');
  checkinTab.type = 'button';
  checkinTab.className = 'nav-tab';
  checkinTab.textContent = 'Check in';

  const workTab = document.createElement('button');
  workTab.type = 'button';
  workTab.className = 'nav-tab';
  workTab.textContent = 'My work';

  const flashcardsTab = document.createElement('button');
  flashcardsTab.type = 'button';
  flashcardsTab.className = 'nav-tab';
  flashcardsTab.textContent = 'Flashcards';

  const revisionTab = document.createElement('button');
  revisionTab.type = 'button';
  revisionTab.className = 'nav-tab';
  revisionTab.textContent = 'Revision';

  // aria-current is removed rather than set to "false" on inactive tabs. Both
  // are technically valid, but some screen readers announce the literal token,
  // so a learner could hear "false" read out against three of the four tabs.
  function setActive(tab) {
    [checkinTab, workTab, flashcardsTab, revisionTab].forEach(t => {
      if (t === tab) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
  }

  checkinTab.addEventListener('click', () => {
    setActive(checkinTab);
    renderCheckin(mainContainer, ctx);
  });
  workTab.addEventListener('click', () => {
    setActive(workTab);
    renderAssignments(mainContainer, ctx);
  });
  flashcardsTab.addEventListener('click', () => {
    setActive(flashcardsTab);
    renderFlashcards(mainContainer, ctx);
  });
  revisionTab.addEventListener('click', () => {
    setActive(revisionTab);
    renderRevisionTimetable(mainContainer, ctx);
  });

  navContainer.appendChild(checkinTab);
  navContainer.appendChild(workTab);
  navContainer.appendChild(flashcardsTab);
  navContainer.appendChild(revisionTab);

  setActive(checkinTab);
  renderCheckin(mainContainer, ctx);
}

function renderSignOutControl() {
  if (!headerContainer) return;
  headerContainer.innerHTML = '';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sign-out-btn';
  btn.textContent = 'Sign out';
  btn.addEventListener('click', async () => {
    await signOut();
    await bootstrap();
  });
  headerContainer.appendChild(btn);
}

function renderAuthForm(container) {
  container.innerHTML = '';
  let mode = 'signIn'; // 'signIn' | 'signUp'

  const heading = document.createElement('h2');
  heading.textContent = 'Sign in';
  container.appendChild(heading);

  const form = document.createElement('form');
  form.setAttribute('aria-label', 'Sign in or sign up');

  // SC 1.3.5 Identify Input Purpose: every field collecting the person's own
  // information needs an autocomplete token. This is also what allows password
  // managers to fill the form, which is the practical route to SC 3.3.8
  // Accessible Authentication — nobody should have to memorise and retype a
  // password to use a study app.
  const emailField = labelledInput('auth-email', 'Email', 'email', { autocomplete: 'username' });
  const passwordField = labelledInput('auth-password', 'Password', 'password', { autocomplete: 'current-password' });
  form.appendChild(emailField.wrapper);
  form.appendChild(passwordField.wrapper);

  // Sign-up-only fields, hidden in sign-in mode
  const nameField = labelledInput('auth-name', 'Name', 'text', { autocomplete: 'name' });
  const dobField = labelledInput('auth-dob', 'Date of birth', 'date', { autocomplete: 'bday' });
  nameField.wrapper.style.display = 'none';
  dobField.wrapper.style.display = 'none';
  nameField.input.required = false; // matches the toggle handler below — required only in sign-up mode
  dobField.input.required = false;
  form.appendChild(nameField.wrapper);
  form.appendChild(dobField.wrapper);

  // ADDED 10 Aug 2026, per Graeme's feedback: joining a family used to be a
  // separate step after account creation. Now it can happen at sign-up time
  // in one go, if the person already has a code. Genuinely optional —
  // leaving it blank behaves exactly as before (family-setup screen after
  // confirming/signing in).
  const familyCodeField = labelledInput('auth-family-code', 'Family code (optional — leave blank if starting a new family)', 'text', { autocomplete: 'off' });
  familyCodeField.wrapper.style.display = 'none';
  // FIXED 10 Aug 2026: labelledInput() defaults every non-date field to
  // required — never explicitly overridden here, so the browser silently
  // blocked submission whenever this was left blank, which is exactly the
  // valid case for someone starting a new family. Same bug class as the
  // earlier hidden-required-field issue: visibility and required need to be
  // set together, every time, not assumed.
  familyCodeField.input.required = false;
  form.appendChild(familyCodeField.wrapper);

  // Was a <div> with a <p> acting as a visual heading, which is not associated
  // with the radios in any way a screen reader can use — the person heard two
  // unexplained options with no idea what the question was (SC 1.3.1).
  // fieldset/legend is the native construct for exactly this.
  const joinRoleWrapper = document.createElement('fieldset');
  joinRoleWrapper.className = 'field';
  joinRoleWrapper.style.display = 'none';
  const joinRoleLegend = document.createElement('legend');
  joinRoleLegend.textContent = 'Joining as';
  joinRoleWrapper.appendChild(joinRoleLegend);
  let joinRole = 'learner';
  ['learner', 'parent'].forEach(r => {
    const label = document.createElement('label');
    label.className = 'radio-inline';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'auth-join-role';
    input.value = r;
    input.checked = r === 'learner';
    input.addEventListener('change', () => (joinRole = r));
    label.appendChild(input);
    label.append(` ${r === 'learner' ? 'A learner (student)' : 'A parent'}`);
    joinRoleWrapper.appendChild(label);
  });
  form.appendChild(joinRoleWrapper);

  // Show/hide the role choice based on whether a code has been typed —
  // it's only relevant when actually joining an existing family.
  familyCodeField.input.addEventListener('input', () => {
    joinRoleWrapper.style.display = familyCodeField.input.value.trim() ? '' : 'none';
  });

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
    familyCodeField.wrapper.style.display = mode === 'signUp' ? '' : 'none';
    if (mode !== 'signUp') joinRoleWrapper.style.display = 'none';
    // FIXED 10 Aug 2026: hiding these fields with display:none did NOT stop
    // the browser treating them as required, so clicking "Sign in" while
    // they were hidden silently failed native form validation — no error
    // shown, submit handler never even ran. Toggling `required` alongside
    // visibility fixes it.
    nameField.input.required = mode === 'signUp';
    dobField.input.required = false; // date of birth was never actually required, see labelledInput()
    // The password field means something different in each mode, and password
    // managers behave badly if it does not say so.
    passwordField.input.autocomplete = mode === 'signUp' ? 'new-password' : 'current-password';
    errorMsg.textContent = '';
    errorMsg.className = 'checkin-error';
    // Half the form appears or disappears here. Without moving focus, a screen
    // reader user gets no indication anything changed at all — they are still
    // sitting on a button whose label just silently rewrote itself.
    focusTarget(heading);
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
          familyCode: familyCodeField.input.value.trim() || undefined,
          joinRole: familyCodeField.input.value.trim() ? joinRole : undefined,
        });
        if (result.pendingConfirmation) {
          // Was .checkin-error with an inline colour override — announced as an
          // error by anything keying off the class, and carried by colour alone.
          errorMsg.className = 'form-success';
          // CHANGED 10 Aug 2026, per Graeme's feedback: this message shows
          // identically whether the email is genuinely new OR already
          // registered and confirmed — that's deliberate (Supabase avoids
          // revealing which, to prevent account enumeration). Since it can't
          // safely say "you already have an account," it instead makes
          // "try signing in" an equally natural next step either way,
          // without asserting anything that would leak which case it is.
          errorMsg.textContent = "If that's a new email, check your inbox to confirm it. Already have an account with this email? Just sign in below instead.";
          showResendButton(form, emailField.input.value);
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

function labelledInput(id, labelText, type, { autocomplete } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  if (autocomplete) input.autocomplete = autocomplete;
  input.required = type !== 'date';
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return { wrapper, input };
}

/**
 * Shown after a successful sign-up, so a person whose confirmation link
 * failed or expired (e.g. the localhost-redirect issue found 10 Aug 2026)
 * can get a fresh one without starting over.
 */
function showResendButton(form, email) {
  if (form.querySelector('.resend-btn')) return; // don't duplicate on repeat submits
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-secondary resend-btn';
  btn.textContent = 'Resend confirmation email';

  const resendError = document.createElement('p');
  resendError.className = 'checkin-error resend-error';
  resendError.setAttribute('role', 'alert');

  // The button previously reported success by rewriting its own label. A screen
  // reader does not reliably re-announce the label of the element already
  // focused, so the confirmation was effectively invisible. Reported in a
  // status region instead, and the label left alone.
  const resendStatus = document.createElement('p');
  resendStatus.className = 'form-success';
  resendStatus.setAttribute('role', 'status');

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Sending…';
    resendError.textContent = '';
    resendStatus.textContent = '';
    try {
      await resendConfirmation(email);
      btn.textContent = 'Resend confirmation email';
      btn.disabled = false;
      resendStatus.textContent = 'Sent — check your email, including spam and junk.';
    } catch (err) {
      btn.textContent = 'Resend confirmation email';
      btn.disabled = false;
      // FIXED 10 Aug 2026: this error was only logged to the console before,
      // invisible to the person actually using the app. Now shown directly —
      // the likely cause is Supabase's built-in test email service, which
      // has a low rate limit (a handful of emails per hour) not meant for
      // real use. See master_schedule.md for the custom-SMTP flag.
      resendError.textContent = err.message || 'Could not resend — please wait a minute and try again.';
      console.error(err);
    }
  });
  form.appendChild(btn);
  form.appendChild(resendStatus);
  form.appendChild(resendError);
}

bootstrap();
