"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroImageIntroProps = {
  imageSrc: string;
  title: string;
  subtitle: string;
  primaryCtaHref: string;
  secondaryCtaHref: string;
};

export default function HeroImageIntro({
  imageSrc,
  title,
  subtitle,
  primaryCtaHref,
  secondaryCtaHref
}: HeroImageIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const image = imageRef.current;
    const glow = glowRef.current;
    const sweep = sweepRef.current;
    const dust = dustRef.current;

    if (!root || !image || !glow || !sweep || !dust) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const animations: gsap.core.Animation[] = [];

    gsap.set(image, { scale: 1.02, x: 0, y: 0 });
    gsap.set(glow, { opacity: 0.45 });
    gsap.set(dust, { opacity: isMobile ? 0.28 : 0.45 });

    let rafId = 0;
    let onPointerMove: ((event: PointerEvent) => void) | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onVisibility = () => {
      const paused = document.hidden;
      animations.forEach((animation) => animation.paused(paused));
    };

    if (!reduceMotion) {
      const timeline = gsap.timeline({ paused: false, defaults: { ease: "sine.inOut" } });

      timeline
        .to(image, { scale: 1.1, duration: 14, yoyo: true, repeat: -1 }, 0)
        .to(image, { xPercent: 1.8, yPercent: -1.2, duration: 11, yoyo: true, repeat: -1 }, 0)
        .to(glow, { opacity: 0.8, duration: 2.8, yoyo: true, repeat: -1 }, 0)
        .to(dust, { opacity: isMobile ? 0.35 : 0.6, duration: 3.6, yoyo: true, repeat: -1 }, 0);
      animations.push(timeline);

      const sweepAnimation = gsap.fromTo(
        sweep,
        { xPercent: -120, opacity: 0 },
        {
          xPercent: 120,
          opacity: isMobile ? 0.2 : 0.38,
          duration: 5.5,
          repeat: -1,
          ease: "power1.inOut"
        }
      );
      animations.push(sweepAnimation);

      const scrollAnimation = gsap.to(root, {
        y: -80,
        rotateX: 1.5,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      animations.push(scrollAnimation);

      if (!isMobile) {
        const animateParallax = () => {
          currentX += (targetX - currentX) * 0.08;
          currentY += (targetY - currentY) * 0.08;
          gsap.set(image, { x: currentX, y: currentY });
          gsap.set(glow, { x: currentX * 0.7, y: currentY * 0.7 });
          rafId = window.requestAnimationFrame(animateParallax);
        };

        onPointerMove = (event: PointerEvent) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 24;
          const y = (event.clientY / window.innerHeight - 0.5) * 24;
          targetX = x;
          targetY = y;
        };

        rafId = window.requestAnimationFrame(animateParallax);
        window.addEventListener("pointermove", onPointerMove);
      }
    } else {
      const fadeAnimation = gsap.fromTo(root, { opacity: 0.7 }, { opacity: 1, duration: 0.8, ease: "power1.out" });
      animations.push(fadeAnimation);
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (onPointerMove) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      document.removeEventListener("visibilitychange", onVisibility);
      animations.forEach((animation) => animation.kill());
      gsap.killTweensOf([image, glow, sweep, dust, root]);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 z-10 overflow-hidden">
      <img ref={imageRef} src={imageSrc} alt="Kappa404 intro visual" className="h-full w-full object-cover" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[58%] h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,240,255,0.55),rgba(123,96,255,0.25)_45%,transparent_70%)] blur-2xl"
      />

      <div
        ref={sweepRef}
        className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent mix-blend-screen blur-2xl"
      />

      <div
        ref={dustRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.28)_0%,transparent_20%),radial-gradient(circle_at_72%_30%,rgba(130,198,255,0.24)_0%,transparent_22%),radial-gradient(circle_at_80%_80%,rgba(195,142,255,0.24)_0%,transparent_18%)]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(2,2,10,0.72)_100%)]" />

      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-20 md:px-6 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan/85">Digital Vision Craft</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">{subtitle}</p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <Link href={primaryCtaHref} className="btn-primary">
              Inizia ora
            </Link>
            <Link href={secondaryCtaHref} className="btn-secondary">
              Scopri i progetti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
