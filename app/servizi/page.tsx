import SectionTitle from "@/components/SectionTitle";
import CardService from "@/components/CardService";
import ContactBlock from "@/components/ContactBlock";
import { SERVICES } from "@/lib/content";

export const metadata = {
  title: "Servizi"
};

export default function ServiziPage() {
  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <SectionTitle
            title="Servizi digitali ad alte prestazioni"
            subtitle="Dalla presenza web alle automazioni AI: ogni modulo e progettato per ridurre complessita e aumentare output operativo."
          />
        </div>
      </section>

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
          />
          <div className="mt-10 grid gap-4">
            <article className="card-shell">
              <h3 className="text-lg font-semibold text-white">In quanto tempo parte un progetto?</h3>
              <p className="mt-2 text-sm text-white/75">In media entro 5-10 giorni lavorativi dopo allineamento scope e priorita.</p>
            </article>
            <article className="card-shell">
              <h3 className="text-lg font-semibold text-white">Lavori anche su stack gia esistenti?</h3>
              <p className="mt-2 text-sm text-white/75">Si, con audit iniziale per stimare vincoli, debt tecnica e margini di ottimizzazione.</p>
            </article>
            <article className="card-shell">
              <h3 className="text-lg font-semibold text-white">Gestisci anche la parte visuale?</h3>
              <p className="mt-2 text-sm text-white/75">Si, direzione creativa e produzione visual sono integrate nel framework operativo.</p>
            </article>
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
