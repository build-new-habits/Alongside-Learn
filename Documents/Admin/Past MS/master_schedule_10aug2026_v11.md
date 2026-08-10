# Alongside: Learn — Master Schedule
## 10 Aug 2026 v11

Build New Habits Ltd | Single source of truth for all Learn build, business, content, and safeguarding/legal tasks. Read in full at the start of every session (file 07, Section 3). Updated at the close of every session.

---

## 0. Launch readiness snapshot — 10 Aug 2026

| | |
|---|---|
| Target date | 1 Sept 2026 |
| Launch scope | Private beta — trusted families only |
| **Family creation → check-in tested live** | Confirmed working end-to-end today (family code generated, reached the check-in screen). |
| UX direction set today | Conversational (chat-bubble) check-in, replacing the static form. Mood word list now "unlocked" by two simple questions rather than shown all at once. |
| Safeguarding reviewers | Graeme (self) — ongoing. Solicitor — TBC. School DSL friend — TBC. |
| Pricing | Deferred to pre-public-launch. |

---

## 1. UX rework built today — needs a fresh look

**Conversational check-in:** the form is gone. Coach asks one question at a time as a chat bubble; your answer appears as a reply bubble (WhatsApp-style), then the next question appears. Built with plain HTML/CSS, no new library.

**Mood word picker redesigned:** instead of all four Mood Meter quadrants (20+ words) on screen at once, it's now two quick questions — energy (existing 5-point scale) and "more good, or more hard?" — which together determine the one quadrant to show (4-9 words). This is actually closer to how the real Mood Meter is taught (RULER: energy axis, then pleasantness axis, then the word), not a simplification away from it.

**Resources repositioned:** every check-in now closes with a resource reminder as part of the natural end-of-conversation moment, not just when something's flagged. Kooth added to the list (verified today — it's regionally commissioned, not available everywhere in the UK, so the copy says to check kooth.com rather than presenting it as universal).

**Safety fix made alongside this, not asked for but worth flagging:** resources are now reachable from a small "Need to talk to someone?" panel visible on every screen, including before signing in. Previously they only appeared after completing a check-in — meaning someone in real distress who opened the app would have had to sign up first to see them. Fixed without waiting to be asked, since this is a safety gap, not a style choice.

---

## 2. Not built this session, flagged

- A true 2D drag-based mood pad (like the actual Brackett Mood Meter app) was considered but not built — a continuous drag interaction is hard to make fully keyboard/screen-reader accessible without significant extra work, and the two-question version achieves the same "unlock the words" goal within WCAG AA constraints. Worth revisiting only if the button-based version doesn't feel right in testing.
- Sleep and stress questions are still tap-row buttons, not chat-bubble-integrated the same way as mood — consistent with the rest of the conversational flow already, just noting they weren't changed today since they didn't need to be.

---

## 3. Right now — test the new flow

Refresh and go through a check-in again. Worth specifically checking: does the two-question mood unlock feel natural, does the chat-bubble pacing feel right on a phone screen, and does the end-of-check-in resources moment feel like a natural close rather than a bolt-on.

---

## 4. Beta-blocking vs public-launch-blocking

**Beta-blocking:** crisis detection ✅, fixed response + resources ✅ (now always-reachable, not gated behind sign-in), RLS ✅, Journal Privacy Rule ✅, auth ✅, family creation/join ✅ (tested live). Parent dashboard — next build item.

**Public-launch-blocking:** formal reviewer sign-off, DPIA, ICO registration, Article 22 position, Online Safety Act position, age verification/GDPR-K, pricing/paywall, invite-link system, possibly custom SMTP.

---

## 5. Version history

| Version | Date | Change |
|---|---|---|
| v1–v10 | 10 Aug 2026 | See `Past MS/`. |
| v11 | 10 Aug 2026 | Conversational chat-bubble check-in UX. Mood word picker redesigned to unlock via two questions instead of showing all quadrants. Kooth added to resources (with accurate regional-availability caveat). Resources made reachable pre-sign-in — a safety fix made proactively. |

---

*Build New Habits Ltd · Alongside: Learn · Master Schedule · 10 Aug 2026 v11*
