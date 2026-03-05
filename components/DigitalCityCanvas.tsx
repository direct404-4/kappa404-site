"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DigitalCityCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, section.clientWidth / window.innerHeight, 0.1, 150);
    camera.position.set(0, 2.8, 30);

    const city = new THREE.Group();

    for (let i = 0; i < 44; i += 1) {
      const width = 0.8 + Math.random() * 1.6;
      const height = 1 + Math.random() * 8;
      const depth = 0.8 + Math.random() * 1.4;

      const box = new THREE.BoxGeometry(width, height, depth);
      const edges = new THREE.EdgesGeometry(box);
      const material = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0x90d7ff : 0xb48bff,
        transparent: true,
        opacity: 0.38
      });

      const wire = new THREE.LineSegments(edges, material);
      wire.position.set((Math.random() - 0.5) * 26, height / 2 - 4, (Math.random() - 0.5) * 50);
      city.add(wire);
    }

    const streamPoints = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i += 1) {
      streamPoints[i * 3] = (Math.random() - 0.5) * 28;
      streamPoints[i * 3 + 1] = (Math.random() - 0.3) * 10;
      streamPoints[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }

    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute("position", new THREE.BufferAttribute(streamPoints, 3));

    const streamMaterial = new THREE.PointsMaterial({
      color: 0xffb14a,
      size: 0.09,
      transparent: true,
      opacity: 0.8
    });

    const streams = new THREE.Points(streamGeometry, streamMaterial);
    scene.add(city);
    scene.add(streams);

    const onResize = () => {
      const width = section.clientWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    onResize();

    const flyThrough = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true
      }
    });

    flyThrough.to(
      camera.position,
      {
        z: 12,
        y: 1.4,
        ease: "none"
      },
      0
    );

    flyThrough.to(
      camera.rotation,
      {
        x: -0.08,
        y: 0.1,
        ease: "none"
      },
      0
    );

    let raf = 0;
    let hidden = false;

    const onVisibility = () => {
      hidden = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      if (hidden) {
        return;
      }

      if (!reducedMotion) {
        streams.rotation.y += 0.0016;
        city.rotation.y += 0.0007;
      }

      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(raf);
      flyThrough.kill();

      city.children.forEach((child) => {
        if (child instanceof THREE.LineSegments) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });

      streamGeometry.dispose();
      streamMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[170vh] bg-[#060816]">
      <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-white/10">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="pointer-events-none absolute left-1/2 top-20 w-full max-w-5xl -translate-x-1/2 px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan/70">Wireframe Scene</p>
          <h3 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Digital City Simulation</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/75 md:text-base">
            Infrastruttura visiva tridimensionale con data streams dorati: una metafora operativa per sistemi AI e software ad alte prestazioni.
          </p>
        </div>
      </div>
    </section>
  );
}
