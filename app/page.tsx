import Link from "next/link";
import AboutScene from "@/components/AboutScene";
import CardProject from "@/components/CardProject";
import CardService from "@/components/CardService";
import ContactBlock from "@/components/ContactBlock";
import HeroScene from "@/components/HeroScene";
import PortfolioSceneSlot from "@/components/PortfolioSceneSlot";
import SectionTitle from "@/components/SectionTitle";
import { PROCESS_STEPS, PROJECTS, SERVICES } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="kappa-home">
      <HeroScene />

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="Servizi"
            subtitle="Dal concept visivo alla delivery tecnica: servizi costruiti come moduli di un ecosistema digitale orientato al risultato."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service) => (
              <CardService key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <PortfolioSceneSlot />

      <section className="section-gap border-y border-white/10 bg-[#050814]">
        <div className="container-main">
          <SectionTitle
            title="Progetti"
            subtitle="Moduli operativi e visuali sviluppati per brand tecnologici, creative teams e business orientati alla crescita digitale."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project) => (
              <CardProject key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/progetti" className="btn-secondary">
              Portfolio completo
            </Link>
          </div>
        </div>
      </section>

      <AboutScene />

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            title="Processo"
            subtitle="Uno scroll-driven workflow in sei step: analisi, design, sviluppo e ottimizzazione continua del sistema digitale."
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

      <section className="section-gap border-t border-white/10 bg-[#02040f]">
        <div className="container-main">
          <div className="mb-8 text-center">
            <p className="kappa-hero-chip">Final Sequence</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">BUILDING DIGITAL SYSTEMS</h2>
            <p className="mt-4 text-white/72">Dal primo frame all&apos;infrastruttura finale: ogni progetto e una macchina digitale costruita per durare.</p>
          </div>

          <ContactBlock />
        </div>
      </section>
    </div>
  );
}
