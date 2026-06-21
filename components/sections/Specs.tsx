import { Reveal } from "@/components/ui/Reveal";

const SPECS = [
  { value: "1.8s", label: "Median draft", note: "Notes to finished page" },
  { value: "Opus 4.8", label: "Reasoning core", note: "Anthropic's frontier model" },
  { value: "12", label: "Output forms", note: "Docs, email, posts, briefs" },
  { value: "Zero", label: "Retention", note: "Nothing stored, ever" },
];

export function Specs() {
  return (
    <section
      id="studio"
      className="relative border-y border-[var(--color-hairline)] bg-[var(--color-base-2)]"
    >
      <div className="mx-auto max-w-[78rem] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow mb-14 text-center">Specification</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-0">
          {SPECS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="flex flex-col items-center px-4 text-center md:border-l md:border-[var(--color-hairline)] md:first:border-l-0"
            >
              <span className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-light leading-none tracking-tight text-[var(--color-ink)]">
                {s.value}
              </span>
              <span className="mt-4 text-[0.8125rem] font-medium tracking-tight text-[var(--color-ink)]">
                {s.label}
              </span>
              <span className="mt-1 text-[0.75rem] tracking-tight text-[var(--color-ink-faint)]">
                {s.note}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
