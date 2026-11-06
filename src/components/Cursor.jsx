"use client";
import { useEffect, useRef } from "react";

/**
 * Cinematic crosshair cursor — dot + lagging ring.
 * Fixes:
 *  - dot uses a stable translate (never appended to)
 *  - scale handled via CSS scale() separate from translate
 *  - ring centers on its own midpoint by keeping a fixed offsetSize ref
 *    so size transitions don't cause position jumps
 */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -300, y: -300 });
  const lerped  = useRef({ x: -300, y: -300 });

  useEffect(() => {
    // Half-sizes (used for centering)
    const DOT_HALF  = 3;   // dot is 6px
    const RING_HALF = 16;  // ring is 32px

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // ---- Hover state via CSS classes only (no transform mutation) ----
    const addHoverClass = () => {
      if (ringRef.current) ringRef.current.classList.add("cur-ring--hover");
      if (dotRef.current)  dotRef.current.classList.add("cur-dot--hover");
    };
    const removeHoverClass = () => {
      if (ringRef.current) ringRef.current.classList.remove("cur-ring--hover");
      if (dotRef.current)  dotRef.current.classList.remove("cur-dot--hover");
    };

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], label").forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    // ---- RAF loop: only translate, never append ----
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.13);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.13);

      // Ring centered on lerped position (always RING_HALF offset; CSS transition handles size change)
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${lerped.current.x - RING_HALF}px, ${lerped.current.y - RING_HALF}px)`;
      }

      // Dot snaps to real mouse, centered on DOT_HALF
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - DOT_HALF}px, ${mouse.current.y - DOT_HALF}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lerps behind mouse */}
      <div ref={ringRef} className="cur-ring" />

      {/* Inner dot — snaps to exact mouse */}
      <div ref={dotRef}  className="cur-dot" />
    </>
  );
}
