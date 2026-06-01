import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/profissionais")({
  head: () => ({
    meta: [
      { title: "Profissionais | Denison Henrique Leandro e Advogados Associados" },
      {
        name: "description",
        content:
          "Conheça os advogados e a equipe administrativa do escritório Denison Henrique Leandro e Advogados Associados.",
      },
      { property: "og:title", content: "Profissionais | Denison Henrique Leandro" },
      {
        property: "og:description",
        content: "Equipe multidisciplinar formada por advogados experientes e dedicados.",
      },
    ],
  }),
  component: ProfissionaisPage,
});

const lawyers = [
  { name: "Dr. Denison Henrique Leandro", role: "Sócio Fundador", email: "denison@denisonleandro.adv.br" },
  { name: "Dr. Márcio Barbosa da Silva", role: "Advogado", email: "marcio@denisonleandro.adv.br" },
  { name: "Dr. Higor Henrique Leandro", role: "Advogado", email: "higor@denisonleandro.adv.br" },
  { name: "Dr. João Tadeu Leandro", role: "Advogado", email: "joao@denisonleandro.adv.br" },
  { name: "Dra. Renata Henrique Leandro", role: "Advogada", email: "renata@denisonleandro.adv.br" },
  { name: "Dr. Juan Albner Pereira Veloso", role: "Advogado", email: "juan@denisonleandro.adv.br" },
  { name: "Dr. Igor Augusto Batista Antunes", role: "Advogado", email: "igor@denisonleandro.adv.br" },
  { name: "Dra. Danielle Cristina Mateus Pereira", role: "Advogada", email: "danielle@denisonleandro.adv.br" },
];

const admin = [
  { name: "Maria Inês Gomes da Silva", role: "Administrativo / Financeiro", email: "financeiro@denisonleandro.adv.br" },
  { name: "Leonardo Nascimento de Aguiar", role: "Administrativo / Financeiro", email: "administrativo@denisonleandro.adv.br" },
];

function Card({ name, role, email }: { name: string; role: string; email: string }) {
  return (
    <div className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant">
      <div className="h-28 w-28 overflow-hidden rounded-full placeholder-image ring-2 ring-gold/20 transition-all group-hover:ring-gold/50" />
      <h3 className="mt-5 font-serif text-lg text-navy">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      <a
        href={`mailto:${email}`}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
        aria-label={`Enviar e-mail para ${name}`}
      >
        <Mail size={16} strokeWidth={1.8} />
        <span>Contato</span>
      </a>
    </div>
  );
}

function ProfissionaisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Equipe"
          title="Profissionais"
          description="Uma equipe multidisciplinar pronta para defender com excelência os interesses de cada cliente."
        />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Corpo jurídico
              </span>
              <h2 className="mt-4 font-serif text-3xl text-deep md:text-4xl">Advogados</h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {lawyers.map((m) => (
                <Card key={m.name} {...m} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Suporte
              </span>
              <h2 className="mt-4 font-serif text-3xl text-deep md:text-4xl">
                Administrativo e Financeiro
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto lg:grid-cols-2">
              {admin.map((m) => (
                <Card key={m.name} {...m} />
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
