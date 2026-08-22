// Alongside: Learn — Accessibility helpers
// 17 Aug 2026 v1
//
// Every view in Learn re-renders by wiping its container and rebuilding it.
// That is a perfectly reasonable pattern for an app this size, but it has one
// consistent consequence: the element the person was using is destroyed, so
// focus falls back to <body>. A keyboard or screen reader user is dumped at
// the top of the page every time they change an assignment's status, reveal a
// flashcard, or remove a revision session (SC 2.4.3 Focus Order).
//
// It also means changes happen silently. Nothing tells a screen reader user
// that the status saved, or that the card was added.
//
// These two helpers fix both, and are deliberately the only live region in the
// app. js/checkin.js does NOT use them — it manages focus directly, because in
// a conversational flow the new message IS the thing to move to (decision D18,
// master_schedule.md §2). Everywhere else, use these.

let announcer = null;

/**
 * Announces a short message to screen readers without moving focus or showing
 * anything on screen. Use for confirmations that would otherwise be silent.
 *
 * One shared region, created once and reused. Creating a live region and
 * writing to it in the same tick is unreliable — the region has to exist
 * before the text lands in it — so the write is deferred a frame.
 */
export function announce(message) {
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

/**
 * Makes a non-interactive element focusable programmatically without putting
 * it in the tab order, then focuses it. Used to land the person somewhere
 * meaningful after a re-render — normally the heading of whatever changed.
 */
export function focusTarget(el) {
  if (!el) return;
  el.tabIndex = -1;
  el.focus({ preventScroll: true });
}
