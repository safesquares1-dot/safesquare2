"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/interactive/Magnetic";
import { useSpotlight } from "@/components/interactive/useSpotlight";

gsap.registerPlugin(ScrollTrigger);

const channels = [
  {
    label: "Visit",
    value: "AC 10, Block 4\nClifton, Karachi",
    mono: "GPS 24.8138° N, 67.0299° E",
  },
  {
    label: "Telephone",
    value: "+92 300 1437360",
    mono: "MON–SAT · 09:00–18:00 PKT",
  },
  {
    label: "Correspondence",
    value: "safesquarepk@gmail.com",
    mono: "Response within 24 hours",
  },
  {
    label: "Hours",
    value: "Mon–Fri 08:00–20:00\nSat 09:00–17:00",
    mono: "Sunday by appointment",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useSpotlight(sectionRef, ".channel-card", { tilt: 2, lift: 4 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll(".reveal-up") ?? [];
      reveals.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Form field focus micro-animations
      const fields =
        formRef.current?.querySelectorAll<HTMLElement>(".field-wrap") ?? [];
      const cleanups: Array<() => void> = [];

      fields.forEach((wrap) => {
        const underline = wrap.querySelector(".field-underline");
        const label = wrap.querySelector(".field-label");
        const input = wrap.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          "input, textarea"
        );
        if (!input || !underline) return;

        gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });

        const onFocus = () => {
          gsap.to(underline, { scaleX: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(label, { color: "#B8512E", x: 2, duration: 0.35, ease: "power3" });
        };
        const onBlur = () => {
          if (input.value.trim() === "") {
            gsap.to(underline, {
              scaleX: 0,
              duration: 0.5,
              ease: "power3.in",
              transformOrigin: "right center",
              onComplete: () =>
                gsap.set(underline, { transformOrigin: "left center" }),
            });
          }
          gsap.to(label, { color: "#6F6A60", x: 0, duration: 0.35, ease: "power3" });
        };

        input.addEventListener("focus", onFocus);
        input.addEventListener("blur", onBlur);
        cleanups.push(() => {
          input.removeEventListener("focus", onFocus);
          input.removeEventListener("blur", onBlur);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative paper bg-ivory-100 py-28 md:py-36"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Title spread */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 mb-20 md:mb-24">
          <div className="col-span-12 lg:col-span-2 reveal-up">
            <div className="kicker mb-4">Correspondence</div>
            <span className="folio">PG. 84</span>
          </div>

          <div className="col-span-12 lg:col-span-7 reveal-up">
            <h2 className="font-display text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-light text-ink-900 leading-[0.92] tracking-[-0.03em]">
              Write to us.
              <br />
              <span className="italic text-clay-600">We will write back.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-ink-200 reveal-up mt-8 lg:mt-0">
            <p className="text-[0.95rem] leading-[1.7] text-ink-700 font-light">
              For appointments, second opinions, supervisory queries, or simply
              to begin a conversation. Replies are signed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10">
          {/* Channels */}
          <aside className="col-span-12 lg:col-span-4 reveal-up">
            <div className="border-t border-ink-900">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="channel-card spotlight border-b border-ink-200 py-7 px-3 -mx-3"
                  data-cursor="label"
                  data-cursor-text={c.label}
                >
                  <div className="kicker mb-3">{c.label}</div>
                  <p className="font-display italic text-[1.5rem] font-light text-ink-900 leading-[1.15] whitespace-pre-line">
                    {c.value}
                  </p>
                  <div className="mt-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-500">
                    {c.mono}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="col-span-12 lg:col-span-8 mt-12 lg:mt-0"
          >
            <div className="reveal-up border border-ink-900 p-8 md:p-12 bg-ivory-50">
              <div className="flex items-center justify-between mb-10">
                <span className="kicker">Open Letter</span>
                <span className="folio">Form №&nbsp;01</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
                <Field
                  label="Full Name"
                  required
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="A. N. Other"
                />
                <Field
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  placeholder="you@elsewhere.com"
                />
                <Field
                  label="Telephone"
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  placeholder="+92 ___ _______"
                />

                <div>
                  <label className="field-label block font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink-500 mb-3">
                    Writing as
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "patient", label: "A patient" },
                      { id: "practitioner", label: "A practitioner" },
                      { id: "other", label: "Other" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: opt.id })}
                        data-cursor="label"
                        data-cursor-text={opt.label}
                        className={`px-4 py-2 text-[0.78rem] tracking-tight border transition-all duration-300 ${
                          formData.role === opt.id
                            ? "bg-ink-900 text-ivory-50 border-ink-900"
                            : "bg-transparent text-ink-700 border-ink-300 hover:border-ink-900"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-10 field-wrap relative">
                <label
                  htmlFor="message"
                  className="field-label block font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink-500 mb-3"
                >
                  Your Letter
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Begin where you are…"
                    data-cursor="form"
                    className="w-full resize-none border-b border-ink-300 text-[1.05rem] font-light leading-relaxed bg-transparent py-3 outline-none"
                  />
                  <span className="field-underline absolute left-0 right-0 bottom-0 h-[2px] bg-clay-600 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <p className="text-[0.78rem] text-ink-500 font-light max-w-[44ch]">
                  By writing you consent to be replied to by a member of our intake
                  team. We do not share correspondence.
                </p>
                <Magnetic strength={0.35}>
                  <button
                    type="submit"
                    className="btn-clay shrink-0"
                    disabled={submitted}
                    data-cursor="label"
                    data-cursor-text={submitted ? "Sent ✓" : "Send →"}
                  >
                    {submitted ? (
                      <>
                        Sent — thank you
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12l5 5L20 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Send Letter
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="field-wrap">
      <label className="field-label block font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink-500 mb-3">
        {label}
        {required && <span className="text-clay-600">&nbsp;*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-cursor="form"
          className="w-full border-0 border-b border-ink-300 text-[1rem] font-light bg-transparent py-2 outline-none"
        />
        <span className="field-underline absolute left-0 right-0 bottom-0 h-[2px] bg-clay-600 pointer-events-none" />
      </div>
    </div>
  );
}
