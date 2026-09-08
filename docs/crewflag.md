# CrewFlag — source of truth

Status: live marketing page + live app. Proof: none on the page. First job is free via email.

Handed off 2026-09-08. Claude Code owns `/crewflag` copy in this repo. App source is a **separate** private repo.

---

## What it is

Three standalone tools for cleaning and property crews. One product, three doors. Use the one that hurts. Skip the rest.

They sit **next to** Jobber, Housecall Pro, ServiceTitan, Google Calendar, SMS. They do **not** replace the schedule. No FSM login.

1. **Post-job photo QC** — required shots vs. the checklist. Flags missed rooms, wet floors, supplies left out.
2. **Quality-drift watcher** — same recurring client, ratings or photo scores slipping over ~6 weeks. Alert before they cancel.
3. **Access-failure recovery** — no key, dog loose, tenant not home. Playbook: text, wait, reschedule, log billable trip, notify office.

Name stays **CrewFlag**. Do not rename.

---

## URLs

| | |
|---|---|
| Marketing (pitch + price) | https://www.frameworksystems.co/crewflag |
| App | https://crewflag.vercel.app |
| QC | https://crewflag.vercel.app/qc |
| Drift | https://crewflag.vercel.app/drift |
| Access | https://crewflag.vercel.app/access |
| App repo (private) | https://github.com/rtfreder1976-yhwh/CrewFlag |
| Vercel project | `crewflag` on team Framework Systems |

Homepage CrewFlag card must link to **`/crewflag`**, not straight to the app. Pitch and price live on the marketing page. (Restored 2026-09-08. Do not reverse.)

Hero primary on `/crewflag` may say Open CrewFlag → app. That is fine.

---

## Audience

Residential cleaning, move-outs, Airbnb turns, property managers. Shops that already have a schedule. Valley Clean Team is the first dogfood book — run three walk-outs through QC before treating the page as proven.

---

## Pricing (live Stripe, do not duplicate SKUs)

First job on each tool is free via todd@frameworksystems.co (subject `CrewFlag`). Then:

| SKU | One-time | Monthly |
|---|---|---|
| Photo QC | [$19](https://buy.stripe.com/3cI7sEgyych41Lo54xdQQ0e) | [$29/mo](https://buy.stripe.com/aFacMYfuubd04XAcwZdQQ0a) |
| Quality Drift | [$19](https://buy.stripe.com/dRmfZa9661Cqeya8gJdQQ0f) | [$29/mo](https://buy.stripe.com/5kQ4gsciiepc89M54xdQQ0b) |
| Access Recovery | [$19](https://buy.stripe.com/fZu6oAcii0ym2PsbsVdQQ0g) | [$29/mo](https://buy.stripe.com/fZu9AM1DE4OCblYbsVdQQ0c) |
| Pack (all three) | [$39](https://buy.stripe.com/00wdR2822gxkeya7cFdQQ0h) | [$49/mo](https://buy.stripe.com/cNi4gs6XYch489MfJbdQQ0d) |

Statement: **FRAMEWORK SYSTEMS**.

Pack math (for copy, not a claim of savings on the card): $39 once vs $57 à la carte; $49/mo vs $87.

Some shops will only buy QC. Do not force the pack in the H1.

---

## App note (photo QC)

Photo QC needs `XAI_API_KEY` on the Vercel `crewflag` project (server env, production). Drift and Access run without it. If vision fails in prod, the key is missing — do not rewrite the product around it.

---

## Copy rules

- H1 (live): **Catch the miss before the client does.**
- No Jobber / Housecall Pro / ServiceTitan login. Ever.
- Do not invent ratings, cancellation saves, or before/after photos.
- Do not sell CrewFlag as a field-service replacement.
- Company story in `BRAND_GUIDELINES.md` may back Framework Systems. Do not invent a CrewFlag origin beyond “built next to a real cleaning book.”

---

## What Claude must not do

- Point the homepage card at crewflag.vercel.app (skipping price)
- Create new Stripe products
- Merge CrewFlag into plumbing 301 pages
- Add token billing
- Build a login-and-post marketing bot
