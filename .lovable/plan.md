# Mensagens de WhatsApp que dizem de onde o cliente veio

Objetivo: cada clique no WhatsApp já chega com uma mensagem que mostra a página, a notícia, a área ou o advogado que a pessoa estava vendo. O número continua o mesmo: (43) 99994-8455. O visual do site não muda.

## Mensagens por parte do site

1. **Notícias e artigos** (inclusive Acidente de Trabalho)
   - Botões do topo e do meio: "Olá! Estava lendo o artigo '[Título]' no site Denison Leandro e gostaria de uma orientação sobre o meu caso."
   - Caixa "Envie as suas dúvidas" no final: a pessoa passa a poder digitar. O texto dela vai junto: "... artigo '[Título]'. Minha dúvida: [texto digitado]".
2. **Áreas de atuação**: cada área tem sua própria mensagem, por exemplo "Olá! Vi a área de Direito Trabalhista no site e gostaria de orientação." O mesmo vale para Família, Previdenciário, Bancário, Consumidor, Contratos e Mediação.
3. **Perfil de cada advogado e da equipe**: "Olá! Vi o perfil de [Nome] no site e gostaria de agendar um atendimento."
4. **Botão verde flutuante**: a mensagem muda conforme a página aberta. Exemplos: "...na página principal", "...na página de Contato", "...no artigo '[Título]'".
5. **Página inicial (topo e faixa final), menu do topo e página de Contato**: cada lugar diz de onde veio, por exemplo "Olá! Vim pela página principal do site Denison Leandro e gostaria de falar com um advogado."

## Detalhes técnicos
- Criar uma função única em `src/lib/whatsapp.ts`: `whatsappUrl(message)`, com o número centralizado.
- A mensagem das áreas vem do título que cada rota já passa para `AreaDetail`. A dos advogados vem do nome em `LawyerDetail` e em `StaffDetail`.
- `FloatingWhatsApp` usa `useRouterState` para ler a página atual. Uma tabela liga cada endereço ao nome da página. Em `/noticias/$slug`, o título é lido dos dados que a página já carregou.
- `noticias.$slug.tsx` e `acidente-de-trabalho.tsx` passam o título para os botões. A caixa de texto deixa de ser somente leitura e passa a ter seu próprio estado.
- Atualizar Hero, CtaBanner, Navbar e contato com mensagens próprias.
