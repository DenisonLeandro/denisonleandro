import { describe, expect, it } from "vitest";
import { findRedirect } from "./redirects";

describe("findRedirect", () => {
  it("sends the old stability article to the kept one", () => {
    expect(findRedirect("/noticias/acidente-de-trabalho-estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir/")).toBe(
      "/noticias/estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir",
    );
  });
  it("sends the old 6x1 article to the kept one", () => {
    expect(findRedirect("/noticias/fim-da-escala-6x1-o-que-pode-mudar-para-quem-trabalha-aos-domingos")).toBe(
      "/noticias/fim-da-escala-6x1-congresso-aprova-mudanca-na-jornada-de-trabalho-veja-o-que-muda",
    );
  });
  it("leaves other pages alone", () => {
    expect(findRedirect("/noticias")).toBeNull();
  });
});
