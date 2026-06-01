import { createFileRoute } from "@tanstack/react-router";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/maria-ines-gomes-da-silva")({
  head: () => ({
    meta: [
      { title: "Maria Inês Gomes da Silva | Denison Leandro e Advogados Associados" },
      { name: "description", content: "Administrativo/Financeiro do escritório Denison Leandro e Advogados Associados." },
    ],
  }),
  component: () => (
    <StaffDetail
      name="Maria Inês Gomes da Silva"
      role="Administrativo/Financeiro"
    />
  ),
});
