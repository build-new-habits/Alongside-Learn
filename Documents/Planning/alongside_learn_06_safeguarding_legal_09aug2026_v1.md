# Alongside: Learn — Safeguarding & Legal
## 09 Aug 2026 v1

Build New Habits Ltd | Source: `alongside_crisis_safeguarding_policy_23jul2026_v7.docx` (applies explicitly across Move, Learn, and future products), `alongside_safeguarding_onepager_23jul2026_v2.docx`, `alongside_learn_doc1_vision_07jun2026_v2.docx` Section 10, `alongside_learn_doc4_coach_logic_07jun2026_v2.docx` free-text vocabulary section. **Status: the underlying policy is DRAFT FOR REVIEW, not yet signed off. Do not treat anything in this file as legally cleared for launch.**

---

## 1. This is a shared family policy — Learn is explicitly in scope

The Crisis & Safeguarding Policy (v7) applies identically across Move, Learn, and future products. The flagged words, response message, and destination contacts vary by **user age band**, not by product. This means Learn does not need its own separate detection mechanism — it inherits the same one, with Learn's own multi-user family structure adding extra complexity the policy does not yet fully resolve (see Section 6).

---

## 2. Detection mechanism (as it applies to Learn)

The sole trigger is selection of a flagged word from the mood-meter feeling-word picker, or — Learn-specific — a string match against the free-text signal vocabulary described in file 04, Section 3. Both are deterministic and auditable: no scoring, no weighting, no free-text sentiment AI, no machine-learning risk detection.

**Quadrant system:** an adaptation of the Yale Mood Meter (Dr Marc Brackett, Yale Center for Emotional Intelligence), part of RULER, a CASEL-recognised evidence-based approach to emotional vocabulary.

### Adult word set (18+, or age band not set to a teen band)

| Quadrant | Full word set (representative) | Flagged |
|---|---|---|
| Yellow | excited, joyful, motivated, inspired, happy, enthusiastic, optimistic, elated | None |
| Green | calm, relaxed, content, peaceful, serene, balanced, at ease, satisfied | None |
| Red | angry, anxious, frustrated, fearful, stressed, panicked, irritated, tense, overwhelmed, nervous, trapped | trapped — direct. overwhelmed, panicked — combination only |
| Blue | sad, lonely, tired, discouraged, disappointed, bored, gloomy, dejected, despair, hopeless, worthless, empty, numb, drained, trapped | hopeless, worthless, despair, empty — direct. trapped — combination only |

### Teen word set (13–17, both Learn and Move)

| Quadrant | Simpler word set | Flagged |
|---|---|---|
| Yellow | happy, excited, proud, good | None |
| Green | calm, okay, relaxed, chill | None |
| Red | angry, stressed, worried, scared, trapped | trapped — direct. overwhelmed — combination only |
| Blue | sad, lonely, tired, fed up, empty, hopeless, worthless, numb, trapped | hopeless, worthless, empty, numb — direct. trapped — combination only |

**Combination rule:** overwhelmed/panicked (Red) and trapped-in-Blue require a second flagged signal in the same check-in or within the existing recent-history window before this policy's response triggers. This is a lookup against existing flags, not a scoring system.

**Learn-specific application:** because most Learn learners fall in the 13–17 age band, the teen word set is the primary one that applies. Confirm age-band routing correctly identifies each learner (not the parent) as the subject of this detection.

---

## 3. Response flow

1. User selects a flagged word (or free-text vocabulary match, Learn only) during check-in.
2. The coach's response for that check-in is replaced by a fixed, pre-written message in the version appropriate to the user's age band.
3. No monitored or escalated human response — never an Alongside staff member contacting the user directly in response to an individual disclosure.
4. Safety resources always accessible in-app (not just push-notified) — see file 04 Section 5.

**Explicitly out of scope for this system:** free-text analysis of any journal or private reflection content (Journal Privacy Rule, below), graded clinical severity classification, ML-based risk detection, human staff intervention on individual disclosures.

---

## 4. Journal Privacy Rule — standing rule, non-negotiable

Signal detection applies **only** to: the feeling-word/mood-meter picker, and (Learn-specific) the dedicated Athena-tier free-text safeguarding field. It never applies to any general journal, reflection, or private-space content. If Learn ever adds a journal-style feature, this rule extends to it automatically and must never be changed without an explicit, documented decision by Graeme.

---

## 5. Learn-specific safeguarding levels

Per file 04: Level 1 detection operates on the basic (free-tier) check-in. Levels 2 and 3 require the stress question and free-text field, currently gated to Athena tier only. The source material explicitly flags this as something safeguarding review needs to address directly — full safeguarding capability being tier-gated is a real open question, not a settled design choice. **Do not treat the current tier-gating of safeguarding levels as final.**

---

## 6. Seven open items requiring outside confirmation before sign-off

From the safeguarding one-pager reviewing the v7 policy:

1. **Word list verification** — the flagged-word list is a proposal based on published sources (Yale Mood Meter, Mind); not yet checked against the actual live word list in either product's check-in screen.
2. **Teen message review** — the 13–17 response message needs review against PAPYRUS's full published guidance, ideally by someone with a named youth-safeguarding credential.
3. **Article 22 (UK GDPR) position** — does showing a fixed support message in response to word selections count as "solely automated decision-making with legal or similarly significant effects"?
4. **Parental notification** — if a 13–17 year-old selects a flagged word, should a parent or guardian be told? Not currently resolved. **This is a Learn-specific decision that matters more for Learn than Move**, given Learn's parent-visible account structure — resolving it for Learn cannot simply inherit Move's answer, since Move currently has no parent-facing account layer at all.
5. **DPIA requirement** — does this feature need a formal Data Protection Impact Assessment, and if so, what should it cover?
6. **Online Safety Act scope** — does the Act's multi-user content-sharing framework bear on products with shared/family visibility? **Named specifically as relevant to Learn's parent-and-learner account structure** in the source document.
7. **Fallback-pathway design** — Move's minimum age is moving to 18+ with the teen pathway retained as a fallback. Not directly applicable to Learn (Learn is built for minors as a primary audience, not as a fallback case) — but the underlying question of how age-band detection interacts with a self-declared or parent-declared date of birth is directly relevant and needs its own answer for Learn.

**Important caveat from the source material:** a general solicitor's review of the policy may not, on its own, satisfy item 2 — a named, PAPYRUS-affiliated youth-safeguarding reviewer is a specific credential a general solicitor may not hold.

---

## 7. Three formal safeguarding reviewer roles — status: unfilled

Across the whole Alongside product family, not Learn-specific, but Learn cannot launch without these being filled, given it serves minors as its primary user group:

- Youth-safeguarding reviewer (PAPYRUS-affiliated or equivalent)
- Formal legal/sign-off reviewer
- Third reviewer (role not yet defined)

**This is currently the single most urgent non-build item across the entire Alongside product family**, per Move's own master schedule. It blocks Learn at least as much as it blocks Move — arguably more, given Learn's under-18 primary audience.

---

## 8. Additional Learn-specific legal requirements (from file 03, Section 8)

| Item | Notes |
|---|---|
| ICO registration for Learn | Separate registration from Move's — Learn processes data about minors specifically |
| Age verification and GDPR-K compliance | Legal review required for under-16 data handling — GDPR-K (the UK's approach to children's data, informed by the Age Appropriate Design Code) applies directly to Learn in a way it currently does not to Move |
| Supabase RLS policy audit | See file 05, Section 1 — family-scoped access model has not been reviewed for correct hard-wall enforcement |
| Crisis resource verification | All helpline numbers and URLs must be re-verified as current and correct before Learn launches, independent of Move's own verification |

---

## 9. What this file does not attempt

This file compiles what already exists. It does not attempt to resolve any of the seven open items above, fill the three reviewer roles, or draft Learn's own DPIA. Those are real pieces of work requiring a named safeguarding professional and, likely, a solicitor — not something to be resolved inside a Claude build session. See file 08.

---

*Build New Habits Ltd · Alongside: Learn · Safeguarding & Legal · 09 Aug 2026 v1*
