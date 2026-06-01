import {
  Briefcase, ShieldCheck, ShoppingBag, Users, FileText, Landmark, Handshake, ArrowUpRight,
} from "lucide-react";

const areas = [
  { icon: Briefcase, title: "Trabalhista", desc: "Defesa dos direitos do trabalhador e do empregador." },
  { icon: ShieldCheck, title: "Previdenciário", desc: "Aposentadorias, revisões e benefícios do INSS." },
  { icon: ShoppingBag, title: "Consumidor", desc: "Proteção das relações de consumo e indenizações." },
  { icon: Users, title: "Família", desc: "Divórcios, guarda, pensão e inventários com sensibilidade." },
  { icon: FileText, title: "Contratos", desc: "Elaboração, análise e revisão de contratos complexos." },
  { icon: Landmark, title: "Bancário/Financeiro", desc: "Revisões, dívidas e operações bancárias abusivas." },
  { icon: Handshake, title: "Mediação", desc: "Resolução de conflitos com diálogo e eficiência." },
];

export function PracticeAreas() {
  return (
    <section id="areas" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Especialidades</span>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Áreas de Atuação</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <Icon size={22} />
              </div>
              <h3 className="font-serif text-xl text-navy">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <a
                href="#contato"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all group-hover:gap-2.5"
              >
                Saiba mais <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
