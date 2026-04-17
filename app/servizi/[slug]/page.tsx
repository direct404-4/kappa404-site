import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/ContactBlock";
import CardService from "@/components/CardService";
import PageHero from "@/components/PageHero";
import { SERVICES } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from "@/lib/seo";

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
    ...createPageMetadata({
      title: service.nome,
      description: service.descrizione,
      path: `/servizi/${service.slug}`
    })
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
      <JsonLd
        id={`kappa404-service-${service.slug}-breadcrumb`}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Servizi", path: "/servizi" },
          { name: service.nome, path: `/servizi/${service.slug}` }
        ])}
      />
      <JsonLd id={`kappa404-service-${service.slug}`} data={serviceJsonLd(service)} />
      <PageHero
        eyebrow={`SERVICE NODE // ${service.slug.toUpperCase()}`}
        title={service.nome}
        description={service.descrizione}
        chips={["Problema reale", "Soluzione modulare", "Output misurabile"]}
        actions={[
          { label: "Tutti i servizi", href: "/servizi", tone: "secondary" },
          { label: "Richiedi contatto", href: "/contatti" }
        ]}
      />

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
          <h2 className="font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">Servizi correlati</h2>
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
