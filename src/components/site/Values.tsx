import { Award, BadgeCheck, Sparkles, HeartHandshake, Scale, Users } from "lucide-react";

const values = [
  { icon: BadgeCheck, title: "Credibilidade" },
  { icon: Award, title: "Competência" },
  { icon: Sparkles, title: "Excelência" },
  { icon: HeartHandshake, title: "Compromisso" },
  { icon: Scale, title: "Ética" },
  { icon: Users, title: "Respeito" },
];

export function Values() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-navy-foreground">
      <div className="absolute inset-0 placeholder-image-ornament opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Princípios</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Nossos Valores</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group flex items-center gap-5 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-white/[0.08]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold transition-transform group-hover:scale-110">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-navy-foreground">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
