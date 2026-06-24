## Objetivo

Adicionar uma prévia de "Notícias" na home, logo abaixo de `PracticeAreas` (Área de atuação) e antes de `About`.

## Passos

1. Criar `src/components/site/NoticiasPreview.tsx`:
   - Busca client-side via `supabase.from("articles").select(...).eq("status","published").order("published_at",{ascending:false}).limit(3)`.
   - Header com eyebrow "Conteúdo jurídico", título "Notícias e artigos" e descrição curta.
   - Grid de até 3 cards (estilo equivalente ao de `/noticias`: cover, categoria, título, data, "Leia mais"), usando `<Link to="/noticias/$slug" params={{ slug }}>`.
   - Estados: loading (spinner) e vazio (componente não renderiza nada — `return null`) para não deixar bloco quebrado na home.
   - Botão "Ver todas as notícias" → `<Link to="/noticias">`.
   - Sem alterar listagem `/noticias`, artigo `/noticias/$slug`, `/acidente-de-trabalho`, banco, RLS, edge functions, admin, CTAs, etc.

2. Editar `src/routes/index.tsx`:
   - Importar `NoticiasPreview` e renderizar `<NoticiasPreview />` entre `<PracticeAreas />` e `<About />`.

## Validação

A) Home mostra bloco "Notícias e artigos" logo abaixo de Área de atuação; B) até 3 cards com link para `/noticias/$slug`; C) botão "Ver todas" leva a `/noticias`; D) se não houver artigos publicados, o bloco some sem quebrar layout; E) `/noticias`, `/noticias/{slug}` e `/acidente-de-trabalho` seguem funcionando; F) typecheck/build ok.

Não publicar automaticamente.
