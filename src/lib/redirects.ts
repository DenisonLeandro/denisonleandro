// Permanent (301) redirects for old URLs. Add new entries here: "old path" -> "new path".
// Applied on the server for every request (see src/start.ts).
export const PERMANENT_REDIRECTS: Record<string, string> = {
  "/noticias/acidente-de-trabalho-estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir":
    "/noticias/estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir",
  "/noticias/fim-da-escala-6x1-o-que-pode-mudar-para-quem-trabalha-aos-domingos":
    "/noticias/fim-da-escala-6x1-congresso-aprova-mudanca-na-jornada-de-trabalho-veja-o-que-muda",
};

/** Returns the destination for a path, ignoring a trailing slash, or null. */
export function findRedirect(pathname: string): string | null {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return PERMANENT_REDIRECTS[clean] ?? PERMANENT_REDIRECTS[decodeURI(clean)] ?? null;
}
