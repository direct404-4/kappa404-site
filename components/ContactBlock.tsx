"use client";

import { CONTACT_INFO } from "@/lib/content";

export default function ContactBlock() {
  return (
    <div className="card-shell">
      <h3 className="text-2xl font-semibold text-white">Parliamo del tuo prossimo sistema digitale.</h3>
      <p className="mt-4 max-w-2xl text-sm text-white/75">
        Raccontami obiettivo, tempistiche e priorita: riceverai una proposta chiara con direzione tecnica e creativa.
      </p>

      <div className="mt-7 grid gap-4 text-sm text-white/85 md:grid-cols-2">
        <a href={`mailto:${CONTACT_INFO.email}`} className="rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan/70">
          Email
          <span className="mt-1 block text-white">{CONTACT_INFO.email}</span>
        </a>

        <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan/70">
          WhatsApp
          <span className="mt-1 block text-white">+39 352 000 7587</span>
        </a>

        <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan/70">
          Instagram
          <span className="mt-1 block text-white">@kappa404_</span>
        </a>

        <a href={CONTACT_INFO.tiktok} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-4 hover:border-cyan/70">
          TikTok
          <span className="mt-1 block text-white">@amk404_</span>
        </a>
      </div>
    </div>
  );
}
