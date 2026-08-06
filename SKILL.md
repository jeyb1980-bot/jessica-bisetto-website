---
name: jessica-bisetto-design
description: Use this skill to generate well-branded interfaces and assets for Jessica Bisetto (Coaching · Kurse · Workshops), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Brand in one line
Coaching for adults, kids/families, and companies — **warm, gentle, empathetic**, ocean/wave metaphor, never sales-y.

## What's in this folder

| Path | What it's for |
|---|---|
| `README.md` | Full brand context: positioning, content rules, visual foundations, iconography |
| `colors_and_type.css` | All design tokens (color, type scale, spacing, radii, shadows, motion) — import this in every HTML artifact |
| `fonts/` | Cormorant Garamond (display) + Inter (body) self-hosted |
| `assets/` | Logo (`logo.png` / `logo.svg`), portrait, audience photos, hero background |
| `preview/*.html` | Reference cards: type specimens, color swatches, components |
| `ui_kits/website/` | Marketing site — Header, Hero, Footer, audience pages |
| `ui_kits/booking/` | 4-step Termin / Kontakt flow |
| `ui_kits/blog/` | Article list + long-form layout |
| `slides/` | Workshop / B2B deck template (1920×1080) |

## Hard rules
1. **Tone:** `du` for Erwachsene + Kinder pages, `Sie` for Unternehmen. Never mix in one page.
2. **No emoji.** No decorative AI-illustrations. No purple/blue gradients. No sales-y CTAs ("Jetzt kaufen!", urgency, scarcity).
3. **CTA copy** is always an *invitation*: "Erstgespräch vereinbaren", "Schreib mir", "Mehr erfahren".
4. **Imagery:** Jessica's portraits or abstract nature/ocean. Warm, slightly desaturated. Never stock-photo people.
5. **Type:** Cormorant Garamond for everything display/serif (h1–h3, pull quotes), Inter for body and UI. Never use a third family.
6. **Accent color:** `--color-teal-700` (#3A8E8F) — calming, ocean. Use sparingly: links, eyebrows, small markers.
7. **Warm accent:** `--color-clay-500` (#E28C72) — humane, grounding. Use for audience tags, secondary highlights.

## Starter snippet for new HTML artifacts
```html
<link rel="stylesheet" href="<path>/colors_and_type.css">
<style>
  body{ font-family: var(--font-body); background: var(--bg); color: var(--fg); }
  h1{ font-family: var(--font-display); font-weight: 300; font-size: clamp(2.5rem, 6vw, 5rem); letter-spacing: -0.02em; }
</style>
```

## When in doubt
- Pick the warmer option.
- Pick the quieter option.
- Less is more — if a layout feels full, remove something.
- Imagery > illustration. Type > icons. Whitespace > decoration.
