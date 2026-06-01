import { createFileRoute } from "@tanstack/react-router";
import { Scale, Gavel, ShieldCheck, Award, Handshake, Heart, BookOpenCheck } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/escritorio")({
  head: () => ({
    meta: [
      { title: "O Escritório | Denison Henrique Leandro e Advogados Associados" },
      {
        name: "description",
        content:
          "Conheça o escritório Denison Henrique Leandro e Advogados Associados: 25 anos de tradição, excelência técnica e compromisso com a ética em todas as áreas do Direito.",
      },
      { property: "og:title", content: "O Escritório | Denison Henrique Leandro e Advogados" },
      {
        property: "og:description",
        content:
          "Tradição, ética e excelência técnica. Conheça nossa história, valores e formas de atuação.",
      },
    ],
  }),
  component: EscritorioPage,
});

const values = [
  { icon: ShieldCheck, title: "Credibilidade", desc: "Reputação construída ao longo de 25 anos de atuação séria e transparente." },
  { icon: Award, title: "Competência", desc: "Equipe altamente qualificada, em constante atualização técnica e jurídica." },
  { icon: BookOpenCheck, title: "Excelência", desc: "Padrão elevado de qualidade em cada parecer, petição e atendimento prestado." },
  { icon: Handshake, title: "Compromisso", desc: "Dedicação integral à causa de cada cliente, com presença e parceria efetivas." },
  { icon: Scale, title: "Ética", desc: "Conduta pautada pelos princípios da advocacia e pelo respeito ao Estado Democrático de Direito." },
  { icon: Heart, title: "Respeito", desc: "Tratamento humano, atencioso e individualizado a clientes, colegas e operadores do Direito." },
];

function EscritorioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Sobre nós"
          title="O Escritório"
          description="25 anos de história dedicados à defesa dos direitos de pessoas, famílias e empresas em todo o Brasil."
        />

        {/* Institutional text */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Nossa história
            </span>
            <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
              Tradição, técnica e proximidade com o cliente
            </h2>
            <div className="mt-6 h-px w-16 bg-gold" />

            <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
              <p>
                Fundado pelo Dr. Denison Henrique Leandro, o escritório{" "}
                <strong className="text-navy">Denison Henrique Leandro e Advogados Associados</strong>{" "}
                completa 25 anos de atuação ininterrupta na advocacia brasileira, consolidando-se
                como referência no atendimento full service nas mais diversas áreas do Direito.
              </p>
              <p>
                Ao longo dessa trajetória, construímos uma equipe multidisciplinar formada por
                advogados experientes e dedicados, capazes de oferecer soluções jurídicas
                personalizadas, com profundidade técnica e visão estratégica. Atuamos tanto na
                esfera consultiva quanto contenciosa, em todas as instâncias do Poder Judiciário e
                perante órgãos administrativos.
              </p>
              <p>
                Acreditamos que cada caso é único. Por isso, ouvimos atentamente cada cliente,
                estudamos a fundo o contexto e propomos a estratégia mais adequada para a defesa
                de seus interesses. Nossa atuação é guiada pela ética, pelo compromisso com a
                verdade e pela busca constante de resultados eficazes.
              </p>
              <p>
                Com sede em Londrina (PR) e unidades em Curitiba, Foz do Iguaçu, Ibiporã, Maringá e
                Florianópolis, levamos a mesma qualidade de atendimento e o mesmo padrão técnico
                a clientes de todo o país, sempre com a proximidade e o cuidado de quem entende
                que advogar é, antes de tudo, servir.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-navy py-24 text-cream">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Princípios
              </span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">Nossos Valores</h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl border border-gold/20 bg-white/[0.03] p-7 transition-all hover:border-gold/60"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-gold/15 text-gold">
                    <v.icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-cream">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formas de Atuação */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Como atuamos
              </span>
              <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
                Formas de Atuação
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-10 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-gold/10 text-gold">
                  <BookOpenCheck size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-navy">Extrajudicial e Preventiva</h3>
                <div className="mt-4 h-px w-12 bg-gold" />
                <p className="mt-6 text-base leading-relaxed text-foreground/80">
                  Atuamos com consultoria e assessoria jurídica em procedimentos administrativos e
                  preventivos, elaboração e revisão de contratos, emissão de pareceres técnicos e
                  estruturação de mecanismos voltados à prevenção de conflitos. Buscamos, sempre
                  que possível, evitar o litígio e oferecer ao cliente segurança jurídica para
                  suas decisões pessoais e empresariais.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-10 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-gold/10 text-gold">
                  <Gavel size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-navy">Contencioso</h3>
                <div className="mt-4 h-px w-12 bg-gold" />
                <p className="mt-6 text-base leading-relaxed text-foreground/80">
                  Realizamos a representação judicial de nossos clientes em todas as instâncias e
                  áreas do Direito, com elaboração de petições iniciais, contestações, recursos e
                  sustentações orais nos tribunais. Combinamos rigor técnico e estratégia
                  processual para defender com firmeza os interesses confiados ao escritório.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
