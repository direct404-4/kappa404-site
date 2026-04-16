"use client";

type SectionTitleProps = {
  title: string;
  subtitle: string;
  align?: "left" | "center";
  eyebrow?: string;
};

export default function SectionTitle({ title, subtitle, align = "left", eyebrow = "Kappa404 // active section" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`kappa-section-tag ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="mt-5 font-headline text-3xl font-bold uppercase tracking-[-0.04em] text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-white/72">{subtitle}</p>
    </div>
  );
}
