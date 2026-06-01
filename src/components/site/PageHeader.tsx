type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-serif text-4xl text-white md:text-5xl lg:text-6xl">{title}</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-gold" />
        {description && (
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
