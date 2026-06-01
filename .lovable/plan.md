## Cores extraídas do site de referência

Amostrei pixel-a-pixel a imagem enviada para identificar as cores reais usadas no site original:

- **Navbar / faixas escuras primárias**: `#3C3F50` (cinza-azulado escuro) — já está correto no projeto.
- **Footer / banda escura profunda**: `#151A30` (azul-marinho muito escuro) — hoje usamos `#09142E`, levemente mais escuro/saturado que o original.
- **Laranja CTA (botões, acentos)**: `#FF7F0B` (laranja vivo/vibrante) — hoje usamos `#D35400` (queimado, bem mais escuro).
- **Hover do laranja**: `#E86A00` (versão ~10% mais escura para hover).
- **Laranja suave (ícones)**: `#FF9233`.
- **Fundo creme / seções claras**: `#F7F7F7` (mantém).
- **Texto principal**: `#1A1A1A` (mantém).

## Mudanças

Edição única em `src/styles.css`, ajustando apenas os tokens de cor:

- `--deep`: `#09142E` → `#151A30`
- `--gold`: `#D35400` → `#FF7F0B`
- `--gold-hover`: `#B8470A` → `#E86A00`
- `--orange-soft`: `#E67E22` → `#FF9233`
- `--accent`: `#D35400` → `#FF7F0B`
- `--ring`: `#D35400` → `#FF7F0B`
- Atualizar o gradiente da utility `placeholder-image` e os tons da `placeholder-image-ornament` para os novos valores.

Sem alterações em layout, textos, espaçamentos, tipografia ou em qualquer componente — só os tokens. Como tudo no site já usa classes semânticas (`bg-gold`, `text-gold`, `bg-deep`, etc.), navbar, footer, botões, WhatsApp flutuante, ícones e acentos passam a refletir as cores exatas do site de referência automaticamente.

## Fora de escopo

- Não vou alterar `--navy` (já bate com `#3C3F50` do original).
- Não vou alterar tipografia, fotos placeholder, conteúdo ou estrutura.
