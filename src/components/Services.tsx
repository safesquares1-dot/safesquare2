"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  number: string;
  title: string;
  italic?: string;
  duration: string;
  format: string;
  description: string;
  detail: string;
}

const services: Service[] = [
  {
    number: "I",
    title: "Psychological",
    italic: "Therapy",
    duration: "50 min",
    format: "In-person · Telehealth",
    description:
      "Talking work with a licensed psychologist. Cognitive-behavioural, psychodynamic, or integrative — chosen against the shape of the question, not against a brochure.",
    detail: "Booked in series of six or twelve",
  },
  {
    number: "II",
    title: "Clinical",
    italic: "Counselling",
    duration: "60 min",
    format: "Individual · Couple · Family",
    description:
      "Counselling tailored to the relationship the session is meant to serve — whether that relationship is with another person, with one's work, or with oneself.",
    detail: "Couples and family work available",
  },
  {
    number: "III",
    title: "Psychiatric",
    italic: "Consultation",
    duration: "75 min initial",
    format: "Assessment · Medication management",
    description:
      "A formal psychiatric evaluation with medication review when indicated. Continuity letters issued to GPs and physicians on request.",
    detail: "Follow-ups at 25 minutes",
  },
  {
    number: "IV",
    title: "Mental Health",
    italic: "Assessment",
    duration: "2–3 sessions",
    format: "Comprehensive",
    description:
      "Structured assessment producing a written formulation and a treatment plan you can carry between practitioners. The map before the journey.",
    detail: "Delivered as a written report",
  },
  {
    number: "V",
    title: "Wellbeing",
    italic: "Programmes",
    duration: "8–12 weeks",
    format: "Group · Cohort",
    description:
      "Cohort programmes on stress, sleep, grief, and burnout — held by a senior clinician with no more than ten people in the room at a time.",
    detail: "Limited to ten participants",
  },
  {
    number: "VI",
    title: "Corporate",
    italic: "Wellness",
    duration: "Bespoke",
    format: "On-site · Hybrid",
    description:
      "Confidential, contracted support for organisations who would rather their people not become statistics. Reporting at the team level, never the individual.",
    detail: "Confidentiality contracts standard",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
            delay: (i % 3) * 0.06,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Per-row hover GSAP — drives a fill bar + a number shift + title slide
      const rows = listRef.current?.querySelectorAll<HTMLElement>(".service-row") ?? [];
      const handlers: Array<() => void> = [];

      rows.forEach((row) => {
        const fill = row.querySelector(".service-fill");
        const number = row.querySelector(".service-number");
        const title = row.querySelector(".service-title");
        const meta = row.querySelector(".service-meta");
        const desc = row.querySelector(".service-desc");
        const arrow = row.querySelector(".service-arrow");

        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

        const enter = () => {
          gsap.to(fill, { scaleX: 1, duration: 0.7, ease: "power3.out" });
          gsap.to(number, { x: 8, color: "#B8512E", duration: 0.5, ease: "power3.out" });
          gsap.to(title, { x: 12, duration: 0.55, ease: "power3.out" });
          gsap.to(meta, { x: 12, duration: 0.55, ease: "power3.out", delay: 0.02 });
          gsap.to(desc, { x: -8, opacity: 1, duration: 0.55, ease: "power3.out" });
          gsap.to(arrow, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
        };

        const leave = () => {
          gsap.to(fill, {
            scaleX: 0,
            duration: 0.55,
            ease: "power3.in",
            transformOrigin: "right center",
            onComplete: () => gsap.set(fill, { transformOrigin: "left center" }),
          });
          gsap.to(number, { x: 0, color: "#B8512E", duration: 0.55, ease: "power3.out" });
          gsap.to(title, { x: 0, duration: 0.55, ease: "power3.out" });
          gsap.to(meta, { x: 0, duration: 0.55, ease: "power3.out" });
          gsap.to(desc, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
          gsap.to(arrow, { x: -8, opacity: 0, duration: 0.4, ease: "power3.out" });
        };

        row.addEventListener("pointerenter", enter);
        row.addEventListener("pointerleave", leave);
        handlers.push(() => {
          row.removeEventListener("pointerenter", enter);
          row.removeEventListener("pointerleave", leave);
        });
      });

      return () => handlers.forEach((fn) => fn());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative paper bg-ivory-50 py-28 md:py-36"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-20 md:mb-24 items-end">
          <div className="col-span-12 lg:col-span-7 reveal-up">
            <div className="kicker mb-6">The Practice</div>
            <h2 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-light text-ink-900 leading-[0.92] tracking-[-0.03em]">
              Six rooms,
              <br />
              <span className="italic text-clay-600">six conversations.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-6 lg:border-l lg:border-ink-200 reveal-up mt-8 lg:mt-0">
            <p className="text-[0.95rem] leading-[1.75] text-ink-700 font-light max-w-[34ch]">
              Each service is held by a senior practitioner against a written
              standard. No referrals you cannot trace. No session that fits a
              category instead of a person.
            </p>
          </div>
        </div>

        <ol ref={listRef} className="border-t border-ink-900">
          {services.map((s, i) => (
            <li
              key={s.number}
              className="reveal-up border-b border-ink-900 group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="service-row relative grid grid-cols-12 gap-x-4 lg:gap-x-8 py-8 md:py-10 items-start"
                data-cursor="label"
                data-cursor-text="Read →"
              >
                {/* Hover fill (radial-edge clay) */}
                <span
                  aria-hidden
                  className="service-fill absolute inset-0 bg-clay-100/60 -z-0"
                />

                {/* Number */}
                <div className="col-span-2 md:col-span-1 relative z-10">
                  <span className="service-number inline-block font-mono text-[0.78rem] tracking-[0.22em] uppercase text-clay-600 tabular-nums">
                    №&nbsp;{s.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-5 lg:col-span-4 relative z-10">
                  <h3 className="service-title font-display text-[1.85rem] md:text-[2.4rem] lg:text-[2.85rem] font-light leading-[1] tracking-[-0.02em] text-ink-900">
                    {s.title}{" "}
                    <span className="italic text-clay-600">{s.italic}</span>
                  </h3>
                  <div className="service-meta mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-500">
                      {s.duration}
                    </span>
                    <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-500">
                      · {s.format}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="hidden md:block col-span-5 lg:col-span-5 relative z-10">
                  <p className="service-desc text-[0.95rem] leading-[1.65] text-ink-700 font-light max-w-[44ch]">
                    {s.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex col-span-2 justify-end items-center pt-2 relative z-10">
                  <span
                    className={`service-arrow flex items-center gap-3 text-[0.75rem] tracking-[0.18em] uppercase font-medium text-clay-600 opacity-0 -translate-x-2`}
                  >
                    Read
                    <svg
                      className={`w-4 h-4 transition-transform duration-500 ${
                        hovered === i ? "translate-x-1" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="miter"
                        strokeWidth={1.5}
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="md:hidden col-span-12 px-0 pb-6">
                <p className="text-[0.9rem] leading-[1.65] text-ink-700 font-light pl-[calc(2/12*100%)]">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal-up mt-12 flex items-start gap-4 max-w-[60ch]">
          <span className="folio mt-1 shrink-0">NOTE</span>
          <p className="text-[0.85rem] leading-[1.7] text-ink-600 font-light">
            All services are held under HIPAA-aligned privacy protocols. Sliding-scale
            and pro-bono hours are reserved each month — request through the contact
            form and our intake team will respond within two working days.
          </p>
        </div>
      </div>
    </section>
  );
}
