## Problema

Ao salvar um artigo, o painel mostra o erro cru do banco:

```text
duplicate key value violates unique constraint "articles_slug_key"
```

Isso acontece porque a coluna `slug` da tabela `articles` é única e o slug gerado a partir do título já existe em outro artigo (inclusive rascunhos ou artigos não publicados, que não aparecem em /noticias).

## Solução proposta

Alterar apenas `src/routes/_authenticated/admin.artigos.tsx` (nenhuma mudança de banco, RLS, migração ou visual do site público):

1. **Sufixo automático no slug**: antes de inserir/atualizar, consultar se o slug já existe em outro artigo. Se existir, gerar `meu-artigo-2`, `meu-artigo-3`, etc., até encontrar um livre.
2. **Aviso no formulário**: quando o slug for ajustado automaticamente, mostrar uma mensagem discreta informando o slug final usado (ex.: "O endereço já estava em uso; o artigo foi salvo como `/noticias/meu-artigo-2`").
3. **Mensagem de erro amigável**: se ainda assim o banco retornar violação de unicidade, exibir "Já existe um artigo com este endereço (slug). Altere o campo Slug e tente novamente." em vez do texto técnico.

## Preservado

Banco, migrações, RLS, storage/upload de capa, `/noticias`, `/noticias/{slug}`, `/acidente-de-trabalho`, CTAs, WhatsApp, tracking, Navbar, Footer, home, `/auth`.

## Validação

- Criar dois artigos com o mesmo título → o segundo salva com slug sufixado, sem erro.
- Editar um artigo existente sem mudar o slug → salva normalmente (não gera sufixo contra si mesmo).
- Typecheck sem erro.
