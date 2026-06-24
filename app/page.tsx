import Link from "next/link";
import DataPerformanceCore from "@/components/DataPerformanceCore";
import HomeImmersiveBackground, { type HomeSceneCue } from "@/components/HomeImmersiveBackground";
import JsonLd from "@/components/JsonLd";
import WhatsAppProjectForm from "@/components/WhatsAppProjectForm";
import { CONTACT_INFO, HOME_SYSTEM_MODULES } from "@/lib/content";
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

      <section className="home-immersive-hero relative z-10 min-h-[760px] overflow-hidden px-6 pb-20 pt-32 md:min-h-[1024px]">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 border border-[#00f2ff]/30 bg-[#00f2ff]/5 px-4 py-1 font-mono text-[10px] tracking-widest text-[#00f2ff]">
            <span className="h-2 w-2 animate-pulse bg-[#00f2ff]" />
            {homeSectionCopy.heroStatus}
          </div>

          <h1 className="mb-8 font-headline text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            COSTRUISCO SISTEMI DIGITALI <br />
            <span className="bg-gradient-to-r from-[#00f2ff] to-[#bc13fe] bg-clip-text text-transparent">CHE GENERANO RISULTATI</span>
          </h1>

          <p className="mb-12 max-w-2xl font-body text-lg text-on-surface-variant opacity-80 md:text-xl">
            Ingegneria digitale avanzata per scalare il tuo business attraverso infrastrutture ad alte prestazioni e automazione intelligente.
          </p>

          <div className="flex flex-col gap-6 md:flex-row">
            <a
              href={CONTACT_INFO.emailHref}
              className="flex items-center gap-3 bg-primary-container px-8 py-4 font-headline font-bold uppercase tracking-widest text-on-primary transition-all hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]"
            >
              Scrivi via email
              <span className="material-symbols-outlined">trending_up</span>
            </a>

            <Link
              href="/servizi"
              className="border border-[#00f2ff]/40 px-8 py-4 font-headline font-bold uppercase tracking-widest text-[#00f2ff] transition-all hover:bg-[#00f2ff]/10"
            >
              Esplora i servizi
            </Link>
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
                <span className="material-symbols-outlined mb-6 text-4xl" style={{ color: card.accent }}>
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
                    <span className="material-symbols-outlined" style={{ color: accent }}>
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
                  Initialize System <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>
              );
            })}
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
