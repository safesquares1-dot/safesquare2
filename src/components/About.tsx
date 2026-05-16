"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useSpotlight } from "@/components/interactive/useSpotlight";
import { useImageReveal } from "@/components/interactive/useImageReveal";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    n: "i",
    title: "Environment",
    body:
      "Rooms designed to disappear. Natural light, honest materials, and an acoustic stillness that lets the work happen without interruption.",
  },
  {
    n: "ii",
    title: "Place",
    body:
      "A clinic in Clifton, Block 4. Reception that anticipates. Files that are encrypted. A waiting area that does not feel like a waiting area.",
  },
  {
    n: "iii",
    title: "Platform",
    body:
      "Booking, billing, and secure telehealth — operated quietly in the background, so the conversation is the only thing in the room.",
  },
];

const stats = [
  { number: "500+", label: "Patients Served" },
  { number: "50+", label: "Expert Practitioners" },
  { number: "15+", label: "Specialities" },
  { number: "98%", label: "Continued Care" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useSpotlight(sectionRef, ".principle-card", { tilt: 3, lift: 8 });
  useImageReveal(sectionRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll(".reveal-up") ?? [];
      reveals.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Stat counters
      const counters = sectionRef.current?.querySelectorAll(".counter") ?? [];
      counters.forEach((el) => {
        const target = el.getAttribute("data-target") || "0";
        const numericValue = parseInt(target.replace(/\D/g, ""), 10);
        const suffix = target.includes("+") ? "+" : target.includes("%") ? "%" : "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 2.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix;
          },
        });
      });

      // Principle numerals — draw the trailing hairline
      const numerals = sectionRef.current?.querySelectorAll(".principle-rule") ?? [];
      numerals.forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power4.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: rule, start: "top 85%", once: true },
          }
        );
      });

      // Figure subtle parallax
      if (figureRef.current) {
        const img = figureRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: figureRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative paper bg-ivory-100 py-28 md:py-36"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Spread title */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-20 md:mb-28">
          <div className="col-span-12 lg:col-span-2 reveal-up">
            <div className="kicker mb-4">Chapter Two</div>
            <span className="folio">PG. 24</span>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <h2 className="reveal-up font-display text-[3rem] md:text-[4.25rem] lg:text-[5.5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
              On building a clinic
              <br />
              that <span className="italic text-clay-600">refuses</span> to feel
              <br />
              like a clinic.
            </h2>

            <div className="reveal-up h-px bg-ink-900 mt-10 max-w-[120px]" />
          </div>

          <div className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-ink-200 reveal-up">
            <p className="dropcap text-[1rem] leading-[1.7] text-ink-700 font-light">
              Safesquare exists to remove every obstacle between practitioner and
              patient. We carry the room, the calendar, the paperwork, and the
              quiet — so what happens in the hour is undivided attention.
            </p>
          </div>
        </div>

        {/* Three principles — spotlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-ink-900">
          {principles.map((p, i) => (
            <article
              key={p.n}
              className={`principle-card spotlight reveal-up p-8 md:p-10 ${
                i < principles.length - 1 ? "md:border-r border-ink-200" : ""
              } ${i > 0 ? "border-t md:border-t-0 border-ink-200" : ""}`}
              data-cursor="label"
              data-cursor-text={p.title}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="numeral text-[3.25rem] leading-none text-clay-600">
                  {p.n}
                </span>
                <span className="principle-rule h-px flex-1 bg-ink-300 translate-y-[-0.5rem] origin-left" />
              </div>
              <h3 className="font-display text-[1.75rem] font-normal italic leading-[1.05] text-ink-900 mb-4 transition-colors duration-500 group-hover:text-clay-600">
                {p.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.7] text-ink-600 font-light">
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Editorial figure pair */}
        <div className="mt-24 grid grid-cols-12 gap-6 lg:gap-10 items-end">
          <div ref={figureRef} className="col-span-12 lg:col-span-5 reveal-up">
            <div
              className="img-reveal img-zoom editorial-image aspect-[4/5] border border-ink-900"
              data-cursor="view"
              data-cursor-text="View"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=900&fit=crop&q=80"
                alt="Consulting room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="folio mt-1 shrink-0">FIG&nbsp;02</span>
              <span className="text-[0.78rem] leading-relaxed text-ink-600 font-light">
                Reading bench. The waiting area that does not feel like one.
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 reveal-up">
            <blockquote className="font-display italic font-light text-[1.7rem] md:text-[2.1rem] lg:text-[2.4rem] leading-[1.15] text-ink-900 tracking-[-0.015em]">
              <span className="text-clay-600">&ldquo;</span>
              We started Safesquare to give practitioners the only resource that
              cannot be bought — undisturbed hours with the people who came to be
              heard.
              <span className="text-clay-600">&rdquo;</span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-clay-600" />
              <div>
                <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-900">
                  Founding Note
                </div>
                <div className="text-[0.78rem] text-ink-500 mt-1">
                  Karachi · 2012
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats — hoverable figures */}
        <div className="mt-28 border-t border-ink-900 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-8">
            {stats.map((s) => (
              <div key={s.label} className="reveal-up group">
                <div
                  className="counter numeral text-[3.25rem] md:text-[4rem] tabular-nums transition-colors duration-500 group-hover:text-clay-600"
                  data-target={s.number}
                >
                  0
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-px w-5 bg-clay-600 group-hover:w-12 transition-[width] duration-500 ease-[var(--ease-editorial)]" />
                  <span className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink-500">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal-up mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-ink-900">
          <p className="font-display italic text-[1.6rem] md:text-[2rem] font-light text-ink-900 max-w-[28ch] leading-tight">
            Read on for the practice in full —
          </p>
          <Magnetic strength={0.35}>
            <Link href="/about" className="btn-ink" data-cursor="label" data-cursor-text="Read →">
              Our Mission
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
