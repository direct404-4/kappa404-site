import PageHero from "@/components/PageHero";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { CONTACT_INFO } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Informativa privacy Kappa404 su navigazione, email, canali di contatto, form WhatsApp, servizi esterni e misurazione opzionale attivata solo dopo consenso.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL // PRIVACY POLICY"
        title="Privacy Policy"
        description="Informativa sul trattamento dei dati personali effettuato attraverso kappa404.it e i canali di contatto collegati al progetto Kappa404."
        chips={["Aggiornata 24 giugno 2026", "GDPR / Italia", "Opt-in measurement"]}
      />

      <section className="section-gap">
        <div className="container-main legal-shell">
          <p>Ultimo aggiornamento: 24 giugno 2026</p>

          <h2>Titolare del trattamento</h2>
          <p>
            Il trattamento dei dati personali relativo a kappa404.it è gestito da Kappa404, progetto professionale di Amine Khabir con base a {CONTACT_INFO.base}.
            Per richieste privacy puoi scrivere a{" "}
            <a href={CONTACT_INFO.emailHref} className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              {CONTACT_INFO.email}
            </a>
            .
          </p>

          <h2>Ambito dell&apos;informativa</h2>
          <p>
            Questa informativa riguarda la navigazione su kappa404.it, l&apos;uso dei link di contatto, il form che genera messaggi WhatsApp e gli strumenti opzionali
            di misurazione caricati solo dopo consenso. Non disciplina i trattamenti svolti autonomamente da WhatsApp, LinkedIn, Instagram, TikTok, client email o
            altri siti esterni aperti dall&apos;utente.
          </p>

          <h2>Dati trattati</h2>
          <ul>
            <li>Dati tecnici necessari alla navigazione, sicurezza, diagnostica, protezione da abusi e continuità del servizio.</li>
            <li>Dati inviati volontariamente via email, WhatsApp o altri canali esterni: nome, recapiti, contenuto del messaggio, informazioni sul progetto e allegati eventualmente trasmessi.</li>
            <li>Dati inseriti nel form di contatto del sito, usati localmente nel browser per creare un messaggio WhatsApp precompilato.</li>
            <li>Dati statistici e prestazionali aggregati raccolti da Vercel Web Analytics e Vercel Speed Insights solo dopo consenso esplicito.</li>
            <li>Preferenza privacy salvata nella memoria locale del browser per ricordare accettazione o rifiuto della misurazione opzionale.</li>
          </ul>

          <h2>Form e assenza di backend proprietario</h2>
          <p>
            Alla data del 24 giugno 2026 i form presenti su homepage e pagina contatti non salvano dati in un database Kappa404 e non inviano dati a un backend
            proprietario. Il form genera nel browser un testo precompilato e apre WhatsApp su scelta volontaria dell&apos;utente. Per richieste formali resta
            disponibile la mail {CONTACT_INFO.email}.
          </p>

          <h2>Finalità e basi giuridiche</h2>
          <ul>
            <li>Fornire il sito, garantirne sicurezza, stabilità e funzionamento tecnico: interesse legittimo del titolare.</li>
            <li>Rispondere a richieste commerciali, progettuali o informative inviate dall&apos;utente: misure precontrattuali richieste dall&apos;interessato.</li>
            <li>Gestire eventuali obblighi amministrativi, fiscali, contabili o legali connessi a un rapporto professionale: obbligo di legge o esecuzione del rapporto.</li>
            <li>Misurare traffico e performance tramite Vercel Web Analytics e Speed Insights: consenso dell&apos;utente, revocabile in qualsiasi momento.</li>
          </ul>

          <h2>Natura del conferimento</h2>
          <p>
            I dati tecnici necessari sono indispensabili per usare il sito. L&apos;invio di richieste via email, WhatsApp o altri canali è facoltativo, ma senza i dati
            necessari potrebbe non essere possibile rispondere. La misurazione opzionale è facoltativa: il rifiuto non limita la navigazione.
          </p>

          <h2>Destinatari e fornitori</h2>
          <ul>
            <li>Vercel, come fornitore di hosting, infrastruttura, Web Analytics e Speed Insights.</li>
            <li>Provider email e client usati dall&apos;utente o dal titolare per gestire le comunicazioni.</li>
            <li>Piattaforme esterne aperte dall&apos;utente, come WhatsApp, LinkedIn, Instagram o TikTok, ciascuna con proprie policy.</li>
            <li>Consulenti o fornitori tecnici, amministrativi o legali, solo quando necessario per gestione operativa o obblighi applicabili.</li>
          </ul>

          <h2>Trasferimenti fuori dallo SEE</h2>
          <p>
            Alcuni fornitori tecnologici o piattaforme esterne possono trattare dati anche fuori dallo Spazio Economico Europeo. Quando applicabile, il trattamento
            avviene secondo le garanzie dichiarate dai rispettivi provider, incluse decisioni di adeguatezza, clausole contrattuali standard o altri strumenti previsti dalla normativa.
          </p>

          <h2>Conservazione</h2>
          <ul>
            <li>I log tecnici e di sicurezza seguono i tempi di conservazione del provider e le esigenze di continuità operativa.</li>
            <li>Le richieste di contatto e gli scambi professionali possono essere conservati fino a 24 mesi, salvo prosecuzione del rapporto o obblighi ulteriori.</li>
            <li>I documenti amministrativi, fiscali o contrattuali sono conservati per i tempi previsti dalla legge, quando applicabile.</li>
            <li>La preferenza privacy salvata nel browser resta memorizzata fino a modifica tramite Preferenze cookie o cancellazione dei dati locali.</li>
          </ul>

          <h2>Diritti dell&apos;interessato</h2>
          <p>
            Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione, portabilità quando applicabile e revoca del consenso scrivendo a{" "}
            <a href={CONTACT_INFO.emailHref} className="text-white underline decoration-white/20 underline-offset-4 hover:text-[#00f2ff]">
              {CONTACT_INFO.email}
            </a>
            . La revoca del consenso agli strumenti opzionali di misurazione può essere effettuata anche dal comando &quot;Preferenze cookie&quot; nel footer.
          </p>

          <h2>Profilazione e decisioni automatizzate</h2>
          <p>
            Il sito non effettua profilazione pubblicitaria, remarketing, vendita di dati personali o decisioni automatizzate con effetti giuridici sull&apos;utente.
          </p>

          <h2>Reclamo al Garante</h2>
          <p>
            Se ritieni che il trattamento violi la normativa applicabile, puoi proporre reclamo al Garante per la protezione dei dati personali secondo le
            modalità pubblicate sul sito ufficiale dell&apos;Autorità.
          </p>

          <h2>Aggiornamenti</h2>
          <p>
            Questa informativa viene aggiornata quando cambiano strumenti, finalità, fornitori, canali di contatto o obblighi applicabili. Le modifiche rilevanti
            saranno pubblicate in questa pagina con nuova data di aggiornamento.
          </p>

          <div className="mt-10">
            <CookiePreferencesButton />
          </div>
        </div>
      </section>
    </>
  );
}
