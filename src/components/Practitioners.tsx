"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Practitioners() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading stagger
      gsap.fromTo(headingRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
        }
      );

      // Cards with stagger
      const cardEls = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      cardEls.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            ease: "power3.out",
            delay: i * 0.08,
          }
        );
      });

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const requirements = [
    { title: "Valid license to practice in your field", icon: "M5 13l4 4L19 7", color: "electric" },
    { title: "Professional liability insurance", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "neon" },
    { title: "Commitment to patient confidentiality", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z", color: "violet" },
    { title: "Strong communication skills", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "coral" },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    electric: { bg: "bg-electric-50", icon: "bg-electric-500", border: "border-electric-500" },
    neon: { bg: "bg-neon-50", icon: "bg-neon-500", border: "border-neon-500" },
    violet: { bg: "bg-violet-50", icon: "bg-violet-500", border: "border-violet-500" },
    coral: { bg: "bg-coral-50", icon: "bg-coral-500", border: "border-coral-500" },
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-electric-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-neon-500/10 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full mb-6">
            <span className="text-sm font-bold text-white uppercase tracking-wider">For Practitioners</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Join Our<br />
            <span className="text-neon-400">Network</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-neon-500 mx-auto mb-8" />
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Safesquare provides the environment, space, and platform you need to focus on what matters most — your patients.
          </p>
        </div>

        {/* Requirements grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {requirements.map((req, i) => {
            const colors = colorClasses[req.color];
            return (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />

                <div className={`w-14 h-14 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-6 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={req.icon} />
                  </svg>
                </div>

                <span className="text-white leading-relaxed font-medium">{req.title}</span>

                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-lg shadow-sharp-xl hover:shadow-glow hover:scale-105 transition-all duration-300 group"
          >
            <span>Apply Now</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
