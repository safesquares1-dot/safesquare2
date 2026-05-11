"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll(".footer-col") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-500/5 blur-3xl" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-500 via-neon-500 to-violet-500" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sharp">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Safe<span className="text-electric-400">square</span>
              </h3>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-neon-500 mb-6" />
            <p className="text-slate-400 mb-8 leading-relaxed">
              A professional platform providing environment, space, and tools for mental health practitioners.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/safesquare.official/", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.783.164 5.304 1.686 5.469 5.466.057 1.257.069 1.688.069 4.948s-.012 3.691-.07 4.948c-.164 3.78-1.685 5.302-5.469 5.466-1.257.058-1.688.07-4.85.07s-3.592-.012-4.85-.07c-3.785-.164-5.306-1.686-5.47-5.466-.058-1.257-.07-1.688-.07-4.948s.012-3.691.07-4.948c.164-3.78 1.685-5.302 5.47-5.466 1.258-.058 1.689-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" },
                { href: "#", label: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 2.89h-2.796v6.988C18.343 21.128 22 16.991 22 12z" },
                { href: "#", label: "Twitter", path: "M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.174 0-.346-.012-.515A8.33 8.33 0 0022 5.555a8.123 8.123 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.198 8.198 0 01-2.6.996 4.115 4.115 0 00-7.004 3.75 11.648 11.648 0 01-8.449-4.287 4.116 4.116 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-electric-500 text-slate-400 hover:text-white shadow-sharp hover:shadow-sharp-lg hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="w-12 h-0.5 bg-electric-500 mb-6" />
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/practitioners", label: "For Practitioners" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors inline-flex items-center group font-medium">
                    <svg className="w-0 group-hover:w-4 h-4 mr-0 group-hover:mr-2 transition-all duration-300 overflow-hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wide">
              Our Services
            </h4>
            <div className="w-12 h-0.5 bg-neon-500 mb-6" />
            <ul className="space-y-3 text-slate-400">
              {["Psychological Therapy", "Counseling Services", "Psychiatric Consultation", "Mental Health Assessment", "Wellbeing Programs"].map((s) => (
                <li key={s} className="hover:text-white transition-colors cursor-default font-medium">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wide">
              Contact Info
            </h4>
            <div className="w-12 h-0.5 bg-violet-500 mb-6" />
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-electric-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed font-medium">AC 10, Block 4, Clifton, Karachi</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-neon-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">+92 300 1437360</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">safesquarepk@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 font-medium">&copy; {new Date().getFullYear()} Safesquare. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="w-px h-4 bg-slate-700" />
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
