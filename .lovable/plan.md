# Redirecionamentos e artigos não publicados: diagnóstico

## Resultado dos testes no site oficial (denisonleandro.adv.br)

| Endereço antigo | Status | Leva para |
|---|---|---|
| /noticias/fim-da-escala-6x1-o-que-pode-mudar-para-quem-trabalha-aos-domingos | 301 | /noticias/fim-da-escala-6x1-congresso-aprova-mudanca-na-jornada-de-trabalho-veja-o-que-muda |
| /noticias/acidente-de-trabalho-estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir | 301 | /noticias/estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir |
| /noticias/endereco-que-nao-existe (teste) | 404 | Página "Artigo não encontrado", com aviso para o Google não indexar |

## Respostas

1. **Os dois endereços estão na lista de redirecionamentos.** A lista é aplicada no servidor antes de qualquer página, inclusive da página do artigo.
2. **A regra geral já funciona.** Um artigo que não está publicado (rascunho) ou não existe fica invisível para o público e responde 404 "Artigo não encontrado". O texto "Carregando artigo..." não existe mais no site: ele era da versão antiga, de antes da mudança que faz o servidor entregar o artigo pronto.
3. **Provável causa do que você viu:** seu navegador abriu uma cópia guardada da versão antiga, ou o teste foi feito antes da última publicação. Para conferir, abra o endereço numa janela anônima ou force a atualização (Ctrl+Shift+R).

## Proposta

Nenhuma mudança é necessária. Se mesmo na janela anônima ainda aparecer "Carregando artigo...", me mande o endereço exato e o horário do teste, que eu investigo.

## Verificação do Google Search Console

- Criar o arquivo público /google9f6aaca8a92e26ca.html, com exatamente o conteúdo `google-site-verification: google9f6aaca8a92e26ca.html`. Ele vai responder com status 200 e como página comum (text/html).
- Gravar uma regra para que esse arquivo nunca seja removido.
- Depois de publicar, conferir se ele abre em https://denisonleandro.adv.br/google9f6aaca8a92e26ca.html.
