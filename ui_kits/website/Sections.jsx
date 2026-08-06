/* global React */

function Hero({ onCta }) {
  return (
    <section className="hero">
      <div className="hero__media">
        <img src="../../assets/hero-bg.jpg" alt="" />
        <div className="hero__veil" />
      </div>
      <div className="hero__inner">
        <p className="eyebrow hero__eyebrow">Coaching · Schwäbisch Gmünd</p>
        <h1 className="h-display hero__h">
          Du bist der wichtigste
          <br />
          Mensch in <em>deinem</em> Leben.
        </h1>
        <p className="lede hero__lede">
          Manchmal reicht ein Gespräch — manchmal braucht es mehr.
        </p>
        <div className="hero__cta">
          <a
            href="#"
            className="btn btn-pri"
            onClick={(e) => {
              e.preventDefault();
              onCta("kontakt");
            }}
          >
            Erstgespräch vereinbaren
            <span className="arr">→</span>
          </a>
          <a
            href="#"
            className="btn btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              onCta("angebote");
            }}
          >
            Angebote ansehen
          </a>
        </div>
      </div>
    </section>
  );
}

function AudienceCards({ onNav }) {
  const cards = [
    {
      id: "kinder",
      eb: "Kinder & Jugendliche",
      t: "Spielen, fragen, wachsen.",
      d: "Begleitung bei Schul- und Familienthemen, Selbstwert, Konzentration — altersgerecht und behutsam.",
      photo: "../../assets/kinder.jpg",
      tone: "kinder",
    },
    {
      id: "erwachsene",
      eb: "Erwachsene",
      t: "Ruhig hinschauen.",
      d: "Coaching bei Blockaden, Belastung, Lebensübergängen. Wir schauen, was wirklich gerade dran ist.",
      photo: "../../assets/erwachsene.jpg",
      tone: "erwachsene",
    },
    {
      id: "unternehmen",
      eb: "Unternehmen & Kommunen",
      t: "Gemeinsam tragen.",
      d: "Workshops und Trainings für Teams, Schulen und Verwaltungen — zu Resilienz, Kommunikation, Konflikt.",
      photo: "../../assets/unternehmen.jpg",
      tone: "unternehmen",
    },
  ];
  return (
    <section className="aud">
      <div className="aud__head">
        <p className="eyebrow">Drei Wege, ein Ziel</p>
        <h2 className="h1">Für wen ich da bin.</h2>
      </div>
      <div className="aud__grid">
        {cards.map((c) => (
          <a
            key={c.id}
            href="#"
            className={"aud-card aud-card--" + c.tone}
            onClick={(e) => {
              e.preventDefault();
              onNav("angebote", c.id);
            }}
          >
            <div
              className="aud-card__img"
              style={{ backgroundImage: `url(${c.photo})` }}
            />
            <div className="aud-card__body">
              <p className="eyebrow aud-card__eb">{c.eb}</p>
              <h3 className="aud-card__t">{c.t}</h3>
              <p className="aud-card__d">{c.d}</p>
              <div className="aud-card__more">
                Mehr erfahren <span className="arr">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function AboutTeaser({ onNav }) {
  return (
    <section className="about">
      <div className="about__photo">
        <img src="../../assets/portrait.jpg" alt="Porträt Jessica Bisetto" />
      </div>
      <div className="about__text">
        <p className="eyebrow">Über mich</p>
        <h2 className="h1">Drei Säulen: Innovation, Leichtigkeit, Balance.</h2>
        <p className="body-lg">
          Ich begleite Menschen dabei, ihr eigenes „Surfbrett" zu gestalten —
          das, was sie trägt, wenn die Wellen des Lebens hoch werden.
          Wachstum ist individuell. Mein Job: erkennen, was gebraucht
          wird, und es so vermitteln, dass es umgesetzt werden kann.
        </p>
        <p className="about__sig">— Jessi</p>
        <a
          href="#"
          className="btn btn-sec"
          onClick={(e) => {
            e.preventDefault();
            onNav("ueber");
          }}
        >
          Mehr über mich
        </a>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      q: "Liebe Frau Bisetto, vielen herzlichen Dank. Sie haben mir mit ganz viel Empathie und mit super wirksamen Methoden, die langfristig wirken, sehr geholfen. Ich freue mich nun über ganz viel neu gewonnene Leichtigkeit, Freude und Kraft in meinem Leben. Zusammen mit Ihnen habe ich mich endlich getraut die Themen zu be- und verarbeiten, die mich schon sehr lange belasteten. Diese Themen waren Mobbing in meiner Jugend, daraus resultierender Perfektionismus und der ständige Drang nach Anerkennung. Seit dem Coaching mit Ihnen geht es mir endlich wieder gut. Ich bin Ihnen sehr dankbar!",
      who: "Nadine S.",
      ctx: "Erwachsenen-Coaching",
    },
    {
      q: "Im Sommer 2021 sind mein Sohn Julius und ich zum ersten Mal bei Jessi gewesen. Das Erstgespräch war sehr angenehm und stiftete viel Vertrauen, auch Julius fühlte sich sehr wohl und gut aufgehoben. Wir entschieden uns für eine Reflexintegration und zusätzlich für ein Kinder- und Jugendcoaching. Das Coaching half Julius sehr schnell in der Schule selbstbewusster mit schwierigen Situationen umzugehen. Das Reflexintegrationstraining dauerte etwa ein Jahr, aber durch Jessis wunderbare Art war Julius immer motiviert, ging gerne zu den Stunden und machte auch zu Hause die Übungen regelmäßig. Vielen Dank, liebe Jessi, mach weiter so.",
      who: "Mutter von Julius",
      ctx: "Kinder- & Jugendcoaching · 2021",
    },
    {
      q: "Liebe Jessi, von Herzen danke für das tolle Webinar: ‚Stark auf dem Schulhof — wie schütze ich mein Kind vor Mobbing?\u2018 Was für ein AHA-Effekt! So wertvolle Tipps, die eigentlich einfach umsetzbar sind, wenn man sie weiß. Meiner Meinung nach sollten alle Eltern und Pädagogen dein Webinar besuchen! Ich hätte dir noch stundenlang zuhören können!",
      who: "Andrea B.",
      ctx: "Webinar — Stark auf dem Schulhof",
    },
  ];
  return (
    <section className="testi">
      <div className="testi__head">
        <p className="eyebrow">Kundenstimmen</p>
        <h2 className="h1">Was Menschen mitnehmen.</h2>
      </div>
      <div className="testi__grid">
        {items.map((it, i) => (
          <figure key={i} className="testi-card">
            <blockquote className="testi-card__q">{it.q}</blockquote>
            <figcaption className="testi-card__sig">
              <strong>{it.who}{it.placeholder && <em className="testi-card__ph"> · Platzhalter</em>}</strong>
              <span>{it.ctx}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  const groups = [
    {
      label: "Städte & Kommunen",
      items: [
        "Stadt Schwäbisch Gmünd",
        "Stadt Lorch",
        "Stadtbibliothek Heidenheim",
      ],
    },
    {
      label: "Volkshochschulen",
      items: [
        "VHS Schwäbisch Gmünd",
        "VHS Schwäbisch Hall · IWK",
        "VHS Aalen",
        "VHS Crailsheim",
        "VHS Gerlingen",
      ],
    },
    {
      label: "Schulen",
      items: [
        "GSS Crailsheim",
        "Parler-Gymnasium Schwäbisch Gmünd",
        "Heideschule Mutlangen",
        "Gymnasium bei St. Michael, Schwäbisch Hall",
      ],
      more: "und weitere Schulen",
      moreItems: [
        "Realschule zur Flügelau Crailsheim",
        "Theodor-Heuss-Schule Herlikofen",
        "Mozartschule Hussenhofen",
        "Karl-Stirner-Schule Rosenberg",
        "Rauchbeinschule, Schwäbisch Gmünd",
        "St.-Josef-Schule, Schwäbisch Gmünd",
        "Uhlandschule Schwäbisch Gmünd",
      ],
    },
    {
      label: "Soziale Einrichtungen",
      items: ["Mundi", "Frauen helfen Frauen e.V."],
    },
    {
      label: "Unternehmen",
      items: ["Triumph, Heubach"],
    },
  ];
  return (
    <section className="partners">
      <p className="eyebrow partners__eb">Vertraut von</p>
      <div className="partners__groups">
        {groups.map((g) => (
          <div key={g.label} className="partners__group">
            <p className="partners__glabel">{g.label}</p>
            <ul className="partners__list">
              {g.items.map((p) => (
                <li key={p} className="partners__cell">{p}</li>
              ))}
              {g.more && (
                g.moreItems ? (
                  <li className="partners__cell partners__more partners__more--has-pop" tabIndex="0">
                    <span className="partners__more-label">
                      {g.more}
                      <svg className="partners__more-chev" width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="4 6 8 10 12 6" />
                      </svg>
                    </span>
                    <ul className="partners__pop" role="list">
                      {g.moreItems.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="partners__cell partners__more">{g.more}</li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Hero = Hero;
window.AudienceCards = AudienceCards;
window.AboutTeaser = AboutTeaser;
window.Testimonials = Testimonials;
window.Partners = Partners;

const DOWNLOADS = [
  {
    eb: "Allgemein",
    tone: "neutral",
    title: "Coaching im Überblick",
    desc: "Ein einseitiger Flyer, den du Freunden, Eltern oder Kolleginnen weitergeben kannst — Methoden, Zielgruppen, Kontakt.",
    file: "downloads/flyer-coaching-ueberblick.html",
    meta: "A4 · zum Drucken oder als PDF",
  },
  {
    eb: "Kinder & Eltern",
    tone: "kinder",
    title: "Malvorlage — Wutmonster",
    desc: "Eine Vorlage, mit der dein Kind seiner Wut ein Gesicht geben kann — auf Papier statt im Wohnzimmer. Ausdrucken, ausmalen, drüber reden.",
    file: "downloads/malvorlage-wutmonster.pdf",
    meta: "PDF · A4 · 325 KB",
  },
  {
    eb: "Kinder & Eltern",
    tone: "kinder",
    title: "Papierpuppe — Löwe",
    desc: "Eine Bastelvorlage zum Ausschneiden. Mit kleinen Fragen für nebenher: Was macht dich mutig? Wann brüllst du, wann schmust du?",
    file: "downloads/papierpuppe-loewe.pdf",
    meta: "PDF · A4 · 230 KB",
  },
  {
    eb: "Unternehmen & Schulen",
    tone: "unternehmen",
    title: "Workshop-Übersicht",
    desc: "Alle Workshop-Formate auf einen Blick — mit Dauer, Themen, möglichen Rahmenbedingungen für Schulen, Verwaltungen und Unternehmen.",
    file: "downloads/workshops-uebersicht.pdf",
    meta: "PDF · 6 Seiten · 1.4 MB",
  },
];

function Downloads() {
  return (
    <section className="dl" id="elternbibliothek">
      <div className="dl__head">
        <p className="eyebrow">Material zum Mitnehmen · Elternbibliothek</p>
        <h2 className="h1">Geschenkt, ohne Anmeldung.</h2>
        <p className="lede dl__lede">
          Vorlagen, Reflexionshilfen und Übersichten — alles direkt zum
          Herunterladen. Wenn dir etwas davon hilft, freue ich mich, wenn
          du es weitergibst.
        </p>
      </div>
      <div className="dl__grid">
        {DOWNLOADS.map((d, i) => (
          <a
            key={i}
            href={"../../" + d.file}
            download
            className={"dl-card dl-card--" + d.tone}
          >
            <div className="dl-card__corner" aria-hidden="true">
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M4 2 L22 2 L30 10 L30 38 L4 38 Z" />
                <path d="M22 2 L22 10 L30 10" />
              </svg>
            </div>
            <p className="eyebrow dl-card__eb">{d.eb}</p>
            <h3 className="dl-card__t">{d.title}</h3>
            <p className="dl-card__d">{d.desc}</p>
            <div className="dl-card__foot">
              <span className="dl-card__meta">{d.meta}</span>
              <span className="dl-card__cta">
                Herunterladen
                <span className="arr" aria-hidden="true">↓</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.Downloads = Downloads;

function NewsletterCTA({ variant }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const isCompact = variant === "compact";

  const submit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return;
    setSubmitted(true);
  };

  return (
    <section className={"nl" + (isCompact ? " nl--compact" : "")}>
      <div className="nl__inner">
        <div className="nl__text">
          <p className="eyebrow nl__eb">Newsletter</p>
          <h2 className={isCompact ? "h2" : "h1"}>
            Bleib in Kontakt.
          </h2>
          {!isCompact && (
            <p className="lede nl__lede">
              Ab und an schicke ich dir, was es Neues bei mir gibt — kommende
              Kurse, freie Termine, Events und kleine Impulse zum Nachdenken.
              Ohne Druck, ohne festen Rhythmus. Du kannst dich jederzeit
              wieder austragen.
            </p>
          )}
          {isCompact && (
            <p className="body nl__lede">
              Hat dich der Beitrag berührt? Bleib dran — ab und an schicke
              ich dir, was bei mir los ist: Kurse, Angebote, Events und
              kleine Impulse. Jederzeit abbestellbar.
            </p>
          )}
        </div>
        {submitted ? (
          <div className="nl__done">
            <img src="../../assets/icons/check.svg" width="20" height="20" alt="" />
            <p>
              <strong>Danke, schön, dass du da bist.</strong><br />
              Du bekommst gleich eine kurze Bestätigung an <em>{email}</em>.
            </p>
          </div>
        ) : (
          <form className="nl__form" onSubmit={submit}>
            <label className="nl__field">
              <span className="visually-hidden">E-Mail-Adresse</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine E-Mail-Adresse"
                required
              />
            </label>
            <button type="submit" className="nl__submit">
              Anmelden
              <span className="arr" aria-hidden="true">→</span>
            </button>
            <p className="nl__fineprint">
              Mit der Anmeldung stimmst du den <a href="#">Datenschutzhinweisen</a> zu.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

window.NewsletterCTA = NewsletterCTA;
