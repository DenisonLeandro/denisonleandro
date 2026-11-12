import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { whatsappUrl, articleMessage } from "@/lib/whatsapp";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MediaMentions } from "@/components/site/MediaMentions";
import { buildHead, breadcrumb, absUrl, DEFAULT_OG_IMAGE, ORG_ID, SITE_URL } from "@/lib/seo";
import { ShareButtons } from "@/components/site/ShareButtons";
import { getPublishedArticle, listRelatedArticles } from "@/lib/articles.functions";
import { getAuthor, getArea, normalizeFaq, type Author } from "@/lib/authors";
import { prepareArticleHtml, splitHtmlInHalf } from "@/lib/article-content";
import logoAsset from "@/assets/logo.png.asset.json";



function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    const article = await getPublishedArticle({ data: { slug: params.slug } });
    if (!article) throw notFound();
    const related = await listRelatedArticles({
      data: { slug: article.slug, area: article.area_slug, category: article.category },
    }).catch(() => []);
    return { article, related };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.article;
    if (!a) return buildHead({ title: "Artigo não encontrado", description: "Artigo não encontrado.", path: `/noticias/${params.slug}`, noindex: true });
    const description = (
      a.seo_description || a.excerpt || stripHtml(a.content).slice(0, 160)
    ).slice(0, 300);
    const writer = getAuthor(a.author_slug);
    const author = writer.name;
    const faq = normalizeFaq(a.faq);
    const ldDescription = (a.summary || description).slice(0, 500);
    const url = `${SITE_URL}/noticias/${a.slug}`;
    const image = a.cover_image_url || DEFAULT_OG_IMAGE;
    const head = buildHead({
      title: a.seo_title || a.title,
      description,
      path: `/noticias/${a.slug}`,
      type: "article",
      image,
      publishedTime: a.published_at,
      modifiedTime: a.updated_at,
      author,
      section: a.category || undefined,
      imageAlt: a.title,
      jsonLd: [
        {
          "@type": "BlogPosting",
          headline: a.title,
          description: ldDescription,
          image: a.cover_image_url
            ? [image]
            : [{ "@type": "ImageObject", url: image, width: 1200, height: 630 }],
          datePublished: a.published_at,
          dateModified: a.updated_at,
          author: {
            "@type": "Person",
            "@id": `${SITE_URL}/equipe/${writer.slug}#pessoa`,
            name: writer.name,
            url: `${SITE_URL}/equipe/${writer.slug}`,
          },
          publisher: {
            "@type": "Organization",
            "@id": ORG_ID,
            name: "Denison Leandro Advogados Associados",
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: absUrl(logoAsset.url), width: 270, height: 110 },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          inLanguage: "pt-BR",
          ...(a.category ? { articleSection: a.category } : {}),
          wordCount: stripHtml(a.content).split(" ").filter(Boolean).length,
        },
        ...(faq.length
          ? [{
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.pergunta,
                acceptedAnswer: { "@type": "Answer", text: f.resposta },
              })),
            }]
          : []),
        breadcrumb([
          ["Início", "/"],
          ["Notícias", "/noticias"],
          [a.title, `/noticias/${a.slug}`],
        ]),
      ],
    });
    return head;
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "Erro ao carregar o artigo."}
        </p>
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Link
          to="/noticias"
          className="mb-6 inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Notícias
        </Link>
        <p className="text-muted-foreground">Artigo não encontrado.</p>
      </main>
      <Footer />
    </div>
  ),
  component: NoticiaDetail,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.06 22h-.005A9.93 9.93 0 0 1 7 20.633L3 22l1.396-3.832A9.93 9.93 0 0 1 2 12.06C2 6.555 6.555 2 12.06 2c2.667 0 5.176 1.04 7.063 2.927A9.93 9.93 0 0 1 22 12.06c0 5.505-4.555 9.94-9.94 9.94z" />
    </svg>
  );
}

function CtaButton({ title }: { title: string }) {
  return (
    <a
      href={whatsappUrl(articleMessage(title))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe57] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:w-auto"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Receba uma orientação
    </a>
  );
}

function CtaCallout({ title }: { title: string }) {
  return (
    <div className="my-10 rounded-xl border border-border bg-muted/40 p-5">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">
              Está com dúvidas sobre seus direitos?
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Receba orientações iniciais e entenda o que fazer no seu caso.
            </p>
          </div>
        </div>
        <a
          href={whatsappUrl(articleMessage(title))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-navy bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-navy hover:text-white focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 sm:w-auto"
        >
          Solicitar orientação
        </a>
      </div>
    </div>
  );
}

function CtaDuvidasBlock({ title }: { title: string }) {
  const [question, setQuestion] = useState("");
  return (
    <div className="mt-12 border-t border-border pt-10">
      <h3 className="text-xl font-semibold text-navy">Envie as suas dúvidas</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Receba orientações iniciais e entenda o que fazer no seu caso.
      </p>
      <div className="mt-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Descreva o que aconteceu e o que você gostaria de saber..."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy/30"
          rows={4}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <a
          href={whatsappUrl(articleMessage(title, question))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all hover:bg-navy hover:text-white focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 sm:w-auto"
        >
          Solicitar orientação
        </a>
      </div>
    </div>
  );
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric", timeZone: "America/Sao_Paulo" });
const dayKey = (d: string) => new Date(d).toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

function AuthorAvatar({ author, size }: { author: Author; size: string }) {
  return author.photo ? (
    <img src={author.photo} alt={author.name} width={96} height={96} className={`${size} shrink-0 rounded-full object-cover object-top`} />
  ) : (
    <span aria-hidden="true" className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gold/15 font-serif text-navy`}>
      {author.name.replace(/^Dra?\.\s*/, "").charAt(0)}
    </span>
  );
}

function NoticiaDetail() {
  const { article, related } = Route.useLoaderData();
  const author = getAuthor(article.author_slug);
  const area = getArea(article.area_slug);
  const faq = normalizeFaq(article.faq);
  const { html, toc } = useMemo(() => prepareArticleHtml(article.content ?? "", article.title), [article]);
  const [first, second] = useMemo(() => splitHtmlInHalf(html), [html]);
  const updated = dayKey(article.updated_at) !== dayKey(article.published_at);

  const articleBodyClasses = [
    "font-sans text-foreground",
    "[&_p]:font-sans [&_p]:text-justify [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-base [&_p]:text-foreground",
    "[&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24",
    "[&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-8 [&_h3]:mb-3",
    "[&_h4]:font-sans [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-navy [&_h4]:mt-6 [&_h4]:mb-2",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2",
    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2",
    "[&_li]:font-sans [&_li]:leading-[1.8] [&_li]:text-foreground",
    "[&_a]:text-gold [&_a]:underline hover:[&_a]:text-gold/80",
    "[&_strong]:font-semibold [&_strong]:text-navy",
    "[&_em]:italic",
    "[&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6",
  ].join(" ");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Link
          to="/noticias"
          className="mb-6 inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Notícias
        </Link>

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
          <h1 className="mb-5 font-serif text-4xl font-bold text-navy">{article.title}</h1>
          <div className="flex items-center gap-3">
            <AuthorAvatar author={author} size="h-11 w-11 text-lg" />
            <div className="text-sm text-muted-foreground">
              <p>
                Por{" "}
                <a href={`/equipe/${author.slug}`} className="font-semibold text-navy hover:text-gold">
                  {author.name}
                </a>{" "}
                — {author.oab}
              </p>
              <p className="mt-0.5 inline-flex flex-wrap items-center gap-x-2">
                <Calendar size={14} />
                <time dateTime={article.published_at}>{fmtDate(article.published_at)}</time>
                {updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Atualizado em <time dateTime={article.updated_at}>{fmtDate(article.updated_at)}</time>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </header>

        {article.summary && (
          <section aria-label="Resumo" className="mb-8 rounded-r-lg border-l-4 border-gold bg-muted/50 px-5 py-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">Resumo</p>
            <p className="leading-[1.8] text-foreground">{article.summary}</p>
          </section>
        )}

        {/* CTA 1 — topo */}
        <div className="mb-8">
          <CtaButton title={article.title} />
        </div>

        {article.excerpt && (
          <p className="mb-8 border-l-4 border-gold pl-4 text-lg italic text-muted-foreground">
            {article.excerpt}
          </p>
        )}

        {toc.length >= 3 && (
          <nav aria-label="Neste artigo" className="mb-10 rounded-lg border border-border p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-navy">Neste artigo</p>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-foreground/80 hover:text-gold">{t.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Conteúdo + CTA intermediário */}
        <div className={articleBodyClasses} dangerouslySetInnerHTML={{ __html: first }} />
        <CtaCallout title={article.title} />
        {second && <div className={articleBodyClasses} dangerouslySetInnerHTML={{ __html: second }} />}

        {faq.length > 0 && (
          <section aria-labelledby="faq-title" className="mt-12 border-t border-border pt-10">
            <h2 id="faq-title" className="mb-6 font-sans text-2xl font-semibold text-navy">Perguntas frequentes</h2>
            {faq.map((f, i) => (
              <div key={i} className="mb-6">
                <h3 className="mb-2 font-sans text-lg font-semibold text-navy">{f.pergunta}</h3>
                <p className="whitespace-pre-line text-justify leading-[1.8] text-foreground">{f.resposta}</p>
              </div>
            ))}
          </section>
        )}

        <aside aria-label="Sobre o autor" className="mt-12 flex gap-4 rounded-xl border border-border bg-card p-5">
          <AuthorAvatar author={author} size="h-16 w-16 text-2xl" />
          <div>
            <p className="font-serif text-lg text-navy">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.oab}</p>
            <p className="mt-2 text-sm text-foreground/80">{author.specialty}</p>
            <a href={`/equipe/${author.slug}`} className="mt-2 inline-block text-sm font-semibold text-gold hover:text-gold/80">
              Ver perfil
            </a>
          </div>
        </aside>

        {area && (
          <aside aria-label="Contato" className="mt-6 rounded-xl border border-border bg-muted/40 p-5">
            <p className="text-base font-semibold text-foreground">
              Tem dúvidas sobre {area.name} em Londrina? Fale com um advogado
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Conheça como o escritório atua em{" "}
              <a href={`/areas/${area.slug}`} className="text-gold underline hover:text-gold/80">{area.name}</a>{" "}
              ou envie sua dúvida pelo WhatsApp para uma orientação inicial.
            </p>
            <div className="mt-4"><CtaButton title={article.title} /></div>
          </aside>
        )}

        <ShareButtons url={`${SITE_URL}/noticias/${article.slug}`} title={article.title} />

        {related.length > 0 && (
          <section aria-labelledby="rel-title" className="mt-10">
            <h2 id="rel-title" className="mb-4 font-sans text-xl font-semibold text-navy">Artigos relacionados</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <a href={`/noticias/${r.slug}`} className="text-foreground/85 underline-offset-4 hover:text-gold hover:underline">
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bloco institucional — menções jornalísticas */}
        <MediaMentions />

        {/* CTA 3 — final */}
        <CtaDuvidasBlock title={article.title} />
      </main>
      <Footer />
    </div>
  );
}
