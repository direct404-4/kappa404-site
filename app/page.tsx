import Link from "next/link";
import CardProject from "@/components/CardProject";
import CardService from "@/components/CardService";
import ContactBlock from "@/components/ContactBlock";
import SectionTitle from "@/components/SectionTitle";
import { HOME_ABOUT, PROCESS_STEPS, PROJECTS, SERVICES } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="kappa-home">
      <section className="kappa-hero">
        <div className="kappa-hero-nebula" />
        <div className="kappa-hero-grid" />
        <div className="kappa-hero-orb" />

        <div className="container-main relative z-10 py-24 text-center md:py-32">
          <span className="kappa-hero-chip kappa-reveal">KAPPA404 // Digital Vision Craft</span>

          <h1 className="kappa-hero-title kappa-reveal" style={{ animationDelay: "120ms" }}>
            KAPPA404
            <span>AI Visual Engineering</span>
          </h1>

          <p className="kappa-hero-copy kappa-reveal" style={{ animationDelay: "220ms" }}>
            Ecosistemi digitali premium dove design futuristico, sviluppo moderno e automazione intelligente lavorano insieme per creare presenza, valore e risultato.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 kappa-reveal" style={{ animationDelay: "320ms" }}>
            <Link href="/contatti#form" className="btn-primary">
              Inizia ora
            </Link>
            <Link href="/progetti" className="btn-secondary">
              Guarda i progetti
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3 kappa-reveal" style={{ animationDelay: "420ms" }}>
            <span className="kappa-pill">Creative Direction</span>
            <span className="kappa-pill">Web Systems</span>
            <span className="kappa-pill">AI Visual Workflow</span>
          </div>
        </div>
      </section>

      <section className="section-gap kappa-about-wrap">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="kappa-hero-chip">{HOME_ABOUT.label}</span>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white md:text-5xl">{HOME_ABOUT.headline}</h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{HOME_ABOUT.mainText}</p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">{HOME_ABOUT.secondaryText}</p>

              <div className="mt-8 rounded-2xl border border-cyan/20 bg-cyan/5 p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-cyan/75">Identita</p>
                <p className="mt-3 text-sm text-white/80">{HOME_ABOUT.identityIntro}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/72">
                  {HOME_ABOUT.identityPoints.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {HOME_ABOUT.badges.map((badge) => (
                  <span key={badge} className="kappa-pill">
                    {badge}
                  </span>
                ))}
              </div>

              <p className="mt-8 text-base font-medium text-cyan">{HOME_ABOUT.closing}</p>
            </div>

            <div className="relative">
              <div className="kappa-about-glow" />
              <div className="kappa-about-card">
                <div className="kappa-about-visual" />

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {HOME_ABOUT.sideLabels.map((label) => (
                    <div key={label} className="kappa-about-mini-card">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="Servizi"
            subtitle="Ogni servizio e progettato per unire presenza visiva ad alto impatto e struttura tecnica pronta a performare."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service) => (
              <CardService key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap border-y border-white/10 bg-[#070b1a]">
        <div className="container-main">
          <SectionTitle
            title="Progetti"
            subtitle="Case selezionati dove estetica, esperienza immersiva e logica di sistema convertono attenzione in opportunita concrete."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project) => (
              <CardProject key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="Processo"
            subtitle="Un workflow chiaro in sei step: dalla visione strategica all'esecuzione tecnica orientata al risultato."
          />

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step} className="kappa-step-card">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan/75">Step {index + 1}</p>
                <p className="mt-3 text-sm text-white/82">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="container-main">
          <ContactBlock />
        </div>
      </section>
    </div>
  );
}
