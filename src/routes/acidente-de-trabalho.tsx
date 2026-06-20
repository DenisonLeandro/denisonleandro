import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

const CANONICAL = "https://denisonleandro.adv.br/acidente-de-trabalho";
const WHATSAPP_URL =
  "https://wa.me/5548988487889?text=Ol%C3%A1%2C%20vim%20por%20um%20artigo%20no%20site%20Denison%20Leandro%20e%20gostaria%20de%20receber%20uma%20orienta%C3%A7%C3%A3o%20r%C3%A1pida.";
const PUBLISHED_AT = "2026-06-20";
const AUTHOR = "Denison Leandro Advogados Associados";
const TITLE_SEO = "Acidente de trabalho: direitos do trabalhador";
const DESCRIPTION_SEO =
  "Sofreu acidente de trabalho? Entenda seus principais direitos, quando procurar orientação e como agir para proteger sua saúde e seu emprego.";

export const Route = createFileRoute("/acidente-de-trabalho")({
  head: () => ({
    meta: [
      { title: TITLE_SEO },
      { name: "description", content: DESCRIPTION_SEO },
      { property: "og:title", content: TITLE_SEO },
      { property: "og:description", content: DESCRIPTION_SEO },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE_SEO },
      { name: "twitter:description", content: DESCRIPTION_SEO },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Acidente de trabalho: quais são os direitos do trabalhador?",
          description: DESCRIPTION_SEO,
          datePublished: PUBLISHED_AT,
          dateModified: PUBLISHED_AT,
          author: { "@type": "Organization", name: AUTHOR },
          publisher: {
            "@type": "Organization",
            name: "Denison Leandro Advogados Associados",
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
        }),
      },
    ],
  }),
  component: AcidenteDeTrabalhoPage,
});

function WhatsAppButton() {
  return (
    <div className="my-10 flex justify-center">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#1ebe57] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.06 22h-.005A9.93 9.93 0 0 1 7 20.633L3 22l1.396-3.832A9.93 9.93 0 0 1 2 12.06C2 6.555 6.555 2 12.06 2c2.667 0 5.176 1.04 7.063 2.927A9.93 9.93 0 0 1 22 12.06c0 5.505-4.555 9.94-9.94 9.94z" />
        </svg>
        Receba uma orientação
      </a>
    </div>
  );
}

function AcidenteDeTrabalhoPage() {
  const dataFormatada = new Date(PUBLISHED_AT).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Artigo jurídico"
          title="Acidente de trabalho: quais são os direitos do trabalhador?"
          description="Entenda, em linguagem clara, o que caracteriza um acidente de trabalho, quais direitos podem existir e quando vale a pena buscar orientação jurídica."
        />

        <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-gold" />
              Publicado em {dataFormatada}
            </span>
            <span className="inline-flex items-center gap-2">
              <User size={16} className="text-gold" />
              {AUTHOR}
            </span>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-foreground/85 prose-p:leading-relaxed prose-strong:text-navy prose-li:text-foreground/85 prose-a:text-gold">
            <p className="text-lg leading-relaxed text-foreground/90">
              Sofrer um acidente no trabalho é uma situação delicada. Além da
              preocupação com a saúde, surgem dúvidas sobre o emprego, o
              afastamento, o INSS e os direitos previstos em lei. Este artigo
              reúne, de forma simples, as informações que mais aparecem na
              rotina do escritório.
            </p>

            <h2>O que é considerado acidente de trabalho?</h2>
            <p>
              De modo geral, acidente de trabalho é aquele que ocorre pelo
              exercício da atividade profissional e causa lesão, perturbação
              funcional ou doença, levando à redução da capacidade de
              trabalho — temporária ou permanente. Não se limita apenas a
              acidentes graves: pequenas lesões também podem se enquadrar,
              dependendo das circunstâncias.
            </p>

            <h2>Exemplos comuns</h2>
            <ul>
              <li>Queda de altura, escorregão ou tropeço dentro da empresa.</li>
              <li>Cortes, queimaduras e impactos ao operar máquinas ou ferramentas.</li>
              <li>Lesões por esforço repetitivo (LER/DORT) em funções operacionais ou administrativas.</li>
              <li>Problemas auditivos, respiratórios ou de coluna ligados ao ambiente de trabalho.</li>
              <li>Acidentes no trajeto entre a casa e o trabalho.</li>
            </ul>

            <h2>Acidente típico, acidente de trajeto e doença ocupacional</h2>
            <p>
              <strong>Acidente típico</strong> é o que ocorre durante a
              jornada, no exercício direto da função — por exemplo, uma queda
              na fábrica ou um corte ao manusear equipamento.
            </p>
            <p>
              <strong>Acidente de trajeto</strong> é o que acontece no caminho
              entre a residência e o local de trabalho (ou vice-versa). Ainda
              que existam discussões recentes sobre seu enquadramento, esse
              tipo de ocorrência continua relevante e deve ser comunicado e
              documentado.
            </p>
            <p>
              <strong>Doença ocupacional</strong> é aquela desencadeada ou
              agravada pelas condições do trabalho — como LER/DORT, perda
              auditiva, problemas de coluna ou transtornos relacionados a
              estresse ocupacional, entre outros.
            </p>

            <WhatsAppButton />

            <h2>Quais direitos o trabalhador pode ter?</h2>
            <p>
              Cada situação precisa ser analisada individualmente, mas, em
              linhas gerais, o trabalhador acidentado pode ter direito a:
            </p>
            <ul>
              <li>Emissão da CAT (Comunicação de Acidente de Trabalho) pela empresa.</li>
              <li>Afastamento com pagamento dos primeiros 15 dias pelo empregador.</li>
              <li>
                Benefício previdenciário pelo INSS a partir do 16º dia de
                afastamento, quando preenchidos os requisitos legais.
              </li>
              <li>
                Recolhimento do FGTS durante o período de afastamento por
                acidente de trabalho.
              </li>
              <li>
                Estabilidade no emprego por <strong>12 meses</strong> após o
                retorno, nos casos em que houver afastamento superior a 15
                dias com concessão de benefício acidentário pelo INSS.
              </li>
              <li>
                Possibilidade de discussão sobre indenização por danos
                materiais, morais ou estéticos, conforme as circunstâncias do
                caso e a comprovação de responsabilidade.
              </li>
            </ul>
            <p>
              Importante: a existência ou não desses direitos depende de
              fatores específicos — tipo de acidente, vínculo, conduta da
              empresa, documentos disponíveis e laudos médicos.
            </p>

            <h2>Por que os documentos são tão importantes</h2>
            <p>
              Em casos envolvendo acidente de trabalho, a prova é o ponto
              central. Quanto mais organizados estiverem os documentos, mais
              clara fica a análise jurídica. Vale guardar:
            </p>
            <ul>
              <li>CAT emitida pela empresa (ou comprovante de tentativa de emissão).</li>
              <li>Atestados médicos e relatórios.</li>
              <li>Exames, laudos e prescrições.</li>
              <li>Receitas e notas de medicamentos.</li>
              <li>Comprovantes de comparecimento a consultas, fisioterapia e perícias.</li>
              <li>Mensagens, e-mails ou comunicados trocados com a empresa.</li>
            </ul>

            <h2>Quando procurar orientação jurídica?</h2>
            <p>
              Sempre que houver dúvida sobre afastamento, benefício do INSS,
              estabilidade no emprego, recusa da empresa em emitir a CAT ou
              quando o trabalhador sentir que seus direitos não estão sendo
              respeitados, vale a pena conversar com um advogado de
              confiança. Uma orientação no momento certo evita perda de
              prazos e ajuda a organizar a documentação.
            </p>

            <h2>Atenção</h2>
            <p>
              Este conteúdo tem caráter informativo e não substitui a análise
              individual do caso. Cada acidente envolve circunstâncias
              próprias, e nem toda situação gera, por si só, direito a
              indenização. O objetivo é esclarecer pontos comuns e ajudar o
              trabalhador a tomar decisões mais conscientes.
            </p>
          </div>

          <WhatsAppButton />

          <div className="mt-12 flex justify-center border-t border-border pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
