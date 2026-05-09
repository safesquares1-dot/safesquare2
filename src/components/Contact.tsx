"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
        }
      );

      const formEls = formRef.current?.querySelectorAll(".form-group") ?? [];
      gsap.fromTo(formEls,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 75%", once: true },
        }
      );

      const infoEls = infoRef.current?.children ? Array.from(infoRef.current.children) : [];
      gsap.fromTo(infoEls,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)",
          scrollTrigger: { trigger: infoRef.current, start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const infoCards = [
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      label: "Visit Us",
      content: "AC 10, Block 4\nClifton, Karachi",
      color: "electric",
    },
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      label: "Call Us",
      content: "+92 300 1437360",
      color: "neon",
    },
    {
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      label: "Email Us",
      content: "safesquarepk@gmail.com",
      color: "violet",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      label: "Working Hours",
      content: "Mon - Fri: 8AM - 8PM\nSat: 9AM - 5PM",
      color: "coral",
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    electric: { bg: "bg-electric-50", icon: "bg-electric-500", border: "border-electric-500" },
    neon: { bg: "bg-neon-50", icon: "bg-neon-500", border: "border-neon-500" },
    violet: { bg: "bg-violet-50", icon: "bg-violet-500", border: "border-violet-500" },
    coral: { bg: "bg-coral-50", icon: "bg-coral-500", border: "border-coral-500" },
  };

  return (
    <section ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dense opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/5 blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={headingRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Get in Touch</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Contact <span className="text-electric-500">Us</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Have questions or ready to book an appointment? Reach out to us today.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div ref={infoRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {infoCards.map((item) => {
              const colors = colorClasses[item.color];
              return (
                <div
                  key={item.label}
                  className={`group relative bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover-lift transition-all duration-300`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${colors.icon} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />

                  <div className={`w-12 h-12 ${colors.icon} text-white rounded-xl flex items-center justify-center mb-4 shadow-sharp group-hover:shadow-sharp-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.label}</h3>
                  <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">{item.content}</p>
                </div>
              );
            })}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border-2 border-slate-200 shadow-sharp-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-500 via-neon-500 to-violet-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text" id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-electric-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-300 font-medium"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email" id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-electric-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-300 font-medium"
                />
              </div>
            </div>

            <div className="form-group mb-6">
              <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel" id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 1437360"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-electric-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-300 font-medium"
              />
            </div>

            <div className="form-group mb-8">
              <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="message" rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-electric-500 focus:bg-white text-slate-900 placeholder:text-slate-400 resize-none transition-all duration-300 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-xl text-lg font-bold shadow-sharp-lg hover:shadow-sharp-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
