/*
  Termine der Vorträge und der Abendreihe an einer Stelle.

  Liegt bewusst hier und nicht in der Seite selbst: Sowohl die
  Vorträge-Seite als auch der Hinweis auf der Angebote-Seite brauchen
  dieselben Daten. Doppelt gepflegte Termine laufen früher oder später
  auseinander — und zwar unbemerkt.
*/

export interface Referentin {
  name: string;
  url: string | null;
  hinweis?: string;
}

export interface Termin {
  datum: Date;
  titel?: string;
  text?: string;
  wer?: string[];
  /* Monate ohne Vortrag stehen als eigene Zeile in der Liste, damit die
     Lücke zwischen zwei Terminen nicht wie ein Fehler aussieht. */
  pause?: string;
}

export const ANMELDUNG = "https://www.jessicahrusa.de/familienraum/";

export const REFERENTINNEN: Referentin[] = [
  { name: "Jessica Bisetto", url: null, hinweis: "diese Seite" },
  { name: "Kerstin Fehst", url: "https://www.kerstinfehst.de" },
  { name: "Johanna Hörter", url: "https://www.starkfuerkinder.de" },
  { name: "Jessica Hrusa", url: "https://www.jessicahrusa.de" },
];

export const MESSE = {
  datum: new Date("2026-10-11"),
  messe: "„Gsond auf der Ostalb“ — Gesundheitsmesse",
  ort: "Stadthalle Heubach, Kleiner Saal",
  zeit: "15:30 Uhr",
  titel:
    "Mentale Gesundheit — wie wir unseren Geist neu entdecken und Veränderung möglich machen können",
  text: [
    "Was, wenn Veränderung nicht bedeutet, alles anders zu machen — sondern neu hinzuschauen? In meinem Vortrag nehme ich dich mit auf eine Entdeckungsreise zu deinem eigenen Geist. Wir schauen gemeinsam, wie mentale Gesundheit wirklich funktioniert, welche Denkmuster uns manchmal im Weg stehen — und wie wir sie mit Leichtigkeit lösen können.",
    "Du bekommst Impulse, die sofort umsetzbar sind: kleine Perspektivwechsel mit großer Wirkung, die dir helfen, Stabilität in bewegten Zeiten zu finden und deine eigene Wirksamkeit neu zu entdecken. Es geht nicht um Perfektion, sondern um echte, machbare Veränderung — Schritt für Schritt.",
  ],
};

export const TERMINE: Termin[] = [
  {
    datum: new Date("2026-10-21"),
    titel:
      "Auftakt: Was Familien trägt und Kinder stark macht — vier Perspektiven auf einen Abend",
    text: "Was braucht ein Kind, um stark zu werden? Was macht ihm Mut, Neues zu wagen? Was hält Familien verbunden, wenn es schwierig wird? Und was trägt dich selbst, wenn du täglich trägst? Vier Impulse, vier Blickwinkel, ein Abend — der Auftakt zeigt, was dich in dieser Reihe erwartet, und lädt danach zum Kennenlernen ein.",
    wer: ["Jessica Bisetto", "Kerstin Fehst", "Johanna Hörter", "Jessica Hrusa"],
  },
  {
    datum: new Date("2026-11-18"),
    titel:
      "Hinter jedem Streit steckt ein Bedürfnis — was Kinder uns mit ihrem Verhalten sagen",
    text: "Trotzen, verweigern, provozieren: Verhalten ist eine Sprache. Wer sie versteht, muss weniger kämpfen. An diesem Abend lernst du, hinter das Verhalten deines Kindes zu schauen — und zu erkennen, welches Bedürfnis gerade Gehör sucht.",
    wer: ["Kerstin Fehst"],
  },
  {
    datum: new Date("2026-12-16"),
    titel: "Familienrituale",
    text: "Rituale geben Kindern Halt und Familien einen gemeinsamen Rhythmus — gerade in vollen Zeiten. Passend zum Advent schauen wir uns an, welche kleinen, alltagstauglichen Rituale wirklich verbinden und wie sie sich ganz ohne Aufwand etablieren lassen.",
    wer: ["Jessica Hrusa"],
  },
  {
    datum: new Date("2027-01-20"),
    titel: "Wie Veränderung gelingt",
    text: "Du weißt genau, was du anders machen willst — und am dritten Tag läuft es wieder wie immer. Das liegt nicht an fehlender Disziplin. Ein Abend für dich als Erwachsene:r darüber, wie Veränderung wirklich funktioniert und warum kleine Schritte mehr bewegen als große Vorsätze.",
    wer: ["Jessica Bisetto"],
  },
  {
    datum: new Date("2027-02-17"),
    titel:
      "Bloß nicht blamieren — wie ein Growth Mindset Kindern Mut macht, Neues zu wagen",
    text: "Lieber gar nicht erst versuchen, als sich zu blamieren: Viele Kinder bremsen sich selbst aus, bevor es überhaupt losgeht. Kurz vor den Halbjahresinformationen ein Abend darüber, wie Kinder Fehler aushalten lernen, Neues wagen und sich vom möglichen Scheitern nicht stoppen lassen — und was Erwachsene dazu beitragen, oft ohne es zu merken.",
    wer: ["Johanna Hörter"],
  },
  {
    datum: new Date("2027-03-17"),
    titel:
      "Warum bringt mein Kind mich so auf die Palme? Eigene Stressmuster erkennen",
    text: "Manchmal reicht ein Satz — und du bist auf 180. Warum gerade dieses Verhalten dich so trifft, hat oft mehr mit deinen eigenen Mustern zu tun als mit deinem Kind. Ein Abend, der den Blick von außen nach innen dreht.",
    wer: ["Kerstin Fehst"],
  },
  {
    datum: new Date("2027-04-21"),
    titel: "Gehirngerechtes Lernen",
    text: "Lernen scheitert selten am Fleiß — sondern daran, dass wir gegen das Gehirn arbeiten statt mit ihm. Du erfährst, wie Lernen leichter wird, wenn man versteht, wie der Kopf tickt. Für dich selbst genauso spannend wie für die Lernbegleitung zu Hause.",
    wer: ["Jessica Bisetto"],
  },
  {
    datum: new Date("2027-05-19"),
    pause: "Mai 2027 — kein Vortrag, Pfingstferien",
  },
  {
    datum: new Date("2027-06-16"),
    titel:
      "Da verliere ich doch mein Gesicht — warum verlässlich sein nicht bedeutet, immer konsequent bleiben zu müssen",
    text: "Einmal Nein gesagt — und jetzt musst du dabei bleiben, koste es, was es wolle? Genau dieser Gedanke führt in Situationen, die niemandem guttun. Ein Abend über Grenzen und Haltung, über den Mut, eine Entscheidung auch einmal zu korrigieren — und darüber, warum Kinder gerade dadurch Klarheit und Verlässlichkeit erleben.",
    wer: ["Johanna Hörter"],
  },
  {
    datum: new Date("2027-07-21"),
    titel: "Generation Internet — sicher in der digitalen Welt",
    text: "Smartphone, Games, Social Media: verbieten bringt wenig, wegsehen noch weniger. Direkt vor den Sommerferien — wenn die Bildschirmzeit erfahrungsgemäß steigt — bekommst du Orientierung, wie du dein Kind sicher und kompetent in der digitalen Welt begleitest. Mit klarem Blick statt Panik.",
    wer: ["Jessica Hrusa"],
  },
];

function heute() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function kommendeTermine(): Termin[] {
  const h = heute();
  return TERMINE.filter((t) => t.datum >= h);
}

export function messeAktuell(): boolean {
  return MESSE.datum >= heute();
}

/* Der nächste anstehende Termin über beide Formate hinweg — für den
   Hinweis auf der Angebote-Seite. Pausenmonate zählen nicht mit. */
export function naechsterTermin(): { label: string; titel: string } | null {
  const h = heute();
  const kandidaten: { datum: Date; titel: string }[] = [];

  if (MESSE.datum >= h) {
    kandidaten.push({ datum: MESSE.datum, titel: "Vortrag auf der Gesundheitsmesse in Heubach" });
  }
  for (const t of TERMINE) {
    if (t.pause || !t.titel) continue;
    if (t.datum >= h) kandidaten.push({ datum: t.datum, titel: t.titel });
  }
  if (kandidaten.length === 0) return null;

  kandidaten.sort((a, b) => a.datum.getTime() - b.datum.getTime());
  const n = kandidaten[0];
  return {
    label: n.datum.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    titel: n.titel,
  };
}
