import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string | null;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image_url: string;
  seo_title: string;
  seo_description: string;
}

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  cover_image_url: "",
  seo_title: "",
  seo_description: "",
};

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export const Route = createFileRoute("/_authenticated/admin/artigos")({
  component: AdminArtigosPage,
});

function AdminArtigosPage() {
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(false);

  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_BYTES = 5 * 1024 * 1024;

  async function handleCoverUpload(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Envie uma imagem JPG, PNG ou WEBP.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Imagem muito grande. O limite é 5 MB.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const safeName = slugify(baseName) || "imagem";
      const path = `articles/${Date.now()}-${safeName}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("article-covers")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage
        .from("article-covers")
        .getPublicUrl(path);
      setForm((f) => ({ ...f, cover_image_url: pub.publicUrl }));
    } catch (err: any) {
      console.error("Erro no upload:", err);
      setError(err?.message ?? "Erro ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }


  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  async function loadArticles() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await (supabase as any)
        .from("articles")
        .select("*")
        .order("updated_at", { ascending: false });
      if (err) throw err;
      setArticles((data || []) as Article[]);
    } catch (err: any) {
      console.error("Erro ao carregar artigos:", err);
      setError(err?.message ?? "Erro ao carregar artigos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setSlugTouched(false);
    setError(null);
    setMode("edit");
  }

  function openEdit(a: Article) {
    setEditing(a);
    setForm({
      title: a.title ?? "",
      slug: a.slug ?? "",
      excerpt: a.excerpt ?? "",
      content: a.content ?? "",
      category: a.category ?? "",
      author: a.author ?? "",
      cover_image_url: a.cover_image_url ?? "",
      seo_title: a.seo_title ?? "",
      seo_description: a.seo_description ?? "",
    });
    setSlugTouched(true);
    setError(null);
    setMode("edit");
  }

  function cancelEdit() {
    setMode("list");
    setEditing(null);
    setForm(emptyForm);
    setSlugTouched(false);
    setError(null);
  }

  function onTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  }

  function onSlugChange(value: string) {
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug: value }));
  }

  async function handleDelete(a: Article) {
    if (!window.confirm(`Excluir o artigo "${a.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    setError(null);
    try {
      const { error: err } = await (supabase as any)
        .from("articles")
        .delete()
        .eq("id", a.id);
      if (err) throw err;
      await loadArticles();
    } catch (err: any) {
      console.error("Erro ao excluir artigo:", err);
      setError(err?.message ?? "Erro ao excluir artigo.");
    }
  }

  async function save(status: "draft" | "published") {
    if (!form.title.trim()) {
      setError("Informe o título do artigo.");
      return;
    }
    if (!form.content.trim()) {
      setError("Informe o conteúdo do artigo.");
      return;
    }

    const finalSlug = slugify(form.slug || form.title);
    if (!finalSlug) {
      setError("Slug inválido.");
      return;
    }

    setSaving(true);
    setError(null);

    let publishedAt = editing?.published_at ?? null;
    if (status === "published" && !publishedAt) {
      publishedAt = new Date().toISOString();
    }

    const payload = {
      title: form.title.trim(),
      slug: finalSlug,
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      category: form.category.trim() || null,
      author: form.author.trim() || null,
      cover_image_url: form.cover_image_url.trim() || null,
      seo_title: form.seo_title.trim() || null,
      seo_description: form.seo_description.trim() || null,
      status,
      published_at: publishedAt,
    };

    try {
      if (editing) {
        const { error: err } = await (supabase as any)
          .from("articles")
          .update(payload)
          .eq("id", editing.id);
        if (err) throw err;
      } else {
        const { error: err } = await (supabase as any)
          .from("articles")
          .insert(payload);
        if (err) throw err;
      }
      await loadArticles();
      cancelEdit();
    } catch (err: any) {
      console.error("Erro ao salvar artigo:", err);
      setError(err?.message ?? "Erro ao salvar artigo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg text-white">Painel administrativo</span>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-navy"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl text-navy">Painel de artigos</h1>
          {mode === "list" && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90"
            >
              <Plus size={16} />
              Novo artigo
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {mode === "list" ? (
          <section className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-card">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-16">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Carregando artigos...</span>
              </div>
            ) : articles.length === 0 ? (
              <div className="px-6 py-16 text-center text-foreground/70">
                Nenhum artigo cadastrado ainda. Clique em "Novo artigo" para começar.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-background text-left text-xs uppercase tracking-wider text-foreground/60">
                    <tr>
                      <th className="px-4 py-3">Título</th>
                      <th className="px-4 py-3">Categoria</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Publicado em</th>
                      <th className="px-4 py-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {articles.map((a) => (
                      <tr key={a.id} className="hover:bg-background/60">
                        <td className="px-4 py-3 font-medium text-navy">{a.title}</td>
                        <td className="px-4 py-3 text-foreground/80">{a.category ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              a.status === "published"
                                ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800"
                                : "inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800"
                            }
                          >
                            {a.status === "published" ? "Publicado" : "Rascunho"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground/80">
                          {a.published_at
                            ? new Date(a.published_at).toLocaleDateString("pt-BR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => openEdit(a)}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-semibold text-navy hover:bg-navy hover:text-white"
                            >
                              <Pencil size={12} />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(a)}
                              className="inline-flex items-center gap-1 rounded-md border border-red-300 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600"
                            >
                              <Trash2 size={12} />
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-serif text-xl text-navy">
              {editing ? "Editar artigo" : "Novo artigo"}
            </h2>

            <div className="mt-6 grid gap-5">
              <Field label="Título">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Título do artigo"
                />
              </Field>

              <Field label="Slug" hint="Usado na URL: /noticias/<slug>">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => onSlugChange(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono"
                  placeholder="meu-artigo"
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Categoria">
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Ex.: Direito do Trabalho"
                  />
                </Field>
                <Field label="Autor">
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Nome do autor"
                  />
                </Field>
              </div>

              <Field label="URL da imagem de capa" hint="Você pode enviar abaixo ou colar uma URL externa.">
                <input
                  type="url"
                  value={form.cover_image_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cover_image_url: e.target.value }))
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="https://..."
                />
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white">
                    {uploading ? "Enviando..." : "Enviar imagem de capa"}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCoverUpload(file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <span className="text-xs text-foreground/60">JPG, PNG ou WEBP • até 5 MB</span>
                </div>
                {form.cover_image_url && (
                  <div className="mt-3">
                    <img
                      src={form.cover_image_url}
                      alt="Prévia da imagem de capa"
                      className="max-h-48 rounded-md border border-border object-cover"
                    />
                  </div>
                )}
              </Field>


              <Field label="Resumo (excerpt)">
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Breve resumo exibido nos cards e listagens."
                />
              </Field>

              <Field label="Conteúdo">
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={16}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
                  placeholder="Conteúdo completo do artigo."
                />
              </Field>

              <Field label="SEO — Título">
                <input
                  type="text"
                  value={form.seo_title}
                  onChange={(e) => setForm((f) => ({ ...f, seo_title: e.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Título exibido nos buscadores"
                />
              </Field>

              <Field label="SEO — Descrição">
                <textarea
                  value={form.seo_description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seo_description: e.target.value }))
                  }
                  rows={2}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Descrição exibida nos buscadores"
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
              <button
                onClick={cancelEdit}
                disabled={saving}
                className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy hover:bg-background disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => save("draft")}
                disabled={saving}
                className="rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Salvar rascunho"}
              </button>
              <button
                onClick={() => save("published")}
                disabled={saving}
                className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy hover:bg-gold/90 disabled:opacity-50"
              >
                {saving ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-foreground/50">{hint}</span>}
    </label>
  );
}
