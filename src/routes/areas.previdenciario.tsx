import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";

const title = "Previdenciário";
const intro =
  "Assessoria e representação em benefícios, contribuições e demandas perante o INSS, Receita Federal e Justiça Federal.";
const items = [
  "Concessão de aposentadorias por tempo de contribuição, idade, invalidez e especiais (atividades insalubres e periculosas)",
  "Pensões por morte",
  "Auxílio-doença (acidentário e previdenciário)",
  "Conversão de auxílio-doença em aposentadoria por invalidez",
  "Declaração de contagem de tempo de serviço/contribuição",
  "Reconhecimento de período contributivo",
  "Orientação preventiva e atendimento às fiscalizações da Receita Federal do Brasil",
  "Ações declaratórias de direitos e ações anulatórias de débitos fiscais previdenciários",
  "Defesas em execuções fiscais propostas pela Previdência Social, Receita Federal e Caixa Econômica Federal",
  "Recuperação de contribuições sociais indevidamente recolhidas",
  "Defesas em processos instaurados pela Previdência Social ou Receita Federal",
  "Formalização de consultas aos órgãos competentes",
];

export const Route = createFileRoute("/areas/previdenciario")({
  head: () => ({
    meta: [
      { title: `${title} | Denison Henrique Leandro e Advogados Associados` },
      { name: "description", content: intro },
      { property: "og:title", content: `${title} | Denison Henrique Leandro` },
      { property: "og:description", content: intro },
    ],
  }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
