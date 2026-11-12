import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { AREAS, LAWYERS } from "@/lib/site-content";
import { SITE_URL } from "@/lib/seo";

const ORDER = ["trabalhista", "previdenciario", "consumidor", "familia", "contratos", "bancario", "mediacao"];
const areas = () => ORDER.map((s) => AREAS.find((a) => a.slug === s)!).filter(Boolean);

export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h[1-6]|li|div|blockquote)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

const oneLine = (s: string, max = 220) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

export async function loadArticles(limit: number) {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Configuração do banco ausente");
  const sb = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await sb
    .from("articles")
    .select("slug, title, excerpt, seo_description, content")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export const HEADER = `# Denison Leandro Advogados Associados

> Escritório de advocacia em Londrina-PR, fundado em 2000, com atuação em Direito Trabalhista, Previdenciário, do Consumidor, de Família, Contratos, Bancário e Mediação. Fundado pelo Dr. Denison Leandro (OAB/PR 28.764), pós-graduado pela FGV e especialista em Direito do Trabalho.

## Contato
- Endereço: Av. Paraná, 343, 9º andar, sala 902 - Ed. Satélite, Centro, Londrina-PR, CEP 86010-920
- Telefone: (43) 3322-8455
- WhatsApp: (43) 99994-8455
- E-mail: contato@denisonleandro.adv.br
- Horário: segunda a sexta, 8h às 18h
- Google Maps: https://maps.app.goo.gl/MrZD48gQzX4YbJMk9
`;

export async function buildLlmsTxt(): Promise<string> {
  const arts = await loadArticles(30);
  const out = [HEADER, "## Áreas de atuação"];
  for (const a of areas()) out.push(`- [${a.name}](${SITE_URL}/areas/${a.slug}): ${a.intro}`);
  out.push("", "## Advogados");
  for (const l of LAWYERS) out.push(`- [${l.name}](${SITE_URL}/equipe/${l.slug}): ${l.role}, ${l.oab}, ${l.specialty}`);
  out.push("", "## Artigos");
  for (const a of arts) {
    const desc = a.seo_description || a.excerpt || stripHtml(a.content ?? "");
    out.push(`- [${oneLine(a.title, 200)}](${SITE_URL}/noticias/${a.slug}): ${oneLine(desc)}`);
  }
  out.push(
    "",
    "## Páginas institucionais",
    `- [O Escritório](${SITE_URL}/escritorio)`,
    `- [Contato](${SITE_URL}/contato)`,
    `- [Todos os artigos](${SITE_URL}/noticias)`,
    "",
  );
  return out.join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
  const arts = await loadArticles(20);
  const parts = [HEADER];
  for (const a of areas()) {
    parts.push(`## ${a.name}\nURL: ${SITE_URL}/areas/${a.slug}\n\n${a.intro}\n\n${a.items.map((i) => `- ${i}`).join("\n")}`);
  }
  for (const a of arts) {
    parts.push(`## ${a.title}\nURL: ${SITE_URL}/noticias/${a.slug}\n\n${stripHtml(a.content ?? "")}`);
  }
  return parts.join("\n\n---\n\n") + "\n";
}

export function textResponse(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
