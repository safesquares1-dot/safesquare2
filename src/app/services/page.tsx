"use client";

import Services from "@/components/Services";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const insuranceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroEls = heroRef.current?.children ? Array.from(heroRef.current.children) : [];
      gsap.fromTo(heroEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Process steps
      const processSteps = processRef.current?.querySelectorAll(".process-step") ?? [];
      gsap.fromTo(processSteps,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.2)",
          scrollTrigger: { trigger: processRef.current, start: "top 75%", once: true },
        }
      );

      // Insurance cards
      const insuranceCards = insuranceRef.current?.querySelectorAll(".insurance-card") ?? [];
      gsap.fromTo(insuranceCards,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: insuranceRef.current, start: "top 75%", once: true },
        }
      );

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-neon-500/10 rounded-full blur-3xl" />
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Services</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[0.9]">
            Comprehensive<br />
            <span className="text-electric-500">Mental Health</span> Services
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Explore our range of mental health and wellbeing services
          </p>
        </div>
      </section>

      {/* Services Component */}
      <Services />

      {/* Treatment Process */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 blur-3xl" />
        <div ref={processRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Approach</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Treatment <span className="text-violet-500">Process</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                A structured, evidence-based approach to mental health care that evolves with your progress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Initial Assessment", desc: "Comprehensive evaluation to understand your needs and goals", color: "electric" },
                { step: "02", title: "Treatment Planning", desc: "Collaborative development of your personalized care plan", color: "neon" },
                { step: "03", title: "Ongoing Therapy", desc: "Regular sessions with progress monitoring and adjustments", color: "violet" },
                { step: "04", title: "Progress Review", desc: "Periodic evaluation and plan refinement for sustained outcomes", color: "coral" },
              ].map((item, i) => {
                const colorClasses: Record<string, string> = {
                  electric: "bg-electric-500",
                  neon: "bg-neon-500",
                  violet: "bg-violet-500",
                  coral: "bg-coral-500",
                };
                return (
                  <div key={item.step} className="process-step relative text-center group">
                    <div className={`w-20 h-20 ${colorClasses[item.color]} text-white rounded-2xl flex items-center justify-center font-bold font-display text-2xl mx-auto mb-6 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      {item.step}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
                    {i < 3 && (
                      <div className="absolute top-10 left-full w-6 h-1 bg-gradient-to-r from-slate-300 to-transparent hidden lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dense opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral-500/5 blur-3xl" />
        <div ref={insuranceRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Accessibility</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Insurance & <span className="text-coral-500">Payment</span> Options
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                We accept most major insurance plans and offer flexible payment options to ensure access to care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="insurance-card bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-electric-500 text-white rounded-xl flex items-center justify-center shadow-sharp">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl">Insurance Accepted</h3>
                </div>
                <ul className="text-slate-600 space-y-3 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Aetna, Blue Cross Blue Shield, Cigna</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Medicare and Medicaid</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Most major insurers accepted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-electric-500 rounded-full mt-2 flex-shrink-0" />
                    <span>No insurance? We offer competitive cash-pay rates</span>
                  </li>
                </ul>
              </div>

              <div className="insurance-card bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-neon-500 text-white rounded-xl flex items-center justify-center shadow-sharp">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl">Payment Plans</h3>
                </div>
                <ul className="text-slate-600 space-y-3 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Sliding scale fees based on income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Flexible monthly payment plans available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mt-2 flex-shrink-0" />
                    <span>FSA/HSA cards accepted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Financial assistance for qualifying individuals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/10 blur-3xl" />
        <div ref={ctaRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-neon-400">Journey?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Book an appointment with one of our experienced practitioners today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-lg shadow-sharp-xl hover:shadow-glow hover:scale-105 transition-all duration-300 group"
          >
            <span>Book Appointment</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
