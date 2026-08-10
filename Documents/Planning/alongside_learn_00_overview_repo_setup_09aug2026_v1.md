# Alongside: Learn — Overview & Repo Setup
## 09 Aug 2026 v1

Build New Habits Ltd | First document to read in this pack. Explains what this pack is, what's confirmed vs. still open, and how to stand up the new repo and Claude project.

---

## 1. What this pack is

Nine files, each self-contained, compiled from every Alongside: Learn and shared-family document that exists across Move's project knowledge as of 09 Aug 2026. Together they give a new Claude project everything it needs to start building Alongside: Learn without access to Move's project knowledge.

| File | Covers |
|---|---|
| 00 — this file | Overview, repo setup, new-project setup, token workflow |
| 01 | Brand & design system (shared family + Learn-specific) |
| 02 | Coach voice & language |
| 03 | Product vision, users, business context |
| 04 | Coach logic & features |
| 05 | Data & architecture scaffold |
| 06 | Safeguarding & legal |
| 07 | Build protocol (session discipline, version headers, repo workflow) |
| 08 | Open decisions & gaps — read this one too, not just the confirmed material |

**Honesty note, upfront:** Learn's spec set was never finished. Docs 1, 4, and 5 (vision, coach logic, features) exist and are solid — this pack draws on them directly. Docs 2 (schema), 3 (file architecture), 6 (safeguarding/legal detail specific to Learn), and 7 (safety by design) were never written. Where this pack fills that gap, it says so plainly and marks the content as a **scaffold** or **proposal**, not a confirmed spec — never presented as settled fact when it isn't. File 08 lists every such gap in one place.

---

## 2. What's confirmed vs. what needs a decision

**Confirmed, safe to build from directly:**
- Product vision, five-phase coaching arc, user model (files 00, 03, 04)
- Coach voice — Nurturing only, same as Move (confirmed this session)
- Shared design system, WCAG 2.2 AA floor (file 01)
- Feature list and tier gating (Free vs Athena) (file 04)
- Crisis & safeguarding detection mechanism — already written to cover Learn explicitly (file 06)

**Not yet decided — see file 08 before building on these:**
- Data schema (no Doc 2 ever existed — file 05 is a scaffold only)
- File/system architecture specifics for Learn (no Doc 3 ever existed)
- Pricing for Learn (Move has confirmed price points; Learn does not)
- Three safeguarding sign-off roles remain unfilled across the whole product family
- Seven legal/safeguarding items flagged in the existing crisis policy, several of which name Learn specifically (multi-user/family visibility, minors' data)

---

## 3. Repo setup

No GitHub repo exists yet for Alongside: Learn. Steps to create one, mirroring the `alongside-app` repo's structure:

1. **Create the repo.** GitHub → New repository → name it `alongside-learn` (keeps the family naming pattern consistent with `alongside-app` and `website`). Private repo. Add a README on creation.
2. **Enable GitHub Pages** (Settings → Pages) once there's an `index.html` to serve, so builds are viewable on your phone as they're built — same pattern as Move.
3. **Create the folder structure** (mirrors `alongside-app`):

```
alongside-learn/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── store.js
│   └── data/
│       └── coach-voice.js
├── sw.js
└── Documents/
    ├── Admin/
    │   ├── master_schedule.md      ← canonical source of truth, see file 07
    │   └── Past MS/
    ├── Live State/
    │   ├── schema.md
    │   └── changelog.md
    └── Business/
```

This is a recommendation, not a fixed requirement — Learn's actual technical shape (multi-user family accounts, separate Supabase project) may justify departures. Flag and confirm any departure before the first build session, per the touch-once discipline in file 07.

---

## 4. New Claude project setup

1. Create a new Claude project (separate from the Alongside: Move project).
2. Upload all nine files in this pack to the project's knowledge base.
3. Set the project's custom instructions to reference file 07 (Build Protocol) as the standing session discipline — the same role `alongside_pm_protocol` and the version-header/session-checklist rules play in the Move project.
4. First session in the new project should be a planning-only session: read all nine files, confirm the repo structure above, and produce the first real master schedule for Learn (see file 07, Section 3) before any code is written.

---

## 5. Repo token workflow (for direct repo writes)

Move's project uses a fine-grained GitHub Personal Access Token, provided directly in the chat's knowledge, so the PM/build chat can clone, edit, commit, and push directly rather than working through the GitHub web UI by hand. The same pattern is recommended for Learn.

**Setup steps:**
1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
2. **Repository access:** restrict to the `alongside-learn` repo only — never "all repositories."
3. **Permissions:** Contents (Read and write) at minimum. Add Pull requests (Read and write) only if you want the chat opening PRs rather than pushing directly to main.
4. **Expiration:** 7 days, matching Move's convention. This is a deliberate convenience trade-off during rapid build — short expiry limits exposure if the token is ever compromised via chat history. Regenerate and re-upload weekly during active build phases.
5. Upload the token as its own file in the new project's knowledge base (name it something identifiable, e.g. `Fine-Grain_Token_Learn`), **not** pasted inline in a chat message where it's harder to rotate cleanly.

**Security note, same as Move's:** a token living in project knowledge or chat history is a wider exposure surface than pasting it only into the single chat session that needs it. This is an accepted trade-off during the rapid-build phase — worth revisiting once Learn moves past that phase, exactly as already logged for Move.

**Git identity convention** (match Move's, so commit history is legible across the whole product family):
```
git config user.email "pm-chat@buildnewhabits.co.uk"
git config user.name "PM Chat (Claude) — Learn"
```
The `— Learn` suffix distinguishes Learn's automated commits from Move's in any tooling that aggregates across repos.

**Reliable verification pattern** (same lesson learned on Move — CDN caching lags, don't trust it):
```
rm -rf verify-clone && git clone https://<token>@github.com/build-new-habits/alongside-learn.git verify-clone
```
Never trust `raw.githubusercontent.com` alone for same-session verification after a push — always fresh-clone.

---

*Build New Habits Ltd · Alongside: Learn · Overview & Repo Setup · 09 Aug 2026 v1*
