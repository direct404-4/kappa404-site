import PageHero from "@/components/PageHero";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Termini di utilizzo",
  description:
    "Termini di utilizzo Kappa404: condizioni di consultazione del sito, proprieta intellettuale, responsabilita e gestione dei link esterni.",
  path: "/termini",
  noIndex: true
});

export default function TerminiPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // TERMS OF USE"
        title="Termini di utilizzo"
        description="Condizioni generali di consultazione del sito, tutela dei contenuti e responsabilita sui collegamenti esterni."
        chips={["Aggiornati 5 marzo 2026", "Normativa italiana", "Link esterni"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultima modifica: 5 marzo 2026</p>

          <h2>Ambito del servizio</h2>
          <p>
            Il sito presenta attivita, portfolio e contatti professionali di Kappa404. Le informazioni hanno natura descrittiva e non costituiscono offerta vincolante.
          </p>

          <h2>Proprieta intellettuale</h2>
          <p>
            Testi, visual, struttura e asset pubblicati restano di proprieta dei rispettivi titolari e non possono essere riutilizzati senza autorizzazione esplicita.
          </p>

          <h2>Responsabilita</h2>
          <p>
            Kappa404 adotta misure ragionevoli per accuratezza e continuita del sito, ma non garantisce assenza totale di interruzioni, errori o incompatibilita esterne.
          </p>

          <h2>Link esterni</h2>
          <p>
            Eventuali collegamenti a piattaforme terze sono forniti per praticita. La gestione dei contenuti esterni ricade sotto la responsabilita dei rispettivi provider.
          </p>

          <h2>Legge applicabile</h2>
          <p>
            L'utilizzo del sito e regolato dalla normativa italiana applicabile, salvo diverse disposizioni inderogabili previste dalla legge.
          </p>
        </div>
      </section>
    </>
  );
}
