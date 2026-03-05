import ContactBlock from "@/components/ContactBlock";
import SectionTitle from "@/components/SectionTitle";
import { AI_SOLUTIONS } from "@/lib/content";

export const metadata = {
  title: "Soluzioni AI"
};

const workflow = ["Discovery", "Prototype", "Deployment", "Optimization"];

export default function SoluzioniAiPage() {
  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <SectionTitle
            title="Soluzioni AI"
            subtitle="Progettiamo sistemi intelligenti che si integrano nei processi interni senza interrompere la continuita operativa."
          />
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <p className="max-w-3xl text-base text-white/78">
            Ogni soluzione parte da un problema misurabile: il focus non e aggiungere tecnologia, ma ridurre attrito, aumentare precisione e liberare tempo ad alto valore.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AI_SOLUTIONS.map((solution) => (
              <article key={solution} className="card-shell">
                <h3 className="text-lg font-semibold text-white">{solution}</h3>
                <p className="mt-3 text-sm text-white/75">
                  Configurazione progressiva con monitoraggio continuo su risultati, adozione team e stabilita nel tempo.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070a18] py-20">
        <div className="container-main">
          <SectionTitle
            title="Come funziona"
            subtitle="Una sequenza operativa breve e concreta per passare dall'idea al sistema in produzione."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {workflow.map((step, index) => (
              <li key={step} className="card-shell text-sm text-white/80">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan/80">Fase {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-white">{step}</p>
              </li>
            ))}
          </ol>
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
