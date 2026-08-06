/* global React */
const { useState } = React;

function Logo({ size = 36, inverted = false }) {
  return (
    <img
      src="../../assets/logo.png"
      alt="Jessica Bisetto"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        filter: inverted ? "invert(1)" : "none",
        display: "block",
      }}
    />
  );
}

function Header({ current, onNav }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "angebote", label: "Angebote" },
    { id: "kurse", label: "Kurse" },
    { id: "ueber", label: "Über mich" },
    { id: "blog", label: "Blog" },
    { id: "kontakt", label: "Kontakt" },
  ];
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNav("home");
          }}
        >
          <Logo size={48} />
          <span className="brand__wm">Jessica Bisetto</span>
        </a>
        <nav className="nav-desk">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              className={"nav-link" + (current === it.id ? " is-current" : "")}
              onClick={(e) => {
                e.preventDefault();
                onNav(it.id);
              }}
            >
              {it.label}
            </a>
          ))}
          <a
            href="#"
            className="btn btn-pri btn-sm"
            onClick={(e) => {
              e.preventDefault();
              onNav("kontakt");
            }}
          >
            Erstgespräch
            <span className="arr">→</span>
          </a>
        </nav>
        <button
          className="nav-burger"
          aria-label="Menü"
          onClick={() => setOpen(!open)}
        >
          <img src="../../assets/icons/menu.svg" width="22" height="22" />
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNav(it.id);
                setOpen(false);
              }}
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

window.Logo = Logo;
window.Header = Header;
