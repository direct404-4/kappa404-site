import { CONTACT_CHANNELS } from "@/lib/content";

type ContactBlockProps = {
  variant?: "home" | "panel";
  title?: string;
  description?: string;
};

const PRIMARY_CHANNELS = CONTACT_CHANNELS.slice(0, 2);

export default function ContactBlock({
  variant = "panel",
  title = "Parliamo del tuo prossimo sistema digitale.",
  description = "Raccontami obiettivo, tempistiche e priorita: riceverai un primo allineamento chiaro su direzione tecnica, visuale e prossimo step."
}: ContactBlockProps) {
  if (variant === "home") {
    return (
      <div className="kappa-contact-panel">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="kappa-section-tag">UPLINK // DIRECT CHANNELS</p>
            <h3 className="mt-5 text-3xl font-semibold uppercase tracking-[0.04em] text-white md:text-5xl">{title}</h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">{description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {PRIMARY_CHANNELS.map((channel, index) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className={index === 0 ? "btn-primary" : "btn-secondary"}
                >
                  {channel.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="kappa-contact-channel"
              >
                <span className="kappa-contact-channel__label">{channel.label}</span>
                <strong className="mt-3 block text-base text-white">{channel.value}</strong>
                <span className="mt-2 block text-sm text-white/60">{channel.note}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kappa-contact-panel">
      <p className="kappa-section-tag">UPLINK // DIRECT CHANNELS</p>
      <h3 className="mt-5 text-2xl font-semibold uppercase tracking-[0.04em] text-white md:text-3xl">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{description}</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => (
          <a
            key={channel.id}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            className="kappa-contact-channel"
          >
            <span className="kappa-contact-channel__label">{channel.label}</span>
            <strong className="mt-3 block text-base text-white">{channel.value}</strong>
            <span className="mt-2 block text-sm text-white/60">{channel.note}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
