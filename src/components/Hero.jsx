"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label flickers in fast
      gsap.from(".hero-label", { y: 14, opacity: 0, duration: 0.45, ease: "power2.out", delay: 0.15 });

      // "Hey, I'm" slides up
      gsap.from(".hero-line",  { y: 60, opacity: 0, stagger: 0.08, duration: 0.75, ease: "power4.out", delay: 0.25 });

      // "Arun." — fast snap per letter, slight 3-D tilt
      gsap.from(".hero-letter", {
        y: 80,
        opacity: 0,
        rotateX: -30,
        stagger: 0.045,
        duration: 0.75,
        ease: "expo.out",
        delay: 0.35,
      });

      // Tagline + sub-copy slides up together
      gsap.from(".hero-sub",   { y: 18, opacity: 0, duration: 0.5, ease: "power3.out", delay: 0.6 });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 60%",
          end:   "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[135vh] flex flex-col justify-center px-6 sm:px-10 md:px-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl">
        <p className="hero-label text-[10px] md:text-xs text-[#ff6b1a] tracking-[0.25em] uppercase font-bold mb-6">
          AI Engineer · Full-Stack Developer
        </p>

        <h1
          className="font-black tracking-tighter leading-[0.75] mb-8 flex flex-col relative z-10 hero-clamp-text"
        >
          <span className="hero-line block ghost z-0">Hey, I'm</span>
          <span className="block text-white -mt-2 md:-mt-6 z-10 hero-perspective">
            {"Arun.".split("").map((char, index) => (
              <span key={index} className="hero-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <div className="max-w-xl hero-sub flex flex-col gap-5">
          <p className="text-lg md:text-2xl font-bold text-white/90 tracking-tight leading-snug">
            I build <span className="text-[#ff6b1a]">intelligent products</span> and digital experiences.
          </p>

          <BlurText
            text="I turn ideas into *practical software* by combining *artificial intelligence*, *full-stack engineering*, and *thoughtful design*. Focused on building high-performance architectures, intelligent tools, and *immersive interactive web experiences*."
            delay={30}
            animateBy="words"
            direction="bottom"
            stepDuration={0.22}
            animateOnMount={true}
            className="text-sm md:text-base text-white/60 font-light leading-relaxed"
          />

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button
              onClick={() => scrollTo("work-section")}
              className="px-6 py-3 bg-[#ff6b1a] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#ff6b1a]/20 cursor-pointer"
            >
              Explore My Work ↓
            </button>
            <button
              onClick={() => scrollTo("contact-section")}
              className="px-6 py-3 border border-white/20 text-white/80 text-xs font-medium uppercase tracking-widest rounded-full hover:border-[#ff6b1a] hover:text-[#ff6b1a] transition-all duration-300 cursor-pointer"
            >
              Let's Connect →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
