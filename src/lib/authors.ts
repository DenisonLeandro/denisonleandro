import denison from "@/assets/denison-escritorio-rosto.webp.asset.json";
import higor from "@/assets/higor.png.asset.json";
import joao from "@/assets/joao.png.asset.json";
import marcio from "@/assets/marcio.png.asset.json";
import renata from "@/assets/renata.png.asset.json";

export interface Author { slug: string; name: string; oab: string; photo: string | null; specialty: string }

export const AUTHORS: Author[] = [
  { slug: "denison-henrique-leandro", name: "Dr. Denison Leandro", oab: "OAB/PR 28.764", photo: denison.url, specialty: "Sócio fundador, especialista em Direito do Trabalho, Pós-Graduado pela FGV. Pós-graduado em Direito da Saúde e Direito Médico pelo Hospital Israelita Albert Einstein." },
  { slug: "higor-henrique-leandro", name: "Dr. Higor Henrique Leandro", oab: "OAB/PR 64.072", photo: higor.url, specialty: "Advogado com ênfase no Direito do Trabalho." },
  { slug: "joao-tadeu-leandro", name: "Dr. João Tadeu Leandro", oab: "OAB/PR 67.404", photo: joao.url, specialty: "Advogado com ênfase no Direito do Trabalho." },
  { slug: "marcio-barbosa-da-silva", name: "Dr. Márcio Barbosa da Silva", oab: "OAB/PR 52.894", photo: marcio.url, specialty: "Advogado especialista em Direito do Trabalho e Previdenciário." },
  { slug: "renata-henrique-leandro", name: "Dra. Renata Henrique Leandro", oab: "OAB/PR 77.170", photo: renata.url, specialty: "Advogada pós-graduada em Mediação, Conciliação e Arbitragem." },
  { slug: "danielle-cristina-mateus-pereira", name: "Dra. Danielle Cristina Mateus Pereira", oab: "OAB/PR 57.927", photo: null, specialty: "Advogada com ênfase no Direito do Trabalho." },
];

export const getAuthor = (slug?: string | null) => AUTHORS.find((a) => a.slug === slug) ?? AUTHORS[0];

export const AREAS: Array<{ slug: string; name: string }> = [
  { slug: "trabalhista", name: "Direito Trabalhista" },
  { slug: "previdenciario", name: "Direito Previdenciário" },
  { slug: "saude", name: "Direito da Saúde" },
  { slug: "consumidor", name: "Direito do Consumidor" },
  { slug: "familia", name: "Direito de Família" },
  { slug: "contratos", name: "Contratos" },
  { slug: "bancario", name: "Direito Bancário" },
];
export const getArea = (slug?: string | null) => AREAS.find((a) => a.slug === slug) ?? null;

export interface FaqItem { pergunta: string; resposta: string }
export function normalizeFaq(v: unknown): FaqItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x: any) => ({ pergunta: String(x?.pergunta ?? "").trim(), resposta: String(x?.resposta ?? "").trim() }))
    .filter((x) => x.pergunta && x.resposta);
}
