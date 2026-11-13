import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export interface TopicSummary { area_slug: string; slug: string; title: string; summary: string | null; sort_order: number; updated_at: string }
export interface PublicTopic extends TopicSummary {
  id: string; seo_title: string | null; seo_description: string | null; content: string;
  faq: { pergunta: string; resposta: string }[]; created_at: string; published: boolean;
}

function publicClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Configuração do banco ausente");
  return createClient<Database>(url, key, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
}

/** Published topics (all areas, or one area), ordered by area order then sort_order. */
export const listPublishedTopics = createServerFn({ method: "GET" })
  .inputValidator((d: { area?: string } | undefined) => ({ area: d?.area ? String(d.area).slice(0, 60) : undefined }))
  .handler(async ({ data }): Promise<TopicSummary[]> => {
    let q = publicClient().from("area_topics")
      .select("area_slug, slug, title, summary, sort_order, updated_at")
      .eq("published", true).order("sort_order").order("title");
    if (data.area) q = q.eq("area_slug", data.area);
    const { data: rows, error } = await q;
    if (error) { console.error("listPublishedTopics", error); return []; }
    return rows ?? [];
  });

export const getPublishedTopic = createServerFn({ method: "GET" })
  .inputValidator((d: { area: string; slug: string }) => ({ area: String(d.area).slice(0, 60), slug: String(d.slug).slice(0, 200) }))
  .handler(async ({ data }): Promise<PublicTopic | null> => {
    const { data: row, error } = await publicClient().from("area_topics").select("*")
      .eq("area_slug", data.area).eq("slug", data.slug).eq("published", true).maybeSingle();
    if (error) { console.error("getPublishedTopic", error); throw new Error("Não foi possível carregar o tema."); }
    if (!row) return null;
    const faq = Array.isArray(row.faq) ? (row.faq as any[]).map((x) => ({ pergunta: String(x?.pergunta ?? ""), resposta: String(x?.resposta ?? "") })) : [];
    return { ...(row as any), faq } as PublicTopic;
  });
