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
      "Siti ad alte prestazioni con architettura moderna, UX curata e identita visiva allineata al posizionamento premium.",
    homeHook: "Una presenza digitale chiara, solida e pronta a sostenere la crescita.",
    solution:
      "Definizione della struttura informativa, progettazione UI coerente con il brand e sviluppo Next.js orientato a performance, SEO tecnica e percorsi di contatto chiari.",
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
    bullet: {
      problema: "Traffico pagato disperso su pagine generiche senza focus.",
      include: "Wireframe conversion-first, copy funnel, tracciamenti e varianti per A/B test.",
      risultato: "Maggiore qualita dei contatti e riduzione del costo per acquisizione."
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
    bullet: {
      problema: "Vendite online discontinue e processi post-ordine frammentati.",
      include: "Design system commerce, automazioni carrello, setup analytics e monitoraggio ordini.",
      risultato: "Incremento della resa commerciale e controllo piu preciso dei margini."
    }
  },
  {
    slug: "ai-automation",
    nome: "AI Automation",
    descrizione:
      "Flussi AI per ridurre attivita manuali, migliorare i tempi di risposta e orchestrare operazioni ripetitive.",
    homeHook: "Processi più fluidi, meno attrito operativo, più spazio per contare davvero.",
    solution:
      "Mappatura del processo attuale, scelta dei punti dove l'AI riduce lavoro manuale e integrazione di trigger supervisionati con strumenti già usati dal team.",
    bullet: {
      problema: "Team bloccati su compiti manuali e dati non sincronizzati.",
      include: "Mappatura workflow, integrazioni API, trigger intelligenti e supervisione operativa.",
      risultato: "Processi veloci, meno errori e maggiore capacita produttiva a parita di risorse."
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
  city: "Milan",
  base: "Milan",
  mission: "Engineering luxury visuals through drone cinema, digital systems, and creative direction."
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
    "Ingegneria digitale avanzata per scalare il tuo business attraverso infrastrutture ad alte prestazioni e automazione intelligente.",
  backgroundImage: "/intro-kappa404.jpg",
  backgroundAlt: "Sistema digitale Kappa404 con core luminoso cyan e magenta",
  primaryCta: {
    label: "Scrivi via email",
    href: CONTACT_INFO.emailHref
  },
  secondaryCta: {
    label: "Esplora i servizi",
    href: "/servizi"
  },
  metadata: ["Neural infrastructure", "Data stream systems", "AI visual engineering"]
};

export const HOME_OUTCOMES: HomeOutcome[] = [
  {
    code: "LEAD_GEN",
    title: "Piu Lead",
    description: "Acquisizione costante di contatti qualificati pronti alla conversione tramite funnel predittivi.",
    tone: "cyan"
  },
  {
    code: "REVENUE_FLOW",
    title: "Piu Vendite",
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
    answer: "Di norma un progetto parte entro 5-10 giorni lavorativi dopo l'allineamento su obiettivi, priorita, canali e materiali disponibili."
  },
  {
    question: "Kappa404 lavora anche su siti o sistemi gia esistenti?",
    answer: "Si. Prima viene eseguito un audit tecnico e visuale per capire vincoli, debito tecnico, opportunita SEO e margini di miglioramento conversione."
  },
  {
    question: "Le automazioni AI vengono costruite su misura?",
    answer: "Si. Le automazioni vengono progettate intorno a processi reali: lead flow, contenuti, risposte clienti, workflow interni e integrazioni operative."
  },
  {
    question: "Come avviene il primo contatto?",
    answer: "Il canale professionale principale e info@kappa404.it. Per un allineamento rapido puoi usare anche WhatsApp con obiettivo, contesto e tempistiche."
  }
];


export const HOME_ABOUT: HomeAbout = {
  label: "Chi sono",
  headline: "Creo esperienze digitali, visual design e soluzioni AI con identita forte.",
  mainText:
    "Sono KAPPA404. Unisco creativita, tecnologia e visione strategica per costruire siti web, contenuti visuali, automazioni e sistemi digitali con un impatto reale. Il mio approccio parte dall'estetica, ma punta sempre alla funzione: ogni progetto deve apparire premium, comunicare valore e generare risultati.",
  secondaryText:
    "Lavoro tra design futuristico, sviluppo web, branding visivo, contenuti creativi e integrazione di strumenti AI per trasformare idee in prodotti, immagini, pagine e sistemi pronti da usare. Non mi interessa creare qualcosa di vuoto: ogni elemento deve avere presenza, coerenza e direzione.",
  identityIntro: "KAPPA404 non e solo un nome. E un'identita digitale costruita per unire:",
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
