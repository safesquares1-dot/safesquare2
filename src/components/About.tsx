"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", once: true },
        }
      );

      const timelineItems = timelineRef.current?.children ? Array.from(timelineRef.current.children) : [];
      gsap.fromTo(timelineItems,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: timelineRef.current, start: "top 70%", once: true },
        }
      );

      gsap.fromTo(imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", once: true },
        }
      );

      const statEls = statsRef.current?.children ? Array.from(statsRef.current.children) : [];
      gsap.fromTo(statEls,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%", once: true },
        }
      );

      const counters = sectionRef.current ? Array.from(sectionRef.current.querySelectorAll(".counter")) : [];
      counters.forEach((el) => {
        const target = el.getAttribute("data-target") || "0";
        const numericValue = parseInt(target.replace(/\D/g, ""));
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            const suffix = target.includes("+") ? "+" : target.includes("%") ? "%" : "";
            el.textContent = Math.floor(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timelineItems = [
    { year: "2022", title: "Digital Wellness Platform", desc: "Launched an integrated digital wellness platform with personalized care plans, connecting patients with practitioners through secure virtual and in-person sessions." },
  ];

  const stats = [
    { number: "50+", label: "Expert Practitioners", color: "electric" },
    { number: "500+", label: "Patients Served", color: "neon" },
    { number: "15+", label: "Specialities", color: "violet" },
    { number: "98%", label: "Satisfaction Rate", color: "coral" },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/5 blur-3xl" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={heroRef} className="relative max-w-5xl mx-auto mb-28">
          {/* Decorative bracket */}
          <div className="absolute -top-8 -left-4 w-24 h-24 border-t-4 border-l-4 border-electric-500/30 rounded-tl-2xl" />
          <div className="absolute -bottom-8 -right-4 w-24 h-24 border-b-4 border-r-4 border-neon-500/30 rounded-br-2xl" />

          <div className="inline-flex items-center gap-3 px-5 py-3 bg-slate-100 border border-slate-200 rounded-full mb-10 shadow-inner">
            <div className="w-2 h-2 bg-electric-500 rounded-full" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">Our Story</span>
          </div>

          <div className="relative">
            {/* Large decorative number */}
            <div className="absolute -top-8 left-0 opacity-10 select-none">
              <span className="font-display text-[12rem] font-extrabold text-slate-900 leading-none">01</span>
            </div>

            <h2 className="font-display relative text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[0.9] pl-24">
              <span className="hero-word inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-500 via-violet-500 to-neon-500">Transforming</span>
              </span>
              <br />
              <span className="hero-word inline-block">Mental&nbsp;Health</span>
              <br />
              <span className="hero-word inline-block">
                Through&nbsp;<span className="text-neon-600">Care</span>
              </span>
            </h2>
          </div>

          <div className="mt-10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-electric-500 to-violet-600 rounded-2xl shadow-sharp rotate-6 opacity-30 blur-xl" />
            <div className="w-48 h-1.5 bg-gradient-to-r from-electric-500 via-violet-500 to-neon-500 mx-auto relative z-10" />
          </div>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed font-light">
            Safesquare provides an environment, a place, and a platform for mental health practitioners to deliver exceptional care to their patients — empowering professionals with the tools, community, and support they need to transform lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-coral-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-violet-500/20 rounded-lg blur-2xl" />

            <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-sharp-2xl transform rotate-2">
              <div className="absolute inset-0 grid-pattern opacity-10" />
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                alt="Mental health consultation"
                className="w-full h-full object-cover rounded-3xl opacity-85"
              />
            </div>
          </div>

          <div ref={timelineRef} className="order-1 lg:order-2 space-y-8">
            {timelineItems.map((item, i) => (
              <div key={item.year} className="relative pl-8">
                <div className="absolute left-0 top-2 w-4 h-4 bg-electric-500 rounded-full shadow-glow-electric" />
                <div className={`absolute left-2 top-6 bottom-0 w-0.5 ${
                  i === timelineItems.length - 1 ? "hidden" : "bg-gradient-to-b from-electric-500 to-neon-500"
                }`} />

                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sharp hover:shadow-sharp-lg transition-all duration-300">
                  <div className="text-xs font-bold text-electric-600 uppercase tracking-wider mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t-2 border-slate-200">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`pl-6 relative ${
                stat.color === "electric" ? "border-l-2 border-electric-500" :
                stat.color === "neon" ? "border-l-2 border-neon-500" :
                stat.color === "violet" ? "border-l-2 border-violet-500" :
                "border-l-2 border-coral-500"
              }`}
            >
              <div className="counter text-4xl md:text-5xl font-bold text-slate-900 font-display leading-none" data-target={stat.number}>0</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <Link
            href="/about"
            className="group relative px-10 py-5 bg-slate-900 text-white font-bold rounded-lg shadow-sharp hover:shadow-sharp-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-4 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Discover Our Mission
              <span className="w-10 h-0.5 bg-white transform origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-electric-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}