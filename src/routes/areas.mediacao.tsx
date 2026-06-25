import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { buildHead } from "@/lib/seo";

const title = "Mediação";
const intro =
  "Atuação em arbitragem, mediação e métodos alternativos de resolução de conflitos, com foco na construção de acordos eficientes.";
const items = [
  "Representação em procedimentos arbitrais nacionais e internacionais, institucionais e ad hoc",
  "Representação em juízo em medidas que garantem a efetividade do procedimento arbitral",
  "Representação em procedimentos de mediação",
  "Elaboração e revisão de cláusulas compromissórias e de resolução de disputas, incluindo aconselhamento em contratações empresariais complexas",
  "Atuação como árbitros e mediadores",
];

export const Route = createFileRoute("/areas/mediacao")({
  head: () => buildHead({ title: `${title} e Arbitragem`, description: intro, path: "/areas/mediacao" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
