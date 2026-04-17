"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = NAV_LINKS.filter((item) => item.href !== "/");

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b border-[#00f2ff]/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_18px_rgba(0,242,255,0.9)]" />
          <span className="font-headline text-xl font-black tracking-tighter text-[#00f2ff] drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">
            KAPPA404
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`kappa-nav-link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-[#00f2ff]/14 bg-[#00f2ff]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00f2ff]/78 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_14px_rgba(0,242,255,0.8)]" />
            System online
          </div>

          <Link href="/contatti" className="btn-secondary px-4 py-3 text-[10px]">
            Contatti
          </Link>
        </div>
      </div>
    </header>
  );
}
