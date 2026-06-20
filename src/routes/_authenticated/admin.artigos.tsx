import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/artigos")({
  component: AdminArtigosPage,
});

function AdminArtigosPage() {
  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-navy">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg text-white">Painel administrativo</span>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-navy"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl text-navy">Painel de artigos</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Área administrativa para criação e edição de artigos. Em breve, aqui
          será possível cadastrar novos conteúdos.
        </p>
      </main>
    </div>
  );
}
