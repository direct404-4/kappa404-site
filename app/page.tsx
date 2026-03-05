import Link from "next/link";

export default function HomePage() {
  return (
    <div className="studio-page studio-font-body">
      <section className="studio-hero">
        <h1 className="studio-font-title">
          AI • Web • <span className="studio-gradient">Digital Studio</span>
        </h1>

        <p>Costruiamo siti web, automazioni AI e contenuti digitali per aziende moderne.</p>

        <div className="studio-cta">
          <a href="https://wa.me/393520007587" target="_blank" rel="noreferrer">
            <button type="button">Parla su WhatsApp</button>
          </a>
        </div>
      </section>

      <section className="studio-section">
        <h2 className="studio-font-title">Servizi</h2>

        <div className="studio-services">
          <div className="studio-card">
            <h3>Web Design</h3>
            <p>Siti professionali e landing page ottimizzate.</p>
          </div>

          <div className="studio-card">
            <h3>Video Production</h3>
            <p>Reel social e video marketing ad alto impatto.</p>
          </div>

          <div className="studio-card">
            <h3>AI Automation</h3>
            <p>Automazioni intelligenti per il tuo business.</p>
          </div>
        </div>
      </section>

      <section className="studio-section">
        <h2 className="studio-font-title">Portfolio</h2>
        <p>Progetti digitali e creativi realizzati per brand moderni.</p>
      </section>

      <section className="studio-section">
        <h2 className="studio-font-title">Pronto a crescere online?</h2>
        <a href="https://wa.me/393520007587" target="_blank" rel="noreferrer">
          <button type="button">Richiedi Preventivo</button>
        </a>
        <div className="studio-link-row">
          <Link href="/servizi">Vai ai servizi</Link>
          <Link href="/progetti">Guarda portfolio completo</Link>
          <Link href="/contatti">Contatti diretti</Link>
        </div>
      </section>
    </div>
  );
}
