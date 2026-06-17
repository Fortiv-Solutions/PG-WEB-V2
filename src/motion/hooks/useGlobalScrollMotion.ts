import { RefObject } from "react";
import { breakpoints, gsap, SplitText, motion, useGSAP } from "../gsap";

export function useGlobalScrollMotion(root: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(breakpoints.reduced).matches;
      if (reduceMotion) return;

      const revealSplits: SplitText[] = [];
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "reveal-line",
        });
        revealSplits.push(split);
        gsap.fromTo(
          split.lines,
          { yPercent: 105, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: motion.revealDuration,
            stagger: 0.08,
            ease: motion.easeInOut,
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: motion.easeInOut,
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count ?? 0);
        const suffix = element.dataset.suffix ?? "";
        const decimals = Number(element.dataset.decimals ?? 0);
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = `${state.value.toFixed(decimals)}${suffix}`;
          },
        });
      });
    },
    { scope: root }
  );
}
