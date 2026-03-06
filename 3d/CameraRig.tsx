"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export type CameraPose = {
  position: [number, number, number];
  lookAt: [number, number, number];
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function getCameraPose(progress: number): CameraPose {
  const p = clamp01(progress);

  if (p < 0.3) {
    const t = smooth(p / 0.3);
    return {
      position: [lerp(0, 0.65, t), lerp(1.2, 0.95, t), lerp(29, 11, t)],
      lookAt: [0, 0, lerp(-15, -62, t)],
    };
  }

  if (p < 0.65) {
    const t = smooth((p - 0.3) / 0.35);
    return {
      position: [Math.sin(t * Math.PI * 1.4) * 1.45, lerp(0.95, 0.65, t), lerp(11, -28, t)],
      lookAt: [0, Math.sin(t * 2.2) * 0.12, lerp(-62, -122, t)],
    };
  }

  const t = smooth((p - 0.65) / 0.35);
  return {
    position: [Math.sin(t * Math.PI * 1.2) * 0.85, lerp(0.65, 0.32, t), lerp(-28, -246, t)],
    lookAt: [0, 0.04, lerp(-122, -316, t)],
  };
}

type CameraRigProps = {
  progress: number;
  active: boolean;
};

export function CameraRig({ progress, active }: CameraRigProps) {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const pose = getCameraPose(progress);

    targetPosition.set(...pose.position);
    targetLookAt.set(...pose.lookAt);

    const drift = active ? Math.sin(state.clock.elapsedTime * 0.35) * 0.05 : 0;
    targetPosition.x += drift;

    camera.position.lerp(targetPosition, active ? 0.16 : 0.06);
    camera.lookAt(targetLookAt);
  });

  return null;
}
