"use client";

import Practitioners from "@/components/Practitioners";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PractitionersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroEls = heroRef.current?.children ? Array.from(heroRef.current.children) : [];
      gsap.fromTo(heroEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Requirements
      const reqCards = reqRef.current?.querySelectorAll(".req-card") ?? [];
      gsap.fromTo(reqCards,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: reqRef.current, start: "top 75%", once: true },
        }
      );

      // Benefits
      const benefitCards = benefitsRef.current?.querySelectorAll(".benefit-card") ?? [];
      gsap.fromTo(benefitCards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.2)",
          scrollTrigger: { trigger: benefitsRef.current, start: "top 75%", once: true },
        }
      );

      // Support cards
      const supportCards = supportRef.current?.querySelectorAll(".support-card") ?? [];
      gsap.fromTo(supportCards,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: supportRef.current, start: "top 75%", once: true },
        }
      );

      // CTA
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
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
        <div className="absolute top-20 right-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">For Practitioners</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[0.9]">
            Join Our <span className="text-violet-500">Network</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Safesquare is a multi-specialty clinic available to all mental health and wellbeing practitioners.
          </p>
        </div>
      </section>

      {/* Practitioners Component */}
      <Practitioners />

      {/* Requirements Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric-500/5 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Requirements</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Requirements to <span className="text-electric-500">Join</span>
              </h2>
            </div>

            <div ref={reqRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {[
                { text: "Valid license to practice in your field", color: "electric" },
                { text: "Professional liability insurance", color: "neon" },
                { text: "Commitment to patient confidentiality and ethical practice", color: "violet" },
                { text: "Strong communication and interpersonal skills", color: "coral" },
                { text: "Dedication to ongoing professional development", color: "electric" },
              ].map((req, i) => {
                const colorClasses: Record<string, { bg: string; icon: string }> = {
                  electric: { bg: "bg-electric-50", icon: "bg-electric-500" },
                  neon: { bg: "bg-neon-50", icon: "bg-neon-500" },
                  violet: { bg: "bg-violet-50", icon: "bg-violet-500" },
                  coral: { bg: "bg-coral-50", icon: "bg-coral-500" },
                };
                const colors = colorClasses[req.color];
                return (
                  <div key={i} className={`req-card flex items-start gap-4 ${colors.bg} p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300`}>
                    <div className={`w-10 h-10 ${colors.icon} text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sharp`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 leading-relaxed font-medium pt-1">{req.text}</span>
                  </div>
                );
              })}
            </div>

            <div ref={ctaRef} className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold text-lg rounded-lg shadow-sharp-xl hover:shadow-glow hover:scale-105 transition-all duration-300 group"
              >
                <span>Apply Now</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Practitioner Benefits */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dense opacity-20" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-neon-500/5 blur-3xl" />
        <div ref={benefitsRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Why Join</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Practitioner <span className="text-neon-500">Benefits</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                We provide comprehensive support and competitive advantages for our practitioner network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Flexible Scheduling", desc: "Set your own hours and workload with our flexible booking system", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "electric" },
                { title: "Competitive Compensation", desc: "Receive 70-80% of billing revenue for your services", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", color: "neon" },
                { title: "Administrative Support", desc: "We handle scheduling, billing, insurance claims, and documentation", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "violet" },
                { title: "Continuing Education", desc: "Access to workshops, training, and professional development opportunities", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "coral" },
                { title: "Marketing Support", desc: "Professional headshots, website listing, and referral network access", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z", color: "electric" },
                { title: "Malpractice Coverage", desc: "Professional liability insurance included in our practice ownership model", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "neon" },
              ].map((benefit, i) => {
                const colorClasses: Record<string, { bg: string; icon: string }> = {
                  electric: { bg: "bg-electric-50", icon: "bg-electric-500" },
                  neon: { bg: "bg-neon-50", icon: "bg-neon-500" },
                  violet: { bg: "bg-violet-50", icon: "bg-violet-500" },
                  coral: { bg: "bg-coral-50", icon: "bg-coral-500" },
                };
                const colors = colorClasses[benefit.color];
                return (
                  <div key={benefit.title} className={`benefit-card group bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                    <div className={`w-14 h-14 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-4 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm font-medium">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Practitioner Support */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral-500/5 blur-3xl" />
        <div ref={supportRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Support</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Ongoing Practitioner <span className="text-coral-500">Support</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Dedicated resources and guidance to help you succeed in your practice and career growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="support-card bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-violet-500 text-white rounded-xl flex items-center justify-center shadow-sharp">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl">Supervision & Consultation</h3>
                </div>
                <ul className="text-slate-600 space-y-3 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Monthly clinical supervision sessions with senior practitioners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Case consultation available for complex presentations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Peer support groups and professional networking</span>
                  </li>
                </ul>
              </div>

              <div className="support-card bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-coral-500 text-white rounded-xl flex items-center justify-center shadow-sharp">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl">Career Development</h3>
                </div>
                <ul className="text-slate-600 space-y-3 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Professional development planning and goal setting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Leadership training for interested practitioners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Resources for specialization and advanced certifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
