"use client";

import React from "react";
import RailStage from "@/components/rail3d/RailStage";

type StageBoundaryProps = {
  children: React.ReactNode;
};

type StageBoundaryState = {
  hasError: boolean;
};

class StageBoundary extends React.Component<StageBoundaryProps, StageBoundaryState> {
  constructor(props: StageBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("RailStage runtime error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative h-screen border-y border-white/10 bg-[#02040f]">
          <div className="container-main flex h-full items-center justify-center px-6">
            <div className="rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
              <p className="mt-3 text-sm text-white/76">Errore runtime nella scena 3D. Il resto della pagina resta disponibile.</p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default function PortfolioSceneSlot() {
  return (
    <StageBoundary>
      <RailStage />
    </StageBoundary>
  );
}
