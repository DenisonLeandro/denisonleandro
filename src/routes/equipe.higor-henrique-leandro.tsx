import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/higor.png.asset.json";

export const Route = createFileRoute("/equipe/higor-henrique-leandro")({
  head: () => buildHead({ title: "Dr. Higor Henrique Leandro", description: "Advogado com ênfase no Direito do Trabalho.", path: "/equipe/higor-henrique-leandro" }),
  component: () => (
    <LawyerDetail
      name="Dr. Higor Henrique Leandro"
      oab="OAB/PR 64.072"
      email="higor@denisonleandro.adv.br"
      bio="Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho."
      photo={photo.url}
    />
  ),
});
