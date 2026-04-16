import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { CONTACT_INFO } from "@/lib/content";

export const metadata = {
  title: "Contatti"
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="UPLINK // CONTACT CHANNELS"
        title="Contatti"
        description="Se vuoi costruire un sistema digitale distintivo, qui trovi il canale diretto per iniziare con la stessa continuita visiva e narrativa della homepage."
        chips={["WhatsApp", "Instagram", "Milano"]}
        actions={[{ label: "Apri WhatsApp", href: CONTACT_INFO.whatsapp, external: true }]}
      />

      <section className="section-gap" id="form">
        <div className="container-main grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form className="kappa-contact-panel space-y-4" action="#" method="post">
            <p className="kappa-section-tag">FORM // PROJECT INTAKE</p>
            <h2 className="text-2xl font-semibold text-white">Invia una richiesta</h2>
            <p className="text-sm text-white/72">Form UI placeholder: nessun invio viene eseguito in questa versione.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/85">
                Nome
                <input type="text" name="nome" className="kappa-proto-input mt-2" />
              </label>

              <label className="text-sm text-white/85">
                Canale preferito
                <input type="text" name="canale" placeholder="WhatsApp, Instagram o TikTok" className="kappa-proto-input mt-2" />
              </label>

              <label className="text-sm text-white/85">
                Telefono
                <input type="tel" name="telefono" className="kappa-proto-input mt-2" />
              </label>

              <label className="text-sm text-white/85">
                Tipo progetto
                <input type="text" name="tipo-progetto" className="kappa-proto-input mt-2" />
              </label>

              <label className="text-sm text-white/85">
                Budget
                <input type="text" name="budget" className="kappa-proto-input mt-2" />
              </label>
            </div>

            <label className="block text-sm text-white/85">
              Messaggio
              <textarea name="messaggio" rows={6} className="kappa-proto-input mt-2 min-h-32 resize-y" />
            </label>

            <button type="button" className="btn-primary">
              Invia richiesta
            </button>
          </form>

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
