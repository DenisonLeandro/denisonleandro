import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Loader2, Star } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  published_at: string;
  content: string;
  status: string;
}
import featuredImage from "@/assets/featured-acidente-de-trabalho.jpg";

function FeaturedArticleCard() {
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Star size={16} className="text-gold" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
          Artigo em destaque
        </span>
      </div>
      <Link
        to="/acidente-de-trabalho"
        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant md:flex-row"
      >
        <div className="w-full overflow-hidden md:w-2/5">
          <img
            src={featuredImage}
            alt="Trabalhador utilizando equipamentos de segurança em ambiente de trabalho"
            width={1280}
            height={800}
            loading="lazy"
            className="aspect-[16/10] h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <span className="inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
            Direito do Trabalho
          </span>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-navy md:text-3xl">
            Acidente de trabalho: quais são os direitos do trabalhador?
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75 md:text-base">
            Entenda os principais direitos de quem sofreu acidente de trabalho,
            quando procurar orientação e quais documentos podem ajudar na
            análise do caso.
          </p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-gold group-hover:text-navy">
            Ler artigo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias | Denison Leandro e Advogados Associados" },
      {
        name: "description",
        content:
          "Artigos e novidades jurídicas sobre direito trabalhista, previdenciário, consumidor e mais, escritos pela equipe do escritório.",
      },
      { property: "og:title", content: "Notícias | Denison Leandro" },
      {
        property: "og:description",
        content: "Acompanhe artigos e novidades do mundo jurídico.",
      },
    ],
  }),
  component: NoticiasPage,
});

function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const { data, error } = await (supabase as any)
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(100);

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Conteúdo jurídico"
          title="Notícias"
          description="Artigos, análises e novidades do mundo do Direito produzidos pela equipe do escritório."
        />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <FeaturedArticleCard />
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-10">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p>Carregando notícias...</p>
              </div>
            ) : articles.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Nenhuma notícia publicada ainda.
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <Link
                    key={a.id}
                    to="/noticias/$slug"
                    params={{ slug: a.slug }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant"
                  >
                    {a.cover_image_url && (

                      <img
                        src={a.cover_image_url}
                        alt={a.title}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    )}
                    {!a.cover_image_url && (
                      <div className="aspect-[16/10] w-full bg-gradient-to-br from-gold/20 to-gold/10" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {a.category && (
                        <span className="inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                          {a.category}
                        </span>
                      )}
                      <h2 className="mt-4 font-serif text-xl leading-snug text-navy">
                        {a.title}
                      </h2>
                      {a.excerpt && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75 line-clamp-2">
                          {a.excerpt}
                        </p>
                      )}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={14} />
                          {new Date(a.published_at).toLocaleDateString(
                            "pt-BR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <div className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                          Leia mais
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
