"use client";

import { getCameraPose } from "@/3d/CameraRig";
import { SceneManager } from "@/3d/SceneManager";
import projects from "@/data/projects.json";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type RailProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  markerPosition: [number, number, number];
};

const RAIL_PROJECTS = projects as RailProject[];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

class CanvasBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void; fallback: React.ReactNode }) {
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
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function getPhase(progress: number): "Gather" | "Twist" | "Rail" {
  if (progress < 0.3) return "Gather";
  if (progress < 0.65) return "Twist";
  return "Rail";
}

function getActiveProject(progress: number, threshold = 17): RailProject | null {
  const p = clamp01(progress);
  if (p < 0.62) return null;

  const pose = getCameraPose(p);
  const [cx, cy, cz] = pose.position;

  let best: RailProject | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const project of RAIL_PROJECTS) {
    const [mx, my, mz] = project.markerPosition;
    const dx = cx - mx;
    const dy = cy - my;
    const dz = cz - mz;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < bestDistance) {
      bestDistance = distance;
      best = project;
    }
  }

  return bestDistance <= threshold ? best : null;
}

export default function PortfolioScene() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [webglStatus, setWebglStatus] = useState<"checking" | "ready" | "disabled">("checking");
  const [canvasMounted, setCanvasMounted] = useState(false);
  const [canvasCrashed, setCanvasCrashed] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setProgress(0.74);
      return;
    }

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
            setProgress((prev) => (Math.abs(prev - value) > 0.0009 ? value : prev));
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const testCanvas = document.createElement("canvas");
      const context = testCanvas.getContext("webgl2") ?? testCanvas.getContext("webgl");
      setWebglStatus(context ? "ready" : "disabled");
    } catch {
      setWebglStatus("disabled");
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const onVisibility = () => setDocumentHidden(document.hidden);
    onVisibility();

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const activeProject = useMemo(() => getActiveProject(progress), [progress]);
  const phase = getPhase(progress);
  const renderActive = isActive && !documentHidden && webglStatus === "ready" && !canvasCrashed;

  const fallbackMessage =
    webglStatus === "checking"
      ? "Inizializzazione ambiente WebGL..."
      : webglStatus === "disabled"
        ? "Il dispositivo non supporta la scena 3D. La navigazione resta disponibile."
        : "La scena 3D ha avuto un errore durante l'apertura. Ricarica la pagina.";

  return (
    <section ref={wrapperRef} className="relative h-[320vh]" aria-label="Portfolio WebGL Stage">
      <div ref={pinRef} className="relative h-screen overflow-hidden border-y border-white/10 bg-[#02040f]">
        {webglStatus === "ready" && !canvasCrashed ? (
          <CanvasBoundary
            onError={() => setCanvasCrashed(true)}
            fallback={
              <div className="flex h-full items-center justify-center px-6">
                <div className="rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
                  <p className="mt-3 text-sm text-white/76">La scena 3D ha avuto un errore durante l&apos;apertura.</p>
                </div>
              </div>
            }
          >
            <>
              {!canvasMounted && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <p className="rounded-full border border-cyan/35 bg-cyan/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
                    Loading 3D scene...
                  </p>
                </div>
              )}

              <Canvas
                dpr={[1, 1.7]}
                camera={{ position: [0, 1.2, 29], fov: 45, near: 0.1, far: 800 }}
                frameloop={renderActive ? "always" : "demand"}
                gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
                onCreated={() => setCanvasMounted(true)}
              >
                <SceneManager progress={progress} renderActive={renderActive} activeProjectId={activeProject?.id ?? null} />
              </Canvas>
            </>
          </CanvasBoundary>
        ) : (
          <div className="flex h-full items-center justify-center px-6">
            <div className="rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
              <p className="mt-3 text-sm text-white/76">{fallbackMessage}</p>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#02040f] via-[#02040f]/72 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02040f] via-[#02040f]/76 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-5 z-20 px-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <p className="rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan/92">
              Stage 3D · {phase}
            </p>
            <p className="hidden rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs text-white/75 md:block">
              Progress {Math.round(progress * 100)}%
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10 z-20 px-4">
          <div className="mx-auto max-w-6xl">
            <div
              className={`mx-auto w-full max-w-2xl rounded-2xl border border-cyan/30 bg-[#061028]/80 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.52)] backdrop-blur-md transition-all duration-300 ${
                activeProject ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {activeProject ? (
                <>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan/90">{activeProject.tag}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{activeProject.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/78">{activeProject.description}</p>
                  <Link href={activeProject.link} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-white">
                    Apri progetto <span className="transition-transform duration-200 hover:translate-x-1">→</span>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-white/65">
                  Scrolla dentro la rete: gather, twist, rail. Le schede progetto appaiono quando la camera raggiunge i marker.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
