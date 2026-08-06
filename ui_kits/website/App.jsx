/* global React, Header, Hero, AudienceCards, AboutTeaser, Testimonials, Partners, Downloads, NewsletterCTA, Footer, AngeboteScreen, UeberMichScreen, KontaktScreen */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const HASH_TO_PAGE = {
  "#home": "home",
  "#angebote": "angebote",
  "#kurse": "kurse",
  "#ueber": "ueber",
  "#blog": "blog",
  "#kontakt": "kontakt",
};

function readRoute() {
  const hash = window.location.hash || "#home";
  const page = HASH_TO_PAGE[hash] || "home";
  return { page };
}

function App() {
  const [route, setRoute] = useStateApp(readRoute());

  useEffectApp(() => {
    const onHash = () => { setRoute(readRoute()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = (page, sub) => {
    // Cross-file kits
    if (page === "blog")    { window.location.href = "../blog/index.html"; return; }
    // Internal hash routing
    setRoute({ page, sub });
    if (page !== route.page) window.location.hash = "#" + page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BackgroundWave />
      <Header current={route.page} onNav={nav} />
      {route.page === "home" && (
        <>
          <Hero onCta={nav} />
          <AudienceCards onNav={nav} />
          <AboutTeaser onNav={nav} />
          <Testimonials />
          <Partners />
          <Downloads />
          <NewsletterCTA />
        </>
      )}
      {route.page === "angebote" && (
        <AngeboteScreen initial={route.sub} onNav={nav} />
      )}
      {route.page === "ueber" && <UeberMichScreen />}
      {route.page === "kontakt" && <KontaktScreen />}
      {(route.page === "kurse" || route.page === "blog") && (
        <main className="screen">
          <div className="page-head">
            <p className="eyebrow">Kurse</p>
            <h1 className="h-display">Aktuelle Kurse</h1>
            <p className="lede">
              Gruppenkurse für Kinder, Erwachsene und Unternehmen — präsenz und online.
            </p>
            <p className="body-sm" style={{ marginTop: 24, opacity: 0.6 }}>
              (Im UI-Kit als Platzhalter — Daten werden aus dem CMS gezogen.)
            </p>
          </div>
        </main>
      )}
      <Footer onNav={nav} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
