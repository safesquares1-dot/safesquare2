"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Editorial custom cursor.
 * — Soft inner dot + outer ring that follow with eased quickTo.
 * — Auto-scales over `data-cursor` targets; shows a label when `data-cursor-text` is set.
 * — Hides on touch input. Respects prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring, label], { xPercent: 0, yPercent: 0, force3D: true });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3" });
    const xLabel = gsap.quickTo(label, "x", { duration: 0.5, ease: "power3" });
    const yLabel = gsap.quickTo(label, "y", { duration: 0.5, ease: "power3" });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDot(mouseX);
      yDot(mouseY);
      xRing(mouseX);
      yRing(mouseY);
      xLabel(mouseX);
      yLabel(mouseY);
    };

    const setState = (state: "default" | "hover" | "view" | "form") => {
      switch (state) {
        case "hover":
          gsap.to(ring, {
            scale: 1.55,
            borderColor: "rgba(245, 241, 232, 1)",
            backgroundColor: "rgba(184, 81, 46, 0.18)",
            duration: 0.35,
            ease: "power3",
          });
          gsap.to(dot, { scale: 0, duration: 0.25, ease: "power3" });
          break;
        case "view":
          gsap.to(ring, {
            scale: 2.6,
            borderColor: "rgba(245, 241, 232, 0)",
            backgroundColor: "rgba(245, 241, 232, 0.95)",
            duration: 0.35,
            ease: "power3",
          });
          gsap.to(dot, { scale: 0, duration: 0.25, ease: "power3" });
          break;
        case "form":
          gsap.to(ring, {
            scale: 0.4,
            borderColor: "rgba(245, 241, 232, 0)",
            backgroundColor: "transparent",
            duration: 0.25,
            ease: "power3",
          });
          gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3" });
          break;
        default:
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(245, 241, 232, 1)",
            backgroundColor: "transparent",
            duration: 0.35,
            ease: "power3",
          });
          gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3" });
      }
    };

    const showLabel = (text: string) => {
      label.textContent = text;
      gsap.to(label, { opacity: 1, duration: 0.25, ease: "power3" });
    };
    const hideLabel = () => gsap.to(label, { opacity: 0, duration: 0.2, ease: "power3" });

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, select"
      );
      if (!t) {
        setState("default");
        hideLabel();
        return;
      }

      const attr = t.getAttribute("data-cursor");
      const text = t.getAttribute("data-cursor-text");

      if (t.matches("input, textarea, select")) {
        setState("form");
        hideLabel();
      } else if (attr === "view") {
        setState("view");
        if (text) showLabel(text);
        else hideLabel();
      } else if (attr === "label" && text) {
        setState("hover");
        showLabel(text);
      } else {
        setState("hover");
        hideLabel();
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related || related.nodeName === "HTML") {
        gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
        hideLabel();
      }
    };

    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}
