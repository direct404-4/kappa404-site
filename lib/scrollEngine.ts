"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenisSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchViewport = window.matchMedia("(max-width: 1024px)").matches;
    if (reduceMotion || isTouchViewport) return;

    let frame = 0;
    let lenis: Lenis | null = null;

    try {
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.95,
        touchMultiplier: 0.85,
      });

      const onLenisScroll = () => {
        ScrollTrigger.update();
      };

      lenis.on("scroll", onLenisScroll);

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(raf);
      };

      frame = window.requestAnimationFrame(raf);

      return () => {
        window.cancelAnimationFrame(frame);
        lenis?.off("scroll", onLenisScroll);
        lenis?.destroy();
      };
    } catch (error) {
      console.error("Lenis init failed, fallback to native scroll:", error);
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }
  }, [enabled]);
}
