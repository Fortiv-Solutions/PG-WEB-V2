import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  facts,
  heroSlides,
  milestones,
  offices,
  principles,
  processStages,
  projects,
} from "./data";
import { Picture } from "./components/Picture";
import {
  useLandingMotion,
  useMenuMotion,
} from "./motion/useLandingMotion";
import { Intro } from "./components/sections/Intro";
import { FeaturedProjects } from "./components/sections/FeaturedProjects";
import { Milestones } from "./components/sections/Milestones";
import { Portfolio } from "./components/sections/Portfolio";
import { Difference } from "./components/sections/Difference";
import { Preloader } from "./components/sections/Preloader";
import { Header } from "./components/sections/Header";
import { Menu } from "./components/sections/Menu";
import { Hero } from "./components/sections/Hero";
import { Ownership } from "./components/sections/Ownership";
import { Footprint } from "./components/sections/Footprint";
import { Film } from "./components/sections/Film";
import { OngoingProjects } from "./components/sections/OngoingProjects";
import { Footer } from "./components/sections/Footer";

export const navItems = [
  ["Projects", "#projects"],
  ["Difference", "#difference"],
  ["Ownership", "#ownership"],
  ["Footprint", "#footprint"],
  ["Contact", "#contact"],
] as const;

export function FlipText({ children }: { children: string }) {
  return (
    <span className="flip-text" aria-label={children}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function App() {
  const root = useRef<HTMLDivElement>(null);
  const heroController = useRef<((index: number) => void) | null>(null);
  const [activeHero, setActiveHero] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  useLandingMotion(root, setActiveHero, heroController);
  useMenuMotion(root, menuOpen);

  const navigate = (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    section: string,
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("pramukh:navigate", { detail: section }),
    );
  };

  return (
    <div ref={root} className="site-root">
      <div className="cursor" aria-hidden="true">
        <span>View</span>
      </div>
      <div className="transition-curtain" aria-hidden="true" />

      <Preloader onComplete={() => {}} />

      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        navigate={navigate} 
      />

      <Menu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        navigate={navigate} 
      />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero 
              heroSlides={heroSlides} 
              activeHero={activeHero} 
              heroController={heroController} 
            />

            <Intro />

            <FeaturedProjects />

            <Milestones />

            <Portfolio />

            <Difference />

            <Ownership />
            <Footprint />
            <Film navigate={navigate} />
            <OngoingProjects />
            <Footer navigate={navigate} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
