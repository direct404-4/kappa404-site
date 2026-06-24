"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

type CardProjectProps = {
  project: Project;
};

export default function CardProject({ project }: CardProjectProps) {
  return (
    <article className="group kappa-data-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative flex h-full flex-col">
        {project.image ? (
          <div className="mb-6 overflow-hidden border border-white/10 bg-black/20">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              width={1200}
              height={800}
              priority
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}

        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="kappa-data-card__label">Project archive</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#bc13fe]/80">{project.categoria}</span>
        </div>

        <h3 className="font-headline text-2xl font-bold uppercase tracking-[-0.03em] text-white">{project.title}</h3>
        {project.client ? <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#00f2ff]/76">{project.client}</p> : null}
        <p className="mt-4 text-sm leading-7 text-white/72">{project.descrizione}</p>

        <Link
          href={`/progetti/${project.slug}`}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00f2ff] transition-colors hover:text-white"
        >
          Apri progetto <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
