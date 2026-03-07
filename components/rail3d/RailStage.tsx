"use client";

import Link from "next/link";
import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CableRail } from "./CableRail";
import { getActiveRailProject, getCameraPose, getRailPhase, RAIL_LANE_X, RAIL_PROJECTS } from "./projects";
import { useScrollTimeline } from "./useScrollTimeline";

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function RailFallback({ reason }: { reason: string }) {
  return (
    <div className="kappa-rail-fallback">
      <div className="kappa-rail-fallback__grid" />
      <div className="kappa-rail-fallback__lane kappa-rail-fallback__lane--a" />
      <div className="kappa-rail-fallback__lane kappa-rail-fallback__lane--b" />
      <div className="kappa-rail-fallback__lane kappa-rail-fallback__lane--c" />
      <div className="kappa-rail-fallback__lane kappa-rail-fallback__lane--d" />
      <div className="kappa-rail-fallback__marker kappa-rail-fallback__marker--a" />
      <div className="kappa-rail-fallback__marker kappa-rail-fallback__marker--b" />
      <div className="kappa-rail-fallback__marker kappa-rail-fallback__marker--c" />

      <div className="relative z-10 mx-auto w-full max-w-xl rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">Project Rail Preview</p>
        <p className="mt-3 text-sm text-white/78">{reason}</p>
      </div>
    </div>
  );
}

function DigitalGrid() {
  const vertices = useMemo(() => {
    const lines: number[] = [];
    const halfWidth = 80;
    const depthStart = 18;
    const depthEnd = -286;
    const step = 4;

    for (let x = -halfWidth; x <= halfWidth; x += step) {
      lines.push(x, -1.12, depthStart, x, -1.12, depthEnd);
    }

    for (let z = depthStart; z >= depthEnd; z -= step) {
      lines.push(-halfWidth, -1.12, z, halfWidth, -1.12, z);
    }

    return new Float32Array(lines);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={vertices.length / 3} array={vertices} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#35519e" transparent opacity={0.18} />
    </lineSegments>
  );
}

function LaneGuides() {
  return (
    <group>
      {RAIL_LANE_X.map((laneX) => (
        <Line
          key={`lane-guide-${laneX}`}
          points={[new THREE.Vector3(laneX, -0.92, 10), new THREE.Vector3(laneX, -0.92, -260)]}
          color="#5e7af2"
          lineWidth={0.9}
          transparent
          opacity={0.34}
        />
      ))}
    </group>
  );
}

function DataStreams({ progress, active }: { progress: number; active: boolean }) {
  const dustRef = useRef<THREE.Points>(null);
  const streamRef = useRef<THREE.InstancedMesh>(null);
  const streamDummy = useMemo(() => new THREE.Object3D(), []);

  const dustPositions = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const stride = index * 3;
      const theta = Math.random() * Math.PI * 2;
      const radius = 6 + Math.random() * 18;

      positions[stride] = Math.cos(theta) * radius;
      positions[stride + 1] = (Math.random() - 0.5) * 9;
      positions[stride + 2] = -Math.random() * 280;
    }

    return positions;
  }, []);

  const streams = useMemo(
    () =>
      Array.from({ length: 240 }, (_, index) => ({
        lane: index % RAIL_LANE_X.length,
        seed: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.58,
        depth: Math.random() * 260,
        height: (Math.random() - 0.5) * 2.8,
      })),
    [],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const railBoost = clamp01((progress - 0.65) / 0.35);

    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.012;
      dustRef.current.rotation.z = Math.sin(elapsed * 0.1) * 0.025;
    }

    if (!streamRef.current) return;

    for (let index = 0; index < streams.length; index += 1) {
      const stream = streams[index];
      const travel = ((elapsed * stream.speed * (active ? 1 : 0.2) + stream.depth) % 278) - 258;
      const laneX = RAIL_LANE_X[stream.lane];

      streamDummy.position.set(
        laneX + Math.sin(elapsed * 0.62 + stream.seed) * (0.34 - railBoost * 0.14),
        stream.height + Math.cos(elapsed * 1.1 + stream.seed) * 0.05,
        travel,
      );
      streamDummy.scale.set(0.03, 0.03, 0.96 + railBoost * 0.72);
      streamDummy.rotation.x = Math.PI / 2;
      streamDummy.updateMatrix();

      streamRef.current.setMatrixAt(index, streamDummy.matrix);
    }

    streamRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustPositions.length / 3} array={dustPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#9ccaff" size={0.042} sizeAttenuation transparent opacity={0.46} depthWrite={false} />
      </points>

      <instancedMesh ref={streamRef} args={[undefined, undefined, streams.length]}>
        <boxGeometry args={[0.04, 0.04, 1]} />
        <meshBasicMaterial color="#7de6ff" transparent opacity={0.7} />
      </instancedMesh>
    </group>
  );
}

function ProjectMarkers({ activeProjectId }: { activeProjectId: string | null }) {
  return (
    <group>
      {RAIL_PROJECTS.map((project) => {
        const isActive = project.id === activeProjectId;

        return (
          <group key={project.id} position={project.markerPosition}>
            <mesh>
              <boxGeometry args={[1.3, 0.34, 0.34]} />
              <meshStandardMaterial
                color={isActive ? "#eff8ff" : "#c8dcff"}
                emissive={isActive ? "#68e1ff" : "#546cd2"}
                emissiveIntensity={isActive ? 1.4 : 0.5}
                roughness={0.22}
                metalness={0.48}
              />
            </mesh>

            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.06, 0.96, 0.06]} />
              <meshStandardMaterial color="#eff8ff" emissive="#63d7ff" emissiveIntensity={0.9} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function RailCameraRig({ progress, active }: { progress: number; active: boolean }) {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const pose = getCameraPose(progress);

    targetPosition.set(...pose.position);
    targetLookAt.set(...pose.lookAt);

    if (active) {
      targetPosition.x += Math.sin(state.clock.elapsedTime * 0.36) * 0.06;
    }

    camera.position.lerp(targetPosition, active ? 0.16 : 0.08);
    camera.lookAt(targetLookAt);
  });

  return null;
}

function RailScene({
  progress,
  renderActive,
  activeProjectId,
}: {
  progress: number;
  renderActive: boolean;
  activeProjectId: string | null;
}) {
  return (
    <>
      <color attach="background" args={["#020611"]} />
      <fog attach="fog" args={["#020611", 40, 300]} />

      <ambientLight intensity={0.56} />
      <directionalLight position={[10, 6, 5]} intensity={0.78} color="#9ad6ff" />
      <directionalLight position={[-9, 4, -16]} intensity={0.5} color="#9e87ff" />
      <pointLight position={[0, 1.5, -16]} intensity={1.1} color="#41caff" distance={120} />

      <RailCameraRig progress={progress} active={renderActive} />
      <DigitalGrid />
      <LaneGuides />
      <CableRail progress={progress} cableCount={22} controlPointCount={14} />
      <DataStreams progress={progress} active={renderActive} />
      <ProjectMarkers activeProjectId={activeProjectId} />
    </>
  );
}

export default function RailStage() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  const { progress, isActive } = useScrollTimeline({
    triggerRef: wrapperRef,
    pinRef,
    start: "top top",
    end: "+=300%",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(context));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();

    if ("addEventListener" in media) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const onVisibilityChange = () => setDocumentHidden(document.hidden);
    onVisibilityChange();

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = pinRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.06, rootMargin: "18% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const effectiveProgress = reducedMotion ? 0.82 : progress;
  const renderActive = !reducedMotion && Boolean(hasWebGL) && (isActive || isInView) && !documentHidden;
  const activeProject = useMemo(() => getActiveRailProject(effectiveProgress, 18), [effectiveProgress]);
  const phase = getRailPhase(effectiveProgress);

  const phaseLabel =
    phase === "gather"
      ? "Gather · convergenza"
      : phase === "twist"
        ? "Twist · intreccio"
        : "Rail · project run";

  return (
    <section ref={wrapperRef} className="relative h-[300vh]" aria-label="Project Cable Rail Stage">
      <div ref={pinRef} className="relative h-screen overflow-hidden border-y border-white/10 bg-[#020611]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_0%,rgba(91,94,255,0.18),transparent_55%),radial-gradient(900px_circle_at_50%_100%,rgba(0,214,255,0.11),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:80px_80px]" />

        {hasWebGL === false ? (
          <RailFallback reason="WebGL non disponibile su questo browser o dispositivo." />
        ) : (
          <>
            {!sceneReady && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <p className="rounded-full border border-cyan/35 bg-cyan/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
                  Loading WebGL Rail...
                </p>
              </div>
            )}

            <Canvas
              fallback={<RailFallback reason="Impossibile inizializzare il motore 3D in questo ambiente." />}
              dpr={[1, 1.5]}
              camera={{ position: [0, 1.2, 29], fov: 46, near: 0.1, far: 800 }}
              frameloop={renderActive ? "always" : "demand"}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color("#020611"));
                setSceneReady(true);
              }}
            >
              <Suspense fallback={null}>
                <RailScene progress={effectiveProgress} renderActive={renderActive} activeProjectId={activeProject?.id ?? null} />
              </Suspense>
            </Canvas>
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020611] via-[#020611]/72 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020611] via-[#020611]/76 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-5 z-20 px-4">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <div className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
              Project Rail · {phaseLabel}
            </div>
            <div className="hidden rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs text-white/75 md:block">
              Progresso {Math.round(effectiveProgress * 100)}%
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 px-4">
          <div className="mx-auto flex w-full max-w-6xl justify-center">
            <div
              className={`w-full max-w-xl rounded-2xl border border-cyan/35 bg-[#070d22]/82 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ${
                activeProject ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${activeProject ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {activeProject ? (
                <>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan/90">{activeProject.tag}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{activeProject.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">{activeProject.description}</p>
                  <Link
                    href={activeProject.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan transition-colors hover:text-white"
                  >
                    Apri progetto <span className="transition-transform duration-200 hover:translate-x-1">→</span>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-white/62">
                  Scorri nel rail: i cavi convergono, si intrecciano e poi si aprono in corsie che attraversano i marker progetto.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
