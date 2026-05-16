"use client";

import About from "@/components/About";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useSpotlight } from "@/components/interactive/useSpotlight";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  { year: "2012", title: "The Idea", description: "A handful of clinicians, frustrated by the friction between practice and care, write a five-page brief on what a quieter clinic would do differently." },
  { year: "2015", title: "First Suite Opens", description: "Two consulting rooms in Clifton. North light, hardwood floors, no waiting-room television. We open with three practitioners and a small caseload." },
  { year: "2018", title: "Practice Operations", description: "The intake desk launches — booking, billing, follow-up, written correspondence. Practitioners stop carrying the clinic and start carrying the conversation." },
  { year: "2020", title: "Encrypted Telehealth", description: "Secure video consultation is added to every practice. Records remain on-shore. The pandemic does not become the reason for cutting corners." },
  { year: "2022", title: "The Platform", description: "Safesquare opens to associate practitioners on a single-fee model. Care plans, supervision groups, and peer consultation become part of the membership." },
  { year: "2024", title: "Fifty Practitioners", description: "We pass fifty practitioners and five hundred patients served. We stop counting milestones publicly and return to counting hours." },
];

const certifications = [
  { abbr: "HPA", title: "HIPAA-aligned", desc: "Privacy protocols audited annually by an independent reviewer." },
  { abbr: "PCS", title: "Pakistan Clinical Standards", desc: "Operating under the standards published by the national board." },
  { abbr: "LIC", title: "Fully Licensed", desc: "Every practitioner registered with their respective licensing body." },
  { abbr: "QA", title: "Quality Assured", desc: "Quarterly internal review of outcomes, attendance, and complaints." },
];

const testimonials = [
  {
    quote: "Safesquare transformed my practice. I had spent ten years answering my own phone. Now I answer my patients.",
    author: "Dr. Sarah Mitchell",
    role: "Clinical Psychologist · Member since 2018",
  },
  {
    quote: "The peer consultation group is the most professionally useful hour of my month. Quiet, rigorous, kind.",
    author: "Dr. James Carter",
    role: "Consultant Psychiatrist",
  },
  {
    quote: "Administrative load went from forty percent of my week to under five. I have never been less busy and more effective.",
    author: "Dr. Emily Chen",
    role: "Licensed Therapist",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);

  useSpotlight(pageRef, ".vision-card", { tilt: 2, lift: 6 });
  useSpotlight(pageRef, ".cert-card", { tilt: 3, lift: 8 });
  useSpotlight(pageRef, ".testimonial-card", { tilt: 2, lift: 6 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline curtain
      const lines = pageRef.current?.querySelectorAll(".hero-line .hero-inner") ?? [];
      gsap.fromTo(
        lines,
        { y: "108%" },
        { y: "0%", duration: 1.05, ease: "power4.out", stagger: 0.12 }
      );

      const reveals = pageRef.current?.querySelectorAll(".reveal-up") ?? [];
      reveals.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: (i % 3) * 0.06,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Timeline rows — animated entrance + hover effect
      const rows = pageRef.current?.querySelectorAll<HTMLElement>(".timeline-row") ?? [];
      const cleanups: Array<() => void> = [];

      rows.forEach((row) => {
        const fill = row.querySelector(".timeline-fill");
        const year = row.querySelector(".timeline-year");
        const title = row.querySelector(".timeline-title");

        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

        const enter = () => {
          gsap.to(fill, { scaleX: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(year, { x: 6, duration: 0.45, ease: "power3.out" });
          gsap.to(title, { x: 8, color: "#B8512E", duration: 0.45, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(fill, {
            scaleX: 0,
            duration: 0.5,
            ease: "power3.in",
            transformOrigin: "right center",
            onComplete: () => gsap.set(fill, { transformOrigin: "left center" }),
          });
          gsap.to(year, { x: 0, duration: 0.45, ease: "power3.out" });
          gsap.to(title, { x: 0, color: "#0F0E0C", duration: 0.45, ease: "power3.out" });
        };

        row.addEventListener("pointerenter", enter);
        row.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          row.removeEventListener("pointerenter", enter);
          row.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen">
      {/* HERO */}
      <section className="paper bg-ivory-100 pt-16 pb-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-center pb-6 border-b border-ink-900">
            <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
              <span className="folio">№ 002</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">On Origins</span>
            </div>
            <div className="hidden lg:flex col-span-6 justify-center"><span className="folio">CHAPTER · TWO · OF · FIVE</span></div>
            <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
              <span className="folio">EST. 2012</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">PG. 12</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-16">
            <div className="col-span-12 lg:col-span-2">
              <div className="kicker mb-4">About</div>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <h1 className="font-display text-[3.4rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-light text-ink-900 leading-[0.92] tracking-[-0.035em]">
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">A clinic written</span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">in the <span className="italic text-clay-600">margins</span></span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">of a notebook,</span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block italic">in 2012.</span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mt-16">
            <div className="col-span-12 lg:col-span-7 lg:col-start-3 reveal-up">
              <p className="dropcap text-[1.1rem] leading-[1.75] text-ink-700 font-light max-w-[64ch]">
                Safesquare began as a five-page brief, passed between three
                practitioners, listing every operational tax that had nothing to do
                with the work — the receptionist who took messages but didn&apos;t
                book, the billing that arrived eight weeks late, the room booked
                over an existing patient. We crossed each item off, one at a time,
                until what remained was the practice itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="paper bg-ivory-50 py-24 md:py-32 border-y border-ink-900">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-16">
            <div className="col-span-12 lg:col-span-2 reveal-up"><div className="kicker mb-4">Position</div><span className="folio">PG. 14</span></div>
            <div className="col-span-12 lg:col-span-8 reveal-up">
              <h2 className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                Two statements,
                <br />
                <span className="italic text-clay-600">re-read often.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-ink-900">
            <article
              className="vision-card spotlight reveal-up p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-ink-200"
              data-cursor="label"
              data-cursor-text="Vision"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="numeral text-[3.5rem] leading-none text-clay-600">i</span>
                <span className="folio">OUR VISION</span>
              </div>
              <p className="font-display italic font-light text-[1.5rem] md:text-[1.85rem] leading-[1.25] text-ink-900 tracking-[-0.015em]">
                A profession where the conversation between practitioner and patient
                is the only thing competing for attention.
              </p>
              <p className="mt-8 text-[0.95rem] leading-[1.7] text-ink-700 font-light">
                We work towards a clinical environment in which every operational
                obstacle — booking, billing, paperwork, premises — has been
                quietly handled. The hour belongs to the work.
              </p>
            </article>

            <article
              className="vision-card spotlight reveal-up p-10 md:p-14"
              data-cursor="label"
              data-cursor-text="Mission"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="numeral text-[3.5rem] leading-none text-clay-600">ii</span>
                <span className="folio">OUR MISSION</span>
              </div>
              <p className="font-display italic font-light text-[1.5rem] md:text-[1.85rem] leading-[1.25] text-ink-900 tracking-[-0.015em]">
                To provide the environment, the place, and the platform — so that
                clinicians can carry only the conversation.
              </p>
              <p className="mt-8 text-[0.95rem] leading-[1.7] text-ink-700 font-light">
                We build the spaces, run the operations, and hold the standards so
                that mental-health practitioners can deliver care without compromise
                and without burnout.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="paper bg-ivory-100 py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16">
            <div className="kicker mb-4">A Brief Chronology</div>
            <h2 className="font-display text-[2.5rem] md:text-[4rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
              <span className="italic">Twelve years,</span>
              <br />
              briefly noted.
            </h2>
          </div>

          <ol className="border-t border-ink-900">
            {timelineItems.map((item) => (
              <li
                key={item.year}
                className="reveal-up border-b border-ink-200 group"
              >
                <div
                  className="timeline-row relative grid grid-cols-12 gap-x-4 lg:gap-x-8 py-8 md:py-10 items-baseline"
                  data-cursor="label"
                  data-cursor-text={item.year}
                >
                  <span
                    aria-hidden
                    className="timeline-fill absolute inset-0 bg-clay-100/60 -z-0"
                  />
                  <div className="col-span-3 md:col-span-2 relative z-10">
                    <span className="timeline-year inline-block numeral text-[2rem] md:text-[3rem] tabular-nums text-clay-600">
                      {item.year}
                    </span>
                  </div>
                  <div className="col-span-9 md:col-span-4 relative z-10">
                    <h3 className="timeline-title font-display italic text-[1.5rem] md:text-[1.85rem] font-light text-ink-900 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-6 mt-3 md:mt-0 relative z-10">
                    <p className="text-[0.95rem] leading-[1.7] text-ink-700 font-light max-w-[54ch]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="paper bg-ivory-50 py-24 md:py-32 border-y border-ink-900">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16 grid grid-cols-12 gap-x-6 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="kicker mb-4">Standards</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                What we&apos;ve agreed
                <br />
                <span className="italic text-clay-600">to be held to.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-ink-900">
            {certifications.map((cert, i) => (
              <div
                key={cert.title}
                data-cursor="label"
                data-cursor-text={cert.abbr}
                className={`cert-card spotlight reveal-up p-8 md:p-10 ${
                  i < certifications.length - 1 ? "md:border-r border-ink-200" : ""
                } ${i > 0 && i % 2 === 0 ? "md:border-t lg:border-t-0 border-ink-200" : ""}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 border border-ink-900 font-mono text-[0.7rem] tracking-[0.18em] uppercase mb-6">
                  {cert.abbr}
                </div>
                <h3 className="font-display italic text-[1.5rem] font-light text-ink-900 mb-3 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.65] text-ink-600 font-light">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="paper bg-ivory-100 py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16">
            <div className="kicker mb-4">Voices from the Practice</div>
            <h2 className="font-display text-[2.5rem] md:text-[4rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
              <span className="italic">In their own</span> words.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border border-ink-200">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                data-cursor="label"
                data-cursor-text="Voice"
                className="testimonial-card spotlight reveal-up bg-ivory-50 p-10 md:p-12 flex flex-col"
              >
                <span className="font-display italic text-[3rem] leading-none text-clay-600 mb-6">
                  &ldquo;
                </span>
                <blockquote className="font-display italic font-light text-[1.25rem] leading-[1.45] text-ink-900 flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-ink-200">
                  <div className="font-medium text-[0.95rem] text-ink-900">{t.author}</div>
                  <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-500 mt-1">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <About />

      {/* CTA */}
      <section className="section-dark paper py-24 md:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-end">
            <div className="col-span-12 lg:col-span-8 reveal-up">
              <div className="kicker mb-6 text-clay-400">Next Step</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light leading-[0.95] tracking-[-0.03em] text-ivory-50">
                Begin the
                <br />
                <span className="italic text-clay-400">conversation</span>.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 flex flex-col gap-4 reveal-up">
              <Magnetic strength={0.35}>
                <Link href="/contact" className="btn-clay" data-cursor="label" data-cursor-text="Book →">Request a Session<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/practitioners" className="btn-ghost border-ivory-100 text-ivory-100" data-cursor="label" data-cursor-text="Apply →">Apply as Practitioner<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
