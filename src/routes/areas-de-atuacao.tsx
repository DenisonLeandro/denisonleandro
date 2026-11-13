import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";
import { AreaCardsGrid } from "@/components/site/PracticeAreas";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { buildHead } from "@/lib/seo";
import { listPublishedTopics } from "@/lib/area-topics.functions";

export const Route = createFileRoute("/areas-de-atuacao")({
  loader: async () => ({ topics: await listPublishedTopics({ data: {} }).catch(() => []) }),
  head: () =>
    buildHead({
      title: "Áreas de Atuação",
      description:
        "Atuação full service em Direito Trabalhista, Previdenciário, da Saúde, do Consumidor, Bancário/Financeiro, de Família e Contratos.",
      path: "/areas-de-atuacao",
    }),
  component: AreasPage,
});

function AreasPage() {
  const { topics } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Especialidades"
          title="Áreas de Atuação"
          description="Atuação full service em sete áreas estratégicas do Direito, com equipe especializada em cada uma delas."
        />
        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <AreaCardsGrid topics={topics} />
            <div className="mt-14 flex justify-center">
              <WhatsAppButton message="Olá! Vim pela página de Áreas de Atuação do site Denison Leandro e gostaria de falar com um advogado." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
