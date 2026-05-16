"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Vertical Manifesto" — brutalist split.
 * A sticky numeral column counts down while each provision unfolds
 * as a full panel with an outsized italic verb and a single sentence.
 */

const manifesto = [
  {
    n: "01",
    verb: "House.",
    line: "Soundproofed. North-lit. Cleaned between sessions.",
    foot: "A consulting suite, single-tenant for your booked hours.",
    tag: "ENVIRONMENT",
  },
  {
    n: "02",
    verb: "Staff.",
    line: "Reception that books, bills, and follows up — in your name.",
    foot: "An intake desk operated for you, not against you.",
    tag: "OPERATIONS",
  },
  {
    n: "03",
    verb: "Run.",
    line: "Encrypted notes. Telehealth. A calendar that travels.",
    foot: "A digital practice, quietly maintained in the background.",
    tag: "PLATFORM",
  },
  {
    n: "04",
    verb: "Gather.",
    line: "Supervision. Peer consultation. Sensible referrals.",
    foot: "A network of colleagues worth being among.",
    tag: "COMMUNITY",
  },
];

export default function Practitioners() {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels =
        sectionRef.current?.querySelectorAll<HTMLElement>(".m-panel") ?? [];

      // Reveal verbs / lines per panel as they enter
      panels.forEach((panel) => {
        const verb = panel.querySelector<HTMLElement>(".m-verb");
        const line = panel.querySelector<HTMLElement>(".m-line");
        const foot = panel.querySelector<HTMLElement>(".m-foot");
        const rule = panel.querySelector<HTMLElement>(".m-rule");

        if (verb) {
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
        }
        if (rule) {
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
        }
        if (line) {
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
        }
        if (foot) {
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
        }
      });

      // Pin the numeral rail across all panels and morph numeral + tag
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
                    numEl.textContent = manifesto[i].n;
                    tagEl.textContent = manifesto[i].tag;
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

      // Headline pre-reveal
      const head = sectionRef.current?.querySelectorAll(".m-headline");
      if (head) {
        gsap.fromTo(
          head,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-dark paper overflow-hidden"
    >
      {/* Atmospheric glow */}
      <div className="absolute top-1/3 -right-40 w-[640px] h-[640px] rounded-full bg-clay-600/[0.05] blur-3xl pointer-events-none" />

      {/* Masthead */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 pt-28 md:pt-36">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-baseline pb-6 border-b border-ivory-100/20">
          <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
            <span className="folio text-ivory-100/60">PG. 56</span>
            <span className="h-px w-8 bg-ivory-100/30" />
            <span className="folio text-ivory-100/60">A Manifesto</span>
          </div>
          <div className="hidden lg:flex col-span-6 justify-center">
            <span className="folio text-ivory-100/60">FOR · PRACTITIONERS</span>
          </div>
          <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
            <span className="folio text-ivory-100/60">FOUR · PROVISIONS</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="col-span-12 lg:col-span-2">
            <div className="m-headline kicker text-clay-400">Practitioners</div>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h2 className="m-headline font-display text-[3rem] md:text-[5rem] lg:text-[7rem] font-light leading-[0.9] tracking-[-0.035em] text-ivory-50">
              Bring the work.
            </h2>
            <h2 className="m-headline font-display text-[3rem] md:text-[5rem] lg:text-[7rem] font-light italic leading-[0.9] tracking-[-0.035em] text-clay-400 mt-1">
              We&apos;ll bring the room.
            </h2>
            <p className="m-headline mt-10 max-w-[58ch] text-[1.05rem] leading-[1.7] text-ink-200 font-light">
              One monthly fee. Four standing provisions. A practice already set up
              for you, so the day starts with your first patient and ends with
              your last.
            </p>
          </div>
        </div>
      </div>

      {/* Manifesto — split column */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-x-0">
          {/* Sticky numeral rail */}
          <div
            ref={railRef}
            className="hidden lg:flex col-span-3 h-screen flex-col justify-between py-16 border-r border-ivory-100/15 pr-8"
          >
            <div className="flex flex-col gap-3">
              <span className="folio text-clay-400">Provision</span>
              <span
                ref={tagRef}
                className="font-mono text-[0.72rem] tracking-[0.28em] uppercase text-ivory-100/70"
              >
                {manifesto[0].tag}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-start overflow-hidden">
              <div
                ref={numeralRef}
                className="font-display italic font-light text-[clamp(10rem,22vw,18rem)] leading-[0.85] text-ivory-50/90 tabular-nums"
                style={{ willChange: "transform" }}
              >
                {manifesto[0].n}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-clay-400" />
              <span className="folio text-clay-400">of {manifesto.length}</span>
            </div>
          </div>

          {/* Panels */}
          <div className="col-span-12 lg:col-span-9 lg:pl-12">
            {manifesto.map((m, i) => (
              <article
                key={m.n}
                className="m-panel min-h-screen flex flex-col justify-center border-b border-ivory-100/15 py-20 lg:py-0 relative"
                data-cursor="label"
                data-cursor-text={m.tag}
              >
                {/* mobile-only numeral */}
                <div className="lg:hidden flex items-baseline gap-4 mb-10">
                  <span className="font-display italic font-light text-[6rem] leading-none text-ivory-50/90 tabular-nums">
                    {m.n}
                  </span>
                  <div className="flex flex-col">
                    <span className="folio text-clay-400">Provision</span>
                    <span className="font-mono text-[0.7rem] tracking-[0.28em] uppercase text-ivory-100/70 mt-1">
                      {m.tag}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h3 className="m-verb font-display italic font-light text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.88] tracking-[-0.04em] text-ivory-50 inline-block">
                    {m.verb}
                  </h3>
                </div>

                <div className="m-rule h-px bg-clay-400 mt-8 mb-10 w-full origin-left" />

                <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10">
                  <p className="m-line col-span-12 md:col-span-8 text-[1.15rem] md:text-[1.4rem] leading-[1.45] text-ivory-100 font-light max-w-[36ch]">
                    {m.line}
                  </p>
                  <div className="m-foot col-span-12 md:col-span-4 mt-6 md:mt-0 flex flex-col md:items-end md:text-right">
                    <span className="folio text-clay-400 mb-2">Note</span>
                    <p className="text-[0.85rem] leading-[1.65] text-ink-300 font-light max-w-[28ch]">
                      {m.foot}
                    </p>
                  </div>
                </div>

                {/* Panel index marker on right edge */}
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 flex-col items-end gap-3">
                  {manifesto.map((mk, idx) => (
                    <span
                      key={mk.n}
                      className={`h-px transition-all duration-500 ${
                        idx === i ? "w-10 bg-clay-400" : "w-4 bg-ivory-100/25"
                      }`}
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — closing spread */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-28 md:py-36 border-t border-ivory-100/20">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <span className="folio text-clay-400">Apply</span>
            <h3 className="m-headline font-display text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-light leading-[0.95] tracking-[-0.03em] text-ivory-50 mt-4">
              Submit a brief.
              <br />
              <span className="italic text-clay-400">We&apos;ll write back.</span>
            </h3>
            <p className="mt-8 max-w-[54ch] text-[1rem] leading-[1.7] text-ink-200 font-light">
              Tell us about your training, your present caseload, and how you
              would use a Safesquare suite. Replies are written, considered, and
              arrive within five working days.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-10 lg:mt-0 flex flex-col gap-4">
            <Magnetic strength={0.4}>
              <Link
                href="/contact"
                className="btn-clay"
                data-cursor="label"
                data-cursor-text="Apply →"
              >
                Apply for a Suite
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="/practitioners"
                className="btn-ghost border-ivory-100 text-ivory-100"
                data-cursor="label"
                data-cursor-text="Read →"
              >
                Read the Provisions in Full
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
