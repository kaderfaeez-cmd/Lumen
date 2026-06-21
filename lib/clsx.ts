/**
 * Tiny className joiner — no dependency needed for this small surface.
 */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
