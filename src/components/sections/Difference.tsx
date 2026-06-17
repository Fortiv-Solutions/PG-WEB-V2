import { SectionLabel } from "../common/SectionLabel";
import { Picture } from "../Picture";
import { principles } from "../../data";

export function Difference() {
  return (
    <section id="difference" className="difference section-light">
      <div className="section-grid section-heading">
        <SectionLabel index="04">How we differ</SectionLabel>
        <div>
          <h2 data-reveal>
            What sets Pramukh apart is not only what we build, but how
            we build.
          </h2>
          <p className="body-large" data-reveal>
            Three principles shape every decision and every
            relationship.
          </p>
        </div>
      </div>
      <div className="principle-list">
        {principles.map((principle) => (
          <article className="principle-card" key={principle.number}>
            <div className="principle-copy" data-rise>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </div>
            <Picture
              image={principle.image}
              alt=""
              sizes="45vw"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
