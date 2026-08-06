/* global React */

const POSTS = [
  {
    id: "ruhe-im-alltag",
    eb: "Erwachsene",
    tone: "erwachsene",
    title: "Wie du Ruhe in einen lauten Alltag holst — ohne Yoga-Retreat.",
    excerpt:
      "Drei kleine Veränderungen, die wirklich etwas bewegen. Keine App, kein 5-Uhr-Aufstehen, keine Affirmationen.",
    date: "12. April 2026",
    readtime: "6 Min Lesezeit",
    cover: "../../assets/hero-bg.jpg",
  },
  {
    id: "kind-traurig",
    eb: "Kinder & Eltern",
    tone: "kinder",
    title: "Mein Kind ist traurig und ich weiß nicht warum.",
    excerpt:
      "Was Eltern oft hilft, wenn sie nicht weiterwissen — und was eher schadet, auch wenn es gut gemeint ist.",
    date: "28. März 2026",
    readtime: "8 Min",
    cover: "../../assets/kinder.jpg",
  },
  {
    id: "team-konflikt",
    eb: "Unternehmen",
    tone: "unternehmen",
    title: "Konflikte im Team: Warum Aussprechen allein nicht reicht.",
    excerpt:
      "Was wirklich gebraucht wird, damit ein Team nicht nur Frieden schließt, sondern weiterkommt.",
    date: "9. März 2026",
    readtime: "10 Min",
    cover: "../../assets/unternehmen.jpg",
  },
  {
    id: "perfektionismus",
    eb: "Erwachsene",
    tone: "erwachsene",
    title: "Perfektionismus ist keine Stärke. Was er wirklich ist.",
    excerpt:
      "Und wie du anfangen kannst, dich davon zu lösen — ohne dich danach „nicht mehr engagiert\u201C zu fühlen.",
    date: "21. Februar 2026",
    readtime: "7 Min",
    cover: "../../assets/portrait.jpg",
  },
];

function BlogList({ onOpen }) {
  const [filter, setFilter] = React.useState("alle");
  const filtered = POSTS.filter((p) => filter === "alle" || p.tone === filter);

  return (
    <main className="screen blog-list">
      <div className="page-head">
        <p className="eyebrow">Blog</p>
        <h1 className="h-display">Texte zum Mitnehmen.</h1>
        <p className="lede page-head__lede">
          Reflexionen, Methoden, kleine Impulse für zwischendurch — aus zehn
          Jahren Coaching-Praxis.
        </p>
      </div>
      <div className="aud-tabs blog-filter">
        {[
          ["alle", "Alle Beiträge"],
          ["erwachsene", "Erwachsene"],
          ["kinder", "Kinder & Eltern"],
          ["unternehmen", "Unternehmen"],
        ].map(([k, l]) => (
          <button
            key={k}
            className={"aud-tab" + (filter === k ? " is-active" : "")}
            onClick={() => setFilter(k)}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {filtered.map((p, i) => (
          <a
            key={p.id}
            href="#"
            className={"blog-card" + (i === 0 ? " blog-card--lead" : "")}
            onClick={(e) => {
              e.preventDefault();
              onOpen(p);
            }}
          >
            <div
              className="blog-card__img"
              style={{ backgroundImage: `url(${p.cover})` }}
            />
            <div className="blog-card__body">
              <p className={"eyebrow blog-card__eb blog-card__eb--" + p.tone}>
                {p.eb}
              </p>
              <h2 className="blog-card__t">{p.title}</h2>
              <p className="blog-card__d">{p.excerpt}</p>
              <p className="blog-card__meta">
                {p.date} · {p.readtime}
              </p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

window.BlogList = BlogList;
window.POSTS = POSTS;
