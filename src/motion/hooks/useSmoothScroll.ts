import { RefObject, useEffect, useState } from "react";
import { breakpoints, gsap, ScrollSmoother } from "../gsap";

export function useSmoothScroll(root: RefObject<HTMLDivElement | null>) {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(breakpoints.reduced).matches;
    if (reduceMotion) return;

    let localSmoother: ScrollSmoother | null = null;
    const media = gsap.matchMedia();

    media.add(breakpoints.smooth, () => {
      localSmoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.05,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
      setSmoother(localSmoother);
      
      return () => {
        localSmoother?.kill();
        setSmoother(null);
      };
    });

    return () => {
      media.revert();
    };
  }, []);

  return smoother;
}
