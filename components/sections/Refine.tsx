"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

const EXAMPLE_NOTES = `meeting w/ design fri — push launch?
- hero still rough
- copy not final
- dev needs ~3 more days

tell team: no panic. move the date,
protect the quality. own it.`;

type Mode = "Document" | "Email" | "Post";
const MODES: Mode[] = ["Document", "Email", "Post"];

export function Refine() {
  const [notes, setNotes] = useState(EXAMPLE_NOTES);
  const [mode, setMode] = useState<Mode>("Document");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "streaming" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function refine() {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setOutput("");
    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, mode }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Try again.");
      }

      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
      setStatus("idle");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message);
      setStatus("error");
    }
  }

  const busy = status === "loading" || status === "streaming";

  return (
    <section id="craft" className="relative">
      <div className="mx-auto max-w-[78rem] px-6 py-28 md:px-10 md:py-40">
        <Reveal className="mx-auto mb-16 max-w-[34rem] text-center">
          <p className="eyebrow mb-6">The craft</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-[var(--color-ink)]">
            From the way you think
            <br />
            to the way it should read.
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)]">
            Real, working Lumen. Paste your own rough notes, choose a form, and
            watch it draft — powered by Claude.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="grain relative overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-surface)]/70 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="grid md:grid-cols-2">
              {/* Left — the raw input (editable) */}
              <div className="flex flex-col border-b border-[var(--color-hairline)] p-8 md:border-b-0 md:border-r md:p-12">
                <div className="mb-7 flex items-center gap-2.5">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-ink-ghost)]" />
                  <span className="eyebrow !tracking-[0.28em]">Your notes</span>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  spellCheck={false}
                  placeholder="Dump your rough notes here…"
                  className="min-h-[14rem] flex-1 resize-none bg-transparent font-sans text-[0.9375rem] leading-relaxed text-[var(--color-ink)] caret-[var(--color-accent)] outline-none placeholder:text-[var(--color-ink-ghost)]"
                />

                <div className="mt-7 flex items-center justify-between">
                  <button
                    onClick={refine}
                    disabled={busy || notes.trim().length === 0}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.8125rem] font-medium tracking-tight transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
                      busy || notes.trim().length === 0
                        ? "cursor-not-allowed bg-[var(--color-ink-ghost)] text-[var(--color-base)]"
                        : "bg-[var(--color-ink)] text-[var(--color-base)] hover:bg-white",
                    )}
                  >
                    {status === "loading"
                      ? "Thinking…"
                      : status === "streaming"
                        ? "Refining…"
                        : "Refine"}
                    {!busy && <span aria-hidden>→</span>}
                  </button>
                  <span className="text-[0.6875rem] tabular-nums text-[var(--color-ink-faint)]">
                    {notes.length}/8000
                  </span>
                </div>
              </div>

              {/* Right — the finished output */}
              <div className="relative flex min-h-[24rem] flex-col p-8 md:p-12">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={clsx(
                        "block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]",
                        busy && "animate-pulse",
                      )}
                    />
                    <span className="eyebrow !tracking-[0.28em] !text-[var(--color-accent-dim)]">
                      Lumen
                    </span>
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-[var(--color-hairline)] p-1">
                    {MODES.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        disabled={busy}
                        className={clsx(
                          "rounded-full px-3 py-1.5 text-[0.6875rem] tracking-tight transition-all duration-500 [transition-timing-function:var(--ease-luxe)] disabled:opacity-50",
                          mode === m
                            ? "bg-[var(--color-ink)] text-[var(--color-base)]"
                            : "text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]",
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output states */}
                {status === "error" ? (
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)]">
                    {error}
                  </p>
                ) : output ? (
                  <p className="whitespace-pre-wrap font-sans text-[0.9375rem] leading-relaxed text-[var(--color-ink)]">
                    {output}
                    {status === "streaming" && (
                      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--color-accent)]" />
                    )}
                  </p>
                ) : status === "loading" ? (
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-ink-faint)]">
                    Reading your notes…
                  </p>
                ) : (
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-ink-ghost)]">
                    Your finished {mode.toLowerCase()} will appear here. Press
                    Refine.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
