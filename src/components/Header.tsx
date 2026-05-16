"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const ISSUE_LABEL = "VOL. XII / KARACHI EDITION";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        navRef.current?.children ?? [],
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.35 }
      );
    }, headerRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Index", number: "01" },
    { href: "/about", label: "About", number: "02" },
    { href: "/services", label: "Practice", number: "03" },
    { href: "/practitioners", label: "Practitioners", number: "04" },
    { href: "/contact", label: "Visit", number: "05" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        isScrolled
          ? "bg-ivory-100/92 backdrop-blur-md border-b border-ink-900"
          : "bg-ivory-100 border-b border-ink-900"
      }`}
    >
      {/* Top rule — date + edition */}
      <div className="border-b border-ink-200">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 flex items-center justify-between h-7">
          <span className="folio">{ISSUE_LABEL}</span>
          <span className="folio hidden sm:inline">
            EST. 2012 · CLIFTON · BLOCK 4
          </span>
          <span className="folio">+92 300 1437360</span>
        </div>
      </div>

      <nav className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[60px]">
          {/* Wordmark */}
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display italic font-light text-[2rem] leading-none tracking-[-0.04em] text-ink-900">
              Safesquare
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-clay-600 mb-1 group-hover:bg-ink-900 transition-colors duration-400" />
          </Link>

          {/* Desktop nav */}
          <div ref={navRef} className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative flex items-baseline gap-1.5 py-1.5"
                >
                  <span className="font-mono text-[0.625rem] text-ink-400 tracking-[0.2em] tabular-nums">
                    {link.number}
                  </span>
                  <span
                    className={`text-[0.875rem] tracking-tight transition-colors duration-300 ${
                      active ? "text-clay-600" : "text-ink-900 group-hover:text-clay-600"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-clay-600 transition-all duration-500 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact" className="btn-ink py-3 px-5 text-[0.6875rem]">
              <span className="flex items-center gap-2.5">
                Request a Session
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-px bg-ink-900 transition-all duration-400 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink-900 transition-all duration-400 ${
                isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink-900 transition-all duration-400 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-ivory-100 border-t border-ink-900 overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-editorial)] ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8">
          <div className="kicker mb-6">Contents</div>
          <ul className="divide-y divide-ink-200 border-t border-b border-ink-200 mb-8">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.625rem] text-ink-400 tracking-[0.2em] tabular-nums">
                        {link.number}
                      </span>
                      <span
                        className={`font-display italic font-light text-[1.75rem] leading-none ${
                          active ? "text-clay-600" : "text-ink-900"
                        }`}
                      >
                        {link.label}
                      </span>
                    </span>
                    <svg
                      className="w-4 h-4 text-ink-900 group-hover:text-clay-600 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/contact" onClick={closeMobile} className="btn-clay w-full py-4">
            Request a Session
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
