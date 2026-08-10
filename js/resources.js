// Alongside: Learn — Support resources rendering
// 10 Aug 2026 v1
// Extracted from checkin.js so both the always-on resource list (file 04 §5)
// and the safeguarding-triggered resource list (file 06 §3) can share one
// renderer, since they're now both used from within checkin.js's
// conversational flow.

import { alwaysOnResources } from './data/coach-voice.js';

/**
 * @param {HTMLElement} container
 * @param {{ heading?: string|null, resources?: Array<{name:string, detail:string}> }} [options]
 *   heading: pass null to omit (used when a coach bubble already introduced it).
 *   resources: defaults to the always-on list; pass a different array (e.g.
 *   a safeguarding response's resources) to reuse the same rendering.
 */
export function renderAlwaysOnResources(container, options = {}) {
  const { heading = 'Need to talk to someone?', resources = alwaysOnResources } = options;

  const section = document.createElement('section');
  section.setAttribute('aria-label', 'Support resources');
  section.className = 'resource-section';

  if (heading) {
    const h = document.createElement('h3');
    h.textContent = heading;
    section.appendChild(h);
  }

  const list = document.createElement('ul');
  list.className = 'resource-list';
  resources.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.name}</strong> — ${r.detail}`;
    list.appendChild(li);
  });
  section.appendChild(list);
  container.appendChild(section);
}
