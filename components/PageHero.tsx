import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
  tone?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
  actions?: HeroAction[];
};

export default function PageHero({ eyebrow, title, description, chips = [], actions = [] }: PageHeroProps) {
  const getButtonClassName = (tone?: HeroAction["tone"]) => (tone === "secondary" ? "btn-secondary" : "btn-primary");

  return (
    <section className="kappa-subpage-hero">
      <div className="kappa-hero-dot-grid" />
      <div className="kappa-subpage-hero__glow" />
      <div className="kappa-subpage-hero__beam" />

      <div className="container-main relative z-10 py-16 md:py-20">
        <div className="max-w-4xl">
          <p className="kappa-command-chip">
            <span className="kappa-command-chip__dot" />
            {eyebrow}
          </p>

          <h1 className="mt-6 font-headline text-4xl font-bold uppercase tracking-[-0.04em] text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">{description}</p>

          {chips.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span key={chip} className="kappa-signal-pill">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {actions.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => {
                const shouldUseAnchor = action.external || !action.href.startsWith("/");
                const shouldOpenNewTab = action.href.startsWith("http");

                return shouldUseAnchor ? (
                  <a
                    key={action.href}
                    href={action.href}
                    target={shouldOpenNewTab ? "_blank" : undefined}
                    rel={shouldOpenNewTab ? "noreferrer" : undefined}
                    className={getButtonClassName(action.tone)}
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link key={action.href} href={action.href} className={getButtonClassName(action.tone)}>
                    {action.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
