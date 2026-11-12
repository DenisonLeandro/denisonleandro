export interface TocItem { id: string; text: string }

export function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "secao";
}
const textOf = (h: string) => h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

/** Bold-only paragraph → heading text, or null. Rules: whole paragraph bold, ≤90 chars, not "Label: text". */
export function boldHeadingText(paragraphInner: string): string | null {
  const m = paragraphInner.trim().match(/^<(strong|b)>([\s\S]*?)<\/\1>$/i);
  if (!m) return null;
  if (/<\/(strong|b)>/i.test(m[2])) return null; // more than one bold run
  const t = textOf(m[2]);
  if (!t || t.length > 90) return null;
  return t;
}

/** Converts eligible bold paragraphs to <h2>, adds ids to all h2, returns TOC. */
export function enhanceContent(html: string): { html: string; toc: TocItem[] } {
  const used = new Set<string>();
  const toc: TocItem[] = [];
  const uid = (t: string) => { let b = slugify(t), id = b, i = 2; while (used.has(id)) id = `${b}-${i++}`; used.add(id); return id; };
  let out = html.replace(/<p>([\s\S]*?)<\/p>/gi, (full, inner) => {
    const t = boldHeadingText(inner);
    return t ? `<h2>${t.replace(/</g, "&lt;")}</h2>` : full;
  });
  out = out.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (_f, attrs = "", inner) => {
    const t = textOf(inner);
    const existing = /\sid="([^"]+)"/.exec(attrs)?.[1];
    const id = existing ?? uid(t);
    if (existing) used.add(existing);
    toc.push({ id, text: t });
    return existing ? `<h2${attrs}>${inner}</h2>` : `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Plain-text line that is clearly a subtitle: own line, ≤90 chars, no final ".", ",", ";" or ":", not a list item. */
export function isPlainHeading(line: string): boolean {
  const t = line.trim();
  if (t.length < 3 || t.length > 90) return false;
  if (/^[-•*\d]/.test(t)) return false;
  if (/[.,;:]$/.test(t)) return false;
  if (/:\s+\S/.test(t)) return false;
  if (/\s[—–-]\s/.test(t)) return false; // assinatura, ex.: "Nome — Advogado"
  return /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(t);
}

/** Converts plain-text article content into simple semantic HTML. Drops a first line equal to the title. */
export function plainToHtml(text: string, title?: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  // A subtitle must start a new block (blank line before) or be a question,
  // so source citations glued under a paragraph ("Planalto", "Jurisprudência TST") stay text.
  const raw = text.replace(/\r/g, "").split("\n");
  const lines: string[] = [];
  const starts: boolean[] = [];
  raw.forEach((l, i) => { const t = l.trim(); if (!t) return; lines.push(t); starts.push(i === 0 || !raw[i - 1].trim()); });
  if (title && lines[0] && norm(lines[0]) === norm(title)) { lines.shift(); starts.shift(); }
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`); list = []; } };
  for (const [i, l] of lines.entries()) {
    if (/^[-•*]\s+/.test(l)) { list.push(l.replace(/^[-•*]\s+/, "")); continue; }
    flush();
    out.push((starts[i] || l.endsWith("?")) && isPlainHeading(l) ? `<h2>${esc(l)}</h2>` : `<p>${esc(l)}</p>`);
  }
  flush();
  return out.join("");
}

export function prepareArticleHtml(content: string, title?: string) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  return enhanceContent(isHtml ? content : plainToHtml(content, title));
}

/** Splits HTML at a top-level block boundary near the middle (for the mid-article CTA). */
export function splitHtmlInHalf(html: string): [string, string] {
  const blocks = html.split(/(?<=<\/(?:p|h2|h3|h4|ul|ol|blockquote)>)/i).filter((b) => b.trim());
  if (blocks.length <= 1) return [html, ""];
  let mid = Math.floor(blocks.length / 2);
  while (mid < blocks.length - 1 && /^\s*<h[2-4]/i.test(blocks[mid - 1])) mid++; // don't orphan a heading
  return [blocks.slice(0, mid).join(""), blocks.slice(mid).join("")];
}
