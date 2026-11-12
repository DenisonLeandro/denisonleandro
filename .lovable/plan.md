# Preencher Resumo e Perguntas frequentes em 3 artigos

## O que muda
Nos 3 artigos publicados abaixo, gravar no banco **exatamente** os textos enviados (sem reescrever):
1. Metas impossíveis no trabalho — resumo + 5 perguntas
2. Estabilidade após acidente de trabalho — resumo + 5 perguntas
3. Perdeu movimentos após acidente de trabalho — resumo + 5 perguntas

## Conferências já feitas
Os três já estão publicados, com autor Dr. Denison Henrique Leandro e área Trabalhista — nada a mudar nesses campos.

## Data de atualização
"Atualizado em" (dateModified) dos três passa para hoje. Data de publicação não muda.

## Verificação depois de salvar
Para cada artigo, abrir o endereço no servidor e confirmar:
- caixa "Resumo" no topo;
- "Perguntas frequentes" no fim, com as 5 perguntas;
- bloco FAQPage presente no HTML entregue pelo servidor.
Envio o resultado de cada um.

## Detalhes técnicos
- UPDATE em `articles` (summary, faq jsonb como `[{question, answer}]`, updated_at = now()) para os 3 slugs, via ferramenta de dados.
- Sem mudança de código.
