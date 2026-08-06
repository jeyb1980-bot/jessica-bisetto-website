/* global React */
const { useState } = React;

const STEPS = ["Anliegen", "Zeit", "Daten", "Bestätigung"];

const CONCERNS = [
  { id: "erwachsene", label: "Für mich selbst", sub: "Erwachsenen-Coaching · 1:1", tone: "erwachsene" },
  { id: "kinder",     label: "Für mein Kind",   sub: "Kinder & Jugendliche",       tone: "kinder" },
  { id: "unternehmen", label: "Für mein Team",  sub: "Workshop · Unternehmen",     tone: "unternehmen" },
  { id: "offen",      label: "Erstmal nur fragen", sub: "Ich bin mir noch nicht sicher", tone: "neutral" },
];

const WEEKDAYS = [
  { id: "mo", label: "Mo", long: "Montag" },
  { id: "di", label: "Di", long: "Dienstag" },
  { id: "mi", label: "Mi", long: "Mittwoch" },
  { id: "do", label: "Do", long: "Donnerstag" },
  { id: "fr", label: "Fr", long: "Freitag" },
];

const TIMES = [
  { id: "09",   label: "09:00 Uhr" },
  { id: "10",   label: "10:00 Uhr" },
  { id: "11",   label: "11:00 Uhr" },
  { id: "13",   label: "13:00 Uhr" },
  { id: "14",   label: "14:00 Uhr" },
  { id: "15",   label: "15:00 Uhr" },
  { id: "16",   label: "16:00 Uhr" },
];

function Stepper({ step }) {
  return (
    <ol className="bk-steps">
      {STEPS.map((s, i) => (
        <li key={s} className={"bk-step" + (i === step ? " is-current" : i < step ? " is-done" : "")}>
          <span className="bk-step__n">{i + 1}</span>
          <span className="bk-step__l">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function StepConcern({ value, onPick }) {
  return (
    <div className="bk-card">
      <p className="eyebrow">Schritt 1 von 4</p>
      <h1 className="h1">Worum geht es?</h1>
      <p className="lede bk-lede">Wähle, was am ehesten passt. Du kannst es später noch genauer beschreiben.</p>
      <div className="bk-options">
        {CONCERNS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={"bk-option bk-option--" + c.tone + (value === c.id ? " is-selected" : "")}
            onClick={() => onPick(c.id)}
          >
            <span className="bk-option__l">{c.label}</span>
            <span className="bk-option__s">{c.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepTime({ value, onChange }) {
  const days  = value?.days  || [];
  const times = value?.times || [];

  const toggle = (key, id) => {
    const current = value?.[key] || [];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="bk-card">
      <p className="eyebrow">Schritt 2 von 4</p>
      <h1 className="h1">Wann passt es dir?</h1>
      <p className="lede bk-lede">Das Erstgespräch ist für dich kostenfrei und unverbindlich.</p>

      <div className="bk-pref">
        <p className="bk-pref__l">An welchen Wochentagen erreiche ich dich am besten?</p>
        <div className="bk-pref__chips">
          {WEEKDAYS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={"bk-chip bk-chip--day" + (days.includes(d.id) ? " is-selected" : "")}
              onClick={() => toggle("days", d.id)}
              aria-pressed={days.includes(d.id)}
              aria-label={d.long}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bk-pref">
        <p className="bk-pref__l">Welche Uhrzeiten passen dir?</p>
        <div className="bk-pref__chips">
          {TIMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={"bk-chip bk-chip--time" + (times.includes(t.id) ? " is-selected" : "")}
              onClick={() => toggle("times", t.id)}
              aria-pressed={times.includes(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="bk-pref__hint">Mehrfachauswahl möglich. Gespräche finden bis spätestens 17 Uhr statt.</p>
      </div>

      <div className="bk-note">
        <span className="bk-note__icon" aria-hidden="true">
          <img src="../../assets/icons/clock.svg" width="18" height="18" alt="" />
        </span>
        <p>Ich melde mich innerhalb von zwei Werktagen bei dir — mit einem konkreten Terminvorschlag, der zu deiner Auswahl passt.</p>
      </div>
    </div>
  );
}

function StepDetails({ data, onChange }) {
  return (
    <div className="bk-card">
      <p className="eyebrow">Schritt 3 von 4</p>
      <h1 className="h1">Deine Daten</h1>
      <p className="lede bk-lede">Ich brauche nur das Nötigste, um dich zu erreichen.</p>
      <div className="bk-form">
        <label className="bk-field">
          <span>Name</span>
          <input type="text" value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Vor- und Nachname" />
        </label>
        <label className="bk-field">
          <span>E-Mail</span>
          <input type="email" value={data.email} onChange={(e) => onChange({ email: e.target.value })} placeholder="dein.name@example.de" />
        </label>
        <label className="bk-field">
          <span>Telefon <em>· optional</em></span>
          <input type="tel" value={data.phone} onChange={(e) => onChange({ phone: e.target.value })} placeholder="0152 — — —" />
        </label>
        <label className="bk-field bk-field--full">
          <span>Was beschäftigt dich? <em>· optional</em></span>
          <textarea rows="4" value={data.note} onChange={(e) => onChange({ note: e.target.value })}
            placeholder="Ein paar Sätze reichen. Wir sprechen alles weitere im Gespräch." />
        </label>
        <label className="bk-check">
          <input type="checkbox" checked={data.consent} onChange={(e) => onChange({ consent: e.target.checked })} />
          <span>Ich bin einverstanden, dass meine Angaben zur Terminvereinbarung verwendet werden. <a href="#">Datenschutz</a></span>
        </label>
      </div>
    </div>
  );
}

function StepDone({ concern, slot, data }) {
  const c = CONCERNS.find((x) => x.id === concern);
  const dayLabels = (slot?.days  || []).map((id) => WEEKDAYS.find((w) => w.id === id)?.long).filter(Boolean).join(", ");
  const timeLabels = (slot?.times || []).map((id) => TIMES.find((t) => t.id === id)?.label).filter(Boolean).join(", ");
  return (
    <div className="bk-card bk-done">
      <div className="bk-done__seal">✓</div>
      <p className="eyebrow">Schritt 4 von 4</p>
      <h1 className="h1">Danke, {data.name.split(" ")[0] || "schön"}.</h1>
      <p className="lede bk-lede">
        Ich melde mich innerhalb von zwei Werktagen mit einem konkreten Terminvorschlag.
      </p>
      <dl className="bk-summary">
        <div><dt>Anliegen</dt><dd>{c ? c.label : "—"}</dd></div>
        {dayLabels  && <div><dt>Wochentage</dt><dd>{dayLabels}</dd></div>}
        {timeLabels && <div><dt>Uhrzeiten</dt><dd>{timeLabels}</dd></div>}
        <div><dt>E-Mail</dt><dd>{data.email}</dd></div>
        {data.phone && <div><dt>Telefon</dt><dd>{data.phone}</dd></div>}
      </dl>
      <p className="bk-aside">
        Du erhältst eine Eingangsbestätigung an <strong>{data.email}</strong>. Sollte sie nicht ankommen,
        prüfe den Spam-Ordner oder schreib mir direkt an <a href="mailto:kontakt@jessica-bisetto.de">kontakt@jessica-bisetto.de</a>.
      </p>
    </div>
  );
}

function BookingFlow() {
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState(null);
  const [slot, setSlot] = useState({ days: [], times: [] });
  const [data, setData] = useState({ name: "", email: "", phone: "", note: "", consent: false });

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const canNext = [
    !!concern,
    (slot?.days?.length > 0) && (slot?.times?.length > 0),
    data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email) && data.consent,
    true,
  ][step];

  return (
    <main className="bk-wrap">
      <div className="bk-head">
        <p className="eyebrow">Erstgespräch vereinbaren</p>
        <h2 className="h-display">In vier ruhigen Schritten.</h2>
      </div>
      <Stepper step={step} />
      {step === 0 && <StepConcern value={concern} onPick={setConcern} />}
      {step === 1 && <StepTime value={slot} onChange={setSlot} />}
      {step === 2 && <StepDetails data={data} onChange={update} />}
      {step === 3 && <StepDone concern={concern} slot={slot} data={data} />}
      {step < 3 && (
        <div className="bk-nav">
          <button
            type="button"
            className="btn-ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            ← Zurück
          </button>
          <button
            type="button"
            className="btn-pri"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
          >
            {step === 2 ? "Anfrage senden" : "Weiter"}
            <span className="arr" aria-hidden="true">→</span>
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="bk-nav bk-nav--center">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => { setStep(0); setConcern(null); setSlot({ days: [], times: [] }); setData({ name: "", email: "", phone: "", note: "", consent: false }); }}
          >
            Neue Anfrage stellen
          </button>
        </div>
      )}
    </main>
  );
}

window.BookingFlow = BookingFlow;
