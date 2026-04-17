import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import WhatsAppProjectForm from "@/components/WhatsAppProjectForm";
import { CONTACT_INFO } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contatti",
  description:
    "Contatta Kappa404 via WhatsApp, Instagram o TikTok per avviare un progetto web, software custom, automazione AI o contenuto visuale premium.",
  path: "/contatti"
});

export default function ContattiPage() {
  return (
    <>
      <JsonLd
        id="kappa404-contatti-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contatti", path: "/contatti" }
        ])}
      />
      <PageHero
        eyebrow="UPLINK // CONTACT CHANNELS"
        title="Contatti"
        description="Se vuoi costruire un sistema digitale distintivo, qui trovi il canale diretto per iniziare con la stessa continuita visiva e narrativa della homepage."
        chips={["WhatsApp", "Instagram", "Milano"]}
        actions={[{ label: "Apri WhatsApp", href: CONTACT_INFO.whatsapp, external: true }]}
      />

      <section className="section-gap" id="form">
        <div className="container-main grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <WhatsAppProjectForm mode="contact" />

          <ContactBlock />
        </div>
      </section>

      <a
        href={CONTACT_INFO.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-40 rounded-full border border-cyan/70 bg-[#0a132d]/95 px-4 py-2 text-sm text-white shadow-glow md:hidden"
      >
        WhatsApp
      </a>
    </>
  );
}
