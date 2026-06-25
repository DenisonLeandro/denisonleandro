import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/maria-ines-gomes-da-silva")({
  head: () => buildHead({ title: "Maria Inês Gomes da Silva", description: "Administrativo e Financeiro do escritório Denison Leandro Advogados Associados.", path: "/equipe/maria-ines-gomes-da-silva" }),
  component: () => (
    <StaffDetail
      name="Maria Inês Gomes da Silva"
      role="Administrativo/Financeiro"
    />
  ),
});
