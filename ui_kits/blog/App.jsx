/* global React, Header, Footer, BlogList, BlogArticle, NewsletterCTA */

const NAV_MAP = {
  home:     "../website/index.html",
  angebote: "../website/index.html#angebote",
  kurse:    "../website/index.html#kurse",
  ueber:    "../website/index.html#ueber",
  kontakt:  "../booking/index.html",
  blog:     "index.html",
};

function BlogApp() {
  const [post, setPost] = React.useState(null);

  const nav = (page, sub) => {
    if (page === "blog") { setPost(null); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const target = NAV_MAP[page];
    if (target) window.location.href = target + (sub ? "?aud=" + sub : "");
  };

  return (
    <>
      <BackgroundWave />
      <Header current="blog" onNav={nav} />
      {post ? (
        <BlogArticle post={post} onBack={() => setPost(null)} />
      ) : (
        <BlogList onOpen={setPost} />
      )}
      <Footer onNav={nav} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<BlogApp />);
