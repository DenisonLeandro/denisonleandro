import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { PracticeAreas } from "@/components/site/PracticeAreas";
import { About } from "@/components/site/About";
import { Values } from "@/components/site/Values";
import { Team } from "@/components/site/Team";
import { Locations } from "@/components/site/Locations";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Denison Henrique Leandro e Advogados Associados | 25 anos de Advocacia" },
      {
        name: "description",
        content:
          "Escritório de advocacia full service com sede em Londrina-PR. Direito Trabalhista, Previdenciário, Consumidor, Família, Contratos, Bancário e Mediação.",
      },
      { property: "og:title", content: "Denison Henrique Leandro e Advogados Associados" },
      {
        property: "og:description",
        content: "25 anos defendendo seus direitos com excelência, ética e credibilidade.",
      },
    ],
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
