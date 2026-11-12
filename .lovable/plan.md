## Objetivo
Deixar cada artigo em /noticias/{endereço} no formato que Google e IAs mais citam, sem mudar cores, fontes e espaçamentos. Tudo sai pronto no HTML do servidor.

## 1. Novos campos dos artigos (editáveis no painel)
- **Resumo** (até 500 caracteres)
- **Perguntas frequentes**: lista de pergunta/resposta, com botões "Adicionar" e "Remover"
- **Autor**: lista de seleção com os 7 advogados (padrão: Dr. Denison Leandro)
- **Área**: lista de seleção (Trabalhista, Previdenciário, Consumidor, Família, Contratos, Bancário, Mediação)
- Nos artigos existentes: a área é preenchida automaticamente pela categoria, quando ela indicar uma área. Resumo e perguntas ficam **vazios**, para o advogado escrever.

## 2. Topo do artigo (abaixo do título)
- Linha do autor: foto pequena, "Por Dr. Nome — OAB/PR número" com link para o perfil, data de publicação e "Atualizado em…" (só quando a data for diferente).
- Caixa "Resumo" com fundo suave e borda lateral dourada, só quando houver resumo.

## 3. Corpo
- Subtítulos viram títulos de verdade (H2/H3). Um parágrafo em negrito só vira subtítulo quando atender às três regras:
  - o parágrafo inteiro está em negrito;
  - tem até 90 caracteres;
  - não é um rótulo com dois-pontos seguido de texto comum (ex.: "**Prazo:** 12 meses").
- A troca acontece só na hora de mostrar a página. O texto salvo não muda.
- Com 3 ou mais subtítulos, aparece antes do texto um índice "Neste artigo" com links para cada parte.

## 4. Fim do artigo (nesta ordem)
1. "Perguntas frequentes": todas as respostas abertas, sem precisar clicar.
2. Caixa do autor: foto, nome, OAB, a frase de especialidade do site e "Ver perfil".
3. Caixa de contato: "Tem dúvidas sobre [área] em Londrina? Fale com um advogado", com link para a página da área e botão de WhatsApp (43) 99994-8455. Sem promessa de resultado.
4. Botões de compartilhar (os mesmos de hoje).
5. "Artigos relacionados": 3 artigos da mesma área ou categoria. Se faltar, completa com os mais recentes.

O CTA do topo, o do meio e o final, além do bloco de imprensa, continuam como estão.

## 5. Informações para o Google
- Na ficha do artigo para o Google: o autor aponta para o perfil dele, a descrição usa o resumo (ou a descrição de busca, se não houver resumo) e a data de atualização é a da última edição real.
- Imagem com largura e altura, logo do escritório com tamanho, ficha de perguntas frequentes (FAQPage) quando houver perguntas, e a página marcada como principal (mainEntityOfPage). Nenhum dado será inventado.

## 6. Lista para IAs (/llms.txt)
- Usa o resumo como descrição de cada artigo, quando existir.

## Como vou conferir
- Um artigo sem resumo e sem perguntas: os blocos não aparecem e nada quebra.
- Vou preencher um artigo de teste pelo painel, tirar uma foto da página com todos os blocos e depois apagar os dados de teste.
- Vou listar quais avisos do Google foram corrigidos.
- Antes de concluir, vou enviar a lista dos subtítulos detectados em 3 artigos (metas, estabilidade e perdeu movimentos) para você conferir.

## Detalhes técnicos
- Migração: `summary text`, `faq jsonb default '[]'`, `author_slug text default 'denison-henrique-leandro'`, `area_slug text`, com UPDATE de `area_slug` a partir de `category` (mapeamento por palavra-chave). As políticas de acesso atuais continuam valendo.
- Novo `src/lib/authors.ts`, com o mapa slug → nome, OAB, foto e especialidade, reaproveitando os dados das rotas de equipe. Também `src/lib/areas` com o mapa slug → nome.
- `articles.functions.ts`: seleciona os campos novos e ganha `listRelatedArticles(slug, area, category)`.
- Renderização: uma função pura transforma o HTML do conteúdo, convertendo `<p><strong>curto</strong></p>` em `<h2>`, gerando ids (slugify) e devolvendo o índice. Ela tem teste vitest.
- `noticias.$slug.tsx`: novos blocos e JSON-LD BlogPosting/FAQPage. O admin ganha os campos novos. `llms.server.ts` passa a usar o resumo.
