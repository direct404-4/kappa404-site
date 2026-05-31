"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties } from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type HomeSceneId = "hero" | "outcomes" | "infrastructure" | "performance" | "protocol" | "contact";

export type HomeSceneCue = {
  id: HomeSceneId;
  label: string;
  accent: string;
  progressRange: [number, number];
  hudLines: string[];
};

type HomeImmersiveBackgroundProps = {
  cues: HomeSceneCue[];
};

type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

function getCueIndex(progress: number, cues: HomeSceneCue[]) {
  const direct = cues.findIndex((cue) => progress >= cue.progressRange[0] && progress <= cue.progressRange[1]);
  if (direct >= 0) return direct;

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  cues.forEach((cue, index) => {
    const center = (cue.progressRange[0] + cue.progressRange[1]) / 2;
    const distance = Math.abs(progress - center);
    if (distance < bestDistance) {
      bestIndex = index;
      bestDistance = distance;
    }
  });

  return bestIndex;
}

function rangeActivity(progress: number, range: [number, number], pad = 0.08) {
  const [start, end] = range;
  const fadeIn = smooth((progress - start + pad) / pad);
  const fadeOut = 1 - smooth((progress - end) / pad);
  return clamp01(Math.min(fadeIn, fadeOut));
}

function getActivity(progress: number, cues: HomeSceneCue[], id: HomeSceneId) {
  const cue = cues.find((item) => item.id === id);
  return cue ? rangeActivity(progress, cue.progressRange) : 0;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let rafId = 0;

    const publish = (value: number) => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        setProgress((previous) => (Math.abs(previous - value) > 0.001 ? value : previous));
      });
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
      scrub: true,
      onUpdate: (self) => publish(self.progress),
      onRefresh: (self) => publish(self.progress),
    });

    publish(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1));
    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(rafId);
      trigger.kill();
    };
  }, []);

  return progress;
}

function useWebGLStatus() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

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

  return hasWebGL;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useDocumentHidden() {
  const [documentHidden, setDocumentHidden] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const update = () => setDocumentHidden(document.hidden);
    update();

    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return documentHidden;
}

function HomeCameraRig({ progress, active }: { progress: number; active: boolean }) {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const keyframes: CameraKeyframe[] = [
      { at: 0, position: [0, 1.6, 17], lookAt: [0, 0.25, -7] },
      { at: 0.18, position: [-4.4, 2.1, 13], lookAt: [-0.5, 0.1, -9] },
      { at: 0.38, position: [0.6, 3.2, 19], lookAt: [0, 0, -18] },
      { at: 0.58, position: [3.4, 2.2, 12], lookAt: [0.2, 0.3, -12] },
      { at: 0.78, position: [-0.8, 1.2, 21], lookAt: [0, 0, -34] },
      { at: 1, position: [0, 2.8, 15], lookAt: [0, 0.55, -6] },
    ];

    let from = keyframes[0];
    let to = keyframes[keyframes.length - 1];

    for (let index = 0; index < keyframes.length - 1; index += 1) {
      if (progress >= keyframes[index].at && progress <= keyframes[index + 1].at) {
        from = keyframes[index];
        to = keyframes[index + 1];
        break;
      }
    }

    const t = smooth((progress - from.at) / (to.at - from.at || 1));
    const breathe = active ? Math.sin(state.clock.elapsedTime * 0.34) * 0.08 : 0;

    targetPosition.set(
      lerp(from.position[0], to.position[0], t) + breathe,
      lerp(from.position[1], to.position[1], t),
      lerp(from.position[2], to.position[2], t),
    );
    targetLookAt.set(
      lerp(from.lookAt[0], to.lookAt[0], t),
      lerp(from.lookAt[1], to.lookAt[1], t),
      lerp(from.lookAt[2], to.lookAt[2], t),
    );

    camera.position.lerp(targetPosition, active ? 0.12 : 0.08);
    camera.lookAt(targetLookAt);
  });

  return null;
}

function DeepGrid({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const vertices = useMemo(() => {
    const lines: number[] = [];
    const halfWidth = 42;
    const depthStart = 12;
    const depthEnd = -78;
    const step = 3;

    for (let x = -halfWidth; x <= halfWidth; x += step) {
      lines.push(x, -2.35, depthStart, x, -2.35, depthEnd);
    }

    for (let z = depthStart; z >= depthEnd; z -= step) {
      lines.push(-halfWidth, -2.35, z, halfWidth, -2.35, z);
    }

    return new Float32Array(lines);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.z = (state.clock.elapsedTime * 0.22 + progress * 8) % 3;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0.14} />
      </lineSegments>
    </group>
  );
}

function ParticleField({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 1200;
    const data = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const stride = index * 3;
      data[stride] = (Math.random() - 0.5) * 54;
      data[stride + 1] = (Math.random() - 0.5) * 18;
      data[stride + 2] = 12 - Math.random() * 92;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !active) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9af8ff" size={0.035} sizeAttenuation transparent opacity={0.52} depthWrite={false} />
    </points>
  );
}

function FracturedCore({ activity }: { activity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const radius = 0.9 + Math.random() * 1.9;
        return {
          position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 2.8, Math.sin(angle) * radius - 4] as [number, number, number],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
          scale: [0.14 + Math.random() * 0.34, 0.035 + Math.random() * 0.08, 0.42 + Math.random() * 0.96] as [number, number, number],
          accent: index % 5 === 0 ? "#ff00e4" : index % 2 === 0 ? "#00f2ff" : "#bc13fe",
          seed: Math.random() * Math.PI * 2,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (0.12 + activity * 0.16);
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.08;
    groupRef.current.scale.setScalar(1 + activity * 0.2 + Math.sin(state.clock.elapsedTime * 1.1) * 0.02);
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -2]}>
      <mesh>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshStandardMaterial
          color="#07151b"
          emissive="#00f2ff"
          emissiveIntensity={0.35 + activity * 0.85}
          metalness={0.45}
          roughness={0.25}
          wireframe
          transparent
          opacity={0.36 + activity * 0.25}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshBasicMaterial color="#d9fdff" transparent opacity={0.18 + activity * 0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {shards.map((shard, index) => (
        <mesh key={`core-shard-${index}`} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#071017"
            emissive={shard.accent}
            emissiveIntensity={0.32 + activity * 0.82}
            metalness={0.5}
            roughness={0.28}
            transparent
            opacity={0.4 + activity * 0.36}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeuralCables({ activity }: { activity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const curves = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const x = (index / 13 - 0.5) * 20;
        const points = Array.from({ length: 6 }, (_, pointIndex) => {
          const t = pointIndex / 5;
          return new THREE.Vector3(
            x * (1 - t * 0.55) + Math.sin(index + t * 4) * 1.3,
            Math.sin(t * Math.PI * 2 + index) * 1.1,
            lerp(8, -34, t),
          );
        });
        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.35);
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.035;
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, index) => (
        <mesh key={`neural-cable-${index}`}>
          <tubeGeometry args={[curve, 96, index % 3 === 0 ? 0.035 : 0.024, 8, false]} />
          <meshBasicMaterial
            color={index % 4 === 0 ? "#ff00e4" : index % 2 === 0 ? "#00f2ff" : "#bc13fe"}
            transparent
            opacity={0.1 + activity * 0.24}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function OutcomeConstellation({ activity }: { activity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const accents = ["#00f2ff", "#bc13fe", "#ff00e4"] as const;

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.26) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0.1, -9]} scale={0.8 + activity * 0.34}>
      {accents.map((accent, index) => {
        const x = (index - 1) * 4.6;
        return (
          <group key={accent} position={[x, index === 1 ? 0.85 : -0.2, 0]}>
            <mesh>
              <sphereGeometry args={[0.46, 32, 32]} />
              <meshStandardMaterial
                color="#081018"
                emissive={accent}
                emissiveIntensity={0.35 + activity * 1.2}
                metalness={0.55}
                roughness={0.25}
                transparent
                opacity={0.28 + activity * 0.55}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.92, 0.018, 8, 72]} />
              <meshBasicMaterial color={accent} transparent opacity={0.12 + activity * 0.42} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ModuleMatrix({ activity }: { activity: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    groupRef.current.rotation.x = -0.08 + activity * 0.08;
  });

  return (
    <group ref={groupRef} position={[0.2, 0.3, -17]} scale={0.82 + activity * 0.22}>
      {Array.from({ length: 6 }, (_, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const accent = index % 2 === 0 ? "#00f2ff" : "#bc13fe";
        return (
          <group key={`module-cell-${index}`} position={[(col - 1) * 3.25, (0.5 - row) * 2.15, 0]}>
            <mesh>
              <boxGeometry args={[2.26, 1.22, 0.08]} />
              <meshStandardMaterial
                color="#060b11"
                emissive={accent}
                emissiveIntensity={0.18 + activity * 0.58}
                metalness={0.36}
                roughness={0.42}
                transparent
                opacity={0.15 + activity * 0.42}
              />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[1.52, 0.04, 0.04]} />
              <meshBasicMaterial color={accent} transparent opacity={0.2 + activity * 0.48} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function DataTunnel({ activity }: { activity: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * (0.08 + activity * 0.16);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -9]} scale={0.8 + activity * 0.35}>
      {Array.from({ length: 10 }, (_, index) => (
        <mesh key={`data-ring-${index}`} position={[0, 0, -index * 3.1]}>
          <torusGeometry args={[2.3 + index * 0.28, 0.022, 10, 108]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#bc13fe" : "#00f2ff"}
            transparent
            opacity={(0.06 + activity * 0.22) * (1 - index * 0.045)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -14]}>
        <cylinderGeometry args={[1.2, 4.8, 30, 64, 1, true]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.035 + activity * 0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ProtocolRail({ activity }: { activity: number }) {
  const vertices = useMemo(() => {
    const lines: number[] = [];
    const lanes = [-4.5, -1.5, 1.5, 4.5];

    lanes.forEach((x) => {
      lines.push(x, -0.8, -7, x, -0.8, -48);
    });

    for (let z = -8; z >= -48; z -= 5) {
      lines.push(-4.5, -0.8, z, 4.5, -0.8, z);
    }

    return new Float32Array(lines);
  }, []);

  return (
    <group position={[0, -0.4, -3]} scale={0.9 + activity * 0.22}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#bc13fe" transparent opacity={0.08 + activity * 0.32} />
      </lineSegments>

      {Array.from({ length: 6 }, (_, index) => {
        const accent = index % 2 === 0 ? "#00f2ff" : "#bc13fe";
        return (
          <mesh key={`protocol-marker-${index}`} position={[index % 2 === 0 ? -2.1 : 2.1, -0.2, -10 - index * 6.2]}>
            <boxGeometry args={[1.2, 0.18, 0.18]} />
            <meshStandardMaterial
              color="#081018"
              emissive={accent}
              emissiveIntensity={0.22 + activity * 0.95}
              transparent
              opacity={0.2 + activity * 0.58}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GlitchStrips({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const strips = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        position: [(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 8, -4 - Math.random() * 34] as [number, number, number],
        scale: [0.8 + Math.random() * 3.4, 0.025 + Math.random() * 0.06, 1] as [number, number, number],
        color: index % 4 === 0 ? "#ff00e4" : index % 2 === 0 ? "#00f2ff" : "#bc13fe",
        seed: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, index) => {
      child.visible = Math.sin(state.clock.elapsedTime * 4.2 + strips[index].seed + progress * 8) > 0.64;
      child.position.x = strips[index].position[0] + Math.sin(state.clock.elapsedTime * 1.7 + strips[index].seed) * 0.04;
    });
  });

  return (
    <group ref={groupRef}>
      {strips.map((strip, index) => (
        <mesh key={`glitch-strip-${index}`} position={strip.position} scale={strip.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={strip.color} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function HomeThreeScene({ progress, cues, active }: { progress: number; cues: HomeSceneCue[]; active: boolean }) {
  const hero = getActivity(progress, cues, "hero");
  const outcomes = getActivity(progress, cues, "outcomes");
  const infrastructure = getActivity(progress, cues, "infrastructure");
  const performance = getActivity(progress, cues, "performance");
  const protocol = getActivity(progress, cues, "protocol");
  const contact = getActivity(progress, cues, "contact");

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 18, 78]} />

      <ambientLight intensity={0.38} />
      <directionalLight position={[6, 8, 5]} intensity={0.72} color="#9af8ff" />
      <pointLight position={[0, 2.2, -5]} intensity={2.1 + hero * 2.2 + contact * 0.7} color="#00f2ff" distance={42} />
      <pointLight position={[-4, 1.2, -10]} intensity={1.1 + infrastructure * 1.8} color="#bc13fe" distance={46} />
      <pointLight position={[4, -0.2, -14]} intensity={0.75 + performance * 1.6} color="#ff00e4" distance={38} />

      <HomeCameraRig progress={progress} active={active} />
      <DeepGrid progress={progress} />
      <ParticleField active={active} />
      <NeuralCables activity={0.45 + hero + outcomes * 0.42} />
      <FracturedCore activity={Math.max(hero, contact * 0.7)} />
      <OutcomeConstellation activity={outcomes} />
      <ModuleMatrix activity={infrastructure} />
      <DataTunnel activity={performance} />
      <ProtocolRail activity={protocol} />
      <GlitchStrips progress={progress} />
    </>
  );
}

function FallbackBackground({ activeCue }: { activeCue: HomeSceneCue }) {
  return (
    <div className="home-immersive-fallback" aria-hidden="true">
      <img src="/intro-kappa404.jpg" alt="" className="home-immersive-fallback__image" />
      <div className="home-immersive-fallback__grid" />
      <div className="home-immersive-fallback__scan" />
      <div className="home-immersive-fallback__status" style={{ "--cue-accent": activeCue.accent } as CSSProperties} />
    </div>
  );
}

function HudOverlay({ progress, cues }: { progress: number; cues: HomeSceneCue[] }) {
  const activeIndex = getCueIndex(progress, cues);
  const activeCue = cues[activeIndex] ?? cues[0];
  const [start, end] = activeCue.progressRange;
  const localProgress = clamp01((progress - start) / (end - start || 1));

  return (
    <>
      <aside className="home-immersive-hud home-immersive-hud--primary" style={{ "--cue-accent": activeCue.accent } as CSSProperties}>
        <div className="home-immersive-hud__eyebrow">LIVE BACKGROUND // {String(activeIndex + 1).padStart(2, "0")}</div>
        <div className="home-immersive-hud__label">{activeCue.label}</div>
        <div className="home-immersive-hud__bar" aria-hidden="true">
          <span style={{ width: `${Math.round(localProgress * 100)}%` }} />
        </div>
        <div className="home-immersive-hud__lines">
          {activeCue.hudLines.slice(0, 4).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </aside>

      <nav className="home-immersive-hud-nav" aria-label="Sfondo 3D home">
        {cues.map((cue, index) => (
          <span
            key={cue.id}
            className={`home-immersive-hud-nav__item ${index === activeIndex ? "is-active" : ""}`}
            style={{ "--cue-accent": cue.accent } as CSSProperties}
          >
            <span />
            {cue.id}
          </span>
        ))}
      </nav>
    </>
  );
}

export default function HomeImmersiveBackground({ cues }: HomeImmersiveBackgroundProps) {
  const progress = useScrollProgress();
  const hasWebGL = useWebGLStatus();
  const reducedMotion = useReducedMotion();
  const documentHidden = useDocumentHidden();
  const activeCue = cues[getCueIndex(progress, cues)] ?? cues[0];
  const useFallback = reducedMotion || hasWebGL === false;
  const renderActive = hasWebGL === true && !reducedMotion && !documentHidden;

  return (
    <>
      <div className="home-immersive-stage" aria-hidden="true">
        {useFallback ? (
          <FallbackBackground activeCue={activeCue} />
        ) : (
          <Canvas
            dpr={[1, 1.45]}
            camera={{ position: [0, 1.6, 17], fov: 48, near: 0.1, far: 120 }}
            frameloop={renderActive ? "always" : "demand"}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color("#050505"));
              gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
          >
            <Suspense fallback={null}>
              <HomeThreeScene progress={progress} cues={cues} active={renderActive} />
            </Suspense>
          </Canvas>
        )}
      </div>

      <HudOverlay progress={progress} cues={cues} />
    </>
  );
}
