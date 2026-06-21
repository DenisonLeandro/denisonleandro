const MEDIA_ITEMS = [
  {
    name: "Valor Econômico",
    src: "/media-logos/valor.png",
    url: "https://valor.globo.com/legislacao/noticia/2023/10/14/tst-determina-pagamento-de-r-12-milhao-de-horas-extras-a-vendedor.ghtml",
  },
  {
    name: "Folha de S.Paulo",
    src: "/media-logos/folha.png",
    url: "https://www1.folha.uol.com.br/mercado/2023/10/justica-manda-souza-cruz-pagar-r-12-milhao-de-horas-extras-a-vendedor.shtml",
  },
  {
    name: "G1",
    src: "/media-logos/g1.png",
    url: "https://g1.globo.com/trabalho-e-carreira/noticia/2023/10/20/vendedor-externo-ganha-r-1-milhao-por-horas-extras-apos-provar-na-justica-que-empresa-controlava-sua-jornada-entenda.ghtml",
  },
  {
    name: "ConJur",
    src: "/media-logos/conjur.png",
    url: "https://www.conjur.com.br/2023-nov-06/possibilidade-controle-jornada-obriga-pagar-hora-extra/",
  },
  {
    name: "Estado de Minas",
    src: "/media-logos/estado-de-minas.png",
    url: "https://www.em.com.br/app/noticia/economia/2023/10/17/internas_economia,1577984/justica-condena-souza-cruz-pagar-r-1-2-milhao-de-horas-extras-a-vendedor.shtml",
  },
  {
    name: "O Tempo",
    src: "/media-logos/o-tempo.png",
    url: "https://www.otempo.com.br/economia/souza-cruz-e-condenada-a-indenizar-vendedor-em-r-1-2-milhao-por-horas-extra-1.3256229",
  },
] as const;

export function MediaMentions() {
  return (
    <section
      aria-labelledby="media-mentions-title"
      className="my-12 rounded-lg border border-border bg-card p-6 sm:p-10"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2
          id="media-mentions-title"
          className="text-2xl font-semibold text-foreground sm:text-3xl"
        >
          Denison Leandro Advogados na mídia
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Casos e artigos do escritório já foram repercutidos em veículos de
          imprensa nacional, regional e jurídica.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 sm:gap-4">
          {MEDIA_ITEMS.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center justify-center rounded-md border border-border bg-background p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-4"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  className="h-14 w-auto max-w-full object-contain opacity-90 transition-opacity group-hover:opacity-100 sm:h-16"
                />
                <span className="mt-2 text-[10px] leading-tight text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                  Ver publicação
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-muted-foreground">
          Menções jornalísticas. As marcas pertencem aos seus respectivos
          titulares e não indicam patrocínio, parceria ou endosso.
        </p>
      </div>
    </section>
  );
}

export default MediaMentions;
