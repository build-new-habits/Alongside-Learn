// Alongside: Learn — Revision timetable
// 10 Aug 2026 v1
// Learner-entered revision sessions (subject + date/time). No coach-generated
// scheduling yet (`coach_generated` flag exists in the schema for that
// future feature — see master_schedule.md).

import { createRevisionEntry, fetchRevisionEntries, deleteRevisionEntry } from './store.js';

/**
 * @param {HTMLElement} container
 * @param {{ userId: string }} ctx
 */
export async function renderRevisionTimetable(container, ctx) {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Revision timetable';
  container.appendChild(heading);

  container.appendChild(renderAddForm(ctx, () => renderRevisionTimetable(container, ctx)));

  const listHeading = document.createElement('h3');
  listHeading.textContent = 'Upcoming sessions';
  container.appendChild(listHeading);

  let entries = [];
  try {
    entries = await fetchRevisionEntries(ctx.userId);
  } catch (err) {
    container.appendChild(errorMessage("Couldn't load your timetable right now."));
    console.error(err);
    return;
  }

  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'No sessions planned yet — add one above.';
    container.appendChild(empty);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'assignment-list assignment-list-interactive';
  entries.forEach(entry => list.appendChild(renderEntryRow(entry, () => renderRevisionTimetable(container, ctx))));
  container.appendChild(list);
}

function renderAddForm(ctx, onAdded) {
  const form = document.createElement('form');
  form.className = 'assignment-add-form';
  form.setAttribute('aria-label', 'Add a revision session');

  const subjectField = document.createElement('div');
  subjectField.className = 'field';
  const subjectLabel = document.createElement('label');
  subjectLabel.htmlFor = 'revision-subject';
  subjectLabel.textContent = 'Subject';
  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.id = 'revision-subject';
  subjectInput.required = true;
  subjectField.appendChild(subjectLabel);
  subjectField.appendChild(subjectInput);

  const whenField = document.createElement('div');
  whenField.className = 'field';
  const whenLabel = document.createElement('label');
  whenLabel.htmlFor = 'revision-when';
  whenLabel.textContent = 'Date and time';
  const whenInput = document.createElement('input');
  whenInput.type = 'datetime-local';
  whenInput.id = 'revision-when';
  whenInput.required = true;
  whenField.appendChild(whenLabel);
  whenField.appendChild(whenInput);

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Add session';

  form.appendChild(subjectField);
  form.appendChild(whenField);
  form.appendChild(errorMsg);
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
      await createRevisionEntry({
        learnerId: ctx.userId,
        subject: subjectInput.value.trim(),
        scheduledAt: new Date(whenInput.value).toISOString(),
      });
      onAdded();
    } catch (err) {
      errorMsg.textContent = err.message || 'Could not add that — please try again.';
      submitBtn.disabled = false;
      console.error(err);
    }
  });

  return form;
}

function renderEntryRow(entry, onChanged) {
  const li = document.createElement('li');

  const label = document.createElement('span');
  const when = new Date(entry.scheduled_at).toLocaleString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
  label.innerHTML = `<strong>${escapeHtml(entry.subject || 'Revision')}</strong> — ${when}${entry.coach_generated ? ' · coach-suggested' : ''}`;
  li.appendChild(label);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'answer-option-btn answer-option-skip';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', async () => {
    try {
      await deleteRevisionEntry(entry.entry_id);
      onChanged();
    } catch (err) {
      console.error(err);
    }
  });
  li.appendChild(removeBtn);

  return li;
}

function errorMessage(text) {
  const p = document.createElement('p');
  p.className = 'checkin-error';
  p.setAttribute('role', 'alert');
  p.textContent = text;
  return p;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
