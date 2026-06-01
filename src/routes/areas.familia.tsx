import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";

const title = "Família";
const intro =
  "Atendimento sensível e técnico em Direito de Família e Sucessões, com foco em soluções consensuais sempre que possível.";
const items = [
  "Alimentos (concessão, revisão, exoneração e execução)",
  "Casamento (regime de bens e pacto antenupcial)",
  "União estável (reconhecimento e dissolução)",
  "Medida cautelar de separação de corpos",
  "Divórcio",
  "Filiação (adoção e investigação de paternidade)",
  "Guarda e regulamentação de visita de menores",
  "Interdição",
  "Doação",
  "Planejamento familiar e sucessório",
  "Inventário e arrolamento",
  "Medida cautelar de arrolamento de bens",
  "Partilha de bens",
  "Testamentos",
  "Tutela",
  "Cessão de herança",
];

export const Route = createFileRoute("/areas/familia")({
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
