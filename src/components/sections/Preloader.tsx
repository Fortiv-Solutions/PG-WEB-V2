import { useGSAP, motion, gsap, SplitText } from "../../motion/gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  useGSAP(() => {
    // We'll move the GSAP logic for the preloader here soon
  });

  return (
    <div 
      className="preloader" 
      role="progressbar" 
      aria-valuemin={0} 
      aria-valuemax={100} 
      aria-label="Loading Pramukh website"
    >
      <div className="preloader-grid">
        {["orbit-5", "one-tapi", "agastya"].map((image, index) => (
          <div
            className={`preloader-column ${index === 1 ? "preloader-center" : ""}`}
            key={image}
          >
            <div className="preloader-image">
              <img
                src={`/media/${image}-720.webp`}
                alt=""
                fetchPriority="high"
              />
            </div>
          </div>
        ))}
      </div>
      <img className="preloader-logo" src="/media/pramukh-logo.svg" alt="" />
    </div>
  );
}
