# Website UI Kit

Click-through prototype of the new jessica-bisetto.de.

**Run:** open `index.html`.

**Screens**
- Home — Hero, three audience cards, About teaser, Testimonials, Partners, Footer
- Angebote — tabbed view of Kinder · Erwachsene · Unternehmen
- Über mich — portrait hero + three-pillar block
- Kontakt — adaptive form (Du / Sie based on audience selection) + side info

**Files**
- `Header.jsx` — sticky header with mobile burger
- `Sections.jsx` — Hero, AudienceCards, AboutTeaser, Testimonials, Partners
- `Footer.jsx` — four-column dark footer
- `Screens.jsx` — Angebote + ÜberMich
- `Kontakt.jsx` — contact form with audience segmenter
- `App.jsx` — router + page composition
- `styles.css` — kit-specific styles, bound to `colors_and_type.css` tokens

**Notes**
- Du-form throughout, except Unternehmen tab + form mode → Sie-form
- Kurse and Blog routes deliberately stubbed; see `ui_kits/blog/` for blog UI
- Adapt the partner list against real cooperation partners before launch
