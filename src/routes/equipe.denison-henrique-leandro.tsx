import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { LawyerDetail } from "@/components/site/LawyerDetail";
import photo from "@/assets/denison-escritorio-rosto.webp.asset.json";
import share from "@/assets/denison-escritorio-600.jpg.asset.json";

export const Route = createFileRoute("/equipe/denison-henrique-leandro")({
  head: () => personHead({ slug: "denison-henrique-leandro", name: "Dr. Denison Leandro", jobTitle: "Sócio Fundador", description: "Sócio fundador, especialista em Direito do Trabalho, Pós-Graduado pela FGV.", email: "denison@denisonleandro.adv.br", oab: "OAB/PR 28.764", photo: share.url, shareImage: { url: share.url, width: 600, height: 600 }, knowsAbout: ["Direito do Trabalho", "Direito da Saúde", "Direito Médico", "Plano de Saúde"], credentials: ["Pós-Graduação em Direito do Trabalho (FGV)", "Pós-graduado em Direito da Saúde e Direito Médico pelo Hospital Israelita Albert Einstein"], alumniOf: ["Fundação Getulio Vargas (FGV)", "Hospital Israelita Albert Einstein"], sameAs: ["https://www.linkedin.com/in/denison-leandro-297b82286/"] }),
  component: () => (
    <LawyerDetail
      name="Dr. Denison Leandro"
      oab="OAB/PR 28.764"
      email="denison@denisonleandro.adv.br"
      bio="Denison Leandro é Pós-Graduado pela FGV, especialista em Direito do Trabalho, com mais de 23 anos de atuação na área trabalhista. Pós-graduado em Direito da Saúde e Direito Médico pelo Hospital Israelita Albert Einstein. É sócio fundador do escritório Denison Leandro e Advogados Associados."
      photo={photo.url}
      linkedin="https://www.linkedin.com/in/denison-leandro-297b82286/"
    />
  ),
});
