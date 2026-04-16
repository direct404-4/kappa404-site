import CardProject from "@/components/CardProject";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { PROJECTS } from "@/lib/content";

export const metadata = {
  title: "Progetti"
};

export default function ProgettiPage() {
  return (
    <>
      <PageHero
        eyebrow="ARCHIVE // SELECTED DEPLOYMENTS"
        title="Progetti / Portfolio"
        description="Archivio attuale dei lavori pubblicati: per ora rimane online solo il progetto realizzato per Kalamata Yachting e Kapouleas Cruise, gli altri case study verranno inseriti appena pronti."
        chips={["Website", "Drone video", "Photography"]}
      />

      <section className="pb-20">
        <div className="container-main mx-auto grid max-w-2xl gap-6">
          {PROJECTS.map((project) => (
            <CardProject key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section-gap border-t border-white/10">
        <div className="container-main">
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
