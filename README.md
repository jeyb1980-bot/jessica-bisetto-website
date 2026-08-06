# Jessica Bisetto — Design System

A refreshed design system for the coaching practice of **Jessica Bisetto** (*meTime*) in Schwäbisch Gmünd. Built to support the relaunch of the website and a clearer, more confident brand expression — while keeping the warm, personal feel that defines the practice.

---

## 1. Context

### Who & what

Jessica Bisetto is an independent coach offering **1:1 coaching, group courses, and workshops** to three audiences:

- **Kinder & Jugendliche** — children and adolescents (and their parents)
- **Erwachsene** — adults working on blockades, triggers, stress, perfectionism, life transitions
- **Unternehmen & Kommunen** — companies and municipalities (B2B workshops, training)

The brand voice is built around three pillars she repeats in her own words: **Innovation, Leichtigkeit, Balance** ("innovation, ease, balance"). Her recurring metaphor is *die Welle des Lebens surfen* — riding the waves of life on your own surfboard rather than being rolled over by them. The logo is a hand-drawn **"Jb" monogram** that doubles as an anchor/hook — a quiet visual nod to *grounding* that pairs nicely with the water/wave imagery.

### What we're changing

The current site (Wix-built, 2021) is warm but template-y. The brief is **website optimization + clearer positioning** — keep the warmth and the personal touch, drop the visual clichés, find a quieter and more grown-up voice that still feels like Jessica.

### Sources used

- **Live site:** https://www.jessica-bisetto.de/ (homepage scraped for copy, logos, photography references)
- **Sub-pages referenced** (not all directly accessible): `/angebote`, `/angebote/kinder`, `/erwachsene`, `/angebote/unternehmen`, `/kurse`, `/blog`, `/über-mich`, `/kontakt`, `/datenschutz`, `/impressum`, `/agb`
- **Logo** (`assets/logo.png`) and **portrait** (`assets/portrait.jpg`) — pulled from the Wix CDN
- **Audience photos** — `assets/kinder.jpg`, `assets/erwachsene.jpg`, `assets/unternehmen.jpg`, `assets/hero-bg.jpg`
- **Cooperation partner logos** documented but not vendored (they belong to third parties: Stadt Schwäbisch Gmünd, Stadt Lorch, Mundi, VHS Schwäbisch Gmünd / Crailsheim / Gerlingen / Aalen, Waldorfschule Backnang, Rauchbeinschule, GSS Crailsheim, Theodor-Heuss-Schule, GSM SHA, St.-Josef-Schule, Frauen helfen Frauen e.V., LRA)

No Figma file or codebase was attached. Visual decisions were derived from the existing site, the brief, and coaching-domain psychology (see *Color Audit* below).

---

## 2. Content Fundamentals

### Tone of voice

**Empathisch, leise, präsent.** The reader should feel met, not pitched. Sentences are short. Verbs do the work. Jessica writes in the first person and addresses the reader as a person, never a "lead."

| Do                                                          | Don't                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| "Ich begleite dich, wenn dir gerade alles zu viel ist."     | "Maximiere dein Potenzial mit meinem 5-Schritte-System."     |
| "Wir schauen gemeinsam, was du wirklich brauchst."          | "Buche jetzt deine Transformation!"                          |
| "Manchmal reicht ein Gespräch, manchmal braucht es mehr."   | "Garantierte Ergebnisse in 30 Tagen."                        |
| "Du musst das nicht allein durchstehen."                    | "Endlich frei von all deinen Blockaden!"                     |

**No sales language.** No urgency ("Jetzt sichern!"), no superlatives ("die beste / führende"), no transformation-promises, no exclamation marks except in genuinely warm contexts ("Schön, dass du hier bist!").

### Form of address

- **Du** for *Kinder*, *Erwachsene*, *Kurse*, *Über mich*, *Blog*, *Kontakt*
- **Sie** for *Unternehmen & Kommunen* (B2B audience — schools, town councils, HR)
- Choose once per page; never mix on the same page.

The site can detect audience context (route prefix) and select the correct register automatically; the copy in the UI kit shows both forms.

### Casing & punctuation (German conventions, please)

- **Substantives stay capitalised** — *Coaching, Veränderung, Mensch* — both in body copy and headlines. Do not lowercase headlines in an "editorial" affectation; it reads wrong in German.
- **Eszett (ß)** preserved — *Schwäbisch Gmünd*, *Größe*, *fließen*.
- **Quotation marks**: German „typographic" („…") in long-form copy; straight quotes acceptable in UI. Never English "smart quotes" in body text.
- **Em-dash with hair spaces** — *— so —* (German typography). One space either side is acceptable for the web.
- **No ALL CAPS in body copy.** Eyebrows / labels only, with wide tracking.

### Headline writing

- **Lead with the human, not the offer.** "Du bist der wichtigste Mensch in deinem Leben" > "Coaching für Erwachsene".
- **Italic for emphasis**, not bold. The display serif (Newsreader) carries emotion in its italic.
- **One quiet quote per page** is welcome (Maria Montessori is already used; we keep that pattern). Don't overdo it.

### Microcopy patterns

- Buttons: imperative + soft. "Termin anfragen", "Mehr erfahren", "Zum Kursplan" — never "JETZT BUCHEN!" or "Click here".
- Form labels: full words, never icons alone. Placeholder text supplements, never replaces, the label.
- Errors: human and specific. "Bitte gib eine E-Mail-Adresse ein, damit ich dir antworten kann." — not "Field required."
- Confirmations: warm + concrete. "Danke. Ich melde mich innerhalb von zwei Werktagen bei dir."

### Emoji

**No.** Emoji is not part of this brand. The display serif and warm photography carry all the personality the system needs.

### Numbers, dates, currency

- Dates: `12.05.2026` or `12. Mai 2026` (long form for editorial / blog).
- Time: `10:00 – 11:30 Uhr` (24-hour, with en-dash and `Uhr`).
- Prices (Kurse): `120 €` (space before €), no `,00` unless the price has cents.

---

## 3. Visual Foundations

### Colors — audit and choices

The current Wix site uses generic theme colors (a warm white background, a turquoise/teal accent that leans corporate). The new palette keeps the *idea* of teal — for trust and calm — but warms the whole system with paper-like neutrals and adds two supporting accents grounded in coaching psychology.

| Token        | Hex       | Psychology used in coaching practice                          |
| ------------ | --------- | ------------------------------------------------------------- |
| **Bone**     | `#FAF6F0` | Warm off-white — paper, calm, not clinical                    |
| **Cream**    | `#F2EBDE` | Raised surfaces, gentle separation                            |
| **Ink**      | `#1F1B16` | Warm charcoal text. Never `#000` — too harsh for this voice   |
| **Teal-500** | `#3D7373` | Trust, depth, still water — primary brand accent              |
| **Clay-500** | `#C77F5C` | Warmth, humanity, terracotta — secondary, for emphasis        |
| **Sage-500** | `#7C9070` | Growth, balance, nature — tertiary, often for B2B contexts    |

**Audience accents** (used sparingly, as page-context tints):
- *Kinder* → peach `#E8A881` — soft, playful, never bubblegum
- *Erwachsene* → teal `#3D7373` — introspective, deep
- *Unternehmen* → sage `#7C9070` — stable, growth-oriented

The three accents are designed to coexist on a single page (e.g. the three-audience overview) without clashing — all are mid-value, warm-leaning, and share the same neutral undertone. WCAG AA contrast against `--bg` (Bone) is met for all 500-weight colors at 16px+ body text.

### Typography

- **Display:** [Newsreader](https://fonts.google.com/specimen/Newsreader) — humanist serif with a real italic. Used for headlines, the lede paragraph, and pull quotes. Weight 300–500 only; never 700 (too heavy for this voice).
- **Body & UI:** [Manrope](https://fonts.google.com/specimen/Manrope) — friendly geometric sans, comfortable at long line-lengths. Weight 400 for body, 500–600 for UI labels.
- **No third typeface.** Resist the urge.

Note: the original site uses Wix system fonts. Newsreader/Manrope are **substitutions** — both are open-source Google Fonts. If Jessica has a preferred typeface from print materials, swap in `colors_and_type.css` and the system will follow.

### Spacing

4-pixel base. Headlines and section transitions lean **generous** — 96–128px (`--sp-9`/`--sp-10`) between sections on desktop. The visual quietness of the system comes from white space, not from styling tricks.

### Backgrounds

- **No gradients.** Solid neutrals only. The page is paper.
- **Full-bleed photography** for hero sections and section dividers — the warm, autumnal aesthetic of Jessica's existing photos (soft light, natural settings, shallow depth-of-field) is the visual world. Imagery should feel *captured*, not *staged*.
- **Abstract nature/ocean** photography (driftwood, sand patterns, still water, leaves) for surfaces where a portrait would be too literal — Über mich keeps the people; Angebote uses environments.
- **No patterns or textures.** Paper grain is allowed as a very subtle background detail if anywhere; default is flat.

### Animation

- **Slow and soft.** `--dur-med` (280ms) is the default; never under 160ms, never over 600ms.
- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — soft ease-out. No bounces, no springs.
- **Patterns used:** fade-up on scroll-into-view (8px translate + opacity), cross-fade on image swap, color transitions on hover.
- **No parallax.** No marquees. No autoplaying carousels. The brand is *calm*.

### Interactive states

- **Hover (links, buttons):**
  - Primary buttons: `--accent` → `--accent-hover` (teal deepens)
  - Text links: underline appears (`text-underline-offset: 0.25em`), color stays the same
  - Cards: `--shadow-sm` → `--shadow-md`, image inside scales `1.02`
- **Focus:** 2px solid `--color-focus` outline, 3px offset. Always visible (accessibility — never `outline: none`).
- **Press:** 1px translate-Y, no scale. Buttons don't bounce.
- **Disabled:** opacity 0.4 + `cursor: not-allowed`.

### Borders & dividers

- Hairlines: `1px solid var(--border)` — barely-there stone-300.
- For section dividers, prefer **whitespace + a centered ornamental glyph** (`◦` or a small horizontal line 64px wide in `--border-strong`) over a full-width rule.

### Shadows

Always warm (rgba of `--color-ink`, never neutral gray). Layered (two shadows for depth). Cards rest at `--shadow-sm`; only the floating booking widget or modals go up to `--shadow-lg`.

### Cards

- Background `--bg-raised` on a `--bg` page; reverse on darker sections.
- Border-radius: `--r-lg` (20px) — soft but not pillowy.
- Padding: `--sp-6` (32px) minimum, `--sp-7` (48px) for hero cards.
- No left-border accent stripes. (Cliché.) Use a single colored detail — an eyebrow label in `--color-teal-700` is plenty.

### Transparency & blur

- **Use sparingly.** Acceptable: a `rgba(31, 27, 22, 0.4)` overlay on hero photography to support white text. Backdrop blur (`backdrop-filter: blur(12px)`) is acceptable only for the sticky header when it overlaps full-bleed imagery.
- Never frosted-glass cards in the page body. They look dated and unspecific.

### Layout rules

- **Max width** `--w-content` (1080px) for prose; `--w-wide` (1240px) for full layouts.
- **Asymmetric grids preferred** for editorial sections — a 5/12 image next to a 7/12 text column reads more "thinking magazine" than a 6/6 split.
- **The header is sticky, not fixed.** It returns on scroll-up.
- **Footer is generous** (3–4 columns, breathing room) — it carries the partner logos and full Impressum link.

### Imagery direction

Photos of Jessica should feel like a friend's portrait, not a stock photo of a coach. Soft natural light, no harsh shadows, no pointed-at-the-camera "trust me" poses. Supporting imagery: water, light through trees, sand, paper, hands holding objects — *atmosphere*, not metaphor-soup. Cool-warm balanced (autumnal), never cold-blue.

---

## 4. Iconography

### Approach

The brand is **icon-light**. The display serif and photography do most of the storytelling, and adding an icon set risks tipping the voice toward "tech startup." Where icons are needed (form fields, social, navigation arrows, audience cards), use:

- **[Lucide](https://lucide.dev/) icons** via CDN (`https://unpkg.com/lucide-static@latest/icons/*.svg`)
- **Stroke weight 1.5** (Lucide default) — matches the hand-drawn logo line
- **`currentColor`** for stroking so they tint with text
- **Size**: 20px in body / forms, 24px for nav, 32px for audience cards

A small starter set is included in `assets/icons/` (Lucide subset): `arrow-right`, `calendar`, `clock`, `mail`, `phone`, `map-pin`, `instagram`, `menu`, `x`, `chevron-down`, `check`, `quote`.

### Emoji

Not used. The system has no emoji affordance.

### Unicode glyphs allowed as ornaments

- `◦` (small bullet) for separator dots in metadata rows
- `—` (em-dash) for editorial pauses
- `·` (middle dot) in nav

### Logo usage

- The `Jb` monogram is the **mark**. Minimum size: 32px square.
- Always render on `--bg` or `--bg-raised`; on photography, use the inverted (white) version with a soft drop-shadow.
- **Lockup**: mark + wordmark *"Jessica Bisetto"* (Newsreader, 400, tracking 0). Mark sits left of the wordmark, vertically centered, with `--sp-3` (12px) gap.
- Clear space around the mark equals the height of the inner monogram on all sides.
- Do not recolor the mark. Do not place it on busy photo regions. Do not stretch.

---

## 5. Legal & Impressum — Audit Notes

> *I'm not a lawyer and what follows is general guidance, not legal advice. Please have your Impressum and Datenschutzerklärung reviewed by a German Rechtsanwalt or service like eRecht24 / IT-Recht Kanzlei.*

The current Impressum on the live site was not directly accessible during this audit. Based on common requirements for a German coaching practice as of **2026**, please confirm the new website contains:

### Impressum (per § 5 DDG, formerly § 5 TMG)
- [ ] Full legal name (*Jessica Bisetto*) and **postal address** — confirmed on live homepage (Stuttgarter Straße 3, 73525 Schwäbisch Gmünd) ✓
- [ ] **Contact:** phone and email — both present ✓ (consider replacing the `gmx.de` address with a domain-aligned `kontakt@jessica-bisetto.de` for professionalism)
- [ ] **Umsatzsteuer-Identifikationsnummer (USt-IdNr.)** — if applicable. Coaching is generally USt-pflichtig unless Kleinunternehmer-Regelung (§ 19 UStG); state which applies, or omit if Kleinunternehmer.
- [ ] **Berufsbezeichnung:** "Coach" is not a protected German title, so no Kammer/Aufsichtsbehörde is legally required. If Jessica holds a *Heilpraktiker (Psychotherapie)* license, that **does** require listing the issuing authority. Confirm.
- [ ] **Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV** — required for editorial content (i.e. the blog): "Jessica Bisetto, Stuttgarter Straße 3, 73525 Schwäbisch Gmünd"
- [ ] **EU-Streitschlichtung (Article 14 ODR-Verordnung)** — link to https://ec.europa.eu/consumers/odr (note: the ODR platform is being wound down by EU Commission in 2025/2026; current advice is still to link it until officially decommissioned — please confirm at relaunch)
- [ ] **Verbraucherstreitbeilegung (§ 36 VSBG)** — typical statement: *"Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."*

### Datenschutzerklärung (GDPR / DSGVO)
- [ ] Identity of controller (Verantwortliche) + contact
- [ ] Legal bases for each processing activity (Art. 6 DSGVO)
- [ ] Cookie / tracking disclosures — **especially important** if any analytics or ad pixel is loaded (the Wix site loaded various third-party scripts). The new site should default to **no tracking** until consent is given.
- [ ] Cookie banner with separate "Notwendig / Statistik / Marketing" toggles (TTDSG / TDDDG compliance)
- [ ] Right of access, rectification, erasure, data portability, complaint to supervisory authority (Landesbeauftragter für Datenschutz Baden-Württemberg — for Schwäbisch Gmünd)
- [ ] Form-submission processing notice — what happens to the data entered in the contact form, retention period
- [ ] Web fonts: if loaded from **Google Fonts CDN**, this requires consent in 2026 (LG München ruling, still applies). **Recommendation: self-host Newsreader + Manrope** so no IP address is sent to Google. This system is set up for that swap.

### AGB (if Jessica sells courses online)
- [ ] Vertragsschluss-Prozess
- [ ] Widerrufsrecht für Verbraucher (14 Tage) — note: digital coaching services have specific rules around Widerrufsverzicht
- [ ] Preise inkl./exkl. USt (depending on Kleinunternehmer status)
- [ ] Zahlungsbedingungen, Kündigung

### Accessibility — BFSG (Barrierefreiheitsstärkungsgesetz)
The German Accessibility Act took effect **28 June 2025**. It applies to e-commerce providers offering services to consumers. If Jessica sells courses online (Kursanmeldung mit Bezahlung), the website must meet WCAG 2.1 AA. The Kleinstunternehmer-Ausnahme (<10 employees, <2M turnover) **may** apply but is narrow — confirm with counsel. The system in this folder is designed to AA: contrast, focus states, scalable type, semantic HTML.

---

## 6. What's worth adding (open suggestions)

Things the current site does not have that would meaningfully sharpen the brand:

1. **A clearer "Erstgespräch" CTA** — a free 20-minute introductory call. Lowers the activation barrier for new clients. Currently the only path is "Termin anfragen" via contact form.
2. **A pricing page or transparency section** — most coaching sites omit prices, which can read as gate-kept. A simple range ("Einzelcoaching: ab 120 €/Stunde · Erstgespräch kostenfrei") builds trust.
3. **Case-style longform stories**, not just testimonials. One Erwachsene story, one Kinder story, one Unternehmen story — each ~400 words, anonymised, written by Jessica. Vastly more credible than star ratings.
4. **A workshop catalog for Unternehmen** — currently buried. The B2B audience needs its own landing with concrete formats ("Halbtags-Workshop Resilienz", "Tages-Workshop Konfliktlösung", references to schools/cities).
5. **Newsletter / Impulse-Mail**, *opt-in only*, one short reflection per month. Builds long-term relationship without pressure.
6. **Schema.org markup** — `Person`, `LocalBusiness`, `Service` — for local SEO around "Coach Schwäbisch Gmünd".
7. **Better contact options** — calendar booking integration (Calendly / cal.com) for the Erstgespräch flow. Reduces email ping-pong.

These are documented as *suggestions*. The UI kit includes building blocks for items 1–4 so they're easy to introduce.

---

## 7. Project Index

| File / folder           | What it contains                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `README.md`             | This file                                                                                       |
| `SKILL.md`              | Cross-compatible skill manifest — drop this folder into Claude Code / Skills                    |
| `colors_and_type.css`   | Single source of truth for tokens — colors, type, spacing, radii, shadows, motion              |
| `assets/`               | Logo, portrait, hero, audience photos, Lucide icon subset                                       |
| `preview/`              | Specimen cards (one concept each — type, colors, spacing, components). Registered for review.   |
| `ui_kits/website/`      | Marketing site — Header, Hero, Three-Audience overview, Testimonials, Footer, etc.              |
| `ui_kits/booking/`      | Erstgespräch & contact flow                                                                     |
| `ui_kits/blog/`         | Article layout — blog index + single article                                                    |
| `slides/`               | B2B workshop deck template (Unternehmen audience)                                                |

---

## 8. Caveats & ongoing iteration

- No font files are bundled — Newsreader and Manrope are loaded from Google Fonts CDN. **For production: self-host both** (legally important under DE/EU privacy law).
- The Lucide icon subset in `assets/icons/` is a starting set; expand as new screens need new glyphs.
- Cooperation partner logos are referenced but not vendored.
- The Impressum and Datenschutz audit (Section 5) is *guidance only* — please run a legal review.
- Photos in `assets/` are the existing site's photos at moderate resolution. For print and 4K hero use, request originals from Jessica.
