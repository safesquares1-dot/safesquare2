"use client";

import Contact from "@/components/Contact";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useSpotlight } from "@/components/interactive/useSpotlight";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "How do I book an appointment?", a: "Write to us through the form on this page, or telephone the intake desk. A senior member of the team will respond within two working days. Same-week appointments are sometimes available; please mention this in your note." },
  { q: "What does a session cost?", a: "Fees vary by practitioner and modality. Standard psychological therapy is held at a single per-session rate; psychiatric work is rated separately. A reduced-fee window is reserved each month — please ask during intake if this would be useful." },
  { q: "Is telehealth available?", a: "Yes. We use an encrypted, on-shore telehealth platform for individual and couples work. The link is sent fifteen minutes before each session, with a written reminder one day in advance." },
  { q: "What are your hours?", a: "Monday to Friday, 08:00 to 20:00 PKT. Saturday, 09:00 to 17:00. Sunday by appointment for existing patients only." },
  { q: "How do I join as a practitioner?", a: "Visit the Practitioners page for the requirements and the membership. Applications are reviewed individually; we reply by letter within five working days, in writing." },
  { q: "Is my information confidential?", a: "Yes. We operate under HIPAA-aligned protocols, encrypt all records, and do not share correspondence — internal or external — without express written consent. Records remain on-shore." },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSpotlight(pageRef, ".map-card", { tilt: 1.5, lift: 4 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = pageRef.current?.querySelectorAll(".hero-line .hero-inner") ?? [];
      gsap.fromTo(lines, { y: "108%" }, { y: "0%", duration: 1.05, ease: "power4.out", stagger: 0.12 });

      const reveals = pageRef.current?.querySelectorAll(".reveal-up") ?? [];
      reveals.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
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
              <span className="folio">№ 005</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">Correspondence</span>
            </div>
            <div className="hidden lg:flex col-span-6 justify-center"><span className="folio">REPLIES · ARE · SIGNED</span></div>
            <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
              <span className="folio">CHAPTER · V</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">PG. 84</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-16">
            <div className="col-span-12 lg:col-span-2"><div className="kicker mb-4">Contact</div></div>
            <div className="col-span-12 lg:col-span-10">
              <h1 className="font-display text-[3.4rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-light text-ink-900 leading-[0.92] tracking-[-0.035em]">
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">Begin where</span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">you <span className="italic text-clay-600">are</span><span className="text-clay-600">.</span></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mt-16">
            <div className="col-span-12 lg:col-span-7 lg:col-start-3 reveal-up">
              <p className="dropcap text-[1.1rem] leading-[1.75] text-ink-700 font-light max-w-[64ch]">
                For appointments, second opinions, supervisory queries, or simply to
                begin a conversation. Use the form below, write directly, or call.
                Replies are signed and arrive within two working days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      {/* FAQ */}
      <section className="paper bg-ivory-50 py-24 md:py-32 border-y border-ink-900">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16 grid grid-cols-12 gap-x-6 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="kicker mb-4">Asked & Answered</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                Common
                <br />
                <span className="italic text-clay-600">questions.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-6 lg:border-l lg:border-ink-200 mt-8 lg:mt-0">
              <p className="text-[0.95rem] leading-[1.7] text-ink-700 font-light">
                If your question is not here, it has not been answered. Please
                write and we will reply in turn.
              </p>
            </div>
          </div>

          <ul className="border-t border-ink-900 max-w-[920px]">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <li
                  key={i}
                  className="reveal-up border-b border-ink-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full grid grid-cols-12 gap-x-4 lg:gap-x-8 items-baseline py-6 md:py-8 text-left group transition-colors duration-400 hover:bg-clay-100/40 px-2 -mx-2"
                    aria-expanded={isOpen}
                    data-cursor="label"
                    data-cursor-text={isOpen ? "Close" : "Open"}
                  >
                    <span className="col-span-2 md:col-span-1 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-clay-600 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="col-span-9 md:col-span-10 font-display text-[1.35rem] md:text-[1.65rem] font-light italic text-ink-900 leading-[1.2] tracking-[-0.01em]">
                      {faq.q}
                    </span>
                    <span className="col-span-1 flex justify-end">
                      <span
                        className={`relative w-4 h-4 transition-transform duration-500 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <span className="absolute inset-x-0 top-1/2 h-px bg-ink-900 -translate-y-1/2" />
                        <span
                          className={`absolute inset-y-0 left-1/2 w-px bg-ink-900 -translate-x-1/2 transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-100"
                          }`}
                        />
                      </span>
                    </span>
                  </button>
                  <div
                    className={`grid grid-cols-12 gap-x-4 lg:gap-x-8 overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-editorial)] ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="col-span-12 md:col-span-10 md:col-start-2 pb-7">
                      <p className="text-[1rem] leading-[1.75] text-ink-700 font-light max-w-[60ch]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* MAP / LOCATION */}
      <section className="paper bg-ivory-100 py-24 md:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-12 grid grid-cols-12 gap-x-6 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="kicker mb-4">Where to Find Us</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                <span className="italic">Clifton,</span> Block 4.
              </h2>
            </div>
          </div>

          <div
            className="map-card spotlight reveal-up grid grid-cols-12 gap-x-6 lg:gap-x-10 items-stretch border border-ink-900"
            data-cursor="view"
            data-cursor-text="Clifton"
          >
            <div className="col-span-12 lg:col-span-7 relative bg-ink-100 min-h-[420px] overflow-hidden">
              {/* Stylised topo map */}
              <svg viewBox="0 0 600 420" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14110D" strokeWidth="0.3" opacity="0.18" />
                  </pattern>
                </defs>
                <rect width="600" height="420" fill="url(#grid)" />
                {/* Contour lines */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="320"
                    cy="200"
                    rx={60 + i * 35}
                    ry={40 + i * 22}
                    fill="none"
                    stroke="#14110D"
                    strokeWidth="0.6"
                    opacity={0.25 - i * 0.025}
                  />
                ))}
                {/* Streets */}
                <path d="M0,260 C120,255 240,265 360,260 S540,255 600,262" fill="none" stroke="#14110D" strokeWidth="1.2" opacity="0.5" />
                <path d="M180,0 C190,80 175,160 180,240 S195,360 188,420" fill="none" stroke="#14110D" strokeWidth="1.2" opacity="0.5" />
                <path d="M420,0 C425,90 410,180 425,260 S435,360 420,420" fill="none" stroke="#14110D" strokeWidth="0.8" opacity="0.35" />
                {/* Pin */}
                <circle cx="320" cy="200" r="10" fill="#B8512E" />
                <circle cx="320" cy="200" r="22" fill="none" stroke="#B8512E" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" from="14" to="36" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>

              <div className="relative z-10 p-8 flex justify-end">
                <span className="folio bg-ivory-100 px-2 py-1">FIG · 03 · CLIFTON</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 p-10 md:p-12 bg-ivory-50 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-clay-600">Address</span>
                <h3 className="font-display italic font-light text-[2rem] md:text-[2.5rem] text-ink-900 mt-4 leading-[1.05]">
                  AC 10, Block 4
                  <br />
                  Clifton, Karachi
                </h3>
                <p className="text-[0.9rem] text-ink-500 mt-6 font-mono tracking-[0.15em]">
                  24.8138° N · 67.0299° E
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-ink-200">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="folio">PARKING</span>
                    <p className="mt-2 text-[0.9rem] text-ink-700 font-light">On-site, complimentary for patients during their session.</p>
                  </div>
                  <div>
                    <span className="folio">ENTRY</span>
                    <p className="mt-2 text-[0.9rem] text-ink-700 font-light">Reception is on the ground floor. Lift access throughout.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark paper py-24 md:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-end">
            <div className="col-span-12 lg:col-span-8 reveal-up">
              <div className="kicker mb-6 text-clay-400">Begin</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light leading-[0.95] tracking-[-0.03em] text-ivory-50">
                The first hour
                <br />
                is <span className="italic text-clay-400">yours</span>.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 flex flex-col gap-4 reveal-up">
              <Magnetic strength={0.35}>
                <Link href="/services" className="btn-clay" data-cursor="label" data-cursor-text="Read →">Read the Practice<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/about" className="btn-ghost border-ivory-100 text-ivory-100" data-cursor="label" data-cursor-text="About →">About Safesquare<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
