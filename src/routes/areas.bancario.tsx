import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { buildHead } from "@/lib/seo";

const title = "Bancário e Financeiro";
const intro =
  "Atuação em discussões bancárias e financeiras, em defesa de pessoas físicas e jurídicas frente a instituições financeiras.";
const items = [
  "Revisão e apuração judicial da correta atualização de valores tomados de instituições financeiras, podendo resultar na devolução de quantias pagas a maior, preservando o patrimônio da empresa e dos sócios",
  "Revisão de contratos e passivos bancários em diversas modalidades de empréstimos e financiamentos de bens móveis (veículos e equipamentos) e imóveis, visando a limitação das taxas de juros (juros capitalizados), multas, adequação à legislação vigente e às normas do Banco Central, e o cancelamento de inscrição nos órgãos de restrição (SPC, Serasa, Sisbacen, CCF, Cadin)",
];

export const Route = createFileRoute("/areas/bancario")({
  head: () => buildHead({ title: `Direito ${title}`, description: intro, path: "/areas/bancario" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
