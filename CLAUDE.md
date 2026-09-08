# Framework Systems — website

Claude Code: read this first. Grok and Claude share these files. Do not re-brief from chat.

## What this repo is

Public marketing site for Framework Systems (Tuscumbia, AL). Static HTML. Live: https://www.frameworksystems.co

Three offers on the homepage:

1. **InvoiceFlag** — `/invoiceflag` — 3PL / parcel invoice auditor
2. **CrewFlag** — `/crewflag` — field-ops QC / drift / access (app is separate)
3. **Plumbing revenue recovery** — `/plumbing` — managed service. Keep the 301s.

## Before you edit a product page

| If the work is… | Read this, then edit |
|---|---|
| InvoiceFlag copy, ads, Reddit, email, SEO, `/invoiceflag` | [docs/invoiceflag.md](docs/invoiceflag.md) |
| CrewFlag copy, pricing, app links, `/crewflag` | [docs/crewflag.md](docs/crewflag.md) |
| Color, type, voice, company story | [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) |

Skills (same rules, load-on-demand):

- `.claude/skills/invoiceflag-launch/SKILL.md`
- `.claude/skills/crewflag/SKILL.md`

## Hard rules

- Do not invent testimonials, dollar recoveries, or origin stories for a product that does not have them.
- InvoiceFlag is not a recovery firm. CrewFlag does not log into Jobber.
- Company story in `BRAND_GUIDELINES.md` (Valley Clean Team) is Framework Systems trust only. Do not paste it onto InvoiceFlag as a 3PL war story.
- Charges on cards: **FRAMEWORK SYSTEMS**.
- Contact: todd@frameworksystems.co
- Do not point the homepage CrewFlag card straight at the app. Pitch and price live on `/crewflag`.

## Do not touch unless asked

- InvoiceFlag Stripe links
- Plumbing 301s / trades operation-map pages
- `site.css` tokens without a design reason
