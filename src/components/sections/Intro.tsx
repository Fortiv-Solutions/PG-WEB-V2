import { SectionLabel } from "../common/SectionLabel";
import { facts } from "../../data";
import { factParts } from "../../utils/content";

export function Intro() {
  return (
    <section className="intro section-light">
      <div className="section-grid">
        <SectionLabel index="01">The Pramukh standard</SectionLabel>
        <div className="intro-copy">
          <p className="eyebrow" data-reveal>
            A class of its own
          </p>
          <h2 data-reveal>
            Enduring spaces, built with clarity, commitment, and
            long-term value.
          </h2>
          <p className="body-large" data-reveal>
            With deep expertise in development, construction, and
            planning, Pramukh creates residential and commercial
            projects that elevate lifestyles and shape thriving
            communities.
          </p>
        </div>
      </div>

      <div className="ribbon-row" aria-hidden="true">
        <span>Trust</span>
        <span>Quality</span>
        <span>Ownership</span>
        <span>Delivery</span>
      </div>

      <div className="facts-grid">
        {facts.map(([value, label]) => {
          const parts = factParts(value);
          return (
            <article className="fact" key={label} data-rise>
              <strong
                data-count={parts.target}
                data-suffix={parts.suffix}
                data-decimals={parts.decimals}
              >
                {value}
              </strong>
              <span>{label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
