const MEDIA_LOGOS = [
  { name: "Valor", src: "/media-logos/valor.png" },
  { name: "Folha de S.Paulo", src: "/media-logos/folha.png" },
  { name: "G1", src: "/media-logos/g1.png" },
  { name: "ConJur", src: "/media-logos/conjur.png" },
  { name: "Estado de Minas", src: "/media-logos/estado-de-minas.png" },
  { name: "O Tempo", src: "/media-logos/o-tempo.png" },
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

        <ul className="mt-8 grid grid-cols-3 items-center gap-6 sm:gap-8 md:grid-cols-6">
          {MEDIA_LOGOS.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="h-8 w-auto object-contain opacity-90 sm:h-10"
              />
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
