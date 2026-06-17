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
      <div className="featured-dummy featured-dummy-1">
        <Picture image={projects[1].image} alt={projects[1].name} />
        <div className="featured-blur" />
        <div className="dummy-copy">
          <p>{projects[1].city} · {projects[1].type}</p>
          <h2>{projects[1].name}</h2>
        </div>
      </div>
      <div className="featured-dummy featured-dummy-2">
        <Picture image={projects[2].image} alt={projects[2].name} />
        <div className="featured-blur" />
        <div className="dummy-copy">
          <p>{projects[2].city} · {projects[2].type}</p>
          <h2>{projects[2].name}</h2>
        </div>
      </div>
    </section>
  );
}
