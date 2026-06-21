"use client";

import dynamic from "next/dynamic";

// The WebGL stage is client-only — no SSR, loaded lazily so the rest of the
// page paints instantly. While it streams in, the void simply stays black,
// which is exactly the intended resting state.
const Scene = dynamic(
  () => import("./Scene").then((m) => m.Scene),
  { ssr: false },
);

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Scene />
    </div>
  );
}
