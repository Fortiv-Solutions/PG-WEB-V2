import { Picture } from "../Picture";
import { projects } from "../../data";

export function FeaturedProjects() {
  return (
    <section id="projects" className="featured-pin section-dark">
      <div className="featured-frame">
        <div className="featured-media">
          {projects.slice(0, 3).map((project, index) => (
            <Picture
              className={`featured-project featured-project-${index}`}
              image={project.image}
              alt={project.name}
              key={project.name}
            />
          ))}
          <div className="featured-blur" />
        </div>
        <div className="featured-top">
          <span className="featured-kicker">Step into Pramukh</span>
          <span>Featured developments</span>
        </div>
        <div className="featured-copy">
          {projects.slice(0, 3).map((project, index) => (
            <article
              className={`featured-copy-item featured-copy-${index}`}
              key={project.name}
            >
              <p>{project.city} · {project.type}</p>
              <h2>{project.name}</h2>
              <span>{project.description}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
