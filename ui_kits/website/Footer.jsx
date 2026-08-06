/* global React */

function Footer({ onNav }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="ft-col ft-col--brand">
          <div className="brand brand--ft">
            <img src="../../assets/logo.png" width="48" height="48" alt="" />
            <span className="brand__wm">Jessica Bisetto</span>
          </div>
          <p className="body-sm ft-blurb">
            Coaching für Kinder,<br />
            Erwachsene und Unternehmen.
          </p>
        </div>
        <div className="ft-col">
          <p className="eyebrow ft-eb">Praxis</p>
          <p className="body-sm">
            Stuttgarter Straße 3<br />
            73525 Schwäbisch Gmünd
          </p>
        </div>
        <div className="ft-col">
          <p className="eyebrow ft-eb">Kontakt</p>
          <p className="body-sm">
            <a href="tel:+4915253636003" className="ft-a">0152 / 536 360 03</a>
            <br />
            <a href="mailto:kontakt@jessica-bisetto.de" className="ft-a">
              kontakt@jessica-bisetto.de
            </a>
          </p>
        </div>
        <div className="ft-col">
          <p className="eyebrow ft-eb">Mehr</p>
          <ul className="ft-list">
            <li><a className="ft-a" onClick={() => onNav("angebote")}>Angebote</a></li>
            <li><a className="ft-a" onClick={() => onNav("ueber")}>Über mich</a></li>
            <li><a className="ft-a" onClick={() => onNav("blog")}>Blog</a></li>
            <li><a className="ft-a" href="index.html#elternbibliothek">Elternbibliothek</a></li>
            <li><a className="ft-a" onClick={() => onNav("kontakt")}>Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} Jessica Bisetto</span>
        <span className="dot">·</span>
        <a className="ft-a">Impressum</a>
        <span className="dot">·</span>
        <a className="ft-a">Datenschutz</a>
        <span className="dot">·</span>
        <a className="ft-a">AGB</a>
      </div>
    </footer>
  );
}

window.Footer = Footer;
