# Alongside: Learn — Build Protocol
## 09 Aug 2026 v1

Build New Habits Ltd | Standing rules for every session in the Alongside: Learn project — build, content, or business. Adapted directly from Move's proven build discipline (`alongside_technical_blueprint_23jun2026_v1.docx` Section 0, `alongside_pm_protocol_12jul2026_v2.md`). Apply from the very first session in the new project — do not treat this as optional scaffolding to adopt "later."

---

## 1. Version header rule — non-negotiable

Every file produced must carry a version header in the format `DD Mon YYYY vN` (e.g. `09 Aug 2026 v1`). Multiple versions same day: v1, v2, v3. If a file is presented without this header — by Claude or by Graeme — reject it and ask for it to be fixed before proceeding. No exceptions.

---

## 2. Session start checklist — run before any action, every session

- [ ] Search project knowledge for the Learn master schedule (see Section 3) and read it in full before anything else.
- [ ] Confirm current live file versions: read `store.js` (or its Learn equivalent) first, confirm date+version header matches the live repo. If they don't match, stop and reconcile before writing any code.
- [ ] List every file to be touched this session. No file should appear in more than one scheduled session within a build block (touch-once rule).
- [ ] Schema first: if any data field is new or changed, update the schema file before writing any code that reads it.
- [ ] Confirm `sw.js` (once it exists) will be the last file deployed, with a one-line change note and cache version increment.
- [ ] At session close: update the master schedule, per Section 3.

---

## 3. Master schedule rule

Create `Documents/Admin/master_schedule.md` in the `alongside-learn` repo as the single source of truth for all Learn build, business, and content tasks — the same role it plays for Move. Every session starts by reading it in full. Every session that produces specs, completes tasks, or changes plans updates it before closing, following Move's exact pattern:

1. Write the new version with an incremented version number.
2. Push it to `Documents/Admin/master_schedule.md` in the repo (see Section 5 for token workflow).
3. Move the previous version into `Documents/Admin/Past MS/`.
4. Upload the new snapshot to project knowledge, removing the superseded copy (manual deletion of the old project-knowledge entry is still required by Graeme — Claude can't do that directly).

Never plan a build session from a recent conversation alone — always ground in the master schedule.

---

## 4. Build discipline — non-negotiable

- Schema-first: data schema written and confirmed before any file that reads new fields (see file 05 for the current scaffold status).
- Complete file replacements only. No partial patches on complex files.
- `sw.js` bumped last on every deploy, every time, with a changelog entry.
- Touch-once: know every change before opening a file. No file appears in more than one build step within a session block.
- Before writing any file: confirm its current live version. If missing, ask for it — never assume.
- WCAG 2.2 AA required on all content and UI, no exceptions (full detail in file 01).
- Ground-truth before editing: live app source always fetched fresh from the repo, never trusted from project knowledge or CDN alone. CDN caching lags — use a fresh clone to verify (see file 00, Section 5).

---

## 5. Repo token workflow

Full setup steps are in file 00, Section 5. Standing rules once set up:

- The token lives in project knowledge as its own named file, not pasted inline where it's hard to rotate.
- 7-day expiry, regenerated and re-uploaded weekly during active build phases.
- Git identity: `pm-chat@buildnewhabits.co.uk` / `"PM Chat (Claude) — Learn"`.
- Reliable verification after any push: fresh `git clone`, never trust `raw.githubusercontent.com` alone in the same session.
- Security trade-off (token in project knowledge = wider exposure than a single chat session) is accepted deliberately during rapid build — revisit once Learn is past that phase, matching the same logged trade-off in Move.

---

## 6. Deploy sequence

All application files in dependency order, then `sw.js` last. Always test with "empty cache and hard reload" in DevTools. Phone is the primary test device — matching Move's convention, since this is a mobile-first PWA family.

---

## 7. Content gates — pattern to inherit

Move separates architecture (buildable now) from content (requires Nurturing-voice scripting before certain features can go live) using explicit content gates in its technical blueprint (e.g. "D6 — Nurturing voice Beat 1 scripts. Required before build."). Learn should adopt the same pattern for anything that needs real coach-voice scripting: mark the code path as buildable, but flag the actual script content as a separate, trackable gate rather than writing placeholder copy that quietly ships.

---

## 8. Coordination pattern — PM chat vs. build chat, if the project grows to need it

If Learn's build reaches the complexity where a single chat can't hold both planning and execution (as happened with Move), adopt the same split: a PM chat that reads the master schedule, writes blueprints, and reconciles handoffs; separate build/test chats that execute against a blueprint and ground-truth live files themselves rather than trusting a snapshot. Full detail and blueprint template in `alongside_pm_protocol_12jul2026_v2.md` if useful as a direct reference — not reproduced here since it's Move-specific in places, but the coordination shape transfers directly.

---

## 9. Working-style notes worth carrying over

- One decision at a time; brief and direct; minimal chat inflation.
- Real-world bugs found during actual device use are the most reliable test method — "should work" is never acceptable; on-device evidence required to close any test.
- Status updates in single-sentence bullets, numbered steps, "click this / look at this / you should see" test instructions — ADHD-friendly structured formats.
- Non-ASCII check + syntax verification before every commit.

---

*Build New Habits Ltd · Alongside: Learn · Build Protocol · 09 Aug 2026 v1*
