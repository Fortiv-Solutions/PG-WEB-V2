import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import {
  breakpoints,
  gsap,
  motion,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "./gsap";
import { nextIndex } from "../utils/content";

export function useLandingMotion(
  root: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(breakpoints.reduced).matches;
      let smoother: ScrollSmoother | null = null;

      if (reduceMotion) {
        gsap.set(".preloader", { display: "none" });
        gsap.set(".hero-window-overlay", { display: "none" }); // Just show video if reduced motion
        document.body.classList.remove("is-loading");
      } else {
        document.body.classList.add("is-loading");
      }

      const media = gsap.matchMedia();
      media.add(breakpoints.smooth, () => {
        if (reduceMotion) return;
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.05,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });
        return () => {
          smoother?.kill();
          smoother = null;
        };
      });

      if (!reduceMotion) {
        // Prepare text splits
        const splitTextElements = gsap.utils.toArray<HTMLElement>(".hero-intro-split");
        const splits = splitTextElements.map(el => new SplitText(el, { type: "chars,words", charsClass: "hero-copy-char" }));
        
        gsap.set(".hero-copy-char", { yPercent: 110, autoAlpha: 0 });
        gsap.set(".hero-montage-container", { autoAlpha: 0 });

        const preloaderTimeline = gsap.timeline({
          defaults: { ease: motion.easeInOut },
          onComplete: () => {
            document.body.classList.remove("is-loading");
            gsap.set(".preloader", { display: "none" });
            ScrollTrigger.refresh();
          },
        });

        // Preloader Sequence
        preloaderTimeline
          .fromTo(".preloader-column", { y: "280vh" }, { y: "-120vh", duration: 1.8, ease: motion.easeStrong }, 0)
          .fromTo(".preloader-image", { scale: 0.4 }, { scale: 1, duration: 1.8 }, 0)
          .fromTo(".preloader-image img", { scale: 1.45, y: "24vh" }, { scale: 1, y: "-10vh", duration: 1.6 }, 0.1)
          .to(".preloader-center", { width: "100vw", height: "100vh", duration: 0.8 }, 0.8)
          .to(".preloader-grid", { columnGap: 0, duration: 0.7 }, 0.9)
          .to(".preloader-logo", { scale: 0, duration: 0.6 }, 1.6)
          .to(".preloader", { autoAlpha: 0, duration: 0.5 }, 1.8)
          .fromTo(".header-reveal", { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.06 }, 1.9)
          .fromTo(".brand-mark", { yPercent: 112 }, { yPercent: 0, duration: 0.6 }, 1.95)
          .to(".hero-montage-container", { autoAlpha: 1, duration: 1.5, ease: motion.easeStrong }, 1.8)
          .to(".hero-copy-char", { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.012, ease: "expo.out" }, 2.0);

        // Dynamic Montage Controller
        const montageImages = gsap.utils.toArray<HTMLElement>(".hero-montage-image");
        let currentMode: "pulse" | "gallery" = "pulse";
        let activeIndex = 0;
        let loopTimer: gsap.core.Tween | null = null;
        let loopNextImage = () => {};

        if (montageImages.length > 0) {
          gsap.set(montageImages, { autoAlpha: 0 });
          gsap.set(montageImages[0], { autoAlpha: 1 });

          loopNextImage = () => {
            const prevIndex = activeIndex;
            activeIndex = (activeIndex + 1) % montageImages.length;

            if (currentMode === "pulse") {
              // Pulse Mode: Hard cuts, high energy
              gsap.set(montageImages[activeIndex], { autoAlpha: 1 });
              gsap.set(montageImages[prevIndex], { autoAlpha: 0 });
              loopTimer = gsap.delayedCall(2.5, loopNextImage);
            } else {
              // Gallery Mode: Slow, elegant crossfades
              gsap.to(montageImages[activeIndex], { autoAlpha: 1, duration: 1.5, ease: "power2.inOut" });
              gsap.to(montageImages[prevIndex], { autoAlpha: 0, duration: 1.5, ease: "power2.inOut" });
              loopTimer = gsap.delayedCall(3.5, loopNextImage);
            }
          };

          // Start loop
          loopTimer = gsap.delayedCall(2.5, loopNextImage);

          // Slow continuous zoom on the whole container to make it smooth
          gsap.fromTo(".hero-montage-container", 
            { scale: 1.15 }, 
            { scale: 1, duration: 25, ease: "none", repeat: -1, yoyo: true }
          );
        }

        // Scroll animations for Window Concept
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-window-section",
            start: "top top",
            end: "+=150%", // Scale happens over 1.5 viewport height of scroll
            scrub: 0.5,
            pin: true,
            onUpdate: (self) => {
              const newMode = self.progress > 0.8 ? "gallery" : "pulse";
              if (newMode !== currentMode) {
                currentMode = newMode;
                if (loopTimer) loopTimer.kill();
                
                if (currentMode === "pulse") {
                  // Switch back to pulse: Kill crossfades, do immediate hard cut
                  gsap.killTweensOf(montageImages);
                  loopNextImage();
                } else {
                  // Switch to gallery: Hold current image slightly longer, then start crossfades
                  loopTimer = gsap.delayedCall(0.5, loopNextImage);
                }
              }
            }
          }
        });

        // Fade out top and bottom supporting text quickly
        scrollTl.to(".hero-window-text-top, .hero-window-text-bottom", {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.15
        }, 0);

        // Scale the mask overlay infinitely to zoom through the 'M'
        scrollTl.to(".hero-window-overlay", {
          scale: 120,
          transformOrigin: "50% 50%", // Zooms straight into the center
          duration: 1,
          ease: "expo.in"
        }, 0);
        
        // Hide the overlay at the very end to prevent giant vector text aliasing and make the montage crisp
        scrollTl.to(".hero-window-overlay", {
          autoAlpha: 0,
          duration: 0.1
        }, 0.9);
      }

      if (!reduceMotion) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "body",
              start: "80px top",
              toggleActions: "play none none reverse",
            },
          })
          .to(".site-header", { 
            backgroundColor: "rgba(20,20,19,0.85)", 
            backdropFilter: "blur(16px)", 
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            duration: 0.4 
          }, 0)
          .to(".header-logo", { scale: 0.85, transformOrigin: "left center", duration: 0.4 }, 0);
      }

      if (!reduceMotion) {
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
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        if (reduceMotion) return;
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

      media.add(breakpoints.desktop, () => {
        if (reduceMotion) return;
        const projectLayers = gsap.utils.toArray<HTMLElement>(
          ".featured-project",
        );
        const projectCopy = gsap.utils.toArray<HTMLElement>(
          ".featured-copy-item",
        );

        gsap.set(projectLayers.slice(1), { autoAlpha: 0 });
        gsap.set(projectCopy.slice(1), { autoAlpha: 0, yPercent: 35 });

        const featured = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".featured-pin",
              start: "top top",
              end: () => `+=${window.innerHeight * 7}`,
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(".featured-frame", { width: "100vw", height: "100vh", left: "0vw", borderRadius: 0, duration: 2.5 }, 0)
          .to(".featured-dummy", { xPercent: 20, autoAlpha: 0, duration: 1.5 }, 0)
          .to(".featured-blur", { backdropFilter: "blur(0px)", duration: 1.7 }, 0.8)
          .fromTo(".featured-kicker", { yPercent: 105 }, { yPercent: 0, duration: 0.8 }, 0.1);

        for (let index = 1; index < projectLayers.length; index += 1) {
          const at = 2.2 + index * 2.3;
          featured
            .to(projectLayers[index - 1], { autoAlpha: 0, scale: 0.9, duration: 0.8 }, at)
            .fromTo(
              projectLayers[index],
              { autoAlpha: 0, yPercent: 100, scale: 1 },
              { autoAlpha: 1, yPercent: 0, duration: 0.9 },
              at,
            )
            .to(projectCopy[index - 1], { autoAlpha: 0, yPercent: -30, duration: 0.5 }, at)
            .to(projectCopy[index], { autoAlpha: 1, yPercent: 0, duration: 0.7 }, at + 0.1);
        }

        const portfolioTrack = document.querySelector<HTMLElement>(".portfolio-track");
        if (portfolioTrack) {
          gsap.to(portfolioTrack, {
            x: () => -(portfolioTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".portfolio-pin",
              start: "top top",
              end: () => `+=${portfolioTrack.scrollWidth}`,
              scrub: 1.2,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        }

        const stages = gsap.utils.toArray<HTMLElement>(".process-stage");
        gsap.set(stages.slice(1), { autoAlpha: 0, yPercent: 30 });
        const processTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".ownership-pin",
            start: "top top",
            end: () => `+=${window.innerHeight * 4.5}`,
            scrub: 1.1,
            pin: true,
          },
        });
        stages.forEach((stage, index) => {
          if (!index) return;
          const at = index * 1.2;
          processTimeline
            .to(stages[index - 1], { autoAlpha: 0, yPercent: -30, duration: 0.45 }, at)
            .to(stage, { autoAlpha: 1, yPercent: 0, duration: 0.65 }, at + 0.12)
            .to(".process-number-track", { yPercent: -index * 16.6667, duration: 0.7 }, at);
        });
      });

      media.add(breakpoints.mobile, () => {
        if (reduceMotion) return;
        gsap.fromTo(
          ".featured-frame",
          { clipPath: "inset(18% 8% round 1rem)" },
          {
            clipPath: "inset(0% 0% round 0rem)",
            scrollTrigger: {
              trigger: ".featured-pin",
              start: "top 80%",
              end: "top 10%",
              scrub: 0.7,
            },
          },
        );
      });

      if (!reduceMotion) {
        gsap.fromTo(
          ".film-media",
          { yPercent: 12, scale: 1.08 },
          {
            yPercent: -12,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".film-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }

      let cursorCleanup: (() => void) | undefined;
      const cursor = document.querySelector<HTMLElement>(".cursor");
      if (cursor && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3" });
        const moveCursor = (event: PointerEvent) => {
          cursor.classList.add("is-visible");
          xTo(event.clientX);
          yTo(event.clientY);
        };
        window.addEventListener("pointermove", moveCursor);
        const hoverCleanups: Array<() => void> = [];
        gsap.utils.toArray<HTMLElement>("a, button, [data-cursor]").forEach((item) => {
          const enter = () => cursor.classList.add("is-active");
          const leave = () => cursor.classList.remove("is-active");
          item.addEventListener("mouseenter", enter);
          item.addEventListener("mouseleave", leave);
          hoverCleanups.push(() => {
            item.removeEventListener("mouseenter", enter);
            item.removeEventListener("mouseleave", leave);
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((item) => {
          const move = (event: PointerEvent) => {
            const rect = item.getBoundingClientRect();
            gsap.to(item, {
              x: (event.clientX - rect.left - rect.width / 2) * 0.18,
              y: (event.clientY - rect.top - rect.height / 2) * 0.18,
              duration: 0.35,
            });
          };
          const leave = () => gsap.to(item, { x: 0, y: 0, duration: 0.55 });
          item.addEventListener("pointermove", move);
          item.addEventListener("pointerleave", leave);
          hoverCleanups.push(() => {
            item.removeEventListener("pointermove", move);
            item.removeEventListener("pointerleave", leave);
          });
        });

        cursorCleanup = () => {
          window.removeEventListener("pointermove", moveCursor);
          cursor.classList.remove("is-visible");
          hoverCleanups.forEach((cleanup) => cleanup());
        };
      }

      const navigate = (event: Event) => {
        const sectionId = (event as CustomEvent<string>).detail;
        const destination = document.querySelector(sectionId);
        if (!destination) return;
        if (reduceMotion) {
          destination.scrollIntoView({ behavior: "auto" });
          return;
        }
        gsap
          .timeline()
          .set(".transition-curtain", { xPercent: 100 })
          .to(".transition-curtain", { xPercent: 0, duration: 0.7, ease: motion.easeInOut })
          .add(() => {
            if (smoother) smoother.scrollTo(destination, false, "top top");
            else destination.scrollIntoView({ behavior: "auto" });
          })
          .to(".transition-curtain", { xPercent: -100, duration: 0.75, ease: motion.easeInOut }, "+=.08")
          .set(".transition-curtain", { xPercent: 100 });
      };
      window.addEventListener("pramukh:navigate", navigate);

      return () => {
        media.revert();
        cursorCleanup?.();
        window.removeEventListener("pramukh:navigate", navigate);
        document.body.classList.remove("is-loading");
      };
    },
    { scope: root },
  );
}

export function useMenuMotion(
  root: RefObject<HTMLDivElement | null>,
  menuOpen: boolean,
) {
  useGSAP(
    () => {
      document.body.classList.toggle("menu-open", menuOpen);
      const timeline = gsap.timeline({ defaults: { ease: motion.easeInOut } });
      if (menuOpen) {
        timeline
          .set(".menu-overlay", { pointerEvents: "auto" })
          .to(".menu-backdrop", { autoAlpha: 1, duration: 0.35 }, 0)
          .fromTo(".menu-panel", { yPercent: -105 }, { yPercent: 0, duration: 1.05 }, 0)
          .fromTo(
            ".menu-link-inner",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.06 },
            0.18,
          )
          .fromTo(
            ".menu-detail",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.38,
          );
      } else {
        timeline
          .to(".menu-detail", { autoAlpha: 0, duration: 0.2 }, 0)
          .to(".menu-link-inner", { yPercent: -110, duration: 0.4, stagger: 0.025 }, 0)
          .to(".menu-panel", { yPercent: -105, duration: 0.75 }, 0.08)
          .to(".menu-backdrop", { autoAlpha: 0, duration: 0.3 }, 0.3)
          .set(".menu-overlay", { pointerEvents: "none" });
      }
      return () => document.body.classList.remove("menu-open");
    },
    { scope: root, dependencies: [menuOpen], revertOnUpdate: true },
  );
}
