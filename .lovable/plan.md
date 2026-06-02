## Update Hero title to match header logo layout

Edit only `src/components/site/Hero.tsx`. No other files change.

### Replace the current centered logo + H1 with a horizontal logo+text group

- Wrap the logo and text in a flex row, centered horizontally (`flex items-center justify-center gap-4 md:gap-6`), with `flex-col` on mobile and `md:flex-row` from `md` up so it stacks on small screens.
- Logo on the LEFT: reuse `logoAsset.url`, sized larger than the header (e.g. `h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32`), `object-contain`.
- Text on the RIGHT, stacked vertically, left-aligned on desktop / center-aligned on mobile:
  - Main line: "Denison Henrique Leandro" — same `font-serif` family as header, scaled up for hero (`text-3xl md:text-5xl lg:text-6xl`, `font-semibold`, `text-white`, tight leading).
  - Sub line: "Advogados Associados" — same uppercase tracked style as header (`uppercase tracking-[0.18em] text-white/70`), scaled up (`text-xs md:text-sm lg:text-base`), placed directly underneath.
- Remove the previous `<h1>` "Denison Leandro Advogados Associados".
- Use a single `<h1>` wrapping both lines for SEO (visually two stacked spans).

### Keep unchanged

- Dark navy hero background, ornament overlay, section padding.
- Subtitle paragraph ("Atuação Full Service…") centered below the new title group.
- Both CTA buttons (green WhatsApp + outlined "Conheça as Áreas de Atuação") centered below the subtitle, unchanged.
- Navbar, footer, all other sections and pages.

### Responsive behavior

- `< md`: logo on top, text stacked centered below it (vertical stack), preserving the same hierarchy.
- `≥ md`: logo on the left, text block on the right, both vertically centered as a row, the whole group centered on the page.
