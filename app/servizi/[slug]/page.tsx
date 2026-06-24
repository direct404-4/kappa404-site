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
            <p className="mt-4 text-sm text-white/76">{service.solution}</p>
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
        <div className="container-main grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kappa-section-tag">SERVICE DEPTH</p>
            <h2 className="mt-4 font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">
              Esempio operativo e processo
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/76">{service.example}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="card-shell">
              <h3 className="text-lg font-semibold text-white">Processo</h3>
              <ol className="mt-5 space-y-3 text-sm text-white/76">
                {service.process.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="card-shell">
              <h3 className="text-lg font-semibold text-white">Deliverable</h3>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-white/76">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card-shell md:col-span-2">
              <h3 className="text-lg font-semibold text-white">Cosa serve per partire</h3>
              <ul className="mt-5 grid gap-2 text-sm text-white/76 md:grid-cols-3">
                {service.entryCriteria.map((item) => (
                  <li key={item} className="border border-white/10 bg-white/[0.03] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section-gap">
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
