"use client";

import Contact from "@/components/Contact";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroEls = heroRef.current?.children ? Array.from(heroRef.current.children) : [];
      gsap.fromTo(heroEls,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // FAQ items
      const faqItems = faqRef.current?.querySelectorAll(".faq-item") ?? [];
      gsap.fromTo(faqItems,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 75%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    { q: "How do I book an appointment?", a: "You can book online through our portal, call our front desk, or request an appointment via our contact form. We offer same-day and next-day appointments when available." },
    { q: "What insurance do you accept?", a: "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, Medicare, and Medicaid. Contact our billing department to verify your coverage." },
    { q: "Do you offer telehealth sessions?", a: "Yes, we offer secure video sessions for most services. You'll receive a link to join your session 15 minutes before your scheduled time." },
    { q: "What are your hours of operation?", a: "Monday-Friday: 8:00 AM - 8:00 PM, Saturday: 9:00 AM - 5:00 PM, Sunday: Emergency services only." },
    { q: "How do I access my medical records?", a: "You can request your records through our patient portal or by submitting a written request. HIPAA-compliant processes ensure your privacy." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-neon-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl" />
        <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact Us</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-[0.9]">
            Get in <span className="text-electric-500">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
            Questions about our practitioner platform or ready to book with one of our professionals? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Component */}
      <Contact />

      {/* FAQ Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 stripe-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 blur-3xl" />
        <div ref={faqRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 rounded-full mb-6 shadow-sharp">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Questions</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Frequently Asked <span className="text-violet-500">Questions</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Quick answers to common questions about our services, policies, and procedures.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                const colors = ["electric", "neon", "violet", "coral", "electric"];
                const colorClasses: Record<string, string> = {
                  electric: "bg-electric-500",
                  neon: "bg-neon-500",
                  violet: "bg-violet-500",
                  coral: "bg-coral-500",
                };
                return (
                  <div
                    key={i}
                    className="faq-item bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-900 shadow-sharp hover:shadow-sharp-lg transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-6 flex items-start justify-between gap-4 text-left group"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-10 h-10 ${colorClasses[colors[i]]} text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sharp font-bold`}>
                          {i + 1}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg pt-1 group-hover:text-electric-600 transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 pl-20">
                        <div className={`w-full h-px ${colorClasses[colors[i]]} mb-4`} />
                        <p className="text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <p className="text-slate-600 mb-6 text-lg font-medium">Have more questions?</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-lg shadow-sharp hover:shadow-sharp-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <span>Contact Us Directly</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
