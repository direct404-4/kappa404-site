import Link from "next/link";
import { CONTACT_INFO, NAV_LINKS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050711]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-xl font-semibold tracking-[0.12em] text-white">Kappa404</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            AI Visual Engineering per brand e business che vogliono un sistema digitale elegante, misurabile e scalabile.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">Navigazione</p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">Social</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={CONTACT_INFO.tiktok} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white">
                TikTok
              </a>
            </li>
            <li>
              <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Kappa404. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/termini" className="hover:text-white">
              Termini
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
