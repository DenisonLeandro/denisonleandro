import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";

const title = "Contratos";
const intro =
  "Elaboração, revisão e análise de contratos cíveis e empresariais, com atuação preventiva para reduzir riscos.";
const items = [
  "Compra e venda de bens móveis e imóveis",
  "Locação, leasing, arrendamento e comodato",
  "Garantias",
  "Franquia",
  "Licenciamento",
  "Distribuição, agência e representação comercial",
  "Prestação de serviço",
  "Fornecimento, empreitada, EPC, entre outros",
  "Análise de cláusulas contratuais específicas",
  "Opiniões legais sobre contratos e cláusulas contratuais",
];

export const Route = createFileRoute("/areas/contratos")({
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
