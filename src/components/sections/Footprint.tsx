import { useState } from "react";
import { SectionLabel } from "../common/SectionLabel";
import { Picture } from "../Picture";
import { offices } from "../../data";

export function Footprint() {
  const [activeOffice, setActiveOffice] = useState(0);

  return (
    <section id="footprint" className="footprint section-dark">
      <div className="section-grid section-heading">
        <SectionLabel index="06">Our footprint</SectionLabel>
        <h2 data-reveal>
          Local understanding. Long-term commitment.
        </h2>
      </div>
      <div className="office-layout">
        <div className="office-images">
          {offices.map((office, index) => (
            <Picture
              className={`office-image ${activeOffice === index ? "is-active" : ""}`}
              image={office.image}
              alt={`${office.city} skyline`}
              key={office.city}
              sizes="50vw"
            />
          ))}
        </div>
        <div className="office-accordion">
          {offices.map((office, index) => (
            <article
              className={`office-item ${activeOffice === index ? "is-open" : ""}`}
              key={office.city}
            >
              <button
                 type="button"
                onClick={() => setActiveOffice(index)}
                aria-expanded={activeOffice === index}
                aria-controls={`office-details-${index}`}
                id={`office-button-${index}`}
              >
                <span>0{index + 1}</span>
                <strong>{office.city}</strong>
                <i aria-hidden="true">+</i>
              </button>
              <div 
                id={`office-details-${index}`} 
                className="office-details"
                role="region"
                aria-labelledby={`office-button-${index}`}
                hidden={activeOffice !== index}
              >
                <p>{office.address}</p>
                <span>{office.phone}</span>
                <span>{office.email}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
