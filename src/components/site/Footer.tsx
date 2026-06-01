import { Mail, Phone, MapPin } from "lucide-react";

const sections = [
  {
    title: "Navegação",
    links: ["Início", "O Escritório", "Áreas de Atuação", "Profissionais", "Notícias", "Contato"],
  },
  {
    title: "Áreas",
    links: ["Trabalhista", "Previdenciário", "Consumidor", "Família", "Contratos", "Bancário", "Mediação"],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gold text-navy">
                <span className="font-serif text-xl font-bold">D</span>
              </div>
              <div className="leading-tight">
                <p className="font-serif text-base">Denison Henrique Leandro</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-navy-foreground/60">
                  Advogados Associados
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-navy-foreground/70">
              25 anos defendendo direitos com transparência, ética e excelência jurídica.
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-serif text-base text-gold">{s.title}</h4>
              <ul className="mt-5 space-y-3">
                {s.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-navy-foreground/70 transition-colors hover:text-gold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-serif text-base text-gold">Contato</h4>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>Londrina — PR<br />Sede principal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <span>(43) 0000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <span>contato@denisonadvogados.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Denison Henrique Leandro e Advogados Associados. Todos os direitos reservados.</p>
          <p>OAB/PR — Conforme provimentos da Ordem dos Advogados do Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
