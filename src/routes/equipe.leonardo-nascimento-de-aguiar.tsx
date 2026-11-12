import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/leonardo-nascimento-de-aguiar")({
  head: () => personHead({ slug: "leonardo-nascimento-de-aguiar", name: "Leonardo Nascimento de Aguiar", jobTitle: "Estagiário", description: "Estagiário do escritório Denison Leandro Advogados Associados." }),
  component: () => (
    <StaffDetail
      name="Leonardo Nascimento de Aguiar"
      role="Estagiário"
    />
  ),
});
