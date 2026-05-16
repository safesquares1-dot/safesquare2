"use client";

import { useEffect } from "react";

/**
 * Adds `.is-revealed` to every `.img-reveal` element under rootRef once
 * it crosses the viewport threshold. The reveal animation itself lives in CSS
 * so it works with reduced motion gracefully and doesn't require JS keyframes.
 */
export function useImageReveal<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  selector = ".img-reveal"
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(selector);
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => t.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.05 }
    );

    targets.forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, [rootRef, selector]);
}
