import { projects } from "../../data";
import { Picture } from "../Picture";

export function Hero() {
  return (
    <section id="home" className="hero-window-section header-trigger">
      {/* Background Image Sequence layer */}
      <div className="hero-window-media">
        <div className="hero-montage-container">
          {projects.map((project, index) => (
            <div key={project.name} className="hero-montage-image">
              <Picture
                image={project.image}
                alt={project.name}
                eager={index < 3} // Eager load the first few for performance
              />
            </div>
          ))}
        </div>
      </div>

      {/* The White Overlay that acts as a mask via mix-blend-mode */}
      <div className="hero-window-overlay">
        <div className="hero-window-text-wrapper">
          <div className="hero-window-text-top">
            <span className="hero-intro-split">A class of its own.</span>
          </div>
          
          <div className="hero-title-container">
            <h1 className="hero-window-title">
              <span className="hero-title-inner">PRAMUKH.</span>
            </h1>
            <div className="hero-tagline">
              Built on trust, chosen for your next property.
            </div>
          </div>

          <div className="hero-window-text-bottom">
            <span className="hero-intro-split">Since 1993</span>
            <span className="hero-intro-split">Surat · Vapi · Silvassa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
