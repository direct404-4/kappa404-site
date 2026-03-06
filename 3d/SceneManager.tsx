"use client";

import projects from "@/data/projects.json";
import { Line } from "@react-three/drei";
import { CameraRig } from "@/3d/CameraRig";
import { CableSystem, RAIL_LANES } from "@/3d/CableSystem";
import { ParticleField } from "@/3d/ParticleField";
import { useMemo } from "react";
import * as THREE from "three";

type RailProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  markerPosition: [number, number, number];
};

const RAIL_PROJECTS = projects as RailProject[];

type SceneManagerProps = {
  progress: number;
  renderActive: boolean;
  activeProjectId: string | null;
};

function DigitalGrid() {
  const vertices = useMemo(() => {
    const lines: number[] = [];
    const size = 72;
    const depthStart = 16;
    const depthEnd = -280;
    const step = 4;

    for (let x = -size; x <= size; x += step) {
      lines.push(x, -1.05, depthStart, x, -1.05, depthEnd);
    }

    for (let z = depthStart; z >= depthEnd; z -= step) {
      lines.push(-size, -1.05, z, size, -1.05, z);
    }

    return new Float32Array(lines);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={vertices.length / 3} array={vertices} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#4964ba" transparent opacity={0.22} />
    </lineSegments>
  );
}

function LaneGuides() {
  return (
    <group>
      {RAIL_LANES.map((laneX) => (
        <Line
          key={`guide-${laneX}`}
          points={[new THREE.Vector3(laneX, -0.95, 10), new THREE.Vector3(laneX, -0.95, -258)]}
          color="#5f7be2"
          lineWidth={0.95}
          transparent
          opacity={0.34}
        />
      ))}
    </group>
  );
}

function ProjectMarkers({ activeProjectId }: { activeProjectId: string | null }) {
  return (
    <group>
      {RAIL_PROJECTS.map((project) => {
        const [x, y, z] = project.markerPosition;
        const active = project.id === activeProjectId;

        return (
          <group key={project.id} position={[x, y, z]}>
            <mesh>
              <boxGeometry args={[1.2, 0.3, 0.3]} />
              <meshStandardMaterial
                color={active ? "#e7f5ff" : "#c7dfff"}
                emissive={active ? "#63e1ff" : "#4d6fd4"}
                emissiveIntensity={active ? 1.35 : 0.52}
                roughness={0.2}
                metalness={0.45}
              />
            </mesh>

            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.05, 0.88, 0.05]} />
              <meshStandardMaterial color="#dff4ff" emissive="#60d0ff" emissiveIntensity={0.9} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function SceneManager({ progress, renderActive, activeProjectId }: SceneManagerProps) {
  return (
    <>
      <color attach="background" args={["#02040f"]} />
      <fog attach="fog" args={["#02040f", 42, 290]} />

      <ambientLight intensity={0.52} />
      <directionalLight position={[10, 6, 3]} intensity={0.75} color="#9ed5ff" />
      <directionalLight position={[-10, 4, -14]} intensity={0.46} color="#a18bff" />

      <CameraRig progress={progress} active={renderActive} />
      <DigitalGrid />
      <LaneGuides />
      <CableSystem progress={progress} />
      <ParticleField progress={progress} active={renderActive} />
      <ProjectMarkers activeProjectId={activeProjectId} />
    </>
  );
}
