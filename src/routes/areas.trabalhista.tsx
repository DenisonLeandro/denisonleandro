import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";

const title = "Trabalhista";
const intro =
  "Atuação completa em Direito do Trabalho, defendendo empregados e empregadores em demandas judiciais, consultivas e estratégicas.";
const items = [
  "Elaboração de reclamatórias trabalhistas",
  "Avaliação e reivindicação de irregularidades em contrato de trabalho, rescisões, férias, horas extraordinárias, reenquadramento salarial, plano de carreira, justa causa, equiparação salarial, reintegração, danos morais, LER (lesões por esforços repetitivos), assédio moral, entre outros",
  "Elaboração de defesas judiciais e acompanhamento processual em todas as instâncias (processos individuais, ações civis públicas, dissídios coletivos)",
  "Acompanhamento personalizado em todos os tribunais",
  "Elaboração de opiniões legais em matéria trabalhista",
  "Elaboração de documentos trabalhistas, instrumentos de contratação, acordos coletivos, políticas internas, planos de participação nos lucros ou resultados",
  "Análise de rotinas e contingências trabalhistas em projetos de cisões, fusões e aquisições",
  "Assessoria em gerenciamento de RH",
  "Realização de negociações coletivas",
  "Realização de workshops e seminários",
  "Avaliação de passivos trabalhistas",
];

export const Route = createFileRoute("/areas/trabalhista")({
  head: () => ({
    meta: [
      { title: `${title} | Denison Leandro e Advogados Associados` },
      { name: "description", content: intro },
      { property: "og:title", content: `${title} | Denison Leandro` },
      { property: "og:description", content: intro },
    ],
  }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
