import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase, Article } from "@/integrations/supabase/client";

export const Route = createFileRoute("/noticias/$slug")({
  component: NoticiaDetail,
});

function NoticiaDetail() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-20">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Carregando artigo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <button
            onClick={() => navigate({ to: "/noticias" })}
            className="mb-6 inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Notícias
          </button>
          <p className="text-muted-foreground">Artigo não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <button
          onClick={() => navigate({ to: "/noticias" })}
          className="mb-6 inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Notícias
        </button>

        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="mb-8 w-full rounded-lg object-cover"
          />
        )}

        <header className="mb-8">
          {article.category && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
              {article.category}
            </p>
          )}
          <h1 className="mb-4 font-serif text-4xl font-bold text-navy">
            {article.title}
          </h1>
          <p className="inline-flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            {new Date(article.published_at).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        {article.excerpt && (
          <p className="mb-8 border-l-4 border-gold pl-4 text-lg italic text-muted-foreground">
            {article.excerpt}
          </p>
        )}

        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:text-foreground prose-h2:text-navy prose-h3:text-navy prose-a:text-gold prose-strong:text-navy">
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
