"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Psychological Therapy",
    description: "Professional therapy sessions to help you navigate life's challenges and improve mental wellbeing.",
    color: "electric",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Counseling Services",
    description: "Individual and group counseling tailored to your specific needs and goals.",
    color: "neon",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Psychiatric Consultation",
    description: "Expert psychiatric evaluations and medication management for mental health conditions.",
    color: "violet",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Mental Health Assessment",
    description: "Comprehensive assessments to understand your mental health needs and create treatment plans.",
    color: "coral",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Wellbeing Programs",
    description: "Holistic programs designed to enhance your overall mental and emotional wellbeing.",
    color: "neon",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Corporate Wellness",
    description: "Workplace mental health programs to support employee wellbeing and productivity.",
    color: "electric",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(headingRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
        }
      );

      // Cards stagger
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    electric: { bg: "bg-electric-50", border: "border-electric-500", text: "text-electric-700", icon: "bg-electric-500" },
    neon: { bg: "bg-neon-50", border: "border-neon-500", text: "text-neon-700", icon: "bg-neon-500" },
    violet: { bg: "bg-violet-50", border: "border-violet-500", text: "text-violet-700", icon: "bg-violet-500" },
    coral: { bg: "bg-coral-50", border: "border-coral-500", text: "text-coral-700", icon: "bg-coral-500" },
  };

  return (
    <section ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-electric-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-neon-500/5 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={headingRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Comprehensive<br />
            <span className="text-electric-500">Mental Health</span> Care
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            We offer a wide range of mental health services provided by experienced practitioners dedicated to your wellbeing.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = colorClasses[service.color];
            return (
              <div
                key={service.title}
                className={`group relative bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300 overflow-hidden`}
              >
                {/* Hover background */}
                <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${colors.icon} opacity-5 rounded-bl-full`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-6 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{service.description}</p>

                  {/* Learn more link */}
                  <div className={`flex items-center gap-2 ${colors.text} font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
