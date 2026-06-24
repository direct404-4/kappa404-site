import Image from "next/image";
import Link from "next/link";
import DataPerformanceCore from "@/components/DataPerformanceCore";
import HomeImmersiveBackground, { type HomeSceneCue } from "@/components/HomeImmersiveBackground";
import JsonLd from "@/components/JsonLd";
import WhatsAppProjectForm from "@/components/WhatsAppProjectForm";
import { CONTACT_INFO, HOME_SYSTEM_MODULES, PROJECTS } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

const outcomeCards = [
  {
    id: "LEAD_GEN",
    icon: "hub",
    title: "Più Lead",
    description: "Acquisizione costante di contatti qualificati pronti alla conversione tramite funnel predittivi.",
    accent: "#00f2ff",
    width: "75%"
  },
  {
    id: "REVENUE_X",
    icon: "payments",
    title: "Più Vendite",
    description: "Sistemi e-commerce e transazionali ottimizzati per massimizzare il valore medio dell'ordine.",
    accent: "#bc13fe",
    width: "50%"
  },
  {
    id: "AUTO_SYNC",
    icon: "robot_2",
    title: "Automazione",
    description: "Riduzione dei costi operativi e rimozione degli errori umani tramite workflow autonomi AI-driven.",
    accent: "#ff00e4",
    width: "90%"
  }
] as const;

const systemModuleIcons = ["language", "filter_list", "shopping_cart", "smart_toy", "terminal", "movie"] as const;

const performanceStats = [
  {
    label: "CONVERSION_PATH",
    value: "MAPPED",
    accent: "#00f2ff",
    width: "72%"
  },
  {
    label: "REVENUE_FLOW",
    value: "STRUCTURED",
    accent: "#bc13fe",
    width: "64%"
  },
  {
    label: "SYSTEM_HEALTH",
    value: "MONITORED",
    accent: "#00f2ff",
    width: "88%"
  }
] as const;

const caseStudy = PROJECTS[0];

const trustSignals = [
  "Sito pubblico e contenuti originali",
  "Architettura informativa per servizi premium",
  "Foto e video prodotti sul campo",
  "Canali di contatto professionali"
] as const;

const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description: "Analisi profonda del modello di business e mappatura dei colli di bottiglia digitali.",
    accent: "#00f2ff"
  },
  {
    id: "02",
    title: "Architecting",
    description: "Progettazione dell'infrastruttura tecnica e del flusso logico del sistema.",
    accent: "#bc13fe"
  },
  {
    id: "03",
    title: "Development",
    description: "Coding ad alte prestazioni e integrazione dei moduli AI specializzati.",
    accent: "#00f2ff"
  },
  {
    id: "04",
    title: "Deployment",
    description: "Lancio in ambiente di produzione con monitoraggio real-time dello stress-test.",
    accent: "#bc13fe"
  },
  {
    id: "05",
    title: "Analysis",
    description: "Raccolta dati sulle interazioni utenti e feedback loop del sistema.",
    accent: "#00f2ff"
  },
  {
    id: "06",
    title: "Optimization",
    description: "Raffinamento continuo basato su KPI per scalare i risultati finali.",
    accent: "#bc13fe"
  }
] as const;

const homeSectionCopy = {
  heroStatus: "SYSTEM_CONNECTED // NEURAL_READY",
  outcomesTitle: "Cosa Ottieni",
  outcomesDescription: "Non vendiamo servizi. Costruiamo sistemi digitali che lavorano per te.",
  infrastructureEyebrow: "Architecture Selection",
  infrastructureTitle: "Sistemi di Infrastruttura",
  performanceTitle: "Data Performance",
  protocolTitle: "Protocol Execution",
  contactTitle: "Costruiamo il tuo sistema digitale",
  contactDescription: "Scrivi via email per un contatto professionale // WhatsApp resta attivo per intake rapido"
} as const;

const homeSceneCues: HomeSceneCue[] = [
  {
    id: "hero",
    label: homeSectionCopy.heroStatus,
    accent: "#00f2ff",
    progressRange: [0, 0.16],
    hudLines: ["KAPPA404 // Neural Infrastructure Platform", "HIGH_PERFORMANCE_SYSTEMS // ARMED", "CTA_STACK // READY"]
  },
  {
    id: "outcomes",
    label: homeSectionCopy.outcomesTitle,
    accent: "#ff00e4",
    progressRange: [0.16, 0.34],
    hudLines: outcomeCards.map((card) => `${card.id} // ${card.title}`)
  },
  {
    id: "infrastructure",
    label: homeSectionCopy.infrastructureTitle,
    accent: "#00f2ff",
    progressRange: [0.34, 0.52],
    hudLines: HOME_SYSTEM_MODULES.map((module) => `${module.code} // ${module.title}`)
  },
  {
    id: "performance",
    label: homeSectionCopy.performanceTitle,
    accent: "#bc13fe",
    progressRange: [0.52, 0.68],
    hudLines: performanceStats.map((stat) => `${stat.label} // ${stat.value}`)
  },
  {
    id: "protocol",
    label: homeSectionCopy.protocolTitle,
    accent: "#00f2ff",
    progressRange: [0.68, 0.86],
    hudLines: processSteps.map((step) => `${step.id} // ${step.title}`)
  },
  {
    id: "contact",
    label: homeSectionCopy.contactTitle,
    accent: "#bc13fe",
    progressRange: [0.86, 1],
    hudLines: [homeSectionCopy.contactDescription, "EMAIL_CHANNEL // PRIMARY", "LINKEDIN_PROFILE // VERIFIED", "WHATSAPP_CHANNEL // READY"]
  }
];

export default function HomePage() {
  return (
    <div className="relative isolate -mt-16 overflow-hidden bg-[#050505] text-on-surface">
      <JsonLd id="kappa404-home-breadcrumb" data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <HomeImmersiveBackground cues={homeSceneCues} />

      <section className="home-immersive-hero">
        <div className="home-hero-content">
          <div className="home-hero-status">
            <span className="home-hero-status__dot" aria-hidden="true" />
            {homeSectionCopy.heroStatus}
          </div>

          <h1 className="home-hero-title">
            <span className="home-hero-title__line">Costruisco sistemi digitali</span>
            <span className="home-hero-title__highlight">che generano risultati</span>
          </h1>

          <p className="home-hero-copy">
            Ingegneria digitale, UX e automazione AI per trasformare presenza online, lead flow e contenuti in un sistema professionale misurabile.
          </p>

          <div className="home-hero-actions">
            <Link href="/contatti#form" className="btn-primary">
              Richiedi un audit iniziale
            </Link>

            <a href={CONTACT_INFO.emailHref} className="btn-secondary">
              Scrivi via email
            </a>
          </div>
        </div>
      </section>

      <section className="home-section-surface relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-4 font-headline text-3xl font-bold uppercase tracking-tighter md:text-5xl">{homeSectionCopy.outcomesTitle}</h2>
              <p className="border-l-2 border-[#bc13fe] pl-4 font-mono text-sm uppercase tracking-widest text-on-surface-variant">
                {homeSectionCopy.outcomesDescription}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {outcomeCards.map((card) => (
              <article
                key={card.id}
                className={`glass-panel group relative overflow-hidden p-8 ${card.id === "REVENUE_X" ? "border-l-2 border-l-[#bc13fe]/50" : ""}`}
              >
                <div className="absolute right-0 top-0 p-4 font-mono text-[10px]" style={{ color: `${card.accent}33` }}>
                  ID_LOG: {card.id}
                </div>
                <span className="material-symbols-outlined mb-6 text-4xl" style={{ color: card.accent }} aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="mb-4 font-headline text-2xl font-bold uppercase tracking-wide">{card.title}</h3>
                <p className="mb-6 text-on-surface-variant opacity-70">{card.description}</p>
                <div className="h-[2px] w-full overflow-hidden bg-surface-container-high">
                  <div className="h-full shadow-[0_0_8px_currentColor]" style={{ color: card.accent, backgroundColor: card.accent, width: card.width }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-surface home-section-surface--deep relative z-10 overflow-hidden px-6 py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00f2ff]">{homeSectionCopy.infrastructureEyebrow}</span>
            <h2 className="mt-4 font-headline text-4xl font-bold uppercase md:text-6xl">{homeSectionCopy.infrastructureTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#00f2ff]/10 md:grid-cols-2 lg:grid-cols-3">
            {HOME_SYSTEM_MODULES.map((module, index) => {
              const accent = module.tone === "violet" ? "#bc13fe" : "#00f2ff";
              const icon = systemModuleIcons[index] ?? "terminal";

              return (
              <Link
                key={module.code}
                href={module.href}
                className={`group bg-[#050505]/90 p-10 backdrop-blur-sm transition-all duration-500 ${
                  module.tone === "violet" ? "hover:bg-[#bc13fe]/5" : "hover:bg-[#00f2ff]/5"
                }`}
              >
                <div className="mb-12 flex items-start justify-between">
                  <div className="border px-3 py-3" style={{ borderColor: `${accent}33`, backgroundColor: `${accent}0d` }}>
                    <span className="material-symbols-outlined" style={{ color: accent }} aria-hidden="true">
                      {icon}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-outline opacity-40">{module.code}</span>
                </div>

                <h4
                  className={`mb-4 font-headline text-xl font-bold uppercase transition-colors ${
                    module.tone === "violet" ? "group-hover:text-[#bc13fe]" : "group-hover:text-[#00f2ff]"
                  }`}
                >
                  {module.title}
                </h4>
                <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">{module.description}</p>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                  Apri modulo <span className="material-symbols-outlined text-xs" aria-hidden="true">arrow_forward</span>
                </span>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-section-surface relative z-10 overflow-hidden border-y border-white/10 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="card-shell overflow-hidden p-0">
            <Image
              src={caseStudy.image ?? "/kalamata-yachting-yacht.jpg"}
              alt={caseStudy.imageAlt ?? caseStudy.title}
              width={1600}
              height={1066}
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#00f2ff]">Case study pubblicabile</p>
            <h2 className="mt-4 font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white md:text-5xl">
              Kalamata Yachting: sito ufficiale e contenuti visuali originali
            </h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/76 md:text-base">
              Un progetto reale dove sito, architettura dei contenuti, fotografia e drone video lavorano insieme per presentare fleet,
              destinazioni e servizi VIP con un linguaggio premium verificabile.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div key={signal} className="border border-white/10 bg-white/[0.03] px-4 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/72">{signal}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/progetti/${caseStudy.slug}`} className="btn-primary">
                Leggi il case study
              </Link>
              {caseStudy.liveUrl ? (
                <a href={caseStudy.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  Vedi sito live
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-surface relative z-10 overflow-hidden border-y border-[#00f2ff]/5 px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="mb-8 font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">{homeSectionCopy.performanceTitle}</h2>
            <div className="space-y-12">
              {performanceStats.map((stat) => (
                <div key={stat.label} className="relative">
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-on-surface-variant">{stat.label}</span>
                    <span className="font-mono text-xl" style={{ color: stat.accent }}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="relative h-4 bg-surface-container-high">
                    <div className="h-full" style={{ width: stat.width, background: `linear-gradient(to right, transparent, ${stat.accent})` }} />
                    <div className="absolute inset-0 border" style={{ borderColor: `${stat.accent}33` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel relative aspect-square w-full p-2 md:w-1/2">
            <div className="absolute inset-4 border border-[#00f2ff]/10" />
            <DataPerformanceCore stats={performanceStats} />
          </div>
        </div>
      </section>

      <section className="home-section-surface home-section-surface--clear relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="font-headline text-4xl font-bold uppercase tracking-widest">{homeSectionCopy.protocolTitle}</h2>
            <div className="mt-4 h-1 w-20 bg-[#bc13fe]" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.id} className="group relative">
                <div className="absolute -left-6 -top-6 font-mono text-6xl font-black text-outline/10">{step.id}</div>
                <div className="border-l pl-8 pt-4" style={{ borderColor: `${step.accent}4d` }}>
                  <h4 className="mb-4 font-headline text-lg font-bold uppercase" style={{ color: step.accent }}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant opacity-80">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-surface home-section-surface--deep relative z-10 overflow-hidden px-6 py-24">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent" />

        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="mb-8 font-headline text-4xl font-bold uppercase tracking-tighter md:text-6xl">{homeSectionCopy.contactTitle}</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant opacity-60">
            {homeSectionCopy.contactDescription}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={CONTACT_INFO.emailHref} className="btn-primary">
              {CONTACT_INFO.email}
            </a>
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="glass-panel mx-auto max-w-2xl p-8 md:p-12">
          <WhatsAppProjectForm mode="home" />
        </div>
      </section>
    </div>
  );
}
