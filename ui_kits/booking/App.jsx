/* global React, ReactDOM, Header, Footer, BookingFlow */

const NAV_MAP = {
  home:     "../website/index.html",
  angebote: "../website/index.html#angebote",
  kurse:    "../website/index.html#kurse",
  ueber:    "../website/index.html#ueber",
  kontakt:  "index.html",
  blog:     "../blog/index.html",
};

function App() {
  const nav = (page) => {
    const target = NAV_MAP[page];
    if (target) window.location.href = target;
  };
  return (
    <>
      <BackgroundWave />
      <Header current="kontakt" onNav={nav} />
      <BookingFlow />
      <Footer onNav={nav} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
