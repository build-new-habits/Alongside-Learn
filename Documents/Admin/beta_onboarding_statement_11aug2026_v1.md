# Alongside: Learn — Beta Onboarding Statement
## 11 Aug 2026 v1 — DRAFT for Graeme's review

Build New Habits Ltd | What every beta family is told before they get access. Also the artefact the school DSL reviewer and solicitor should be shown, because it is the plainest statement of what the product actually does.

**Two versions below.** Section 2 is for parents. Section 3 is written for the learner and is meant to be read by them, not summarised at them — the ICO's Age Appropriate Design Code expects transparency information a child can actually understand, and a 14-year-old being handed a parent's privacy notice is not that.

**Items marked [PENDING] depend on open decisions and must be resolved before any family sees this.**

---

## 1. The three claims this document has to get right

Everything else is detail. If a family remembers only three things:

1. **Learn will not tell you what your child wrote.** Not ever, not on a flag, not on request.
2. **Learn is not watched by a person.** Nobody at Build New Habits reads check-ins as they come in. It is not a monitoring service and must not be relied on as one.
3. **Your child can choose to tell you they need a chat, with one button.** That is the only route from Learn to you, and they control it.

If any future feature makes one of those three statements untrue, this document changes first and families are told before the feature ships.

---

## 2. For parents

### What Learn asks your child

Once a day: how their energy is, whether the day feels more good or more hard, a word for how they're feeling, how they slept, how stressed they are about their studies, and an optional box for anything on their mind. Then assignments, flashcards and revision planning, which are ordinary study tools.

### What you can see

Their assignments, their flashcards, their revision timetable, and a written summary of how their subject confidence is tracking.

### What you cannot see

Their mood, their energy, their sleep, their stress ratings, and anything they write in the free-text box.

This is not a setting we chose to leave switched off. The database itself refuses to hand those records to a parent account — the restriction is in the data layer, so it holds even if a future version of the app asked for them by mistake. If you want to know how your child is feeling, the intended route is to ask them.

We know some parents will find this uncomfortable. It is deliberate. A teenager who believes their answers are being forwarded gives different answers, and a check-in that gets managed rather than answered honestly is worth nothing to anyone.

### What happens if Learn notices something concerning

If your child selects a word or writes something that suggests they are struggling, Learn responds immediately in the app: it acknowledges what they've said, encourages them to speak to an adult they trust, and shows them named support services — Childline, Shout, Samaritans, PAPYRUS HOPELINE247, and 999 in an emergency. Those services are also on the front of the app at all times, reachable without signing in.

**It does not contact you, and it does not contact us.** No alert is generated. No member of staff sees it. There is no queue and nobody on the end of it.

It then offers your child a button: *would you like me to let one of your parents know you could use a chat?* If they press it, you see a note on your dashboard saying they asked to talk — the date, and nothing else. Not what they wrote, not how they were feeling, not what prompted it. If they don't press it, you are told nothing.

### What Learn is not

It is not a monitoring service, a crisis service, a counselling service, or a substitute for one. It cannot tell whether your child is safe. It does not know if they have stopped using it. **If you are worried about your child, act on that directly — do not wait for Learn to tell you something.**

In an emergency, call 999. For urgent mental health support, contact your GP or NHS 111.

### Your child's data

| | |
|---|---|
| What we store | Their name, date of birth, and their check-in answers, assignments, flashcards and revision entries |
| Where | Supabase, Frankfurt, Germany |
| Who can see it | Your child. You, for the limited items listed above. Graeme Bell, as the operator, has technical access to the database — this is unavoidable for anyone running a service and we would rather say so than imply otherwise |
| Who we sell it to | Nobody. There is no advertising and no third-party analytics |
| How long we keep it | [PENDING — retention period to be set with the solicitor] |
| Getting it back | Ask and we will export everything we hold. Your child can also export their own |
| Deleting it | Ask and we delete it, including the free-text entries. [PENDING — timescale to confirm] |

This is a private beta run by a one-person company. If something goes wrong, you contact Graeme directly.

### Who has reviewed this

| Reviewer | Role | Status |
|---|---|---|
| Graeme Bell | Named safeguarding reviewer, 20+ years relevant training | Ongoing |
| [Name] | Solicitor | [PENDING] |
| [Name] | School Designated Safeguarding Lead | [PENDING] |

**No family is given access before the second and third rows are complete.**

---

## 3. For you — if you're the one using it

Read this bit. It's about what happens to what you type.

**Nobody is reading over your shoulder.** There's no person at Learn who sees your check-ins. Nobody gets a notification when you're having a bad day. It's a program, and it's just you and it.

**Your parents can't see how you're feeling.** They can see your assignments, your flashcards and your revision timetable — the school stuff. They cannot see your mood, your sleep, your stress, or anything you write in the box. That's not us trusting them or not trusting them. It's how the thing is built, and it doesn't have an override.

**If you say something that sounds like you're struggling**, Learn will say something back and show you places you can talk to a real person — Childline, Shout, Samaritans, PAPYRUS. Those are on the front screen all the time too, and you don't have to be signed in to use them.

**It won't tell anyone.** Not your parents, not us. If you want your parents to know, there's a button, and you press it. If you press it they see that you asked to talk — that's all. Not what you wrote. Not what you picked. You'd still get to decide what you actually tell them.

**What it can't do.** It can't tell if you're safe. It can't get you help on its own. If something is really wrong, tell a person — a parent, a teacher, someone at school, or one of the numbers on the front screen. If it's an emergency, call 999. Learn is a place to keep track of how things are going. It isn't a safety net and we're not going to pretend it is.

**Your stuff is yours.** You can download everything you've written, whenever you want, and take it to a counsellor or a doctor or whoever you want to show. You can ask us to delete it and we will.

---

## 4. Open decisions blocking this document

| Ref | Decision | Owner |
|---|---|---|
| Item 7b | Whether free text is scanned at all, or stored privately with an explicit help button instead. Changes Section 2 "what happens if Learn notices" and Section 3 substantially | Graeme |
| — | Retention period and deletion timescale | Graeme + solicitor |
| — | Inactivity nudge — whether a parent is prompted to check in after prolonged non-use, decoupled from any safeguarding flag | Graeme |
| — | Reviewer names and confirmation | Graeme |

---

*Build New Habits Ltd · Alongside: Learn · Beta Onboarding Statement · 11 Aug 2026 v1 — DRAFT*
