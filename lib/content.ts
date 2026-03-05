export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  nome: string;
  descrizione: string;
  bullet: {
    problema: string;
    include: string;
    risultato: string;
  };
};

export type Project = {
  slug: string;
  title: string;
  categoria: "Web" | "AI" | "Software" | "Visual" | "Automation";
  descrizione: string;
  highlights: string[];
  stack: string[];
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
  whatsapp: string;
  instagram: string;
  tiktok: string;
  city: string;
  base: string;
  mission: string;
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
    bullet: {
      problema: "Produzione contenuti lenta, costosa e non coerente nel tono.",
      include: "Creative strategy, prompt engineering, editing workflow e output multi-formato.",
      risultato: "Contenuti continui ad alto impatto visivo con timing adatto ai canali social e adv."
    }
  }
];

export const PROJECTS: Project[] = [
  {
    slug: "luxury-yacht-photoshoot",
    title: "Luxury Yacht Photoshoot System",
    categoria: "Visual",
    descrizione:
      "Piattaforma visuale per produzioni nautiche di fascia alta con gestione shooting, naming asset e consegna rapida.",
    highlights: [
      "Pipeline cloud per ingest e tagging automatico",
      "Dashboard stato produzione in tempo reale",
      "Pacchetti export dedicati a editorial e social"
    ],
    stack: ["Next.js", "TypeScript", "Cloud Storage", "GSAP"]
  },
  {
    slug: "luxury-digital-architecture",
    title: "Luxury Digital Architecture Hub",
    categoria: "Software",
    descrizione:
      "Hub operativo per studi di architettura premium, unificando revisioni, librerie materiali e approvazioni cliente.",
    highlights: [
      "Workflow revisioni multi-team",
      "Ricerca semantica su tavole e documenti",
      "Timeline consegne con alert predittivi"
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Three.js"]
  },
  {
    slug: "luxury-skyline-flight",
    title: "Luxury Skyline Flight AI",
    categoria: "AI",
    descrizione:
      "Sistema AI per pre-visualizzare riprese drone urbane e ottimizzare piani di volo cinematici per campagne luxury.",
    highlights: [
      "Simulazioni traiettorie con variabili meteo",
      "Scoring automatico delle scene",
      "Output shot list pronti per troupe"
    ],
    stack: ["Python", "Computer Vision", "Three.js", "React"]
  }
];

export const CONTACT_INFO: ContactInfo = {
  email: "u9248936053@id.gle",
  whatsapp: "https://wa.me/393520007587",
  instagram: "https://www.instagram.com/kappa404_?igsh=N3NlN29tcGY4aTRv&utm_source=qr",
  tiktok: "https://www.tiktok.com/@amk404_?_r=1&_t=ZN-94Qv7yuanwc",
  city: "Milan",
  base: "Milan",
  mission: "Engineering luxury visuals through drone cinema, digital systems, and creative direction."
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

export const AI_SOLUTIONS = [
  "AI chatbot per supporto e pre-qualifica clienti",
  "Lead automation con segmentazione intelligente",
  "Content generation per campagne editoriali",
  "Internal tools per analisi e controllo operativo",
  "Workflow documentation con assistenza AI"
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
