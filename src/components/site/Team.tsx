import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import denisonAsset from "@/assets/denison.png.asset.json";
import marcioAsset from "@/assets/marcio.png.asset.json";
import higorAsset from "@/assets/higor.png.asset.json";
import joaoAsset from "@/assets/joao.png.asset.json";
import renataAsset from "@/assets/renata.png.asset.json";

const team = [
  { name: "Dr. Denison Henrique Leandro", role: "Sócio Fundador", email: "denison@dhleandro.adv.br", photo: denisonAsset.url },
  { name: "Dr. Márcio Barbosa da Silva", role: "Advogado", email: "marcio@dhleandro.adv.br", photo: marcioAsset.url },
  { name: "Dr. Higor Henrique Leandro", role: "Advogado", email: "higor@dhleandro.adv.br", photo: higorAsset.url },
  { name: "Dr. João Tadeu Leandro", role: "Advogado", email: "joao@dhleandro.adv.br", photo: joaoAsset.url },
  { name: "Dra. Renata Henrique Leandro", role: "Advogada", email: "renata@dhleandro.adv.br", photo: renataAsset.url },
  { name: "Dr. Juan Albner Pereira Veloso", role: "Advogado", email: "juan@dhleandro.adv.br", photo: null },
  { name: "Dr. Igor Augusto Batista Antunes", role: "Advogado", email: "igor@dhleandro.adv.br", photo: null },
  { name: "Dra. Danielle Cristina Mateus Pereira", role: "Advogada", email: "danielle@dhleandro.adv.br", photo: null },
];

export function Team() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Equipe
          </span>
          <h2 className="mt-4 font-serif text-4xl text-deep md:text-5xl">
            Nossos Advogados
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
            >
              <div className="h-28 w-28 overflow-hidden rounded-full placeholder-image ring-2 ring-gold/20 transition-all group-hover:ring-gold/50" />
              <h3 className="mt-5 font-serif text-lg text-navy">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              <a
                href={`mailto:${member.email}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
                aria-label={`Enviar e-mail para ${member.name}`}
              >
                <Mail size={16} strokeWidth={1.8} />
                <span>Contato</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/profissionais"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-gold-foreground shadow-elegant transition-all hover:brightness-110"
          >
            Ver todos os profissionais
          </Link>
        </div>
      </div>
    </section>
  );
}
