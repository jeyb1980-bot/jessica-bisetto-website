# Wix CMS — Kurse: Setup-Anleitung

Diese Anleitung führt dich Schritt für Schritt durch das Anlegen der Kurs-Sammlung in deinem Wix-Editor. Am Ende kannst du Kurse so leicht pflegen wie einen Eintrag in einer Tabelle, und sie erscheinen automatisch auf der Übersichtsseite.

**Vorbereitung**: Das CSV-File `kurse.csv` liegt im selben Ordner — mit drei fertigen Beispielkursen, die du erst importieren und dann anpassen kannst.

---

## 1. Sammlung „Kurse" anlegen

1. Wix-Editor öffnen → linke Seite → **CMS** (das Datenbank-Symbol).
2. Wenn CMS noch nicht aktiv ist: **„CMS hinzufügen"**.
3. **„Neue Sammlung erstellen"** → Name: `Kurse` (Englisch geht auch: `courses`).
4. Sammlungstyp: **„Inhaltssammlung"**.

## 2. Felder definieren (in genau dieser Reihenfolge und mit diesen Typen)

| Feldname (Schlüssel) | Anzeigename | Feldtyp | Pflichtfeld |
|---|---|---|---|
| `titel` | Titel | Text | ja |
| `untertitel` | Untertitel | Text | nein |
| `zielgruppe` | Zielgruppe | **Tags** (Werte: Kinder, Erwachsene, Unternehmen) | ja |
| `datum` | Termin | **Datum + Uhrzeit** | ja |
| `dauer` | Dauer (Min.) | Zahl | nein |
| `ort` | Ort | Text | nein |
| `format` | Format | **Tags** (Werte: Vor Ort, Online, Hybrid) | nein |
| `preis` | Preis (€) | Zahl | nein |
| `plaetze` | Plätze gesamt | Zahl | nein |
| `beschreibung` | Beschreibung | **Reichhaltiger Text** | nein |
| `anmeldeLink` | Anmelde-Link | URL | nein |
| `status` | Status | **Tags** (Werte: Offen, Ausgebucht, Vorbei, Auf Anfrage) | ja |
| `coverBild` | Cover-Bild | Bild | nein |

> **Wichtig**: Die englischen Schlüssel (`titel`, `datum`, …) müssen **exakt** so heißen, sonst funktioniert der CSV-Import nicht. In Wix steht der Schlüssel klein und ohne Umlaute neben dem Anzeigenamen.

## 3. CSV importieren

1. Sammlung auswählen → oben rechts **„Mehr aktionen"** → **„Aus CSV importieren"**.
2. Datei `kurse.csv` auswählen.
3. Wix zeigt eine Vorschau-Tabelle. Prüfe, dass jede Spalte dem richtigen Feld zugeordnet ist (Wix erkennt das in der Regel automatisch über die Spaltenüberschrift).
4. **„Importieren"**. Drei Kurse werden angelegt.

## 4. Kurs-Übersichtsseite mit der Sammlung verbinden

1. Editor → Seite „Kurse" öffnen (oder neu anlegen).
2. Auf der Seite **„Wiederholer"-Element** einfügen (zwischen Add → CMS → Wiederholer).
3. Wiederholer mit der Sammlung **„Kurse"** verbinden.
4. Innerhalb des Wiederholers folgende Felder anbinden (Drag & Drop oder rechte Datenseitenleiste):
   - Datum (formatiert als „15. Sep · 17:00")
   - Zielgruppe als Eyebrow (Klein-Versalien, petrol)
   - Titel als Heading 3
   - Untertitel als Paragraph 2
   - Ort + Dauer in einer Zeile mit „·" als Trenner
   - „Anmelden →" Button → Link aus `anmeldeLink`

## 5. Filter / Sortierung

Wiederholer-Einstellungen → **Datenfilter**:

- **„Status ist nicht 'Vorbei'"** → vergangene Kurse fallen automatisch raus
- **Sortieren nach `datum` aufsteigend** → nächste Termine zuerst

Auf den Zielgruppen-Unterseiten (Angebote Kinder / Erwachsene / Unternehmen) jeweils einen eigenen Wiederholer einfügen mit zusätzlichem Filter **„Zielgruppe enthält 'Kinder'"** etc.

## 6. Status-Verhalten

Drei Status-Werte erzeugen drei Erscheinungsbilder:

| Status | Erscheinung im Design |
|---|---|
| Offen | Normaler Button „Anmelden →" in Petrol |
| Ausgebucht | Button grau, Text „Ausgebucht", nicht klickbar (Wix: „Aktionen → Element ausblenden bei Wert 'Ausgebucht'") |
| Vorbei | Karte komplett ausgeblendet (siehe Filter Punkt 5) |
| Auf Anfrage | Statt Button: kleiner Hinweistext + Mail-Link |

So zeigst du, was los ist, ohne ständig zu löschen.

## 7. Pflege im Alltag

Wenn du einen neuen Kurs anbietest:

1. CMS → Sammlung „Kurse" öffnen.
2. **„+ Neu hinzufügen"**.
3. Alle Felder ausfüllen (das geht in 1–2 Minuten).
4. Status auf „Offen" setzen.
5. Speichern. Erscheint sofort auf der Übersichtsseite — **kein Layout-Eingriff nötig**.

Bei ausgebuchten Kursen einfach den Status ändern, fertig.

---

## Beispieldaten in der CSV

Die drei Beispielkurse decken alle drei Zielgruppen ab und zeigen unterschiedliche Status:

| Kurs | Zielgruppe | Status | Was du daran siehst |
|---|---|---|---|
| Mutig und stark | Kinder | Offen | Klassischer Kurs mit Preis, fixem Termin und Anmeldelink |
| Resilienz im Alltag | Erwachsene | Offen | Mehrtermin-Kurs mit Beschreibung in mehreren Absätzen |
| Konflikt im Team | Unternehmen | Auf Anfrage | Kein fester Preis, Buchung per E-Mail statt Link |

Nach dem Import kannst du sie als Vorlage nutzen oder löschen.
