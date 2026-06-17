import { MouseEvent } from "react";
import { FlipText, navItems } from "../../App";

interface FooterProps {
  navigate: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer id="contact" className="footer section-dark">
      <div className="footer-cta">
        <p data-reveal>Let’s create lasting value.</p>
        <h2 data-reveal>We’re easy to reach and even easier to work with.</h2>
        <button
          type="button"
          className="footer-button"
          onClick={(event) => navigate(event, "#footprint")}
          data-magnetic
        >
          <FlipText>Start a conversation</FlipText>
        </button>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/media/pramukh-logo.svg" alt="Pramukh" />
          <p>
            Enduring spaces across Surat, Vapi, and Silvassa since 1993.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <div aria-labelledby="footer-explore-heading">
            <span id="footer-explore-heading">Explore</span>
            {navItems.map(([label, href]) => (
              <a
                 href={href}
                onClick={(event) => navigate(event, href)}
                key={href}
              >
                {label}
              </a>
            ))}
          </div>
          <div aria-labelledby="footer-connect-heading">
            <span id="footer-connect-heading">Connect</span>
            <a href="#contact">Instagram</a>
            <a href="#contact">LinkedIn</a>
            <a href="#contact" aria-label="Visit our YouTube">YouTube</a>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pramukh Group</span>
        <span>Privacy · Terms</span>
        <button
           type="button"
          onClick={(event) => navigate(event, "#home")}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
