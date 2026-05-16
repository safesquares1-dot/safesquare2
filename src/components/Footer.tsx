"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTime(fmt.format(new Date()));
      } catch {
        setTime("");
      }
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll(".reveal-up") ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
        }
      );

      // Oversized wordmark — slow horizontal drift on scroll
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Footer link hover — animated dash beside the label
      const links =
        footerRef.current?.querySelectorAll<HTMLAnchorElement>(".footer-link") ?? [];
      const cleanups: Array<() => void> = [];

      links.forEach((link) => {
        const dash = link.querySelector(".footer-dash");
        gsap.set(dash, { scaleX: 0, transformOrigin: "left center" });

        const enter = () => {
          gsap.to(link, { x: 6, color: "#D88B6B", duration: 0.4, ease: "power3.out" });
          gsap.to(dash, { scaleX: 1, duration: 0.45, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(link, { x: 0, color: "#D4CFC0", duration: 0.4, ease: "power3.out" });
          gsap.to(dash, {
            scaleX: 0,
            duration: 0.4,
            ease: "power3.in",
            transformOrigin: "right center",
            onComplete: () => gsap.set(dash, { transformOrigin: "left center" }),
          });
        };

        link.addEventListener("pointerenter", enter);
        link.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          link.removeEventListener("pointerenter", enter);
          link.removeEventListener("pointerleave", leave);
        });
      });

      // Social tiles — magnetic-style lift
      const socials =
        footerRef.current?.querySelectorAll<HTMLAnchorElement>(".social-tile") ?? [];
      socials.forEach((tile) => {
        const enter = () => {
          gsap.to(tile, {
            y: -4,
            backgroundColor: "rgba(216, 139, 107, 0.12)",
            borderColor: "#D88B6B",
            color: "#D88B6B",
            duration: 0.4,
            ease: "power3.out",
          });
        };
        const leave = () => {
          gsap.to(tile, {
            y: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#3A3A36",
            color: "#D4CFC0",
            duration: 0.45,
            ease: "power3.out",
          });
        };
        tile.addEventListener("pointerenter", enter);
        tile.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          tile.removeEventListener("pointerenter", enter);
          tile.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative bg-ink-900 text-ivory-100 paper section-dark"
    >
      {/* Top rule */}
      <div className="border-t border-clay-600" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        {/* Editorial sign-off */}
        <div className="reveal-up grid grid-cols-12 gap-x-6 lg:gap-x-10 pb-16 border-b border-ink-700">
          <div className="col-span-12 lg:col-span-7">
            <div className="kicker mb-6 text-clay-400">Colophon</div>
            <h3 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-light leading-[0.95] tracking-[-0.03em] text-ivory-50">
              Safesquare —
              <br />
              <span className="italic">a quiet place,</span>
              <br />
              for considered <span className="italic text-clay-400">care</span>.
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-end mt-10 lg:mt-0">
            <p className="text-[0.95rem] leading-[1.7] text-ink-300 font-light max-w-[36ch]">
              An environment, place, and platform for mental-health practitioners
              and the people they serve. Privately operated. Quietly run.
            </p>
            <Link
              href="/contact"
              className="link-underline text-[0.85rem] mt-6 self-start text-ivory-50"
              data-cursor="label"
              data-cursor-text="Write →"
            >
              Begin a conversation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Index */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 py-16 border-b border-ink-700">
          <Column title="Contents">
            <FooterLink href="/">Index</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/services">Practice</FooterLink>
            <FooterLink href="/practitioners">Practitioners</FooterLink>
            <FooterLink href="/contact">Visit</FooterLink>
          </Column>

          <Column title="Services">
            <FooterLink href="/services">Psychological Therapy</FooterLink>
            <FooterLink href="/services">Clinical Counselling</FooterLink>
            <FooterLink href="/services">Psychiatric Consultation</FooterLink>
            <FooterLink href="/services">Mental Health Assessment</FooterLink>
            <FooterLink href="/services">Wellbeing Programmes</FooterLink>
          </Column>

          <Column title="Address">
            <p className="text-[0.9rem] leading-[1.7] text-ink-200 font-light">
              AC 10, Block 4
              <br />
              Clifton, Karachi
              <br />
              Pakistan
            </p>
            <p className="mt-4 text-[0.85rem] text-ink-300 font-mono tracking-[0.12em]">
              +92 300 1437360
              <br />
              safesquarepk@gmail.com
            </p>
          </Column>

          <Column title="Elsewhere">
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Instagram", abbr: "IG" },
                { name: "LinkedIn", abbr: "IN" },
                { name: "Twitter", abbr: "X" },
                { name: "Facebook", abbr: "FB" },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  data-cursor="label"
                  data-cursor-text={s.name}
                  className="social-tile w-10 h-10 inline-flex items-center justify-center border border-ink-700 font-mono text-[0.7rem] tracking-[0.15em] text-ink-200"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
            <div className="mt-6 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-400">
              Karachi · {time || "—:—"} PKT
            </div>
          </Column>
        </div>

        {/* Foot */}
        <div className="reveal-up flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10">
          <div className="flex items-baseline gap-3">
            <span className="font-display italic font-light text-[1.5rem] text-ivory-50">
              Safesquare
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-400">
              MMXII–{year}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-300">
            <a href="#" className="hover:text-clay-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-clay-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-clay-400 transition-colors">HIPAA Notice</a>
            <a href="#" className="hover:text-clay-400 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — masthead bottom */}
      <div className="overflow-hidden border-t border-ink-700">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-10">
          <h2
            ref={wordmarkRef}
            aria-hidden
            className="font-display italic font-light text-[18vw] leading-none tracking-[-0.05em] text-clay-600/15 select-none will-change-transform"
          >
            Safesquare
          </h2>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="reveal-up">
      <div className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-clay-400 mb-5">
        {title}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-cursor="label"
      data-cursor-text="Read →"
      className="footer-link relative inline-flex items-center gap-3 text-[0.9rem] text-ink-200 font-light w-fit"
    >
      <span className="footer-dash inline-block h-px w-4 bg-clay-400 origin-left" />
      <span>{children}</span>
    </Link>
  );
}
