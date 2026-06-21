import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Closing() {
  return (
    <section
      id="request"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-base-2)]"
    >
      {/* A single soft pool of light, centered — echoing the studio rig */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(203,182,160,0.10),transparent)]"
      />

      <div className="relative mx-auto flex max-w-[78rem] flex-col items-center px-6 py-32 text-center md:px-10 md:py-44">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow mb-7">Private beta</p>
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-[var(--color-ink)]">
            Write less.
            <br />
            <span className="italic text-[var(--color-accent)]">Say more.</span>
          </h2>
          <p className="mt-8 max-w-[40ch] text-[0.975rem] leading-relaxed text-[var(--color-ink-muted)]">
            Lumen is opening to a small group of writers, founders and teams.
            Request an invitation below.
          </p>
          <div className="mt-10">
            <Button href="mailto:hello@lumen.studio" variant="solid">
              Request access
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
