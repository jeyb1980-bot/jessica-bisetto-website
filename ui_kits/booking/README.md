# Booking / Termin Flow

Vier-Schritte-Flow für die Terminanfrage. Wird aus dem Website-Header (CTA „Erstgespräch") und vom Kontakt-Screen angesprungen.

## Schritte
1. **Anliegen** — Erwachsene / Kinder / Unternehmen / „erstmal nur fragen"
2. **Zeit** — Wunschtermin aus einer Slot-Liste (5 Tage, je 2–4 Slots)
3. **Daten** — Name, E-Mail, Telefon (optional), Anliegen (optional), Datenschutz-Consent
4. **Bestätigung** — Zusammenfassung + Hinweis auf E-Mail-Rückmeldung innerhalb 2 Werktagen

## Dateien
- `BookingFlow.jsx` — Stepper + alle vier Schritt-Komponenten + State
- `App.jsx` — Mount mit Header/Footer aus `../website/`
- `booking.css` — extends `../website/styles.css`

## Validation
- Schritt 1 → muss eine Auswahl haben
- Schritt 2 → muss einen Slot gewählt haben
- Schritt 3 → Name (>1 Zeichen), valide E-Mail, Consent gesetzt
