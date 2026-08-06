# Slide Deck — Jessica Bisetto

Workshop / B2B deck template (1920×1080, 16:9). Built on `deck_stage.js` — arrow keys to navigate, `?` for print-to-PDF.

## Slide types included
1. **Title** — display headline + portrait, soft tinted background
2. **Section divider** — deep teal with ghost numeral
3. **Content + image** — bulleted insight list paired with full-bleed photo
4. **Big quote** — sand background, italic display serif, oversized open-quote glyph
5. **Three-column method** — numbered cards in a soft grid
6. **Stat** — oversized numeral in teal panel, supporting copy on the right
7. **Closing** — deep teal CTA with contact lines

## Visual rules used
- **Background palette:** mostly `--color-bone` and `--color-cream`; reserve `--color-teal-900` for emphasis (section dividers, stat panel, closing)
- **Display type:** Cormorant Garamond, weight 300 for big headlines, 400 italic for accents
- **Accent:** `--color-teal-700` for eyebrows and small markers
- **Imagery:** always full-bleed when used; soft inner gradient overlay (`linear-gradient(180deg, transparent 40%, rgba(20,42,46,0.25))`)
- **No emoji, no decorative SVG.** Wave/dot/circle motifs are CSS only.

## Adding slides
Drop a `<section data-screen-label="NN Name">` inside `<deck-stage>`. Re-use the `.display`, `.h2`, `.eb`, `.lede`, `.pad`, and section-specific classes.
