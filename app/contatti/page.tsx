import ContactBlock from "@/components/ContactBlock";
import SectionTitle from "@/components/SectionTitle";
import { CONTACT_INFO } from "@/lib/content";

export const metadata = {
  title: "Contatti"
};

export default function ContattiPage() {
  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <SectionTitle
            title="Contatti"
            subtitle="Se vuoi costruire un sistema digitale distintivo, qui trovi il canale diretto per iniziare in modo rapido."
          />
        </div>
      </section>

      <section className="section-gap" id="form">
        <div className="container-main grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form className="card-shell space-y-4" action="#" method="post">
            <h2 className="text-2xl font-semibold text-white">Invia una richiesta</h2>
            <p className="text-sm text-white/72">Form UI placeholder: nessun invio viene eseguito in questa versione.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/85">
                Nome
                <input type="text" name="nome" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60" />
              </label>

              <label className="text-sm text-white/85">
                Email
                <input type="email" name="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60" />
              </label>

              <label className="text-sm text-white/85">
                Telefono
                <input type="tel" name="telefono" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60" />
              </label>

              <label className="text-sm text-white/85">
                Tipo progetto
                <input type="text" name="tipo-progetto" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60" />
              </label>

              <label className="text-sm text-white/85">
                Budget
                <input type="text" name="budget" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60" />
              </label>
            </div>

            <label className="block text-sm text-white/85">
              Messaggio
              <textarea
                name="messaggio"
                rows={6}
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan/60"
              />
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
