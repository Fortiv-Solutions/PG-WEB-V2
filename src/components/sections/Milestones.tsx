import { SectionLabel } from "../common/SectionLabel";
import { Picture } from "../Picture";
import { milestones } from "../../data";

export function Milestones() {
  return (
    <section className="milestones section-warm">
      <div className="section-grid section-heading">
        <SectionLabel index="02">Track record</SectionLabel>
        <h2 data-reveal>
          Measured in trust, delivery, and places that endure.
        </h2>
      </div>
      <div className="milestone-list">
        {milestones.map((milestone, index) => (
          <article className="milestone-card" key={milestone.title} data-rise>
            <span className="milestone-index">0{index + 1}</span>
            <strong>{milestone.year}</strong>
            <div>
              <h3>{milestone.title}</h3>
              <p>{milestone.body}</p>
            </div>
            <Picture
              image={milestone.image}
              alt=""
              sizes="22vw"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
