import PageHero from "@/components/PageHero";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie Policy Kappa404: cookie tecnici, memoria locale per consenso e misurazione Vercel opzionale caricata solo dopo accettazione esplicita.",
  path: "/cookie-policy",
  noIndex: true
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // COOKIE POLICY"
        title="Cookie Policy"
        description="Informazioni su cookie tecnici, memoria locale e strumenti opzionali di misurazione attivati solo dopo consenso esplicito dell'utente."
        chips={["Aggiornata 14 aprile 2026", "Tecnici + opt-in measurement", "No marketing pixel"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultimo aggiornamento: 14 aprile 2026</p>

          <h2>Stato attuale del sito</h2>
          <p>
            Alla data del 14 aprile 2026, kappa404.it non utilizza cookie di profilazione, remarketing o advertising pixel. Il sito usa strumenti tecnici
            necessari al funzionamento e puo attivare Vercel Web Analytics e Vercel Speed Insights solo dopo consenso espresso tramite banner.
          </p>

          <h2>Categorie di strumenti utilizzati</h2>
          <ul>
            <li>Cookie o strumenti tecnici strettamente necessari per erogare il sito e mantenerne sicurezza, stabilita e continuita operativa.</li>
            <li>Memoria locale del browser per registrare la scelta dell&apos;utente in materia di misurazione opzionale.</li>
            <li>Vercel Web Analytics e Vercel Speed Insights, usati in forma aggregata e attivati solo dopo accettazione esplicita.</li>
          </ul>

          <h2>Banner e consenso</h2>
          <p>
            Al primo accesso viene mostrato un banner che permette di accettare o rifiutare la misurazione opzionale. Se l&apos;utente non accetta, gli strumenti
            di misurazione restano disattivati e la navigazione continua normalmente. La scelta puo essere modificata in qualsiasi momento dal comando
            &quot;Preferenze cookie&quot; presente nel footer.
          </p>

          <h2>Strumento di misurazione attualmente previsto</h2>
          <p>
            Il sito integra Vercel Web Analytics e Vercel Speed Insights esclusivamente in modalita opt-in. In assenza di consenso, i componenti non vengono
            caricati. In caso di consenso, gli strumenti vengono usati per statistiche aggregate di traffico, utilizzo e performance delle pagine.
          </p>

          <h2>Preferenza salvata nel browser</h2>
          <ul>
            <li>Chiave tecnica utilizzata: <code>{COOKIE_CONSENT_STORAGE_KEY}</code>.</li>
            <li>Finalita: ricordare se l&apos;utente ha accettato o rifiutato gli strumenti opzionali di misurazione.</li>
            <li>Natura: tecnica, necessaria alla gestione della preferenza privacy.</li>
            <li>Durata: fino a modifica manuale o cancellazione dei dati locali dal browser.</li>
          </ul>

          <h2>Servizi esterni raggiunti tramite link</h2>
          <p>
            Quando l&apos;utente apre WhatsApp, Instagram, TikTok o altri servizi esterni dal sito, il successivo trattamento avviene sui domini dei rispettivi
            provider e secondo le loro privacy e cookie policy. Tali trattamenti non sono gestiti direttamente da kappa404.it.
          </p>

          <h2>Come gestire o revocare la scelta</h2>
          <ul>
            <li>Usare il comando &quot;Preferenze cookie&quot; nel footer per riaprire il banner e aggiornare la scelta.</li>
            <li>Bloccare o cancellare cookie e dati locali dalle impostazioni del browser.</li>
            <li>Cancellare la memoria locale del browser se si desidera eliminare la preferenza salvata su questo sito.</li>
          </ul>

          <h2>Aggiornamenti</h2>
          <p>
            La presente cookie policy viene aggiornata quando cambiano strumenti tecnici, strumenti di misurazione, servizi terzi o obblighi normativi
            applicabili al sito.
          </p>

          <div className="mt-10">
            <CookiePreferencesButton />
          </div>
        </div>
      </section>
    </>
  );
}
