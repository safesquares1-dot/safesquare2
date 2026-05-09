"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".nf-404", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" })
        .fromTo(".nf-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
        .fromTo(".nf-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-cream-50 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-teal-200 rounded-lg rotate-3 opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 border-2 border-terracotta-200 rounded-lg -rotate-6 opacity-30" />
      </div>
      <div className="text-center relative">
        <h1 className="nf-404 font-display text-9xl md:text-[12rem] font-extrabold text-teal-600 leading-none">
          404
        </h1>
        <h2 className="nf-text font-display text-4xl md:text-5xl font-bold text-charcoal-800 mb-4">
          Page Not Found
        </h2>
        <p className="nf-text text-lg text-charcoal-500 mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="nf-btn inline-flex items-center bg-teal-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all duration-300 hover:shadow-xl hover:shadow-teal-200"
        >
          Go Home
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}