# InvoiceFlag — source of truth

Status: live. Proof: none. Do not treat the page as final until the proof slot is filled.

Handed off 2026-09-08 from Grok research. Claude Code owns copy and campaign assets in this repo. Grok owns Stripe, live-URL checks, and product calls.

---

## What it is

A $19 line-reader for 3PL / parcel invoices. Operator uploads a PDF, CSV, or spreadsheet. They get flags and a dispute email they send. No Shopify login. No 3PL portal. No carrier API.

It is **not** a recovery firm. It does not collect, negotiate, or take a cut of recovered dollars.

Live: https://www.frameworksystems.co/invoiceflag

---

## Goal (this is the only launch goal)

Get **10 free audits in 30 days**. Convert **3** to $19 single or $49 monthly. Fill the proof slot from the first real flag before running Apollo or treating `/invoiceflag` as final.

Do not optimize for “brand awareness” or SEO volume until those three numbers move.

---

## Audience

Owner-operators of DTC / Shopify brands shipping **a few hundred to a few thousand orders a month** through:

- a 3PL (ShipBob, ShipMonk, regional), or
- a parcel account (UPS / FedEx billed on a PDF)

Too small for managed audit firms. Skeptical of contingency shops. They **pay the invoice on the total**.

Out of scope: importers / distributors that recovery firms hunt; anyone who wants us inside Shopify or ShipBob; anyone without a bill to upload.

---

## Copy: two doors, one page

Awareness is mixed. Do not write everything as “solution-aware.”

| Door | Who | Line |
|---|---|---|
| **Primary (keep as H1)** | Problem-aware. Reddit, cold email, most Shopify owners. They know the bill is high. They have not shopped an auditor. | **Find the fees your 3PL didn’t expect you to check.** |
| **Supporting section, not the spine** | Solution-aware. People who already got a “you’re too small” from an audit firm, or who search “3PL invoice audit.” | Too small for the recovery firms. Too expensive to ignore. |

Live H1 and lead (do not replace):

> Find the fees your 3PL didn’t expect you to check.
>
> Upload last month’s invoice. Get a line-by-line audit and an email you can send as-is. First audit is free. No software to connect.

“The audit the big auditors won’t take” is a **subhead / section**, not the campaign headline.

---

## Competitor fence

| Them | InvoiceFlag |
|---|---|
| billsharp, 3plinvoiceaudit.com | Us |
| Contingency / % of recovered | Flat $19 / $49. First one free. |
| “We collect. 2× ROI. Millions recovered.” | “Questions to ask **before you pay**, not a lawsuit.” |
| NDA, 17-day turnaround, $1M+ 3PL spend | One file. Same day if Todd is at a desk. |
| Log into the 3PL / warehouse | File stays the file. |

If copy slides into recovered-dollar claims, 2× ROI, or “we collect,” it is the wrong product.

---

## Pricing (live, do not invent new SKUs)

| | |
|---|---|
| First audit | Free. mailto:todd@frameworksystems.co?subject=InvoiceFlag%20first%20audit |
| Single | $19 — https://buy.stripe.com/bJe00cdmm5SG9dQgNfdQQ08 |
| Monthly | $49 — https://buy.stripe.com/cNicMY3LM80O0Hk68BdQQ09 |
| Statement | **FRAMEWORK SYSTEMS** |

Stripe products already exist. Do not create duplicates.

---

## Origin story — do not invent one

InvoiceFlag is a new product. It has **no** 3PL war story.

`BRAND_GUIDELINES.md` founding story (Valley Clean Team, $5k, five markets) is **Framework Systems trust only**. Do not write “we found these leaks on our ShipBob bill” unless Todd supplies a real invoice. He has not.

---

## Proof slot (empty — next ship)

The live page currently has **no** marked proof slot. Add one before treating the page as final.

Required fill (from a real audit, anonymized):

- 3PL type (e.g. ShipBob / regional) — no client name
- Period (month)
- 3–6 flagged line types (duplicate, uncontracted fee, DIM+DAS, pick-count miss, peak/residential)
- Dollar delta on those lines, if real
- One sentence: “operator sent the email / did not”

Until that exists: no testimonials, no “typical 8–15%,” no fake scan UI with invented numbers. Competitors already do that. We do not.

---

## What it flags (product, not marketing invention)

- Duplicate tracking / accessorials
- Fees never on the contract
- DIM and DAS stacked on the same shipment
- Peak / residential / extended-area surprises
- Pick or order counts that don’t match the backup

---

## Channels — this order, not all at once

1. `/invoiceflag` (live)
2. Three operators Todd can text this week
3. Reddit as Todd (r/ecommerce, r/shopify) — problem posts, not a launch thread, not a bot
4. Apollo **only after** one anonymized flag exists (`fs-internal-automations` has Apollo scripts — do not rebuild them here)
5. SEO for “3PL invoice audit small business” last. Correct keyword. Slow. Does not launch the product.

Do not log a Grok bot or any agent into Reddit / Facebook / Slack.

---

## Fit / bad fit (already on the page — keep)

**Fit:** the bill already exists. PDF or CSV. Questions before pay, not a lawsuit.

**Bad fit:** wants a ShipBob / Shopify login. Wants us to negotiate with the 3PL. Has no bill.

---

## What Claude must not do

- Rewrite the H1 around auditors
- Add fake case studies or recovery $
- Point InvoiceFlag at plumbing copy or CrewFlag SKUs
- Change Stripe URLs
- Run Apollo this week
- Claim token billing or GoHighLevel marketplace (both rejected)

---

## Fulfillment

Buyer emails the file to todd@frameworksystems.co with subject `InvoiceFlag first audit` (free) or `InvoiceFlag audit` (paid). Todd runs it and replies with flags + the email they can send. Until a self-serve app URL exists, Todd is the product.
