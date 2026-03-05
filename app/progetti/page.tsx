import SectionTitle from "@/components/SectionTitle";
import CardProject from "@/components/CardProject";
import ContactBlock from "@/components/ContactBlock";
import { PROJECTS } from "@/lib/content";

export const metadata = {
  title: "Progetti"
};

export default function ProgettiPage() {
  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <SectionTitle
            title="Progetti / Portfolio"
            subtitle="Selezione di sistemi digitali realizzati per contesti premium, con focus su resa visiva e controllo tecnico."
          />
        </div>
      </section>

      <section className="py-10">
        <div className="container-main flex flex-wrap gap-3">
          {["Web", "AI", "Software", "Visual", "Automation"].map((filter) => (
            <button key={filter} type="button" className="btn-secondary text-xs uppercase tracking-[0.18em]">
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-main grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
