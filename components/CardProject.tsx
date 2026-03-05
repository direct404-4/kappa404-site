import Link from "next/link";
import type { Project } from "@/lib/content";

type CardProjectProps = {
  project: Project;
};

export default function CardProject({ project }: CardProjectProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(520px circle at 20% 10%, rgba(0,229,255,0.16), transparent 42%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <p className="text-xs uppercase tracking-[0.18em] text-violet/90">{project.categoria}</p>
        <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/75">{project.descrizione}</p>

        <Link href={`/progetti/${project.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-white">
          Vedi progetto <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
