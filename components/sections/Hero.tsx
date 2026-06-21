import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* The product. Full-bleed, centered, behind the type. */}
      <HeroCanvas />

      {/* A soft floor of darkness under the type so it always reads */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[var(--color-base)] via-[var(--color-base)]/40 to-transparent"
      />

      {/* Composition rides above the canvas */}
      <div className="relative z-20 flex w-full max-w-[78rem] flex-1 flex-col items-center justify-between px-6 pb-12 pt-28 text-center md:px-10">
        {/* Top — eyebrow + headline */}
        <div className="flex flex-col items-center">
          <p className="eyebrow mb-7 animate-[fadeIn_1.4s_var(--ease-luxe)_both]">
            The writing studio
          </p>
          <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,8vw,6.25rem)] font-light leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
            Rough notes,
            <br />
            <span className="italic text-[var(--color-accent)]">refined.</span>
          </h1>
        </div>

        {/* Bottom — supporting line + controlled CTAs + scroll cue */}
        <div className="flex flex-col items-center">
          <p className="mb-9 max-w-[42ch] text-balance text-[0.975rem] leading-relaxed text-[var(--color-ink-muted)]">
            Lumen turns the way you actually think — fragments, half-sentences,
            arrows — into finished documents, emails and posts. Quietly, in your
            voice.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button href="#request" variant="solid">
              Request access
            </Button>
            <Button href="#craft" variant="ghost">
              See it work
            </Button>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            <span className="eyebrow !text-[0.625rem] !tracking-[0.4em]">
              Scroll
            </span>
            <span className="block h-12 w-px bg-gradient-to-b from-[var(--color-hairline-strong)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
