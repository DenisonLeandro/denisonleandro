import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Crumbs } from "@/components/site/Crumbs";
import { AuthorBox } from "@/components/site/AuthorBox";
import { FaqList, faqSchema } from "@/components/site/FaqList";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { buildHead, breadcrumb, ORG_ID, FOUNDER_ID, SITE_URL } from "@/lib/seo";
import { getAreaCard } from "@/lib/area-cards";
import { normalizeFaq } from "@/lib/authors";
import { prepareArticleHtml } from "@/lib/article-content";
import { SAUDE } from "@/lib/saude-content";
import { getPublishedTopic, listPublishedTopics, type PublicTopic, type TopicSummary } from "@/lib/area-topics.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/areas/$area/$tema")({
  loader: async ({ params }) => {
    if (!getAreaCard(params.area)) throw notFound();
    const topic = await getPublishedTopic({ data: { area: params.area, slug: params.tema } });
    if (!topic) throw notFound();
    const siblings = await listPublishedTopics({ data: { area: params.area } }).catch(() => []);
    return { topic, siblings };
  },
  head: ({ params, loaderData }) => {
    const path = `/areas/${params.area}/${params.tema}`;
    const t = loaderData?.topic;
    const area = getAreaCard(params.area);
    if (!t || !area) return buildHead({ title: "Página não encontrada", description: "Página não encontrada.", path, noindex: true });
    const description = (t.seo_description || t.summary || t.title).slice(0, 300);
    const faq = normalizeFaq(t.faq);
    return buildHead({
      title: t.seo_title || t.title,
      fullTitle: t.seo_title || undefined,
      description,
      path,
      type: "article",
      publishedTime: t.created_at,
      modifiedTime: t.updated_at,
      jsonLd: [
        {
          "@type": "Article",
          headline: t.title,
          description,
          url: `${SITE_URL}${path}`,
          mainEntityOfPage: `${SITE_URL}${path}`,
          datePublished: t.created_at,
          dateModified: t.updated_at,
          inLanguage: "pt-BR",
          author: { "@id": FOUNDER_ID },
          publisher: { "@id": ORG_ID },
        },
        ...(faq.length ? [faqSchema(faq)] : []),
        breadcrumb([["Início", "/"], [area.title, area.to], [t.title, path]]),
      ],
    });
  },
  component: TopicRoute,
  notFoundComponent: DraftOrNotFound,
});

function TopicRoute() {
  const { topic, siblings } = Route.useLoaderData();
  return <TopicPage topic={topic} siblings={siblings} />;
}

const bodyClasses = [
  "font-sans text-foreground",
  "[&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-base",
  "[&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-navy [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24",
  "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-8 [&_h3]:mb-3",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6",
  "[&_li]:leading-[1.8] [&_a]:text-gold [&_a]:underline [&_strong]:font-semibold [&_strong]:text-navy",
].join(" ");

function TopicPage({ topic, siblings, draft = false }: { topic: PublicTopic; siblings: TopicSummary[]; draft?: boolean }) {
  const area = getAreaCard(topic.area_slug)!;
  const { html } = useMemo(() => prepareArticleHtml(topic.content ?? "", topic.title), [topic]);
  const faq = normalizeFaq(topic.faq);
  const others = siblings.filter((s) => s.slug !== topic.slug);
  const message = topic.area_slug === "saude" ? SAUDE.whatsapp : `Olá! Li a página "${topic.title}" no site Denison Leandro e gostaria de orientação.`;
  const path = `/areas/${topic.area_slug}/${topic.slug}`;
  return (
    <div className="min-h-screen bg-background">
      {draft && (
        <div role="status" className="bg-destructive px-4 py-2 text-center text-sm font-bold uppercase tracking-wider text-destructive-foreground">
          RASCUNHO — não publicado
        </div>
      )}
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <Crumbs items={[["Início", "/"], [area.title, area.to], [topic.title, path]]} />
        <h1 className="mt-6 font-serif text-4xl font-bold text-navy md:text-5xl">{topic.title}</h1>
        {topic.summary && (
          <section aria-label="Resumo" className="mt-8 rounded-r-lg border-l-4 border-gold bg-muted/50 px-5 py-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">Em resumo</p>
            <p className="leading-[1.8] text-foreground">{topic.summary}</p>
          </section>
        )}
        <div className="mt-8"><WhatsAppButton message={message} /></div>
        {html && <div className={`mt-10 ${bodyClasses}`} dangerouslySetInnerHTML={{ __html: html }} />}
        <FaqList items={faq} />
        <div className="mt-14"><AuthorBox area={topic.area_slug} /></div>
        <div className="mt-10 rounded-2xl bg-navy p-8 text-center">
          <p className="font-serif text-2xl text-white">Precisa de orientação sobre o seu caso?</p>
          <div className="mt-6"><WhatsAppButton message={message} /></div>
        </div>
        {others.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl text-navy">Outros temas de {area.title}</h2>
            <ul className="mt-4 space-y-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link to="/areas/$area/$tema" params={{ area: s.area_slug, tema: s.slug }} className="text-navy underline hover:text-gold">{s.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Link to={area.to} className="mt-10 inline-flex items-center gap-2 font-semibold text-gold hover:text-gold/80">
          <ArrowLeft size={16} /> Voltar para {area.title}
        </Link>
      </main>
      <Footer />
    </div>
  );
}

/** Visitors get a real 404; signed-in editors see the draft (client-side, noindex). */
function DraftOrNotFound() {
  const params = useParams({ strict: false }) as { area?: string; tema?: string };
  const [state, setState] = useState<{ topic: PublicTopic; siblings: TopicSummary[] } | null | "loading">("loading");
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session || !params.area || !params.tema || !getAreaCard(params.area)) { if (alive) setState(null); return; }
      const { data } = await supabase.from("area_topics").select("*").eq("area_slug", params.area).eq("slug", params.tema).maybeSingle();
      if (!data) { if (alive) setState(null); return; }
      const { data: sib } = await supabase.from("area_topics").select("area_slug, slug, title, summary, sort_order, updated_at")
        .eq("area_slug", params.area).eq("published", true).order("sort_order");
      if (alive) setState({ topic: { ...(data as any), faq: normalizeFaq(data.faq) } as PublicTopic, siblings: sib ?? [] });
    })();
    return () => { alive = false; };
  }, [params.area, params.tema]);
  useEffect(() => {
    if (state && state !== "loading") {
      let m = document.querySelector('meta[name="robots"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute("name", "robots"); document.head.appendChild(m); }
      m.setAttribute("content", "noindex,nofollow");
    }
  }, [state]);
  if (state && state !== "loading") return <TopicPage topic={state.topic} siblings={state.siblings} draft />;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-serif text-4xl text-navy">Página não encontrada</h1>
        <p className="mt-4 text-muted-foreground">O conteúdo que você procura não está disponível.</p>
        <Link to="/areas-de-atuacao" className="mt-8 inline-block font-semibold text-gold">Ver áreas de atuação</Link>
      </main>
      <Footer />
    </div>
  );
}
