import Image from "next/image";
import Link from "next/link";
import ContactBlock from "@/components/ContactBlock";
import JsonLd from "@/components/JsonLd";
import SectionTitle from "@/components/SectionTitle";
import WhatsAppProjectForm from "@/components/WhatsAppProjectForm";
import { AUDIT_LANDING, CONTACT_INFO, PROJECTS, SERVICES } from "@/lib/content";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Audit iniziale",
  description:
    "Richiedi un audit iniziale Kappa404 per capire cosa blocca sito, funnel, automazioni AI e presenza digitale prima di avviare un progetto.",
  path: "/audit-iniziale"
});

const proofProject = PROJECTS[0];
const focusedServices = AUDIT_LANDING.serviceFocus
  .map((slug) => SERVICES.find((service) => service.slug === slug))
  .filter((service): service is (typeof SERVICES)[number] => Boolean(service));

export default function AuditInizialePage() {
  return (
    <>
      <JsonLd
        id="kappa404-audit-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Audit iniziale", path: "/audit-iniziale" }
        ])}
      />
      <JsonLd id="kappa404-audit-faq" data={faqJsonLd(AUDIT_LANDING.faqs)} />

      <section className="relative overflow-hidden border-b border-white/10 bg-[#050505]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[520px] w-[min(920px,92vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_12%,rgba(0,242,255,0.18),rgba(188,19,254,0.08)_36%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.92)),radial-gradient(circle_at_18%_20%,rgba(0,242,255,0.08),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(188,19,254,0.08),transparent_22%)]" />
        </div>

        <div className="container-main relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-headline text-4xl font-bold uppercase tracking-normal text-white md:text-6xl">
              {AUDIT_LANDING.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">{AUDIT_LANDING.hero.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#form" className="btn-primary">
                {AUDIT_LANDING.hero.primaryCta}
              </Link>
              <a href={CONTACT_INFO.emailHref} className="btn-secondary">
                {AUDIT_LANDING.hero.secondaryCta}
              </a>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-white/68 sm:grid-cols-2">
              <li className="border border-white/10 bg-white/[0.03] px-4 py-3">Email professionale come canale principale</li>
              <li className="border border-white/10 bg-white/[0.03] px-4 py-3">WhatsApp solo per intake rapido</li>
            </ul>
          </div>

          <aside className="border border-[#00f2ff]/18 bg-[#071018]/82 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#00f2ff]">Audit scope</p>
            <h2 className="mt-4 font-headline text-2xl font-bold uppercase tracking-normal text-white">Cosa viene chiarito subito</h2>
            <div className="mt-6 grid gap-4">
              {AUDIT_LANDING.auditPoints.map((point) => (
                <article key={point.title} className="border-l border-[#00f2ff]/30 pl-4">
                  <h3 className="font-headline text-base font-semibold uppercase text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{point.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            eyebrow="Audit // problemi e risultati"
            title="Dove l'audit crea chiarezza"
            subtitle="La prima analisi non promette numeri inventati: serve a separare ciò che blocca il progetto da ciò che può essere costruito subito."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {focusedServices.map((service) => (
              <article key={service.slug} className="card-shell">
                <h3 className="font-headline text-xl font-bold uppercase tracking-normal text-white">{service.nome}</h3>
                <div className="mt-5 grid gap-4 text-sm leading-7 text-white/74">
                  <p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Problema //</span> {service.bullet.problema}
                  </p>
                  <p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00f2ff]">Risultato //</span> {service.bullet.risultato}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070a18] py-20">
        <div className="container-main grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="card-shell overflow-hidden p-0">
            <Image
              src={proofProject.image ?? "/kalamata-yachting-yacht.jpg"}
              alt={proofProject.imageAlt ?? proofProject.title}
              width={1600}
              height={1066}
              className="aspect-[4/3] w-full object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>

          <div>
            <p className="kappa-section-tag">Proof // progetto pubblicabile</p>
            <h2 className="mt-5 font-headline text-3xl font-bold uppercase tracking-normal text-white md:text-5xl">
              Kalamata Yachting come prova concreta
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/76 md:text-base">
              Il case study mostra come sito, architettura informativa, fotografia e drone video possano lavorare insieme per un servizio premium reale, senza
              metriche o testimonianze non documentate.
            </p>

            <ul className="mt-7 grid gap-3 text-sm text-white/72 sm:grid-cols-2">
              {proofProject.outputs?.slice(0, 4).map((output) => (
                <li key={output} className="border border-white/10 bg-white/[0.03] px-4 py-3">
                  {output}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/progetti/${proofProject.slug}`} className="btn-primary">
                Leggi il case study
              </Link>
              {proofProject.liveUrl ? (
                <a href={proofProject.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  Vedi sito live
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-main">
          <SectionTitle
            eyebrow="FAQ // prima del contatto"
            title="Domande rapide sull'audit"
            subtitle="Risposte essenziali prima di inviare una richiesta, senza aggiungere un form backend o tracking marketing."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {AUDIT_LANDING.faqs.map((faq) => (
              <article key={faq.question} className="card-shell">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-white/74">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="section-gap border-t border-white/10 bg-[#050505]">
        <div className="container-main grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <WhatsAppProjectForm mode="contact" />
          <ContactBlock
            title="Preferisci un contatto professionale?"
            description="Per brief strutturati, documenti o richieste formali usa l'email. WhatsApp resta utile per un primo intake rapido."
          />
        </div>
      </section>
    </>
  );
}
