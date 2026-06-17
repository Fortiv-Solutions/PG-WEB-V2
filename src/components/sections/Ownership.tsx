import { SectionLabel } from "../common/SectionLabel";
import { processStages } from "../../data";

export function Ownership() {
  return (
    <section id="ownership" className="ownership-pin section-gold">
      <div className="ownership-intro">
        <SectionLabel index="05">All-in Ownership™</SectionLabel>
        <h2>We own every detail, from first thought to life beyond delivery.</h2>
      </div>
      <div className="process-numbers" aria-hidden="true">
        <div className="process-number-track">
          {processStages.map((stage) => (
            <span key={stage.number}>{stage.number}</span>
          ))}
        </div>
      </div>
      <div className="process-stages">
        {processStages.map((stage) => (
          <article className="process-stage" key={stage.number}>
            <span>{stage.number}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </article>
        ))}
      </div>
      <div className="ownership-orbit" aria-hidden="true">
        <span />
        <span />
        <img src="/media/pramukh-monogram.svg" alt="" />
      </div>
    </section>
  );
}
