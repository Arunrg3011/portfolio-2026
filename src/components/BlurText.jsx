"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = "",
  delay = 30,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.05,
  rootMargin = "60px",
  animationFrom,
  animationTo,
  easing = [0.25, 0.1, 0.25, 1],
  onAnimationComplete,
  stepDuration = 0.25,
  animateOnMount = false,
}) => {
  const elements = useMemo(() => {
    if (!text) return [];
    if (animateBy !== "words") {
      return text.split("").map((char) => ({ word: char, punctuation: "", isItalic: false }));
    }
    let inItalic = false;
    return text.split(" ").map((word) => {
      let currentItalic = inItalic;
      let cleanWord = word;
      let punctuation = "";

      if (cleanWord.startsWith("*")) {
        cleanWord = cleanWord.slice(1);
        inItalic = true;
        currentItalic = true;
      }

      const trailingMatch = cleanWord.match(/^(.*?)\*([.,\/#!$%\^&\*;:{}=\-_`~()]*)$/);
      if (trailingMatch) {
        cleanWord = trailingMatch[1];
        punctuation = trailingMatch[2];
        inItalic = false;
      }

      return {
        word: cleanWord,
        punctuation,
        isItalic: currentItalic,
      };
    });
  }, [text, animateBy]);

  const [inView, setInView] = useState(animateOnMount);
  const ref = useRef(null);

  useEffect(() => {
    if (animateOnMount) {
      setInView(true);
      return;
    }
    if (!ref.current) return;

    // Immediately trigger if already within viewport
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, animateOnMount]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(4px)", opacity: 0, y: -12 }
        : { filter: "blur(4px)", opacity: 0, y: 12 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  return (
    <p ref={ref} className={className}>
      {elements.map((segment, index) => {
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment.isItalic ? (
              <span className="font-serif italic text-white/90">{segment.word}</span>
            ) : (
              segment.word
            )}
            {segment.punctuation}&nbsp;
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
