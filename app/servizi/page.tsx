import JsonLd from "@/components/JsonLd";
import SectionTitle from "@/components/SectionTitle";
import CardService from "@/components/CardService";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { SERVICE_FAQS, SERVICES } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, servicesItemListJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Servizi",
  description:
    "Servizi digitali Kappa404: web development, landing page, e-commerce, automazioni AI, software custom e pipeline video/content per brand premium.",
  path: "/servizi"
});

export default function ServiziPage() {
  return (
    <>
      <JsonLd
        id="kappa404-servizi-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Servizi", path: "/servizi" }
        ])}
      />
      <JsonLd id="kappa404-servizi-list" data={servicesItemListJsonLd(SERVICES)} />
      <JsonLd id="kappa404-servizi-faq" data={faqJsonLd(SERVICE_FAQS)} />
      <PageHero
        eyebrow="SYSTEM MAP // SERVICE MODULES"
        title="Servizi digitali ad alte prestazioni"
        description="Dalla presenza web alle automazioni AI: ogni modulo e progettato per ridurre complessita, aumentare output operativo e mantenere la stessa identita della homepage."
        chips={["Web ecosystems", "Landing funnels", "Automation stacks"]}
      />

      <section className="section-gap">
        <div className="container-main grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <CardService key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070a18] py-20">
        <div className="container-main">
          <SectionTitle
            title="Metodo operativo: Starter / Pro / Custom"
            subtitle="Tre livelli di attivazione in base a priorita, complessita tecnica e ritmo di rilascio richiesto dal progetto."
            eyebrow="Delivery model // release modes"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="card-shell">
              <h3 className="text-xl font-semibold text-white">Starter</h3>
              <p className="mt-3 text-sm text-white/75">Per validare rapidamente una direzione concreta con obiettivi e KPI essenziali.</p>
            </article>
            <article className="card-shell">
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <p className="mt-3 text-sm text-white/75">Per chi vuole accelerare rilascio e integrazione con una roadmap strutturata multi-step.</p>
            </article>
            <article className="card-shell">
              <h3 className="text-xl font-semibold text-white">Custom</h3>
              <p className="mt-3 text-sm text-white/75">Per ecosistemi complessi con requisiti dedicati, software su misura e governance tecnica completa.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="FAQ essenziali"
            subtitle="Domande ricorrenti prima di avviare una collaborazione tecnica e creativa con Kappa404."
            eyebrow="Support node // quick answers"
          />
          <div className="mt-10 grid gap-4">
            {SERVICE_FAQS.map((faq) => (
              <article key={faq.question} className="card-shell">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-white/75">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="container-main">
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
