"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = NAV_LINKS.filter((item) => item.href !== "/");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b border-[#00f2ff]/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="flex min-h-11 shrink-0 items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_18px_rgba(0,242,255,0.9)]" aria-hidden="true" />
          <span className="font-headline text-xl font-black tracking-tighter text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">
            KAPPA404
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.label} href={item.href} className={`kappa-nav-link ${isActive ? "is-active" : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-[#00f2ff]/14 bg-[#00f2ff]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00f2ff]/78 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_14px_rgba(0,242,255,0.8)]" aria-hidden="true" />
            System online
          </div>

          <Link href="/contatti" className="btn-secondary px-4 py-3 text-[10px]">
            Contatti
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
            aria-controls="kappa-mobile-menu"
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] transition hover:bg-[#00f2ff]/10 lg:hidden"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="kappa-mobile-menu"
          className="absolute left-0 right-0 top-16 border-b border-[#00f2ff]/10 bg-[#050505]/96 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
        >
          <nav className="grid gap-2">
            {NAV_LINKS.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`kappa-nav-link border border-white/10 bg-white/[0.02] px-4 py-3 ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
