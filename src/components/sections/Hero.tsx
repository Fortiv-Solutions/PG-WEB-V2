import { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react";
import { Picture } from "../Picture";

export function Hero({
  heroSlides,
  activeHero,
  heroController,
}: {
  heroSlides: any[];
  activeHero: number;
  heroController: MutableRefObject<((index: number) => void) | null>;
}) {
  return (
    <section id="home" className="hero header-trigger">
      <div
        className="hero-chrome"
        style={{ backgroundColor: heroSlides[0].color }}
      />
      <div className="hero-media">
        {heroSlides.map((slide, index) => (
          <div
            className={`hero-layer hero-layer-${index}`}
            style={{ "--slide-color": slide.color } as CSSProperties}
            key={slide.id}
            aria-hidden={activeHero !== index}
          >
            {slide.media.kind === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={slide.media.poster}
                preload="metadata"
              >
                <source src={slide.media.src} type="video/mp4" />
              </video>
            ) : (
              <Picture
                image={slide.media.image}
                alt={slide.media.alt}
                eager={index === 1}
              />
            )}
            <div className="hero-shade" />
          </div>
        ))}
      </div>

      <div className="hero-copy-stack">
        {heroSlides.map((slide) => (
          <div className="hero-copy" key={slide.id}>
            <p className="hero-eyebrow hero-intro-split">
              {slide.eyebrow}
            </p>
            <h1>
              <span className="hero-title-line hero-title-pair hero-intro-split">
                <span className="hero-title-word">Designed.</span>
                <span className="hero-title-word">Delivered.</span>
              </span>
              <span className="hero-title-line hero-intro-split">
                Trusted.
              </span>
            </h1>
            <p className="hero-project hero-intro-split">
              {slide.name} · {slide.location}
            </p>
          </div>
        ))}
      </div>

      <div className="hero-bottom-bar">
        <div className="hero-selectors" aria-label="Featured projects">
          {heroSlides.map((slide, index) => (
            <button
              className={`hero-selector ${activeHero === index ? "is-active" : ""}`}
              type="button"
              onClick={() => heroController.current?.(index)}
              aria-label={`Show ${slide.name}`}
              key={slide.id}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="21" />
                <circle
                  className="hero-progress-path"
                  cx="24"
                  cy="24"
                  r="21"
                />
              </svg>
              <span>
                <strong>{slide.name}</strong>
                <small>{slide.type}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="hero-meta">
          <span>60+ projects delivered</span>
          <span>Pramukh Group © Since 1993</span>
          <span>Surat · Vapi · Silvassa</span>
        </div>
      </div>
    </section>
  );
}
