import Link from "next/link";
import type { Project } from "@/lib/content";

type CardProjectProps = {
  project: Project;
};

export default function CardProject({ project }: CardProjectProps) {
  return (
    <article className="card-shell flex h-full flex-col">
      <p className="text-xs uppercase tracking-[0.18em] text-violet/90">{project.categoria}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-white/75">{project.descrizione}</p>

      <Link href={`/progetti/${project.slug}`} className="mt-7 inline-flex text-sm font-medium text-cyan hover:text-white">
        Vedi progetto →
      </Link>
    </article>
  );
}
