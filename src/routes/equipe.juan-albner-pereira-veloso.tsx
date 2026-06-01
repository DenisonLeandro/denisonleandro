import { createFileRoute } from "@tanstack/react-router";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/juan-albner-pereira-veloso")({
  head: () => ({
    meta: [
      { title: "Dr. Juan Albner Pereira Veloso | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Advogado com ênfase no Direito do Trabalho." },
    ],
  }),
  component: () => (
    <LawyerDetail
      name="Dr. Juan Albner Pereira Veloso"
      oab="OAB/PR 104.933"
      email="juan@denisonleandro.adv.br"
      bio="Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho."
      photo={null}
    />
  ),
});
