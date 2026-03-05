import Link from "next/link";
import type { Service } from "@/lib/content";

type CardServiceProps = {
  service: Service;
};

export default function CardService({ service }: CardServiceProps) {
  return (
    <article className="card-shell flex h-full flex-col">
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

      <Link href={`/servizi/${service.slug}`} className="mt-7 inline-flex text-sm font-medium text-cyan hover:text-white">
        Vedi servizio →
      </Link>
    </article>
  );
}
