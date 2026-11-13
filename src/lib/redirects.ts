// Old-URL rules (WordPress site). Applied on the server for every request (see src/start.ts).
// Specific entries win over generic 410 routes (/tag, /category, /author...).
export type RedirectResult = { status: 301; to: string } | { status: 410 };

const VENDEDOR_ARTIGO = "/noticias/vendedor-externo-tem-direito-a-horas-extras-entenda-quando-a-empresa-deve-pagar";
const HORAS = "/noticias/5-sinais-de-que-a-empresa-esta-devendo-horas-extras-a-voce-e-o-que-fazer";
const MOTORISTA =
  "/noticias/direito-do-trabalho-motorista-de-aplicativo-tem-direito-trabalhista-o-que-esta-em-julgamento-no-stf";

const many = (paths: string[], to: string) => Object.fromEntries(paths.map((p) => [p, to]));
const tags = (names: string[]) => names.map((n) => `/tag/${n}`);

/** "old path" -> "new path" (permanent 301). Add new entries here. */
export const PERMANENT_REDIRECTS: Record<string, string> = {
  // Dr. Juan saiu do escritório (nov/2026)
  "/equipe/juan-albner-pereira-veloso": "/profissionais",
  "/noticias/acidente-de-trabalho-estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir":
    "/noticias/estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir",
  "/noticias/fim-da-escala-6x1-o-que-pode-mudar-para-quem-trabalha-aos-domingos":
    "/noticias/fim-da-escala-6x1-congresso-aprova-mudanca-na-jornada-de-trabalho-veja-o-que-muda",
  "/consumidor": "/areas/consumidor",
  "/areas/mediacao": "/areas-de-atuacao",
  "/profissionais-2": "/profissionais",
  "/eventos-sociais": "/escritorio",
  "/precisou-de-ajuda-entre-em-contato-com-a-gente": "/contato",
  "/author/administrador": "/escritorio",
  ...many(["/category/noticias", "/category/leis", "/category/sem-categoria"], "/noticias"),
  ...many(
    [
      "/horas-extras-para-o-vendedor-externo",
      "/vendedor-externo-e-representante-comercial-tem-direito-a-horas-extras",
      "/vendedor-externo-voce-pode-ter-direito-as-suas-horas-extras-nao-remuneradas",
      "/trt-empresa-pagara-horas-extras-a-vendedor-externo-monitorado-por-celular-2",
      "/justica-determina-pagamento-de-r-12-milhao-de-horas-extras-a-vendedor-defendido-pelo-escritorio-denison-leandro",
      "/empresa-de-telecomunicacoes-foi-condenada-a-pagar-horas-extraordinarias-e-adicional-noturno-a-uma-funcionaria-que-realizava-trabalho-externo",
      "/conheca-os-tipos-mais-comuns-de-comissao-de-vendas",
      "/o-cliente-nao-pagou-como-fica-a-minha-comissao",
      "/tenho-direito-a-comissao-de-vendas-online",
      "/tag/vendedor-externo",
    ],
    VENDEDOR_ARTIGO,
  ),
  ...many(
    [
      "/a-setima-e-oitava-hora-para-trabalhadores-que-atuam-em-casas-bancarias",
      "/banco-de-horas-pode-substituir-o-pagamento-de-horas-extras",
      "/quando-deixa-de-ser-hora-extra-e-passa-a-ser-adicionar-noturno",
      "/tag/hora-extra",
    ],
    HORAS,
  ),
  "/assedio-e-discriminacao-no-local-de-trabalho-saiba-o-que-fazer": "/noticias/posso-processar-a-empresa-por-assedio-moral",
  "/auxilio-doenca-saiba-o-que-e-e-quando-solicitar": "/noticias/auxilio-doenca-negado-pelo-inss-o-que-fazer-agora",
  ...many(
    ["/entenda-os-descansos-intrajornada-e-interjornada-de-trabalho", "/intervalo-intrajornada-x-interjornada"],
    "/noticias/intervalo-de-almoco-reduzido-da-direito-a-pagamento",
  ),
  "/gestante-consegue-anular-pedido-de-demissao-e-obtem-direito-a-estabilidade-provisoria":
    "/noticias/quem-pede-demissao-perde-todos-os-direitos-mito-ou-verdade",
  "/pejotizacao-e-a-tentativa-de-mascarar-a-verdadeira-relacao-juridica-do-emprego":
    "/noticias/trabalho-sem-registro-quais-sao-os-seus-direitos",
  ...many(
    ["/uber-condenada-na-justica-entenda-como-isso-pode-afetar-os-motoristas", ...tags(["motoristas", "motoristas-de-aplicativo", "uber"])],
    MOTORISTA,
  ),
  ...many(
    [
      "/3-direitos-das-gestantes-no-trabalho",
      "/80-anos-de-clt-e-como-andam-os-direitos-trabalhistas",
      "/conheca-os-principais-direitos-do-trabalhador",
      "/demissao-por-justa-causa-saiba-quais-sao-os-motivos-previstos-pela-clt",
      "/entenda-as-diferencas-entre-insalubridade-e-periculosidade",
      "/ja-ouviu-falar-da-negociacao-coletiva",
      "/jovem-aprendiz-atencao-aos-seus-direitos",
      "/por-que-o-vale-transporte-e-descontado-do-meu-salario",
      "/principais-duvidas-sobre-o-adcional-de-insalubridade",
      "/saiba-mais-sobre-o-adicional-por-periculosidade",
      "/quando-aconselhamos-solicitar-a-rescisao-indireta-2",
      "/quando-devo-entrar-em-contato-com-um-advogado-trabalhista",
      "/saiba-quais-sao-as-provas-necessarias-para-dar-entrada-em-um-processo-trabalhista",
      "/voce-e-prestador-de-servico-terceirizado-entao-confira-na-legenda-os-seus-principais-direitos",
      "/voce-sabe-o-que-e-aviso-previo-proporcional-confira-na-legenda",
      ...tags([
        "adicional", "adicional-por-insalubridade", "adicional-por-periculosidade", "ambiente-insalubre",
        "insalubridade", "exposicao", "risco-a-vida", "riscos", "saude-do-trabalhador", "clt",
        "consolidacao-das-leis-trabalhistas", "direitos-trabalhistas", "empregado", "interjornada",
        "intrajornada", "labor", "legislacao-trabalhistas", "leis-trabalhistas", "trabalho",
        "trabalhador-autonomo", "justica",
      ]),
    ],
    "/areas/trabalhista",
  ),
  ...many(
    [
      "/4-pontos-que-voce-deve-saber-sobre-a-revisao-da-vida-toda",
      "/confira-os-documentos-necessarios-para-dar-entrada-na-sua-aposentadoria",
      "/conheca-os-direitos-do-paciente-com-cancer",
      "/o-que-fazer-quando-o-empregador-nao-paga-o-inss",
      "/que-fazer-quando-o-empregador-nao-paga-o-inss",
      ...tags(["advogado-previdenciario", "aposentadoria", "beneficio", "direito-previdenciario", "inss", "revisao"]),
    ],
    "/areas/previdenciario",
  ),
  ...many(
    [
      "/a-condicao-financeira-define-a-guarda-dos-filhos",
      "/descubra-quem-pode-dar-entrada-em-um-inventario-judicial",
      "/entenda-como-funciona-o-divorcio-litigioso",
      "/guarda-compartilhada-dispensa-o-pagamento-da-pensao",
      "/o-que-e-preciso-para-o-divorcio-em-cartorio",
      ...tags(["advogada-da-familia", "direito-de-familia", "divorcio", "separacao"]),
    ],
    "/areas/familia",
  ),
  ...many(["/proclamacao-da-republica-e-feriado-nacional", "/tag/investimento"], "/noticias"),
};

/** Spam pages from the hacked WordPress: always 410, never redirected. */
export const GONE_PATHS = new Set([
  "/casino-turns-30-reflecting-on-the-1995-masterpiece-and-the-lessons-for-on-line-casino-culture-today",
  "/come-crazy-time-ha-cambiato-il-mondo-dei-bookmaker-italiani",
  "/dostup-k-moei-uchetnoi-zapisi-i-ekranu-registratsii",
  "/how-in-order-to-win-more-frequently-while-playing-on-the-web-roulette-betmgm",
  "/kometa-casino-kometa-kazino-ofitsialnyi-sait-a-kazakhstane",
  "/mostbet-gambling-establishment-pt-site-oficial-de-cassino-on-the-web-e-apostas",
  "/online-casino-united-states-no-deposit-added-bonus-keep-what-you-win",
  "/ramenbet-ramenbet-igrat-na-realnye-kvarplatu-ramen-bet-rabochee-zerkalo",
]);

/** Current team profile slugs (/equipe/{slug}). */
export const TEAM_SLUGS = new Set([
  "denison-henrique-leandro", "higor-henrique-leandro", "joao-tadeu-leandro",
  "marcio-barbosa-da-silva", "danielle-cristina-mateus-pereira", "renata-henrique-leandro",
  "maria-ines-gomes-da-silva", "leonardo-nascimento-de-aguiar",
]);
const TEAM_ALIASES: Record<string, string> = { "leonardo-nascimento-aguiar": "leonardo-nascimento-de-aguiar" };

/** Decide what to do with a path. Ignores trailing slash. Returns null for normal pages. */
export function resolveOldUrl(pathname: string): RedirectResult | null {
  let clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  try { clean = decodeURI(clean); } catch { /* keep raw */ }
  const hadSlash = clean !== pathname && pathname !== "/";

  if (GONE_PATHS.has(clean) || /^\/\d+-2$/.test(clean)) return { status: 410 };
  const exact = PERMANENT_REDIRECTS[clean];
  if (exact) return { status: 301, to: exact };
  if (/^\/\d{4}(\/\d{2})?$/.test(clean)) return { status: 301, to: "/noticias" };

  const team = clean.match(/^\/(equipe|team)(?:\/([^/]+))?$/);
  if (team) {
    const raw = team[2];
    if (!raw) return team[1] === "team" ? { status: 301, to: "/profissionais" } : null;
    const slug = TEAM_ALIASES[raw] ?? raw.replace(/^dra?-/, "");
    const to = TEAM_SLUGS.has(slug) ? `/equipe/${slug}` : "/profissionais";
    if (to === clean) return null; // already a current profile
    return { status: 301, to };
  }

  // Trailing-slash versions of current pages (/contato/ -> /contato).
  if (hadSlash) return { status: 301, to: clean };
  return null;
}

/** Back-compat: destination of a 301, or null. */
export function findRedirect(pathname: string): string | null {
  const r = resolveOldUrl(pathname);
  return r && r.status === 301 ? r.to : null;
}
