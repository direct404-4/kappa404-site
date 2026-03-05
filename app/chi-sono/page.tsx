import ContactBlock from "@/components/ContactBlock";
import SectionTitle from "@/components/SectionTitle";
import { CONTACT_INFO } from "@/lib/content";

export const metadata = {
  title: "Chi Sono"
};

export default function ChiSonoPage() {
  return (
    <>
      <section className="section-gap border-b border-white/10 bg-[#060916]">
        <div className="container-main">
          <SectionTitle
            title="Kappa404"
            subtitle="Visual engineer e digital builder basato a Milan: sviluppo ecosistemi dove creativita e infrastruttura lavorano in sinergia."
          />
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main grid gap-6 md:grid-cols-2">
          <article className="card-shell">
            <h2 className="text-2xl font-semibold text-white">Mission</h2>
            <p className="mt-4 text-sm text-white/78">{CONTACT_INFO.mission}</p>
          </article>

          <article className="card-shell">
            <h2 className="text-2xl font-semibold text-white">Competenze</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/78">
              <li>Architettura web moderna e performance engineering</li>
              <li>Automazioni AI e design di workflow operativi</li>
              <li>Creative direction per contenuti luxury e drone cinema</li>
              <li>Costruzione software custom orientato a business logic reali</li>
            </ul>
          </article>

          <article className="card-shell md:col-span-2">
            <h2 className="text-2xl font-semibold text-white">Filosofia</h2>
            <p className="mt-4 text-sm text-white/78">
              La tecnologia e efficace quando resta invisibile e lascia emergere chiarezza: meno attrito operativo, piu velocita di decisione, identita forte in ogni touchpoint.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070a18] py-20">
        <div className="container-main">
          <h2 className="text-3xl font-semibold text-white">Timeline sintetica</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="card-shell text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan/80">Fase 1</p>
              <p className="mt-2">Sviluppo base tra visual storytelling e produzione video.</p>
            </li>
            <li className="card-shell text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan/80">Fase 2</p>
              <p className="mt-2">Transizione verso web engineering e sistemi digitali custom.</p>
            </li>
            <li className="card-shell text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan/80">Fase 3</p>
              <p className="mt-2">Integrazione AI per ecosistemi scalabili dedicati a brand premium.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <a href="/contatti#form" className="btn-primary mb-8 inline-flex">
            Collabora
          </a>
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
