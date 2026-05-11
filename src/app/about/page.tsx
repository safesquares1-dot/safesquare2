"use client";

import About from "@/components/About";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroEls = heroRef.current?.children ? Array.from(heroRef.current.children) : [];
      gsap.fromTo(heroEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Content sections
      const contentEls = contentRef.current?.children ? Array.from(contentRef.current.children) : [];
      gsap.fromTo(contentEls,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 75%", once: true },
        }
      );

      // Timeline items
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item") ?? [];
      gsap.fromTo(timelineItems,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%", once: true },
        }
      );

      // Certifications
      const certCards = certificationsRef.current?.querySelectorAll(".cert-card") ?? [];
      gsap.fromTo(certCards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)",
          scrollTrigger: { trigger: certificationsRef.current, start: "top 75%", once: true },
        }
      );

      // Testimonials
      const testimonialCards = testimonialsRef.current?.querySelectorAll(".testimonial-card") ?? [];
      gsap.fromTo(testimonialCards,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: testimonialsRef.current, start: "top 75%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const values = [
    { title: "Compassion", description: "We treat every individual with empathy, understanding, and genuine care.", color: "electric" },
    { title: "Excellence", description: "We maintain the highest standards in mental health practice and service delivery.", color: "neon" },
    { title: "Integrity", description: "We operate with honesty, transparency, and ethical practices in all we do.", color: "violet" },
    { title: "Innovation", description: "We embrace new approaches and technologies to improve mental health outcomes.", color: "coral" },
  ];

  const timeline = [
    { year: "2022", title: "Digital Wellness Platform", description: "Launched an integrated digital wellness platform with personalized care plans, connecting patients with practitioners through secure virtual and in-person sessions." },
  ];

  const testimonials = [
    { name: "Michael Rodriguez", role: "Patient since 2019", content: "Safesquare transformed my life. The practitioners truly understand and tailor their approach to each individual. I've been sober for 3 years thanks to their guidance.", rating: 5 },
    { name: "Jennifer Walsh", role: "Parent", content: "Our daughter's anxiety struggles have significantly improved since starting therapy here. The family sessions were invaluable for understanding and supporting her journey.", rating: 5 },
    { name: "Dr. Amanda Foster", role: "Clinical Psychologist", content: "As both a patient and colleague, I appreciate the integrative approach. Safesquare's commitment to evidence-based practice while maintaining compassion is exceptional.", rating: 5 },
  ];

  const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
    electric: { bg: "bg-electric-50", border: "border-electric-500", icon: "bg-electric-500" },
    neon: { bg: "bg-neon-50", border: "border-neon-500", icon: "bg-neon-500" },
    violet: { bg: "bg-violet-50", border: "border-violet-500", icon: "bg-violet-500" },
    coral: { bg: "bg-coral-50", border: "border-coral-500", icon: "bg-coral-500" },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-electric-500/10 rounded-full blur-3xl" />
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[0.9]">
            About <span className="text-electric-500">Safesquare</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Empowering practitioners with the environment, space, and platform to deliver exceptional patient care
          </p>
        </div>
      </section>

      {/* About Component */}
      <About />

      {/* Mission & Values */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/5 blur-3xl" />
        <div ref={contentRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Mission</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Accessible, High-Quality <span className="text-neon-500">Mental Health</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-electric-500 to-neon-500 mb-8" />
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                At Safesquare, our mission is to empower mental health practitioners by providing a professional environment, dedicated space, and comprehensive platform that enables them to deliver exceptional care to their patients. We believe that when practitioners have the right tools and support, they can focus entirely on what matters most — transforming lives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                We bring together practitioners from various mental health disciplines, offering them a collaborative space with administrative support, modern facilities, and a community of peers — all designed to elevate their practice and enhance patient outcomes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => {
                  const colors = colorClasses[value.color];
                  return (
                    <div key={value.title} className={`group bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300`}>
                      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dense opacity-20" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-violet-500/5 blur-3xl" />
        <div ref={timelineRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Our Journey</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Clinic <span className="text-violet-500">Timeline</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Ten years of dedicated service, continuous growth, and unwavering commitment to mental health excellence.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-500 via-neon-500 to-violet-500" />
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <div key={item.year} className="timeline-item relative flex items-start">
                    <div className="absolute left-8 -translate-x-1/2 w-10 h-10 bg-white border-4 border-electric-500 rounded-full shadow-sharp z-10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-electric-500 rounded-full" />
                    </div>
                    <div className="ml-20 bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300 flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-electric-600 font-bold font-display text-2xl">{item.year}</span>
                        <div className="h-1 bg-gradient-to-r from-electric-500 to-transparent flex-1 rounded-full" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-xl mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-500/5 blur-3xl" />
        <div ref={certificationsRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Standards & Ethics</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Certifications & <span className="text-coral-500">Accreditations</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Our commitment to excellence is validated by recognized professional standards and ongoing education requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Joint Commission", desc: "Accredited healthcare facility meeting national quality and safety standards", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "electric" },
                { name: "State Licensed", desc: "All practitioners licensed and in good standing with state boards", icon: "M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "neon" },
                { name: "HIPAA Compliant", desc: "Strict adherence to patient privacy and data protection regulations", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z", color: "violet" },
                { name: "Evidence-Based", desc: "Treatment methods grounded in peer-reviewed research and clinical evidence", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "coral" },
                { name: "Continuing Education", desc: "Practitioners complete 40+ hours of CE annually", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "electric" },
                { name: "Ethics Pledge", desc: "Annual commitment to professional ethics and client welfare", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "neon" },
              ].map((cert) => {
                const colors = colorClasses[cert.color];
                return (
                  <div key={cert.name} className={`cert-card group bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                    <div className={`w-14 h-14 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-4 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cert.icon} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{cert.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{cert.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/10 blur-3xl" />
        <div ref={testimonialsRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full mb-6">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Stories</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Client <span className="text-neon-400">Stories</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
                Real experiences from individuals who found healing and growth at Safesquare.
              </p>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, i) => (
                <div key={testimonial.name} className="testimonial-card bg-white/5 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-neon-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-white/90 leading-relaxed mb-6 font-medium italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-violet-600 rounded-full flex items-center justify-center shadow-sharp">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <span className="text-white font-bold block">{testimonial.name}</span>
                      <span className="text-slate-400 text-sm">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
