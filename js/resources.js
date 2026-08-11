// Alongside: Learn — Support resources rendering
// 11 Aug 2026 v2
// Extracted from checkin.js so both the always-on resource list (file 04 §5)
// and the safeguarding-triggered resource list (file 06 §3) can share one
// renderer, since they're now both used from within checkin.js's
// conversational flow.
//
// 11 Aug 2026 (copy review item 2, Graeme approved): every phone number and
// text shortcode now renders as a real tap target (tel: / sms:) and every
// website as a link. Previously all contact details were plain text, so a
// distressed learner on a phone had to copy a number out and switch apps to
// use it. Visible wording is unchanged — this is a mechanism change only.
//
// Also switched from innerHTML to explicit DOM construction: resource copy is
// static and trusted, but this file renders crisis content and should not
// have an HTML-injection path in it at all.

import { alwaysOnResources } from './data/coach-voice.js';

/**
 * @param {HTMLElement} container
 * @param {{ heading?: string|null, resources?: Array<{
 *   name: string, detail: string, tel?: string, sms?: string, url?: string
 * }> }} [options]
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
    li.className = 'resource-item';

    const name = document.createElement('strong');
    name.textContent = r.name;
    li.appendChild(name);

    li.appendChild(document.createTextNode(` — ${r.detail}`));

    const actions = buildActions(r);
    if (actions) li.appendChild(actions);

    list.appendChild(li);
  });

  section.appendChild(list);
  container.appendChild(section);
}

/**
 * Builds the tap targets for a resource. Each action carries its own
 * accessible name ("Call Childline on 0800 1111") rather than relying on
 * surrounding text, so the link makes sense read out of context by a screen
 * reader — WCAG 2.2 AA, SC 2.4.4 Link Purpose (In Context).
 * Returns null where a resource has no contactable action.
 */
function buildActions(resource) {
  const { name, tel, sms, url } = resource;
  if (!tel && !sms && !url) return null;

  const wrap = document.createElement('div');
  wrap.className = 'resource-actions';

  if (tel) {
    wrap.appendChild(action(`tel:${tel}`, `Call ${name}`, `Call ${name} on ${formatTel(tel)}`));
  }
  if (sms) {
    wrap.appendChild(action(`sms:${sms}`, `Text ${name}`, `Text ${name} on ${sms}`));
  }
  if (url) {
    const link = action(url, 'Website', `Visit the ${name} website`);
    link.rel = 'noopener noreferrer';
    link.target = '_blank';
    wrap.appendChild(link);
  }

  return wrap;
}

function action(href, label, accessibleName) {
  const a = document.createElement('a');
  a.className = 'resource-action';
  a.href = href;
  a.textContent = label;
  a.setAttribute('aria-label', accessibleName);
  return a;
}

/** Re-spaces a dialling string for screen readers and visible labels. */
function formatTel(tel) {
  if (tel === '999') return '999';
  if (tel === '116123') return '116 123';
  if (tel === '08001111') return '0800 1111';
  if (tel === '08000684141') return '0800 068 4141';
  return tel;
}
