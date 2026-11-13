# Reorganizar áreas de atuação + nova área "Direito da Saúde"

Artigos, notícias e redirecionamentos existentes não mudam (só entra um redirecionamento novo para Mediação).

## 1. Retirar "Mediação"
- Sai da página inicial (cards e texto do topo), de /areas-de-atuacao, do rodapé, da descrição do escritório para o Google, do sitemap, do /llms.txt e do /llms-full.txt.
- /areas/mediacao passa a redirecionar (301) para /areas-de-atuacao.
- O perfil da Dra. Renata continua citando a pós-graduação dela em Mediação, porque é formação dela e não uma área do site.
- Mediação sai da lista de áreas do painel de artigos. Artigos que já estão marcados com ela continuam funcionando.

## 2. Nova página /areas/saude
- Montada no servidor, com o mesmo visual das outras áreas. Nome "Direito da Saúde" e título principal "Direito da Saúde e Direito Médico em Londrina".
- Na ordem: trilha de navegação (Início › Áreas de Atuação › Direito da Saúde), topo com subtítulo e botão de WhatsApp, caixa "Em resumo", "Como podemos ajudar" (cards dos temas publicados, na ordem escolhida), perguntas frequentes, caixa do autor (Dr. Denison, OAB/PR 28.764, pós-graduado em Direito e Saúde, com a foto do perfil), faixa final de WhatsApp e "Outras áreas de atuação" com cards todos do mesmo tamanho.
- Mensagem do WhatsApp: "Olá, gostaria de falar sobre uma questão de plano de saúde / direito médico".
- Dados para o Google: Service (do escritório, atendendo Londrina e Paraná), FAQPage e BreadcrumbList.
- **Textos provisórios:** como os textos do subtítulo, do "Em resumo" e das perguntas frequentes desta página não vieram, vou escrever versões provisórias para o senhor revisar.

## 3. Páginas de tema (/areas/{area}/{tema}), servindo para todas as áreas
- Novo cadastro no banco com: área, título, endereço (slug), título para o Google, descrição, resumo, texto (aceita ##, ### e [texto](/url), como nos artigos), perguntas frequentes, ordem e publicado (sim/não).
- A data "Atualizado em" segue a mesma regra dos artigos: só muda quando título, texto, resumo ou perguntas são editados.
- Página do tema: trilha de navegação, título, resumo em destaque, texto, perguntas, caixa do autor, WhatsApp, links para os outros temas da área e link de volta para a área. Dados para o Google: Article, FAQPage e BreadcrumbList.
- Tema não publicado ou inexistente responde com "página não encontrada" (404 real).
- No /admin entra a seção "Temas das áreas" para criar, editar e excluir temas, só para quem já tem acesso de editor.
- Já ficam criados como **não publicados**: plano-de-saude-negou-cobertura, plano-de-saude-autismo-terapias e medicamento-alto-custo-fora-do-rol-ans (o texto entra depois, quando o senhor enviar).

## 4. Cards de áreas com o mesmo tamanho
- Na página inicial e em /areas-de-atuacao, todos os cards terão a mesma largura, a mesma altura e a mesma estrutura: título, frase curta, os 2 primeiros temas publicados (ou só a frase, se a área ainda não tiver temas) e "Saiba mais".
- Nenhum card em destaque. Se a última linha ficar incompleta, os cards dessa linha ficam centralizados, sem esticar.
- Ordem: Trabalhista, Previdenciário, Direito da Saúde, Consumidor, Bancário/Financeiro, Família, Contratos.
- Frase da Saúde: "Planos de saúde, medicamentos, SUS e erro médico."

## 5. Rodapé e o que o Google e as IAs leem
- No rodapé, cada área leva para a página dela.
- "25 anos" vira "desde 2000" em todo o site (rodapé, página do escritório).
- "Direito da Saúde", "Plano de Saúde" e "Direito Médico" entram nos assuntos do escritório e do Dr. Denison.
- /areas/saude e os temas publicados entram no sitemap, no /llms.txt e no /llms-full.txt.
- No painel de artigos entra a área "Saúde".

## Detalhes técnicos
- Tabela `area_topics` (com unique em area_slug+slug, GRANT, RLS: leitura pública só de publicados; escrita só para editor/admin via has_role), gatilho de updated_at só para title/content/summary/faq, e os 3 temas inseridos como rascunho.
- Área "saude" entra em `site-content.ts` e em `authors.ts` (AREAS); a área Mediação sai de lá.
- Funções de servidor públicas (`area-topics.functions.ts`) usadas pelos loaders da área, do tema e dos cards. Rota nova `areas.saude.tsx` com um layout próprio, para não mudar as outras páginas, e `areas.$area.$tema.tsx` com o modelo genérico.
- Remover `areas.mediacao.tsx` e adicionar `/areas/mediacao` em `PERMANENT_REDIRECTS`, com teste.
- O sitemap e o llms.server passam a buscar os temas publicados.
- No fim, envio a lista de arquivos alterados e de endereços criados.
