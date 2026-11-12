import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/denison.png.asset.json";

export const Route = createFileRoute("/equipe/denison-henrique-leandro")({
  head: () => personHead({ slug: "denison-henrique-leandro", name: "Dr. Denison Leandro", jobTitle: "Sócio Fundador", description: "Sócio fundador, especialista em Direito do Trabalho, Pós-Graduado pela FGV.", email: "denison@denisonleandro.adv.br", oab: "OAB/PR 28.764", photo: photo.url, knowsAbout: ["Direito do Trabalho", "Direito e Saúde"], credentials: ["Pós-Graduação em Direito do Trabalho (FGV)", "Pós-Graduação em Direito e Saúde (Albert Einstein – Instituto Israelita de Ensino e Pesquisa)"], alumniOf: ["Fundação Getulio Vargas (FGV)", "Albert Einstein – Instituto Israelita de Ensino e Pesquisa"], sameAs: ["https://www.linkedin.com/in/denison-leandro-297b82286/"] }),
  component: () => (
    <LawyerDetail
      name="Dr. Denison Leandro"
      oab="OAB/PR 28.764"
      email="denison@denisonleandro.adv.br"
      bio="Denison Leandro é Pós-Graduado pela FGV, especialista em Direito do Trabalho, com mais de 23 anos de atuação na área trabalhista. Pós-Graduado em Direito e Saúde pelo Albert Einstein – Instituto Israelita de Ensino e Pesquisa. É sócio fundador do escritório Denison Leandro e Advogados Associados."
      photo={photo.url}
      linkedin="https://www.linkedin.com/in/denison-leandro-297b82286/"
    />
  ),
});
