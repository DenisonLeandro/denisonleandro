import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { Crumbs } from "@/components/site/Crumbs";
import { AuthorBox } from "@/components/site/AuthorBox";
import { FaqList, faqSchema } from "@/components/site/FaqList";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { AreaCardsGrid } from "@/components/site/PracticeAreas";
import { buildHead, breadcrumb, ORG_ID, SITE_URL } from "@/lib/seo";
import { SAUDE } from "@/lib/saude-content";
import { listPublishedTopics } from "@/lib/area-topics.functions";

const PATH = "/areas/saude";

export const Route = createFileRoute("/areas/saude")({
  loader: async () => ({ topics: await listPublishedTopics({ data: {} }).catch(() => []) }),
  head: () =>
    buildHead({
      title: SAUDE.h1,
      fullTitle: SAUDE.seoTitle,
      description: SAUDE.description,
      path: PATH,
      jsonLd: [
        {
          "@type": "Service",
          name: SAUDE.h1,
          serviceType: "Direito da Saúde",
          description: SAUDE.description,
          url: `${SITE_URL}${PATH}`,
          areaServed: { "@type": "Country", name: "Brasil" },
          provider: { "@id": ORG_ID },
        },
        faqSchema(SAUDE.faq),
        breadcrumb([["Início", "/"], ["Áreas de Atuação", "/areas-de-atuacao"], ["Direito da Saúde", PATH]]),
      ],
    }),
  component: SaudePage,
});

function SaudePage() {
  const { topics } = Route.useLoaderData();
  const own = topics.filter((t) => t.area_slug === "saude");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader eyebrow="Área de Atuação" title={SAUDE.h1} description={SAUDE.subtitle}>
          <WhatsAppButton message={SAUDE.whatsapp} />
        </PageHeader>

        <div className="mx-auto max-w-4xl px-6 pt-8 lg:px-10">
          <Crumbs items={[["Início", "/"], ["Áreas de Atuação", "/areas-de-atuacao"], ["Direito da Saúde", PATH]]} />
        </div>

        <section className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
          <div aria-label="Em resumo" className="rounded-r-lg border-l-4 border-gold bg-muted/50 px-6 py-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold">Em resumo</p>
            <p className="leading-[1.8] text-foreground">{SAUDE.resumo}</p>
          </div>

          {own.length > 0 && (
            <section className="mt-14">
              <h2 className="font-serif text-2xl text-navy md:text-3xl">Como podemos ajudar</h2>
              <div className="mt-3 h-px w-12 bg-gold" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {own.map((t) => (
                  <Link key={t.slug} to="/areas/$area/$tema" params={{ area: "saude", tema: t.slug }}
                    className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
                    <h3 className="font-serif text-lg text-navy">{t.title}</h3>
                    {t.summary && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.summary}</p>}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-gold">Ler mais <ArrowUpRight size={14} /></span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-14">
            <h2 className="font-serif text-2xl text-navy md:text-3xl">Como funciona o atendimento</h2>
            <div className="mt-3 h-px w-12 bg-gold" />
            <ol className="mt-6 space-y-4">
              {SAUDE.passos.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-semibold text-gold">{i + 1}</span>
                  <p className="leading-relaxed text-foreground/85"><strong className="text-navy">{t}:</strong> {d}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-serif text-2xl text-navy md:text-3xl">O que separar antes de falar com um advogado</h2>
            <div className="mt-3 h-px w-12 bg-gold" />
            <ul className="mt-6 space-y-3">
              {SAUDE.documentos.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          <FaqList items={SAUDE.faq} />

          <div className="mt-14"><AuthorBox area="saude" /></div>
        </section>

        <section className="bg-navy py-14 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-serif text-2xl text-white md:text-3xl">Recebeu uma negativa do plano de saúde?</p>
            <p className="mt-3 text-cream/80">Fale com o escritório. Atendimento online em todo o Brasil e presencial em Londrina-PR.</p>
            <div className="mt-8"><WhatsAppButton message={SAUDE.whatsapp} /></div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-center font-serif text-3xl text-navy">Outras áreas de atuação</h2>
            <div className="mx-auto mt-4 mb-12 h-px w-16 bg-gold" />
            <AreaCardsGrid topics={topics} exclude="saude" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
