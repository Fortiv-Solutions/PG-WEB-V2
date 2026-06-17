import { Dispatch, MouseEvent, SetStateAction } from "react";
import { FlipText } from "../common/FlipText";

const navItems = [
  ["Projects", "#projects"],
  ["Difference", "#difference"],
  ["Ownership", "#ownership"],
  ["Footprint", "#footprint"],
  ["Contact", "#contact"],
] as const;

export function Header({
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  navigate: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => void;
}) {
  return (
    <header className="site-header">
      <div className="header-shell">
        <a
          className="header-logo header-reveal"
          href="#home"
          onClick={(event) => navigate(event, "#home")}
          aria-label="Pramukh home"
        >
          <span className="brand-mark">
            <img src="/media/pramukh-logo.svg" alt="Pramukh" />
          </span>
        </a>
        <nav className="header-nav" aria-label="Primary navigation">
          {navItems.slice(0, 4).map(([label, href]) => (
            <a
              className="header-nav-link"
              href={href}
              onClick={(event) => navigate(event, href)}
              key={href}
            >
              <FlipText>{label}</FlipText>
            </a>
          ))}
        </nav>
        <nav className="header-nav header-nav-right" aria-label="Secondary">
          <a
            className="header-contact"
            href="#contact"
            onClick={(event) => navigate(event, "#contact")}
          >
            <FlipText>Enquire</FlipText>
          </a>
          <button
            className="menu-button header-reveal"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label="Open menu"
            data-magnetic
          >
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
