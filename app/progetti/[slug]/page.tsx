import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactBlock from "@/components/ContactBlock";
import PageHero from "@/components/PageHero";
import { PROJECTS } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Progetto non trovato" };
  }

  return {
    title: project.title,
    description: project.descrizione
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const heroActions = project.liveUrl
    ? [
        { label: "Vedi sito live", href: project.liveUrl, external: true as const },
        { label: "Tutti i progetti", href: "/progetti", tone: "secondary" as const }
      ]
    : [
        { label: "Tutti i progetti", href: "/progetti", tone: "secondary" as const },
        { label: "Apri contatti", href: "/contatti" }
      ];

  return (
    <>
      <PageHero
        eyebrow={`PROJECT ARCHIVE // ${project.categoria.toUpperCase()}`}
        title={project.title}
        description={project.descrizione}
        chips={project.stack.slice(0, 3)}
        actions={heroActions}
      />

      <section className="section-gap">
        <div className="container-main grid gap-6 md:grid-cols-2">
          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="mt-4 text-sm text-white/76">{project.overview ?? "Progetto costruito per orchestrare estetica e funzionalita in un unico flusso operativo, con dashboard e componenti riutilizzabili."}</p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Cliente</h2>
            <div className="mt-4 space-y-3 text-sm text-white/76">
              <p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Brand //</span> {project.client ?? "Kappa404 selected client"}
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Categoria //</span> {project.categoria}
              </p>
              {project.liveUrl ? (
                <p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Live //</span>{" "}
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-white underline decoration-white/30 underline-offset-4 hover:text-[#00f2ff]">
                    {project.liveUrl.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              ) : null}
            </div>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Problema</h2>
            <p className="mt-4 text-sm text-white/76">{project.problem ?? "Necessita di coordinare team creativi e tecnici senza dispersione di informazioni durante le fasi di delivery."}</p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Soluzione sviluppata</h2>
            <p className="mt-4 text-sm text-white/76">{project.solution ?? "Architettura modulare con UI dedicata, automazioni di stato e layer di monitoraggio che riduce tempi di allineamento e errori di produzione."}</p>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070a18] py-20">
        <div className="container-main grid gap-6 md:grid-cols-2">
          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Highlights</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-white/78">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Stack tecnico</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="card-shell overflow-hidden p-0">
            <Image
              src={project.image ?? "/img-project-placeholder.jpg"}
              alt={project.imageAlt ?? project.title}
              width={2200}
              height={1466}
              className="h-full w-full object-cover"
            />
          </div>

          <article className="kappa-data-card">
            <span className="kappa-data-card__label">Project signal</span>
            <h2 className="mt-6 font-headline text-3xl font-bold uppercase tracking-[-0.03em] text-white">Outcome</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {project.outcome ?? "Un sistema digitale più ordinato, credibile e leggibile, costruito per valorizzare il progetto e guidare meglio il visitatore tra contenuti, offerta e contatto."}
            </p>

            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8 w-full">
                Apri il progetto online
              </a>
            ) : null}
          </article>
        </div>
      </section>

      <section className="section-gap pt-0">
        <div className="container-main">
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
