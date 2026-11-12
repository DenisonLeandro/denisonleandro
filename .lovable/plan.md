# Capas dos artigos sem corte

## O que muda para o visitante
- Em todos os lugares onde a capa aparece (artigos na página inicial, lista de /noticias, artigo em destaque, "Artigos relacionados", topo do artigo), a arte aparece **inteira**, sem cortar texto, centralizada.
- Os cards continuam todos do mesmo tamanho. O espaço que sobrar é preenchido com a própria capa desfocada e escurecida (sem faixas brancas).
- No topo do artigo, a capa aparece inteira, sem ser esticada além do tamanho original.
- Ao compartilhar um artigo no WhatsApp, LinkedIn ou Facebook, a prévia mostra a capa inteira no formato 1200x630, sobre o mesmo fundo desfocado.
- Os arquivos originais das capas não são alterados.

## Etapas
1. **Prints "antes"** da página inicial, de /noticias e dos 3 artigos (vendedor externo, estabilidade, perdeu movimentos), em tamanho de computador e de celular.
2. **Um único bloco de capa** usado em todos os lugares: a imagem desfocada e escurecida no fundo e a imagem inteira por cima. Os cards mantêm a proporção atual (16:10).
3. **Topo do artigo:** capa inteira, largura máxima limitada ao tamanho original da imagem, com o mesmo fundo desfocado nas laterais quando sobrar espaço.
4. **Imagem de compartilhamento:**
   - Novo campo no artigo para guardar a versão 1200x630, salva ao lado da original (a original não muda).
   - No painel, quando uma capa for enviada ou trocada, a versão 1200x630 é gerada automaticamente no navegador e salva junto.
   - Para os artigos que já existem, gero as versões 1200x630 de uma vez só e salvo nos artigos, **sem mudar a data "Atualizado em"** (essa data só muda quando título, texto, resumo ou FAQ são editados).
   - A página do artigo passa a usar essa versão no og:image e no twitter:image, com largura 1200 e altura 630. Se faltar a versão, usa a imagem padrão do site.
5. **Prints "depois"** nos mesmos lugares, e conferência do HTML dos 3 artigos (og:image com 1200x630).

## Detalhes técnicos
- Componente `ArticleCover` (camada de fundo `object-cover` + blur forte + overlay escuro do tema; imagem `object-contain` centralizada). Vai substituir as `<img>` em `NoticiasPreview.tsx`, `noticias.index.tsx` (card de destaque e grade) e `noticias.$slug.tsx` (topo e relacionados). O formulário do painel passa a mostrar a prévia com `object-contain`.
- Migration: `og_image_url text` (pode ficar vazio) em `articles`. O gatilho de data só olha título/conteúdo/resumo/FAQ, então o preenchimento não muda o `updated_at`. Mesmo assim, o preenchimento é feito com o gatilho desligado, seguindo a regra do projeto.
- Preenchimento: script em Python/PIL no ambiente de trabalho (baixa a capa, cria o fundo com blur + escurecimento, centraliza a capa sem ampliar além do original, gera JPG com cerca de 85% de qualidade), faz upload em `article-covers/og/<slug>-1200x630.jpg` e grava a URL.
- No painel: geração via canvas ao enviar a capa, com o mesmo algoritmo, e upload no mesmo bucket.
- `head()` em `noticias.$slug.tsx`: usa `og_image_url`, com fallback para `DEFAULT_OG_IMAGE`, e envia `og:image:width=1200` e `og:image:height=630`. O JSON-LD continua usando a capa original.
- Para entrar no site oficial, é preciso publicar.
