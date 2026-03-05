type SectionTitleProps = {
  title: string;
  subtitle: string;
  align?: "left" | "center";
};

export default function SectionTitle({ title, subtitle, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs uppercase tracking-[0.24em] text-cyan/70">Kappa404</p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-white/72">{subtitle}</p>
    </div>
  );
}
