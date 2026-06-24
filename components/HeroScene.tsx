"use client";

import { HOME_HERO } from "@/lib/content";
import { useLenisSmoothScroll } from "@/lib/scrollEngine";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroScene() {
  useLenisSmoothScroll(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const primaryCtaIsExternal = HOME_HERO.primaryCta.href.startsWith("http");

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
          ".hero-seq-metadata",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
          "-=0.35",
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
    <section className="kappa-command-hero" aria-label="Kappa404 Intro">
      <div className="kappa-hero-media">
        <img src={HOME_HERO.backgroundImage} alt={HOME_HERO.backgroundAlt} className="kappa-hero-media__image" />
      </div>
      <div className="kappa-hero-deepfade" />
      <div className="kappa-hero-dot-grid" />
      <div className="kappa-hero-grid-plane" />
      <div className="kappa-hero-energy-core" />
      <div className="kappa-hero-noise" />

      <div ref={containerRef} className="container-main relative z-10 flex min-h-[calc(100svh-4rem)] items-center justify-center py-16 text-center md:py-20">
        <div className="max-w-5xl">
          <span className="kappa-command-chip hero-seq-chip">
            <span className="kappa-command-chip__dot" />
            {HOME_HERO.eyebrow}
          </span>

          <p className="hero-seq-copy mt-8 font-mono text-[0.7rem] uppercase tracking-[0.34em] text-[rgba(138,210,227,0.7)]">
            KAPPA404 // Neural Infrastructure Platform
          </p>

          <h1 className="kappa-command-title hero-seq-logo">
            {HOME_HERO.title}
            <span>{HOME_HERO.highlight}</span>
          </h1>

          <p className="kappa-command-copy hero-seq-copy mx-auto">{HOME_HERO.description}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={HOME_HERO.primaryCta.href}
              target={primaryCtaIsExternal ? "_blank" : undefined}
              rel={primaryCtaIsExternal ? "noreferrer" : undefined}
              className="btn-primary hero-seq-cta"
            >
              {HOME_HERO.primaryCta.label}
            </a>
            <Link href={HOME_HERO.secondaryCta.href} className="btn-secondary hero-seq-cta">
              {HOME_HERO.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {HOME_HERO.metadata.map((item) => (
              <span key={item} className="kappa-signal-pill hero-seq-metadata">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
