/* global React */
const { useState: useStateScreens } = React;

function AngeboteScreen({ initial, onNav }) {
  const [active, setActive] = useStateScreens(initial || "kinder");
  const data = {
    kinder: {
      eb: "Kinder & Jugendliche",
      tone: "kinder",
      photo: "../../assets/kinder.jpg",
      title: "Du bist gut, so wie du bist.",
      address: "du",
      lede:
        "Manchmal ist Schule schwer. Manchmal ist zuhause viel los. Manchmal weiß man nicht warum, aber irgendwas drückt. Ich höre dir zu — und wir finden zusammen heraus, was hilft.",
      bullets: [
        "Bei Stress in Schule, Familie oder Freundeskreis",
        "Wenn dir oft alles zu viel wird oder du blockierst",
        "Für mehr Mut, dich selbst zu zeigen",
        "Spielerische Methoden, altersgerecht — keine Therapie",
      ],
      note: "Das erste Gespräch ist natürlich unverbindlich und kostenlos.",
    },
    erwachsene: {
      eb: "Erwachsene",
      tone: "erwachsene",
      photo: "../../assets/erwachsene.jpg",
      title: "Wenn alles zu viel wird.",
      address: "du",
      lede:
        "Vielleicht funktioniert gerade alles — und trotzdem stimmt etwas nicht. Wir schauen gemeinsam hin, ohne Druck, in deinem Tempo. Und finden Schritte, die sich wirklich gut anfühlen.",
      bullets: [
        "Bei Blockaden, Triggern, Belastung",
        "In Lebensübergängen (Beruf, Familie, Trennung)",
        "Gegen Perfektionismus und ständige Anerkennungssuche",
        "Einzelcoaching · 60 oder 90 Minuten",
      ],
      note: "Das erste Gespräch ist natürlich unverbindlich und kostenlos.",
    },
    unternehmen: {
      eb: "Unternehmen & Kommunen",
      tone: "unternehmen",
      photo: "../../assets/unternehmen.jpg",
      title: "Teams stärken, Strukturen halten.",
      address: "sie",
      lede:
        "Ich arbeite mit Schulen, Verwaltungen und Unternehmen an Themen, die Menschen tragfähig machen — Resilienz, Konflikt, Kommunikation. Praxisnah, ohne Buzzwords.",
      bullets: [
        "Halbtags- und Tagesworkshops",
        "Begleitprozesse über mehrere Termine",
        "Vor Ort in Süddeutschland oder hybrid",
        "Referenzen u. a. Stadt Schwäbisch Gmünd, VHS, Triumph (Heubach)",
      ],
      note: "Antwort innerhalb von zwei Werktagen.",
    },
  };
  const d = data[active];

  return (
    <main className="screen screen--angebote">
      <div className="page-head">
        <p className="eyebrow">Angebote</p>
        <h1 className="h-display page-head__h">
          Drei Wege, ein Ziel.
        </h1>
        <p className="lede page-head__lede">
          Wachstum sieht für jeden anders aus. Wähle den Weg, der zu dir passt —
          oder schreib mir, wenn du unsicher bist.
        </p>
      </div>
      <div className="aud-tabs">
        {Object.entries(data).map(([k, v]) => (
          <button
            key={k}
            className={
              "aud-tab aud-tab--" + v.tone + (active === k ? " is-active" : "")
            }
            onClick={() => setActive(k)}
          >
            {v.eb}
          </button>
        ))}
      </div>
      <article className={"ang-panel ang-panel--" + d.tone}>
        <div className="ang-panel__photo">
          <img src={d.photo} alt="" />
        </div>
        <div className="ang-panel__body">
          <p className="eyebrow ang-panel__eb">{d.eb}</p>
          <h2 className="h1">{d.title}</h2>
          <p className="lede">{d.lede}</p>
          <ul className="check-list">
            {d.bullets.map((b, i) => (
              <li key={i}>
                <img src="../../assets/icons/check.svg" width="18" height="18" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="ang-panel__cta">
            <a
              href="#"
              className="btn btn-pri"
              onClick={(e) => {
                e.preventDefault();
                onNav("kontakt");
              }}
            >
              {d.address === "sie" ? "Anfrage senden" : "Erstgespräch vereinbaren"}
              <span className="arr">→</span>
            </a>
            <span className="ang-panel__note body-sm">
              {d.note}
            </span>
          </div>
          {active === "kinder" && (
            <p className="ang-panel__link body-sm">
              Tipp: In der <a href="../website/index.html#elternbibliothek">Elternbibliothek</a> findest du kostenfreie Mal- und Bastelvorlagen für zuhause.
            </p>
          )}
        </div>
      </article>

      {active === "kinder" && (
        <article className="ang-project">
          <div className="ang-project__head">
            <p className="eyebrow ang-project__eb">Schulprojekt · Prävention</p>
            <h2 className="h1 ang-project__h">
              <em>Mut tut gut</em> — Projekt zur Prävention
              von sexueller Gewalt in den 4. Klassen.
            </h2>
          </div>

          <div className="ang-project__grid">
            <div className="ang-project__badge">
              <img src="../../assets/mut-tut-gut-logo.png" alt="Mut tut gut" />
              <p className="ang-project__traeger">
                Ein Projekt von <strong>Frauen helfen Frauen Schwäbisch Gmünd e.&nbsp;V.</strong>
              </p>
            </div>

            <div className="ang-project__body">
              <p className="body-lg">
                „Mut tut gut" ist ein bewährtes Präventionsprojekt für
                Viertklässlerinnen und Viertklässler. Kinder lernen — ohne
                Angst, ohne Druck — gute und schlechte Geheimnisse zu
                unterscheiden, eigene Grenzen zu spüren und im Ernstfall zu
                sagen: <em>Stopp. Ich hole mir Hilfe.</em>
              </p>
              <p className="body">
                Als freie Mitarbeiterin im Bereich Prävention bringe ich
                das Projekt im Auftrag des Trägervereins direkt an Ihre
                Schule. Spielerisch, altersgerecht und mit großer
                Sensibilität für die Lebenswelt der Kinder.
              </p>
              <p className="body ang-project__hint">
                <strong>Anfragen laufen direkt über den Verein.</strong>
                Frauen helfen Frauen Schwäbisch Gmünd e.&nbsp;V. koordiniert
                die Anmeldung und die Terminvergabe für alle Schulen.
              </p>

              <ul className="check-list ang-project__bullets">
                <li>
                  <img src="../../assets/icons/check.svg" width="18" height="18" alt="" />
                  <span>Zwei Termine à 90 Minuten in der Schulklasse</span>
                </li>
                <li>
                  <img src="../../assets/icons/check.svg" width="18" height="18" alt="" />
                  <span>Optional ein begleitender Elternabend</span>
                </li>
                <li>
                  <img src="../../assets/icons/check.svg" width="18" height="18" alt="" />
                  <span>Konzept des Vereins Frauen helfen Frauen, langjährig erprobt</span>
                </li>
                <li>
                  <img src="../../assets/icons/check.svg" width="18" height="18" alt="" />
                  <span>Für Grundschulen im Ostalbkreis und Umgebung</span>
                </li>
              </ul>

              <div className="ang-project__price">
                <div className="ang-project__price-row">
                  <span className="ang-project__price-l">Klassenworkshop</span>
                  <span className="ang-project__price-r">
                    <strong>180&nbsp;€</strong> · 2&nbsp;×&nbsp;90&nbsp;Minuten
                  </span>
                </div>
                <div className="ang-project__price-row">
                  <span className="ang-project__price-l">Elternabend · optional</span>
                  <span className="ang-project__price-r">
                    <strong>60&nbsp;€</strong> · zusätzlich
                  </span>
                </div>
              </div>

              <div className="ang-project__cta">
                <a
                  href="https://frauenhelfenfrauen-schwaebischgmuend.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-pri"
                >
                  Beim Verein anfragen
                  <span className="arr" aria-hidden="true">↗</span>
                </a>
                <span className="ang-panel__note body-sm">
                  Anmeldung &amp; Termine direkt über Frauen helfen Frauen Schwäbisch Gmünd e.&nbsp;V.
                </span>
              </div>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}

function UeberMichScreen() {
  return (
    <main className="screen screen--ueber">
      <div className="ueber-hero">
        <div className="ueber-hero__photo">
          <img src="../../assets/portrait.jpg" alt="Jessica Bisetto" />
        </div>
        <div className="ueber-hero__text">
          <p className="eyebrow">Über mich</p>
          <h1 className="h-display">Hallo, ich bin <em>Jessi</em>.</h1>
          <p className="lede">
            Coach im Ostalbkreis und Surferin im übertragenen Sinn.
            Meine Expertise: andere auf ihr Board zu bringen.
          </p>
        </div>
      </div>
      <div className="prose">
        <p className="body-lg">
          Vor vielen Jahren habe ich gemerkt: Das, was uns wirklich
          weiterbringt, steht selten in Ratgebern. Es passiert im Gespräch,
          in der Begegnung, im ehrlichen Hinschauen — auf das, was uns
          ausmacht, und auf das, was uns gerade im Weg steht.
        </p>
        <p className="body">
          Seitdem begleite ich Menschen — Kinder, Erwachsene, ganze Teams —
          auf ihren ganz eigenen Wegen. Ich helfe ihnen quasi dabei, ihr
          eigenes Surfbrett zu gestalten — das, was sie trägt, wenn die
          Welle hochkommt. Mit Methoden, die wirklich etwas bewegen, aber
          ohne dass du in irgendein System hineinpassen musst. Mit
          Empathie, aber auch mit Klarheit. Mit Ruhe — und mit Schwung,
          wenn er gebraucht wird.
        </p>
        <h2 className="h2">Meine drei Säulen</h2>
        <p className="body" style={{ marginTop: -8 }}>
          Drei Dinge tragen mich seit Jahren — und tragen auch das, was ich
          tue:
        </p>
        <div className="pillars">
          <div className="pillar">
            <img src="../../assets/icons/sparkles.svg" width="22" height="22" />
            <h3 className="h3">Innovation</h3>
            <p className="body-sm">
              Methoden, die wirklich helfen — auch wenn sie nicht im
              Lehrbuch stehen. Keine Dogmen, keine Auswendig-Sätze.
            </p>
          </div>
          <div className="pillar">
            <img src="../../assets/icons/wind.svg" width="22" height="22" />
            <h3 className="h3">Leichtigkeit</h3>
            <p className="body-sm">
              Veränderung darf sich gut anfühlen. Lachen ist erlaubt —
              manchmal ist das genau, was fehlt.
            </p>
          </div>
          <div className="pillar">
            <img src="../../assets/icons/leaf.svg" width="22" height="22" />
            <h3 className="h3">Balance</h3>
            <p className="body-sm">
              Nicht „besser werden müssen" — sondern dahin kommen, wo du
              dich wieder spürst. Im Gleichgewicht.
            </p>
          </div>
        </div>
        <p className="about__sig" style={{ marginTop: 8 }}>— Jessi</p>

        <details className="ref-box">
          <summary className="ref-box__summary">
            <span className="ref-box__label">
              <span className="eyebrow ref-box__eb">Referenzen</span>
              <span className="ref-box__hint">Meine Ausbildungen &amp; Qualifikationen — zum Aufklappen</span>
            </span>
            <span className="ref-box__chev" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </span>
          </summary>
          <div className="ref-box__body">
            <div className="ref-grp">
              <p className="ref-grp__l">Trauma &amp; EMDR</p>
              <ul className="ref-grp__list">
                <li>EMDR — PAPB Andreas Zimmermann</li>
                <li>Pragmatische Traumatherapie — PAPB Andreas Zimmermann</li>
                <li>Traumatherapie — E-Learning Kinderschutz, Universitätsklinikum Ulm</li>
              </ul>
            </div>
            <div className="ref-grp">
              <p className="ref-grp__l">Kinder- &amp; Jugendcoaching · IPE</p>
              <ul className="ref-grp__list">
                <li>Kinder- &amp; Jugendcoach — Grundausbildung</li>
                <li>Kinder- &amp; Jugendcoach — Erweiterung</li>
                <li>Kinder- &amp; Jugendcoach — Professional</li>
                <li>Lerncoach / Themenneutrale Prüfungsvorbereitung</li>
              </ul>
            </div>
            <div className="ref-grp">
              <p className="ref-grp__l">Erwachsenencoaching</p>
              <ul className="ref-grp__list">
                <li>AMR — Advanced Movement Reprocessing (nach Daniel Paasch)</li>
              </ul>
            </div>
            <div className="ref-grp">
              <p className="ref-grp__l">Selbstbehauptung &amp; Prävention</p>
              <ul className="ref-grp__list">
                <li>Trainerin für Selbstbehauptung und Resilienz (Stark auch ohne Muckis)</li>
                <li>Beraterin für einheitlichen Umgang mit Mobbing und Konflikten (Stark auch ohne Muckis)</li>
              </ul>
            </div>
            <div className="ref-grp">
              <p className="ref-grp__l">Reflexintegration · RIT</p>
              <ul className="ref-grp__list">
                <li>RIT-Reflexintegration I — Grundausbildung</li>
                <li>RIT-Reflexintegration II — Lese-/Rechtschreibschwäche, Legasthenie</li>
                <li>RIT-Reflexintegration III — an Kitas und Schulen</li>
                <li>RIT-Reflexintegration VI — im Breitensport</li>
              </ul>
            </div>
            <div className="ref-grp">
              <p className="ref-grp__l">Lehrtätigkeit</p>
              <ul className="ref-grp__list">
                <li>Dozentin VHS Schwäbisch Gmünd</li>
                <li>Dozentin VHS Crailsheim</li>
                <li>Dozentin VHS Schwäbisch Hall (Frauenakademie)</li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}

window.AngeboteScreen = AngeboteScreen;
window.UeberMichScreen = UeberMichScreen;
