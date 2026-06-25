## Revisão de SEO técnico

Domínio canônico: **https://denisonleandro.adv.br** (sem www, https).

### 1. `src/routes/__root.tsx` — limpar defaults herdados
- Remover `name: "author" = "Lovable"` e `twitter:site = "@Lovable"`.
- Trocar `og:image` (hoje aponta para screenshot `r2.dev` do preview Lovable) por imagem própria hospedada no domínio (ex.: `/og-default.jpg`) — manter como fallback apenas no root.
- Ajustar título/descrição padrão do root para textos institucionais novos (sem qualquer tagline antiga do WordPress).
- Adicionar `og:site_name` e `og:locale = pt_BR`.
- **Não** colocar `canonical` nem `og:image` específicos no root (cada rota define o seu).

### 2. Metadata por rota
Para cada rota pública abaixo, garantir `title` único (~55 chars), `description` única (~150 chars), `og:title`, `og:description`, `og:url` (self-referencing absoluto) e `<link rel="canonical">` apontando ao próprio URL no domínio oficial:

- `/` (index)
- `/areas-de-atuacao` + 7 sub-rotas `areas.*`
- `/escritorio`
- `/profissionais` + 9 rotas `equipe.*`
- `/contato`
- `/noticias` (index)
- `/noticias/$slug` (dinâmico — derivar de `loaderData`; já existe `acidente-de-trabalho` como referência)
- `/acidente-de-trabalho` (já ok, só revisar URL canonical)

Adicionar `meta name="robots" = "noindex,nofollow"` em `/auth` e `/admin`.

### 3. H1 único por página
Auditar cada rota; onde houver mais de um `<h1>` (ou nenhum), ajustar para exatamente um H1 alinhado ao `title` SEO. Componentes `PageHeader`/hero geralmente já usam h1 — confirmar que seções internas usam h2/h3.

### 4. Canonical / domínio único
- Definir `SITE_URL = "https://denisonleandro.adv.br"` em `src/lib/seo.ts` (novo helper) e usar em todas as rotas.
- Não emitir canonical no `__root.tsx` (TanStack concatena `links` sem dedup).

### 5. `public/robots.txt` (criar)
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth

Sitemap: https://denisonleandro.adv.br/sitemap.xml
```

### 6. `src/routes/sitemap[.]xml.ts` (criar)
Server route gerando XML com todas as rotas públicas estáticas + entradas dinâmicas de `articles` publicados (`supabase.from("articles").select("slug, updated_at").eq("status","published")`). Excluir `/auth`, `/admin`, `/noticias/$slug` template. `Cache-Control: public, max-age=3600`.

### 7. Open Graph / Twitter
- Gerar imagem OG padrão (1200×630) com identidade do escritório → `src/assets/og-default.jpg` (premium image, com texto legível: nome + tagline).
- Usar em root como fallback; rotas com cover própria (notícias) usam a do artigo.
- `twitter:card = "summary_large_image"` no root.

### 8. Redirects de URLs antigas do WordPress
TanStack já devolve 404 nativo para qualquer URL não mapeada (o `NotFoundComponent` retorna status 404). Suficiente para sinalizar ao Google que o conteúdo antigo sumiu. **Não** adicionar redirects sem lista concreta de URLs antigas — caso o usuário forneça lista (`/?p=123`, `/wp-content/...`, `/categoria/...`), criar mapeamento em um server route `src/routes/api/public/legacy-redirect.ts` ou similar. Por padrão: deixar 404 limpo.

### 9. Estrutura do helper SEO
`src/lib/seo.ts`:
```ts
export const SITE_URL = "https://denisonleandro.adv.br";
export const SITE_NAME = "Denison Leandro Advogados Associados";
export function buildMeta({ title, description, path, image, type = "website" }) { ... }
```
Cada rota chama `buildMeta` para reduzir repetição.

### Não será alterado
Design visual, componentes, lógica, banco, edge functions, auth, admin, WhatsApp, tracking, Google Ads, navbar, footer, conteúdo das páginas (apenas `<title>`/`<meta>`/`<h1>` quando necessário).

### Checklist de entrega
A) `__root.tsx` limpo (sem refs Lovable, OG image própria).
B) Helper `src/lib/seo.ts` criado.
C) Metadata única em todas as rotas públicas + canonical + og:url.
D) `noindex` em `/auth` e `/admin`.
E) H1 único validado por página.
F) `public/robots.txt` criado.
G) `src/routes/sitemap[.]xml.ts` criado e listando rotas + notícias dinâmicas.
H) Imagem OG default gerada.
I) Build/typecheck ok.
J) Resumo final entregue ao usuário.

### Perguntas antes de implementar
1. Confirma **https://denisonleandro.adv.br** (sem www) como canônico?
2. Posso **gerar** uma imagem OG default (1200×630) com o nome do escritório + tagline, ou você tem uma imagem para usar?
3. Tem lista de URLs antigas do WordPress que devem redirecionar para páginas novas equivalentes? Se não, deixo 404 (recomendado pelo Google para conteúdo removido).