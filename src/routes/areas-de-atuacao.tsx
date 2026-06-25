import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, ArrowUpRight, Briefcase, ShieldCheck, ShoppingCart, Users, FileText, Landmark, Handshake } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/areas-de-atuacao")({
  head: () =>
    buildHead({
      title: "Áreas de Atuação",
      description:
        "Atuação full service em Direito Trabalhista, Previdenciário, do Consumidor, de Família, Contratos, Bancário/Financeiro e Mediação de Conflitos.",
      path: "/areas-de-atuacao",
    }),
  component: AreasPage,
});

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

const areas = [
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    to: "/areas/trabalhista" as const,
    text:
      "Atuação completa em ações individuais e coletivas, com defesa de empregados e empregadores. Assessoramos em reclamatórias trabalhistas, rescisões, verbas, horas extras, equiparação salarial, assédio moral, acordos e negociações coletivas, com foco em soluções eficientes e juridicamente seguras.",
  },
  {
    icon: ShieldCheck,
    title: "Direito Previdenciário",
    to: "/areas/previdenciario" as const,
    text:
      "Orientamos e representamos segurados do INSS em pedidos de aposentadoria por idade, tempo de contribuição, especial, por incapacidade, BPC/LOAS, pensões, revisões e recursos administrativos e judiciais. Análise individualizada da vida contributiva para identificar o melhor benefício.",
  },
  {
    icon: ShoppingCart,
    title: "Direito do Consumidor",
    to: "/areas/consumidor" as const,
    text:
      "Defesa de consumidores em casos de cobranças indevidas, negativação irregular, vícios e defeitos de produtos e serviços, problemas com bancos, planos de saúde, companhias aéreas, telefonia, e-commerce e cláusulas contratuais abusivas, sempre com base no Código de Defesa do Consumidor.",
  },
  {
    icon: Users,
    title: "Direito de Família e Sucessões",
    to: "/areas/familia" as const,
    text:
      "Atendimento sensível e técnico em divórcios, dissolução de união estável, guarda e regulamentação de visitas, pensão alimentícia, inventários, partilhas, testamentos e planejamento sucessório. Priorizamos sempre que possível soluções consensuais e o melhor interesse das famílias.",
  },
  {
    icon: FileText,
    title: "Contratos",
    to: "/areas/contratos" as const,
    text:
      "Elaboração, revisão, negociação e análise de contratos cíveis e empresariais, incluindo prestação de serviços, locação, compra e venda, distribuição, parcerias, confidencialidade e contratos atípicos. Atuação preventiva voltada a reduzir riscos e dar segurança às relações jurídicas.",
  },
  {
    icon: Landmark,
    title: "Direito Bancário e Financeiro",
    to: "/areas/bancario" as const,
    text:
      "Defesa de clientes em discussões sobre juros abusivos, capitalização, tarifas indevidas, revisional de contratos bancários, financiamentos, leasing, cédulas de crédito, busca e apreensão e execuções. Atendemos pessoas físicas e jurídicas em demandas contra instituições financeiras.",
  },
  {
    icon: Handshake,
    title: "Mediação e Resolução de Conflitos",
    to: "/areas/mediacao" as const,
    text:
      "Promovemos a solução de controvérsias por meio de mediação, conciliação e negociação assistida, com foco na construção de acordos duradouros, redução de custos e preservação de relações pessoais, familiares e empresariais.",
  },
];

function AreasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Especialidades"
          title="Áreas de Atuação"
          description="Atuação full service em sete áreas estratégicas do Direito, com equipe especializada em cada uma delas."
        />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl space-y-10 px-6 lg:px-10">
            {areas.map((a) => (
              <article
                key={a.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:border-gold/50 hover:shadow-elegant md:p-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                    <a.icon size={26} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-navy md:text-3xl">{a.title}</h2>
                    <div className="mt-3 h-px w-12 bg-gold" />
                    <p className="mt-5 text-base leading-relaxed text-foreground/80">{a.text}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        to={a.to}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                      >
                        Saiba mais <ArrowUpRight size={14} />
                      </Link>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-elegant"
                      >
                        <MessageCircle size={16} />
                        Falar com especialista no WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
