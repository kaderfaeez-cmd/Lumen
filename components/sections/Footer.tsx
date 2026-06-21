import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-base)]">
      <div className="mx-auto flex max-w-[78rem] flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-display text-base tracking-tight text-[var(--color-ink)]">
            Lumen
          </span>
        </div>

        <p className="text-[0.75rem] tracking-tight text-[var(--color-ink-faint)]">
          Rough notes, refined.
        </p>

        <div className="flex items-center gap-8">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-[0.75rem] tracking-tight text-[var(--color-ink-faint)] transition-colors duration-300 hover:text-[var(--color-ink)]"
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
