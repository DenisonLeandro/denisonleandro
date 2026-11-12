import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/marcio.png.asset.json";

export const Route = createFileRoute("/equipe/marcio-barbosa-da-silva")({
  head: () => personHead({ slug: "marcio-barbosa-da-silva", name: "Dr. Márcio Barbosa da Silva", jobTitle: "Advogado", description: "Advogado especialista em Direito do Trabalho e Previdenciário.", email: "marcio@denisonleandro.adv.br", oab: "OAB/PR 52.894", photo: photo.url, knowsAbout: ["Direito do Trabalho", "Direito Previdenciário", "Cálculos Previdenciários"], credentials: ["Pós-Graduação em Direito do Trabalho e Processo do Trabalho", "Especialização em Cálculos Previdenciários", "Especialização em Espécies de Benefícios Previdenciários"] }),
  component: () => (
    <LawyerDetail
      name="Dr. Márcio Barbosa da Silva"
      oab="OAB/PR 52.894"
      email="marcio@denisonleandro.adv.br"
      bio="Pós-graduado em Direito do Trabalho e Processo do Trabalho. Especialista em Cálculos Previdenciários. Especialista em Espécies de Benefícios Previdenciários, Pensão e demais Benefícios. Experiência em demandas e consultoria nas diversas áreas do direito, com ênfase no Direito do Trabalho e Previdenciário."
      photo={photo.url}
    />
  ),
});
