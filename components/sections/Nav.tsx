"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "@/lib/clsx";

const LINKS = [
  { label: "Studio", href: "#studio" },
  { label: "Craft", href: "#craft" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-luxe)]",
        scrolled
          ? "border-b border-[var(--color-hairline)] bg-[var(--color-base)]/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[78rem] items-center justify-between px-6 md:px-10">
        {/* Wordmark */}
        <Link
          href="#top"
          className="flex items-center gap-2.5 text-ink"
          aria-label="Lumen — home"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-display text-lg tracking-tight text-[var(--color-ink)]">
            Lumen
          </span>
        </Link>

        {/* Center links — quiet, evenly weighted */}
        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[0.8125rem] tracking-tight text-[var(--color-ink-muted)] transition-colors duration-300 hover:text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Single controlled CTA */}
        <Link
          href="#request"
          className="rounded-full border border-[var(--color-hairline-strong)] px-4 py-2 text-[0.8125rem] tracking-tight text-[var(--color-ink)] transition-all duration-500 [transition-timing-function:var(--ease-luxe)] hover:border-[var(--color-accent-dim)] hover:bg-white/[0.02]"
        >
          Request access
        </Link>
      </nav>
    </header>
  );
}
