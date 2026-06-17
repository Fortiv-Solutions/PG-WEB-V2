import { SectionLabel } from "../common/SectionLabel";
import { Picture } from "../Picture";
import { projects } from "../../data";

export function Portfolio() {
  return (
    <section className="portfolio-pin section-dark">
      <div className="portfolio-heading">
        <SectionLabel index="03">Project portfolio</SectionLabel>
        <h2>Places with presence.</h2>
      </div>
      <div className="portfolio-track">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name} data-cursor>
            <div className="project-card-media">
              <Picture
                image={project.image}
                alt={project.name}
                sizes="52vw"
              />
              <span>0{index + 1}</span>
            </div>
            <div className="project-card-copy">
              <p>{project.city}</p>
              <h3>{project.name}</h3>
              <span>{project.type}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
