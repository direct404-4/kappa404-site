"use client";

import dynamic from "next/dynamic";
import RailSafeBoundary from "@/components/rail3d/RailSafeBoundary";

const RailStage = dynamic(() => import("@/components/rail3d/RailStage"), {
  ssr: false,
  loading: () => (
    <section className="relative h-screen border-y border-white/10 bg-[#020611]">
      <div className="container-main flex h-full items-center justify-center">
        <p className="rounded-full border border-cyan/35 bg-cyan/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
          Initializing WebGL Rail...
        </p>
      </div>
    </section>
  ),
});

export default function PortfolioSceneSlot() {
  return (
    <RailSafeBoundary>
      <RailStage />
    </RailSafeBoundary>
  );
}
