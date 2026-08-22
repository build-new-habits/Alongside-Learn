// Alongside: Learn — Flashcards
// 17 Aug 2026 v2
// Add cards, review what's due today (question -> reveal answer -> mark
// correct/incorrect), see the full deck below. Simple spaced-repetition
// logic lives in store.js's reviewFlashcard(), not here.

import { createFlashcard, fetchAllFlashcards, fetchDueFlashcards, reviewFlashcard } from './store.js';
import { announce, focusTarget } from './a11y.js';

/**
 * @param {HTMLElement} container
 * @param {{ userId: string }} ctx
 */
export async function renderFlashcards(container, ctx, { focusAfter = null } = {}) {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Flashcards';
  container.appendChild(heading);

  const form = renderAddForm(ctx, () => renderFlashcards(container, ctx, { focusAfter: 'form' }));
  container.appendChild(form);
  if (focusAfter === 'form') form.querySelector('input')?.focus();

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
    container.appendChild(renderReviewCard(due[0], () => renderFlashcards(container, ctx, { focusAfter: 'review' })));
  }
  // Marking a card right or wrong rebuilds the view and the next card takes the
  // old one's place. Without this the learner is silently returned to <body>
  // after every single card, which makes reviewing a deck by keyboard
  // effectively impossible. Landing on the review heading also reads out how
  // many are left.
  if (focusAfter === 'review') focusTarget(reviewHeading);

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
    // Hiding the button the learner just pressed destroys their focus position,
    // and the answer they asked for is never announced. Moving focus onto the
    // answer does both jobs: it reads out, and the right/wrong buttons are the
    // next things in the tab order.
    focusTarget(answer);
  });

  // Both of these previously had no error handling at all: if the review failed
  // to save, onReviewed() never ran and the card simply sat there.
  async function review(gotItRight) {
    correctBtn.disabled = true;
    incorrectBtn.disabled = true;
    try {
      await reviewFlashcard(card, gotItRight);
      announce(gotItRight ? 'Marked right.' : 'Marked wrong.');
      onReviewed();
    } catch (err) {
      correctBtn.disabled = false;
      incorrectBtn.disabled = false;
      const failed = document.createElement('p');
      failed.className = 'checkin-error';
      failed.setAttribute('role', 'alert');
      failed.textContent = 'That did not save — please try again.';
      wrap.appendChild(failed);
      console.error(err);
    }
  }

  correctBtn.addEventListener('click', () => review(true));
  incorrectBtn.addEventListener('click', () => review(false));

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
