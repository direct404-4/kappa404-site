import Link from "next/link";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { NAV_LINKS } from "@/lib/content";

export default function Footer() {
  const primaryLinks = NAV_LINKS.filter((link) => link.href !== "/");

  return (
    <footer className="w-full border-t border-[#00f2ff]/5 bg-[#050505] py-12">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 md:grid-cols-[1.15fr_0.85fr_0.8fr] md:px-10">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#00f2ff] opacity-70">
            ©2026 KAPPA404 // DIGITAL SYSTEMS
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]/52">
              <span className="h-2 w-2 rounded-full bg-[#00f2ff] shadow-[0_0_14px_rgba(0,242,255,0.9)]" />
              System online
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]/52">
              <span className="h-2 w-2 rounded-full bg-[#bc13fe] shadow-[0_0_14px_rgba(188,19,254,0.8)]" />
              Secure routing
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">Primary pages</p>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="kappa-nav-link w-fit">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">Legal</p>
          <Link href="/privacy-policy" className="kappa-nav-link w-fit">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="kappa-nav-link w-fit">
            Cookie Policy
          </Link>
          <CookiePreferencesButton />
          <Link href="/termini" className="kappa-nav-link w-fit">
            Termini
          </Link>
        </div>
      </div>
    </footer>
  );
}
