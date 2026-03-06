"use client";

import { useLenisSmoothScroll } from "@/lib/scrollEngine";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroScene() {
  useLenisSmoothScroll(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-seq-chip",
        { opacity: 0, y: 14, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
      )
        .fromTo(
          ".hero-seq-logo",
          { opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1 },
          "-=0.3",
        )
        .fromTo(
          ".hero-seq-copy",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45",
        )
        .fromTo(
          ".hero-seq-cta",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.72, stagger: 0.08 },
          "-=0.35",
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="kappa-cinematic-hero" aria-label="Kappa404 Intro">
      <div className="kappa-hero-deepfade" />
      <div className="kappa-hero-stars" />
      <div className="kappa-hero-digital-noise" />
      <div className="kappa-hero-energy-core" />

      <div ref={containerRef} className="container-main relative z-10 py-24 text-center md:py-32">
        <span className="kappa-hero-chip hero-seq-chip">Digital Architect / AI Creative Technologist</span>

        <h1 className="kappa-hero-title hero-seq-logo kappa-logo-glow">
          KAPPA404
          <span>Digital Vision Craft</span>
        </h1>

        <p className="kappa-hero-copy hero-seq-copy">
          Entra in un ecosistema digitale dove infrastruttura, visual engineering e automazione AI convergono in un unico sistema.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contatti#form" className="btn-primary hero-seq-cta">
            Avvia il progetto
          </Link>
          <Link href="/servizi" className="btn-secondary hero-seq-cta">
            Esplora i servizi
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <span className="kappa-pill">Neural Infrastructure</span>
          <span className="kappa-pill">Data Stream Systems</span>
          <span className="kappa-pill">AI Visual Engineering</span>
        </div>
      </div>
    </section>
  );
}
