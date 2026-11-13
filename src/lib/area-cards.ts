// Order and short card text of the practice areas (home, /areas-de-atuacao, "Outras áreas").
export type AreaPath = "/areas/trabalhista" | "/areas/previdenciario" | "/areas/saude" | "/areas/consumidor" | "/areas/bancario" | "/areas/familia" | "/areas/contratos";
export interface AreaCard { slug: string; title: string; desc: string; to: AreaPath }

export const AREA_CARDS: AreaCard[] = [
  { slug: "trabalhista", title: "Trabalhista", desc: "Defesa dos direitos do trabalhador e do empregador.", to: "/areas/trabalhista" },
  { slug: "previdenciario", title: "Previdenciário", desc: "Aposentadorias, revisões e benefícios do INSS.", to: "/areas/previdenciario" },
  { slug: "saude", title: "Direito da Saúde", desc: "Planos de saúde, medicamentos, SUS e erro médico.", to: "/areas/saude" },
  { slug: "consumidor", title: "Consumidor", desc: "Proteção das relações de consumo e indenizações.", to: "/areas/consumidor" },
  { slug: "bancario", title: "Bancário/Financeiro", desc: "Revisões, dívidas e operações bancárias abusivas.", to: "/areas/bancario" },
  { slug: "familia", title: "Família", desc: "Divórcios, guarda, pensão e inventários com sensibilidade.", to: "/areas/familia" },
  { slug: "contratos", title: "Contratos", desc: "Elaboração, análise e revisão de contratos complexos.", to: "/areas/contratos" },
];

export const AREA_SLUGS = AREA_CARDS.map((a) => a.slug);
export const getAreaCard = (slug: string) => AREA_CARDS.find((a) => a.slug === slug) ?? null;
