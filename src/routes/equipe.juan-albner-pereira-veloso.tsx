import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/juan-albner-pereira-veloso")({
  head: () => buildHead({ title: "Dr. Juan Albner Pereira Veloso", description: "Advogado com ênfase no Direito do Trabalho.", path: "/equipe/juan-albner-pereira-veloso" }),
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
