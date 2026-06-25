import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/danielle-cristina-mateus-pereira")({
  head: () => buildHead({ title: "Dra. Danielle Cristina Mateus Pereira", description: "Advogada com ênfase no Direito do Trabalho.", path: "/equipe/danielle-cristina-mateus-pereira" }),
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
