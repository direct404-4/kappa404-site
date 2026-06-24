import CardProject from "@/components/CardProject";
import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { PROJECTS } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Progetti",
  description:
    "Portfolio Kappa404 con progetti web, visual engineering e contenuti premium realizzati per brand e servizi orientati alla crescita.",
  path: "/progetti"
});

export default function ProgettiPage() {
  return (
    <>
      <JsonLd
        id="kappa404-progetti-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Progetti", path: "/progetti" }
        ])}
      />
      <PageHero
        eyebrow="ARCHIVE // SELECTED DEPLOYMENTS"
        title="Progetti / Portfolio"
        description="Selezione di progetti pubblicabili. Ulteriori casi e materiali riservati vengono presentati durante il briefing, quando pertinenti."
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
