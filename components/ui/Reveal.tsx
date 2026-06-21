"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in ms — lets sibling elements arrive in sequence. */
  delay?: number;
  className?: string;
};

/**
 * Subtle reveal-on-scroll. Honors prefers-reduced-motion via globals.css,
 * where `.reveal` collapses to a no-op.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx("reveal", shown && "is-in", className)}
    >
      {children}
    </div>
  );
}
