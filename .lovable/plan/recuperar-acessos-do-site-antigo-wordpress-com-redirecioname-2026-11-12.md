# Recuperar acessos do site antigo (WordPress) com redirecionamentos 301

## O que já conferi
- Os 7 artigos de destino da seção 4 existem e estão publicados.
- Todas as páginas de destino (áreas, equipe, Leonardo em /equipe/leonardo-nascimento-de-aguiar) existem.
- http:// já leva para https://denisonleandro.adv.br com 301.
- www hoje leva para o endereço sem www com **302 (temporário)**, feito pela hospedagem antes do site rodar.
- /favicon.ico já responde 200.

## O que vou fazer
1. **Tabela de redirecionamentos ampliada** com todas as regras do seu arquivo (institucionais, equipe, vendedor externo, artigos e áreas), cada uma levando direto ao destino final, sem passar por outro redirecionamento.
2. **Regras automáticas:**
   - Barra final ignorada em tudo (/contato/ → /contato).
   - /AAAA e /AAAA/MM (arquivos por data) → /noticias.
   - /equipe/{nome} e /team/{nome}: tira "dr-"/"dra-"; se a pessoa existe no site, vai para o perfil; senão → /profissionais (inclui /team sozinho).
3. **Prioridade:** as regras específicas valem antes dos 410 genéricos de /tag, /category e /author. Tags e categorias sem regra continuam 410.
4. **Spam (410):** os 8 endereços de cassino listados, /1638-2, /434124781733381732-2 e qualquer endereço de números terminado em "-2". Mantidos os 410 de /wp-*, /xmlrpc.php e /feed.
5. **Testes automáticos** para cada tipo de regra.
6. **Validação** após publicar: tabela endereço → status → destino final, com e sem www e barra final, e conferência de que home, áreas, equipe, notícias, contato, llms.txt, sitemap.xml e o arquivo do Google continuam abrindo normalmente.

## Sobre o www (depende de você)
O redirecionamento do www é feito pela hospedagem e usa 302, e com ele um endereço antigo com www dá dois saltos (www → sem www → destino). Para resolver: em **Configurações do projeto → Domínios**, confira se denisonleandro.adv.br está marcado como **Principal**. Vou testar depois se o site consegue responder antes da hospedagem; se não conseguir, aviso o resultado exato.

## Detalhes técnicos
- `src/lib/redirects.ts`: `findRedirect` passa a devolver `{status: 301|410, to?}`, com mapa exato + regras por padrão (datas, equipe, spam numérico); destinos externos absolutos (vendedorexterno).
- Middleware em `src/start.ts` responde 410 via `goneResponse()` e trata host www com 301 direto ao destino final.
- Testes em `src/lib/redirects.test.ts`.
