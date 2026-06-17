import { SectionLabel } from "../common/SectionLabel";
import { Picture } from "../Picture";
import { projects } from "../../data";

export function OngoingProjects() {
  return (
    <section className="ongoing section-light">
      <div className="section-grid section-heading">
        <SectionLabel index="07">Ongoing projects</SectionLabel>
        <div>
          <h2 data-reveal>Building what comes next.</h2>
          <p className="body-large" data-reveal>
            Homes and commercial spaces shaped by focused planning,
            responsible delivery, and a people-first approach.
          </p>
        </div>
      </div>
      <div className="ongoing-grid">
        {projects.slice(3, 7).map((project) => (
          <article className="ongoing-card" key={project.name} data-rise>
            <Picture
              image={project.image}
              alt={project.name}
              sizes="50vw"
            />
            <div>
              <span>{project.city}</span>
              <h3>{project.name}</h3>
              <p>{project.type}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
