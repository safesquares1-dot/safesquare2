"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic — children follow the pointer within the element's bounds.
 * The inner `.magnetic-track` element gets the translation, so layout shifts
 * (e.g. padding, link area) stay where they are while the visible content moves.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const xTo = gsap.quickTo(track, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(track, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      <span ref={trackRef} className="magnetic-track">
        {children}
      </span>
    </span>
  );
}
