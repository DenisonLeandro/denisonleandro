## Implementação aprovada — Artigo `/acidente-de-trabalho`

### Arquivo a criar (único)
`src/routes/acidente-de-trabalho.tsx`

### O que a rota faz
- `createFileRoute("/acidente-de-trabalho")` → URL pública: `https://denisonleandro.adv.br/acidente-de-trabalho`
- Reutiliza componentes existentes (sem alterá-los): `Navbar`, `PageHeader`, `Footer`.
- Não importa nem chama `supabase`, CTA Kit, edge functions, tracking ou qualquer integração.

### SEO (`head()` da rota)
- `title`: "Acidente de trabalho: direitos do trabalhador" (49 chars)
- `meta description`: "Sofreu acidente de trabalho? Entenda seus principais direitos, quando procurar orientação e como agir para proteger sua saúde e seu emprego." (140 chars)
- `og:title`, `og:description`, `og:type=article`, `og:url`
- `twitter:card`, `twitter:title`, `twitter:description`
- `<link rel="canonical">` apontando para `https://denisonleandro.adv.br/acidente-de-trabalho`
- JSON-LD `Article` (schema.org) com headline, datas, autor e publisher.

### Estrutura visual
1. `<Navbar />`
2. `<PageHeader>` com:
   - eyebrow: "Artigo jurídico"
   - title (H1): "Acidente de trabalho: quais são os direitos do trabalhador?"
   - subtítulo descritivo
3. Bloco de metadados (data publicação + autor "Denison Leandro Advogados Associados")
4. Corpo centralizado (`max-w-3xl`) com classes `prose` para boa leitura, contendo:
   - Introdução
   - H2 "O que é considerado acidente de trabalho?"
   - H2 "Exemplos comuns" (lista)
   - H2 "Acidente típico, acidente de trajeto e doença ocupacional"
   - **Botão WhatsApp verde (centralizado)**
   - H2 "Quais direitos o trabalhador pode ter?" (inclui estabilidade 12 meses, FGTS, CAT, INSS)
   - H2 "Por que os documentos são tão importantes" (CAT, atestados, exames, receitas, comprovantes)
   - H2 "Quando procurar orientação jurídica?"
   - H2 "Atenção" (alerta de análise individual, sem promessa de resultado)
5. **Botão WhatsApp verde (centralizado) ao final**
6. Link "Voltar ao início" (`<Link to="/" />`)
7. `<Footer />`

### Botão WhatsApp (regras obrigatórias)
- `href` **exato**: `https://wa.me/5548988487889?text=Ol%C3%A1%2C%20vim%20por%20um%20artigo%20no%20site%20Denison%20Leandro%20e%20gostaria%20de%20receber%20uma%20orienta%C3%A7%C3%A3o%20r%C3%A1pida.`
- `target="_blank"` + `rel="noopener noreferrer"`
- Texto: **"Receba uma orientação"**
- Estilo: fundo verde `#25D366`, branco, hover mais escuro, sombra, responsivo, centralizado, ícone SVG do WhatsApp inline.
- Sem chamada a API, sem Supabase, sem dependência do CTA Kit.

### Tom do conteúdo
Informativo, humano, acessível. Sem "causa ganha", sem promessa de resultado, sem sensacionalismo. Termina com alerta de análise individual de cada caso.

### Arquivos alterados além do arquivo novo
- **Nenhum manual.** Apenas `src/routeTree.gen.ts` é regenerado automaticamente pelo plugin Vite do TanStack Router (não é edição manual, é geração automática a cada build/dev).

### Riscos
Praticamente nulos: apenas adiciona uma rota nova; não toca Supabase, `/noticias`, home, layout, `__root.tsx`, tracking, Google Ads, domínio ou qualquer componente compartilhado (apenas os importa).

### Como testar (depois que eu implementar em build mode)
1. Abrir o preview na URL `/acidente-de-trabalho`.
2. Verificar layout (desktop e mobile), botão WhatsApp abrindo na conversa correta com a mensagem pré-preenchida.
3. Conferir título da aba do navegador e meta description (DevTools → Elements → `<head>`).
4. Conferir link "Voltar ao início" navegando para `/`.

Só publicar após sua aprovação visual no preview.

---
Aprove este plano para eu entrar em build mode e criar o arquivo.