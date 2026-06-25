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

export const Route = createFileRoute("/")({
  head: () =>
    buildHead({
      fullTitle: "Denison Leandro Advogados Associados | Advocacia em Londrina-PR",
      title: "Advocacia em Londrina",
      description:
        "Escritório de advocacia full service com 25 anos de atuação. Direito Trabalhista, Previdenciário, do Consumidor, de Família, Contratos, Bancário e Mediação.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PracticeAreas />
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
