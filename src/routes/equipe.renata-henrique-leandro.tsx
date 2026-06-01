import { createFileRoute } from "@tanstack/react-router";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/renata.png.asset.json";

export const Route = createFileRoute("/equipe/renata-henrique-leandro")({
  head: () => ({
    meta: [
      { title: "Dra. Renata Henrique Leandro | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Advogada pós-graduada em Mediação, Conciliação e Arbitragem." },
    ],
  }),
  component: () => (
    <LawyerDetail
      name="Dra. Renata Henrique Leandro"
      oab="OAB/PR 77.170"
      email="renata@denisonleandro.adv.br"
      bio="Pós-graduada lato sensu em Mediação, Conciliação e Arbitragem. Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho."
      photo={photo.url}
    />
  ),
});
