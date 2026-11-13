import { describe, it, expect } from "vitest";
import { AREA_CARDS } from "./area-cards";

describe("cards de áreas", () => {
  it("seguem a ordem pedida e não incluem Mediação", () => {
    expect(AREA_CARDS.map((a) => a.slug)).toEqual(["trabalhista", "previdenciario", "saude", "consumidor", "bancario", "familia", "contratos"]);
  });
  it("frase do card de Saúde", () => {
    expect(AREA_CARDS.find((a) => a.slug === "saude")?.desc).toBe("Planos de saúde, medicamentos, SUS e erro médico.");
  });
});
