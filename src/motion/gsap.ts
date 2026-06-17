import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  DrawSVGPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  CustomEase,
  useGSAP,
);

CustomEase.create("pramukh-ease", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("pramukh-strong", "M0,0 C0.175,0.885 0.32,1.275 1,1");

export { DrawSVGPlugin, gsap, ScrollSmoother, ScrollTrigger, SplitText, CustomEase, useGSAP };

export const motion = {
  easeInOut: "pramukh-ease",
  easeStrong: "pramukh-strong",
  revealDuration: 0.85,
  heroBeat: 6,
};

export const breakpoints = {
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  smooth: "(min-width: 577px)",
  reduced: "(prefers-reduced-motion: reduce)",
};
