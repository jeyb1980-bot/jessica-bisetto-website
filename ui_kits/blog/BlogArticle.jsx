/* global React, POSTS */

function BlogArticle({ post, onBack }) {
  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 2);
  return (
    <main className="blog-article">
      <a
        href="#"
        className="back-link"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        ← Alle Beiträge
      </a>
      <header className="article-head">
        <p className={"eyebrow blog-card__eb--" + post.tone}>{post.eb}</p>
        <h1 className="h-display">{post.title}</h1>
        <p className="article-meta">
          Von Jessica Bisetto · {post.date} · {post.readtime}
        </p>
      </header>
      <div
        className="article-cover"
        style={{ backgroundImage: `url(${post.cover})` }}
      />
      <article className="article-body">
        <p className="lede">
          Es gibt diesen Moment am Abend, in dem du dich aufs Sofa setzt
          und denkst: Heute habe ich nichts wirklich getan, was mir
          gehört. Den Tag haben andere bekommen — Kollegen, Familie,
          das Handy. Und du bist müde, ohne zu wissen, wovon.
        </p>
        <p>
          Das ist nicht dein Versagen. Es ist die Logik eines Alltags,
          der pausenlos Aufmerksamkeit verlangt und keine Pausen mitliefert.
          Was hilft, ist nicht eine neue Disziplin — sondern drei sehr
          kleine, sehr konkrete Verschiebungen. Ich nenne sie unten.
        </p>
        <h2>1. Ein einziger Anfangsmoment, der dir gehört.</h2>
        <p>
          Bevor du das Handy entsperrst, bevor du den Kaffee machst,
          bevor du irgendwen ansprichst: dreißig Sekunden, in denen du
          nichts tust. Augen offen oder zu. Atem zählen oder schauen.
          Es geht nicht um Meditation. Es geht darum, einmal am Tag
          nicht von außen gestartet zu werden.
        </p>
        <h2>2. Ein Wort für deinen Zustand.</h2>
        <p>
          „Mir geht's gut" ist keine Auskunft. „Ich bin überfordert,
          aber nicht erschöpft" ist eine. Je präziser du benennen
          kannst, was gerade los ist, desto eher weißt du, was hilft.
        </p>
        <blockquote>
          „Es geht darum, die Welle zu surfen und sich nicht von ihr
          überrollen zu lassen."
        </blockquote>
        <h2>3. Ein Ende, das du markierst.</h2>
        <p>
          Der Arbeitstag endet nicht, wenn die Mails leer sind. Er
          endet, wenn du ihn endest. Ein Spaziergang um den Block,
          das Zuklappen des Laptops mit beiden Händen, ein Satz, den
          du dir leise sagst. Egal welches Ritual — Hauptsache, du
          machst eine Naht zwischen Arbeit und dir.
        </p>
        <p>
          Wenn du mehr darüber sprechen willst, was bei dir gerade
          zu viel ist: <a href="#">Schreib mir</a>. Das Erstgespräch
          ist kostenfrei.
        </p>
      </article>
      <NewsletterCTA variant="compact" />
      <section className="related">
        <h2 className="h2">Weiterlesen</h2>
        <div className="blog-grid">
          {related.map((p) => (
            <a key={p.id} href="#" className="blog-card">
              <div
                className="blog-card__img"
                style={{ backgroundImage: `url(${p.cover})` }}
              />
              <div className="blog-card__body">
                <p className={"eyebrow blog-card__eb--" + p.tone}>{p.eb}</p>
                <h3 className="blog-card__t">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

window.BlogArticle = BlogArticle;
