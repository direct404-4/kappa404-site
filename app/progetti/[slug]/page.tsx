import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactBlock from "@/components/ContactBlock";
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

  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <p className="text-xs uppercase tracking-[0.24em] text-violet/80">{project.categoria}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-base text-white/78">{project.descrizione}</p>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main grid gap-6 md:grid-cols-2">
          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="mt-4 text-sm text-white/76">
              Progetto costruito per orchestrare estetica e funzionalita in un unico flusso operativo, con dashboard e componenti riutilizzabili.
            </p>
          </article>

          <article className="card-shell">
            <h2 className="text-xl font-semibold text-white">Problema</h2>
            <p className="mt-4 text-sm text-white/76">
              Necessita di coordinare team creativi e tecnici senza dispersione di informazioni durante le fasi di delivery.
            </p>
          </article>

          <article className="card-shell md:col-span-2">
            <h2 className="text-xl font-semibold text-white">Soluzione sviluppata</h2>
            <p className="mt-4 text-sm text-white/76">
              Architettura modulare con UI dedicata, automazioni di stato e layer di monitoraggio che riduce tempi di allineamento e errori di produzione.
            </p>
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
        <div className="container-main grid gap-6 md:grid-cols-2">
          <div className="card-shell overflow-hidden p-0">
            <Image
              src="/img-project-placeholder.jpg"
              alt="Project placeholder"
              width={1400}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="card-shell overflow-hidden p-0">
            <Image
              src="/img-project-placeholder.jpg"
              alt="Project placeholder detail"
              width={1400}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
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
