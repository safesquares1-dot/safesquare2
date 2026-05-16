"use client";

import Services from "@/components/Services";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useSpotlight } from "@/components/interactive/useSpotlight";
import { useImageReveal } from "@/components/interactive/useImageReveal";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { step: "01", title: "Letter", desc: "Write to us, or use the form. A senior member of the intake team replies — by name — within two working days." },
  { step: "02", title: "Intake", desc: "A 25-minute call to understand what you are coming for and to suggest a practitioner whose discipline fits. No cost, no commitment." },
  { step: "03", title: "First Session", desc: "Held in-person at Clifton or by encrypted telehealth. Fifty minutes. We give you the room and we leave you to use it." },
  { step: "04", title: "Continuity", desc: "If we are useful, you continue. Sessions are booked in series of six. Notes are yours to take, or to leave entirely behind." },
];

const practitioners = [
  { name: "Dr. Ayesha Khan", specialty: "Clinical Psychologist", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=750&fit=crop&q=80", bio: "Cognitive-behavioural therapy. Anxiety and high-functioning depression. Member since 2017." },
  { name: "Dr. Ahmed Hassan", specialty: "Consultant Psychiatrist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=750&fit=crop&q=80", bio: "Medication review and integrative psychiatric care. Particular interest in mood disorders. 14 years in practice." },
  { name: "Dr. Fatima Riaz", specialty: "Family Therapist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=600&h=750&fit=crop&q=80", bio: "Couples and family systems work. Trained at the Tavistock. Operates a sliding-scale clinic monthly." },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLElement>(null);

  useSpotlight(pageRef, ".practitioner-card", { tilt: 3, lift: 8 });
  useImageReveal(pageRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Process step rows — hover slide
      const rows = pageRef.current?.querySelectorAll<HTMLElement>(".process-row") ?? [];
      const cleanups: Array<() => void> = [];

      rows.forEach((row) => {
        const fill = row.querySelector(".process-fill");
        const step = row.querySelector(".process-step");
        const title = row.querySelector(".process-title");

        gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });

        const enter = () => {
          gsap.to(fill, { scaleX: 1, duration: 0.65, ease: "power3.out" });
          gsap.to(step, { x: 8, duration: 0.45, ease: "power3.out" });
          gsap.to(title, { x: 12, color: "#B8512E", duration: 0.5, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(fill, {
            scaleX: 0,
            duration: 0.5,
            ease: "power3.in",
            transformOrigin: "right center",
            onComplete: () => gsap.set(fill, { transformOrigin: "left center" }),
          });
          gsap.to(step, { x: 0, duration: 0.45, ease: "power3.out" });
          gsap.to(title, { x: 0, color: "#0F0E0C", duration: 0.5, ease: "power3.out" });
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
              <span className="folio">№ 003</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">The Practice</span>
            </div>
            <div className="hidden lg:flex col-span-6 justify-center"><span className="folio">SIX · ROOMS · SIX · CONVERSATIONS</span></div>
            <div className="col-span-6 lg:col-span-3 flex justify-end items-center gap-3">
              <span className="folio">CHAPTER · III</span>
              <span className="h-px w-8 bg-ink-900" />
              <span className="folio">PG. 32</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 pt-16">
            <div className="col-span-12 lg:col-span-2"><div className="kicker mb-4">Services</div></div>
            <div className="col-span-12 lg:col-span-10">
              <h1 className="font-display text-[3.4rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-light text-ink-900 leading-[0.92] tracking-[-0.035em]">
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">What we hold</span></span>
                <span className="hero-line block overflow-hidden"><span className="hero-inner block">space <span className="italic text-clay-600">for</span><span className="text-clay-600">.</span></span></span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mt-16">
            <div className="col-span-12 lg:col-span-7 lg:col-start-3 reveal-up">
              <p className="dropcap text-[1.1rem] leading-[1.75] text-ink-700 font-light max-w-[64ch]">
                Each service is a deliberate room. Six in total, plus a programme
                wing for cohort work and a consulting arrangement for organisations.
                Below is the full account. If your question is not here, it has not
                been answered — please write and ask.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Services />

      {/* PROCESS */}
      <section className="paper bg-ivory-50 py-24 md:py-32 border-y border-ink-900">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16 grid grid-cols-12 gap-x-6 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="kicker mb-4">From Letter to First Session</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                <span className="italic">Four steps,</span>
                <br />
                in plain English.
              </h2>
            </div>
          </div>

          <ol className="border-t border-ink-900">
            {processSteps.map((s) => (
              <li key={s.step} className="reveal-up border-b border-ink-200">
                <div
                  className="process-row relative grid grid-cols-12 gap-x-4 lg:gap-x-10 py-8 md:py-12 items-baseline"
                  data-cursor="label"
                  data-cursor-text={s.title}
                >
                  <span
                    aria-hidden
                    className="process-fill absolute inset-0 bg-clay-100/60 -z-0"
                  />
                  <div className="col-span-3 md:col-span-2 relative z-10">
                    <span className="process-step inline-block numeral text-[2.5rem] md:text-[4rem] tabular-nums text-clay-600">
                      {s.step}
                    </span>
                  </div>
                  <div className="col-span-9 md:col-span-3 relative z-10">
                    <h3 className="process-title font-display italic text-[1.85rem] md:text-[2.4rem] font-light text-ink-900 leading-[1.05]">
                      {s.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7 mt-4 md:mt-0 relative z-10">
                    <p className="text-[1rem] leading-[1.7] text-ink-700 font-light max-w-[52ch]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRACTITIONERS */}
      <section className="paper bg-ivory-100 py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-16 grid grid-cols-12 gap-x-6 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="kicker mb-4">Featured Practitioners</div>
              <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light text-ink-900 leading-[0.95] tracking-[-0.03em]">
                Three of the
                <br />
                <span className="italic text-clay-600">fifty.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pl-6 lg:border-l lg:border-ink-200 mt-8 lg:mt-0">
              <p className="text-[0.95rem] leading-[1.7] text-ink-700 font-light">
                A short selection from the practice. The full register is shared
                privately during intake — we match practitioner to person, not the
                other way around.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border border-ink-200">
            {practitioners.map((p) => (
              <article
                key={p.name}
                className="practitioner-card spotlight reveal-up bg-ivory-50 group"
                data-cursor="view"
                data-cursor-text={p.name}
              >
                <div className="img-reveal img-zoom editorial-image aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-clay-600 mb-3">
                    {p.specialty}
                  </div>
                  <h3 className="font-display italic text-[1.85rem] md:text-[2.1rem] font-light text-ink-900 leading-[1.05] mb-4">
                    {p.name}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.65] text-ink-700 font-light">
                    {p.bio}
                  </p>
                </div>
              </article>
            ))}
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
                Book a <span className="italic">first</span>
                <br />
                <span className="italic text-clay-400">session</span>.
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 flex flex-col gap-4 reveal-up">
              <Magnetic strength={0.35}>
                <Link href="/contact" className="btn-clay" data-cursor="label" data-cursor-text="Book →">Request a Session<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/practitioners" className="btn-ghost border-ivory-100 text-ivory-100" data-cursor="label" data-cursor-text="Meet →">Meet the Practitioners<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
