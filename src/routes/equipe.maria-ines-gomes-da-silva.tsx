import { createFileRoute } from "@tanstack/react-router";
import { personHead } from "@/lib/seo";
import { StaffDetail } from "@/components/site/StaffDetail";

export const Route = createFileRoute("/equipe/maria-ines-gomes-da-silva")({
  head: () => personHead({ slug: "maria-ines-gomes-da-silva", name: "Maria Inês Gomes da Silva", jobTitle: "Administrativo/Financeiro", description: "Administrativo e Financeiro do escritório Denison Leandro Advogados Associados." }),
  component: () => (
    <StaffDetail
      name="Maria Inês Gomes da Silva"
      role="Administrativo/Financeiro"
    />
  ),
});
