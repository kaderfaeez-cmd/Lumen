"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type CenterpieceProps = {
  /** Reduce motion for accessibility / low-power devices. */
  calm?: boolean;
};

/**
 * The product. A single liquid-chrome obsidian form — a high-resolution
 * icosahedron with a slow, organic surface flow. Motion is deliberately
 * controlled: a constant slow turn, a gentle bob, and a small parallax tilt
 * that follows the pointer. No free orbit, nothing chaotic.
 */
export function Centerpiece({ calm = false }: CenterpieceProps) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;

    // Constant slow rotation — the turntable.
    g.rotation.y += delta * (calm ? 0.05 : 0.12);

    // Pointer parallax: ease the form toward a small tilt. Range is tight
    // so it reads as "alive", never as a toy being spun.
    const px = state.pointer.x;
    const py = state.pointer.y;
    target.current.x = THREE.MathUtils.lerp(target.current.x, py * 0.18, 0.04);
    target.current.y = THREE.MathUtils.lerp(target.current.y, px * 0.22, 0.04);
    g.rotation.x = target.current.x;
    g.rotation.z = target.current.y * 0.4;

    // A slow vertical bob, framed like the object floating in the studio.
    g.position.y = Math.sin(t * 0.5) * (calm ? 0.03 : 0.07);
  });

  return (
    <group ref={group}>
      <mesh castShadow scale={1.65}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#26262e"
          metalness={0.92}
          roughness={0.14}
          envMapIntensity={1.5}
          distort={calm ? 0.18 : 0.3}
          speed={calm ? 0.6 : 1.1}
        />
      </mesh>
    </group>
  );
}
