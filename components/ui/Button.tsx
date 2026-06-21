import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "solid" | "ghost";

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-[0.8125rem] font-medium tracking-tight transition-all duration-500 [transition-timing-function:var(--ease-luxe)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]";

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--color-ink)] px-6 py-3 text-[var(--color-base)] hover:bg-white",
  ghost:
    "border border-[var(--color-hairline-strong)] px-6 py-3 text-[var(--color-ink)] hover:border-[var(--color-accent-dim)] hover:bg-white/[0.02]",
};

export function Button({
  href,
  variant = "solid",
  children,
  className,
}: ButtonProps) {
  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-500 [transition-timing-function:var(--ease-luxe)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
