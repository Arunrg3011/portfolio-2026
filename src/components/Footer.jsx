"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackClick } from "@/lib/trackClick";

const LINKS = [
  { label: "About",    href: "/about"   },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const DEFAULT_SOCIALS = [
  { label: "LinkedIn",  href: "https://linkedin.com/in/arunrg3011" },
  { label: "GitHub",    href: "https://github.com/Arunrg3011" },
  { label: "Portfolio", href: "https://portfolio-arun3011.vercel.app" },
];

const SOCIAL_KEYS = [
  { key: "linkedin",  label: "LinkedIn"  },
  { key: "github",    label: "GitHub"    },
  { key: "portfolio", label: "Portfolio" },
  { key: "twitter",   label: "X"         },
  { key: "instagram", label: "Instagram" },
];

export default function Footer() {
  const ref = useRef(null);
  const [socials, setSocials] = useState(DEFAULT_SOCIALS);

  useEffect(() => {
    fetch("/api/settings?key=social_links")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data?.value) return;
        const active = SOCIAL_KEYS.filter(s => data.value[s.key]?.trim()).map(s => ({
          label: s.label,
          href:  data.value[s.key].trim(),
        }));
        if (active.length > 0) {
          setSocials(active);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-white/8 px-10 md:px-20 py-16">

      {/* top row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">

        {/* name + tagline */}
        <div>
          <p className="text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-4 font-bold">
            AI Engineer · Full-Stack Developer
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.85]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            <span className="block text-white">Arun R. G.</span>
          </h2>
        </div>

        {/* nav + socials */}
        <div className="flex flex-col gap-8 md:items-end">
          <nav className="flex gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/40 hover:text-[#ff6b1a] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick(`social-${label.toLowerCase()}`, href)}
                className="text-white/30 hover:text-[#ff6b1a] transition-colors duration-300 flex items-center gap-1.5"
              >
                {label}
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-white/8 mb-8" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-[10px] text-white/40 tracking-wider">
          K.L.N. College of Engineering · Information Technology (2024–2028)
        </p>
        <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Arun R. G. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
