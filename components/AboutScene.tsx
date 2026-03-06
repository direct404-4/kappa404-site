import { CONTACT_INFO } from "@/lib/content";

const TIMELINE = [
  { year: "01", title: "KAPPA404", text: "Identita orientata a progettare presenza digitale con impatto premium." },
  { year: "02", title: "Digital Architect", text: "Architetture web performanti e sistemi visuali coerenti con il brand." },
  { year: "03", title: "AI Automation", text: "Workflow intelligenti per accelerare produzione, lead flow e operativita." },
  { year: "04", title: "Creative Engineering", text: "Unione concreta tra design futuristico, codice e direzione strategica." },
];

export default function AboutScene() {
  return (
    <section className="section-gap border-y border-white/10 bg-[#050914]" aria-label="About Kappa404">
      <div className="container-main grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="kappa-hero-chip">About // Kappa404</span>
          <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">Sistema creativo, struttura tecnica, output reale.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
            Kappa404 opera da {CONTACT_INFO.base} con un approccio da digital lab: ogni esperienza parte dalla visione estetica e viene trasformata in
            infrastruttura concreta, misurabile e scalabile.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
            L&apos;obiettivo non e creare pagine isolate ma costruire ecosistemi in cui design, AI e automazione lavorano insieme per posizionare il brand e
            accelerare risultati.
          </p>
        </div>

        <ol className="space-y-4">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_12%_0%,rgba(0,229,255,0.18),transparent_42%)]" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan/80">{item.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
