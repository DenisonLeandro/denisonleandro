import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Calendar, Loader2, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
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

const WHATSAPP_URL =
  "https://wa.me/5548988487889?text=Ol%C3%A1%2C%20vim%20por%20um%20artigo%20no%20site%20Denison%20Leandro%20e%20gostaria%20de%20receber%20uma%20orienta%C3%A7%C3%A3o%20r%C3%A1pida.";

export const Route = createFileRoute("/noticias/$slug")({
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

function CtaButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe57] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:w-auto"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Receba uma orientação
    </a>
  );
}

function CtaCallout() {
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
          href={WHATSAPP_URL}
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

function CtaDuvidasBlock() {
  return (
    <div className="mt-12 border-t border-border pt-10">
      <h3 className="text-xl font-semibold text-navy">Envie as suas dúvidas</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Receba orientações iniciais e entenda o que fazer no seu caso.
      </p>
      <div className="mt-4">
        <textarea
          readOnly
          placeholder="Descreva o que aconteceu e o que você gostaria de saber..."
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy/30"
          rows={4}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <a
          href={WHATSAPP_URL}
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

function isHtmlContent(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

interface ContentParts {
  isHtml: boolean;
  first: string;
  second: string;
  plainParagraphs?: { first: string[]; second: string[] };
}

function splitContent(content: string): ContentParts {
  const raw = content ?? "";
  if (isHtmlContent(raw)) {
    // Split by closing </p> preserving each paragraph
    const parts = raw
      .split(/<\/p>/i)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
      .map((p) => p + "</p>");
    if (parts.length <= 1) {
      return { isHtml: true, first: raw, second: "" };
    }
    const mid = Math.floor(parts.length / 2);
    return {
      isHtml: true,
      first: parts.slice(0, mid).join(""),
      second: parts.slice(mid).join(""),
    };
  }
  const paragraphs = raw
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (paragraphs.length <= 1) {
    return {
      isHtml: false,
      first: "",
      second: "",
      plainParagraphs: { first: paragraphs, second: [] },
    };
  }
  const mid = Math.floor(paragraphs.length / 2);
  return {
    isHtml: false,
    first: "",
    second: "",
    plainParagraphs: {
      first: paragraphs.slice(0, mid),
      second: paragraphs.slice(mid),
    },
  };
}

function NoticiaDetail() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      try {
        const { data, error } = await (supabase as any)
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

  const contentParts = useMemo(
    () => (article ? splitContent(article.content) : null),
    [article],
  );

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

  const articleBodyClasses = [
    "font-sans text-foreground",
    "[&_p]:font-sans [&_p]:text-justify [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-base [&_p]:text-foreground",
    "[&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy [&_h2]:mt-10 [&_h2]:mb-4",
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

  const plainParagraphClass =
    "font-sans text-justify leading-[1.8] mb-6 text-base text-foreground";

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

        {/* CTA 1 — topo */}
        <div className="mb-8">
          <CtaButton />
        </div>

        {article.excerpt && (
          <p className="mb-8 border-l-4 border-gold pl-4 text-lg italic text-muted-foreground">
            {article.excerpt}
          </p>
        )}

        {/* Conteúdo + CTA intermediário */}
        {contentParts?.isHtml ? (
          <>
            <div className={articleBodyClasses}>
              <div dangerouslySetInnerHTML={{ __html: contentParts.first }} />
            </div>
            <CtaCallout />
            {contentParts.second && (
              <div className={articleBodyClasses}>
                <div
                  dangerouslySetInnerHTML={{ __html: contentParts.second }}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              {(contentParts?.plainParagraphs?.first ?? []).map((p, i) => (
                <p key={`p1-${i}`} className={`${plainParagraphClass} whitespace-pre-line`}>
                  {p}
                </p>
              ))}
            </div>
            <CtaCallout />
            {contentParts?.plainParagraphs?.second &&
              contentParts.plainParagraphs.second.length > 0 && (
                <div>
                  {contentParts.plainParagraphs.second.map((p, i) => (
                    <p key={`p2-${i}`} className={`${plainParagraphClass} whitespace-pre-line`}>
                      {p}
                    </p>
                  ))}
                </div>
              )}
          </>
        )}

        {/* CTA 3 — final */}
        <CtaDuvidasBlock />
      </main>
      <Footer />
    </div>
  );
}
