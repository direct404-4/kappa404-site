"use client";

import Link from "next/link";
import type { Service } from "@/lib/content";

type CardServiceProps = {
  service: Service;
};

export default function CardService({ service }: CardServiceProps) {
  return (
    <article className="group kappa-data-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative flex h-full flex-col">
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="kappa-data-card__label">Service node</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">{service.slug}</span>
        </div>

        <h3 className="font-headline text-2xl font-bold uppercase tracking-[-0.03em] text-white">{service.nome}</h3>
        <p className="mt-4 text-sm leading-7 text-white/72">{service.descrizione}</p>

        <ul className="mt-8 space-y-3 text-sm text-white/76">
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Problema //</span> {service.bullet.problema}
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Include //</span> {service.bullet.include}
          </li>
          <li>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Risultato //</span> {service.bullet.risultato}
          </li>
        </ul>

        <Link
          href={`/servizi/${service.slug}`}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00f2ff] transition-colors hover:text-white"
        >
          Apri servizio <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
