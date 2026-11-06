"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION, PROJECTS } from "@/app/work/content";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { 
            trigger: item, 
            start: "top 90%", 
            toggleActions: "play none none none" 
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 0,
        y: -40,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="work-section"
      className="relative w-full min-h-screen px-10 md:px-20 pt-48 pb-64 flex flex-col justify-center"
    >
      <div className="max-w-5xl w-full">

        {/* Section Header */}
        <div className="mb-14 md:mb-16">
          <p className="font-sans text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-4 font-medium">
            {SECTION.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="font-sans font-black tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              {SECTION.heading}
            </h2>
            <p className="text-white/40 text-sm max-w-md font-light leading-relaxed">
              Real-world systems, intelligent tools, and AI applications engineered with purpose and technical rigor.
            </p>
          </div>
        </div>

        {/* Projects Showcase List */}
        <div className="flex flex-col">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="work-item group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 md:py-12 border-b border-white/8 hover:border-white/20 transition-all duration-500"
            >
              {/* Left orange accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              {/* Number & Info */}
              <div className="flex items-start gap-6 md:gap-8 flex-1 min-w-0 pl-3">
                <span className="font-mono text-xs text-white/20 group-hover:text-[#ff6b1a] tracking-widest pt-1 transition-colors duration-300">
                  {proj.num}
                </span>

                <div className="flex-1 min-w-0 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-sans text-[9px] md:text-[10px] text-[#ff6b1a] tracking-[0.3em] uppercase font-bold">
                      {proj.category}
                    </span>
                    <span className="text-white/20 text-[10px]">·</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider bg-white/5 text-white/50 border border-white/10">
                      {proj.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl md:text-2xl font-black text-white tracking-tight mb-2.5 group-hover:text-white transition-colors duration-300">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-white/40 group-hover:text-white/70 font-light leading-relaxed max-w-2xl mb-3.5 transition-colors duration-300">
                    {proj.description}
                  </p>

                  {/* Tech stack pills */}
                  <p className="font-mono text-[10px] text-white/30 tracking-wider">
                    {proj.tech}
                  </p>
                </div>
              </div>

              {/* Action Link Buttons */}
              <div className="pl-14 md:pl-0 shrink-0 self-start md:self-center flex flex-wrap items-center gap-2.5">
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff6b1a] text-black text-[9px] uppercase tracking-widest font-bold hover:bg-[#ff8533] transition-all duration-300 shadow-sm"
                  >
                    Live Demo
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 text-white/70 text-[9px] uppercase tracking-widest hover:border-[#ff6b1a] hover:text-[#ff6b1a] hover:bg-[#ff6b1a]/10 transition-all duration-300"
                  >
                    GitHub
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </a>
                )}
                <Link
                  href={`/project/${proj.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-[9px] uppercase tracking-widest hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  Details
                  <span className="text-[10px]">→</span>
                </Link>
              </div>
            </div>
          ))}

          {/* GitHub Profile Callout */}
          <a
            href="https://github.com/Arunrg3011"
            target="_blank"
            rel="noopener noreferrer"
            className="work-item group relative flex items-center justify-between gap-8 py-8 md:py-10 border-b border-white/8 hover:border-[#ff6b1a]/30 transition-all duration-500"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="pl-3 flex items-center gap-6">
              <span className="font-mono text-xs text-white/20 group-hover:text-[#ff6b1a] transition-colors duration-300">→</span>
              <div>
                <p className="font-sans text-[10px] text-white/30 group-hover:text-[#ff6b1a] tracking-[0.3em] uppercase font-medium mb-1 transition-colors duration-300">
                  Open Source & Research Repositories
                </p>
                <h3 className="font-sans text-lg md:text-xl font-bold text-white tracking-tight">
                  Explore All 21 Repositories on GitHub (@Arunrg3011)
                </h3>
              </div>
            </div>
            <div className="text-white/30 group-hover:text-[#ff6b1a] transition-colors duration-300 pr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
