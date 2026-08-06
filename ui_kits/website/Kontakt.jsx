/* global React */
const { useState: useStateK } = React;

function KontaktScreen() {
  const [stage, setStage] = useStateK("form");
  const [audience, setAudience] = useStateK("erwachsene");
  const formal = audience === "unternehmen";

  if (stage === "sent") {
    return (
      <main className="screen screen--kontakt">
        <div className="kontakt-done">
          <img src="../../assets/icons/check.svg" width="40" height="40" />
          <h1 className="h1">
            {formal ? "Danke für Ihre Anfrage." : "Danke. Ich hab's bekommen."}
          </h1>
          <p className="lede">
            {formal
              ? "Ich melde mich innerhalb von zwei Werktagen bei Ihnen — telefonisch oder per E-Mail."
              : "Ich melde mich innerhalb von zwei Werktagen bei dir. Falls etwas dringend ist, ruf gerne direkt an."}
          </p>
          <a
            href="#"
            className="btn btn-sec"
            onClick={(e) => {
              e.preventDefault();
              setStage("form");
            }}
          >
            Zurück
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="screen screen--kontakt">
      <div className="page-head">
        <p className="eyebrow">Kontakt</p>
        <h1 className="h-display">
          {formal ? "Schreiben Sie mir." : "Schreib mir."}
        </h1>
        <p className="lede page-head__lede">
          {formal
            ? "Erzählen Sie mir kurz, worum es geht — ich melde mich innerhalb von zwei Werktagen."
            : "Erzähl mir kurz, was dich beschäftigt. Du kannst so kurz oder ausführlich schreiben, wie du magst."}
        </p>
      </div>
      <div className="kontakt-grid">
        <form
          className="kontakt-form"
          onSubmit={(e) => {
            e.preventDefault();
            setStage("sent");
          }}
        >
          <div className="fld-group">
            <label className="lbl">Anliegen</label>
            <div className="seg">
              {[
                ["kinder", "Für mein Kind"],
                ["erwachsene", "Für mich"],
                ["unternehmen", "Für mein Team / Unternehmen"],
              ].map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  className={"seg-btn" + (audience === k ? " is-on" : "")}
                  onClick={() => setAudience(k)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="fld-row">
            <div className="fld-group">
              <label className="lbl">Name</label>
              <input className="fld" placeholder={formal ? "Vor- und Nachname" : "Wie heißt du?"} />
            </div>
            <div className="fld-group">
              <label className="lbl">E-Mail</label>
              <input className="fld" type="email" placeholder="name@beispiel.de" />
            </div>
          </div>
          <div className="fld-group">
            <label className="lbl">Telefon · optional</label>
            <input className="fld" placeholder="Falls Sie lieber telefonieren" />
          </div>
          <div className="fld-group">
            <label className="lbl">
              {formal ? "Worum geht es?" : "Was beschäftigt dich gerade?"}
            </label>
            <textarea
              className="fld"
              rows="5"
              placeholder={
                formal
                  ? "Anlass, Zielgruppe, gewünschter Rahmen, gewünschter Termin …"
                  : "So kurz oder ausführlich, wie du magst."
              }
            />
          </div>
          <label className="cbox">
            <input type="checkbox" defaultChecked />
            <span>
              {formal
                ? "Ich habe die Datenschutzhinweise gelesen."
                : "Ich hab die Datenschutzhinweise gelesen."}
            </span>
          </label>
          <button type="submit" className="btn btn-pri btn-block">
            {formal ? "Anfrage senden" : "Nachricht abschicken"}
            <span className="arr">→</span>
          </button>
        </form>
        <aside className="kontakt-side">
          <h2 className="h3">Direkt erreichen</h2>
          <p className="kontakt-line">
            <img src="../../assets/icons/map-pin.svg" width="18" height="18" />
            <span>Stuttgarter Straße 3<br />73525 Schwäbisch Gmünd</span>
          </p>
          <p className="kontakt-line">
            <img src="../../assets/icons/phone.svg" width="18" height="18" />
            <a href="tel:+4915253636003">0152 / 536 360 03</a>
          </p>
          <p className="kontakt-line">
            <img src="../../assets/icons/mail.svg" width="18" height="18" />
            <a href="mailto:kontakt@jessica-bisetto.de">kontakt@jessica-bisetto.de</a>
          </p>
          <div className="kontakt-aside-note">
            <p className="eyebrow">Erstgespräch</p>
            <p className="body-sm">
              Kostenfrei · 20 Minuten · am Telefon. Damit wir herausfinden,
              ob es passt — ganz ohne Verpflichtung.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

window.KontaktScreen = KontaktScreen;
