// Alongside: Learn — Parent dashboard
// 17 Aug 2026 v2
// First version — shows family learners, their assignments, and the
// coach-synthesised risk summary. Deliberately does NOT show check-in
// mood/energy/sleep detail: the `checkins` table is owner-only at the RLS
// level (schema.md §2 rule 3), so this isn't a UI choice to hide it, it's
// the database refusing to hand it over. That's intentional and should stay
// that way — do not "fix" this by loosening the RLS policy to make the
// dashboard richer.

import { fetchFamily, fetchProfiles, fetchAssignments, fetchRiskSummary, fetchRevisionEntries, fetchConsentedAlerts, acknowledgeAlert } from './store.js';
import { focusTarget } from './a11y.js';

/**
 * @param {HTMLElement} container
 * @param {{ userId: string, familyId: string }} ctx
 */
export async function renderParentDashboard(container, ctx) {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Your family';
  container.appendChild(heading);

  let family;
  try {
    family = await fetchFamily(ctx.familyId);
  } catch (err) {
    container.appendChild(errorMessage("Couldn't load your family right now — please try again."));
    console.error(err);
    return;
  }

  const learners = await fetchProfiles(family.learner_ids);

  if (learners.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'coach-card';
    empty.innerHTML = `No learners have joined yet. Share your family code with them to get started:<br><br><span class="family-code">${escapeHtml(ctx.familyId)}</span>`;
    container.appendChild(empty);
    return;
  }

  for (const learner of learners) {
    container.appendChild(await renderLearnerCard(learner));
  }
}

async function renderLearnerCard(learner) {
  const card = document.createElement('section');
  card.className = 'coach-card learner-card';
  card.setAttribute('aria-label', `${learner.name}'s overview`);

  const name = document.createElement('h3');
  name.textContent = learner.name;
  card.appendChild(name);

  card.appendChild(await renderAlerts(learner));

  // Risk summary — synthesised only, never raw scores (schema.md §2 rule 2)
  const summary = await fetchRiskSummary(learner.user_id);
  const summaryPara = document.createElement('p');
  summaryPara.textContent = summary?.parent_facing_summary
    ? summary.parent_facing_summary
    : 'No summary yet — this builds up as your learner uses Alongside.';
  card.appendChild(summaryPara);

  // Assignments
  let assignments = [];
  try {
    assignments = await fetchAssignments(learner.user_id);
  } catch (err) {
    console.error('Failed to load assignments for', learner.user_id, err);
  }

  const assignmentsHeading = document.createElement('h4');
  assignmentsHeading.textContent = 'Upcoming assignments';
  card.appendChild(assignmentsHeading);

  if (assignments.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'No assignments logged yet.';
    card.appendChild(empty);
  } else {
    const list = document.createElement('ul');
    list.className = 'assignment-list';
    assignments.forEach(a => {
      const li = document.createElement('li');
      const due = a.due_date ? new Date(a.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'No date';
      li.innerHTML = `<strong>${escapeHtml(a.title || 'Untitled')}</strong> — ${escapeHtml(a.subject || '')} · due ${due} · ${escapeHtml(a.status || 'not started')}`;
      list.appendChild(li);
    });
    card.appendChild(list);
  }

  // Upcoming revision sessions — same visibility rule as assignments
  // (revision_timetable_parent_select policy, sql/001)
  let revisionEntries = [];
  try {
    revisionEntries = await fetchRevisionEntries(learner.user_id);
  } catch (err) {
    console.error('Failed to load revision timetable for', learner.user_id, err);
  }

  const revisionHeading = document.createElement('h4');
  revisionHeading.textContent = 'Upcoming revision';
  card.appendChild(revisionHeading);

  const upcoming = revisionEntries.filter(e => new Date(e.scheduled_at) >= new Date()).slice(0, 5);
  if (upcoming.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'No revision sessions planned yet.';
    card.appendChild(empty);
  } else {
    const revList = document.createElement('ul');
    revList.className = 'assignment-list';
    upcoming.forEach(entry => {
      const li = document.createElement('li');
      const when = new Date(entry.scheduled_at).toLocaleString('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
      });
      li.innerHTML = `<strong>${escapeHtml(entry.subject || 'Revision')}</strong> — ${when}`;
      revList.appendChild(li);
    });
    card.appendChild(revList);
  }

  return card;
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

/**
 * Consented contact requests (copy review item 3a, 11 Aug 2026).
 *
 * Shows ONLY that the learner asked to talk — never the mood word, the free
 * text, the safeguarding level, or what triggered it. sql/004's RLS policy
 * means unconsented rows are not returned at all, so there is nothing here to
 * accidentally over-share.
 */
async function renderAlerts(learner) {
  const wrap = document.createElement('div');
  wrap.className = 'alert-region';
  wrap.setAttribute('aria-live', 'polite');

  let alerts = [];
  try {
    alerts = await fetchConsentedAlerts(learner.user_id);
  } catch (err) {
    console.error('Could not load contact requests', err);
    return wrap;
  }

  const outstanding = alerts.filter(a => !a.acknowledged_at);
  if (outstanding.length === 0) return wrap;

  const box = document.createElement('div');
  box.className = 'alert-box';

  const heading = document.createElement('h4');
  heading.textContent = `${learner.name} asked to talk`;
  box.appendChild(heading);

  const when = new Date(outstanding[0].sent_at).toLocaleString('en-GB', {
    weekday: 'long', hour: '2-digit', minute: '2-digit',
  });
  const detail = document.createElement('p');
  detail.textContent = `Requested ${when}. They chose to let you know — Learn has not shared anything they wrote or how they were feeling. That conversation is yours to have with them.`;
  box.appendChild(detail);

  const ack = document.createElement('button');
  ack.type = 'button';
  ack.className = 'answer-option-btn';
  ack.textContent = 'I have spoken with them';
  // A family can have several learners, so several of these buttons can be on
  // screen at once with an identical visible label. The accessible name says
  // which child it belongs to (SC 4.1.2) — pressing the wrong one clears a
  // request to talk from the wrong child, which matters here more than most.
  ack.setAttribute('aria-label', `I have spoken with ${learner.name}`);

  const ackError = document.createElement('p');
  ackError.className = 'checkin-error';
  ackError.setAttribute('role', 'alert');

  ack.addEventListener('click', async () => {
    ack.disabled = true;
    ackError.textContent = '';
    try {
      for (const a of outstanding) await acknowledgeAlert(a.log_id);
      box.remove();
      wrap.textContent = `Marked as spoken with ${learner.name}.`;
      // Removing the box destroys the button that had focus. Without this the
      // parent is returned to <body>, at the top of a dashboard that may list
      // several children.
      focusTarget(wrap);
    } catch (err) {
      ack.disabled = false;
      // Was console-only: the parent pressed the button, the request stayed on
      // screen, and nothing explained why. On this particular feature, silence
      // is the wrong failure mode.
      ackError.textContent = 'That did not save — please try again.';
      console.error('Acknowledge failed', err);
    }
  });
  box.appendChild(ack);
  box.appendChild(ackError);

  wrap.appendChild(box);
  return wrap;
}
