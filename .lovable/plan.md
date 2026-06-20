## Plano: Adicionar card de artigo fixo em /noticias

### Objetivo
Inserir um card de destaque na página `/noticias` apontando para o artigo fixo `/acidente-de-trabalho`, sem criar nova aba no menu nem nova rota.

### Alteração única
- **Arquivo:** `src/routes/noticias.tsx`

### O que será feito
1. Adicionar um card estático de "Artigo em destaque" logo acima da lista dinâmica de notícias do Supabase.
2. O card seguirá o mesmo padrão visual dos cards existentes (bordas arredondadas, sombra, hover, tipografia).
3. Conteúdo do card:
   - **Título:** Acidente de trabalho: quais são os direitos do trabalhador?
   - **Resumo:** Entenda os principais direitos de quem sofreu acidente de trabalho, quando procurar orientação e quais documentos podem ajudar na análise do caso.
   - **Categoria:** Direito do Trabalho
   - **Botão:** Ler artigo → link para `/acidente-de-trabalho`
4. O card ficará visível mesmo que a lista do Supabase esteja vazia.

### O que NÃO será alterado
- Navbar / menu superior (a aba "Notícias" permanece única)
- Página `/acidente-de-trabalho`
- Rota `/noticias/:slug`
- Busca/listagem dinâmica do Supabase
- Home, Footer, layout global, Google Ads, tracking, edge functions

### Resultado esperado
O visitante clica em "Notícias" no menu e vê, no topo, o card destacado do artigo sobre acidente de trabalho, com link claro para a página do artigo.

---

### Relatório pós-implementação
Após aprovação, serão entregues:
- Arquivo alterado e local exato da inserção
- Confirmação de que nenhuma nova aba/nova rota foi criada
- Confirmação de que o link aponta para `/acidente-de-trabalho`
- Confirmação de que `/acidente-de-trabalho` não foi alterado
- Confirmação de que a listagem dinâmica de notícias não foi quebrada
- Instrução para testar no preview antes de publicar
