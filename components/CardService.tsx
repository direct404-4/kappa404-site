"use client";

import Link from "next/link";
import type { Service } from "@/lib/content";

type CardServiceProps = {
  service: Service;
};

export default function CardService({ service }: CardServiceProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(520px circle at 20% 10%, rgba(0,229,255,0.16), transparent 42%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <h3 className="text-xl font-semibold text-white">{service.nome}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/75">{service.descrizione}</p>

        <ul className="mt-6 space-y-2 text-sm text-white/80">
          <li>
            <span className="text-cyan">Problema:</span> {service.bullet.problema}
          </li>
          <li>
            <span className="text-cyan">Include:</span> {service.bullet.include}
          </li>
          <li>
            <span className="text-cyan">Risultato:</span> {service.bullet.risultato}
          </li>
        </ul>

        <Link href={`/servizi/${service.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-white">
          Vedi servizio <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
