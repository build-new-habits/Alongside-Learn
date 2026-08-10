// Alongside: Learn — Flashcards
// 10 Aug 2026 v1
// Add cards, review what's due today (question -> reveal answer -> mark
// correct/incorrect), see the full deck below. Simple spaced-repetition
// logic lives in store.js's reviewFlashcard(), not here.

import { createFlashcard, fetchAllFlashcards, fetchDueFlashcards, reviewFlashcard } from './store.js';

/**
 * @param {HTMLElement} container
 * @param {{ userId: string }} ctx
 */
export async function renderFlashcards(container, ctx) {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Flashcards';
  container.appendChild(heading);

  container.appendChild(renderAddForm(ctx, () => renderFlashcards(container, ctx)));

  let due = [];
  let all = [];
  try {
    [due, all] = await Promise.all([fetchDueFlashcards(ctx.userId), fetchAllFlashcards(ctx.userId)]);
  } catch (err) {
    container.appendChild(errorMessage("Couldn't load your flashcards right now."));
    console.error(err);
    return;
  }

  const reviewHeading = document.createElement('h3');
  reviewHeading.textContent = due.length > 0 ? `Due for review (${due.length})` : 'Nothing due for review';
  container.appendChild(reviewHeading);

  if (due.length > 0) {
    container.appendChild(renderReviewCard(due[0], () => renderFlashcards(container, ctx)));
  }

  const allHeading = document.createElement('h3');
  allHeading.textContent = 'All your cards';
  container.appendChild(allHeading);

  if (all.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'No flashcards yet — add your first one above.';
    container.appendChild(empty);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'assignment-list';
  all.forEach(card => {
    const li = document.createElement('li');
    const due = new Date(card.next_review_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    li.innerHTML = `<strong>${escapeHtml(card.question)}</strong> — ${escapeHtml(card.subject || '')} · next review ${due}`;
    list.appendChild(li);
  });
  container.appendChild(list);
}

function renderReviewCard(card, onReviewed) {
  const wrap = document.createElement('div');
  wrap.className = 'coach-card flashcard-review';

  const question = document.createElement('p');
  question.className = 'flashcard-question';
  question.textContent = card.question;
  wrap.appendChild(question);

  const answer = document.createElement('p');
  answer.className = 'flashcard-answer';
  answer.textContent = card.answer;
  answer.hidden = true;
  wrap.appendChild(answer);

  const revealBtn = document.createElement('button');
  revealBtn.type = 'button';
  revealBtn.className = 'btn-secondary';
  revealBtn.textContent = 'Show answer';

  const btnRow = document.createElement('div');
  btnRow.className = 'flashcard-review-btns';
  btnRow.hidden = true;

  const correctBtn = document.createElement('button');
  correctBtn.type = 'button';
  correctBtn.className = 'btn-primary';
  correctBtn.textContent = 'Got it right';

  const incorrectBtn = document.createElement('button');
  incorrectBtn.type = 'button';
  incorrectBtn.className = 'btn-secondary';
  incorrectBtn.textContent = 'Got it wrong';

  revealBtn.addEventListener('click', () => {
    answer.hidden = false;
    revealBtn.hidden = true;
    btnRow.hidden = false;
  });

  correctBtn.addEventListener('click', async () => {
    await reviewFlashcard(card, true);
    onReviewed();
  });
  incorrectBtn.addEventListener('click', async () => {
    await reviewFlashcard(card, false);
    onReviewed();
  });

  btnRow.appendChild(correctBtn);
  btnRow.appendChild(incorrectBtn);
  wrap.appendChild(revealBtn);
  wrap.appendChild(btnRow);

  return wrap;
}

function renderAddForm(ctx, onAdded) {
  const form = document.createElement('form');
  form.className = 'assignment-add-form';
  form.setAttribute('aria-label', 'Add a flashcard');

  const questionField = labelledField('flashcard-question', 'Question', 'text', true);
  const answerField = labelledField('flashcard-answer', 'Answer', 'text', true);
  const subjectField = labelledField('flashcard-subject', 'Subject (optional)', 'text', false);
  const topicField = labelledField('flashcard-topic', 'Topic (optional)', 'text', false);

  const errorMsg = document.createElement('p');
  errorMsg.className = 'checkin-error';
  errorMsg.setAttribute('role', 'alert');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn-primary';
  submitBtn.textContent = 'Add flashcard';

  [questionField, answerField, subjectField, topicField].forEach(f => form.appendChild(f.wrapper));
  form.appendChild(errorMsg);
  form.appendChild(submitBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
      await createFlashcard({
        learnerId: ctx.userId,
        question: questionField.input.value.trim(),
        answer: answerField.input.value.trim(),
        subject: subjectField.input.value.trim(),
        topic: topicField.input.value.trim(),
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

function labelledField(id, labelText, type, required) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.required = required;
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return { wrapper, input };
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
