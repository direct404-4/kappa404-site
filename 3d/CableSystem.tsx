"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export const RAIL_LANES = [-5.2, -1.75, 1.75, 5.2] as const;

type CableSeed = {
  phase: number;
  wobble: number;
  laneIndex: number;
  color: string;
  width: number;
};

type CableSystemProps = {
  progress: number;
  cableCount?: number;
  controlPoints?: number;
};

const PALETTE = ["#7de6ff", "#91b6ff", "#6ad9ff", "#a98dff"] as const;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function generateCablePoints(
  seed: CableSeed,
  index: number,
  total: number,
  progress: number,
  controlPoints: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = total > 1 ? index / (total - 1) - 0.5 : 0;

  const gatherT = smooth(clamp01(progress / 0.3));
  const twistT = smooth(clamp01((progress - 0.3) / 0.35));
  const railT = smooth(clamp01((progress - 0.65) / 0.35));

  for (let i = 0; i < controlPoints; i += 1) {
    const t = i / (controlPoints - 1);
    const z = lerp(24, -254, t);

    const openX = offset * 15 + Math.sin(t * 8.5 + seed.phase) * 1.25 * (1 - t * 0.6);
    const openY = seed.wobble * 1.95 + Math.cos(t * 3.6 + seed.phase) * 0.52;

    const gatherX = offset * 3.1 + Math.sin(t * 4.2 + seed.phase) * 0.28;
    const gatherY = seed.wobble * 0.75 + Math.cos(t * 2.4 + seed.phase) * 0.21;

    const twistAngle = t * Math.PI * 10.8 + seed.phase + twistT * Math.PI * 2.45;
    const twistRadius = 0.85 + Math.abs(offset) * 2.2;
    const twistX = Math.cos(twistAngle) * twistRadius;
    const twistY = Math.sin(twistAngle) * twistRadius * 0.66 + seed.wobble * 0.2;

    const laneX = RAIL_LANES[seed.laneIndex];
    const railX = laneX + Math.sin(t * 4.5 + seed.phase) * 0.25 * (1 - railT * 0.5);
    const railY = seed.wobble * 0.32 + Math.cos(t * 2.5 + seed.phase) * 0.14;

    let x = openX;
    let y = openY;

    if (progress < 0.3) {
      x = lerp(openX, gatherX, gatherT);
      y = lerp(openY, gatherY, gatherT);
    } else if (progress < 0.65) {
      x = lerp(gatherX, twistX, twistT);
      y = lerp(gatherY, twistY, twistT);
    } else {
      x = lerp(twistX, railX, railT);
      y = lerp(twistY, railY, railT);
    }

    points.push(new THREE.Vector3(x, y, z));
  }

  const spline = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.18);
  return spline.getPoints(90);
}

export function CableSystem({ progress, cableCount = 26, controlPoints = 14 }: CableSystemProps) {
  const seeds = useMemo<CableSeed[]>(
    () =>
      Array.from({ length: cableCount }, (_, index) => ({
        phase: index * 0.58,
        wobble: Math.sin(index * 1.07),
        laneIndex: index % RAIL_LANES.length,
        color: PALETTE[index % PALETTE.length],
        width: index % 4 === 0 ? 1.45 : 1.05,
      })),
    [cableCount],
  );

  const cables = useMemo(
    () => seeds.map((seed, index) => generateCablePoints(seed, index, cableCount, progress, controlPoints)),
    [seeds, cableCount, progress, controlPoints],
  );

  return (
    <group>
      {cables.map((points, index) => (
        <Line
          key={`cable-${index}`}
          points={points}
          color={seeds[index].color}
          lineWidth={seeds[index].width}
          transparent
          opacity={0.84}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
