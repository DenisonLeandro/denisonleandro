# Painel funcional de artigos

## Objetivo

Substituir o placeholder de `src/routes/_authenticated/admin.artigos.tsx` por um painel funcional para gerenciar artigos da tabela `articles` no Lovable Cloud.

## Arquivo alterado

- `src/routes/_authenticated/admin.artigos.tsx` (único arquivo)

Sem componentes auxiliares novos (manter simples e em um arquivo).

## Funcionalidades

1. **Listar artigos** existentes (todos: rascunhos + publicados), ordenados por `updated_at` desc.
2. **Botão "Novo artigo"** abre formulário vazio.
3. **Editar artigo** ao clicar em "Editar" da linha.
4. **Excluir** com confirmação (`window.confirm`).
5. **Salvar rascunho** (`status = 'draft'`).
6. **Publicar** (`status = 'published'`; se `published_at` estiver vazio, preenche com `new Date().toISOString()`).
7. **Cancelar** volta para a lista sem salvar.

## Layout

```text
┌─ Painel administrativo ─────────────── Sair ┐
├─────────────────────────────────────────────┤
│ Painel de artigos          [+ Novo artigo]  │
│                                             │
│ Tabela:                                     │
│ Título | Categoria | Status | Publicado em  │
│        |           |        |  | Editar/Excluir │
└─────────────────────────────────────────────┘
```

Quando em modo formulário (criar/editar), a tabela é substituída por um formulário com os campos abaixo, e três botões no rodapé: **Salvar rascunho** | **Publicar** | **Cancelar**.

## Campos do formulário

- `title` (input)
- `slug` (input — auto-gerado a partir do título enquanto o usuário não edita manualmente; sempre normalizado para minúsculo, sem espaços/acentos, separado por hífen)
- `category` (input)
- `author` (input)
- `cover_image_url` (input URL)
- `excerpt` (textarea curto)
- `content` (textarea grande — sem rich text)
- `seo_title` (input)
- `seo_description` (textarea curto)
- `status` exposto via os botões "Salvar rascunho" / "Publicar"

## Regras de slug

Helper `slugify(text)`:
- minúsculo
- remove acentos (`normalize("NFD").replace(/\p{Diacritic}/gu, "")`)
- substitui não alfanumérico por hífen
- colapsa hífens consecutivos e remove das pontas

Slug é regenerado automaticamente do título enquanto o usuário não tocar manualmente no campo slug. Após edição manual, deixa de auto-atualizar para aquela sessão de edição. No salvar, o slug é normalizado pelo `slugify` independentemente.

## Regras de status / published_at

- **Salvar rascunho**: `status = 'draft'`. `published_at` é mantido como está (não sobrescreve nem limpa — solução mais simples e não destrutiva).
- **Publicar**: `status = 'published'`. Se `published_at` for `null`, preenche com `new Date().toISOString()`. Se já tiver valor, mantém.

## Persistência (Supabase)

- Cliente: `@/integrations/supabase/client`, com cast pontual `(supabase as any).from("articles")` para evitar erro de tipos (mesmo padrão de `/noticias`).
- **Listar**: `select("*").order("updated_at", { ascending: false })`.
- **Criar**: `insert({...}).select().single()`.
- **Atualizar**: `update({...}).eq("id", id)`.
- **Excluir**: `delete().eq("id", id)`.
- Após cada mutação bem-sucedida: recarrega a lista e volta para o modo lista.
- Erros: exibe mensagem inline (vermelho) no formulário/topo da tabela; loga em `console.error`.

## Estado do componente

- `mode: "list" | "edit"`
- `articles: Article[]`
- `loading: boolean`
- `saving: boolean`
- `error: string | null`
- `editing: Article | null` (null = novo artigo)
- `slugTouched: boolean` (controla auto-slug)
- Campos do formulário em um único objeto `form`.

Tipo `Article` declarado localmente (mesma forma que `/noticias`).

## Segurança

- Rota já protegida pelo gate `_authenticated/route.tsx` + RLS (`editor`/`admin`). Sem mudanças aqui.
- Nenhuma operação concede role.
- Nenhuma mudança em banco, migrations, RLS, `/noticias`, `/noticias/$slug`, `/acidente-de-trabalho`, CTAs, WhatsApp, Google Ads, tracking, edge functions, Navbar, Footer, home, `/auth` ou `_authenticated/route.tsx`.

## Estilo

Tailwind + tokens do projeto (`navy`, `gold`, `border`, `background`, `card`). Header igual ao placeholder atual (botão "Sair"). Inputs/labels simples; tabela com `divide-y` e hover sutil.

## Validação

- `bunx tsc --noEmit` deve passar.
- Testes manuais: criar artigo como rascunho, publicar, editar, excluir, e ver artigo publicado aparecendo em `/noticias`.

## Como testar

1. Logado como `dhl@sercomtel.com.br`, abrir `/admin/artigos`.
2. Clicar **Novo artigo**, preencher título ("Teste"), conferir slug auto ("teste"), preencher conteúdo, clicar **Salvar rascunho** → aparece na lista como `draft`, sem data de publicação.
3. Clicar **Editar** na linha, alterar algo, clicar **Publicar** → status vira `published`, `published_at` preenchido.
4. Abrir `/noticias` em outra aba → artigo aparece na grade.
5. Voltar a `/admin/artigos`, clicar **Excluir**, confirmar → artigo some da lista e de `/noticias`.
