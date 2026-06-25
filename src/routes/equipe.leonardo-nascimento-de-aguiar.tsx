import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/leonardo-nascimento-de-aguiar")({
  head: () => buildHead({ title: "Leonardo Nascimento de Aguiar", description: "Estagiário do escritório Denison Leandro Advogados Associados.", path: "/equipe/leonardo-nascimento-de-aguiar" }),
  component: () => (
    <StaffDetail
      name="Leonardo Nascimento de Aguiar"
      role="Estagiário"
    />
  ),
});
