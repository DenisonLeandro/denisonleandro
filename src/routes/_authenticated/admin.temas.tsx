import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AREA_CARDS, getAreaCard } from "@/lib/area-cards";
import { normalizeFaq, type FaqItem } from "@/lib/authors";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin/temas")({
  head: () => buildHead({ title: "Temas das áreas", description: "Painel de temas das áreas.", path: "/admin/temas", noindex: true }),
  component: AdminTemasPage,
});

interface Topic {
  id: string; area_slug: string; slug: string; title: string; seo_title: string | null; seo_description: string | null;
  summary: string | null; content: string; faq: unknown; sort_order: number; published: boolean; updated_at: string;
}
interface Form {
  area_slug: string; slug: string; title: string; seo_title: string; seo_description: string; summary: string;
  content: string; faq: FaqItem[]; sort_order: number; published: boolean;
}
const empty: Form = { area_slug: "saude", slug: "", title: "", seo_title: "", seo_description: "", summary: "", content: "", faq: [], sort_order: 0, published: false };

const slugify = (t: string) => t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const input = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm";

function AdminTemasPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Topic | null>(null);
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("area_topics").select("*").order("area_slug").order("sort_order");
    if (error) setError(error.message);
    setTopics((data as Topic[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() { setEditing(null); setForm(empty); setMode("edit"); setError(null); }
  function openEdit(t: Topic) {
    setEditing(t);
    setForm({ area_slug: t.area_slug, slug: t.slug, title: t.title, seo_title: t.seo_title ?? "", seo_description: t.seo_description ?? "",
      summary: t.summary ?? "", content: t.content ?? "", faq: normalizeFaq(t.faq), sort_order: t.sort_order, published: t.published });
    setMode("edit"); setError(null);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const slug = slugify(form.slug || form.title);
    if (!form.title.trim() || !slug) { setError("Informe o título."); return; }
    setSaving(true); setError(null);
    const payload = {
      area_slug: form.area_slug, slug, title: form.title.trim(), seo_title: form.seo_title.trim() || null,
      seo_description: form.seo_description.trim() || null, summary: form.summary.trim() || null, content: form.content,
      faq: form.faq.filter((q) => q.pergunta.trim() && q.resposta.trim()) as any, sort_order: Number(form.sort_order) || 0, published: form.published,
    };
    const res = editing
      ? await supabase.from("area_topics").update(payload).eq("id", editing.id)
      : await supabase.from("area_topics").insert(payload);
    setSaving(false);
    if (res.error) { setError(res.error.code === "23505" ? "Já existe um tema com esse endereço nesta área." : res.error.message); return; }
    setMode("list"); load();
  }

  async function remove(t: Topic) {
    if (!confirm(`Excluir o tema "${t.title}"?`)) return;
    const { error } = await supabase.from("area_topics").delete().eq("id", t.id);
    if (error) setError(error.message); else load();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg text-white">Painel administrativo</span>
          <Link to="/admin/artigos" className="text-xs font-semibold text-white hover:text-gold">← Artigos</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl text-navy">Temas das áreas</h1>
          {mode === "list" && (
            <button onClick={openNew} className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90">
              <Plus size={16} /> Novo tema
            </button>
          )}
        </div>
        {error && <div className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

        {mode === "list" ? (
          loading ? <Loader2 className="mt-10 animate-spin text-navy" /> : (
            <table className="mt-8 w-full text-sm">
              <thead><tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2">Área</th><th>Título</th><th>Ordem</th><th>Situação</th><th></th></tr></thead>
              <tbody>
                {topics.map((t) => (
                  <tr key={t.id} className="border-b border-border">
                    <td className="py-3">{getAreaCard(t.area_slug)?.title ?? t.area_slug}</td>
                    <td><a href={`/areas/${t.area_slug}/${t.slug}`} target="_blank" rel="noreferrer" className="text-navy hover:text-gold">{t.title}</a></td>
                    <td>{t.sort_order}</td>
                    <td>{t.published ? "Publicado" : "Rascunho"}</td>
                    <td className="text-right">
                      <button onClick={() => openEdit(t)} className="mr-3 text-navy hover:text-gold" aria-label="Editar"><Pencil size={16} /></button>
                      <button onClick={() => remove(t)} className="text-destructive" aria-label="Excluir"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <form onSubmit={save} className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm font-semibold">Área
                <select className={input} value={form.area_slug} onChange={(e) => setForm({ ...form, area_slug: e.target.value })}>
                  {AREA_CARDS.map((a) => <option key={a.slug} value={a.slug}>{a.title}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold">Ordem
                <input type="number" className={input} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </label>
              <label className="flex items-end gap-2 text-sm font-semibold">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publicado
              </label>
            </div>
            <label className="block text-sm font-semibold">Título
              <input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} />
            </label>
            <label className="block text-sm font-semibold">Endereço (slug)
              <input className={input} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <span className="text-xs font-normal text-muted-foreground">/areas/{form.area_slug}/{slugify(form.slug || form.title)}</span>
            </label>
            <label className="block text-sm font-semibold">Título para o Google (title SEO)
              <input className={input} value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} />
            </label>
            <label className="block text-sm font-semibold">Descrição para o Google (meta description)
              <textarea rows={2} className={input} value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} />
            </label>
            <label className="block text-sm font-semibold">Resumo
              <textarea rows={3} className={input} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </label>
            <label className="block text-sm font-semibold">Texto
              <textarea rows={16} className={`${input} font-mono`} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <span className="text-xs font-normal text-muted-foreground">Use ## para título, ### para subtítulo e [texto](/endereço) para links.</span>
            </label>
            <div>
              <p className="text-sm font-semibold">Perguntas frequentes</p>
              {form.faq.map((q, i) => (
                <div key={i} className="mt-3 space-y-2 rounded-md border border-border p-3">
                  <input placeholder="Pergunta" className={input} value={q.pergunta} onChange={(e) => setForm({ ...form, faq: form.faq.map((x, j) => (j === i ? { ...x, pergunta: e.target.value } : x)) })} />
                  <textarea placeholder="Resposta" rows={3} className={input} value={q.resposta} onChange={(e) => setForm({ ...form, faq: form.faq.map((x, j) => (j === i ? { ...x, resposta: e.target.value } : x)) })} />
                  <button type="button" onClick={() => setForm({ ...form, faq: form.faq.filter((_, j) => j !== i) })} className="text-xs text-destructive">Remover</button>
                </div>
              ))}
              <button type="button" onClick={() => setForm({ ...form, faq: [...form.faq, { pergunta: "", resposta: "" }] })} className="mt-3 text-sm font-semibold text-gold">+ Adicionar pergunta</button>
            </div>
            <div className="flex gap-3">
              <button disabled={saving} className="rounded-md bg-navy px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Salvando..." : "Salvar"}</button>
              <button type="button" onClick={() => setMode("list")} className="rounded-md border border-border px-5 py-2 text-sm">Cancelar</button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
