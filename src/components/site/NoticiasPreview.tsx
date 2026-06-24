import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  published_at: string;
}

export function NoticiasPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await (supabase as any)
          .from("articles")
          .select("id, slug, title, excerpt, category, cover_image_url, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(3);
        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error("Erro ao carregar prévia de notícias:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section aria-labelledby="noticias-preview-title" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Conteúdo jurídico
            </span>
            <h2
              id="noticias-preview-title"
              className="mt-2 font-serif text-3xl text-navy md:text-4xl"
            >
              Notícias e artigos
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/75 md:text-base">
              Análises, novidades e orientações do mundo do Direito produzidas
              pela equipe do escritório.
            </p>
          </div>
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 rounded-md border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Ver todas as notícias
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Carregando notícias...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.id}
                to="/noticias/$slug"
                params={{ slug: a.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant"
              >
                {a.cover_image_url ? (
                  <img
                    src={a.cover_image_url}
                    alt={a.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-gold/20 to-gold/10" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  {a.category && (
                    <span className="inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {a.category}
                    </span>
                  )}
                  <h3 className="mt-4 font-serif text-xl leading-snug text-navy">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75 line-clamp-2">
                      {a.excerpt}
                    </p>
                  )}
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={14} />
                      {new Date(a.published_at).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                      Leia mais
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default NoticiasPreview;
