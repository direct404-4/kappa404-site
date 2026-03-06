"use client";

import Link from "next/link";
import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CableRail } from "./CableRail";
import { getActiveRailProject, getCameraPosition, getRailPhase, RAIL_LANE_X, RAIL_PROJECTS } from "./projects";

type RailSceneProps = {
  progress: number;
  renderActive: boolean;
  activeProjectId: string | null;
};

function LaneGuides() {
  return (
    <group>
      {RAIL_LANE_X.map((laneX) => (
        <Line
          key={`lane-guide-${laneX}`}
          points={[new THREE.Vector3(laneX, -0.95, 8), new THREE.Vector3(laneX, -0.95, -252)]}
          color="#4a62b4"
          lineWidth={0.8}
          transparent
          opacity={0.26}
        />
      ))}
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
              <boxGeometry args={[1.2, 0.32, 0.32]} />
              <meshStandardMaterial
                color={isActive ? "#e6f4ff" : "#b9d9ff"}
                emissive={isActive ? "#67d5ff" : "#5468cf"}
                emissiveIntensity={isActive ? 1.2 : 0.48}
                roughness={0.24}
                metalness={0.42}
              />
            </mesh>

            <mesh position={[0, 0.48, 0]}>
              <boxGeometry args={[0.06, 0.92, 0.06]} />
              <meshStandardMaterial color="#dff2ff" emissive="#5ac3ff" emissiveIntensity={0.75} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function RailScene({ progress, renderActive, activeProjectId }: RailSceneProps) {
  const { camera } = useThree();
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const lookAtTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const [x, y, z] = getCameraPosition(progress);
    cameraTarget.set(x, y, z);
    camera.position.lerp(cameraTarget, renderActive ? 0.18 : 0.08);

    lookAtTarget.set(x * 0.2, 0, z - 30);
    camera.lookAt(lookAtTarget);
  });

  return (
    <>
      <color attach="background" args={["#030611"]} />
      <fog attach="fog" args={["#030611", 38, 280]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[9, 7, 4]} intensity={0.65} color="#92dbff" />
      <directionalLight position={[-8, 4, -16]} intensity={0.42} color="#8f80ff" />

      <LaneGuides />
      <CableRail progress={progress} />
      <ProjectMarkers activeProjectId={activeProjectId} />
    </>
  );
}

type CanvasBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError: () => void;
};

type CanvasBoundaryState = {
  hasError: boolean;
};

class CanvasBoundary extends React.Component<CanvasBoundaryProps, CanvasBoundaryState> {
  constructor(props: CanvasBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function RailFallback({ reason }: { reason: string }) {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="max-w-xl rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
        <p className="mt-3 text-sm text-white/78">{reason}</p>
      </div>
    </div>
  );
}

export default function RailStage() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [webglStatus, setWebglStatus] = useState<"checking" | "ready" | "disabled">("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    let rafId = 0;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        pin,
        scrub: true,
        start: "top top",
        end: "+=300%",
        anticipatePin: 1,
        onUpdate: (self) => {
          const value = self.progress;
          cancelAnimationFrame(rafId);
          rafId = window.requestAnimationFrame(() => {
            setProgress((prev) => (Math.abs(prev - value) > 0.001 ? value : prev));
          });
        },
        onToggle: (self) => setIsActive(self.isActive),
      });
    }, wrapper);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  const [documentHidden, setDocumentHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const testCanvas = document.createElement("canvas");
      const context =
        testCanvas.getContext("webgl2") ??
        testCanvas.getContext("webgl") ??
        testCanvas.getContext("experimental-webgl");
      setWebglStatus(context ? "ready" : "disabled");
    } catch {
      setWebglStatus("disabled");
    }
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
      { threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const renderActive = (isActive || isInView) && !documentHidden && webglStatus === "ready" && !canvasFailed;
  const activeProject = useMemo(() => getActiveRailProject(progress, 15.5), [progress]);
  const phase = getRailPhase(progress);

  const phaseLabel =
    phase === "gather"
      ? "Gather · convergenza"
      : phase === "twist"
        ? "Twist · intreccio"
        : "Rail · project run";

  return (
    <section ref={wrapperRef} className="relative h-[300vh]" aria-label="Project Cable Rail Stage">
      <div ref={pinRef} className="relative h-screen overflow-hidden border-y border-white/10 bg-[#030611]">
        {webglStatus === "ready" && !canvasFailed ? (
          <CanvasBoundary
            onError={() => setCanvasFailed(true)}
            fallback={<RailFallback reason="Rendering 3D non supportato in questo ambiente." />}
          >
            <Canvas
              dpr={[1, 1.4]}
              camera={{ position: [0, 1, 28], fov: 47, near: 0.1, far: 700 }}
              frameloop={renderActive ? "always" : "demand"}
              gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            >
              <RailScene progress={progress} renderActive={renderActive} activeProjectId={activeProject?.id ?? null} />
            </Canvas>
          </CanvasBoundary>
        ) : (
          <RailFallback reason={webglStatus === "checking" ? "Inizializzazione scena 3D..." : "WebGL non disponibile su questo dispositivo/browser."} />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#030611] via-[#030611]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030611] via-[#030611]/76 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-5 z-20 px-4">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <div className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
              Project Rail · {phaseLabel}
            </div>
            <div className="hidden rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs text-white/75 md:block">
              Progresso {Math.round(progress * 100)}%
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
                  Scorri nel rail per raggiungere i marker e mostrare le schede progetto.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
