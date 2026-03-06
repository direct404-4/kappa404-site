"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { RAIL_LANE_X } from "./projects";

type CableRailProps = {
  progress: number;
  cableCount?: number;
  controlPointCount?: number;
};

type CableSeed = {
  color: string;
  phase: number;
  wobble: number;
  laneIndex: number;
  width: number;
};

const COLORS = ["#70e2ff", "#9cc4ff", "#84d5ff", "#b58fff"] as const;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

function createCablePoints(
  seed: CableSeed,
  index: number,
  total: number,
  progress: number,
  controlPointCount: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const idxNorm = total > 1 ? index / (total - 1) - 0.5 : 0;

  const gatherT = smooth(clamp01(progress / 0.3));
  const twistT = smooth(clamp01((progress - 0.3) / 0.35));
  const railT = smooth(clamp01((progress - 0.65) / 0.35));

  for (let i = 0; i < controlPointCount; i += 1) {
    const t = i / (controlPointCount - 1);
    const z = lerp(28, -248, t);

    const xOpen = idxNorm * 16 + Math.sin(t * 8 + seed.phase) * 1.35 * (1 - t * 0.55);
    const yOpen = seed.wobble * 2 + Math.cos(t * 4 + seed.phase) * 0.58;

    const xGather = idxNorm * 3.3 + Math.sin(t * 4.5 + seed.phase) * 0.35;
    const yGather = seed.wobble * 0.75 + Math.cos(t * 2.1 + seed.phase) * 0.24;

    const twistAngle = t * (Math.PI * 10.2) + seed.phase + twistT * (Math.PI * 2.7);
    const twistRadius = 1.2 + Math.abs(idxNorm) * 1.9;
    const xTwist = Math.cos(twistAngle) * twistRadius;
    const yTwist = Math.sin(twistAngle) * twistRadius * 0.72 + seed.wobble * 0.22;

    const laneX = RAIL_LANE_X[seed.laneIndex];
    const xLane = laneX + Math.sin(t * 5 + seed.phase) * 0.24 * (1 - railT * 0.35);
    const yLane = seed.wobble * 0.42 + Math.cos(t * 2.8 + seed.phase) * 0.17;

    let x = xOpen;
    let y = yOpen;

    if (progress < 0.3) {
      x = lerp(xOpen, xGather, gatherT);
      y = lerp(yOpen, yGather, gatherT);
    } else if (progress < 0.65) {
      x = lerp(xGather, xTwist, twistT);
      y = lerp(yGather, yTwist, twistT);
    } else {
      x = lerp(xTwist, xLane, railT);
      y = lerp(yTwist, yLane, railT);
    }

    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.28);
  return curve.getPoints(56);
}

export function CableRail({ progress, cableCount = 16, controlPointCount = 12 }: CableRailProps) {
  const seeds = useMemo<CableSeed[]>(
    () =>
      Array.from({ length: cableCount }, (_, index) => ({
        color: COLORS[index % COLORS.length],
        phase: index * 0.62,
        wobble: Math.sin(index * 1.11),
        laneIndex: index % RAIL_LANE_X.length,
        width: index % 3 === 0 ? 1.5 : 1.1,
      })),
    [cableCount],
  );

  const cableLines = useMemo(
    () => seeds.map((seed, index) => createCablePoints(seed, index, cableCount, progress, controlPointCount)),
    [seeds, cableCount, progress, controlPointCount],
  );

  return (
    <group>
      {cableLines.map((points, index) => (
        <Line
          key={`cable-${index}`}
          points={points}
          color={seeds[index].color}
          lineWidth={seeds[index].width}
          transparent
          opacity={0.78}
          depthWrite={false}
        />
      ))}
    </group>
  );
}
