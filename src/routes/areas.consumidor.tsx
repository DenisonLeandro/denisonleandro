import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";

const title = "Consumidor";
const intro =
  "Defesa do consumidor em demandas judiciais e administrativas, com base no Código de Defesa do Consumidor.";
const items = [
  "Resolução de disputas por meio de atuação judicial e junto às principais câmaras setoriais e de arbitragem e mediação",
  "Orientação em questões perante órgãos de proteção ao consumidor e acompanhamento de processos administrativos e judiciais envolvendo reclamações e pedidos de indenização",
];

export const Route = createFileRoute("/areas/consumidor")({
  head: () => areaHead({ title: `Direito do ${title}`, serviceName: "Advocacia do Consumidor em Londrina", serviceType: "Direito do Consumidor", description: intro, path: "/areas/consumidor" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
