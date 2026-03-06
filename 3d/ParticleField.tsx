"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { RAIL_LANES } from "./CableSystem";

type ParticleFieldProps = {
  progress: number;
  active: boolean;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function ParticleField({ progress, active }: ParticleFieldProps) {
  const dustRef = useRef<THREE.Points>(null);
  const streamRef = useRef<THREE.InstancedMesh>(null);
  const streamDummy = useMemo(() => new THREE.Object3D(), []);

  const dustPositions = useMemo(() => {
    const count = 2600;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const stride = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 19;

      array[stride] = Math.cos(theta) * radius * (Math.random() > 0.5 ? 1 : -1);
      array[stride + 1] = (Math.random() - 0.5) * 8;
      array[stride + 2] = -Math.random() * 270;
    }

    return array;
  }, []);

  const streams = useMemo(
    () =>
      Array.from({ length: 340 }, (_, index) => ({
        lane: index % RAIL_LANES.length,
        seed: Math.random() * Math.PI * 2,
        speed: 0.22 + Math.random() * 0.66,
        depth: Math.random() * 260,
        height: (Math.random() - 0.5) * 2.6,
      })),
    [],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.01;
      dustRef.current.rotation.z = Math.sin(elapsed * 0.08) * 0.03;
    }

    if (!streamRef.current) return;

    const p = clamp01(progress);
    const railBoost = p > 0.65 ? (p - 0.65) / 0.35 : 0;

    for (let i = 0; i < streams.length; i += 1) {
      const item = streams[i];
      const laneX = RAIL_LANES[item.lane];
      const travel = ((elapsed * item.speed * (active ? 1 : 0.2) + item.depth) % 274) - 250;

      streamDummy.position.set(
        laneX + Math.sin(elapsed * 0.7 + item.seed) * (0.35 - railBoost * 0.12),
        item.height + Math.cos(elapsed * 1.1 + item.seed) * 0.06,
        travel,
      );
      streamDummy.scale.set(0.03, 0.03, 0.95 + railBoost * 0.7);
      streamDummy.rotation.x = Math.PI / 2;
      streamDummy.updateMatrix();

      streamRef.current.setMatrixAt(i, streamDummy.matrix);
    }

    streamRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustPositions.length / 3} array={dustPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#9cc7ff" size={0.04} sizeAttenuation transparent opacity={0.46} depthWrite={false} />
      </points>

      <instancedMesh ref={streamRef} args={[undefined, undefined, streams.length]}>
        <boxGeometry args={[0.04, 0.04, 1]} />
        <meshBasicMaterial color="#7ce2ff" transparent opacity={0.72} />
      </instancedMesh>
    </group>
  );
}
