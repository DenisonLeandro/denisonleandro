## Objetivo

Fazer com que Google, redes sociais e robôs de IA recebam as notícias e os artigos já prontos na página, sem o texto "Carregando...". O visual não muda.

## O que muda

### 1. Página de cada artigo (/noticias/{slug})
- O artigo inteiro é buscado no servidor antes de a página ser enviada. Ele já chega com o título (H1), a data de publicação, o nome do autor (campo `author`, com "Equipe Denison Leandro Advogados" quando estiver vazio), o corpo completo, a capa e os 3 CTAs.
- Se o artigo não existir ou não estiver publicado, a página responde com o código 404 de verdade e mostra a tela "não encontrado".
- Cabeçalho de SEO de cada artigo:
  - title: usa `seo_title`, ou o título do artigo se `seo_title` estiver vazio
  - description: usa `seo_description`, depois o resumo, depois o começo do texto
  - canonical e og:url: o endereço do próprio artigo
  - og:title, og:description e og:type "article"
  - og:image e twitter:image: a capa do artigo, ou a imagem padrão quando não houver capa
  - article:published_time, article:modified_time e article:author
  - Dados estruturados de artigo para o Google (Article + BreadcrumbList)

### 2. Lista de notícias (/noticias)
- Os artigos publicados são buscados no servidor, 12 por página, com links `<a href>` de verdade.
- Paginação pelo endereço: /noticias?pagina=2, /noticias?pagina=3…, com links "Anterior / Próxima" e números de página, no mesmo estilo dos botões atuais.
- Cada página tem seu próprio canonical (a página 1 aponta para /noticias, as outras para /noticias?pagina=N).
- O card em destaque "Acidente de trabalho" continua aparecendo só na página 1.

## Preservado
Visual, painel, banco, permissões, upload de capa, CTAs, WhatsApp, MediaMentions, prévia de notícias na home, sitemap, robots.

## Detalhes técnicos
- Novo `src/lib/articles.functions.ts` com `createServerFn` (GET): `getPublishedArticle(slug)` e `listPublishedArticles(page)`. Usa um cliente com a chave publicável criado dentro do handler (as permissões de leitura pública dos artigos publicados continuam valendo) e devolve objetos simples.
- `noticias.$slug.tsx`: o loader chama a função; se não vier nada, `throw notFound()`. O TanStack Start SSR responde 404 quando há notFound. Remove o `useEffect` e o estado de carregamento, e usa `Route.useLoaderData()`. Adiciona `errorComponent` e `notFoundComponent`.
- `noticias.index.tsx`: `validateSearch` com `pagina` (zod + fallback, número ajustado dentro do componente), `loaderDeps` com `pagina`, loader com `range()` e `count: "exact"`. Mesmo markup dos cards.
- `buildHead` ganha campos opcionais `publishedTime`, `modifiedTime` e `author`, que geram as metas `article:*`.
- Verificação: `curl` em /noticias, /noticias?pagina=2 e em um artigo para confirmar o HTML completo e as metas; um slug inexistente deve devolver 404.
