import PageHero from "@/components/PageHero";
import { CONTACT_INFO } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Termini e Condizioni",
  description:
    "Termini e Condizioni Kappa404: uso del sito, contenuti, proprieta intellettuale, link esterni, limitazioni e contatti professionali.",
  path: "/termini"
});

export default function TerminiPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // TERMS AND CONDITIONS"
        title="Termini e Condizioni"
        description="Condizioni generali di consultazione del sito, uso dei contenuti, link esterni e contatti professionali."
        chips={["Aggiornati 24 giugno 2026", "Normativa italiana", "Link esterni"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultima modifica: 24 giugno 2026</p>

          <h2>Ambito del sito</h2>
          <p>
            kappa404.it presenta attivita, portfolio, servizi digitali e contatti professionali di Kappa404. Le informazioni pubblicate hanno finalita descrittiva,
            informativa e promozionale e non costituiscono automaticamente un&apos;offerta vincolante, un preventivo definitivo o un contratto.
          </p>

          <h2>Uso consentito</h2>
          <p>
            L&apos;utente puo consultare il sito per informarsi sui servizi, visualizzare contenuti pubblici e contattare Kappa404 tramite i canali indicati. Non e
            consentito usare il sito per attivita illecite, tentativi di accesso non autorizzato, scraping abusivo, interferenze tecniche o invio di contenuti dannosi.
          </p>

          <h2>Servizi, preventivi e collaborazioni</h2>
          <p>
            Ogni eventuale collaborazione viene definita separatamente tramite accordo scritto, preventivo, conferma d&apos;ordine o scambio professionale dedicato.
            Descrizioni, esempi, portfolio e contenuti del sito non garantiscono risultati identici per progetti futuri.
          </p>

          <h2>Proprieta intellettuale</h2>
          <p>
            Testi, struttura, visual, codice, marchi, layout, immagini e asset pubblicati sul sito restano di proprieta dei rispettivi titolari. Non e consentito
            copiare, riutilizzare, distribuire o modificare tali contenuti senza autorizzazione esplicita, salvo usi consentiti dalla legge.
          </p>

          <h2>Link e servizi esterni</h2>
          <p>
            Il sito puo contenere collegamenti a client email, WhatsApp, LinkedIn, Instagram, TikTok, siti di clienti, piattaforme o servizi terzi. Tali collegamenti
            sono forniti per praticita; contenuti, disponibilita, sicurezza e trattamenti dati dei servizi esterni restano sotto la responsabilita dei rispettivi provider.
          </p>

          <h2>Disponibilita e responsabilita</h2>
          <p>
            Kappa404 adotta misure ragionevoli per mantenere il sito aggiornato, accessibile e sicuro, ma non garantisce assenza totale di errori, interruzioni,
            incompatibilita, link non aggiornati o indisponibilita temporanee.
          </p>

          <h2>Privacy e cookie</h2>
          <p>
            Il trattamento dei dati personali e l&apos;uso di strumenti tecnici o di misurazione sono descritti nella Privacy Policy e nella Cookie Policy pubblicate
            sul sito. Le preferenze cookie possono essere modificate dal footer.
          </p>

          <h2>Contatti</h2>
          <p>
            Per richieste relative al sito, ai contenuti o a possibili collaborazioni puoi scrivere a{" "}
            <a href={CONTACT_INFO.emailHref} className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              {CONTACT_INFO.email}
            </a>
            .
          </p>

          <h2>Legge applicabile</h2>
          <p>
            L&apos;utilizzo del sito e regolato dalla normativa italiana applicabile, salvo diverse disposizioni inderogabili previste dalla legge. Eventuali modifiche
            saranno pubblicate in questa pagina con nuova data di aggiornamento.
          </p>
        </div>
      </section>
    </>
  );
}
