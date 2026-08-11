# Alongside: Learn — Master Schedule
## 10 Aug 2026 v19

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Custom SMTP set up** | Resend domain fully verified (DKIM, MX, SPF all green). Supabase SMTP wired to it. Resend-email rate-limit issue should now be resolved. |
| **Cross-app service worker interference — found and fixed** | Significant finding, see Section 1. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. Cross-app service worker interference — a real, non-obvious bug

Graeme's console showed `sw.js:1035`, cache paths like `/alongside-app/js/views/about.js`, and `deleting old cache alongside-v222` — none of that is Learn's code. That's **Move's** actual, fully-built service worker. Move's SW appears registered with a broad `/` scope on the shared `build-new-habits.github.io` origin, and since Learn's own `sw.js` was never actually registered anywhere (a real gap — the file existed but nothing called `navigator.serviceWorker.register()`), Move's SW was the only one controlling pages under `/Alongside-Learn/` too.

**Practical implication:** Learn's pages could have been served stale cached JavaScript from Move's cache, unrelated to anything wrong in Learn's actual deployed code. This is the most likely explanation for the family-code bug appearing to still exist in testing after it was already fixed — Graeme was very possibly looking at a stale cached copy.

**Fixed:** `sw.js` now has real install/activate listeners (`skipWaiting` + `clients.claim`) and is registered from `index.html` with an explicit scope, so it takes precedence over Move's broader one. Deliberately no fetch/caching logic yet — it exists only to claim the correct scope; a real offline-caching strategy is a separate future decision, not bundled into this fix.

**Immediate unblock given to Graeme:** DevTools → Application → Service Workers → Unregister, plus Clear site data, then hard refresh — needed once to clear whatever Move's SW had already cached in that browser.

---

## 2. Email setup — done

Domain `buildnewhabits.co.uk` verified with Resend (DKIM/MX/SPF all confirmed). A DNS mix-up happened along the way — a Resend DKIM value was accidentally pasted into Zoho's existing SPF record — caught and corrected before saving, no lasting impact; Zoho's SPF is intact. Supabase SMTP now points at Resend rather than the built-in low-limit sender.

---

## 3. What's testable now

After clearing service worker/site data per Section 1, retry the sign-in that was failing. If it still fails, the actual error (not just background console noise) is what's needed next — screenshot whatever appears on-page or the first red console line after a genuine attempt.

---

## 4. Version history

| Version | Date | Change |
|---|---|---|
| v1–v18 | 10 Aug 2026 | See `Past MS/`. |
| v19 | 10 Aug 2026 | Diagnosed and fixed cross-app service worker interference from Move's SW controlling Learn's pages — likely explains the family-code bug appearing to persist. Resend domain verification completed; Supabase SMTP now live via Resend. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v19*
