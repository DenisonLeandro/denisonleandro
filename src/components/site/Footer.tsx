import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

const navSection = {
  title: "Navegação",
  links: [
    { label: "Início", to: "/" as const },
    { label: "O Escritório", to: "/escritorio" as const },
    { label: "Áreas de Atuação", to: "/areas-de-atuacao" as const },
    { label: "Profissionais", to: "/profissionais" as const },
    { label: "Notícias", to: "/noticias" as const },
    { label: "Contato", to: "/contato" as const },
  ],
};

const areasSection = {
  title: "Áreas",
  links: ["Trabalhista", "Previdenciário", "Consumidor", "Família", "Contratos", "Bancário", "Mediação"],
};

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

          <div>
            <h4 className="font-serif text-base text-gold">{navSection.title}</h4>
            <ul className="mt-5 space-y-3">
              {navSection.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-gold">{areasSection.title}</h4>
            <ul className="mt-5 space-y-3">
              {areasSection.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/areas-de-atuacao"
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-gold"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-gold">Contato</h4>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>Av. Paraná, 343, 9º andar, sala 902<br />Centro — Londrina/PR</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:+554333228455" className="hover:text-gold">(43) 3322-8455</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href="mailto:contato@denisonleandro.adv.br" className="hover:text-gold">contato@denisonleandro.adv.br</a>
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
