"use client";

import Practitioners from "@/components/Practitioners";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";

gsap.registerPlugin(ScrollTrigger);

/**
 * /practitioners — the long-form manifesto.
 * Three further "verses": Ask (requirements), Give (membership),
 * Carry (back-office). Each is a vertical-manifesto split, alternating
 * light / dark to keep the spread legible across the route.
 */

const ask = [
  {
    n: "I",
    verb: "Licensed.",
    line: "Current registration with your relevant professional body, in good standing.",
    foot: "Renewals submitted to us each year — quietly verified, never published.",
    tag: "LICENCE",
  },
  {
    n: "II",
    verb: "Insured.",
    line: "Active professional liability cover, renewed annually and on file.",
    foot: "Carried for the duration of your membership. No exceptions.",
    tag: "INDEMNITY",
  },
  {
    n: "III",
    verb: "Discreet.",
    line: "A documented practice for safeguarding patient information and consent.",
    foot: "Audited annually. Records remain on-shore.",
    tag: "CONFIDENCE",
  },
  {
    n: "IV",
    verb: "Referenced.",
    line: "Two professional references from clinical peers familiar with your work.",
    foot: "Letters, on plain paper, in confidence.",
    tag: "PEER",
  },
];

const give = [
  {
    n: "01",
    verb: "Yours.",
    line: "A consulting suite, single-tenant during your booked hours. Not a co-working space.",
    foot: "Soundproofed. Naturally lit. Cleaned between sessions.",
    tag: "SUITE",
  },
  {
    n: "02",
    verb: "Answered.",
    line: "Calls taken by name, appointments confirmed in writing, no-shows followed up.",
    foot: "Reception staffed by a senior member of the intake team.",
    tag: "DESK",
  },
  {
    n: "03",
    verb: "Among.",
    line: "Monthly peer-consultation evenings. Supervised case discussion. Sensible referrals.",
    foot: "A network of colleagues worth being among.",
    tag: "FELLOWSHIP",
  },
  {
    n: "04",
    verb: "Operated.",
    line: "A practice-management platform built for clinicians, not for clinical-software vendors.",
    foot: "Reduces, never extends, the working day.",
    tag: "OPERATIONS",
  },
];

const carry = [
  {
    n: "i",
    verb: "Admin.",
    line: "Reception, scheduling, billing, written follow-up — handled in your name.",
    foot: "Monthly statements reconciled and signed.",
    tag: "ADMINISTRATIVE",
  },
  {
    n: "ii",
    verb: "Position.",
    line: "Discreet placement within Safesquare's quietly maintained channels.",
    foot: "No advertising you would not write yourself.",
    tag: "MARKETING",
  },
  {
    n: "iii",
    verb: "Learning.",
    line: "An annual budget for CPD, plus three internal workshops per year.",
    foot: "Held under the Chatham House rule.",
    tag: "EDUCATION",
  },
  {
    n: "iv",
    verb: "Quiet.",
    line: "Encrypted notes, telehealth, and a calendar that does what calendars are supposed to do.",
    foot: "Available without a ticket.",
    tag: "TECHNICAL",
  },
];

interface Verse {
  n: string;
  verb: string;
  line: string;
  foot: string;
  tag: string;
}

type Theme = "light" | "dark";

function ManifestoBlock({
  items,
  theme,
  sectionId,
}: {
  items: Verse[];
  theme: Theme;
  sectionId: string;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const dark = theme === "dark";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels =
        blockRef.current?.querySelectorAll<HTMLElement>(".v-panel") ?? [];

      panels.forEach((panel) => {
        const verb = panel.querySelector<HTMLElement>(".v-verb");
        const line = panel.querySelector<HTMLElement>(".v-line");
        const foot = panel.querySelector<HTMLElement>(".v-foot");
        const rule = panel.querySelector<HTMLElement>(".v-rule");

        if (verb)
          gsap.fromTo(
            verb,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: panel, start: "top 75%", once: true },
            }
          );
        if (rule)
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              transformOrigin: "left center",
              scrollTrigger: { trigger: panel, start: "top 80%", once: true },
            }
          );
        if (line)
          gsap.fromTo(
            line,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              delay: 0.15,
              scrollTrigger: { trigger: panel, start: "top 75%", once: true },
            }
          );
        if (foot)
          gsap.fromTo(
            foot,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              delay: 0.25,
              scrollTrigger: { trigger: panel, start: "top 75%", once: true },
            }
          );
      });

      const railEl = railRef.current;
      const numEl = numeralRef.current;
      const tagEl = tagRef.current;

      if (railEl && numEl && tagEl && panels.length > 0) {
        ScrollTrigger.create({
          trigger: railEl,
          start: "top top+=120",
          endTrigger: panels[panels.length - 1],
          end: "bottom center",
          pin: true,
          pinSpacing: false,
        });

        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                const tl = gsap.timeline();
                tl.to(numEl, {
                  yPercent: -40,
                  opacity: 0,
                  duration: 0.35,
                  ease: "power3.in",
                  onComplete: () => {
                    numEl.textContent = items[i].n;
                    tagEl.textContent = items[i].tag;
                  },
                }).fromTo(
                  numEl,
                  { yPercent: 40, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
                );
              }
            },
          });
        });
      }
    }, blockRef);

    return () => ctx.revert();
  }, [items]);

  // Theme tokens — kept inline so the component reads at a glance
  const ground = dark ? "bg-ink-900 text-ivory-100 section-dark" : "bg-ivory-50 text-ink-900";
  const headline = dark ? "text-ivory-50" : "text-ink-900";
  const body = dark ? "text-ivory-100" : "text-ink-700";
  const note = dark ? "text-ink-300" : "text-ink-500";
  const numeralColor = dark ? "text-ivory-50/90" : "text-ink-900/90";
  const rule = "bg-clay-600";
  const ruleSoft = dark ? "bg-ivory-100/15" : "bg-ink-200";
  const tabSoft = dark ? "bg-ivory-100/25" : "bg-ink-300";
  const tabActive = "bg-clay-600";
  const accentLabel = dark ? "text-clay-400" : "text-clay-600";
  const foliosoft = dark ? "text-ivory-100/60" : "text-ink-500";

  return (
    <section
      id={sectionId}
      ref={blockRef}
      className={`relative paper ${ground}`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 pt-28 md:pt-36">
        <div className={`grid grid-cols-12 gap-x-6 lg:gap-x-10 items-baseline pb-6 border-b ${dark ? "border-ivory-100/20" : "border-ink-900"}`}>
          <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
            <span className={`folio ${foliosoft}`}>VERSE</span>
            <span className={`h-px w-8 ${dark ? "bg-ivory-100/30" : "bg-ink-900"}`} />
            <span className={`folio ${foliosoft}`}>{items.length} PROVISIONS</span>
          </div>
          <div className="hidden lg:flex col-span-6 justify-center">
            <span className={`folio ${foliosoft}`}>READ · IN · ORDER</span>
          </div>
          <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
            <span className={`folio ${foliosoft}`}>{sectionId.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-x-0">
          <div
            ref={railRef}
            className={`hidden lg:flex col-span-3 h-screen flex-col justify-between py-16 border-r pr-8 ${
              dark ? "border-ivory-100/15" : "border-ink-200"
            }`}
          >
            <div className="flex flex-col gap-3">
              <span className={`folio ${accentLabel}`}>Provision</span>
              <span
                ref={tagRef}
                className={`font-mono text-[0.72rem] tracking-[0.28em] uppercase ${dark ? "text-ivory-100/70" : "text-ink-600"}`}
              >
                {items[0].tag}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-start overflow-hidden">
              <div
                ref={numeralRef}
                className={`font-display italic font-light text-[clamp(8rem,18vw,15rem)] leading-[0.85] ${numeralColor} tabular-nums`}
                style={{ willChange: "transform" }}
              >
                {items[0].n}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-clay-600" />
              <span className={`folio ${accentLabel}`}>of {items.length}</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 lg:pl-12">
            {items.map((m, i) => (
              <article
                key={m.n}
                className={`v-panel min-h-screen flex flex-col justify-center border-b py-20 lg:py-0 relative ${ruleSoft.replace("bg-", "border-")}`}
                data-cursor="label"
                data-cursor-text={m.tag}
              >
                <div className="lg:hidden flex items-baseline gap-4 mb-10">
                  <span className={`font-display italic font-light text-[5rem] leading-none ${numeralColor} tabular-nums`}>
                    {m.n}
                  </span>
                  <div className="flex flex-col">
                    <span className={`folio ${accentLabel}`}>Provision</span>
                    <span className={`font-mono text-[0.7rem] tracking-[0.28em] uppercase mt-1 ${dark ? "text-ivory-100/70" : "text-ink-600"}`}>
                      {m.tag}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h3 className={`v-verb font-display italic font-light text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] leading-[0.88] tracking-[-0.04em] ${headline} inline-block`}>
                    {m.verb}
                  </h3>
                </div>

                <div className={`v-rule h-px ${rule} mt-8 mb-10 w-full origin-left`} />

                <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10">
                  <p className={`v-line col-span-12 md:col-span-8 text-[1.15rem] md:text-[1.4rem] leading-[1.45] ${body} font-light max-w-[40ch]`}>
                    {m.line}
                  </p>
                  <div className="v-foot col-span-12 md:col-span-4 mt-6 md:mt-0 flex flex-col md:items-end md:text-right">
                    <span className={`folio mb-2 ${accentLabel}`}>Note</span>
                    <p className={`text-[0.85rem] leading-[1.65] font-light max-w-[28ch] ${note}`}>
                      {m.foot}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 flex-col items-end gap-3">
                  {items.map((mk, idx) => (
                    <span
                      key={mk.n}
                      className={`h-px transition-all duration-500 ${
                        idx === i ? `w-10 ${tabActive}` : `w-4 ${tabSoft}`
                      }`}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PractitionersPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = pageRef.current?.querySelectorAll(".hero-line .hero-inner") ?? [];
      gsap.fromTo(lines, { y: "108%" }, { y: "0%", duration: 1.05, ease: "power4.out", stagger: 0.12 });

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
              <span className="folio">№ 004</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">For Practitioners</span>
            </div>
            <div className="hidden lg:flex col-span-6 justify-center"><span className="folio">A · MANIFESTO · IN · FOUR · VERSES</span></div>
            <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
              <span className="folio">CHAPTER · IV</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">PG. 56</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-16">
            <div className="col-span-12 lg:col-span-2"><div className="kicker mb-4">Practitioners</div></div>
            <div className="col-span-12 lg:col-span-10">
              <h1 className="font-display text-[3.4rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-light text-ink-900 leading-[0.92] tracking-[-0.035em]">
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">A practice,</span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">already <span className="italic text-clay-600">set up</span></span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">for you.</span></span>
              </h1>
            </div>
          </div>

          {/* Index of verses */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mt-20 pt-10 border-t border-ink-200">
            <div className="col-span-12 lg:col-span-3 reveal-up">
              <div className="kicker mb-4">In this issue</div>
              <p className="text-[0.95rem] leading-[1.7] text-ink-700 font-light max-w-[34ch]">
                Three verses, in plain English. Read down — the page is built to
                be read down.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9 mt-8 lg:mt-0">
              <ol className="border-t border-ink-900">
                {[
                  { n: "I", title: "We bring the room.", anchor: "#we-bring", note: "The four standing provisions." },
                  { n: "II", title: "What we ask.", anchor: "#we-ask", note: "Four requirements, without exception." },
                  { n: "III", title: "What we give.", anchor: "#we-give", note: "The membership, in full." },
                  { n: "IV", title: "What we carry.", anchor: "#we-carry", note: "The back office, named." },
                ].map((c) => (
                  <li key={c.n} className="reveal-up border-b border-ink-200">
                    <a
                      href={c.anchor}
                      data-cursor="label"
                      data-cursor-text={c.title}
                      className="grid grid-cols-12 gap-x-4 lg:gap-x-8 items-baseline py-5 group transition-colors duration-300 hover:bg-clay-100/40 px-2 -mx-2"
                    >
                      <span className="col-span-2 md:col-span-1 font-mono text-[0.78rem] tracking-[0.22em] uppercase text-clay-600 tabular-nums">
                        {c.n}
                      </span>
                      <span className="col-span-10 md:col-span-5 font-display italic text-[1.4rem] md:text-[1.6rem] font-light text-ink-900 leading-tight">
                        {c.title}
                      </span>
                      <span className="col-span-12 md:col-span-5 mt-1 md:mt-0 text-[0.9rem] text-ink-600 font-light">
                        {c.note}
                      </span>
                      <span className="hidden md:flex md:col-span-1 justify-end">
                        <svg className="w-4 h-4 text-clay-600 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* VERSE I — homepage component, dark, manifesto-form */}
      <div id="we-bring">
        <Practitioners />
      </div>

      {/* VERSE II — What we ask */}
      <ManifestoBlock items={ask} theme="light" sectionId="we-ask" />

      {/* VERSE III — What we give */}
      <ManifestoBlock items={give} theme="dark" sectionId="we-give" />

      {/* VERSE IV — What we carry */}
      <ManifestoBlock items={carry} theme="light" sectionId="we-carry" />

      {/* COLOPHON / CTA */}
      <section className="section-dark paper py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-end">
            <div className="col-span-12 lg:col-span-8 reveal-up">
              <span className="folio text-clay-400">End of Chapter</span>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-light leading-[0.95] tracking-[-0.03em] text-ivory-50 mt-4">
                If this reads like
                <br />
                <span className="italic text-clay-400">your kind of clinic</span>
                <br />
                — write to us.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 flex flex-col gap-4 reveal-up">
              <Magnetic strength={0.4}>
                <Link href="/contact" className="btn-clay" data-cursor="label" data-cursor-text="Apply →">
                  Apply Now
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/about" className="btn-ghost border-ivory-100 text-ivory-100" data-cursor="label" data-cursor-text="Read →">
                  Read About Safesquare
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
