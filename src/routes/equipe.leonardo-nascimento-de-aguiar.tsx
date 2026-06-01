import { createFileRoute } from "@tanstack/react-router";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/leonardo-nascimento-de-aguiar")({
  head: () => ({
    meta: [
      { title: "Leonardo Nascimento de Aguiar | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Estagiário do escritório Denison Leandro e Advogados Associados." },
    ],
  }),
  component: () => (
    <StaffDetail
      name="Leonardo Nascimento de Aguiar"
      role="Estagiário"
    />
  ),
});
