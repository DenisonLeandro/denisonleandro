import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { buildHead } from "@/lib/seo";

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
  head: () => buildHead({ title, description: intro, path: "/areas/contratos" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
