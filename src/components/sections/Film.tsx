import { MouseEvent } from "react";

interface FilmProps {
  navigate: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, section: string) => void;
}

export function Film({ navigate }: FilmProps) {
  return (
    <section className="film-section">
      <video
        className="film-media"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster="/media/about-video-poster-1800.webp"
      >
        <source src="/media/pramukh-film.mp4" type="video/mp4" />
      </video>
      <div className="film-overlay">
        <p>Pramukh Group</p>
        <h2 data-reveal>Designed. Delivered. Trusted.</h2>
        <button
          type="button"
          className="round-button"
          onClick={(event) => navigate(event, "#projects")}
          data-magnetic
        >
          Explore
        </button>
      </div>
    </section>
  );
}
