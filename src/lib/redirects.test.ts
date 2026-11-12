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

import { resolveOldUrl } from "./redirects";
describe("resolveOldUrl (WordPress)", () => {
  it("strips trailing slash on institutional pages", () => expect(resolveOldUrl("/contato/")).toEqual({ status: 301, to: "/contato" }));
  it("date archives go to noticias", () => {
    expect(resolveOldUrl("/2022/06/")).toEqual({ status: 301, to: "/noticias" });
    expect(resolveOldUrl("/2021")).toEqual({ status: 301, to: "/noticias" });
  });
  it("team dr- prefix goes to profile", () => expect(resolveOldUrl("/team/dra-renata-henrique-leandro")).toEqual({ status: 301, to: "/equipe/renata-henrique-leandro" }));
  it("unknown team member goes to profissionais", () => expect(resolveOldUrl("/team/otavio-niwa")).toEqual({ status: 301, to: "/profissionais" }));
  it("current profile untouched", () => expect(resolveOldUrl("/equipe/denison-henrique-leandro")).toBeNull());
  it("specific tag beats generic 410", () => expect(resolveOldUrl("/tag/inss/")).toEqual({ status: 301, to: "/areas/previdenciario" }));
  it("vendedor externo old pages go to the article", () => {
    const to = "/noticias/vendedor-externo-tem-direito-a-horas-extras-entenda-quando-a-empresa-deve-pagar";
    expect(resolveOldUrl("/tag/vendedor-externo/")).toEqual({ status: 301, to });
    expect(resolveOldUrl("/horas-extras-para-o-vendedor-externo")).toEqual({ status: 301, to });
  });
  it("numeric -2 spam is 410", () => expect(resolveOldUrl("/1638-2")).toEqual({ status: 410 }));
  it("current pages untouched", () => {
    for (const p of ["/", "/noticias", "/llms.txt", "/sitemap.xml", "/google9f6aaca8a92e26ca.html", "/favicon.ico"]) expect(resolveOldUrl(p)).toBeNull();
  });
});
