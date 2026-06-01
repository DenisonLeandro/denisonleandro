import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias | Denison Henrique Leandro e Advogados Associados" },
      {
        name: "description",
        content:
          "Artigos e novidades jurídicas sobre direito trabalhista, previdenciário, consumidor e mais, escritos pela equipe do escritório.",
      },
      { property: "og:title", content: "Notícias | Denison Henrique Leandro" },
      {
        property: "og:description",
        content: "Acompanhe artigos e novidades do mundo jurídico.",
      },
    ],
  }),
  component: NoticiasPage,
});

const articles = [
  {
    category: "Trabalhista",
    title: "Horas extras não pagas: como o trabalhador pode comprovar e cobrar na Justiça",
    excerpt:
      "Entenda quais provas são aceitas pela Justiça do Trabalho e quais são os prazos para reivindicar valores pendentes de horas extraordinárias.",
    date: "12 de maio de 2026",
  },
  {
    category: "Previdenciário",
    title: "Aposentadoria por tempo de contribuição após a Reforma da Previdência",
    excerpt:
      "Conheça as regras de transição que ainda estão em vigor e descubra qual delas é mais vantajosa para o seu caso específico junto ao INSS.",
    date: "28 de abril de 2026",
  },
  {
    category: "Consumidor",
    title: "Cobrança indevida no cartão de crédito: o que fazer e como ser ressarcido",
    excerpt:
      "Saiba o passo a passo para contestar lançamentos indevidos, solicitar o estorno em dobro e, se for o caso, pleitear indenização por danos morais.",
    date: "15 de abril de 2026",
  },
  {
    category: "Família",
    title: "Pensão alimentícia: critérios usados pelo juiz para fixar o valor",
    excerpt:
      "O binômio necessidade x possibilidade segue sendo o principal parâmetro. Veja como o Judiciário tem aplicado essa regra em decisões recentes.",
    date: "02 de abril de 2026",
  },
  {
    category: "Bancário",
    title: "Revisional de contrato: quando vale a pena questionar juros e tarifas bancárias",
    excerpt:
      "Nem todo contrato bancário comporta revisão. Entenda as situações em que a discussão judicial pode trazer economia significativa ao consumidor.",
    date: "20 de março de 2026",
  },
  {
    category: "Previdenciário",
    title: "BPC/LOAS: quem tem direito ao benefício assistencial de um salário mínimo",
    excerpt:
      "Idosos a partir de 65 anos e pessoas com deficiência em situação de vulnerabilidade econômica podem receber o benefício. Conheça os requisitos atualizados.",
    date: "05 de março de 2026",
  },
];

function NoticiasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Conteúdo jurídico"
          title="Notícias"
          description="Artigos, análises e novidades do mundo do Direito produzidos pela equipe do escritório."
        />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <article
                  key={a.title}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant"
                >
                  <div className="aspect-[16/10] w-full placeholder-image" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {a.category}
                    </span>
                    <h2 className="mt-4 font-serif text-xl leading-snug text-navy">
                      {a.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                      {a.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={14} />
                        {a.date}
                      </span>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-gold"
                      >
                        Leia mais
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
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
