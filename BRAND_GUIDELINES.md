# Framework Systems — Brand Guidelines

> **Version 1.1** · June 2026
> *Internal reference for all marketing, design, and communications.*
> *Reconciled against the live `site.css` — production values are authoritative.*

---

## 1. Brand Identity

### Brand Name
**Framework Systems**

### Wordmark
The logo is a typographic wordmark: **Framework** followed by an accent-colored period (**.**).

- Rendered in **Playfair Display** (serif), 700 weight
- The period (`.`) is always colored in the brand accent (#C4522A)
- No icon, glyph, or monogram — the wordmark IS the logo

### Tagline
*"We build the systems that run your business."*

### Brand Descriptors
Use these identifiers consistently across all materials:

| Descriptor | Usage |
|---|---|
| **Veteran-Owned** | Always include — foundational to identity |
| **Faith-Driven** | Always include — shapes how we work |
| **Built for Service Businesses** | Primary market positioning |
| **Southeast USA** | Geographic scope |
| **Proven in the Field** | Credibility anchor |

### Founding Story (Elevator Version)
> Todd & Christen Frederickson started The Valley Clean Team in November 2022 with less than $5,000 — no industry experience, a broken leg, a surprise layoff, and a newborn. They built every system they needed to scale to five markets and 200%+ revenue growth. Framework Systems exists because those systems worked, and every service business owner they talked to said the same thing: *"Can you build that for me?"*

---

## 2. Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Role |
|---|---|---|---|
| **Navy** | `#0D1B2A` | `--navy` | Primary background, authority, trust |
| **Navy 2** | `#132236` | `--navy-2` | Secondary/alternate dark background |
| **Accent (Burnt Sienna)** | `#C4522A` | `--accent` | Primary action color, CTAs, emphasis |
| **Gold** | `#C9A84C` | `--gold` | Secondary accent, premium feel, labels |

### Neutral Colors

| Name | Hex | CSS Variable | Role |
|---|---|---|---|
| **Cream** | `#F4F1EB` | `--cream` | Default page / light section background |
| **Cream 2** | `#EBE6DC` | `--cream-2` | Alternate light background |
| **White** | `#FFFFFF` | `--white` | Text on dark, card backgrounds |
| **Text** | `#1F2732` | `--text` | Primary body text on light |
| **Body** | `#4F5A67` | `--body` | Secondary body text on light |
| **Muted** | `#758091` | `--muted` | Tertiary text, captions, table labels |

### Functional Colors

| Name | Value | CSS Variable | Role |
|---|---|---|---|
| **Accent Dark** | `#9D3B1A` | `--accent-dark` | Darkened accent for hover states |
| **Border (light)** | `rgba(13,27,42,0.12)` | `--border` | Card / table separators on light |
| **Shadow** | `0 24px 60px rgba(13,27,42,0.08)` | `--shadow` | Card elevation |
| **Border (dark)** | `rgba(255,255,255,0.08)` | — | Subtle separators on dark backgrounds |
| **Subdued Text (dark)** | `rgba(255,255,255,0.55–0.75)` | — | Secondary text on dark backgrounds |

### Color Usage Rules

> [!IMPORTANT]
> - **Navy is the dominant color.** It should cover 60–70% of any layout.
> - **Accent (#C4522A) is reserved for action.** Buttons, links, emphasis — never decorative fills.
> - **Gold (#C9A84C) is reserved for premium or faith-related elements.** Section labels, quotes, scripture references.
> - **Never use bright/saturated primary colors** (pure red, blue, green). The palette is intentionally muted and warm.
> - **Cream/Light backgrounds** are used to create visual breathing room between dark sections — never stack two dark sections without relief.

### Color Relationships

```
Dark Backgrounds:   Navy (#0D1B2A)  ←→  Navy 2 (#132236)
Light Backgrounds:  Cream (#F4F1EB) ←→  Cream 2 (#EBE6DC)
Accent Pair:        Burnt Sienna (#C4522A)  +  Gold (#C9A84C)
```

---

## 3. Typography

### Type System

| Role | Family | Weight | Style |
|---|---|---|---|
| **Headlines / Display** | Playfair Display | 700 (Bold), 900 (Black) | Normal, Italic |
| **Body / UI** | DM Sans | 300, 400, 500, 600 | Normal |
| **Labels / Mono** | DM Mono | 400, 500 | Normal |

### Font Files (Self-Hosted)

All fonts are self-hosted as `.woff2` in the `/fonts/` directory:

```
/fonts/playfair-display-latin.woff2
/fonts/playfair-display-italic-latin.woff2
/fonts/dm-sans-latin.woff2
/fonts/dm-mono-400.woff2
/fonts/dm-mono-500.woff2
```

> [!NOTE]
> All fonts use `font-display: swap` to prevent layout shift. Playfair Display and DM Sans are preloaded via `<link rel="preload">`.

### Typography Scale

| Element | Family | Size | Weight | Tracking | Notes |
|---|---|---|---|---|---|
| **Hero Headline** | Playfair Display | `clamp(2.4rem, 4.5vw, 4rem)` | 900 | -0.02em | Line height: 1.05 |
| **Page Headline** | Playfair Display | `clamp(2.8rem, 5vw, 4.2rem)` | 900 | -0.02em | Line height: 1.08 |
| **Section Headline** | Playfair Display | `clamp(1.9rem, 3.5vw, 2.6rem)` | 700 | — | Line height: 1.15 |
| **Card Title** | Playfair Display | `1.3–1.5rem` | 700 | — | Line height: 1.2–1.25 |
| **Body Text** | DM Sans | `1–1.15rem` | 300–400 | — | Line height: 1.75–1.85 |
| **Button Text** | DM Sans | `0.95rem` | 700 | 0.02em | — |
| **Section Label** | DM Mono | `0.72rem` | 400 | 0.18em | Uppercase |
| **Tag / Caption** | DM Mono | `0.65–0.68rem` | 400 | 0.1–0.14em | Uppercase |

### Typography Rules

> [!WARNING]
> - **Never use system fonts** (Arial, Helvetica, Times) in any Framework Systems material.
> - **Playfair Display is for headlines only.** Never use it for body copy or UI elements.
> - **DM Mono is for labels, tags, and structural text only.** Never use it for paragraphs.
> - **All DM Mono text is UPPERCASE** with wide letter-spacing (0.1em+).

---

## 4. Logo Usage

### Primary Mark

```
Framework.
```

- **Typeface:** Playfair Display, 700 weight
- **Period color:** `#C4522A` (accent)
- **Text color:** `#FFFFFF` on dark backgrounds
- **Font size:** `1.35rem` (nav), `1.1rem` (footer)
- **Letter-spacing:** `0.02em`

### Clear Space
Maintain a minimum clear space equal to the height of the period on all sides.

### Usage Rules

> [!CAUTION]
> **Do NOT:**
> - Add a tagline directly attached to the wordmark
> - Rotate, stretch, or distort the wordmark
> - Change the period color to anything other than `#C4522A`
> - Place on busy backgrounds without sufficient contrast
> - Add drop shadows, outlines, or gradients to the wordmark
> - Use a different typeface to recreate the wordmark

### Background Usage

| Background | Text Color | Period Color |
|---|---|---|
| Navy / Dark | `#FFFFFF` | `#C4522A` |
| Cream / Light | `#0D1B2A` | `#C4522A` |
| White | `#0D1B2A` | `#C4522A` |
| Photography | White with text-shadow or overlay | `#C4522A` |

---

## 5. Voice & Tone

### Brand Voice

Framework Systems speaks like **a competent operator who's been where you are** — not a consultant, not an agency, not a salesperson. The voice is:

| Attribute | What it means | What it's NOT |
|---|---|---|
| **Direct** | Say what needs to be said. No filler. | Not rude or abrasive |
| **Earned** | Every claim backed by real results | Not boastful or bragging |
| **Warm** | Genuine care for the person reading | Not corporate or sterile |
| **Plain-Spoken** | No jargon. No buzzwords. | Not dumbed-down |
| **Honest** | Acknowledge tradeoffs and limitations | Not vague or evasive |

### Tone Guidelines

**Headlines:** Confident, declarative, slightly editorial.
> ✅ "You don't have a marketing problem. You have a systems problem."
> ❌ "Unlock your business potential with our innovative solutions."

**Body Copy:** Conversational, specific, second-person ("you").
> ✅ "Phone rings. You're on a job. Voicemail picks up. They hang up and call the next company."
> ❌ "Our clients often experience challenges with missed call management."

**CTAs:** Clear benefit, no pressure.
> ✅ "Get Your Free Operations Map"
> ❌ "Schedule a Demo Now!"

**Section Labels (DM Mono):** Short, conversational, lowercase feel.
> ✅ "Sound familiar?" · "What we build" · "How it works"
> ❌ "OUR SERVICES" · "ABOUT US" · "CONTACT"

### Words We Use

| Use | Instead of |
|---|---|
| Framework | Platform / Solution |
| Build | Deploy / Implement |
| Operations map | Audit / Assessment |
| Service business | SMB / Enterprise |
| System | Tool / Software |
| Honest work | Best-in-class |
| Runs without you | Scalable / Leveraged |

### Words We Avoid
`synergy` · `leverage` · `disrupt` · `innovative` · `cutting-edge` · `world-class` · `utilize` · `empower` · `unlock` · `revolutionize` · `seamless` · `robust` · `holistic` · `game-changer`

---

## 6. Visual Design Patterns

### Button Styles

**Primary Button (CTA)**
```css
background: var(--accent);          /* #C4522A */
color: var(--white);
font-family: 'DM Sans', sans-serif;
font-weight: 700;
font-size: 0.95rem;
letter-spacing: 0.02em;
padding: 15px 24px;
border-radius: 999px;               /* pill */
box-shadow: 0 14px 30px rgba(196,82,42,0.24);
transition: transform 0.18s ease, background 0.18s ease;
/* hover: background → var(--accent-dark) #9D3B1A; transform: translateY(-1px) */
```

> [!TIP]
> Primary CTAs are full pill buttons (`border-radius: 999px`) with a soft accent-colored
> drop shadow. They lift `-1px` on hover and darken to `--accent-dark`. This is the live
> production style.

> [!NOTE]
> Historical: v1.0 of these guidelines specified a clipped-corner polygon button
> (`clip-path: polygon(...)`) for a blueprint/schematic feel. That was never shipped — the
> live site uses pill buttons. Documented here only to explain the change.

**Ghost Button (Secondary)**
```css
/* On dark backgrounds */
color: var(--white);
border: 1px solid rgba(255, 255, 255, 0.22);
padding: 15px 24px;
border-radius: 999px;

/* On light backgrounds (.dark modifier) */
background: var(--white);
color: var(--navy);
border: 1px solid rgba(13,27,42,0.14);
/* hover: border-color rgba(196,82,42,0.4); color: var(--accent) */
```

### Card Patterns

- **Dark cards on light backgrounds:** Navy background, accent-colored dot accents
- **Light cards on dark backgrounds:** `rgba(255,255,255,0.03)` with `border: 1px solid rgba(255,255,255,0.07)`
- **Offset border accent:** Cards use a CSS `::before` pseudo-element offset by `-6px` to `-8px` with a `1px solid var(--accent)` border for depth

### Grid & Background Textures

**Blueprint Grid:**
```css
background-image:
  linear-gradient(rgba(201,168,76,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(201,168,76,0.1) 1px, transparent 1px);
background-size: 80px 80px;
```

**Diagonal Hatch:**
```css
background: repeating-linear-gradient(
  -45deg,
  transparent, transparent 60px,
  rgba(201,168,76,0.06) 60px,
  rgba(201,168,76,0.06) 61px
);
```

**Radial Glow:**
```css
background: radial-gradient(circle, rgba(224,92,42,0.12), transparent 70%);
```

### Animation Patterns

- **Fade-up on scroll:** `opacity: 0 → 1`, `translateY(28px → 0)`, `0.7s ease`, staggered with `0.1s` delays
- **Hover lifts:** `translateY(-2px)` on cards and buttons
- **Scrolling marquee:** Values strip uses `translateX(0) → translateX(-50%)` at `20s linear infinite`
- **Underline reveals:** `scaleX(0) → scaleX(1)` with `transform-origin: left`

### Layout Principles

| Principle | Value | Token |
|---|---|---|
| **Max content width** | `1480px` | `--max` |
| **Body measure (max)** | `760px` | `--text-max` |
| **Container** | `min(--max, 100% − 32px)`, centered | — |
| **Section padding** | `88px 0` vertical (`72px` ≤680px) | `.section` |
| **Card radius** | `22px` | `--radius` |
| **Card shadow** | `0 24px 60px rgba(13,27,42,0.08)` | `--shadow` |
| **Grid gaps** | `24px` for card grids | — |
| **Breakpoints** | `980px` (collapse grids/nav), `680px` (mobile) | — |
| **Base font size** | `18px` html root (`17px` ≤680px) | — |

---

## 7. Imagery & Photography Direction

### Style

> [!NOTE]
> Framework Systems currently uses **no stock photography**. The visual identity is built entirely on typography, color, geometric patterns, and whitespace. This is intentional — it projects confidence, structure, and avoids the generic look of stock-photo service websites.

### If Photography Is Used

- **Authentic only.** Real people, real job sites, real offices. No staged stock.
- **Warm, desaturated tones.** Color-graded to feel consistent with the Navy + Cream palette.
- **Environmental context.** Show the work environment — service trucks, job sites, home offices, tools — not posed portraits.
- **No clip art, illustrations, or emoji** as primary design elements (emoji used sparingly for inline iconography only, e.g., 📞, ⚙️, 📊).

### Icons

- Emoji are used as lightweight inline icons in pain point sections
- No icon library is currently in use
- If icons are added, they should be **line-weight, monochrome** — consistent with the minimal, structural design

---

## 8. Brand Architecture

### Parent Brand
**Framework Systems** — business automation for local service companies

### Sister Company
**The Valley Clean Team** — veteran-owned cleaning company (proof of concept)

### Named Products / Features

| Name | Description | Tier |
|---|---|---|
| **The Blueprint** | Tier 01 — core automation package | Entry |
| **The Build** | Tier 02 — expanded automation + reporting | Mid |
| **The Architect** | Tier 03 — AI receptionist, scoring, strategy | Premium |
| **Framework CRM** | The CRM platform (GoHighLevel-based) | All tiers |
| **Framework Engine** | Self-hosted workflow automation (n8n-based) | Tier 02+ |
| **Framework Clarity** | Weekly operational dashboard/report | Tier 02+ |

### Product Naming Convention
All product names use the **"Framework [Noun]"** pattern to maintain brand unity.

---

## 9. Digital Presence

### Website
- **URL:** `https://www.frameworksystems.co`
- **Hosting:** Vercel
- **Stack:** Static HTML, vanilla CSS, vanilla JS (no framework)
- **Performance:** Self-hosted fonts, preloaded critical assets, minimal JS

### SEO Structure
Every page includes:
- Unique `<title>` and `<meta name="description">`
- Open Graph meta tags
- Twitter Card meta tags
- JSON-LD structured data (Schema.org)
- Canonical URLs
- `robots: index, follow`

### Navigation Structure
```
Home → Services → Industries (dropdown) → Case Study → How It Works → About → Contact (CTA)
                  ├── Plumbing
                  ├── HVAC
                  ├── Cleaning
                  ├── Roofing
                  └── Electrical
```

---

## 10. Tone in Context

### Headings
```
✅ "We build the systems that run your business."
✅ "You don't have a marketing problem. You have a systems problem."
✅ "Three steps. No proposals. No six-week timelines."
✅ "We didn't just build this framework. We ran it. On our own company."

❌ "Empowering Service Businesses with Innovative Solutions"
❌ "Welcome to Framework Systems — Your Partner in Growth"
```

### CTAs
```
✅ "Get Your Free Operations Map"
✅ "Get Your Framework"
✅ "See the Proof →"
✅ "Read the full case study →"

❌ "Start Your Free Trial"
❌ "Book a Call"
❌ "Learn More"
```

### Proof Points
Always cite **specific, earned numbers** — never vague claims:
```
✅ "200%+ revenue growth"
✅ "100+ Google reviews — up from under 10"
✅ "2 → 5 markets in under 12 months"
✅ "$2.6M in documented process improvements"

❌ "Significant growth"
❌ "Industry-leading results"
❌ "Trusted by businesses everywhere"
```

---

## 11. Values Strip & Marquee Text

The scrolling values strip appears between hero and content sections. Canonical order:

```
Faith-Driven · Veteran-Owned · Built for Service Businesses · No Jargon · Proven in the Field · Honest Work · Systems That Run Without You
```

- **Background:** Linear gradient from `--accent-dark` (`#9D3B1A`) to `--accent` (`#C4522A`)
- **Text:** DM Mono, `0.75rem`, `0.18em` letter-spacing, uppercase
- **Divider glyph:** ✦ between items
- **Animation:** Continuous horizontal scroll, `20s linear infinite`

---

## 12. Quick Reference Card

```
BRAND:      Framework Systems
WORDMARK:   Framework. (period in #C4522A)
TYPEFACES:  Playfair Display (headlines), DM Sans (body), DM Mono (labels)
NAVY:       #0D1B2A
ACCENT:     #C4522A  (hover #9D3B1A)
GOLD:       #C9A84C
CREAM:      #F4F1EB
VOICE:      Direct, earned, warm, plain-spoken, honest
CTA STYLE:  Accent pill buttons (border-radius 999px) with soft shadow
FOUNDERS:   Todd & Christen Frederickson
LOCATION:   Tuscumbia, Alabama
MARKET:     Local service businesses · Southeast USA
URL:        frameworksystems.co
```

---

*© 2025 Framework Systems LLC. All rights reserved.*
*These guidelines are a living document. Update with each significant brand decision.*
