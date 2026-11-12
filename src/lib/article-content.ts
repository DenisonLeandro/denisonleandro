export interface TocItem { id: string; text: string; level: 2 | 3 }

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
  out = out.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (_f, lv, attrs = "", inner) => {
    const t = textOf(inner);
    const existing = /\sid="([^"]+)"/.exec(attrs)?.[1];
    const id = existing ?? uid(t);
    if (existing) used.add(existing);
    toc.push({ id, text: t, level: lv === "3" ? 3 : 2 });
    return existing ? `<h${lv}${attrs}>${inner}</h${lv}>` : `<h${lv}${attrs} id="${id}">${inner}</h${lv}>`;
  });
  return { html: out, toc };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const safeHref = (u: string) => (/^(https:\/\/|\/)/.test(u) ? u.replace(/"/g, "%22") : "#");
/** Escapes text and turns [texto](/url ou https://...) into links. */
export function inlineText(s: string): string {
  return esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => {
    const href = safeHref(u.replace(/&amp;/g, "&"));
    const ext = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${href}"${ext}>${t}</a>`;
  });
}
/** Highlight box line: [[destaque|Texto|Botão|URL]] */
function calloutHtml(text: string, label: string, url: string): string {
  const href = safeHref(url);
  const ext = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<aside class="not-prose my-10 rounded-xl border border-border bg-muted/40 p-5"><p class="!mb-4 font-semibold !text-left">${esc(text)}</p><a href="${href}"${ext} class="inline-flex items-center justify-center rounded-lg border border-navy bg-white px-5 py-2.5 text-sm font-semibold !text-navy !no-underline shadow-sm transition-all hover:bg-navy hover:!text-white">${esc(label)}</a></aside>`;
}

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
    // so source citations glued under a paragraph ("Planalto", "Jurisprudência TST") stay text.
  const raw = text.replace(/\r/g, "").split("\n");
  const lines: string[] = [];
  // A citation glued under a paragraph and followed by a blank line ("Planalto") is not a subtitle.
  const starts: boolean[] = [];
  raw.forEach((l, i) => {
    const t = l.trim(); if (!t) return;
    lines.push(t);
    const blankBefore = i === 0 || !raw[i - 1].trim();
    const textAfter = i + 1 < raw.length && !!raw[i + 1].trim();
    starts.push(blankBefore || textAfter);
  });
  if (title && lines[0] && norm(lines[0]) === norm(title)) { lines.shift(); starts.shift(); }
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push(`<ul>${list.map((l) => `<li>${inlineText(l)}</li>`).join("")}</ul>`); list = []; } };
  for (const [i, l] of lines.entries()) {
    if (/^[-•*]\s+/.test(l)) { list.push(l.replace(/^[-•*]\s+/, "")); continue; }
    flush();
    // Explicit markers written in the panel: "## " = H2, "### " = H3, [[destaque|...]] = highlight box.
    const mk = /^(#{2,3})\s+(.+)$/.exec(l);
    if (mk) { out.push(`<h${mk[1].length}>${esc(mk[2])}</h${mk[1].length}>`); continue; }
    const co = /^\[\[destaque\|([^|]+)\|([^|]+)\|([^\]]+)\]\]$/.exec(l);
    if (co) { out.push(calloutHtml(co[1].trim(), co[2].trim(), co[3].trim())); continue; }
    out.push((starts[i] || l.endsWith("?")) && isPlainHeading(l) ? `<h2>${esc(l)}</h2>` : `<p>${inlineText(l)}</p>`);
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
  const blocks = html.split(/(?<=<\/(?:p|h2|h3|h4|ul|ol|blockquote|aside)>)/i).filter((b) => b.trim());
  if (blocks.length <= 1) return [html, ""];
  let mid = Math.floor(blocks.length / 2);
  while (mid < blocks.length - 1 && /^\s*<h[2-4]/i.test(blocks[mid - 1])) mid++; // don't orphan a heading
  return [blocks.slice(0, mid).join(""), blocks.slice(mid).join("")];
}
