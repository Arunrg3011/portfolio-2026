"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SECTION, COUNTRIES as COUNTRY_LIST } from "@/app/contact/content";
import { useGeoDialCode } from "@/hooks/useGeoDialCode";
import GradientBlinds from "@/components/GradientBlinds";

const BLINDS_GRADIENT_COLORS = ['#000000', '#ff6b1a', '#111111'];

const boxInput =
  "cp-field w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff6b1a]/60 transition-colors duration-300 text-sm";

export default function ContactPage() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", contact: "", reason: "" });
  const [contactType, setContactType] = useState("phone");
  const [selectedCC, setSelectedCC] = useState(COUNTRY_LIST[0]);
  const [showCCPicker, setShowCCPicker] = useState(false);
  const geoCode = useGeoDialCode();
  useEffect(() => { if (geoCode) setSelectedCC(geoCode); }, [geoCode]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactChange = (e) => {
    setForm({ ...form, contact: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value.replace(/\D/g, ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myWhatsApp = "917604847895";
    const myEmail = "rgarun111@gmail.com";

    if (contactType === "phone") {
      const fullNumber = phoneNumber ? `+${selectedCC.code} ${phoneNumber}` : "(via WhatsApp)";
      const msg = encodeURIComponent(
        `Hi Arun! My name is ${form.name}.\n\nMessage: ${form.reason}\n\nMy contact: ${fullNumber}`
      );
      window.open(`https://wa.me/${myWhatsApp}?text=${msg}`, "_blank");
      setStatus("sent");
      return;
    }

    // Email path: open Gmail directly with prefilled message
    const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Arun,\n\n${form.reason}\n\n— From: ${form.name}\nEmail: ${form.contact}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`, "_blank");
    setStatus("sent");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-label",   { y: 15, opacity: 0, duration: 0.3 });
      gsap.from(".cp-heading", { y: 25, opacity: 0, duration: 0.4, ease: "power3.out", delay: 0.05 });
      gsap.from(".cp-field",   { y: 15, opacity: 0, stagger: 0.05, duration: 0.35, delay: 0.1 });
      gsap.from(".cp-btn",     { y: 10, opacity: 0, duration: 0.3, delay: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-24 md:pt-20 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <GradientBlinds
          gradientColors={BLINDS_GRADIENT_COLORS}
          angle={45}
          noise={0.2}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.7}
          spotlightSoftness={1.5}
          spotlightOpacity={0.6}
          mixBlendMode="screen"
        />
      </div>

      <p className="cp-label relative z-10 text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-8 md:mb-12 font-semibold">
        {SECTION.label}
      </p>

      {/* Heading — shown on mobile at top, hidden on desktop (shown at right) */}
      <div className="md:hidden mb-8 relative z-10">
        <h1
          className="cp-heading font-black tracking-tighter leading-[0.88]"
          style={{ fontSize: "clamp(2.8rem, 12vw, 4rem)" }}
        >
          <span className="block text-white">Let's build</span>
          <span className="block text-white">something</span>
          <span className="block ghost-orange">cool.</span>
        </h1>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-0 w-full max-w-7xl min-h-[65vh]">

        {/* LEFT — Form */}
        <div className="w-full md:w-[42%] pr-0 md:pr-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form">

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase">Name</span>
              <input
                suppressHydrationWarning
                className={boxInput}
                type="text"
                placeholder="Your full name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Phone Field with Country Code Picker (WhatsApp) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-[#25D366] tracking-[0.3em] uppercase font-semibold">Phone (WhatsApp)</span>
              <div className="flex gap-2">
                <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCCPicker(!showCCPicker)}
                      className="flex items-center gap-1.5 h-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white hover:border-[#25D366]/40 transition-colors duration-200 whitespace-nowrap"
                    >
                      <span>{selectedCC.flag}</span>
                      <span className="text-white/60">+{selectedCC.code}</span>
                      <span className="text-white/30 text-xs">›</span>
                    </button>
                    {showCCPicker && (
                      <div className="absolute z-50 top-full left-0 mt-1 w-56 bg-[#111] border border-white/10 rounded-xl overflow-y-auto max-h-56 shadow-2xl custom-scroll">
                        {COUNTRY_LIST.map((c) => (
                          <button
                            key={c.code + c.name}
                            type="button"
                            onClick={() => { setSelectedCC(c); setShowCCPicker(false); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-left ${
                              selectedCC.code === c.code && selectedCC.name === c.name ? "text-[#25D366]" : "text-white/70"
                            }`}
                          >
                            <span>{c.flag}</span>
                            <span className="flex-1">{c.name}</span>
                            <span className="text-white/30 text-xs">+{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    suppressHydrationWarning
                    className={boxInput}
                    type="tel"
                    placeholder="Your number (optional)"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase">Reason</span>
              <textarea
                suppressHydrationWarning
                className={boxInput + " resize-none"}
                rows={4}
                placeholder="Tell me what you're working on…"
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
            )}

            {status === "sent" ? (
              <div className="flex flex-col gap-2">
                <p className="cp-btn text-[#25D366] text-sm uppercase tracking-widest font-bold">
                  ✓ Message opened in WhatsApp!
                </p>
                <button
                  type="button"
                  onClick={() => { setStatus("idle"); setForm({ name: "", contact: "", reason: "" }); setPhoneNumber(""); }}
                  className="text-xs text-white/50 hover:text-white underline self-start cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <button
                suppressHydrationWarning
                type="submit"
                className="cp-btn w-full font-bold py-4 rounded-full text-sm uppercase tracking-widest transition-colors duration-300 bg-[#25D366] text-black hover:bg-[#1ebe5d]"
              >
                Send on WhatsApp →
              </button>
            )}
          </form>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-px self-stretch bg-white/10 mx-8" />

        {/* RIGHT — heading (desktop only) */}
        <div className="hidden md:flex w-full md:w-[58%] pl-0 md:pl-6 mt-16 md:mt-0 flex-col justify-end text-right">
          <h1
            className="cp-heading font-black tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 6rem)" }}
          >
            <span className="block text-white">Have an idea</span>
            <span className="block text-white">worth</span>
            <span className="block ghost-orange">building?</span>
          </h1>
          <p className="cp-label mt-6 text-white/50 text-sm md:text-base font-light leading-relaxed text-right max-w-lg ml-auto">
            I'm interested in meaningful projects, AI-powered products, creative engineering, and opportunities to learn by building.
          </p>

          <div className="flex flex-wrap gap-3 justify-end mt-8">
            <a
              href="https://linkedin.com/in/arunrg3011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-[#ff6b1a] hover:text-black hover:border-[#ff6b1a] text-white/80 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Arunrg3011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black hover:border-white text-white/80 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              GitHub ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
