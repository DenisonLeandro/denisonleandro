import { ArticleCover } from "@/components/site/ArticleCover";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { ArrowRight, Calendar, Loader2, Star } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBanner } from "@/components/site/CtaBanner";
import { PageHeader } from "@/components/site/PageHeader";
import { listPublishedArticles, getFeaturedArticle, type FeaturedArticle } from "@/lib/articles.functions";

function FeaturedArticleCard({ article }: { article: FeaturedArticle }) {
  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Star size={16} className="text-gold" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
          Artigo em destaque
        </span>
      </div>
      <Link
        to="/noticias/$slug"
        params={{ slug: article.slug }}
        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant md:flex-row"
      >
        <div className="w-full overflow-hidden md:w-2/5">
          {article.cover_image_url ? (
            <ArticleCover src={article.cover_image_url} alt={article.title} className="aspect-[16/10] h-full w-full" />
          ) : (
            <div className="aspect-[16/10] h-full w-full bg-gradient-to-br from-gold/20 to-gold/10" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          {article.category && (
            <span className="inline-flex w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              {article.category}
            </span>
          )}
          <h2 className="mt-4 font-serif text-2xl leading-snug text-navy md:text-3xl">
            {article.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75 md:text-base">
            {article.text}
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

export const Route = createFileRoute("/noticias/")({
  validateSearch: (search: Record<string, unknown>): { pagina?: number } => {
    const n = Math.floor(Number(search.pagina));
    return Number.isFinite(n) && n > 1 ? { pagina: n } : {};
  },
  loaderDeps: ({ search }) => ({ pagina: search.pagina ?? 1 }),
  loader: async ({ deps }) => {
    const [list, featured] = await Promise.all([
      listPublishedArticles({ data: { page: deps.pagina } }),
      deps.pagina === 1 ? getFeaturedArticle() : Promise.resolve(null),
    ]);
    return { ...list, featured };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page ?? 1;
    return buildHead({
      title: page > 1 ? `Notícias e Artigos Jurídicos — Página ${page}` : "Notícias e Artigos Jurídicos",
      description:
        "Artigos e análises sobre Direito Trabalhista, Previdenciário, do Consumidor e mais, produzidos pela equipe do Denison Leandro Advogados Associados.",
      path: page > 1 ? `/noticias?pagina=${page}` : "/noticias",
    });
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "Erro ao carregar as notícias."}
        </p>
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => <p className="py-20 text-center">Nenhuma notícia encontrada.</p>,
  component: NoticiasPage,
});

function NoticiasPage() {
  const { articles, page, totalPages, featured } = Route.useLoaderData();
  const loading = false;

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
            {page === 1 && featured && <FeaturedArticleCard article={featured} />}
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

                      <ArticleCover src={a.cover_image_url} alt={a.title} />
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
            {totalPages > 1 && (
              <nav aria-label="Paginação" className="mt-12 flex flex-wrap items-center justify-center gap-2">
                {page > 1 && (
                  <Link to="/noticias" search={page - 1 > 1 ? { pagina: page - 1 } : {}} rel="prev" className="rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white">
                    Anterior
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Link key={n} to="/noticias" search={n > 1 ? { pagina: n } : {}} aria-current={n === page ? "page" : undefined} className={n === page ? "rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white" : "rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"}>
                    {n}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link to="/noticias" search={{ pagina: page + 1 }} rel="next" className="rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white">
                    Próxima
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
