import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { PracticeAreas } from "@/components/site/PracticeAreas";
import { NoticiasPreview } from "@/components/site/NoticiasPreview";
import { About } from "@/components/site/About";
import { Values } from "@/components/site/Values";
import { Team } from "@/components/site/Team";
import { Locations } from "@/components/site/Locations";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";
import { buildHead } from "@/lib/seo";
import { listPublishedTopics } from "@/lib/area-topics.functions";

export const Route = createFileRoute("/")({
  loader: async () => ({ topics: await listPublishedTopics({ data: {} }).catch(() => []) }),
  head: () =>
    buildHead({
      fullTitle: "Denison Leandro Advogados Associados | Advocacia em Londrina-PR",
      title: "Advocacia em Londrina",
      description:
        "Escritório de advocacia full service desde 2000. Direito Trabalhista, Previdenciário, da Saúde, do Consumidor, Bancário, de Família e Contratos.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  const { topics } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PracticeAreas topics={topics} />
        <NoticiasPreview />
        <About />
        <Values />
        <Team />
        <Locations />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
