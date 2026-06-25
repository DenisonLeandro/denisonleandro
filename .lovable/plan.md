## Objetivo

Limpar a indexação do `denisonleandro.adv.br` para que apenas as rotas atuais do site novo apareçam no Google, e que qualquer URL herdada do WordPress hackeado retorne **410 Gone** (sinal explícito para o Google remover do índice), sem afetar o visual do site.

## 1. Rotas válidas atuais (única fonte de verdade)

Estas continuam indexáveis. Tudo fora desta lista deve cair em 404/410.

```
/                                     (home)
/escritorio
/areas-de-atuacao
/areas/trabalhista
/areas/previdenciario
/areas/consumidor
/areas/familia
/areas/contratos
/areas/bancario
/areas/mediacao
/profissionais
/equipe/denison-henrique-leandro
/equipe/marcio-barbosa-da-silva
/equipe/higor-henrique-leandro
/equipe/joao-tadeu-leandro
/equipe/renata-henrique-leandro
/equipe/juan-albner-pereira-veloso
/equipe/danielle-cristina-mateus-pereira
/equipe/maria-ines-gomes-da-silva
/equipe/leonardo-nascimento-de-aguiar
/contato
/noticias
/noticias/{slug}            (dinâmico — apenas artigos publicados)
/acidente-de-trabalho
```

Não indexáveis (já marcadas `noindex,nofollow`): `/auth`, `/admin`.

## 2. Bloquear/remover URLs herdadas do WordPress (410 Gone real)

Vou criar **server routes** em `src/routes/api/legacy/` que respondem com **HTTP 410 Gone** + `X-Robots-Tag: noindex` + corpo HTML curto em PT-BR. 410 é mais forte que 404 — sinaliza ao Google que a URL foi removida permanentemente.

Padrões cobertos (todos com splat `$` para pegar qualquer caminho/arquivo abaixo):

- `/wp-admin/$`
- `/wp-content/$`
- `/wp-includes/$`
- `/wp-json/$`
- `/category/$`
- `/tag/$`
- `/author/$`
- `/feed` e `/feed/$`
- `/comments/$`
- `/xmlrpc.php`

Arquivos:

```
src/routes/wp-admin.$.ts
src/routes/wp-content.$.ts
src/routes/wp-includes.$.ts
src/routes/wp-json.$.ts
src/routes/category.$.ts
src/routes/tag.$.ts
src/routes/author.$.ts
src/routes/feed.tsx        (rota exata /feed → 410)
src/routes/feed.$.ts
src/routes/comments.$.ts
src/routes/xmlrpc[.]php.ts
```

Cada handler:

```ts
GET: async () => new Response("<h1>410 Gone</h1>...", {
  status: 410,
  headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
})
```

## 3. `public/robots.txt` — bloquear crawling dos padrões antigos

Manter `Allow: /`, manter `Disallow: /admin` e `/auth`, e **adicionar**:

```
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-json/
Disallow: /xmlrpc.php
Disallow: /category/
Disallow: /tag/
Disallow: /author/
Disallow: /feed
Disallow: /comments/
Disallow: /*?p=
Disallow: /*?page_id=
Disallow: /*?replytocom=
```

> Observação técnica: `Disallow` impede o crawl. Para o Google **remover** as URLs já indexadas, o 410 (item 2) é o que importa. Os dois trabalham juntos.

## 4. Sem redirects abrangentes

Nenhum redirect 301 "tudo para a home". Não há mapeamento 1:1 conhecido entre URLs antigas e novas (se você tiver uma lista específica `/post-antigo` → `/noticias/...`, me passe depois e adiciono os 301s pontuais). Tudo que não bate vira 410 ou 404.

## 5. Rotas inexistentes → 404 real

A SPA já tem `notFoundComponent` no `__root.tsx`. Vou:

- Traduzir o texto para PT-BR (mantendo o visual atual).
- Adicionar `meta: [{ name: "robots", content: "noindex, nofollow" }]` no `head()` dessa página para garantir que não seja indexada.

(Observação honesta: TanStack Start em SPA pode servir 200 no HTML inicial mesmo na rota de 404. Para o Google, o `noindex` na meta + ausência da URL no sitemap + 410 nos padrões WP é o conjunto que efetivamente limpa o índice. Não vou prometer status 404 server-side para qualquer URL inventada — apenas para os padrões listados no item 2.)

## 6. Sitemap final

`src/routes/sitemap[.]xml.ts` já contém exatamente as 23 rotas válidas + artigos publicados do banco. **Nenhuma URL antiga, de WordPress, ou quebrada está presente** — verificado. Não preciso alterar.

## 7. Metadata (title/description) — já feito

Auditoria da última iteração:

- Home, `/escritorio`, todas as `/areas/*`, `/profissionais`, todas as `/equipe/*`, `/contato`, `/noticias`, `/noticias/{slug}`, `/acidente-de-trabalho` — todas usam `buildHead()` com title único (~55 chars) e description única (~150 chars), `og:*`, `twitter:*`, `canonical` apontando para `https://denisonleandro.adv.br/...`.
- `/auth` e `/admin` com `noindex,nofollow`.

Não há mudança necessária aqui — apenas confirmação no resumo final.

## 8. Sem alteração visual

Nenhum componente, layout, cor, tipografia, navbar, footer, CTA, WhatsApp, tracking ou banco de dados muda. Apenas:
- novos arquivos de rota server-only `*.$.ts` para 410
- `public/robots.txt`
- texto PT-BR + meta noindex no `NotFoundComponent`

## Resumo final que vou entregar após implementar

- **Indexáveis (23 + artigos):** lista do item 1
- **Bloqueadas no robots.txt:** padrões do item 3
- **Retornam 410 Gone:** todos os caminhos do item 2
- **Sitemap:** `https://denisonleandro.adv.br/sitemap.xml` contendo só as 23 rotas válidas + artigos publicados

## Pergunta opcional (não bloqueia)

Se você tiver uma planilha de URLs antigas com equivalente novo claro (ex.: `/2023/03/acidente-de-trabalho/` → `/acidente-de-trabalho`), me envie depois e eu adiciono 301s pontuais. Sem essa lista, mantemos 410, que é o comportamento correto recomendado pelo Google para conteúdo removido.