// Alongside: Learn — Parent dashboard
// 10 Aug 2026 v1
// First version — shows family learners, their assignments, and the
// coach-synthesised risk summary. Deliberately does NOT show check-in
// mood/energy/sleep detail: the `checkins` table is owner-only at the RLS
// level (schema.md §2 rule 3), so this isn't a UI choice to hide it, it's
// the database refusing to hand it over. That's intentional and should stay
// that way — do not "fix" this by loosening the RLS policy to make the
// dashboard richer.

import { fetchFamily, fetchProfiles, fetchAssignments, fetchRiskSummary } from './store.js';

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
