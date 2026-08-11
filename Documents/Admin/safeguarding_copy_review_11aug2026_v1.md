# Alongside: Learn — Safeguarding Response Copy: Review and Sign-Off Pack
## 11 Aug 2026 v1

Build New Habits Ltd | Prepared for review by Graeme Bell (named safeguarding reviewer), and for onward review by the instructed solicitor and school DSL reviewer.

---

## 1. What this document is for

Every safeguarding-triggered message Learn can show a learner is reproduced here verbatim, alongside a plain-English account of what causes it to appear. Nothing in Section 3 has been reviewed against PAPYRUS guidance or by anyone with a clinical or safeguarding qualification. It is a functional first-pass draft written during the build.

**Learn must not be opened to any beta family until Section 4 is signed off.**

This pack is written to be readable by someone who has never seen the code. It is the artefact the solicitor and DSL reviewers should be sent.

---

## 2. How detection works, in plain English

Learn does **not** use AI to interpret what a learner writes. It uses a fixed, written-down list of words and phrases, and checks whether any of them appear. The list is in the repository, versioned, and can be read in full by any reviewer. This was a deliberate choice: a reviewer can audit exactly what the app will and won't react to, which is not possible with a sentiment model.

Three signals feed the assessment:

1. **The mood word the learner picks.** The check-in asks about energy, then whether the day feels "more good or more hard". Those two answers open one quadrant of the Mood Meter (Marc Brackett / Yale RULER), and the learner picks one word from four to nine options. Some words carry a flag.
2. **Free text.** One optional box, maximum 200 characters, asking "Anything specific on your mind today?" This is scanned against four categories of phrase: hopelessness, withdrawal, self-critical spiralling, and crisis signals.
3. **A stress rating**, 1 to 5.

These combine into one of three levels:

| Level | Meaning | What the learner sees |
|---|---|---|
| 1 | Nothing flagged | Normal warm acknowledgement, then the standing support resources |
| 2 | Concern signal | Level 2 message below, plus two resources |
| 3 | Crisis signal | Level 3 message below, plus four resources |

**Important limitation for reviewers:** free text and stress are only collected on the Athena tier. All beta families default to Athena, so in practice all three signals are active during beta.

---

## 3. Exactly what a learner sees

### 3.1 Level 3 — crisis signal

> Thank you for telling me. What you're feeling matters, and you don't have to carry it alone. Please reach out to one of these right now, or as soon as you can:

Followed by:

- **Childline** — Call 0800 1111 — free, 24/7, confidential
- **Shout** — Text 85258 — free, 24/7 text support
- **Papyrus HOPELINEUK** — 0800 068 4141 — for under-35s having thoughts of suicide
- **Emergency** — If you are in immediate danger, call 999

### 3.2 Level 2 — concern signal

> That sounds really hard. I want you to know that struggling doesn't mean failing — you showed up and told me, and that matters. If it would help to talk to someone, these are always here:

Followed by:

- **Childline** — Call 0800 1111 or chat online — free, 24/7
- **Shout** — Text 85258 — free, 24/7 text support

### 3.3 Always-on resources

Shown at the end of **every** check-in regardless of level, and also on the front of the app before anyone signs in. Introduced with:

> Before you go — these are always here if you ever want to talk to someone:

- **Childline** — 0800 1111 · childline.org.uk
- **Shout** — Text 85258 · giveusashout.org
- **Samaritans** — 116 123 · samaritans.org
- **Kooth** — kooth.com — free online counselling and chat with a real practitioner. Availability depends on where you live (locally commissioned, not everywhere in the UK yet) — check the website.

---

## 4. Decisions required

Nine items. Each needs a yes, no, or amendment from Graeme. Items 1, 3 and 4 also need the DSL reviewer's view; item 3 needs the solicitor's.

---

### Item 1 — PAPYRUS service name and hours are out of date

**Finding.** The copy names "Papyrus HOPELINEUK". PAPYRUS renamed the service to **HOPELINE247** and it now operates 24 hours a day, every day of the year. The old HOPELINEUK ran 10am–10pm on weekdays and 2pm–10pm at weekends. The number, 0800 068 4141, is unchanged and correct. A text service on 88247 also exists and is not currently listed.

The practical consequence is that a teenager reading Learn's crisis screen at 2am is being given a service name that suggests it may be closed. It is open.

**Recommendation.** Change to "Papyrus HOPELINE247 — 0800 068 4141 or text 88247 — free, 24/7, for anyone 35 and under having thoughts of suicide". "Under-35s" also becomes "35 and under", which is how PAPYRUS describes its own eligibility.

**This is the one change I would make immediately regardless of the wider review, because it is a factual correction rather than a copy judgement — but it is your copy and your sign-off, so it stays unmade until you say so.**

---

### Item 2 — Phone numbers are not tappable

**Finding.** All numbers render as plain text. On a phone, a distressed learner has to memorise or copy a number and switch apps to dial it.

**Recommendation.** Render every number as a `tel:` link and every website as a link, with the visible text unchanged. This also improves conformance with WCAG 2.2 AA. No wording changes.

---

### Item 3 — A level 3 crisis flag alerts no human being

**Finding, and the most important item in this pack.** When a learner triggers level 3, the app shows the crisis message, stores a flag against their profile, and does nothing further. No parent is notified. No coach is notified. Nobody at Build New Habits sees it. The stored flag is not displayed on the parent dashboard or anywhere else — it is written and never read.

Signpost-only may be the correct model. It is what many self-help tools do, it respects the learner's privacy, and it is consistent with the existing rule that no parent-facing message about a learner may be sent without the learner's consent. But at present it is not a decision — it is the unstated consequence of code that was never written.

**Decisions needed:**

- **a)** Is signpost-only the intended model for private beta? Yes or no.
- **b)** If yes, families must be told this plainly at onboarding: *Learn will show your child support resources if it detects distress. It will not alert you, and it is not monitored by a person.* Agreed?
- **c)** If no, what is the escalation route, who receives it, and how is the learner's consent obtained first?
- **d)** Either way, what happens to a learner who is flagged at level 3 and then stops using the app?

**Recommendation.** Signpost-only for beta, stated explicitly and prominently at onboarding, with the DSL reviewer's confirmation that this is defensible for a 13–17 cohort. Anything more is a bigger change than 11 build days allows, and a half-built escalation route is worse than a clearly declared absence of one.

---

### Item 4 — The crisis screen is followed by a routine sign-off

**Finding.** After the level 3 message and its four crisis resources, the check-in immediately appends: *"Before you go — these are always here if you ever want to talk to someone:"* followed by the four standing resources. A learner who has just disclosed a crisis signal sees eight resource entries in two lists, with a light "before you go" between them, three of the four names repeated.

The standing-resources-every-time rule is deliberate and right. It just was not written with the crisis path in mind.

**Recommendation.** Suppress the "before you go" block at level 3 only. The crisis resources already cover it, and the tonal shift immediately after a disclosure reads as the app moving on.

---

### Item 5 — "Trapped" is flagged inconsistently, and possibly backwards

**Finding.** "Trapped" appears in two Mood Meter quadrants. In red (high energy, feeling hard) it is a **direct** flag — it triggers a level 2 response on its own. In blue (low energy, feeling hard) it is a **combination** flag — it triggers nothing unless the learner also rates stress at 5.

So a learner who says they feel trapped on a high-energy day gets a supportive response. The same learner saying they feel trapped on a low-energy day usually gets nothing.

I have no clinical basis for judging which way round this should be, which is precisely why it needs you rather than me.

**Recommendation.** Reviewer decides. My non-clinical instinct is that these are the wrong way round, but that is worth exactly what it sounds like.

---

### Item 6 — Teen and adult word sets diverge without a stated rationale

**Finding.** "Numb" is a direct flag in the teen set and carries no flag at all in the adult set. The teen set also omits "despair" and "panicked", both of which appear in the adult set. Some divergence between age bands is likely appropriate; none of it is currently documented as intentional.

**Recommendation.** Confirm each divergence is deliberate, or align them. Record the reasoning in the file so a future reviewer can see it was a choice.

---

### Item 7 — The crisis vocabulary list has gaps and false-positive risks

**Finding.** Two separate problems.

*Gaps.* The crisis list covers several phrasings but omits some of the most direct and common ways a young person states intent. Deciding what belongs on that list is a clinical judgement and I have deliberately not drafted additions.

*False positives.* Matching is plain substring matching, so "disappear" matches "disappeared" and "disappearing", and "end it" matches "let's end it there". A learner writing *"I just want this week to disappear"* currently receives the full crisis screen. Level 3 is the strongest response the app has, and firing it on an idiom risks teaching learners the app overreacts — after which they stop writing anything real in the box, which costs far more than it saves.

**Recommendation.** Reviewer expands the crisis list. Separately, I tighten matching so that phrases match on word boundaries rather than as bare substrings. The second is a technical fix and doesn't need clinical input; the first does.

---

### Item 8 — What is documented and what is implemented have diverged

**Finding.** The written level-mapping in `js/safeguarding.js` states that a stress rating of 5 combined with any free text produces level 2. The code does not do this. A helper function written for that rule exists but is never called.

In practice: a learner who rates stress "Overwhelming" and writes something that doesn't match any listed phrase is assessed as level 1 and receives a normal acknowledgement.

This matters beyond the bug. A reviewer reading the comments would sign off behaviour the app does not have.

**Recommendation.** Decide which is correct — the documented rule or the implemented one — and make the other match. My recommendation is that the documented rule is right and the code should be corrected, but note this widens the level 2 net, so it belongs in your review rather than in a quiet fix.

---

### Item 9 — Level 2 wording where the trigger was self-criticism

**Finding.** Level 2 fires on hopelessness, withdrawal, or self-critical phrases. The response opens *"That sounds really hard. I want you to know that struggling doesn't mean failing…"*. Where the trigger was self-critical language, the reply introduces "failing" — a word the learner may not have used. The intent is clearly to counter the thought; the risk is that it names it.

The rest of the message — showing up, telling someone, that mattering — sits well against safe-messaging principles and I would not change it.

**Recommendation.** Reviewer's call on whether "struggling doesn't mean failing" stays. A single message serving three different trigger categories may be the right simplicity for beta, or may warrant one variant.

---

## 5. What is already right

Recorded so reviewers can see what does not need changing:

- No method detail appears anywhere in learner-facing copy, in line with PAPYRUS media guidance.
- "Committed suicide" appears nowhere. PAPYRUS advises against it because suicide was decriminalised by the Suicide Act 1961 and the phrasing implies criminality.
- Crisis resources are named specifically, with numbers and access methods, not vaguely gestured at.
- Support resources are reachable before sign-in, so someone opening the app in distress does not have to create an account first.
- Resources appear at the end of every check-in, not only when something is flagged, so they are not a signal that the app has decided something is wrong.
- Detection is auditable and versioned rather than a model output.
- Childline (0800 1111), Shout (85258) and Samaritans (116 123) are all correct as printed.
- The Kooth entry correctly warns that availability is locally commissioned and not UK-wide.

---

## 6. Sign-off

No beta family is given access until this section is complete.

| Item | Decision | Signed | Date |
|---|---|---|---|
| 1 — PAPYRUS name and hours | | | |
| 2 — Tappable numbers | | | |
| 3 — Escalation model | | | |
| 4 — Crisis screen sign-off | | | |
| 5 — "Trapped" flags | | | |
| 6 — Teen/adult divergence | | | |
| 7 — Crisis vocabulary | | | |
| 8 — Documented vs implemented | | | |
| 9 — Level 2 wording | | | |

**Named safeguarding reviewer:** Graeme Bell — signature ......................... date .................

**Solicitor reviewer:** ......................... — signature ......................... date .................

**School DSL reviewer:** ......................... — signature ......................... date .................

---

*Build New Habits Ltd · Alongside: Learn · Safeguarding Copy Review · 11 Aug 2026 v1*
