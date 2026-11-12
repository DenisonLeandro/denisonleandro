# Ajustes no artigo "Vendedor externo tem direito a horas extras?"

O visual da página não muda. Só entram o texto novo e uma caixa de destaque no mesmo estilo das caixas que o artigo já tem.

## 1. Caixa de destaque com link para a página do vendedor externo
- Logo depois da seção "Como comprovar as horas extras do vendedor externo?", entra a caixa: "Você é ou foi vendedor externo? Veja como funciona a análise do seu caso", com um botão que abre https://vendedorexterno.denisonleandro.adv.br.
- O texto do artigo é guardado como texto simples, sem formatação, e esse formato não comporta um botão. Por isso, a caixa vai ficar no código da página e só aparece neste artigo, logo abaixo dessa seção. Assim, é fácil usar a mesma caixa em outros artigos depois.

## 2. Intervalo de almoço
- O parágrafo "Atenção: a regra do Tema 73 do TST..." entra no fim da seção "O vendedor externo tem direito ao intervalo para almoço?", com o texto exato que você mandou.

## 3. Seção "Caso do escritório repercutiu na imprensa": fica esperando aprovação
- Como você pediu para só publicar depois da aprovação do Dr. Denison, eu **não coloco essa seção no ar agora**. O artigo já está publicado, então qualquer texto que entrar nele aparece na hora.
- No fim, te mando o texto final para enviar a ele. Quando ele aprovar, é só me avisar que eu coloco a seção antes da "Conclusão", com os links de Valor, Folha, G1 e ConJur que já estão na parte "na mídia" da página.

## 4. Perguntas frequentes
- As 3 perguntas atuais saem e entram as 6 novas, com o texto exato que você mandou. O código que o Google usa para mostrar as perguntas (FAQPage) é atualizado junto.

## 5. Data
- "Atualizado em" passa a ser hoje. A data de publicação continua a mesma.

## 6. Redirecionamentos
- Os 10 endereços antigos da sua lista deixam de ir para a página vendedorexterno e passam a ir para este artigo: continuam com status 301 (mudança permanente) e chegam em um passo só.
- O teste automático dos redirecionamentos é atualizado para conferir o novo destino.

## 7. Artigo "5 sinais de que a empresa está devendo horas extras"
- Esse artigo ainda não tem a seção sobre vendedor externo. Ela entra antes da "Conclusão", com este texto:
  - **E quem trabalha na rua, como vendedor externo?**
  - "Muita gente acha que quem trabalha externamente não tem direito a horas extras. Não é bem assim: se a empresa conseguia acompanhar sua rotina, por roteiro, GPS, aplicativo, metas diárias ou reuniões obrigatórias, as horas extras podem ser devidas. Expliquei os detalhes neste artigo: Vendedor externo tem direito a horas extras?"
- O link vai para o novo artigo, não para a página vendedorexterno. O link fica no código da página, do mesmo jeito que a caixa do item 1, porque o texto simples não guarda links.

## Conferência
- Teste dos 10 endereços antigos no site de testes, com e sem barra no final, mostrando o status e o destino de cada um. No site oficial, e com www, eu testo depois que você publicar.
- Confirmar no código que vem do servidor: as 6 perguntas no FAQPage, a caixa de destaque, o parágrafo do almoço, a data nova e o link no artigo dos 5 sinais.

## Detalhes técnicos
- Edições de texto via migration de dados: desligar e religar o gatilho `update_articles_updated_at` e definir `updated_at = now()` só nos dois artigos alterados.
- Novo mapa (slug → { depois do id do H2, componente }) usado em `noticias.$slug.tsx` para dividir o HTML depois desse H2 e inserir a caixa ou o link. A lógica de divisão fica em `article-content.ts`, com teste.
- Em `redirects.ts`, os 10 caminhos passam a usar uma constante `VENDEDOR_ARTIGO`. `redirects.test.ts` é atualizado.
