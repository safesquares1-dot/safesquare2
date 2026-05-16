"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Magnetic from "@/components/interactive/Magnetic";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".nf-num .nf-inner",
        { y: "108%" },
        { y: "0%", duration: 1.05, stagger: 0.1, ease: "power4.out" }
      )
        .fromTo(
          ".nf-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, transformOrigin: "left center" },
          "-=0.6"
        )
        .fromTo(
          ".nf-text",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          ".nf-btn",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.4"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="paper bg-ivory-100 min-h-[80vh] flex items-center"
    >
      <div className="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-24">
        {/* Top folio */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-center pb-6 border-b border-ink-900">
          <div className="col-span-6 flex items-center gap-3">
            <span className="folio">№ 404</span>
            <span className="h-px w-8 bg-ink-900" />
            <span className="folio">Page Not Found</span>
          </div>
          <div className="col-span-6 flex justify-end items-center gap-3">
            <span className="folio">RETURN</span>
            <span className="h-px w-8 bg-ink-900" />
            <span className="folio">HOME</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mt-16 md:mt-24 items-end">
          <div className="col-span-12 lg:col-span-7">
            <h1
              aria-label="404"
              className="nf-num font-display font-light italic text-[10rem] md:text-[16rem] lg:text-[20rem] leading-[0.85] text-clay-600 tracking-[-0.05em]"
            >
              <span className="block overflow-hidden">
                <span className="nf-inner block">404</span>
              </span>
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-5 mt-10 lg:mt-0">
            <div className="kicker mb-5 nf-text">Editor&apos;s Note</div>
            <h2 className="nf-text font-display text-[2rem] md:text-[2.75rem] font-light leading-[1.05] text-ink-900 tracking-[-0.02em] mb-6">
              The page you were
              <br />
              <span className="italic text-clay-600">looking for</span>
              <br />
              has been mislaid.
            </h2>
            <div className="nf-rule h-px bg-ink-900 my-8 origin-left" />
            <p className="nf-text text-[1rem] leading-[1.7] text-ink-700 font-light max-w-[44ch] mb-10">
              It may have been moved during a recent re-edit, or it may never have
              existed at all. Either way — let us return you to a known address.
            </p>

            <div className="flex flex-wrap gap-4">
              <Magnetic strength={0.4}>
                <Link href="/" className="nf-btn btn-clay" data-cursor="label" data-cursor-text="Home →">
                  Return to Index
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link href="/contact" className="nf-btn btn-ghost" data-cursor="label" data-cursor-text="Write →">
                  Write to Us
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
