import PageHero from "@/components/PageHero";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { CONTACT_INFO } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Informativa privacy Kappa404 su navigazione, canali di contatto, form WhatsApp e strumenti opzionali di misurazione attivati solo dopo consenso.",
  path: "/privacy-policy",
  noIndex: true
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // PRIVACY POLICY"
        title="Privacy Policy"
        description="Informativa sul trattamento dei dati personali effettuato attraverso kappa404.it e i canali di contatto collegati al progetto Kappa404."
        chips={["Aggiornata 17 aprile 2026", "Italia", "Opt-in measurement"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultimo aggiornamento: 17 aprile 2026</p>

          <h2>Titolare del trattamento</h2>
          <p>
            Il trattamento dei dati personali relativo a kappa404.it e gestito da Kappa404, progetto professionale con base a {CONTACT_INFO.base},
            raggiungibile per richieste privacy tramite WhatsApp al numero{" "}
            <a href={CONTACT_INFO.whatsapp} className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              +39 352 000 7587
            </a>
            .
          </p>

          <h2>Ambito dell&apos;informativa</h2>
          <p>
            Questa informativa riguarda i dati trattati durante la navigazione sul sito, l&apos;uso dei link di contatto esterni e l&apos;eventuale attivazione degli
            strumenti opzionali di misurazione dopo consenso. Non riguarda i trattamenti svolti da siti o piattaforme di terze parti raggiunti tramite link
            esterni.
          </p>

          <h2>Categorie di dati trattati</h2>
          <ul>
            <li>Dati tecnici di navigazione, sicurezza, diagnostica e continuita del servizio generati dall&apos;infrastruttura web e hosting.</li>
            <li>Dati volontariamente trasmessi dall&apos;utente quando sceglie di contattare Kappa404 via WhatsApp o altri canali esterni collegati dal sito.</li>
            <li>Dati statistici e prestazionali aggregati relativi alle visite, raccolti tramite Vercel Web Analytics e Vercel Speed Insights solo dopo consenso esplicito dell&apos;utente.</li>
            <li>Preferenza privacy salvata localmente nel browser per ricordare la scelta su strumenti opzionali di misurazione e banner informativo.</li>
          </ul>

          <h2>Form presente sul sito</h2>
          <p>
            Alla data del 17 aprile 2026 i form presenti su homepage e pagina contatti generano localmente un messaggio WhatsApp precompilato e aprono il
            canale scelto dall&apos;utente. Il sito non salva i dati inseriti in un database Kappa404 e non li invia a un backend applicativo proprietario prima
            dell&apos;apertura volontaria di WhatsApp.
          </p>

          <h2>Finalita e basi giuridiche</h2>
          <ul>
            <li>Fornire il sito, proteggerlo da abusi e garantirne il funzionamento tecnico: interesse legittimo del titolare.</li>
            <li>Rispondere a richieste commerciali o progettuali inviate volontariamente dall&apos;utente: misure precontrattuali richieste dall&apos;interessato.</li>
            <li>Adempiere a obblighi amministrativi, fiscali o legali eventualmente applicabili: obbligo di legge.</li>
            <li>Misurare traffico, utilizzo e performance del sito tramite strumenti aggregati di misurazione: consenso dell&apos;utente, revocabile in qualsiasi momento.</li>
          </ul>

          <h2>Modalita del trattamento</h2>
          <p>
            I dati sono trattati con strumenti digitali, log tecnici e canali di comunicazione coerenti con la finalita perseguita. Il trattamento avviene con
            misure ragionevoli di sicurezza, limitazione degli accessi e minimizzazione dei dati rispetto allo scopo dichiarato.
          </p>

          <h2>Destinatari e fornitori coinvolti</h2>
          <ul>
            <li>Vercel, come fornitore di hosting e infrastruttura del sito.</li>
            <li>Vercel Web Analytics e Vercel Speed Insights, attivati solo dopo consenso, per statistiche aggregate su utilizzo e performance delle pagine.</li>
            <li>Piattaforme esterne aperte su iniziativa dell&apos;utente, come WhatsApp, Instagram o TikTok, che operano come servizi terzi con proprie policy.</li>
          </ul>

          <h2>Trasferimenti verso paesi terzi</h2>
          <p>
            Alcuni fornitori tecnologici o piattaforme esterne collegate dal sito possono trattare dati anche fuori dallo Spazio Economico Europeo. In tali casi
            il trattamento avviene secondo le basi giuridiche e le garanzie dichiarate dai rispettivi provider.
          </p>

          <h2>Periodo di conservazione</h2>
          <ul>
            <li>I log tecnici e di sicurezza seguono i tempi di conservazione del provider e le esigenze di continuita operativa.</li>
            <li>Le richieste di contatto e i relativi scambi possono essere conservati fino a 24 mesi, salvo obblighi ulteriori o prosecuzione del rapporto.</li>
            <li>La preferenza di misurazione salvata nel browser resta memorizzata fino a modifica manuale o cancellazione dei dati locali da parte dell&apos;utente.</li>
          </ul>

          <h2>Diritti dell&apos;interessato</h2>
          <p>
            L&apos;utente puo chiedere accesso, rettifica, cancellazione, limitazione del trattamento, opposizione o portabilita quando applicabile, scrivendo su{" "}
            <a href={CONTACT_INFO.whatsapp} className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              WhatsApp
            </a>
            . Il consenso agli strumenti opzionali di misurazione puo essere modificato in ogni momento tramite il comando &quot;Preferenze cookie&quot; disponibile
            nel footer del sito.
          </p>

          <h2>Reclamo all&apos;autorita di controllo</h2>
          <p>
            Se ritieni che il trattamento violi la normativa applicabile, puoi proporre reclamo al Garante per la protezione dei dati personali secondo le
            modalita pubblicate sul sito ufficiale dell&apos;Autorita.
          </p>

          <h2>Aggiornamenti dell&apos;informativa</h2>
          <p>
            Questa informativa viene aggiornata quando cambiano strumenti, finalita, basi giuridiche o assetto tecnico del sito. Le modifiche rilevanti saranno
            pubblicate in questa pagina con nuova data di aggiornamento.
          </p>

          <div className="mt-10">
            <CookiePreferencesButton />
          </div>
        </div>
      </section>
    </>
  );
}
