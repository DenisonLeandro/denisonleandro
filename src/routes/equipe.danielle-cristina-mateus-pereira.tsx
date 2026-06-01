import { createFileRoute } from "@tanstack/react-router";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/danielle-cristina-mateus-pereira")({
  head: () => ({
    meta: [
      { title: "Dra. Danielle Cristina Mateus Pereira | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Advogada com ênfase no Direito do Trabalho." },
    ],
  }),
  component: () => (
    <LawyerDetail
      name="Dra. Danielle Cristina Mateus Pereira"
      oab="OAB/PR 57.927"
      email="danielle@denisonleandro.adv.br"
      bio="Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho."
      photo={null}
    />
  ),
});
