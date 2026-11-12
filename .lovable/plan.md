# Segunda foto do Dr. Denison Leandro ("denison-escritorio")

Adicionar a foto enviada "denison-leandro-escritorio.jpg" como segunda foto do Dr. Denison.

## O que NÃO muda
- Foto dele nos cards da equipe (página inicial e "Profissionais") continua a atual.
- Fotos dos outros advogados continuam iguais.

## Onde a nova foto entra
- Foto principal da página /equipe/denison-henrique-leandro
- Linha do autor e caixa do autor nos artigos em que ele é o autor
- Imagem de compartilhamento (og:image e twitter:image) da página dele, com endereço completo
- Imagem do perfil no código que o Google lê (Person)

## Enquadramento
- Nos recortes redondos/quadrados, o centro fica no rosto dele (lado direito da foto), não no centro da imagem.
- Mesmo círculo, tamanho e borda dourada já usados.
- Texto alternativo: "Foto de Dr. Denison Leandro".

## Versões da imagem
- WebP quadrado (~600x600) centrado no rosto, para exibir no site.
- JPG 1200x630 para compartilhamento (mostra ele e o escritório, com o rosto bem visível).

## Detalhes técnicos
- Gerar os arquivos só com recorte/redimensionamento (sem IA) e enviar como `denison-escritorio.webp` e `denison-escritorio-share.jpg`.
- Trocar a foto em `authors.ts` (avatar do autor) e em `equipe.denison-henrique-leandro.tsx`; `Team.tsx` e `profissionais.tsx` seguem com `denison.png`.
- `personHead` ganha opção de imagem de compartilhamento separada (1200x630); Person.image usa a versão quadrada absoluta.
- Ajustar alt do perfil e do avatar do autor para "Foto de ...".
- Conferir perfil, um artigo dele, cards inalterados e os metadados da página. Só aparece no site oficial após publicar.
