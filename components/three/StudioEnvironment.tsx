"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * A hand-placed lighting rig — treated like a product photoshoot, not a preset.
 * One large soft key, a hard rim to draw the silhouette, and a low fill so the
 * shadow side never goes fully dead. Everything lives off-camera; the page
 * background stays pure black (`background={false}`).
 */
export function StudioEnvironment() {
  return (
    <Environment resolution={512} background={false}>
      {/* Key — large, soft, slightly warm, high and to the left */}
      <Lightformer
        form="rect"
        intensity={2.6}
        color="#fff6ec"
        position={[-4, 5, 3]}
        scale={[9, 9, 1]}
        target={[0, 0, 0]}
      />

      {/* Rim — narrow, bright, cool, behind-right to carve the edge */}
      <Lightformer
        form="rect"
        intensity={4.5}
        color="#cfe0ff"
        position={[5, 2, -5]}
        scale={[2, 8, 1]}
        target={[0, 0, 0]}
      />

      {/* Fill — broad, dim, low front so the dark side keeps form */}
      <Lightformer
        form="rect"
        intensity={0.7}
        color="#ffffff"
        position={[0, -3, 5]}
        scale={[10, 4, 1]}
        target={[0, 0, 0]}
      />

      {/* A faint top streak that travels across the chrome as it turns */}
      <Lightformer
        form="ring"
        intensity={1.4}
        color="#cbb6a0"
        position={[0, 6, 1]}
        scale={[3, 3, 1]}
        target={[0, 0, 0]}
      />
    </Environment>
  );
}
