## Diagnóstico

Na página `/noticias`, enquanto a busca de notícias no Supabase não termina (ou se demora/falha), é renderizado APENAS o spinner "Carregando artigos...". O card de destaque foi colocado somente no bloco principal (após o loading), então nunca aparece se a query ficar pendente ou falhar silenciosamente.

Screenshot confirma: a página mostra apenas o spinner, sem o card.

## Correção proposta

**Arquivo único alterado:** `src/routes/noticias.tsx`

1. Renderizar o `<FeaturedArticleCard />` SEMPRE, independentemente do estado de loading do Supabase.
2. Manter o spinner "Carregando artigos..." apenas para a área da listagem dinâmica (abaixo do card), não para a página inteira.
3. Unificar o retorno do componente: remover o `return` antecipado do loading. A página passa a sempre renderizar:
   - PageHeader
   - Card de destaque (acidente de trabalho)
   - Abaixo: spinner enquanto carrega, depois lista de notícias, ou mensagem "Nenhuma notícia publicada ainda"

## O que NÃO muda

- Navbar, menu, Footer, layout
- Página `/acidente-de-trabalho`
- Query do Supabase (mesma chamada, mesmo comportamento)
- Rota `/noticias/$slug`
- Nenhuma nova rota, nenhuma nova aba
- Tracking, Google Ads, edge functions

## Resultado

O visitante entra em `/noticias` e vê imediatamente o card "Artigo em destaque → Acidente de trabalho", mesmo enquanto as notícias do Supabase carregam.
