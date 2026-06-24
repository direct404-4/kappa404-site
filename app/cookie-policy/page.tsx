import Link from "next/link";
import PageHero from "@/components/PageHero";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie Policy Kappa404: strumenti tecnici, memoria locale per preferenze privacy e misurazione Vercel opzionale caricata solo dopo consenso.",
  path: "/cookie-policy"
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // COOKIE POLICY"
        title="Cookie Policy"
        description="Informazioni su strumenti tecnici, memoria locale e misurazione opzionale attivata solo dopo consenso esplicito."
        chips={["Aggiornata 24 giugno 2026", "Tecnici + opt-in measurement", "No marketing pixel"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultimo aggiornamento: 24 giugno 2026</p>

          <h2>Stato attuale del sito</h2>
          <p>
            Alla data del 24 giugno 2026 kappa404.it non usa cookie di profilazione, remarketing, advertising pixel o strumenti pubblicitari. Il sito usa
            strumenti tecnici necessari e puo attivare Vercel Web Analytics e Vercel Speed Insights solo dopo consenso espresso.
          </p>

          <h2>Strumenti utilizzati</h2>
          <ul>
            <li>Strumenti tecnici necessari per erogare il sito, mantenere sicurezza, stabilita, routing, caching e continuita operativa.</li>
            <li>Memoria locale del browser per ricordare la scelta dell&apos;utente sulle misurazioni opzionali.</li>
            <li>Vercel Web Analytics per statistiche aggregate sul traffico, senza cookie di terze parti, attivato solo dopo consenso.</li>
            <li>Vercel Speed Insights per metriche prestazionali e Core Web Vitals, attivato solo dopo consenso.</li>
          </ul>

          <h2>Preferenza salvata nel browser</h2>
          <ul>
            <li>Chiave tecnica: <code>{COOKIE_CONSENT_STORAGE_KEY}</code>.</li>
            <li>Valori possibili: consenso alla misurazione oppure rifiuto della misurazione opzionale.</li>
            <li>Finalita: evitare di riproporre il banner a ogni visita e rispettare la scelta dell&apos;utente.</li>
            <li>Durata: fino a modifica tramite Preferenze cookie o cancellazione dei dati locali dal browser.</li>
          </ul>

          <h2>Banner e scelta dell&apos;utente</h2>
          <p>
            Al primo accesso viene mostrato un banner che permette di accettare la misurazione o continuare solo con strumenti tecnici. Se l&apos;utente rifiuta, gli
            strumenti opzionali restano disattivati e la navigazione continua normalmente. La scelta puo essere modificata in qualsiasi momento dal comando
            &quot;Preferenze cookie&quot; presente nel footer.
          </p>

          <h2>Cosa succede se rifiuti</h2>
          <p>
            Il sito resta utilizzabile. Non vengono caricati Vercel Web Analytics e Vercel Speed Insights; resta attiva solo la memoria locale necessaria a ricordare
            il rifiuto e gli strumenti tecnici essenziali al funzionamento del sito.
          </p>

          <h2>Servizi esterni raggiunti tramite link</h2>
          <p>
            Quando apri email, WhatsApp, LinkedIn, Instagram, TikTok o altri servizi esterni, il successivo trattamento avviene nei client o sui domini dei rispettivi
            provider e secondo le loro privacy e cookie policy. Tali trattamenti non sono gestiti direttamente da kappa404.it.
          </p>

          <h2>Rapporto con la Privacy Policy</h2>
          <p>
            Per categorie di dati, finalita, basi giuridiche, destinatari, trasferimenti e diritti dell&apos;interessato consulta anche la{" "}
            <Link href="/privacy-policy" className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              Privacy Policy
            </Link>
            .
          </p>

          <h2>Come gestire o revocare la scelta</h2>
          <ul>
            <li>Usa il comando &quot;Preferenze cookie&quot; nel footer per riaprire il banner.</li>
            <li>Scegli &quot;Solo tecnici&quot; per rifiutare o revocare la misurazione opzionale.</li>
            <li>Cancella cookie e dati locali dalle impostazioni del browser se vuoi eliminare la preferenza salvata.</li>
          </ul>

          <h2>Aggiornamenti</h2>
          <p>
            Questa cookie policy viene aggiornata quando cambiano strumenti tecnici, strumenti di misurazione, fornitori, servizi esterni o obblighi applicabili.
          </p>

          <div className="mt-10">
            <CookiePreferencesButton />
          </div>
        </div>
      </section>
    </>
  );
}
