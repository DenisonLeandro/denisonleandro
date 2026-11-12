# Site fácil de ler para IAs (ChatGPT, Claude, Perplexity, Gemini)

Nada muda no visual do site.

## 1. Página /llms.txt (automática)
- Gerada na hora pelo servidor, em texto puro (text/plain; charset=utf-8).
- Cabeçalho com nome, resumo do escritório e do Dr. Denison (OAB/PR 28.764, FGV), bloco de Contato exatamente como enviado.
- Áreas de atuação: uma linha por área (nome, link completo, frase curta tirada do texto de cada página).
- Advogados: uma linha por advogado (nome, link, cargo, OAB, especialidade).
- Artigos: os 30 publicados mais recentes, do mais novo para o mais antigo, com título, link e resumo. Artigos novos entram sozinhos.
- Páginas institucionais: Escritório, Contato, Todos os artigos.
- Todos os links com endereço completo (https://denisonleandro.adv.br/...).

## 2. Página /llms-full.txt
- Mesmo cabeçalho, e depois o texto completo (sem HTML) de cada área e dos 20 artigos mais recentes, separados por "---", com título e link de cada um.

## 3. robots.txt
- Remove todas as regras antigas do WordPress (as páginas antigas continuam respondendo "removida" — isso não muda).
- Mantém User-agent: *, Allow: /, Disallow: /admin e /auth.
- Blocos "Allow: /" para GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot e Googlebot (cada um também com Disallow /admin e /auth).
- Linha final com o Sitemap.

## 4. Sitemap e cabeçalho das páginas
- Conferir que o sitemap traz home, institucionais, áreas, equipe e todos os artigos; o lastmod continua só nos artigos (data real da última edição) — páginas fixas ficam sem data, para não informar data falsa.
- Adicionar em todas as páginas o aviso `<link rel="alternate" type="text/plain" href="/llms.txt">`.

## Validação
- Testar /llms.txt, /llms-full.txt e /robots.txt (status 200, texto puro, links completos) e mostrar a você o conteúdo final do /llms.txt.

## Detalhes técnicos
- Novo módulo `src/lib/site-content.ts` com os dados de áreas (título, intro, itens) e equipe (nome, cargo, OAB, especialidade); as rotas /areas/* e /equipe/* passam a importar dali (mesmo texto, sem mudança visual), para o llms.txt nunca ficar desatualizado.
- Rotas de servidor `src/routes/llms[.]txt.ts` e `src/routes/llms-full[.]txt.ts`, com cliente público (chave publicável) e cache de 1h; HTML dos artigos convertido para texto simples.
- Link alternate em `__root.tsx`; `public/robots.txt` reescrito.
