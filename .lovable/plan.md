# Fazer Google, redes sociais e IAs entenderem o escritório

Sem mudar o visual (exceto os itens pedidos: link do LinkedIn, ícones sociais no rodapé e botões de compartilhar nos artigos).

## 1. Ficha do escritório em todas as páginas
Trocar a ficha genérica atual por uma completa: nome, endereço do Centro de Londrina (Av. Paraná, 343, sala 902), telefone, WhatsApp, e-mail, horário seg–sex 8h–18h, fundação 2000, fundador Dr. Denison, áreas, mapa e redes (Instagram, Facebook, YouTube). Mais a ficha do site. Só o endereço de Londrina.

## 2. Advogados
Cada página /equipe/* recebe ficha de pessoa: nome, cargo, foto, e-mail, OAB/PR, vínculo com o escritório, áreas e formação já citada no texto. Dr. Denison ganha LinkedIn na ficha e um link "LinkedIn" visível. /profissionais recebe a lista de todos os advogados.

## 3. Áreas de atuação
Cada /areas/* recebe ficha de serviço "[Área] em Londrina", atendendo Londrina e Paraná, prestado pelo escritório. Mantém a trilha de navegação.

## 4. Artigos
Ficha passa a ser "post de blog", com autor ligado à página do advogado (padrão Dr. Denison), escritório como editor, idioma, categoria e contagem de palavras.

## 5. Compartilhamento em redes
- Todas as páginas: título, descrição, endereço, imagem com largura/altura/texto alternativo, idioma e cartão grande no X.
- Advogados: tipo "perfil" e foto da pessoa como imagem.
- Artigos: capa, autor e categoria.
- Página 404: imagem padrão do escritório.
- Conferir a imagem padrão (1200x630, logo e nome legíveis); gerar nova se não estiver boa.
- Rodapé: ícones de Instagram, Facebook e YouTube.
- Fim de cada artigo: botões simples de compartilhar no WhatsApp, LinkedIn e Facebook.

## 6. WhatsApp
Varredura completa para garantir que o número antigo (43) 99680-8308 não aparece mais em lugar nenhum.

## Validação
Baixar o HTML do servidor da home, /contato, /areas/trabalhista, /equipe/denison-henrique-leandro e de um artigo; conferir que as fichas estão lá e são válidas. Mostrar a ficha da home para você.

## Detalhes técnicos
- JSON-LD via `head().scripts` (SSR), @graph global no `__root` com @ids `#escritorio` e `#site`.
- Estender `buildHead` em `src/lib/seo.ts`: og:image:width/height/alt, og:type "profile", article:section; helpers `personSchema`, `serviceSchema`.
- `LawyerDetail`/`StaffDetail`: prop opcional `linkedin`; dados de pessoa por rota.
- Fotos de equipe como asset → converter para URL absoluta no og:image.
- Verificar og-default.jpg com PIL; regenerar se preciso.
