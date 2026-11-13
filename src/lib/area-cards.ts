// Order, icon and short card text of the practice areas (home, /areas-de-atuacao, "Outras áreas").
import { Briefcase, ShieldCheck, HeartPulse, ShoppingBag, Landmark, Users, FileText, type LucideIcon } from "lucide-react";

export type AreaPath = "/areas/trabalhista" | "/areas/previdenciario" | "/areas/saude" | "/areas/consumidor" | "/areas/bancario" | "/areas/familia" | "/areas/contratos";
export interface AreaCard { slug: string; title: string; desc: string; to: AreaPath; icon: LucideIcon }

export const AREA_CARDS: AreaCard[] = [
  { slug: "trabalhista", title: "Trabalhista", desc: "Defesa dos direitos do trabalhador e do empregador.", to: "/areas/trabalhista", icon: Briefcase },
  { slug: "previdenciario", title: "Previdenciário", desc: "Aposentadorias, revisões e benefícios do INSS.", to: "/areas/previdenciario", icon: ShieldCheck },
  { slug: "saude", title: "Direito da Saúde", desc: "Planos de saúde, medicamentos, SUS e erro médico.", to: "/areas/saude", icon: HeartPulse },
  { slug: "consumidor", title: "Consumidor", desc: "Proteção das relações de consumo e indenizações.", to: "/areas/consumidor", icon: ShoppingBag },
  { slug: "bancario", title: "Bancário/Financeiro", desc: "Revisões, dívidas e operações bancárias abusivas.", to: "/areas/bancario", icon: Landmark },
  { slug: "familia", title: "Família", desc: "Divórcios, guarda, pensão e inventários com sensibilidade.", to: "/areas/familia", icon: Users },
  { slug: "contratos", title: "Contratos", desc: "Elaboração, análise e revisão de contratos complexos.", to: "/areas/contratos", icon: FileText },
];

export const AREA_SLUGS = AREA_CARDS.map((a) => a.slug);
export const getAreaCard = (slug: string) => AREA_CARDS.find((a) => a.slug === slug) ?? null;
