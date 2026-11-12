import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";

export const Route = createFileRoute("/equipe/juan-albner-pereira-veloso")({
  head: () => personHead({ slug: "juan-albner-pereira-veloso", name: "Dr. Juan Albner Pereira Veloso", jobTitle: "Advogado", description: "Advogado com ênfase no Direito do Trabalho.", email: "juan@denisonleandro.adv.br", oab: "OAB/PR 104.933", knowsAbout: ["Direito do Trabalho"] }),
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
