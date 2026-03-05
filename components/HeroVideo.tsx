import Link from "next/link";

export default function HeroVideo() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="/intro-poster.jpg"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#070914]/65 to-[#04040a]" />

      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-20 md:px-6 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan/80">Kappa404 — AI Visual Engineering</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            Sistemi digitali e visual premium per brand che vogliono accelerare.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            Progettiamo esperienze web, automazioni AI e direzione creativa orientata a performance e identita.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/servizi" className="btn-primary">
              Esplora servizi
            </Link>
            <Link href="/progetti" className="btn-secondary">
              Vedi portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
