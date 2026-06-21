"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Centerpiece } from "./Centerpiece";
import { StudioEnvironment } from "./StudioEnvironment";

/**
 * The full 3D stage. Owns the camera, lighting rig, grounding shadow and the
 * product. Kept entirely separate from page layout — sections never reach in
 * here, and this never reaches out. Rendered client-only (no SSR) via the
 * loader in `HeroCanvas`.
 */
export function Scene() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCalm(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      // Slightly above and pulled back — a long "product lens" framing.
      camera={{ position: [0, 0.35, 6.4], fov: 32 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.35, 6.4]} fov={32} />

      <color attach="background" args={["#060609"]} />
      <fog attach="fog" args={["#060609", 7, 13]} />

      <Suspense fallback={null}>
        <Centerpiece calm={calm} />
        <StudioEnvironment />

        {/* The product sits on an unseen dark surface — only its shadow reads. */}
        <ContactShadows
          position={[0, -2.05, 0]}
          opacity={0.55}
          scale={14}
          blur={3.2}
          far={5}
          resolution={512}
          color="#000000"
        />
      </Suspense>

      {/* Direct lighting rig — gives the chrome specular highlights even if the
          environment map can't be generated (e.g. software WebGL). This is what
          carves the liquid-metal streaks across the form. */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={3.2}
        color="#fff4e8"
      />
      <spotLight
        position={[-7, 3, -4]}
        angle={0.6}
        penumbra={1}
        intensity={120}
        color="#cfe0ff"
        distance={30}
      />
      <pointLight position={[0, -3, 4]} intensity={12} color="#cbb6a0" />
    </Canvas>
  );
}
