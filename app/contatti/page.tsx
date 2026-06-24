import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import WhatsAppProjectForm from "@/components/WhatsAppProjectForm";
import { CONTACT_INFO } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contatti",
  description:
    "Contatta Kappa404 via email professionale, WhatsApp o LinkedIn per avviare un progetto web, software custom, automazione AI o contenuto visuale premium.",
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
        description="Se vuoi costruire un sistema digitale distintivo, usa la mail professionale per richieste strutturate o WhatsApp per un primo allineamento rapido."
        chips={["Email", "WhatsApp", "LinkedIn", "Milano"]}
        actions={[
          { label: "Scrivi via email", href: CONTACT_INFO.emailHref },
          { label: "Apri WhatsApp", href: CONTACT_INFO.whatsapp, external: true, tone: "secondary" }
        ]}
      />

      <section className="section-gap" id="form">
        <div className="container-main grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <WhatsAppProjectForm mode="contact" />

          <ContactBlock />
        </div>
      </section>
    </>
  );
}
