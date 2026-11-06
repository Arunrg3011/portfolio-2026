"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPopup from "./ContactPopup";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

let hasNavLoaded = false;

export default function Navbar() {
  const navRef    = useRef(null);
  const menuRef   = useRef(null);
  const pathname  = usePathname();
  const router    = useRouter();
  const [open, setOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState(null);

  const handleWarmup = (href) => {
    try {
      router.prefetch(href);
      if (href === "/projects") {
        import("@/views/projects");
        import("@/components/CircularGallery/CircularGallery");
      } else if (href === "/about") {
        import("@/views/about");
      } else if (href === "/contact") {
        import("@/views/contact");
      }
    } catch {}
  };

  // Idle background pre-warming of subpage chunks
  useEffect(() => {
    const prewarmAll = () => {
      try {
        router.prefetch("/projects");
        router.prefetch("/about");
        router.prefetch("/contact");
        import("@/views/projects");
        import("@/views/about");
        import("@/views/contact");
        import("@/components/CircularGallery/CircularGallery");
      } catch {}
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(prewarmAll, { timeout: 2000 });
        return () => window.cancelIdleCallback?.(id);
      } else {
        const timer = setTimeout(prewarmAll, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [router]);

  // Close menu and clear navigating state on route change
  useEffect(() => { 
    setOpen(false); 
    setNavigatingTo(null);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Initial nav fade-in animation (only on first full load)
  useEffect(() => {
    if (hasNavLoaded) {
      if (navRef.current) gsap.set(navRef.current, { y: 0, opacity: 1 });
      return;
    }
    hasNavLoaded = true;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".mobile-nav-link",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [open]);

  const getBackLink = (path) => {
    if (path?.startsWith("/project/")) return "/projects";
    if (path?.startsWith("/blog/")) return "/blog";
    return "/";
  };

  const getBackLabel = (path) => {
    if (path?.startsWith("/project/")) return "Works";
    if (path?.startsWith("/blog/")) return "Blog";
    return "Back";
  };

  return (
    <>
      {navigatingTo && (
        <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#ff6b1a] via-[#ff9d42] to-[#ff6b1a] z-[9999] animate-pulse pointer-events-none shadow-sm shadow-[#ff6b1a]/50" />
      )}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 md:px-20 py-7 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Logo + back */}
        <div className="relative z-10 flex items-center gap-5">
          {pathname !== "/" && (
            <Link href={getBackLink(pathname)} className="flex items-center gap-2 text-white/40 hover:text-[#ff6b1a] transition-colors duration-300 group cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium">{getBackLabel(pathname)}</span>
            </Link>
          )}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity duration-300 cursor-pointer">
            <div className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b1a] to-[#ff9d42] flex items-center justify-center text-black font-black text-xs tracking-tighter shadow-md shadow-[#ff6b1a]/20 group-hover:scale-105 transition-transform">
                AR
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-black tracking-tight text-white text-sm group-hover:text-[#ff6b1a] transition-colors leading-none">
                  ARUN<span className="text-[#ff6b1a]">.</span>
                </span>
                <span className="text-[7.5px] font-mono text-white/40 tracking-[0.25em] uppercase mt-0.5">
                  AI · Full-Stack
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop links */}
        <ul className="relative z-10 hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] font-medium">
          {LINKS.map((item) => {
            const isPending = navigatingTo === item.href;
            const active = isPending || pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  prefetch={true}
                  onMouseEnter={() => handleWarmup(item.href)}
                  onPointerDown={() => handleWarmup(item.href)}
                  onClick={() => {
                    if (pathname !== item.href) setNavigatingTo(item.href);
                  }}
                  className={`px-4 py-2 transition-all duration-300 block cursor-pointer select-none rounded-md ${
                    active ? "text-[#ff6b1a] font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <button 
              type="button"
              suppressHydrationWarning
              onClick={() => setIsContactOpen(true)}
              className="px-5 py-2 bg-[#ff6b1a] text-black font-bold rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 cursor-pointer shadow-md shadow-[#ff6b1a]/20 select-none"
            >
              Connect
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setOpen(v => !v)}
          className="relative md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] z-[60] cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7.5px]" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col justify-center items-start px-10 md:hidden"
        >
          <ul className="flex flex-col gap-8 w-full">
            {LINKS.map((item) => {
              const isPending = navigatingTo === item.href;
              const active = isPending || pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.label} className="mobile-nav-link">
                  <Link
                    href={item.href}
                    prefetch={true}
                    onTouchStart={() => handleWarmup(item.href)}
                    onPointerDown={() => handleWarmup(item.href)}
                    onClick={() => {
                      setOpen(false);
                      if (pathname !== item.href) setNavigatingTo(item.href);
                    }}
                    className={`block text-4xl font-black tracking-tighter transition-colors duration-300 cursor-pointer ${
                      active ? "text-[#ff6b1a]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mobile-nav-link mt-4 pt-4 border-t border-white/10 flex flex-col gap-6">
               <button 
                 type="button"
                 suppressHydrationWarning
                 onClick={() => {
                   setOpen(false);
                   setIsContactOpen(true);
                 }}
                 className="w-full py-4 bg-[#ff6b1a] text-black text-xl font-bold tracking-tight rounded-2xl hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
               >
                 Connect
               </button>
            </li>
          </ul>
          <div className="mobile-nav-link mt-16 text-[10px] text-white/20 tracking-[0.4em] uppercase">
            Arun R. G. · Portfolio
          </div>
        </div>
      )}
      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

