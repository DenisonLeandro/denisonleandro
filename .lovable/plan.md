## Objetivo

Usar as 6 logos enviadas (Valor, Folha, G1, ConJur, Estado de Minas e O Tempo) dentro dos cards do bloco "Denison Leandro Advogados na mídia", junto com o nome do veículo e o link da matéria.

## Mapeamento (zip → veículo)

- `WhatsApp ... 08.25.50.jpeg` → **O Tempo**
- `WhatsApp ... (1).jpeg` → **Estado de Minas**
- `WhatsApp ... (2).jpeg` → **ConJur**
- `WhatsApp ... (3).jpeg` → **G1**
- `WhatsApp ... (4).jpeg` → **Folha de S.Paulo**
- `WhatsApp ... (5).jpeg` → **Valor Econômico**

## Passos

1. Subir os 6 arquivos para o CDN com `lovable-assets create`, gerando 6 ponteiros em `src/assets/media-logos/*.jpg.asset.json` (valor, folha, g1, conjur, estado-de-minas, o-tempo).
2. Editar `src/components/site/MediaMentions.tsx`:
   - Importar os 6 ponteiros `.asset.json` e adicionar `logo: <url>` em cada item de `MEDIA_ITEMS`.
   - Dentro de cada card, renderizar `<img>` com a logo (altura ~h-12 sm:h-14, `object-contain`, `opacity-90` + `group-hover:opacity-100`), seguido do nome do veículo menor (`text-xs sm:text-sm`) e "Ver publicação" discreto.
   - Card mantém `min-h-[140px]`, `target="_blank"`, `rel="noopener noreferrer"`.
3. Não mexer em `public/media-logos/` (mantido como está, mas não mais referenciado).
4. Rodar `bunx tsc --noEmit` para validar.

## Preservar

Sem alterações em: banco, migrations, RLS, `/admin/*`, `/noticias`, `/acidente-de-trabalho`, CTAs da Ana, WhatsApp, Google Ads, tracking, edge functions, Navbar, Footer, home, `/auth`. Apenas `MediaMentions.tsx` + novos `.asset.json`.

## Validação

A) `MediaMentions.tsx` alterado e 6 ponteiros criados; B) 6 cards com logo + nome + "Ver publicação"; C) cada card abre a matéria correta em nova aba; D) bloco continua antes do CTA final da Ana; E) layout responsivo (mobile/desktop); F) typecheck sem erro.

Não publicar automaticamente.
