"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Wires every element matching `selector` (relative to a root ref) to drive
 * --mx / --my / --spot-strength CSS vars and a subtle 3D tilt from pointer position.
 *
 * Use with `.spotlight` class on the card itself.
 */
export function useSpotlight<T extends HTMLElement>(
  rootRef: React.RefObject<T | null>,
  selector: string,
  options: { tilt?: number; lift?: number } = {}
) {
  const { tilt = 4, lift = 6 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const xTo = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3" });
      const liftTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });

      gsap.set(card, { transformPerspective: 900, transformStyle: "preserve-3d" });

      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;

        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);

        xTo((px - 0.5) * tilt * 2);
        yTo(-(py - 0.5) * tilt * 2);
      };

      const onEnter = () => {
        gsap.to(card, {
          "--spot-strength": 1,
          duration: 0.45,
          ease: "power3",
        } as gsap.TweenVars);
        liftTo(-lift);
      };

      const onLeave = () => {
        gsap.to(card, {
          "--spot-strength": 0,
          duration: 0.6,
          ease: "power3",
        } as gsap.TweenVars);
        xTo(0);
        yTo(0);
        liftTo(0);
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef, selector, tilt, lift]);
}
