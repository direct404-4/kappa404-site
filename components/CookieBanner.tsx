"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_UPDATED_EVENT,
  readCookieConsent,
  writeCookieConsent
} from "@/lib/cookie-consent";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      setVisible(readCookieConsent() === null);
    };

    const openBanner = () => {
      setVisible(true);
    };

    setMounted(true);
    syncVisibility();

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, syncVisibility as EventListener);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openBanner as EventListener);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, syncVisibility as EventListener);
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openBanner as EventListener);
    };
  }, []);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:right-5 md:w-[27rem]">
      <section
        aria-label="Preferenze cookie"
        className="pointer-events-auto overflow-hidden border border-[#00f2ff]/24 bg-[#050b14]/94 shadow-[0_30px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent" />
        <div className="space-y-3 p-3 md:space-y-4 md:p-4">
          <div className="space-y-1.5 md:space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#00f2ff]/82">Privacy notice // opt-in</p>
            <h2 className="font-headline text-lg font-bold uppercase tracking-[-0.03em] text-white md:text-xl">Preferenze cookie</h2>
            <p className="text-xs leading-5 text-white/74 md:text-sm md:leading-6">
              Usiamo memoria locale necessaria per ricordare la scelta. Analytics e Speed Insights partono solo se accetti. Leggi{" "}
              <Link href="/privacy-policy" className="underline decoration-white/25 underline-offset-4 hover:text-[#00f2ff]">
                Privacy Policy
              </Link>{" "}
              e{" "}
              <Link href="/cookie-policy" className="underline decoration-white/25 underline-offset-4 hover:text-[#00f2ff]">
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-[1fr_1fr_auto]">
            <button type="button" onClick={() => writeCookieConsent("accepted")} className="btn-primary justify-center px-4 py-3 text-[10px]">
              Accetta misurazione
            </button>
            <button type="button" onClick={() => writeCookieConsent("rejected")} className="btn-secondary justify-center px-4 py-3 text-[10px]">
              Solo tecnici
            </button>
            <Link href="/cookie-policy" className="btn-secondary col-span-2 justify-center px-4 py-3 text-[10px] uppercase tracking-[0.16em] md:col-span-1">
              Cookie Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
