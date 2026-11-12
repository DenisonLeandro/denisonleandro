# Trocar a foto do Dr. Denison Leandro (fundo azul)

Usar a foto enviada "denison-leandro-fundo-azul.jpg" no lugar da foto atual, só para o Dr. Denison. As fotos dos outros advogados não mudam.

## Onde a foto muda
- Card da equipe na página inicial
- Página "Profissionais"
- Página /equipe/denison-henrique-leandro
- Linha do autor e caixa do autor nos artigos dele
- Imagem de compartilhamento (WhatsApp, Facebook, X) da página dele
- Imagem do perfil no código que o Google lê (Person)

## Aparência
- Mesmo círculo, tamanho, borda dourada e recorte dos outros advogados (sem mudar nenhum estilo).
- Texto alternativo: "Foto de Dr. Denison Leandro" em todos os lugares onde a foto dele aparece.

## Versões da imagem
- Versão WebP otimizada (quadrada, ~600x600) para exibir no site.
- Versão JPG 1200x630 com fundo azul completando as laterais para compartilhamento, com endereço completo (https://denisonleandro.adv.br/...), mantendo og:image e twitter:image iguais. A foto do schema Person usa a versão quadrada com endereço completo.

## Detalhes técnicos
- Gerar os arquivos a partir do original, só recorte/redimensionamento (sem IA), e enviar para o armazenamento de imagens (novos pointers `denison.webp` e `denison-share.jpg`).
- Atualizar imports em `authors.ts`, `Team.tsx`, `profissionais.tsx` e `equipe.denison-henrique-leandro.tsx`; `personHead` ganha opção de imagem de compartilhamento separada (1200x630).
- Alt "Foto de ..." aplicado no perfil, cards e avatar do autor (apenas texto; não altera visual).
- O pointer antigo `denison.png` fica sem uso, mas não é apagado (versões anteriores ainda usam).
- Conferir na tela: home, profissionais, perfil e um artigo; conferir o head da página dele.
- Só aparece no site oficial após publicar.
