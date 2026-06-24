export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  nome: string;
  descrizione: string;
  homeHook: string;
  solution: string;
  example: string;
  process: string[];
  deliverables: string[];
  entryCriteria: string[];
  bullet: {
    problema: string;
    include: string;
    risultato: string;
  };
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  categoria: "Web" | "AI" | "Software" | "Visual" | "Automation";
  descrizione: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  objectives?: string[];
  informationArchitecture?: string[];
  creativeProcess?: string[];
  gallery?: {
    src: string;
    alt: string;
    label: string;
  }[];
  outputs?: string[];
};


export type HomeAbout = {
  label: string;
  headline: string;
  mainText: string;
  secondaryText: string;
  identityIntro: string;
  identityPoints: string[];
  badges: string[];
  sideLabels: string[];
  closing: string;
};

export type ContactInfo = {
  email: string;
  emailHref: string;
  whatsapp: string;
  linkedin: string;
  instagram: string;
  tiktok: string;
  city: string;
  base: string;
  mission: string;
};

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  note: string;
};

export type HomeHero = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  backgroundImage: string;
  backgroundAlt: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metadata: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AuditLanding = {
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  auditPoints: Array<{
    title: string;
    description: string;
  }>;
  serviceFocus: string[];
  faqs: FaqItem[];
};

export type HomeOutcome = {
  code: string;
  title: string;
  description: string;
  tone: "cyan" | "violet" | "magenta";
};

export type HomeSystemModule = {
  code: string;
  title: string;
  description: string;
  href: string;
  tone: "cyan" | "violet";
};

export type HomeProofSignal = {
  label: string;
  state: string;
  title: string;
  description: string;
  tone: "cyan" | "violet" | "magenta";
};

export type HomeProtocolStep = {
  step: string;
  code: string;
  title: string;
  description: string;
  tone: "cyan" | "violet";
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Progetti", href: "/progetti" },
  { label: "Soluzioni AI", href: "/soluzioni-ai" },
  { label: "Chi Sono", href: "/chi-sono" },
  { label: "Contatti", href: "/contatti" }
];

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    nome: "Web Design & Development",
    descrizione:
      "Siti ad alte prestazioni con architettura moderna, UX curata e identità visiva allineata al posizionamento premium.",
    homeHook: "Una presenza digitale chiara, solida e pronta a sostenere la crescita.",
    solution:
      "Definizione della struttura informativa, progettazione UI coerente con il brand e sviluppo Next.js orientato a performance, SEO tecnica e percorsi di contatto chiari.",
    example:
      "Sito corporate o portfolio premium con homepage narrativa, pagine servizio, progetto pubblicabile, contatti professionali e base SEO tecnica.",
    process: [
      "Audit rapido di obiettivi, contenuti, competitor e priorità commerciali.",
      "Mappa informativa, wireframe e direzione UI coerente con il posizionamento.",
      "Sviluppo, ottimizzazione performance, metadata, JSON-LD e rilascio su hosting moderno."
    ],
    deliverables: [
      "Design system leggero e componenti riutilizzabili",
      "Pagine principali responsive e ottimizzate",
      "Setup SEO tecnico, analytics opzionali e checklist di lancio"
    ],
    entryCriteria: [
      "Obiettivo primario del sito definito",
      "Materiali brand o riferimenti visuali disponibili",
      "Contenuti base, servizi e canali di contatto confermati"
    ],
    bullet: {
      problema: "Presenza digitale lenta, poco distintiva e senza conversioni costanti.",
      include: "Research, UI architecture, sviluppo frontend/backend e ottimizzazione Core Web Vitals.",
      risultato: "Esperienza solida, tempi rapidi e struttura pronta a scalare campagne e contenuti."
    }
  },
  {
    slug: "landing-pages",
    nome: "Landing Pages",
    descrizione:
      "Landing orientate a lead e vendite con narrativa visuale, copy strategico e componenti modulari da testare.",
    homeHook: "Percorsi pensati per guidare l’attenzione e trasformarla in azione.",
    solution:
      "Costruzione di una pagina focalizzata su una singola offerta, con gerarchia dei messaggi, CTA dirette, form o WhatsApp intake e sezioni pensate per ridurre attrito decisionale.",
    example:
      "Pagina per campagna ads, servizio locale, lancio offerta o raccolta richieste con CTA email/WhatsApp e sezioni di fiducia essenziali.",
    process: [
      "Definizione promessa, pubblico, obiezioni e azione principale.",
      "Wireframe conversion-first con copy, proof, FAQ e blocchi di decisione.",
      "Sviluppo responsive, tracking consenso-first e varianti testabili."
    ],
    deliverables: [
      "Landing completa con gerarchia di conversione",
      "Copy strategico e CTA coerenti",
      "Setup eventi principali e documentazione per campagne"
    ],
    entryCriteria: [
      "Offerta o servizio specifico da promuovere",
      "Canale traffico previsto",
      "Proof, immagini o materiali minimi disponibili"
    ],
    bullet: {
      problema: "Traffico pagato disperso su pagine generiche senza focus.",
      include: "Wireframe conversion-first, copy funnel, tracciamenti e varianti per A/B test.",
      risultato: "Maggiore qualità dei contatti e riduzione del costo per acquisizione."
    }
  },
  {
    slug: "e-commerce",
    nome: "E-commerce",
    descrizione:
      "Store digitali con cataloghi performanti, checkout semplificato e integrazione operativa con logistica e CRM.",
    homeHook: "Un sistema di vendita più ordinato, credibile e pronto a crescere.",
    solution:
      "Organizzazione di catalogo, schede prodotto e flussi checkout con integrazioni operative essenziali, così vendita, ordini e monitoraggio restano nello stesso sistema.",
    example:
      "Store con catalogo snello, schede prodotto curate, percorsi di acquisto leggibili e automazioni base per ordini e recupero contatti.",
    process: [
      "Analisi catalogo, margini, logistica, pagamenti e flusso post-ordine.",
      "Progettazione UX commerce, schede prodotto, checkout e messaggi di fiducia.",
      "Implementazione, test acquisto, monitoraggio eventi e handoff operativo."
    ],
    deliverables: [
      "Struttura catalogo e template prodotto",
      "Checkout e flussi transazionali configurati",
      "Tracciamento eventi commerciali principali"
    ],
    entryCriteria: [
      "Catalogo prodotti e prezzi definiti",
      "Regole spedizione, pagamento e reso disponibili",
      "Responsabile operativo per ordini e assistenza identificato"
    ],
    bullet: {
      problema: "Vendite online discontinue e processi post-ordine frammentati.",
      include: "Design system commerce, automazioni carrello, setup analytics e monitoraggio ordini.",
      risultato: "Incremento della resa commerciale e controllo più preciso dei margini."
    }
  },
  {
    slug: "ai-automation",
    nome: "AI Automation",
    descrizione:
      "Flussi AI per ridurre attività manuali, migliorare i tempi di risposta e orchestrare operazioni ripetitive.",
    homeHook: "Processi più fluidi, meno attrito operativo, più spazio per il lavoro ad alto valore.",
    solution:
      "Mappatura del processo attuale, scelta dei punti dove l'AI riduce lavoro manuale e integrazione di trigger supervisionati con strumenti già usati dal team.",
    example:
      "Pre-qualifica lead, sintesi richieste, generazione bozze operative, smistamento contatti o assistenza interna con controllo umano.",
    process: [
      "Mappatura workflow, input, output, rischi e passaggi manuali ripetitivi.",
      "Prototipo controllato con prompt, trigger, regole e fallback.",
      "Test su casi reali, metriche operative e rilascio con supervisione."
    ],
    deliverables: [
      "Workflow AI documentato",
      "Prompt, trigger e regole di escalation",
      "Dashboard o log essenziali per controllo qualità"
    ],
    entryCriteria: [
      "Processo ripetitivo già osservabile",
      "Esempi reali di input/output disponibili",
      "Responsabile umano per revisione e approvazione definito"
    ],
    bullet: {
      problema: "Team bloccati su compiti manuali e dati non sincronizzati.",
      include: "Mappatura workflow, integrazioni API, trigger intelligenti e supervisione operativa.",
      risultato: "Processi veloci, meno errori e maggiore capacità produttiva a parità di risorse."
    }
  },
  {
    slug: "software-custom",
    nome: "Software Custom",
    descrizione:
      "Applicazioni su misura per casi complessi, con logica business dedicata e controllo completo dell'infrastruttura.",
    homeHook: "Strumenti costruiti intorno al tuo modo di lavorare, non il contrario.",
    solution:
      "Traduzione delle regole operative in interfacce, dati e automazioni proprietarie, con sviluppo modulare e rilascio progressivo per validare ogni blocco.",
    example:
      "Dashboard interna, area operativa, configuratore, pannello di controllo o strumento verticale che sostituisce fogli e passaggi manuali.",
    process: [
      "Raccolta requisiti, utenti, permessi, dati e casi limite.",
      "Prototipo funzionale e validazione dei flussi critici.",
      "Sviluppo modulare, hardening, test e rilascio progressivo."
    ],
    deliverables: [
      "Specifiche funzionali essenziali",
      "Interfaccia operativa responsive",
      "Logica business custom e piano di evoluzione"
    ],
    entryCriteria: [
      "Processo interno spiegabile e proprietario",
      "Priorità funzionali ordinate",
      "Vincoli tecnici o strumenti esistenti dichiarati"
    ],
    bullet: {
      problema: "Tool standard non adatti ai requisiti reali dell'azienda.",
      include: "Analisi requisiti, prototipazione tecnica, sviluppo modulare e hardening del rilascio.",
      risultato: "Piattaforme proprietarie che riflettono il processo interno e accelerano le decisioni."
    }
  },
  {
    slug: "video-content-ai",
    nome: "Video & Content AI",
    descrizione:
      "Pipeline creative che uniscono direzione visuale, AI generation e ottimizzazione cross-platform.",
    homeHook: "Contenuti più rapidi da produrre, più coerenti da distribuire.",
    solution:
      "Definizione di un linguaggio visivo, setup di prompt e workflow di produzione, poi adattamento degli output ai canali dove il brand deve pubblicare.",
    example:
      "Sistema editoriale per reel, short, contenuti luxury, visual AI, foto/video reali e varianti adv con tono coerente.",
    process: [
      "Definizione identità visiva, canali, formati e ritmo di pubblicazione.",
      "Setup prompt, riferimenti, template e workflow di revisione.",
      "Produzione batch, adattamento formati e ottimizzazione post-pubblicazione."
    ],
    deliverables: [
      "Direzione visuale e prompt framework",
      "Asset multi-formato pronti per social e adv",
      "Workflow di produzione riutilizzabile"
    ],
    entryCriteria: [
      "Obiettivo editoriale o commerciale definito",
      "Canali di pubblicazione selezionati",
      "Linee guida brand o riferimenti visivi disponibili"
    ],
    bullet: {
      problema: "Produzione contenuti lenta, costosa e non coerente nel tono.",
      include: "Creative strategy, prompt engineering, editing workflow e output multi-formato.",
      risultato: "Contenuti continui ad alto impatto visivo con timing adatto ai canali social e adv."
    }
  }
];

export const PROJECTS: Project[] = [
  {
    slug: "kalamata-yachting-vip-services",
    title: "Kalamata Yachting / Kapouleas Cruise",
    client: "Kapouleas Cruise",
    categoria: "Web",
    descrizione:
      "Sito ufficiale realizzato per Kapouleas Cruise e Kalamata Yachting, accompagnato da produzione foto e video con drone e fotocamera per raccontare fleet, charter ed esperienze luxury.",
    highlights: [
      "Realizzazione del sito per presentare fleet, cruises, destinations e VIP services",
      "Produzione foto e video con drone e fotocamera per rafforzare il posizionamento premium",
      "Linguaggio visivo coerente tra yacht charter, ospitalità e attività esclusive in Grecia"
    ],
    stack: ["Website", "Drone Video", "Photography", "Luxury Content"],
    liveUrl: "https://kalamata-yachting.gr",
    image: "/kalamata-yachting-yacht.jpg",
    imageAlt: "Yacht Kalamata Yachting con gruppo a bordo in mare aperto",
    overview:
      "Per Kapouleas Cruise ho curato il sito di Kalamata Yachting e la produzione di contenuti visivi originali, costruendo una presenza digitale capace di unire presentazione dell’offerta, immaginario luxury e materiale reale girato sul campo.",
    problem:
      "Il brand aveva bisogno di mostrare non solo i servizi e la flotta, ma anche l’esperienza complessiva: sito, immagini e video dovevano lavorare insieme per trasmettere qualità, affidabilità e desiderabilità del servizio.",
    solution:
      "Ho realizzato il sito e prodotto foto e video con drone e fotocamera per costruire una narrazione più credibile e immersiva, mettendo in risalto yacht, crociere, destinazioni e servizi premium del brand.",
    objectives: [
      "Presentare fleet, cruises, destinations e VIP services in modo chiaro e premium.",
      "Unire sito pubblico e contenuti visuali originali in un racconto coerente.",
      "Rendere più credibile il posizionamento luxury con materiale reale prodotto sul campo."
    ],
    informationArchitecture: [
      "Homepage con ingresso rapido su offerta, destinazioni e valore esperienziale.",
      "Sezioni dedicate a fleet, cruises, destinations e VIP services.",
      "Percorsi di contatto orientati a richieste dirette e valutazione del servizio."
    ],
    creativeProcess: [
      "Analisi del tono luxury e dei touchpoint più importanti per il pubblico charter.",
      "Produzione foto e video con drone e fotocamera per mostrare yacht, mare ed esperienza a bordo.",
      "Selezione e adattamento degli asset visuali per sostenere sito, percezione premium e contenuti digitali."
    ],
    gallery: [
      {
        src: "/kalamata-yachting-yacht.jpg",
        alt: "Yacht Kalamata Yachting con gruppo a bordo durante una crociera",
        label: "Produzione foto/video reale"
      }
    ],
    outputs: [
      "Sito ufficiale pubblico",
      "Asset foto e video originali",
      "Linguaggio visuale coordinato per servizi luxury",
      "Base contenutistica riutilizzabile per comunicazione digitale"
    ],
    outcome:
      "Il risultato è un progetto completo di presenza digitale e contenuti visuali: il sito presenta meglio l’universo Kalamata Yachting, mentre il materiale foto/video rafforza percezione premium e valore dell’esperienza a bordo."
  }
];

export const CONTACT_INFO: ContactInfo = {
  email: "info@kappa404.it",
  emailHref: "mailto:info@kappa404.it",
  whatsapp: "https://wa.me/393520007587",
  linkedin: "https://www.linkedin.com/in/amine-khabir-30363a417",
  instagram: "https://www.instagram.com/kappa404_/",
  tiktok: "https://www.tiktok.com/@amk404_",
  city: "Milano",
  base: "Milano",
  mission: "Progetto sistemi digitali, automazioni AI e contenuti visuali premium con base a Milano."
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: CONTACT_INFO.email,
    href: CONTACT_INFO.emailHref,
    note: "Canale professionale principale per richieste, brief e documenti."
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+39 352 000 7587",
    href: CONTACT_INFO.whatsapp,
    note: "Canale rapido per allineamento operativo e primo contatto."
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Amine Khabir",
    href: CONTACT_INFO.linkedin,
    note: "Profilo professionale, background e aggiornamenti business."
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@kappa404_",
    href: CONTACT_INFO.instagram,
    note: "Presenza visuale, update e mood del progetto."
  },
  {
    id: "tiktok",
    label: "TikTok",
    value: "@amk404_",
    href: CONTACT_INFO.tiktok,
    note: "Output creativi e formati short."
  }
];

export const HOME_HERO: HomeHero = {
  eyebrow: "SYSTEM_CONNECTED // DIGITAL_ARCHITECT_ONLINE",
  title: "Costruisco sistemi digitali",
  highlight: "che generano risultati",
  description:
    "Ingegneria digitale, UX e automazione AI per trasformare presenza online, lead flow e contenuti in un sistema professionale misurabile.",
  backgroundImage: "/intro-kappa404.jpg",
  backgroundAlt: "Sistema digitale Kappa404 con core luminoso cyan e magenta",
  primaryCta: {
    label: "Richiedi un audit iniziale",
    href: "/audit-iniziale"
  },
  secondaryCta: {
    label: "Scrivi via email",
    href: CONTACT_INFO.emailHref
  },
  metadata: ["Neural infrastructure", "Data stream systems", "AI visual engineering"]
};

export const AUDIT_LANDING: AuditLanding = {
  hero: {
    title: "Audit iniziale per capire cosa blocca il tuo sistema digitale",
    description:
      "Una prima analisi per orientare sito, funnel, automazioni AI e contenuti verso un percorso più chiaro, credibile e misurabile.",
    primaryCta: "Richiedi un audit iniziale",
    secondaryCta: "Scrivi via email"
  },
  auditPoints: [
    {
      title: "Presenza web",
      description: "Controllo di struttura, messaggio, performance percepita, SEO tecnica di base e chiarezza dei percorsi di contatto."
    },
    {
      title: "Conversione",
      description: "Lettura dei punti in cui il traffico perde direzione: CTA, proof, offerte, obiezioni e passaggi verso email o WhatsApp."
    },
    {
      title: "Automazione AI",
      description: "Individuazione delle attività manuali dove un workflow supervisionato può ridurre tempi, errori e dispersione operativa."
    },
    {
      title: "Contenuti visuali",
      description: "Verifica della coerenza tra identità, immagini, video, social e materiali reali disponibili per sostenere il posizionamento."
    }
  ],
  serviceFocus: ["web-development", "landing-pages", "ai-automation", "video-content-ai"],
  faqs: [
    {
      question: "Quanto dura il primo audit?",
      answer: "Il primo allineamento serve a chiarire obiettivi, vincoli, materiali disponibili e priorità. Dopo il contatto ricevi un prossimo step concreto."
    },
    {
      question: "È necessario avere già un sito online?",
      answer: "No. L'audit può partire da un sito esistente, da una landing, da materiali visuali o da un'idea di sistema digitale ancora da strutturare."
    },
    {
      question: "Ricevo subito un preventivo?",
      answer: "Prima viene definito il perimetro reale. Il preventivo arriva solo dopo aver capito obiettivo, complessità, canali e livello di intervento necessario."
    },
    {
      question: "Qual è il canale migliore per iniziare?",
      answer: "Per richieste strutturate usa l'email professionale. Per un intake rapido puoi usare WhatsApp con obiettivo, contesto e tempistiche."
    }
  ]
};

export const HOME_OUTCOMES: HomeOutcome[] = [
  {
    code: "LEAD_GEN",
    title: "Più Lead",
    description: "Acquisizione costante di contatti qualificati pronti alla conversione tramite funnel predittivi.",
    tone: "cyan"
  },
  {
    code: "REVENUE_FLOW",
    title: "Più Vendite",
    description: "Sistemi e-commerce e transazionali ottimizzati per massimizzare il valore medio dell'ordine.",
    tone: "violet"
  },
  {
    code: "AUTO_SYNC",
    title: "Automazione",
    description: "Riduzione dei costi operativi e rimozione degli errori umani tramite workflow autonomi AI-driven.",
    tone: "magenta"
  }
];

export const HOME_SYSTEM_MODULES: HomeSystemModule[] = SERVICES.map((service, index) => ({
  code: `MODULE_${String(index + 1).padStart(2, "0")}`,
  title:
    service.slug === "web-development"
      ? "Web Ecosystems"
      : service.slug === "landing-pages"
        ? "Landing & Funnels"
        : service.slug === "e-commerce"
          ? "Scalable E-commerce"
          : service.slug === "ai-automation"
            ? "AI Automation"
            : service.slug === "software-custom"
              ? "Custom Software"
              : "Video Content AI",
  description: service.homeHook,
  href: `/servizi/${service.slug}`,
  tone: index % 2 === 0 ? "cyan" : "violet"
}));

export const HOME_PROOF_SIGNALS: HomeProofSignal[] = [
  {
    label: "ARCHITECTURE_SIGNAL",
    state: "SYNCED",
    title: "Framework su misura",
    description: "Ogni progetto parte da una struttura tecnica chiara, non da template generici.",
    tone: "cyan"
  },
  {
    label: "DELIVERY_MODE",
    state: "LIVE",
    title: "Design e codice nello stesso flusso",
    description: "Direzione visiva, UX e implementazione convivono nello stesso processo operativo.",
    tone: "violet"
  },
  {
    label: "CHANNEL_STATUS",
    state: "READY",
    title: "Conversion path reali",
    description: "Email professionale, WhatsApp e LinkedIn sono attivabili subito come ingressi concreti.",
    tone: "magenta"
  }
];

export const HOME_PROOF_VISUAL = {
  image: "/og-image.png",
  alt: "Visualizzazione olografica dati in cyan e magenta"
};

export const TRUST_ITEMS = [
  "Design orientato al risultato",
  "Architettura tecnica scalabile",
  "Direzione creativa integrata",
  "Delivery rapida e misurabile"
];

export const PROCESS_STEPS = [
  "Discovery tecnica e strategica",
  "Definizione concept e roadmap",
  "Prototype interattivo con feedback",
  "Sviluppo e integrazione sistemi",
  "Rilascio, tracking e tuning",
  "Ottimizzazione continua"
];

export const HOME_PROTOCOL_STEPS: HomeProtocolStep[] = [
  {
    step: "01",
    code: "DISCOVERY_NODE",
    title: "Discovery",
    description: PROCESS_STEPS[0],
    tone: "cyan"
  },
  {
    step: "02",
    code: "SYSTEM_MAP",
    title: "Architecting",
    description: PROCESS_STEPS[1],
    tone: "violet"
  },
  {
    step: "03",
    code: "PROTOTYPE_LOOP",
    title: "Prototype",
    description: PROCESS_STEPS[2],
    tone: "cyan"
  },
  {
    step: "04",
    code: "BUILD_SEQUENCE",
    title: "Development",
    description: PROCESS_STEPS[3],
    tone: "violet"
  },
  {
    step: "05",
    code: "LAUNCH_TRACK",
    title: "Deployment",
    description: PROCESS_STEPS[4],
    tone: "cyan"
  },
  {
    step: "06",
    code: "OPTIMIZATION_LOOP",
    title: "Optimization",
    description: PROCESS_STEPS[5],
    tone: "violet"
  }
];

export const AI_SOLUTIONS = [
  "AI chatbot per supporto e pre-qualifica clienti",
  "Lead automation con segmentazione intelligente",
  "Content generation per campagne editoriali",
  "Internal tools per analisi e controllo operativo",
  "Workflow documentation con assistenza AI"
];

export const SERVICE_FAQS: FaqItem[] = [
  {
    question: "Quanto tempo serve per avviare un progetto digitale con Kappa404?",
    answer: "Di norma un progetto parte entro 5-10 giorni lavorativi dopo l'allineamento su obiettivi, priorità, canali e materiali disponibili."
  },
  {
    question: "Kappa404 lavora anche su siti o sistemi già esistenti?",
    answer: "Sì. Prima viene eseguito un audit tecnico e visuale per capire vincoli, debito tecnico, opportunità SEO e margini di miglioramento conversione."
  },
  {
    question: "Le automazioni AI vengono costruite su misura?",
    answer: "Sì. Le automazioni vengono progettate intorno a processi reali: lead flow, contenuti, risposte clienti, workflow interni e integrazioni operative."
  },
  {
    question: "Come avviene il primo contatto?",
    answer: "Il canale professionale principale è info@kappa404.it. Per un allineamento rapido puoi usare anche WhatsApp con obiettivo, contesto e tempistiche."
  }
];


export const HOME_ABOUT: HomeAbout = {
  label: "Chi sono",
  headline: "Creo esperienze digitali, visual design e soluzioni AI con identità forte.",
  mainText:
    "Sono Amine Khabir, il profilo dietro Kappa404. Unisco creatività, tecnologia e visione strategica per costruire siti web, contenuti visuali, automazioni e sistemi digitali con un impatto reale. Il mio approccio parte dall'estetica, ma punta sempre alla funzione: ogni progetto deve apparire premium, comunicare valore e generare risultati.",
  secondaryText:
    "Lavoro tra design futuristico, sviluppo web, branding visivo, contenuti creativi e integrazione di strumenti AI per trasformare idee in prodotti, immagini, pagine e sistemi pronti da usare. Non mi interessa creare qualcosa di vuoto: ogni elemento deve avere presenza, coerenza e direzione.",
  identityIntro: "Kappa404 non è solo un nome. È un'identità digitale costruita per unire:",
  identityPoints: [
    "design visivo ad alto impatto",
    "sviluppo moderno",
    "automazione intelligente",
    "contenuti creativi orientati al brand"
  ],
  badges: ["Web Design", "AI Automation", "Visual Content"],
  sideLabels: ["Creative Direction", "Web Systems", "AI Visual Workflow"],
  closing: "Non costruisco semplici pagine. Costruisco presenza digitale."
};
