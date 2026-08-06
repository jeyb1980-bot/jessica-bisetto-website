# CLAUDE.md — Briefing für den Bau der Website jessica-bisetto.de

> Diese Datei liest Claude Code beim Öffnen des Projekts automatisch. Sie beschreibt, **was** gebaut werden soll, **wie**, und **womit zu starten** ist. Sie ist für die Person Jessica Bisetto („Jessi") geschrieben, die keine Entwicklerin ist — erkläre Entscheidungen also in einfachen Worten, wenn du Rückfragen stellst.

---

## 1. Was hier entsteht

Eine **produktionsreife, mehrsprachig-deutsche Website** für die Coaching-Praxis von **Jessica Bisetto** im Ostalbkreis (Schwäbisch Gmünd). Sie ersetzt die bisherige Wix-Seite. Drei Zielgruppen: **Kinder & Jugendliche**, **Erwachsene**, **Unternehmen & Kommunen**.

In diesem Projekt liegt bereits ein **vollständiger, abgenommener Prototyp** als Designvorlage. Deine Aufgabe ist NICHT, das Design neu zu erfinden, sondern es **1:1 in eine echte, schnelle, pflegbare und DSGVO-konforme Website zu überführen**.

---

## 2. Was schon da ist (Quelle der Wahrheit)

| Pfad | Inhalt — übernehmen, nicht neu erfinden |
|---|---|
| `colors_and_type.css` | Alle Designtokens: Farben, Schrift, Abstände, Radien, Schatten, Motion. **Übernimm diese Werte exakt.** |
| `ui_kits/website/` | Marketing-Site: Header, Hero, 3 Zielgruppen-Karten, Über-mich-Teaser, Testimonials, „Vertraut von", Downloads/Elternbibliothek, Newsletter, Footer; Unterseiten Angebote/Über mich/Kontakt |
| `ui_kits/blog/` | Blog-Liste + Artikel-Layout |
| `ui_kits/booking/` | 4-Schritte-Erstgespräch-Flow |
| `slides/` | B2B-Workshop-Deck (separat, nicht Teil der Website) |
| `downloads/` | Flyer (HTML) + 2 PDF-Vorlagen (Wutmonster, Löwe) |
| `assets/` | Logo, Porträt, Zielgruppenfotos, Lucide-Icons, Mut-tut-gut-Logos |
| `skills/jessi/SKILL.md` | **PFLICHTLEKTÜRE vor jedem Text.** Tonfall, Wording, Tabus. |
| `README.md` | Vollständige Marken-, Content- und Visual-Doku + Impressum/DSGVO-Audit |
| `wix/kurse.csv` | Beispiel-Datenstruktur für Kurse (als CMS-Schema-Vorlage nutzbar) |

**Wichtig:** Die Prototyp-Komponenten sind React-über-CDN (Babel im Browser). Das ist bewusst nur Prototyp. Du baust daraus saubere Produktions-Komponenten.

---

## 3. Tonfall & Inhalt — nicht verhandelbar

Lies **`skills/jessi/SKILL.md`** vollständig, bevor du irgendeinen Text schreibst oder umformulierst. Die wichtigsten harten Regeln:

- **Du** auf Kinder-, Erwachsenen-, Blog-, Kontakt-, Über-mich-Seiten. **Sie** nur für Unternehmen/Kommunen/Schulen. Nie auf einer Seite mischen.
- **Kein Mutter-Bezug** über Jessi. **Surfen ist nur Metapher**, nie reales Hobby.
- Keine Sales-Sprache, keine Dringlichkeit, keine Superlative, keine Emoji.
- Deutsche Typografie: „typografische Anführungszeichen", Gedankenstrich mit Leerzeichen, ß erhalten.
- Methoden korrekt benennen: EMDR, AMR (Eisschollen-Prinzip), EFT, Reflexintegration (RIT), NLP.

Bestehende echte Inhalte (NICHT erfinden, sind im Prototyp):
- 3 Testimonials: Nadine S., Mutter von Julius, Andrea B.
- Referenzen/Ausbildungen im Über-mich-Aufklappkasten
- „Mut tut gut" Präventionsprojekt (Anfragen laufen über den Verein Frauen helfen Frauen Schwäbisch Gmünd e. V.)

---

## 4. Technische Vorgaben

**Framework:** Nutze **Astro**. Begründung für Jessi (in einfachen Worten, falls sie fragt): Astro erzeugt sehr schnelle, suchmaschinenfreundliche Seiten, ist günstig/kostenlos zu hosten und einfach zu pflegen. Wenn du fachlich Next.js bevorzugst, erkläre Jessi kurz den Trade-off und frag nach, bevor du wechselst.

**Anforderungen:**
- Komponenten und Designtokens 1:1 aus dem Prototyp übernehmen (`colors_and_type.css` als Basis)
- **Schriften self-hosten** (Newsreader, Manrope als woff2) — NICHT über Google-CDN laden (DSGVO-Pflicht in DE). Lege sie unter `public/fonts/` und binde sie per `@font-face` ein.
- Responsive, mobil zuerst geprüft
- Barrierearm: WCAG 2.1 AA (Kontrast, Fokus-States, semantisches HTML, Tastaturbedienung) — relevant wegen BFSG seit 06/2025
- Die dekorative Hintergrundwelle und die Hover-/Aufklapp-Interaktionen übernehmen

**CMS (Inhalte pflegbar machen):**
Richte ein **Headless-CMS** ein, das Jessi ohne Code bedienen kann. Empfehlung: **Sanity** oder **Storyblok** (beide kostenloser Tarif, EU-Hosting wählbar). Sammlungen:
- **Kurse** — Felder siehe `wix/kurse.csv` (Titel, Untertitel, Zielgruppe, Termin, Dauer, Ort, Format, Preis, Plätze, Beschreibung, Anmeldelink, Status, Coverbild)
- **Blog** — Titel, Untertitel, Datum, Coverbild, Inhalt (Rich Text), Zielgruppe, Lesedauer
- **Kundenstimmen** — Zitat, Name, Kontext, Reihenfolge
- **Partner/Referenzen** — Name, Kategorie, Reihenfolge

**Formulare echt machen:**
- Kontakt- und Erstgespräch-Formular sollen tatsächlich versenden (z. B. an Jessis E-Mail über einen Dienst wie Formspree, oder serverseitig). Datenschutzhinweis + Double-Opt-in beachten.
- Newsletter an einen **EU/DSGVO-konformen Anbieter** anbinden (z. B. CleverReach, Brevo, MailerLite). Double-Opt-in ist Pflicht.

**Rechtliches:**
- Cookie-Banner mit Kategorien (notwendig/Statistik/Marketing), standardmäßig kein Tracking ohne Einwilligung
- Impressum, Datenschutz, AGB als eigene Seiten. Inhalte/Checkliste siehe `README.md` Abschnitt 5. Jessi muss diese rechtlich prüfen lassen — weise sie darauf hin.

---

## 5. Hosting & Veröffentlichung

Wenn die Seite steht, richte das Deployment ein und **führe Jessi in einfachen Schritten durch die Veröffentlichung**:

1. **Empfohlener Hoster: Cloudflare Pages oder Netlify** (kostenlos, schnell, HTTPS automatisch, DSGVO-konform betreibbar). Falls Jessi „Server zu 100 % in Deutschland" möchte, nenne als Alternative Mittwald oder IONOS.
2. Verbinde das Projekt über ein kostenloses **GitHub**-Konto, damit Updates automatisch live gehen.
3. Erste Veröffentlichung unter einer Test-Adresse (z. B. `…​.netlify.app`).
4. **Domain `jessica-bisetto.de` verbinden:** Nenne Jessi die **exakten DNS-Einträge** (A/CNAME), die sie eintragen muss. Die Domain liegt aktuell bei Wix — erkläre, wie sie die DNS-Einstellungen bei Wix anpasst ODER die Domain umzieht.
5. **Warnung an Jessi:** Bevor sie das Wix-Abo kündigt, muss geprüft werden, ob die E-Mail-Adresse `kontakt@jessica-bisetto.de` über Wix läuft — die muss separat zu einem Mail-Anbieter umgezogen werden, sonst fällt sie aus.

---

## 6. Wie du mit Jessi arbeitest

- Sie ist **keine Entwicklerin**. Erkläre Schritte in Alltagssprache, vermeide Fachjargon oder übersetze ihn.
- Arbeite in **überschaubaren Etappen** und zeige zwischendurch Ergebnisse, statt alles auf einmal zu bauen.
- Bei inhaltlichen/gestalterischen Unklarheiten: **frag nach**, erfinde keine Fakten (Namen, Referenzen, Preise, Methoden).
- Halte dich bei allen Texten an `skills/jessi/SKILL.md`.

## 7. Sinnvolle Reihenfolge (Vorschlag)

1. Projekt aufsetzen (Astro), Designtokens + self-hosted Fonts übernehmen
2. Globale Bausteine: Header, Footer, Hintergrundwelle
3. Startseite mit allen Sektionen
4. Unterseiten: Angebote (3 Zielgruppen + Mut-tut-gut), Über mich (mit Referenzen-Kasten), Kontakt
5. Blog (Liste + Artikel) + CMS-Anbindung
6. Kurse + CMS-Anbindung
7. Erstgespräch-Flow + echter Formularversand
8. Newsletter-Anbindung
9. Rechtliches: Cookie-Banner, Impressum, Datenschutz, AGB
10. Hosting einrichten, Domain verbinden, live schalten
11. Mobile- und Accessibility-Check
