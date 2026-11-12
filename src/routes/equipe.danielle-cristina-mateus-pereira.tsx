import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/danielle-cristina-mateus-pereira")({
  head: () => personHead({ slug: "danielle-cristina-mateus-pereira", name: "Dra. Danielle Cristina Mateus Pereira", jobTitle: "Advogada", description: "Advogada com ênfase no Direito do Trabalho.", email: "danielle@denisonleandro.adv.br", oab: "OAB/PR 57.927", knowsAbout: ["Direito do Trabalho"] }),
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
