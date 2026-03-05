"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FiberItem = {
  mesh: THREE.Mesh;
  seed: number;
  baseRotationZ: number;
  baseY: number;
};

export default function HeroFiberCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    if (!wrap || !canvas) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.z = 18;

    const group = new THREE.Group();
    scene.add(group);

    const fibers: FiberItem[] = [];
    const fiberCount = 16;

    for (let i = 0; i < fiberCount; i += 1) {
      const spread = (i / (fiberCount - 1) - 0.5) * 16;
      const points = Array.from({ length: 6 }).map((_, index) => {
        const t = index / 5;
        const jitter = (Math.random() - 0.5) * 1.2;
        return new THREE.Vector3(spread + jitter, (t - 0.5) * 12, (Math.random() - 0.5) * 7);
      });

      const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
      const geometry = new THREE.TubeGeometry(curve, 120, 0.06 + Math.random() * 0.05, 8, false);
      const hue = i % 2 === 0 ? 0x7df2ff : 0xa27dff;
      const material = new THREE.MeshBasicMaterial({
        color: hue,
        transparent: true,
        opacity: 0.38
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = (Math.random() - 0.5) * 1.8;
      mesh.rotation.z = (Math.random() - 0.5) * 0.3;
      group.add(mesh);

      fibers.push({
        mesh,
        seed: Math.random() * Math.PI * 2,
        baseRotationZ: mesh.rotation.z,
        baseY: mesh.position.y
      });
    }

    group.scale.set(1, 1, 1);

    const spreadAnimation = gsap.to(group.scale, {
      x: 1.35,
      y: 1.25,
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const tiltAnimation = gsap.to(group.rotation, {
      x: 0.22,
      y: 0.16,
      z: 0.12,
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const clock = new THREE.Clock();
    let raf = 0;
    let stopped = false;

    const onVisibility = () => {
      stopped = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibility);

    const render = () => {
      raf = window.requestAnimationFrame(render);
      if (stopped) {
        return;
      }

      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        fibers.forEach((fiber, index) => {
          const wave = Math.sin(t * 0.65 + fiber.seed + index * 0.22) * 0.08;
          const drift = Math.cos(t * 0.48 + fiber.seed) * 0.12;
          fiber.mesh.rotation.z = fiber.baseRotationZ + wave;
          fiber.mesh.position.y = fiber.baseY + drift;
        });
      }

      renderer.render(scene, camera);
    };

    const onResize = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener("resize", onResize);
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(raf);
      spreadAnimation.kill();
      tiltAnimation.kill();
      fibers.forEach((fiber) => {
        fiber.mesh.geometry.dispose();
        (fiber.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-[5]">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
