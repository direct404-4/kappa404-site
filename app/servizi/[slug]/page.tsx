import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactBlock from "@/components/ContactBlock";
import CardService from "@/components/CardService";
import { SERVICES } from "@/lib/content";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Servizio non trovato" };
  }

  return {
    title: service.nome,
    description: service.descrizione
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const related = SERVICES.filter((item) => item.slug !== service.slug).slice(0, 2);

  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060915]">
        <div className="container-main">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan/70">Servizio</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{service.nome}</h1>
          <p className="mt-5 max-w-3xl text-base text-white/78">{service.descrizione}</p>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main grid gap-6 md:grid-cols-2">
          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Problema da risolvere</h2>
            <p className="mt-4 text-sm text-white/76">{service.bullet.problema}</p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Soluzione proposta</h2>
            <p className="mt-4 text-sm text-white/76">
              Un framework dedicato che combina sviluppo modulare, direzione visuale e monitoraggio continuo per mantenere coerenza e risultati.
            </p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Cosa include</h2>
            <p className="mt-4 text-sm text-white/76">{service.bullet.include}</p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Risultati attesi</h2>
            <p className="mt-4 text-sm text-white/76">{service.bullet.risultato}</p>
          </article>
        </div>
      </section>

      <section className="section-gap border-y border-white/10 bg-[#070a18]">
        <div className="container-main">
          <h2 className="text-2xl font-semibold text-white">Servizi correlati</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <CardService key={item.slug} service={item} />
            ))}
          </div>
          <div className="mt-7">
            <Link href="/servizi" className="btn-secondary">
              Torna a tutti i servizi
            </Link>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
