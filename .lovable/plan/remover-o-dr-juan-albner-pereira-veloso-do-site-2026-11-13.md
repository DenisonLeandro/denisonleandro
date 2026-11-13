# Remover o Dr. Juan Albner Pereira Veloso do site

## O que muda para o visitante
- Ele deixa de aparecer na equipe da página inicial, em /profissionais, na lista de autores e nos textos lidos por robôs de IA (llms.txt).
- A página dele (/equipe/juan-albner-pereira-veloso) sai do ar e passa a redirecionar de forma permanente (301) para /profissionais. Assim, links antigos e o Google não caem numa página de erro.
- Ele sai do mapa do site enviado ao Google.
- Nenhum artigo é assinado por ele, então nenhum artigo muda.

## Detalhes técnicos
- Remover entradas em `Team.tsx`, `profissionais.tsx`, `authors.ts`, `site-content.ts`, `sitemap[.]xml.ts`.
- Apagar `src/routes/equipe.juan-albner-pereira-veloso.tsx`.
- `redirects.ts`: tirar o slug de `TEAM_SLUGS` e adicionar 301 `/equipe/juan-albner-pereira-veloso` (e alias antigo do WordPress, se a regra de equipe cobrir) → `/profissionais`; teste vitest para isso.
- Conferir que não sobra nenhuma menção a "Juan" no site.
