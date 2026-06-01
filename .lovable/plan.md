## Mapeamento das fotos

Tenho 8 advogados no site, mas você enviou 6 fotos. Vou usar as 6 fotos onde correspondem e manter o placeholder atual para os 3 que ainda não têm foto (Juan Albner, Igor Augusto, Danielle Cristina).

### Fotos de advogados (Team na home + página /profissionais)
- `denison.png` → Dr. Denison Henrique Leandro
- `marcio.png` → Dr. Márcio Barbosa da Silva
- `higor.png` → Dr. Higor Henrique Leandro
- `joao.png` → Dr. João Tadeu Leandro
- `renata.png` → Dra. Renata Henrique Leandro
- `maria.png` → vou usar para **Maria Inês Gomes da Silva** (Administrativo / Financeiro), na página /profissionais — o nome do arquivo bate com a integrante administrativa, não com nenhuma advogada.

### Outras imagens
- `escritorio.jpg.jpg` → imagem do escritório no bloco da Home (`About.tsx`) e também no Hero (`Hero.tsx`). Vou usar nas duas para substituir os blocos de placeholder.
- `logo.png` → logotipo "D" laranja, vai substituir o "D" desenhado em texto na **Navbar** e no **Footer**.

## Como vou implementar

1. Subir todas as 8 imagens via `lovable-assets create` direto de `/mnt/user-uploads/`, gerando pointers em `src/assets/*.asset.json` (sem deixar binários no repo).
2. Em `src/components/site/Team.tsx`: adicionar campo `photo` no array `team`, importar os asset pointers e renderizar `<img>` para os 5 advogados que têm foto; manter o placeholder atual para os 3 sem foto.
3. Em `src/routes/profissionais.tsx`: mesma lógica para os 5 advogados + foto da Maria no bloco Administrativo. Leonardo continua com placeholder.
4. Em `src/components/site/Hero.tsx` e `src/components/site/About.tsx`: substituir as `<div class="placeholder-image ...">` por `<img src={escritorioAsset.url} ...>` preservando aspect ratio, bordas arredondadas, sombra e ring atuais.
5. Em `src/components/site/Navbar.tsx` e `src/components/site/Footer.tsx`: substituir o "D" textual dentro do quadrado pelo `<img src={logoAsset.url} alt="DL Advogados">`. Como a logo enviada é só o "D" laranja em fundo transparente, vou ajustar o fundo do quadradinho para combinar (provavelmente removendo o `bg-gold` e deixando a logo aparecer sobre o navy).

Sem mudanças de layout, texto ou cores fora desses ajustes mínimos.

## Confirmação rápida

Pode confirmar duas coisas antes de eu executar?
1. A foto `maria.png` é mesmo da **Maria Inês** (administrativo) e não de alguma advogada listada?
2. Posso manter o placeholder atual para Juan Albner, Igor Augusto e Danielle até você enviar as fotos deles?
