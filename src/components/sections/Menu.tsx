import { Dispatch, MouseEvent, SetStateAction } from "react";

const navItems = [
  ["Projects", "#projects"],
  ["Difference", "#difference"],
  ["Ownership", "#ownership"],
  ["Footprint", "#footprint"],
  ["Contact", "#contact"],
] as const;

export function Menu({
  menuOpen,
  setMenuOpen,
  navigate,
}: {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  navigate: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => void;
}) {
  return (
    <div
      id="site-menu"
      className="menu-overlay"
      aria-hidden={!menuOpen}
    >
      <button
        className="menu-backdrop"
        type="button"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      />
      <div className="menu-panel">
        <div className="menu-top">
          <img src="/media/pramukh-logo.svg" alt="Pramukh" />
          <button
            type="button"
            className="menu-close"
            onClick={() => setMenuOpen(false)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label="Close menu"
            data-magnetic
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav className="menu-links" aria-label="Menu navigation">
          {navItems.map(([label, href], index) => (
            <a
              href={href}
              key={href}
              onClick={(event) => navigate(event, href)}
            >
              <span className="menu-index">0{index + 1}</span>
              <span className="menu-link-mask">
                <span className="menu-link-inner">{label}</span>
              </span>
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <p className="menu-detail">
            Surat · Vapi · Silvassa
          </p>
          <p className="menu-detail">Building trust since 1993.</p>
        </div>
      </div>
    </div>
  );
}
