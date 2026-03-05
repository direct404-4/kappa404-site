"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import CardProject from "@/components/CardProject";
import CardService from "@/components/CardService";
import ContactBlock from "@/components/ContactBlock";
import RailSafeBoundary from "@/components/rail3d/RailSafeBoundary";
import SectionTitle from "@/components/SectionTitle";
import { GlowFollow } from "@/components/hero/GlowFollow";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_ABOUT, PROCESS_STEPS, PROJECTS, SERVICES } from "@/lib/content";

const RailStage = dynamic(
  () =>
    import("@/components/rail3d/RailStage")
      .then((mod) => mod.default)
      .catch(() => {
        const Fallback = () => (
          <section className="relative h-screen border-y border-white/10 bg-[#030611]">
            <div className="container-main flex h-full items-center justify-center">
              <div className="max-w-xl rounded-2xl border border-cyan/35 bg-[#070d22]/82 px-6 py-5 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan/90">3D disabled</p>
                <p className="mt-3 text-sm text-white/78">Caricamento scena 3D non riuscito.</p>
              </div>
            </div>
          </section>
        );

        return Fallback;
      }),
  {
    ssr: false,
    loading: () => (
      <section className="relative h-screen border-y border-white/10 bg-[#030611]">
        <div className="container-main flex h-full items-center justify-center">
          <p className="rounded-full border border-cyan/35 bg-cyan/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-cyan/90">
            Project Rail Loading...
          </p>
        </div>
      </section>
    ),
  },
);

export default function HomePage() {
  return (
    <div className="kappa-home">
      <section className="kappa-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(139,92,246,0.18),transparent_50%),radial-gradient(1000px_circle_at_80%_20%,rgba(59,130,246,0.16),transparent_55%)]" />
        <div className="kappa-hero-nebula" />
        <div className="kappa-hero-grid" />
        <GlowFollow />

        <div className="container-main relative z-10 py-24 text-center md:py-32">
          <Reveal>
            <span className="kappa-hero-chip">KAPPA404 // Digital Vision Craft</span>

            <h1 className="kappa-hero-title">
              KAPPA404
              <span>AI Visual Engineering</span>
            </h1>

            <p className="kappa-hero-copy">
              Ecosistemi digitali premium dove design futuristico, sviluppo moderno e automazione intelligente lavorano insieme per creare presenza, valore e risultato.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contatti#form"
                className="btn-primary transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(0,229,255,0.35)]"
              >
                Inizia ora
              </Link>
              <Link
                href="/progetti"
                className="btn-secondary transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(139,92,246,0.3)]"
              >
                Guarda i progetti
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="kappa-pill">Creative Direction</span>
              <span className="kappa-pill">Web Systems</span>
              <span className="kappa-pill">AI Visual Workflow</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-gap kappa-about-wrap">
        <div className="container-main">
          <Reveal>
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
                    {HOME_ABOUT.sideLabels.map((label, index) => (
                      <Reveal key={label} delay={index * 0.06}>
                        <div className="kappa-about-mini-card">{label}</div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="Servizi"
            subtitle="Ogni servizio e progettato per unire presenza visiva ad alto impatto e struttura tecnica pronta a performare."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <CardService service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RailSafeBoundary>
        <RailStage />
      </RailSafeBoundary>

      <section className="section-gap border-y border-white/10 bg-[#070b1a]">
        <div className="container-main">
          <SectionTitle
            title="Progetti"
            subtitle="Case selezionati dove estetica, esperienza immersiva e logica di sistema convertono attenzione in opportunita concrete."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <CardProject project={project} />
              </Reveal>
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
                <Reveal delay={index * 0.04}>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan/75">Step {index + 1}</p>
                  <p className="mt-3 text-sm text-white/82">{step}</p>
                </Reveal>
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
