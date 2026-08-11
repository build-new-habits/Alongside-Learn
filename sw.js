// Alongside: Learn — Service worker
// 10 Aug 2026 v2
// Bumped LAST on every deploy per file 07 §4 — never edit this file except
// as the final step of a deploy, with a changelog entry.
//
// FIXED 10 Aug 2026: this was never actually registered anywhere (index.html
// / app.js had no navigator.serviceWorker.register() call), so it was
// inert. Meanwhile Move's own service worker — registered with a broad "/"
// scope on the same GitHub Pages origin (build-new-habits.github.io) — was
// the only service worker controlling pages under /Alongside-Learn/, since
// nothing more specific existed to take precedence. That meant Learn's pages
// could be served stale cached JS from Move's cache, unrelated to anything
// actually wrong in Learn's own code. Now registered with an explicit,
// specific scope (see index.html) so it takes over for Learn's own pages.
//
// Deliberately NO fetch handler yet — every request just passes straight to
// the network. No offline caching strategy is needed for beta; this file's
// only job right now is to exist and claim the correct scope. Add real
// caching only as a deliberate, separately-planned decision.
const CACHE_VERSION = 'learn-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
