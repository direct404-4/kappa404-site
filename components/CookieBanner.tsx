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
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] md:inset-x-auto md:right-6 md:w-[30rem]">
      <div className="pointer-events-auto overflow-hidden border border-[#00f2ff]/24 bg-[#050b14]/94 shadow-[0_30px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent" />
        <div className="space-y-5 p-5">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#00f2ff]/82">Privacy notice // analytics opt-in</p>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-[-0.03em] text-white">Preferenze cookie</h2>
            <p className="text-sm leading-7 text-white/74">
              Questo sito usa cookie tecnici e memoria locale necessari al funzionamento. Gli analytics vengono attivati solo se li accetti
              esplicitamente. La misurazione opzionale include Vercel Analytics e Vercel Speed Insights. Nessun pixel marketing o profilazione e attivo in
              questa versione.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => writeCookieConsent("accepted")} className="btn-primary">
              Accetta misurazione
            </button>
            <button type="button" onClick={() => writeCookieConsent("rejected")} className="btn-secondary">
              Continua senza misurazione
            </button>
            <Link href="/cookie-policy" className="btn-secondary text-xs uppercase tracking-[0.16em]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
