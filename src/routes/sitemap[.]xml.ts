import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = "https://denisonleandro.adv.br";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/escritorio", changefreq: "monthly", priority: "0.8" },
  { path: "/areas-de-atuacao", changefreq: "monthly", priority: "0.9" },
  { path: "/areas/trabalhista", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/previdenciario", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/consumidor", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/familia", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/contratos", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/bancario", changefreq: "monthly", priority: "0.8" },
  { path: "/areas/mediacao", changefreq: "monthly", priority: "0.8" },
  { path: "/profissionais", changefreq: "monthly", priority: "0.8" },
  { path: "/equipe/denison-henrique-leandro", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/marcio-barbosa-da-silva", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/higor-henrique-leandro", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/joao-tadeu-leandro", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/renata-henrique-leandro", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/juan-albner-pereira-veloso", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/danielle-cristina-mateus-pereira", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/maria-ines-gomes-da-silva", changefreq: "yearly", priority: "0.6" },
  { path: "/equipe/leonardo-nascimento-de-aguiar", changefreq: "yearly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.7" },
  { path: "/noticias", changefreq: "weekly", priority: "0.8" },
  { path: "/acidente-de-trabalho", changefreq: "monthly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let dynamic: SitemapEntry[] = [];
        try {
          const { data } = await (supabase as any)
            .from("articles")
            .select("slug, updated_at, published_at")
            .eq("status", "published");
          if (Array.isArray(data)) {
            dynamic = data
              .filter((a: any) => a?.slug)
              .map((a: any) => ({
                path: `/noticias/${a.slug}`,
                lastmod: (a.updated_at ?? a.published_at ?? "").slice(0, 10) || undefined,
                changefreq: "monthly" as const,
                priority: "0.7",
              }));
          }
        } catch (err) {
          console.error("[sitemap] failed to load articles", err);
        }

        const entries = [...STATIC_ENTRIES, ...dynamic];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
