"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useImageReveal } from "@/components/interactive/useImageReveal";

const ticker = [
  "HIPAA-ALIGNED PRIVACY",
  "LICENSED PRACTITIONERS",
  "SAME-WEEK CONSULTATION",
  "IN-PERSON · TELEHEALTH",
  "PRIVATE PRACTICE SUITES",
  "EVIDENCE-BASED CARE",
];

/* Split text into per-word/per-char spans so we can stagger GSAP without a plugin. */
function splitChars(text: string): React.ReactNode[] {
  return text.split("").map((c, i) => (
    <span
      key={i}
      className="split-char inline-block"
      style={{ whiteSpace: c === " " ? "pre" : "normal" }}
    >
      {c === " " ? " " : c}
    </span>
  ));
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const folioRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useImageReveal(heroRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        folioRef.current?.children ?? [],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
      );

      const lines = headlineRef.current?.querySelectorAll(".hl-line") ?? [];
      lines.forEach((line, i) => {
        const chars = line.querySelectorAll(".split-char");
        tl.fromTo(
          chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.018,
            ease: "power4.out",
          },
          i === 0 ? "-=0.15" : "-=0.78"
        );
      });

      if (ruleRef.current) {
        tl.fromTo(
          ruleRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power4.out",
            transformOrigin: "left center",
          },
          "-=0.7"
        );
      }

      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        );

        const counters = statsRef.current.querySelectorAll(".counter");
        counters.forEach((counter) => {
          const target = counter.getAttribute("data-target") || "0";
          const numericValue = parseInt(target.replace(/\D/g, ""), 10);
          const suffix = target.includes("+") ? "+" : target.includes("%") ? "%" : "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: numericValue,
            duration: 2.6,
            ease: "power2.out",
            delay: 0.6,
            onUpdate: () => {
              counter.textContent = Math.floor(obj.val) + suffix;
            },
          });
        });
      }

      if (imageWrapRef.current) {
        tl.fromTo(
          imageWrapRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
          "-=1.1"
        );

        // Scroll parallax — image drifts up while wrapper pins
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        // Fig.01 marker subtle counter-parallax
        if (markerRef.current) {
          gsap.to(markerRef.current, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }

      // Marquee — scroll-velocity binding (faster while scrolling)
      if (tickerTrackRef.current) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduce) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = self.getVelocity();
              const duration = Math.max(8, 40 - Math.abs(v) * 0.012);
              const direction = v >= 0 ? "normal" : "reverse";
              if (tickerTrackRef.current) {
                tickerTrackRef.current.style.animationDuration = `${duration}s`;
                tickerTrackRef.current.style.animationDirection = direction;
              }
            },
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative paper bg-ivory-100 pt-10 lg:pt-14 pb-0 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Folio bar */}
        <div
          ref={folioRef}
          className="grid grid-cols-12 gap-6 items-center pb-6 border-b border-ink-900"
        >
          <div className="col-span-6 lg:col-span-3 flex items-center gap-3">
            <span className="folio">№ 001</span>
            <span className="h-px w-8 bg-ink-900" />
            <span className="folio">The Hero Issue</span>
          </div>
          <div className="hidden lg:flex col-span-6 justify-center">
            <span className="folio">A QUIET PLACE FOR CONSIDERED CARE</span>
          </div>
          <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
            <span className="folio">KARACHI</span>
            <span className="h-px w-8 bg-ink-900" />
            <span className="folio">PK</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-10 lg:pt-16 pb-14">
          <aside className="hidden lg:flex flex-col col-span-2 pt-3">
            <div className="kicker mb-6">Editor&apos;s Note</div>
            <p className="text-[0.78rem] leading-relaxed text-ink-600 font-light max-w-[14ch]">
              An environment, a place, and a platform — for those who deliver
              <em className="italic-serif text-ink-900"> exceptional care</em>.
            </p>
            <div className="mt-6 h-px w-10 bg-ink-900" />
            <div className="mt-6 flex flex-col gap-1 text-ink-500">
              <span className="folio">FOUNDED</span>
              <span className="font-mono text-[0.78rem] text-ink-900 tabular-nums">2012</span>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-7">
            <h1
              ref={headlineRef}
              className="font-display text-[3.4rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[7.75rem] font-light text-ink-900 leading-[0.92] tracking-[-0.035em]"
            >
              <span className="hl-line split-line">{splitChars("A quieter")}</span>
              <span className="hl-line split-line italic font-light text-clay-600">
                {splitChars("practice")}
                <span className="text-ink-900 not-italic split-char inline-block">,</span>
              </span>
              <span className="hl-line split-line">{splitChars("considered")}</span>
              <span className="hl-line split-line">
                <span className="italic font-light text-ink-900/95">
                  {splitChars("care")}
                </span>
                <span className="text-clay-600 split-char inline-block">.</span>
              </span>
            </h1>

            <div ref={ruleRef} className="h-px bg-ink-900 mt-10 origin-left" />

            <p
              ref={introRef}
              className="dropcap mt-8 max-w-[58ch] text-[1.05rem] md:text-[1.1rem] leading-[1.7] text-ink-700 font-light"
            >
              Safesquare is the environment, the place, and the platform we built so
              mental-health practitioners can do what only they can do — sit, listen,
              and deliver care that is rigorous, private, and unhurried. We carry the
              clinic. They carry the conversation.
            </p>

            <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-5">
              <Magnetic strength={0.4}>
                <Link href="/contact" className="btn-clay" data-cursor="label" data-cursor-text="Book →">
                  <span>Request a Session</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </Magnetic>
              <Link
                href="/services"
                className="link-underline text-[0.875rem]"
                data-cursor="label"
                data-cursor-text="Read →"
              >
                Read the practice
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 mt-14 lg:mt-0 lg:pt-3">
            <div ref={imageWrapRef} className="relative">
              <div
                ref={imageRef}
                className="img-reveal editorial-image aspect-[3/4] border border-ink-900"
                data-cursor="view"
                data-cursor-text="View"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=800&fit=crop&q=80"
                  alt="A letter, written by hand"
                  className="w-full h-full object-cover"
                />
              </div>
              <div ref={markerRef} className="absolute -bottom-3 -right-3 hidden sm:block">
                <div className="bg-clay-600 text-ivory-50 px-3 py-1 font-mono text-[0.625rem] tracking-[0.25em] uppercase">
                  Fig. 01
                </div>
              </div>
              <figcaption className="mt-5 flex items-start gap-3">
                <span className="folio mt-1 shrink-0">FIG&nbsp;01</span>
                <span className="text-[0.78rem] leading-relaxed text-ink-600 font-light">
                  Consultation room, north light. Photographed at the Clifton suite,
                  block four — an honest, unornamented space designed to disappear.
                </span>
              </figcaption>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-ink-900 pt-10 pb-14">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-8">
            <div className="md:border-r md:border-ink-200 md:pr-6">
              <div className="kicker mb-4">By the Numbers</div>
              <p className="text-[0.85rem] leading-relaxed text-ink-600 font-light max-w-[24ch]">
                A measured account of what we&apos;ve built since the doors opened.
              </p>
            </div>
            <StatBlock label="Patients Served" target="500+" />
            <StatBlock label="Practitioners" target="50+" />
            <StatBlock label="Years of Practice" target="13+" />
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-y border-ink-900 bg-ink-900 text-ivory-50 overflow-hidden">
        <div
          ref={tickerTrackRef}
          className="marquee-track flex whitespace-nowrap py-4"
        >
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[0.7rem] tracking-[0.28em] uppercase mx-10 flex items-center gap-10"
            >
              {item}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-clay-500" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBlock({ label, target }: { label: string; target: string }) {
  return (
    <div className="flex flex-col group">
      <div className="numeral text-[5rem] md:text-[6rem] leading-none transition-colors duration-500 group-hover:text-clay-600">
        <span className="counter tabular-nums" data-target={target}>
          0
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="h-px w-6 bg-clay-600 group-hover:w-12 transition-[width] duration-500 ease-[var(--ease-editorial)]" />
        <span className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink-500">
          {label}
        </span>
      </div>
    </div>
  );
}
