"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  variant?: "wave" | "organic" | "flowing" | "dots" | "line";
  label?: string;
  className?: string;
}

/**
 * Editorial divider — the typographic mark between articles.
 * All variants are restrained, hairline-based, and consistent with the masthead system.
 */
export default function SectionDivider({
  variant = "line",
  label,
  className,
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".d-line") ?? [];
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      const dots = containerRef.current?.querySelectorAll(".d-dot") ?? [];
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (variant === "dots") {
    return (
      <div
        ref={containerRef}
        className={`max-w-[1320px] mx-auto px-6 lg:px-12 py-10 flex items-center justify-center gap-4 ${
          className || ""
        }`}
      >
        <span className="d-line h-px w-20 bg-ink-300 origin-left" />
        <span className="d-dot w-1.5 h-1.5 rounded-full bg-clay-600" />
        <span className="d-dot w-1.5 h-1.5 rounded-full bg-ink-900" />
        <span className="d-dot w-1.5 h-1.5 rounded-full bg-clay-600" />
        <span className="d-line h-px w-20 bg-ink-300 origin-left" />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div
        ref={containerRef}
        className={`max-w-[1320px] mx-auto px-6 lg:px-12 py-8 grid grid-cols-12 gap-x-6 lg:gap-x-10 items-center ${
          className || ""
        }`}
      >
        <div className="col-span-12 lg:col-span-3 flex items-center gap-3">
          <span className="folio">{label || "PAUSE"}</span>
          <span className="d-line h-px flex-1 bg-ink-900 origin-left" />
        </div>
        <div className="hidden lg:block col-span-6 d-line h-px bg-ink-200 origin-left" />
        <div className="hidden lg:flex col-span-3 items-center gap-3">
          <span className="d-line h-px flex-1 bg-ink-900 origin-left" />
          <span className="folio">CONT.</span>
        </div>
      </div>
    );
  }

  if (variant === "organic") {
    return (
      <div
        ref={containerRef}
        className={`max-w-[1320px] mx-auto px-6 lg:px-12 py-12 flex items-center justify-center gap-6 ${
          className || ""
        }`}
      >
        <span className="d-line h-px w-24 md:w-40 bg-ink-200 origin-left" />
        <span className="font-display italic font-light text-[1.5rem] text-clay-600 leading-none select-none">
          §
        </span>
        <span className="d-line h-px w-24 md:w-40 bg-ink-200 origin-left" />
      </div>
    );
  }

  if (variant === "flowing") {
    return (
      <div
        ref={containerRef}
        className={`max-w-[1320px] mx-auto px-6 lg:px-12 py-8 flex items-center justify-center ${
          className || ""
        }`}
      >
        <span className="d-line h-px w-40 bg-ink-200 origin-left" />
      </div>
    );
  }

  // line — default
  return (
    <div
      ref={containerRef}
      className={`max-w-[1320px] mx-auto px-6 lg:px-12 py-10 flex justify-center ${
        className || ""
      }`}
    >
      <span className="d-line h-px w-32 bg-ink-900 origin-left" />
    </div>
  );
}
