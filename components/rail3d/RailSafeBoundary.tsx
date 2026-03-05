"use client";

import React from "react";

type RailSafeBoundaryProps = {
  children: React.ReactNode;
};

type RailSafeBoundaryState = {
  hasError: boolean;
};

export default class RailSafeBoundary extends React.Component<RailSafeBoundaryProps, RailSafeBoundaryState> {
  constructor(props: RailSafeBoundaryProps) {
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
        <section className="relative h-screen border-y border-white/10 bg-[#030611]">
          <div className="container-main flex h-full items-center justify-center">
            <div className="max-w-xl rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
              <p className="mt-3 text-sm text-white/78">La scena 3D non è disponibile in questo browser.</p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
