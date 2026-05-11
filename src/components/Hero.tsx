"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleShapeHover = (el: HTMLDivElement | null, isHovering: boolean) => {
    if (!el) return;
    gsap.to(el, {
      scale: isHovering ? 1.05 : 1,
      rotation: isHovering ? "+=5" : "+=0",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Heading entrance with split reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        tl.fromTo(words,
          { y: 100, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1 }
        );
      }

      // Subtitle slide in
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current.children,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        );
      }

      // Stats counter
      if (statsRef.current) {
        tl.fromTo(statsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        );

        // Animate counters
        const counters = statsRef.current.querySelectorAll(".counter");
        counters.forEach((counter) => {
          const target = counter.getAttribute("data-target") || "0";
          const numericValue = parseInt(target.replace(/\D/g, ""));
          const obj = { val: 0 };

          gsap.to(obj, {
            val: numericValue,
            duration: 2.5,
            ease: "power2.out",
            delay: 0.5,
            onUpdate: () => {
              const suffix = target.includes("+") ? "+" : target.includes("%") ? "%" : "";
              counter.textContent = Math.floor(obj.val) + suffix;
            },
          });
        });
      }

      // Visual elements
      if (visualRef.current) {
        tl.fromTo(visualRef.current.children,
          { scale: 0.8, opacity: 0, rotate: -10 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1, stagger: 0.15 },
          "-=0.8"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Geometric accent shapes */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-electric-500/10 rotate-45" />
      <div className="absolute bottom-32 left-[5%] w-48 h-48 bg-neon-500/10 -rotate-12" />
      <div className="absolute top-1/2 right-[20%] w-32 h-32 border-4 border-violet-500/20 rotate-12" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-50 border-2 border-electric-500 rounded-full mb-8">
              <div className="w-2 h-2 bg-electric-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-electric-700 uppercase tracking-wider">Mental Health Excellence</span>
            </div>

            <h1 ref={headingRef} className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 leading-[0.9]">
              <div className="word inline-block">Welcome</div>{" "}
              <div className="word inline-block">to</div>
              <br />
              <div className="word inline-block text-electric-500">Safe</div>
              <div className="word inline-block">square</div>
            </h1>

            <p ref={subtitleRef} className="text-xl md:text-2xl text-slate-600 mb-12 max-w-xl leading-relaxed font-medium">
              A professional environment and platform empowering mental health practitioners to deliver exceptional care.
              <span className="text-neon-600 font-bold"> Your practice, elevated.</span>
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-lg overflow-hidden shadow-sharp hover:shadow-sharp-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Appointment
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href="/services"
                className="group px-8 py-4 bg-white text-slate-900 font-bold rounded-lg border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8">
              <div className="accent-line-electric pl-6">
                <div className="counter text-4xl lg:text-5xl font-bold text-slate-900" data-target="500+">0</div>
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mt-1">Patients</div>
              </div>
              <div className="accent-line-neon pl-6">
                <div className="counter text-4xl lg:text-5xl font-bold text-slate-900" data-target="50+">0</div>
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mt-1">Experts</div>
              </div>
              <div className="accent-line-electric pl-6">
                <div className="counter text-4xl lg:text-5xl font-bold text-slate-900" data-target="10+">0</div>
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-wide mt-1">Years</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div ref={visualRef} className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              {/* Layered geometric shapes */}
              <div
                ref={(el) => { shapeRefs.current[0] = el; }}
                onMouseEnter={(e) => handleShapeHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleShapeHover(e.currentTarget, false)}
                className="absolute inset-[10%] bg-gradient-to-br from-electric-500 to-violet-600 rounded-3xl shadow-sharp-xl transform rotate-6 cursor-pointer" />
              <div
                ref={(el) => { shapeRefs.current[1] = el; }}
                onMouseEnter={(e) => handleShapeHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleShapeHover(e.currentTarget, false)}
                className="absolute inset-[20%] bg-gradient-to-br from-neon-400 to-electric-500 rounded-3xl shadow-sharp-lg transform -rotate-3 cursor-pointer" />
              <div className="absolute inset-[30%] bg-white rounded-3xl shadow-sharp flex items-center justify-center">
                <svg className="w-32 h-32 text-electric-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>

              {/* Floating accent elements */}
              <div
                ref={(el) => { shapeRefs.current[2] = el; }}
                onMouseEnter={(e) => handleShapeHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleShapeHover(e.currentTarget, false)}
                className="absolute -top-4 -right-4 w-20 h-20 bg-coral-500 rounded-2xl shadow-sharp animate-pulse-glow cursor-pointer" />
              <div
                ref={(el) => { shapeRefs.current[3] = el; }}
                onMouseEnter={(e) => handleShapeHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleShapeHover(e.currentTarget, false)}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-neon-500 rounded-full shadow-glow-neon cursor-pointer" />

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-electric-500" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-violet-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-electric-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
