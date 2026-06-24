import Link from "next/link";
import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import { CONTACT_INFO } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Chi Sono",
  description:
    "Profilo Kappa404: visual engineer e digital builder a Milano, specializzato in web engineering, automazioni AI e direzione creativa premium.",
  path: "/chi-sono"
});

export default function ChiSonoPage() {
  return (
    <>
      <JsonLd
        id="kappa404-chi-sono-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Chi Sono", path: "/chi-sono" }
        ])}
      />
      <PageHero
        eyebrow="IDENTITY // KAPPA404 PROFILE"
        title="Chi sono"
        description="Visual engineer e digital builder basato a Milano: progetto ecosistemi dove creativita, infrastruttura e automazione lavorano come un unico sistema."
        chips={["Milan base", "Web engineering", "AI automation", "LinkedIn"]}
        actions={[
          { label: "Vai ai contatti", href: "/contatti" },
          { label: "Apri LinkedIn", href: CONTACT_INFO.linkedin, external: true, tone: "secondary" },
          { label: "Esplora i servizi", href: "/servizi", tone: "secondary" }
        ]}
      />

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
          <SectionTitle
            title="Timeline sintetica"
            subtitle="Il percorso si e costruito integrando progressivamente visual storytelling, sviluppo e architettura di sistemi digitali."
            eyebrow="Career path // evolution"
          />
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
          <Link href="/contatti#form" className="btn-primary mb-8 inline-flex">
            Collabora
          </Link>
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
