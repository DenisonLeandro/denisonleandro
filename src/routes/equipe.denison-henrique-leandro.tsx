import { createFileRoute } from "@tanstack/react-router";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/denison.png.asset.json";

export const Route = createFileRoute("/equipe/denison-henrique-leandro")({
  head: () => ({
    meta: [
      { title: "Dr. Denison Leandro | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Sócio fundador, especialista em Direito do Trabalho, Pós-Graduado pela FGV." },
    ],
  }),
  component: () => (
    <LawyerDetail
      name="Dr. Denison Leandro"
      oab="OAB/PR 28.764"
      email="denison@denisonleandro.adv.br"
      bio="Denison Leandro é Pós-Graduado pela FGV, especialista em Direito do Trabalho, com mais de 23 anos de atuação na área trabalhista. Pós-Graduado em Direito e Saúde pelo Albert Einstein – Instituto Israelita de Ensino e Pesquisa. É sócio fundador do escritório Denison Leandro e Advogados Associados."
      photo={photo.url}
    />
  ),
});
