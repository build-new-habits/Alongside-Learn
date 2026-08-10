// Alongside: Learn — Learner assignments view
// 10 Aug 2026 v1
// Lets a learner add and track assignments — closes the loop with the parent
// dashboard (built same day), which reads this table but had nothing to show
// until learners could write to it.

import { fetchAssignments, createAssignment, updateAssignmentStatus } from './store.js';

const STATUS_OPTIONS = ['not started', 'in progress', 'done'];

/**
 * @param {HTMLElement} container
 * @param {{ userId: string }} ctx
 */
export async function renderAssignments(container, ctx) {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'My work';
  container.appendChild(heading);

  container.appendChild(renderAddForm(ctx, () => renderAssignments(container, ctx)));

  const listHeading = document.createElement('h3');
  listHeading.textContent = 'Your assignments';
  container.appendChild(listHeading);

  let assignments = [];
  try {
    assignments = await fetchAssignments(ctx.userId);
  } catch (err) {
    container.appendChild(errorMessage("Couldn't load your assignments right now."));
    console.error(err);
    return;
  }

  if (assignments.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'Nothing added yet — use the form above to add your first one.';
    container.appendChild(empty);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'assignment-list assignment-list-interactive';
  assignments.forEach(a => list.appendChild(renderAssignmentRow(a, () => renderAssignments(container, ctx))));
  container.appendChild(list);
}

function renderAddForm(ctx, onAdded) {
  const form = document.createElement('form');
  form.className = 'assignment-add-form';
  form.setAttribute('aria-label', 'Add an assignment');

  const titleField = document.createElement('div');
  titleField.className = 'field';
  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'assignment-title';
  titleLabel.textContent = 'Title';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'assignment-title';
  titleInput.required = true;
  titleField.appendChild(titleLabel);
  titleField.appendChild(titleInput);

  const subjectField = document.createElement('div');
  subjectField.className = 'field';
  const subjectLabel = document.createElement('label');
  subjectLabel.htmlFor = 'assignment-subject';
  subjectLabel.textContent = 'Subject (optional)';
  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.id = 'assignment-subject';
  subjectField.appendChild(subjectLabel);
  subjectField.appendChild(subjectInput);

  const dueField = document.createElement('div');
  dueField.className = 'field';
  const dueLabel = document.createElement('label');
  dueLabel.htmlFor = 'assignment-due';
  dueLabel.textContent = 'Due date (optional)';
  const dueInput = document.createElement('input');
  dueInput.type = 'date';
  dueInput.id = 'assignment-due';
  dueField.appendChild(dueLabel);
  dueField.appendChild(dueInput);

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Add assignment';

  form.appendChild(titleField);
  form.appendChild(subjectField);
  form.appendChild(dueField);
  form.appendChild(errorMsg);
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
      await createAssignment({
        learnerId: ctx.userId,
        title: titleInput.value.trim(),
        subject: subjectInput.value.trim(),
        dueDate: dueInput.value || null,
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

function renderAssignmentRow(assignment, onChanged) {
  const li = document.createElement('li');

  const label = document.createElement('span');
  const due = assignment.due_date
    ? new Date(assignment.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : 'No date';
  label.innerHTML = `<strong>${escapeHtml(assignment.title)}</strong> — ${escapeHtml(assignment.subject || '')} · due ${due}`;
  li.appendChild(label);

  const select = document.createElement('select');
  select.setAttribute('aria-label', `Status for ${assignment.title}`);
  STATUS_OPTIONS.forEach(status => {
    const opt = document.createElement('option');
    opt.value = status;
    opt.textContent = status;
    opt.selected = assignment.status === status;
    select.appendChild(opt);
  });
  select.addEventListener('change', async () => {
    try {
      await updateAssignmentStatus(assignment.assignment_id, select.value);
      onChanged();
    } catch (err) {
      console.error(err);
    }
  });
  li.appendChild(select);

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
