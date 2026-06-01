import { createFileRoute } from "@tanstack/react-router";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/joao.png.asset.json";

export const Route = createFileRoute("/equipe/joao-tadeu-leandro")({
  head: () => ({
    meta: [
      { title: "Dr. João Tadeu Leandro | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Advogado com ênfase no Direito do Trabalho." },
    ],
  }),
  component: () => (
    <LawyerDetail
      name="Dr. João Tadeu Leandro"
      oab="OAB/PR 67.404"
      email="joao@denisonleandro.adv.br"
      bio="Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho."
      photo={photo.url}
    />
  ),
});
