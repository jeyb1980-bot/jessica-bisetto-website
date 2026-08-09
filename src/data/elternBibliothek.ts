// Inhalte der Eltern-Bibliothek — übernommen aus der bestehenden
// Sammlung von Jessica Bisetto (Dokumente/eltern-bibliothek.html).
// Quellenangaben und Formulierungen sind unverändert.

export interface Quelle { ref: string; text: string }
export interface Topic {
  id: string; title: string; area: string; category: string;
  ageMin: number; ageMax: number; genders: string[]; tags: string[];
  summary: string;
  body: { was: string; anzeichen: string[]; hilft: string[]; redflag?: string; quellen: Quelle[] };
}

export const TOPICS: Topic[] = [
  {
    id:"schulangst",
    title:"Schulangst",
    area:"Schule",
    category:"Angst",
    ageMin:6, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["bauchschmerzen montag","weinen vor schule","schulverweigerung leicht","prüfung","klassenarbeit","lehrer angst","klassenkamerad angst"],
    summary:"Anhaltende Furcht vor der Schule, oft begleitet von körperlichen Beschwerden wie Bauchschmerzen oder Übelkeit am Morgen.",
    body:{
      was:"Schulangst beschreibt eine ausgeprägte, oft situationsgebundene Angst vor der Schule – z.&nbsp;B. vor einzelnen Fächern, Leistungssituationen, Lehrkräften oder dem sozialen Kontext. Sie ist von der reinen Schulunlust und von Schulverweigerung im engeren Sinne (siehe eigenes Thema) zu unterscheiden.",
      anzeichen:[
        "Wiederkehrende körperliche Beschwerden v.&nbsp;a. an Schultagen (Bauch-, Kopfschmerzen, Übelkeit)",
        "Schlafprobleme am Sonntagabend, früh erwachen, Albträume vor Klassenarbeiten",
        "Rückzug, Reizbarkeit oder Tränen vor dem Schulweg",
        "Vermeidungsverhalten: ‚Ich kann nicht‘, lange Toilettengänge, Krankmeldungen häufen sich",
        "Leistungsabfall trotz unveränderter Begabung"
      ],
      hilft:[
        "Verständnis und Validierung: die Angst ernst nehmen, nicht bagatellisieren – aber auch nicht dramatisieren.",
        "Konkretisieren: gemeinsam herausfinden, was genau Angst auslöst (Auftritt vor Klasse? Sportumkleide? Mathestunde?).",
        "Kleinschrittige Annäherung statt vollständiger Vermeidung. Vermeidung verstärkt Angst langfristig.",
        "Kooperation mit der Schule (Klassenleitung, Schulsozialarbeit, ggf. schulpsychologischer Dienst).",
        "Bei Andauern &gt; 4 Wochen oder ausgeprägten Beschwerden: kinder- und jugendpsychiatrische bzw. -psychotherapeutische Abklärung.",
        "Wirksam belegt: kognitiv-verhaltenstherapeutische Verfahren (KVT) – speziell als Goldstandard bei Angststörungen im Kindesalter."
      ],
      redflag:"Wenn dein Kind über mehrere Wochen nicht mehr zur Schule kann, sich stark zurückzieht, abnimmt, äußert ‚es wäre besser, ich wäre nicht da‘ oder selbstverletzendes Verhalten zeigt: bitte zeitnah fachliche Hilfe in Anspruch nehmen.",
      quellen:[
        {ref:"DGKJP / AWMF S3-Leitlinie", text:"Angststörungen im Kindes- und Jugendalter (Register-Nr. 028-022). Empfiehlt KVT als Verfahren erster Wahl."},
        {ref:"BZgA – Kindergesundheit-Info.de", text:"Elterninformation zu Angst, Schulangst und Schulvermeidung."},
        {ref:"COPSY-Studie, UKE Hamburg (Ravens-Sieberer et al., 2021–2023)", text:"Anstieg psychischer Auffälligkeiten und Schulängste während/ nach der Pandemie."}
      ]
    }
  },
  {
    id:"mobbing",
    title:"Mobbing in der Schule",
    area:"Schule",
    category:"Sozial",
    ageMin:6, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["ausgegrenzt","ärgern","gehänselt","gewalt schule","schikane","klasse außen vor"],
    summary:"Wiederholte, gezielte und einseitige Schädigung eines Kindes – körperlich, verbal oder durch Ausgrenzung.",
    body:{
      was:"Nach der Definition von Dan Olweus liegt Mobbing vor, wenn ein Kind <b>wiederholt</b> und <b>über längere Zeit</b> negativen Handlungen einer oder mehrerer Personen ausgesetzt ist und ein Ungleichgewicht der Kräfte besteht. Mobbing umfasst körperliche, verbale, relationale (Ausgrenzung, Gerüchte) und digitale Formen.",
      anzeichen:[
        "‚Verlorene‘ oder kaputte Sachen, blaue Flecken ohne plausible Erklärung",
        "Rückzug, plötzlicher Verlust von Freundschaften, ungerne in die Schule gehen",
        "Stimmungseinbruch, Reizbarkeit, Schlaf- und Essstörungen",
        "Schulleistungsabfall, Schwänzen, körperliche Symptome ohne organische Ursache",
        "Geheimnistuerei rund um das Handy / soziale Medien"
      ],
      hilft:[
        "Zuhören ohne Schuldzuweisung – Mobbing ist nie die Schuld des betroffenen Kindes.",
        "Vorfälle dokumentieren (was, wann, wer, Zeugen).",
        "Schule einbeziehen: Klassenleitung, Schulleitung, Schulsozialarbeit. Anti-Mobbing-Konzepte (z.&nbsp;B. ‚No Blame Approach‘, Olweus-Programm, Farsta-Methode) sind wissenschaftlich evaluiert.",
        "Das Kind nicht in ‚Schlagfertigkeitstrainings‘ drängen – Verantwortung liegt bei der Gruppe und den Erwachsenen.",
        "Externe Beratung: Polizeiliche Kriminalprävention der Länder, ‚Nummer gegen Kummer‘ (116 111), Schulpsychologischer Dienst."
      ],
      redflag:"Bei körperlicher Gewalt, Erpressung, sexualisiertem Mobbing oder wenn dein Kind Hoffnungslosigkeit/Suizidgedanken äußert: sofortige fachliche und ggf. polizeiliche Unterstützung.",
      quellen:[
        {ref:"Olweus, D. (1993; deutsche Ausgaben div.)", text:"‚Gewalt in der Schule‘ – grundlegende Definition und Präventionsprogramm."},
        {ref:"KiGGS-Welle 2 (RKI, 2018)", text:"Prävalenz von Mobbingerfahrungen bei Kindern und Jugendlichen in Deutschland."},
        {ref:"PISA 2018 – OECD", text:"Vergleichsdaten zu Mobbing-Erfahrungen 15-Jähriger."},
        {ref:"Bündnis gegen Cybermobbing e.V.", text:"Studie ‚Cyberlife‘ in Kooperation mit Techniker Krankenkasse."}
      ]
    }
  },
  {
    id:"cybermobbing",
    title:"Cybermobbing",
    area:"Medien",
    category:"Sozial",
    ageMin:9, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["whatsapp gruppe","instagram","tiktok hass","hate","fake account","peinliche fotos"],
    summary:"Wiederholte Diffamierung, Bloßstellung oder Ausgrenzung über digitale Kanäle (Chat, Social Media, Gaming).",
    body:{
      was:"Cybermobbing erweitert klassisches Mobbing in den digitalen Raum: WhatsApp-Gruppen, Klassen-Chats, Instagram, TikTok, Snapchat, Online-Spiele. Es findet rund um die Uhr statt, hat eine potenziell große Reichweite und Inhalte lassen sich schwer ‚löschen‘. Studien zeigen eine starke Überlappung mit Offline-Mobbing.",
      anzeichen:[
        "Heftige Reaktionen beim Blick aufs Smartphone (Tränen, Wut, Stummbleiben)",
        "Plötzlicher Rückzug aus Chats, Wechsel von Accounts oder Nicknames",
        "Schlafstörungen, Konzentrationsabfall, Vermeidung gemeinsamer Mahlzeiten",
        "Verheimlichen des Online-Verhaltens",
        "Ggf. psychosomatische Beschwerden (Bauch, Kopf, Übelkeit)"
      ],
      hilft:[
        "Beweise sichern: Screenshots inkl. Datum, URL/Nutzername.",
        "Inhalte melden &amp; blockieren: Plattformen reagieren auf Meldungen, Klassenleitung &amp; Schule informieren.",
        "Bei strafrechtlich relevanten Inhalten (Beleidigung, Bedrohung, Verbreitung intimer Bilder &sect;201a StGB): Anzeige bei der Polizei möglich.",
        "Medienkompetenz fördern: gemeinsame Regeln, Privatsphäre-Einstellungen, ‚digitale Pause‘ vor dem Schlaf.",
        "Anlaufstellen: ‚juuuport‘ (Peer-Beratung), ‚klicksafe.de‘, ‚Nummer gegen Kummer‘."
      ],
      redflag:"Bei sexualisierten Inhalten, geteilten intimen Bildern (sog. ‚Sextortion‘) oder akuter psychischer Belastung: zeitnah professionelle Hilfe – das ist <b>nie</b> die Schuld des Kindes.",
      quellen:[
        {ref:"Cyberlife-Studie IV (Bündnis gegen Cybermobbing &amp; TK, 2022)", text:"Etwa jede/r sechste Schüler:in in Deutschland berichtet eigene Erfahrung mit Cybermobbing."},
        {ref:"JIM-Studie (mpfs, jährlich)", text:"Mediennutzungs- und Belastungsdaten 12–19-Jähriger."},
        {ref:"klicksafe.de (EU-Initiative)", text:"Praxisleitfäden für Eltern, Schulen und Jugendliche."}
      ]
    }
  },
  {
    id:"trotz",
    title:"Trotzphase &amp; Wutanfälle (Autonomiephase)",
    area:"Familie",
    category:"Verhalten",
    ageMin:1, ageMax:5,
    genders:["weiblich","männlich","divers"],
    tags:["wutausbruch","schreien","schreien boden","auf boden werfen","brüllen","ich will allein"],
    summary:"Normaler Entwicklungsschritt: Das Kind erlebt sich als eigenständig – und stößt an Grenzen, die es noch nicht regulieren kann.",
    body:{
      was:"Was umgangssprachlich ‚Trotz‘ heißt, ist entwicklungspsychologisch eine <b>Autonomie- bzw. Selbstbehauptungsphase</b>, typischerweise zwischen 18 Monaten und ca. 4 Jahren. Das Gehirn (v.&nbsp;a. der präfrontale Kortex) ist in diesem Alter noch nicht in der Lage, starke Emotionen zu regulieren. Wutanfälle sind <b>kein</b> Zeichen schlechter Erziehung, sondern ein Zeichen, dass das Kind heftig fühlt und noch nicht weiß, wohin damit.",
      anzeichen:[
        "Schnelle Wechsel zwischen Wut, Traurigkeit, Lachen",
        "Körperliche Entladung: schreien, sich werfen, treten, beißen",
        "Häufungen in Übergangssituationen (Anziehen, Kita-Bringen, Schlafengehen)",
        "Häufung bei Hunger, Müdigkeit, Reizüberflutung"
      ],
      hilft:[
        "Eigene Co-Regulation: ruhig bleiben, tief atmen, in Augenhöhe gehen. Das Kind kann sich erst beruhigen, wenn ein erwachsenes Nervensystem ‚Halt‘ gibt (Bindungs-/Bindungsforschung Grossmann &amp; Grossmann).",
        "Gefühl benennen: ‚Du bist wütend, weil…‘ – Worte helfen, das Erleben zu sortieren.",
        "Grenzen freundlich und klar halten. Nicht jede Grenze muss verhandelt werden, aber sie wird nicht beleidigend ‚durchgezogen‘.",
        "Vorhersehbare Strukturen, ausreichend Schlaf und Pausen reduzieren Eskalationen.",
        "Nach dem Sturm: kein moralischer Vortrag – kurze Reflexion, dann verbinden."
      ],
      redflag:"Wenn Wutanfälle täglich &gt; 30–45 Minuten dauern, mit massiver Selbst- oder Fremdverletzung einhergehen, das Kind nach dem 5./6. Geburtstag in Häufigkeit/Heftigkeit unverändert bleibt oder es im Alltag stark einschränkt: kinderärztliche Abklärung empfehlenswert.",
      quellen:[
        {ref:"Remo H. Largo, „Babyjahre“ &amp; „Kinderjahre“", text:"Entwicklungspsychologisches Grundlagenwerk (Piper, aktuelle Auflagen)."},
        {ref:"Grossmann, K. &amp; Grossmann, K.E. (2012)", text:"„Bindungen – das Gefüge psychischer Sicherheit“, Klett-Cotta."},
        {ref:"Siegel, D. J. &amp; Bryson, T. P.", text:"„The Whole-Brain Child“ – Co-Regulation als Grundlage emotionaler Selbstregulation."}
      ]
    }
  },
  {
    id:"trennungsangst",
    title:"Trennungsangst",
    area:"Familie",
    category:"Angst",
    ageMin:0, ageMax:8,
    genders:["weiblich","männlich","divers"],
    tags:["fremdeln","klammern","kita bringen","mama nicht gehen","schreien beim abschied"],
    summary:"Starke Belastung beim Getrenntsein von engen Bezugspersonen – entwicklungstypisch oder darüber hinaus anhaltend.",
    body:{
      was:"Trennungsangst gehört bis etwa zum 3.–4. Lebensjahr zur normalen Entwicklung (‚Fremdeln‘ ab ca. 8 Monaten). Belastet sie das Kind im Schul- bzw. Vorschulalter erheblich und über mehrere Wochen, kann eine <b>Trennungsangststörung</b> (ICD-11 6B05) vorliegen.",
      anzeichen:[
        "Heftiges Weinen, Klammern, Bauchschmerzen vor Trennung",
        "Sorgen, dass Bezugsperson etwas zustößt",
        "Albträume mit Trennungsthematik",
        "Schulverweigerung mit klarem Trennungsbezug",
        "Wiederkehrende körperliche Beschwerden bei Trennung"
      ],
      hilft:[
        "Ankündigung statt heimlicher Abschiede – Verlässlichkeit baut Sicherheit.",
        "Kurzes, klares Abschiedsritual; nicht in die Länge ziehen.",
        "Übergangsobjekte (Kuscheltier, Foto) zulassen.",
        "Behutsame Eingewöhnung nach <b>Berliner Eingewöhnungsmodell</b> bzw. <b>Münchener Modell</b>.",
        "Schritt für Schritt üben (graduelle Exposition), Vermeidung nicht zur Dauerlösung machen.",
        "Bei deutlicher Beeinträchtigung &gt; 4 Wochen: kinder- und jugendpsychotherapeutische Abklärung; KVT ist Verfahren erster Wahl."
      ],
      redflag:"Wenn das Kind aufgrund der Trennungsangst kaum noch in Kita/Schule kann, körperlich abbaut oder sich völlig zurückzieht: fachlich abklären lassen.",
      quellen:[
        {ref:"AWMF S3-Leitlinie 028-022", text:"Angststörungen bei Kindern und Jugendlichen (DGKJP)."},
        {ref:"WHO ICD-11", text:"Diagnostische Kriterien Trennungsangststörung 6B05."},
        {ref:"INFANS / Laewen, Andres &amp; Hédervári", text:"Berliner Eingewöhnungsmodell – Standard in vielen Kitas."}
      ]
    }
  },
  {
    id:"pruefungsangst",
    title:"Prüfungsangst",
    area:"Schule",
    category:"Angst",
    ageMin:9, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["klassenarbeit","blackout","abitur","zentrale prüfung","note schlecht","prüfungsstress"],
    summary:"Ausgeprägte Angst vor Leistungssituationen mit körperlichen, gedanklichen und Verhaltenssymptomen.",
    body:{
      was:"Prüfungsangst ist eine spezifische Form sozialer Bewertungsangst. Sie tritt typischerweise verstärkt ab der Sekundarstufe auf und kann die tatsächliche Leistung deutlich unter dem Niveau halten, das das Kind eigentlich hat (sog. ‚Underachievement‘).",
      anzeichen:[
        "Körperlich: Herzklopfen, Zittern, Schwitzen, Magenbeschwerden",
        "Kognitiv: Blackout, Grübeln, katastrophisierende Gedanken (‚Ich falle durch, alles ist vorbei‘)",
        "Verhalten: Vermeidung, Aufschieben, exzessives Lernen, Kontrolle",
        "Schlaf- und Appetitstörungen vor Prüfungen"
      ],
      hilft:[
        "Realistisches Reframing der Prüfung (‚eine Momentaufnahme‘) – Eltern als entlastende Stimme, nicht als zusätzlicher Druck.",
        "Lerntechniken: aktives Abrufen, Spaced Repetition, klare Strukturen statt nächtlicher Marathons (kognitionspsychologisch belegt).",
        "Atem- und Entspannungstechniken (4-7-8-Atmung, progressive Muskelentspannung nach Jacobson).",
        "Bei starker Angst: KVT-basierte Programme wie ‚Mutig werden mit Til Tiger‘ (für Jüngere) oder ‚THAVT‘ (Therapieprogramm für Angst).",
        "Schulpsychologischer Dienst bietet kostenfreie Beratung."
      ],
      quellen:[
        {ref:"Schwarzer, R. &amp; Jerusalem, M.", text:"Forschung zu Selbstwirksamkeit und Leistungsangst."},
        {ref:"AWMF S3-Leitlinie 028-022", text:"Angststörungen bei Kindern und Jugendlichen."},
        {ref:"Suhr-Dachs &amp; Petermann", text:"Therapieprogramm für Kinder und Jugendliche mit Angst- und Zwangsstörungen (Hogrefe)."}
      ]
    }
  },
  {
    id:"soziale-aengste",
    title:"Soziale Ängste &amp; Schüchternheit",
    area:"Übergreifend",
    category:"Angst",
    ageMin:4, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["schüchtern","stumm","selektiver mutismus","keine freunde","keine party","vor publikum"],
    summary:"Anhaltende Furcht vor sozialer Bewertung; Schüchternheit ist eine Eigenart, soziale Phobie eine Belastung.",
    body:{
      was:"Schüchternheit ist ein Temperamentsmerkmal und in sich nicht behandlungsbedürftig (Kagan-Forschung zu ‚behavioral inhibition‘). Erst wenn die Angst vor sozialen Situationen das Kind anhaltend belastet und einschränkt, spricht man von <b>sozialer Phobie</b> (ICD-11 6B04). Eine besondere Form ist der <b>selektive Mutismus</b>: Kinder sprechen in bestimmten Situationen (z.&nbsp;B. Kita/Schule) nicht, obwohl sie es können.",
      anzeichen:[
        "Erröten, Schwitzen, Zittern bei sozialer Beobachtung",
        "Vermeidung von Wortmeldungen, Vorlesen, Vorträgen",
        "Wenig oder keine Freundschaften – obwohl das Kind sich welche wünscht",
        "Bei selektivem Mutismus: anhaltendes Schweigen außerhalb der engen Familie &gt; 1 Monat (DSM-5)"
      ],
      hilft:[
        "Den Charakter nicht ändern wollen – Selbstwert nicht an Extraversion knüpfen.",
        "Kleine soziale Schritte erfolgreich üben (graduelle Exposition).",
        "Schulische Anpassungen (z.&nbsp;B. zunächst keine mündliche Note bei Mutismus, schriftliche Alternativen).",
        "Bei selektivem Mutismus: <b>spezialisierte verhaltenstherapeutische</b> Behandlung – je früher, desto besser (DGKJP-Empfehlung).",
        "Kompetenztrainings wie ‚Sei kein Frosch‘, ‚THAVT‘, ‚Trau dich!‘."
      ],
      quellen:[
        {ref:"Kagan, J. (Harvard)", text:"Forschung zu temperamentsbedingter Verhaltenshemmung (‚behavioral inhibition‘)."},
        {ref:"AWMF S3-Leitlinie 028-027", text:"Selektiver Mutismus im Kindes- und Jugendalter (DGKJP)."},
        {ref:"Petermann, U. (2018)", text:"Soziale Angst bei Kindern – Diagnostik und Behandlung. Hogrefe."}
      ]
    }
  },
  {
    id:"geschwister",
    title:"Geschwisterrivalität &amp; Eifersucht",
    area:"Familie",
    category:"Sozial",
    ageMin:2, ageMax:14,
    genders:["weiblich","männlich","divers"],
    tags:["streit","baby kommt","neid","zweites kind","ungerecht","mama liebt"],
    summary:"Streit, Konkurrenz und Eifersucht zwischen Geschwistern sind normaler Teil von Beziehung – und brauchen Begleitung statt Bewertung.",
    body:{
      was:"Geschwister sind die längste Beziehung im Leben eines Menschen – und ein lebenslanger ‚Trainingsplatz‘ für Konfliktfähigkeit. Eifersucht beim Älteren entsteht oft, wenn die Position als Einzelkind/erstes Kind sich verändert; sie ist <b>kein</b> Erziehungsversagen.",
      anzeichen:[
        "Regression beim Älteren (wieder einnässen, Schnuller wollen, Babysprache)",
        "Körperliche Übergriffe, ‚Unfälle‘ zwischen den Kindern",
        "Übermäßiges Anpassen oder Verschwinden des Älteren",
        "Heftige Konflikte um vermeintliche Ungerechtigkeit"
      ],
      hilft:[
        "Den Konflikt nicht ständig schlichten – Kinder lernen Streiten <b>im</b> Streit. Eingreifen bei körperlicher oder seelischer Verletzung.",
        "Jedem Kind exklusive ‚Bezugszeit‘ ohne Geschwister einräumen – auch 10 Minuten täglich reichen.",
        "Vergleiche („Schau wie schön deine Schwester…“) vermeiden – sie verfestigen Rivalität.",
        "‚Gleichberechtigt heißt nicht identisch‘: nicht jedes Kind braucht zur gleichen Zeit dasselbe.",
        "Faber &amp; Mazlish („Hilfe, meine Kinder streiten“) bietet konkrete Sprachformeln."
      ],
      quellen:[
        {ref:"Faber, A. &amp; Mazlish, E. (2013)", text:"„Hilfe, meine Kinder streiten“ – kommunikationsbasierter Ansatz, Oberstebrink Verlag."},
        {ref:"Kasten, H. (Staatsinstitut für Frühpädagogik IFP)", text:"Forschung zu Geschwisterbeziehungen."},
        {ref:"Juul, J.", text:"„Mein kompetentes Kind“ – Konzept gleichwürdiger Beziehung."}
      ]
    }
  },
  {
    id:"adhs",
    title:"Aufmerksamkeit, Unruhe, Verdacht auf ADHS",
    area:"Übergreifend",
    category:"Entwicklung",
    ageMin:5, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["zappelig","kann nicht stillsitzen","träumer","impulsiv","unkonzentriert","konzentration"],
    summary:"Unruhe und Aufmerksamkeitsprobleme können viele Ursachen haben – ADHS ist eine davon und nur durch Fachpersonen diagnostizierbar.",
    body:{
      was:"ADHS (Aufmerksamkeitsdefizit-/Hyperaktivitätsstörung) ist eine in der Kindheit beginnende neurobiologische Entwicklungsstörung mit unaufmerksamen, hyperaktiven und/oder impulsiven Symptomen, die <b>in mehreren Lebensbereichen</b> seit mehr als 6 Monaten beeinträchtigen. Mädchen werden häufig erst spät erkannt, da sie öfter den ‚unaufmerksam-träumerischen‘ Typ zeigen.",
      anzeichen:[
        "Schnelle Ablenkbarkeit, häufige Flüchtigkeitsfehler",
        "Schwierigkeiten, Aufgaben zu Ende zu führen, ‚vergisst‘ Dinge",
        "Innere und/oder äußere Unruhe, ständiges Bewegungsbedürfnis",
        "Impulsivität: dazwischenreden, schwer abwarten können",
        "Beeinträchtigung in <b>mindestens zwei</b> Lebensbereichen (z.&nbsp;B. Schule &amp; Familie)"
      ],
      hilft:[
        "Diagnostik nur durch Kinder- und Jugendpsychiater:in/-psychotherapeut:in oder spezialisierte Kinderärzt:in. Nie per Online-Test.",
        "Klare Strukturen, sichtbare Tagesabläufe, kurze Aufgabenpakete, Bewegungspausen.",
        "Lob für Mühe statt nur Ergebnis; Stärken nutzen.",
        "Wirksamkeit belegt: multimodale Behandlung aus Psychoedukation, Verhaltenstherapie, ggf. Medikation (ab 6 Jahren); siehe S3-Leitlinie.",
        "Schulische Nachteilsausgleiche möglich – Diagnose erforderlich."
      ],
      redflag:"Selbst- oder Fremdgefährdung, schwere Schulprobleme, soziale Ausgrenzung: zeitnahe fachliche Abklärung suchen.",
      quellen:[
        {ref:"AWMF S3-Leitlinie 028-045", text:"ADHS bei Kindern, Jugendlichen und Erwachsenen (DGKJP &amp; Beteiligte)."},
        {ref:"Döpfner, M., Frölich, J., Lehmkuhl, G.", text:"Therapieprogramme THOP / SELBST (Hogrefe)."},
        {ref:"Banaschewski, T. et al.", text:"Übersichtsarbeiten zu ADHS, Deutsches Ärzteblatt."}
      ]
    }
  },
  {
    id:"schlaf",
    title:"Schlafprobleme bei Kindern",
    area:"Familie",
    category:"Körper",
    ageMin:0, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["einschlafen","nachts aufwachen","albtraum","nicht im eigenen bett","schlafwandeln","durchschlafen"],
    summary:"Schlaf ist Entwicklung: Kinder müssen Schlafen <b>lernen</b>. Probleme sind häufig und meist gut beeinflussbar.",
    body:{
      was:"Schlafprobleme sind bei Kindern sehr verbreitet (KiGGS: ca. 14&nbsp;% mit relevanten Schlafproblemen). Säuglinge wachen biologisch mehrfach pro Nacht – Durchschlafen ist eine Reifungsleistung, kein Erziehungsziel. Häufige Themen: Einschlafprobleme, nächtliches Aufwachen, Albträume, Pavor nocturnus (Nachtschreck), Schlafwandeln.",
      anzeichen:[
        "Lange Einschlafzeiten (&gt; 30 Min) über Wochen",
        "Mehrfach nächtliches Wachsein, das die Familie erschöpft",
        "Tagesmüdigkeit, Konzentrationsprobleme, Reizbarkeit",
        "Atemaussetzer / Schnarchen (Hinweis auf evtl. obstruktive Schlafapnoe – Kinderarzt!)"
      ],
      hilft:[
        "Schlafhygiene: gleichbleibende Zubettgehzeit, dunkles, kühles Zimmer, Bildschirmpause &gt; 60 Min vor dem Schlaf (BZgA).",
        "Konstantes Einschlafritual (Bad – Buch – Licht aus): ca. 20–30 Min.",
        "Co-Sleeping bzw. Bedside-Cot in den ersten Lebensjahren ist <b>sicher</b>, wenn Safer-Sleep-Regeln eingehalten werden (Rückenlage, schlafsack, keine Daunen, kein Rauch). Familienbett ist eine bewusste Entscheidung – nicht ‚Erziehungsfehler‘.",
        "Nachtschreck: nicht wecken, absichern, abwarten – nach 5–15 Min vorbei.",
        "Bei Verdacht auf Schlafapnoe, Restless Legs, Narkolepsie oder anhaltender Belastung: kinder- bzw. schlafmedizinische Abklärung."
      ],
      quellen:[
        {ref:"KiGGS-Welle 2 (RKI)", text:"Schlafgewohnheiten von Kindern und Jugendlichen in Deutschland."},
        {ref:"AWMF S1-Leitlinie 063-003", text:"Nichtorganische Schlafstörungen im Kindes- und Jugendalter."},
        {ref:"Schlarb, A. A.", text:"Programme „Mini-KiSS“ (Kleinkinder) &amp; „KiSS“ (Schulkinder), Hogrefe."}
      ]
    }
  },
  {
    id:"enuresis",
    title:"Einnässen (Enuresis)",
    area:"Familie",
    category:"Körper",
    ageMin:5, ageMax:12,
    genders:["weiblich","männlich","divers"],
    tags:["bettnässen","nachts nass","tags einnässen","windel nachts"],
    summary:"Einnässen ab dem 5. Geburtstag ist ein häufiges, gut behandelbares medizinisches Thema – nicht ‚Faulheit‘.",
    body:{
      was:"Etwa 10&nbsp;% der 7-Jährigen und 5&nbsp;% der 10-Jährigen nässen nachts ein. Man unterscheidet die <b>primäre Enuresis nocturna</b> (Kind war noch nie 6 Monate am Stück trocken) und die <b>sekundäre Enuresis</b> (nach mind. 6 Monaten Trockenheit erneutes Einnässen). Häufig liegt eine Reifungsverzögerung der Blasenkontrolle vor; eine genetische Komponente ist gut belegt.",
      anzeichen:[
        "Nasse Nächte mind. 1×/Monat &gt; 3 Monate ab dem 5. Geburtstag",
        "Manchmal zusätzlich Symptome am Tag (Drang, Aufschieben, Einnässen)",
        "Begleitend manchmal Verstopfung"
      ],
      hilft:[
        "Entlasten: Einnässen ist keine Erziehungsfrage und kein Trotz. Strafe oder Beschämung verschlechtern die Lage und das Selbstwertgefühl.",
        "Trinkverhalten gleichmäßig über den Tag, am Abend reduzieren – aber nicht ‚durstig ins Bett‘.",
        "Toilettentraining: 5–7&times;/Tag entspanntes Sitzen, Verstopfung behandeln.",
        "Apparative Verhaltenstherapie (Klingelhose/Klingelmatte) ist <b>Mittel erster Wahl</b> bei Enuresis nocturna (S2k-Leitlinie).",
        "Medikamentös: Desmopressin in ausgewählten Fällen, durch Fachärzt:innen verordnet.",
        "Kinder- und Jugendurolog:innen bzw. spezialisierte Kinderärzt:innen geben individuell die beste Empfehlung."
      ],
      quellen:[
        {ref:"AWMF S2k-Leitlinie 028-026", text:"Enuresis und nicht-organische Harninkontinenz bei Kindern und Jugendlichen."},
        {ref:"Internationale Kinderkontinenzgesellschaft (ICCS)", text:"Standards der Diagnostik und Therapie."},
        {ref:"Equit, M. &amp; von Gontard, A.", text:"Forschung und Therapieprogramme (Hogrefe)."}
      ]
    }
  },
  {
    id:"essprobleme",
    title:"Essprobleme bei kleinen Kindern",
    area:"Familie",
    category:"Körper",
    ageMin:1, ageMax:8,
    genders:["weiblich","männlich","divers"],
    tags:["wählerisch","mag nichts","nichts essen","schlechter esser","kleiner esser","picky eater"],
    summary:"Wählerisches Essen ist in vielen Familien Alltag – meist eine Entwicklungsphase, selten ein medizinisches Problem.",
    body:{
      was:"Bis zu 50&nbsp;% der Kleinkinder zeigen zeitweise wählerisches Essverhalten (‚Picky Eating‘). Das ist meist eine entwicklungstypische Phase mit Neophobie (Misstrauen gegenüber Neuem). Sie endet bei den meisten Kindern bis zum Grundschulalter.",
      anzeichen:[
        "Bevorzugung weniger Lebensmittel, Ablehnung neuer Speisen",
        "Längere Mahlzeiten, viel ‚spielen‘ am Tisch",
        "Stabiles Gewicht, gesunde Entwicklung trotz scheinbar wenig Essen"
      ],
      hilft:[
        "Aufgabenteilung nach <b>Ellyn Satter</b>: Eltern entscheiden <b>was, wann, wo</b> gegessen wird – Kind entscheidet <b>ob</b> und <b>wie viel</b>.",
        "Neues Lebensmittel kann 10–15 Kontakte brauchen, bevor es akzeptiert wird.",
        "Keine ‚Belohnungs- oder Strafenspiele‘ am Essenstisch, kein Druck.",
        "Gemeinsame, ruhige Mahlzeiten, beim Kochen einbeziehen.",
        "Bei Gewichtsstillstand, anhaltender Verweigerung ganzer Nahrungsgruppen, Würgen/Erbrechen oder bei sehr selektivem Essen mit Mangel: kinderärztliche Abklärung (ggf. ARFID, sensorische Verarbeitung)."
      ],
      quellen:[
        {ref:"Satter, E.", text:"„Division of Responsibility in Feeding“ – etablierter pädagogischer Standard."},
        {ref:"WHO &amp; ESPGHAN", text:"Empfehlungen zu Beikost und Familientisch."},
        {ref:"Netzwerk Junge Familie / BZfE", text:"Bundeszentrum für Ernährung – Elterninformationen."}
      ]
    }
  },
  {
    id:"medien",
    title:"Bildschirmzeit &amp; problematische Mediennutzung",
    area:"Medien",
    category:"Medien",
    ageMin:2, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["handysucht","tiktok","zocken","gaming","screen time","tablet","youtube"],
    summary:"Nicht ‚wie viel‘ ist die wichtigste Frage, sondern ‚was, wann, mit wem und auf wessen Kosten‘.",
    body:{
      was:"Studien (u.&nbsp;a. BLIKK-Medien-Studie 2017, DAK-Studie Mediensucht) zeigen, dass exzessive Mediennutzung mit Schlaf-, Konzentrations- und sozial-emotionalen Problemen einhergeht. Gleichzeitig sind Medien Teil moderner Sozialisation. Ziel ist <b>kompetenter</b>, nicht ‚null‘ Medienkonsum.",
      anzeichen:[
        "Schwierigkeiten, Geräte freiwillig zu beenden – heftige Reaktionen",
        "Vernachlässigung von Schlaf, Schule, analogen Hobbys, Freundschaften",
        "Heimlicher Konsum, Verheimlichen der Nutzungszeit",
        "Stimmungsschwankungen rund um Spiele/Plattformen"
      ],
      hilft:[
        "Orientierung an den Empfehlungen der BZgA / DGKJ: U3 möglichst keine Bildschirmzeit; U6 max. ca. 30 Min/Tag mit Begleitung; Grundschule schrittweise; Jugend gemeinsame Regeln statt Verbot.",
        "Bildschirmfreie Zonen: Schlafzimmer, Esstisch, erste/letzte Stunde des Tages.",
        "Mediennutzungsvertrag (z.&nbsp;B. von ‚klicksafe.de‘ &amp; ‚mediennutzungsvertrag.de‘).",
        "Vorbild Eltern – die eigene Bildschirmzeit reflektieren.",
        "Bei Verdacht auf Mediensucht: spezialisierte Beratungsstellen, Suchtberatung. ICD-11 kennt ‚Gaming Disorder‘ (6C51)."
      ],
      quellen:[
        {ref:"BLIKK-Medien-Studie (2017, Drogenbeauftragte der Bundesregierung)", text:"Auswirkungen digitaler Medien auf kindliche Entwicklung."},
        {ref:"DAK-Studie ‚Mediensucht‘", text:"Längsschnittdaten zu problematischer Nutzung von Social Media &amp; Gaming."},
        {ref:"JIM-/KIM-Studien (mpfs)", text:"Jährliche Repräsentativdaten zur Mediennutzung."},
        {ref:"klicksafe.de", text:"EU-Initiative für sichere Internetnutzung."}
      ]
    }
  },
  {
    id:"trauer",
    title:"Trauer &amp; Verlust",
    area:"Familie",
    category:"Krise",
    ageMin:3, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["todesfall","oma gestorben","haustier tod","verlust","abschied"],
    summary:"Kinder trauern anders – in Wellen, oft scheinbar ‚nebenbei‘. Begleitung statt Erklärungslogik.",
    body:{
      was:"Trauer ist keine Krankheit, sondern ein gesunder Anpassungsprozess. Kinder trauern entwicklungsabhängig: Bis ca. 5 Jahre verstehen sie Tod oft als ‚umkehrbar‘. Erst ab ca. 9–10 Jahren wird Tod als endgültig, unausweichlich und universell begriffen. Trauer zeigt sich oft <b>indirekt</b>: Schlaf, Verhalten, Schule, Körper.",
      anzeichen:[
        "Plötzliche Stimmungswechsel zwischen Spielen und Weinen",
        "Schlaf- und Essprobleme, körperliche Beschwerden",
        "Aggression, Konzentrationsprobleme, Rückzug",
        "Magisches Denken / Schuldgefühle (‚Wäre ich lieber gewesen, würde Oma noch leben‘)"
      ],
      hilft:[
        "Ehrliche, klare Worte (‚gestorben‘ statt ‚eingeschlafen‘ – Letzteres kann Schlafangst auslösen).",
        "Rituale, Erinnerungen sichtbar lassen (Fotos, gemeinsames Erinnern).",
        "Beerdigung: nicht zwingen, aber nicht ausschließen. Kinder dürfen mitentscheiden.",
        "Eigene Trauer der Eltern zeigen – sie ist Modell.",
        "Kinder-Trauergruppen, z.&nbsp;B. ‚Trauerland‘, ‚Lacrima‘, ‚Hospizvereine‘.",
        "Wenn nach mehreren Monaten ein deutlicher Stillstand oder Verschlechterung erkennbar ist: kinder-/jugendpsychotherapeutische Begleitung."
      ],
      quellen:[
        {ref:"Worden, J. W.", text:"„Kinder und Trauer“ – Standardwerk zur Trauerbegleitung (Springer)."},
        {ref:"Bundesverband Trauerbegleitung e.V.", text:"Empfehlungen zur Begleitung trauernder Kinder."},
        {ref:"AWMF S3-Leitlinie 051-029", text:"Prolongierte Trauerstörung im DSM-5-TR / ICD-11."}
      ]
    }
  },
  {
    id:"scheidung",
    title:"Trennung oder Scheidung der Eltern",
    area:"Familie",
    category:"Krise",
    ageMin:3, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["scheidung","trennung","papa zieht aus","besuchsregelung","umgangsrecht","patchwork"],
    summary:"Nicht die Trennung selbst, sondern <b>wie</b> Eltern sie gestalten, hat Einfluss auf das Kind.",
    body:{
      was:"Die Forschung (u.&nbsp;a. Längsschnittstudien von Walper, Schick und anderen) zeigt: Nicht die Trennung an sich macht Kinder krank, sondern <b>elterlicher Konflikt</b>. Kinder, deren Eltern getrennt, aber kooperativ bleiben, entwickeln sich überwiegend gut. Wichtig ist außerdem die Sicherheit beider Bindungen.",
      anzeichen:[
        "Schlafprobleme, Trennungsängste, Albträume",
        "Schulleistungsschwankungen, Konzentrationsprobleme",
        "Loyalitätskonflikte, Schuldgefühle",
        "Aggression, Rückzug oder ‚zu braves‘ Funktionieren"
      ],
      hilft:[
        "Klare, kindgerechte, nicht beschuldigende Information durch beide Elternteile (idealerweise gemeinsam).",
        "Wiederkehrende Botschaft: ‚Du bist nicht schuld. Wir lieben dich beide. Es ist nichts, was du regeln musst.‘",
        "Verlässliche Umgangsregelung, stabile Übergänge.",
        "Den anderen Elternteil <b>nicht</b> vor dem Kind abwerten.",
        "Beratung: Jugendamt, Erziehungsberatungsstellen (kostenfrei, &sect;28 SGB VIII), Kinderschutzbund.",
        "Bei hochstrittiger Trennung: psychotherapeutische Begleitung des Kindes, ggf. familiengerichtliche Mediation."
      ],
      quellen:[
        {ref:"Walper, S. (DJI / LMU München)", text:"Forschung zu Familien nach Trennung und Scheidung."},
        {ref:"Bundeskonferenz für Erziehungsberatung (bke)", text:"Online-Beratung und Praxisempfehlungen."},
        {ref:"Cina, A., Bodenmann, G.", text:"Programm ‚Kinder im Blick‘ – evaluiertes Kursangebot für getrennte Eltern."}
      ]
    }
  },
  {
    id:"aggression",
    title:"Aggressives Verhalten",
    area:"Übergreifend",
    category:"Verhalten",
    ageMin:4, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["hauen","beißen","schlagen","schimpfwörter","wut","kämpft","prügelei"],
    summary:"Aggression hat fast immer eine Funktion: Schutz, Grenze, Überforderung, Bindungsruf.",
    body:{
      was:"Aggression ist Teil menschlicher Ausstattung. Bei Kindern ist sie oft Ausdruck eines unerfüllten Bedürfnisses oder einer Überforderung in der Selbstregulation. Häufige Bedeutungen: ‚Ich kann nicht mehr.‘ – ‚Ich werde überrollt.‘ – ‚Ich habe Angst.‘ – ‚Ich brauche dich.‘",
      anzeichen:[
        "Körperliche oder verbale Aggression in Streitsituationen",
        "Sachschäden, Tierquälerei (Warnzeichen)",
        "Geringe Frustrationstoleranz, schwer zu beruhigen",
        "Beeinträchtigung in Kita/Schule, Verlust von Freundschaften"
      ],
      hilft:[
        "Vor dem Erziehen verbinden: Sicherheit herstellen, dann lenken.",
        "Klare, freundliche Grenzen ohne Beschämung. Aggression nicht ‚wegerziehen‘, sondern <b>umlenken</b>.",
        "Trigger erkennen: Hunger, Müdigkeit, sensorische Überflutung, Bindungsbruch.",
        "Eltern als Vorbild emotionaler Regulation – nicht selbst eskalieren.",
        "Wenn Aggression häufig, intensiv und situationsübergreifend ist: kinderärztliche/-psychiatrische Abklärung (Differentialdiagnose: ADHS, Trauma, Bindungsstörung, Autismus-Spektrum, oppositionelle Störung).",
        "Evaluierte Programme: ‚Triple P‘, ‚Faustlos‘, ‚THOP‘, ‚Coping Power‘."
      ],
      redflag:"Bei wiederholter schwerer Aggression gegen Kinder/Tiere/Erwachsene, Feuer-/Sachbeschädigung, oder wenn dich dein Kind ernsthaft verletzt: fachliche Unterstützung suchen.",
      quellen:[
        {ref:"Petermann, F. &amp; Petermann, U.", text:"Therapieprogramme zu sozial-emotionaler Entwicklung (Hogrefe)."},
        {ref:"AWMF S3-Leitlinie 028-020", text:"Störung des Sozialverhaltens im Kindes- und Jugendalter."},
        {ref:"Sanders, M. R. (UQ)", text:"Triple P – Positive Parenting Program, international evaluiert."}
      ]
    }
  },
  {
    id:"selbstwert",
    title:"Geringes Selbstwertgefühl",
    area:"Übergreifend",
    category:"Sozial",
    ageMin:6, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["ich bin doof","ich kann nichts","blöd","traut sich nichts","selbstbewusstsein"],
    summary:"Selbstwert entsteht aus erlebter Wirksamkeit und bedingungsloser Annahme – nicht aus Lob.",
    body:{
      was:"Selbstwert ist die innere Bewertung der eigenen Person. Er ist nicht angeboren, sondern entwickelt sich durch Beziehung und Erfahrung. Sätze wie „Ich bin dumm“ sind selten Wahrheit, oft Schutz vor Enttäuschung.",
      anzeichen:[
        "Häufige Selbstabwertung („Ich bin doof“)",
        "Aufgaben vermeiden, aus Angst zu scheitern",
        "Überanpassung („ich darf keinen Fehler machen“)",
        "Vergleiche mit anderen, Eifersucht auf Geschwister/Freunde",
        "Empfindlichkeit gegenüber Kritik, Rückzug"
      ],
      hilft:[
        "Nicht das Ergebnis loben, sondern <b>Anstrengung, Strategie, Mut</b> (Carol Dweck: ‚growth mindset‘).",
        "Reale Wirksamkeit ermöglichen: kleine, alltägliche Verantwortung (Tisch decken, Geschwister tröstet).",
        "Negative Selbstgespräche umlenken („Du bist nicht dumm – diese Aufgabe ist schwer. Was hilft dir gerade?“).",
        "Eltern reflektieren eigene Bewertungsmuster: was sage ich über mich selbst, vor meinem Kind?",
        "Bei tiefem, anhaltendem Leiden, Hoffnungslosigkeit oder selbstabwertenden Aussagen mit Suizidbezug: psychotherapeutische Hilfe."
      ],
      quellen:[
        {ref:"Dweck, C. S. (2006)", text:"„Mindset – The New Psychology of Success“ – Forschung zu Selbstbild und Lernen."},
        {ref:"Schneewind, K. A.", text:"Familienpsychologische Forschung zu Selbstwertentwicklung."},
        {ref:"Asendorpf, J.", text:"Persönlichkeitsentwicklung im Kindes- und Jugendalter."}
      ]
    }
  },
  {
    id:"schulverweigerung",
    title:"Schulverweigerung &amp; Schulabsentismus",
    area:"Schule",
    category:"Krise",
    ageMin:6, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["geht nicht zur schule","schwänzen","nicht aufstehen","schulvermeidung","verweigerung"],
    summary:"Wenn ein Kind nicht mehr in die Schule kann, hat das fast immer eine ernste Ursache – kein „Faulheitsproblem“.",
    body:{
      was:"Schulabsentismus wird unterschieden in: <b>angstbedingtes Schulvermeiden</b> (z.&nbsp;B. soziale Angst, Trennungsangst), <b>Schwänzen</b> (oft im Peerkontext, ohne Wissen der Eltern) und <b>Zurückhalten</b> durch Eltern. Ursachen sind häufig kombiniert.",
      anzeichen:[
        "Wiederholte, oft kurzfristige ‚Krankmeldungen‘",
        "Morgens nicht aus dem Bett kommen, körperliche Beschwerden, die im Lauf des Vormittags verschwinden",
        "Lange Fehlzeiten, häufige Wechsel von Befindlichkeiten",
        "Ggf. heimliches Fehlen ohne Wissen der Eltern"
      ],
      hilft:[
        "Frühzeitig handeln. Je länger ein Kind nicht in der Schule ist, desto schwerer fällt die Rückkehr.",
        "Ursachen verstehen: Liegt eine Angst, Mobbing, Depression, eine Lernstörung, eine familiäre Krise vor?",
        "Eng mit der Schule kooperieren – nicht erst, wenn es eskaliert. Schulpsychologischer Dienst, Schulsozialarbeit einbeziehen.",
        "Strukturiertes, stufenweises Wiedereinstiegskonzept (oft in Kooperation mit Therapie und Schule).",
        "Behandlung der zugrunde liegenden Störung (Angst, Depression, soziale Phobie etc.)."
      ],
      redflag:"Wenn die Schulvermeidung mit Hoffnungslosigkeit, Suizidgedanken, ausgeprägter Depression oder Verdacht auf Mobbing einhergeht: zeitnah Kinder- und Jugendpsychiatrie aufsuchen.",
      quellen:[
        {ref:"Lehmkuhl, U., Knollmann, M. et al.", text:"Forschung zu Schulabsentismus, Kinder- und Jugendpsychiatrie Essen."},
        {ref:"AWMF S3-Leitlinie 028-022 / 028-043", text:"Angststörungen / Depression im Kindes- und Jugendalter."},
        {ref:"KMK-Empfehlungen", text:"Umgang mit Schulpflichtverletzungen und -gefährdungen."}
      ]
    }
  },
  {
    id:"eingewoehnung",
    title:"Kita-Eingewöhnung",
    area:"Kita",
    category:"Entwicklung",
    ageMin:1, ageMax:4,
    genders:["weiblich","männlich","divers"],
    tags:["kita start","krippe","trennung kita","weinen abgeben","eingewöhnung","neue erzieherin"],
    summary:"Eingewöhnung ist ein Bindungsthema, kein „Loslass-Wettbewerb“. Sicherheit zuerst, Tempo nach dem Kind.",
    body:{
      was:"Der Übergang in die Kita ist ein Bindungs- und Entwicklungssprung. Etablierte Modelle: <b>Berliner Eingewöhnungsmodell</b> (INFANS, Laewen et al.) und <b>Münchener Modell</b> – beide setzen auf eine begleitete, schrittweise Annäherung. Ohne sichere Bindung an eine Fachkraft entwickelt sich das Kind in Stress, was Langzeitfolgen haben kann.",
      anzeichen:[
        "Klammern, Weinen, Bauchweh – meist normal, vor allem in den ersten Wochen",
        "Schlaf- und Appetitveränderungen",
        "Regression in anderen Bereichen (Sauberkeit, Sprache)",
        "Erschöpfung nach Kita-Tagen"
      ],
      hilft:[
        "Eingewöhnung nicht unter Zeitdruck planen. Mind. 2–4 Wochen einplanen.",
        "Eine konstante Bezugsperson bringt das Kind – kein häufiger Wechsel.",
        "Erst kurze Trennungen, wenn das Kind eine Fachkraft als sichere Basis akzeptiert.",
        "Klare Abschiede – keine ‚Geheim-rauschleicher‘.",
        "Eigene Sicherheit der Eltern überträgt sich. Eigene Ambivalenz wahrnehmen, aber nicht beim Abschied ‚abladen‘.",
        "Wenn nach 6–8 Wochen keine Stabilisierung gelingt: Gespräch mit der Einrichtung, ggf. Beratung im Familienzentrum / Erziehungsberatungsstelle."
      ],
      quellen:[
        {ref:"Laewen, H.-J., Andres, B., Hédervári, É.", text:"„Die ersten Tage – ein Modell zur Eingewöhnung in Krippe und Tagespflege“ (Beltz)."},
        {ref:"Grossmann, K. &amp; Grossmann, K. E.", text:"Bindungsforschung – Grundlage moderner Eingewöhnung."},
        {ref:"NUBBEK-Studie (2013)", text:"Nationale Untersuchung zur Bildung, Betreuung und Erziehung in der frühen Kindheit."}
      ]
    }
  },
  {
    id:"luegen",
    title:"Lügen, Mogeln, Stehlen",
    area:"Übergreifend",
    category:"Verhalten",
    ageMin:3, ageMax:12,
    genders:["weiblich","männlich","divers"],
    tags:["lügt","schwindelt","mogelt","klaut","stiehlt"],
    summary:"Lügen ist ein normaler kognitiver Meilenstein. Stehlen hat im Kindergartenalter eine andere Bedeutung als im Schulalter.",
    body:{
      was:"Mit ca. 3–4 Jahren entwickelt sich die ‚Theory of Mind‘ – Kinder begreifen, dass andere etwas <b>nicht</b> wissen. Erst dann ist Lügen überhaupt möglich. Lügen ist ein Entwicklungsschritt, kein Charakterfehler. ‚Stehlen‘ bei kleinen Kindern bedeutet meist: ‚Ich nehme, was ich brauche/will‘ – ohne moralische Dimension.",
      anzeichen:[
        "Erfindungsreiche ‚Geschichten‘ ohne klare Lügenabsicht (3–5 Jahre)",
        "Geschützte Lügen (‚Ich war’s nicht‘) zur Vermeidung von Strafe (5+ Jahre)",
        "Gelegentliches Heimlich-Nehmen von Süßigkeiten, Geld",
        "Bei Häufung &amp; aggressivem Kontext: Hinweis auf tiefer liegendes Thema"
      ],
      hilft:[
        "Nicht in die ‚Lügenfalle‘ locken. Statt: ‚Hast du den Saft umgekippt?‘ → ‚Hier ist Saft umgekippt. Lass uns aufwischen.‘",
        "Lügen nicht moralisch aufladen. Hinter Lügen steckt fast immer Angst vor Konsequenz/Beziehungsverlust.",
        "Wahrhaftigkeit modellieren – nicht für ‚Lügen‘ bestrafen, das das Kind aus Angst gesagt hat.",
        "Bei wiederholtem Stehlen ab Schulalter: Bedeutung verstehen (Druck in Peergruppe, Bedürfnis nach Selbstwert, Hilflosigkeit?), Beratung suchen.",
        "Wenn Lügen mit massiven Verhaltensauffälligkeiten einhergeht: kinder- und jugendpsychiatrische Abklärung."
      ],
      quellen:[
        {ref:"Talwar, V. (McGill University)", text:"Entwicklungspsychologische Forschung zu Lügen bei Kindern."},
        {ref:"AWMF S3-Leitlinie 028-020", text:"Störungen des Sozialverhaltens – differenzialdiagnostische Einordnung."},
        {ref:"Petermann, F. &amp; Petermann, U.", text:"Therapieprogramme zu sozial-emotionaler Entwicklung."}
      ]
    }
  },
  {
    id:"depression",
    title:"Niedergeschlagenheit &amp; depressive Symptome",
    area:"Übergreifend",
    category:"Krise",
    ageMin:8, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["traurig","kein interesse","müde","keine lust mehr","antriebslos","leer"],
    summary:"Auch Kinder und Jugendliche können depressiv erkranken – oft anders als Erwachsene und leicht zu übersehen.",
    body:{
      was:"Depressionen im Kindes- und Jugendalter zeigen sich häufig nicht als ‚klassische Traurigkeit‘, sondern als Reizbarkeit, Wut, körperliche Beschwerden, Rückzug oder Leistungsabfall. Mit der Pubertät steigt das Risiko deutlich, v.&nbsp;a. bei Mädchen (siehe COPSY/KiGGS).",
      anzeichen:[
        "Anhaltend gedrückte Stimmung oder Reizbarkeit über &gt; 2 Wochen",
        "Verlust von Freude an früheren Interessen",
        "Schlaf- und Appetitveränderungen",
        "Erschöpfung, Konzentrationsprobleme, Selbstabwertung",
        "Sozialer Rückzug, Schulvermeidung",
        "Suizidale Gedanken oder Selbstverletzung"
      ],
      hilft:[
        "Ernst nehmen – auch ‚es geht doch nichts schlimmes passiert‘ ist keine Beruhigung.",
        "Beziehung halten: Präsenz statt schneller Lösung.",
        "Tagesstruktur, Bewegung, Tageslicht, Schlafhygiene als Basis – ersetzen keine Therapie, sind aber wirksam.",
        "Frühe Abklärung bei Kinder- und Jugendpsychiater:in/-psychotherapeut:in. Wirksam: KVT, IPT-A; ab moderater Ausprägung ggf. Kombination mit SSRI (Fluoxetin als Mittel der Wahl, S3-Leitlinie).",
        "Bei Suizidgedanken: <b>sofort</b> handeln (siehe Notfall-Hinweis)."
      ],
      redflag:"Bei Suizidäußerungen, konkreten Plänen, Selbstverletzung, plötzlicher ‚Ruhe‘ nach langer Krise: sofort Kinder- und Jugendpsychiatrie / Notruf 112 / Telefonseelsorge 0800 111 0 111 / Nummer gegen Kummer 116 111.",
      quellen:[
        {ref:"AWMF S3-Leitlinie 028-043", text:"Depression im Kindes- und Jugendalter (DGKJP)."},
        {ref:"COPSY-Studie (UKE Hamburg)", text:"Ravens-Sieberer et al. – Zunahme depressiver Symptome bei Jugendlichen."},
        {ref:"BELLA-Studie (RKI)", text:"Psychische Gesundheit von Kindern und Jugendlichen in Deutschland."}
      ]
    }
  },
  {
    id:"trauma",
    title:"Belastung nach schwierigem Erlebnis",
    area:"Übergreifend",
    category:"Krise",
    ageMin:3, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["unfall","gewalt erlebt","krankenhaus","ängstlich","albträume","schreckhaft","ptbs"],
    summary:"Nach Unfällen, Gewalt, Verlust oder bedrohlichen Erlebnissen sind viele Reaktionen normal – manche brauchen Begleitung.",
    body:{
      was:"Nach belastenden Ereignissen (Unfall, schwere Krankheit, Verlust, Gewalt, Krieg/Flucht) zeigen viele Kinder vorübergehend belastete Reaktionen. Bei Anhalten &gt; 4 Wochen mit deutlicher Beeinträchtigung kann eine <b>posttraumatische Belastungsstörung (PTBS)</b> vorliegen (ICD-11 6B40 / 6B41 komplexe PTBS).",
      anzeichen:[
        "Wiederkehrende Erinnerungen, Spiel, das das Ereignis wiederholt",
        "Albträume, Schlafprobleme",
        "Vermeidung von Auslösern, von Gesprächen, Orten",
        "Übererregbarkeit, Schreckhaftigkeit, Konzentrationsprobleme",
        "Bei jüngeren Kindern: Regression, Trennungsangst, körperliche Symptome"
      ],
      hilft:[
        "Sicherheit zuerst – physisch und emotional.",
        "Routine und Vorhersehbarkeit wiederherstellen.",
        "Nicht zum Reden zwingen, aber Gesprächsräume anbieten.",
        "Sich nicht in die eigene Sprachlosigkeit zurückziehen – kindgerechte Worte finden.",
        "Bei anhaltenden Symptomen &gt; 4 Wochen: traumafokussierte Therapie. Wirksam: TF-KVT (trauma-fokussierte kognitive Verhaltenstherapie), EMDR bei Kindern (S3-Leitlinie)."
      ],
      redflag:"Bei akuter Selbst- oder Fremdgefährdung, dissoziativen Zuständen oder klaren Anzeichen sexualisierter/körperlicher Gewalt: sofort kinder- und jugendpsychiatrische Versorgung sowie ggf. Jugendamt einbeziehen (Schutzauftrag &sect;8a SGB VIII).",
      quellen:[
        {ref:"AWMF S3-Leitlinie 051-010", text:"Posttraumatische Belastungsstörung (PTBS) – mit Empfehlungen Kindes- &amp; Jugendalter."},
        {ref:"Deutsches Institut für Psychotraumatologie", text:"Fachinformationen für Eltern."},
        {ref:"Landolt, M. A.", text:"„Psychotraumatologie des Kindesalters“ (Hogrefe)."}
      ]
    }
  },
  {
    id:"selbstverletzung",
    title:"Selbstverletzendes Verhalten (SVV)",
    area:"Übergreifend",
    category:"Krise",
    ageMin:10, ageMax:17,
    genders:["weiblich","männlich","divers"],
    tags:["ritzen","narben","sich selbst verletzen","klingen","verstecken arme"],
    summary:"SVV ist meist Ausdruck überwältigender Gefühle und ein Hilferuf – kein „Mode-Phänomen“.",
    body:{
      was:"Selbstverletzendes Verhalten beginnt meist im Jugendalter. Häufige Funktionen: Spannungsregulation, Selbstbestrafung, Spüren des eigenen Körpers bei Dissoziation, soziale Signale. Es ist <b>nicht</b> zwingend ein Suizidversuch, aber ein <b>Risikofaktor</b> für späteres suizidales Verhalten.",
      anzeichen:[
        "Schnittwunden, Brandwunden, Kratzer – häufig an Unterarmen, Oberschenkeln",
        "Tragen langer Ärmel auch bei Hitze",
        "Verschlossenheit, plötzlicher Rückzug",
        "Hinweise in Texten, Tagebuch, Social Media"
      ],
      hilft:[
        "Ruhig, nicht-schockiert reagieren. Keine Strafe, keine Verbote als erste Reaktion – das Verhalten geht in den Untergrund.",
        "Wertschätzung des Mutes, sich zu zeigen – auch wenn es schwer ist.",
        "Akute Wunden versorgen lassen.",
        "Zeitnah kinder- und jugendpsychiatrische bzw. -psychotherapeutische Abklärung. Wirksam: DBT-A (Dialektisch-Behaviorale Therapie für Adoleszente), MBT-A.",
        "Notfallplan: konkrete Alternativen, Krisennummern, Erreichbarkeiten."
      ],
      redflag:"Bei akuten Suizidgedanken/-plänen, schweren Verletzungen, deutlicher Eskalation: Klinik aufsuchen (Kinder- und Jugendpsychiatrie). Notruf 112 / Telefonseelsorge 0800 111 0 111.",
      quellen:[
        {ref:"AWMF S2k-Leitlinie 028-029", text:"Nichtsuizidales selbstverletzendes Verhalten (NSSV) im Kindes- und Jugendalter."},
        {ref:"Plener, P. L.", text:"Forschung und klinische Standards zu SVV im Jugendalter."},
        {ref:"Fischer-Kern, M. / Brunner, R.", text:"DBT-A und mentalisierungsbasierte Verfahren."}
      ]
    }
  }
];
