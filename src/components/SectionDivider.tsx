"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SectionDividerProps {
  variant?: "wave" | "organic" | "flowing" | "dots" | "line";
  className?: string;
}

export default function SectionDivider({ variant = "line", className }: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (variant === "line") {
        const line = containerRef.current?.querySelector(".divider-line");
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.2 }
          );
        }
      }

      if (variant === "dots") {
        const dots = containerRef.current?.querySelectorAll(".dot");
        gsap.fromTo(dots ?? [],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [variant]);

  if (variant === "line") {
    return (
      <div ref={containerRef} className={`w-full py-8 flex justify-center ${className || ""}`}>
        <div className="divider-line w-32 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div ref={containerRef} className={`w-full h-12 relative ${className || ""}`}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,24 Q360,8 720,24 Q1080,40 1440,24" stroke="rgb(148, 163, 184)" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={containerRef} className={`w-full py-8 flex items-center justify-center gap-3 ${className || ""}`}>
        <div className="dot w-2 h-2 bg-electric-500 rounded-full" />
        <div className="dot w-2 h-2 bg-neon-500 rounded-full" />
        <div className="dot w-2 h-2 bg-violet-500 rounded-full" />
        <div className="dot w-2 h-2 bg-coral-500 rounded-full" />
      </div>
    );
  }

  if (variant === "organic") {
    return (
      <div ref={containerRef} className={`w-full h-16 relative overflow-hidden ${className || ""}`}>
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent to-electric-500 rounded-full" />
          <div className="w-3 h-3 bg-neon-500 rounded-full" />
          <div className="w-20 h-1 bg-gradient-to-r from-electric-500 via-violet-500 to-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return null;
}
