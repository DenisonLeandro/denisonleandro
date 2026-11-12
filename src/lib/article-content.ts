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
