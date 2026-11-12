import { describe, it, expect } from "vitest";
import { boldHeadingText, enhanceContent } from "./article-content";

describe("subtítulos em negrito", () => {
  it("converte parágrafo inteiro em negrito com até 90 caracteres", () => {
    expect(boldHeadingText("<strong>Quais são os seus direitos?</strong>")).toBe("Quais são os seus direitos?");
  });
  it("não converte quando há texto comum fora do negrito", () => {
    expect(boldHeadingText("<strong>Prazo:</strong> 12 meses")).toBeNull();
  });
  it("não converte acima de 90 caracteres", () => {
    expect(boldHeadingText(`<strong>${"a".repeat(91)}</strong>`)).toBeNull();
  });
  it("gera índice com ids", () => {
    const r = enhanceContent("<p><strong>Primeira parte</strong></p><p>texto</p><h2>Segunda</h2>");
    expect(r.toc.map((t) => t.id)).toEqual(["primeira-parte", "segunda"]);
  });
});
