"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useEffect, useState } from "react";

type UseScrollTimelineArgs = {
  triggerRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLElement | null>;
};

export function useScrollTimeline({ triggerRef, pinRef }: UseScrollTimelineArgs) {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    if (!trigger || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        pin,
        pinSpacing: false,
        start: "top top",
        end: "bottom top",
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const value = self.progress;
          setProgress((prev) => (Math.abs(prev - value) > 0.001 ? value : prev));
        },
        onToggle: (self) => setIsActive(self.isActive),
      });
    }, trigger);

    return () => {
      ctx.revert();
    };
  }, [triggerRef, pinRef]);

  return { progress, isActive };
}
