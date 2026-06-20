**Problema identificado:** Em `src/routes/noticias.tsx`, os cards de artigo dinâmico usam `onClick={() => navigate({ to: \`/noticias/${a.slug}\` })}`, o que não é válido no TanStack Router (a rota dinâmica exige `to: "/noticias/$slug"` com `params: { slug: a.slug }`). Além disso, o texto/botão "Leia mais" está apenas como `<div>`, sem ação própria.

**Alteração única:**
- No `src/routes/noticias.tsx`, substituir a tag `<article>` (com `onClick` e `cursor-pointer`) por `<Link>` do TanStack Router.
  - `to="/noticias/$slug"`
  - `params={{ slug: a.slug }}`
  - manter todas as classes Tailwind e estrutura interna (imagem, categoria, título, data, "Leia mais")
  - remover `onClick` e `cursor-pointer` (agora é link nativo)

**Preservado:** `noticias.$slug.tsx`, banco, painel, auth, CTAs, layout, Navbar, Footer, home, etc. — nenhuma outra mudança.

**Validação:**
1. `bunx tsc --noEmit` deve passar.
2. Preview: listagem `/noticias` continua exibindo artigos.
3. Preview: clicar em "Leia mais" (ou em qualquer parte do card) abre `/noticias/artigo-de-teste-do-painel`.