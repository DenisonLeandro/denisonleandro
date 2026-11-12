import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const ARTICLES_PER_PAGE = 12;

export interface PublicArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  published_at: string;
  updated_at: string;
  author: string | null;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  summary: string | null;
  faq: unknown;
  author_slug: string;
  area_slug: string | null;
}

export type ArticleSummary = Pick<
  PublicArticle,
  "id" | "slug" | "title" | "excerpt" | "category" | "cover_image_url" | "published_at"
>;

function publicClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Configuração do banco ausente");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const getPublishedArticle = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 300) }))
  .handler(async ({ data }): Promise<PublicArticle | null> => {
    const { data: row, error } = await publicClient()
      .from("articles")
      .select(
        "id, slug, title, excerpt, category, cover_image_url, published_at, updated_at, author, content, seo_title, seo_description, summary, faq, author_slug, area_slug",
      )
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) {
      console.error("getPublishedArticle", error);
      throw new Error("Não foi possível carregar o artigo.");
    }
    if (!row) return null;
    return {
      ...row,
      published_at: row.published_at ?? row.updated_at,
    } as PublicArticle;
  });

export const listPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((data: { page: number }) => ({
    page: Math.max(1, Math.min(10000, Math.floor(Number(data.page) || 1))),
  }))
  .handler(async ({ data }) => {
    const from = (data.page - 1) * ARTICLES_PER_PAGE;
    const { data: rows, error, count } = await publicClient()
      .from("articles")
      .select("id, slug, title, excerpt, category, cover_image_url, published_at, updated_at", {
        count: "exact",
      })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, from + ARTICLES_PER_PAGE - 1);
    if (error) {
      console.error("listPublishedArticles", error);
      throw new Error("Não foi possível carregar as notícias.");
    }
    const total = count ?? 0;
    return {
      articles: (rows ?? []).map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        category: r.category,
        cover_image_url: r.cover_image_url,
        published_at: r.published_at ?? r.updated_at,
      })) as ArticleSummary[],
      page: data.page,
      totalPages: Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE)),
    };
  });

export const listRelatedArticles = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; area: string | null; category: string | null }) => ({
    slug: String(d.slug).slice(0, 300),
    area: d.area ? String(d.area).slice(0, 50) : null,
    category: d.category ? String(d.category).slice(0, 200) : null,
  }))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const base = () =>
      sb.from("articles").select("slug, title").eq("status", "published").neq("slug", data.slug)
        .order("published_at", { ascending: false }).limit(3);
    const picked: { slug: string; title: string }[] = [];
    const add = (rows: { slug: string; title: string }[] | null) => {
      for (const r of rows ?? []) if (picked.length < 3 && !picked.some((p) => p.slug === r.slug)) picked.push(r);
    };
    if (data.area) add((await base().eq("area_slug", data.area)).data);
    if (picked.length < 3 && data.category) add((await base().eq("category", data.category)).data);
    if (picked.length < 3) add((await base().limit(6)).data);
    return picked;
  });
