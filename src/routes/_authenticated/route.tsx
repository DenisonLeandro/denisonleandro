import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth" });
    }
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext() as { user: { id: string; email?: string } };
  const [state, setState] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "editor")
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) setState("denied");
      else setState("allowed");
    })();
    return () => {
      cancelled = true;
    };
  }, [user.id]);

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-navy" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl text-navy">Acesso negado</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Sua conta ({user.email}) está autenticada, mas não possui permissão
            de editor para acessar o painel.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-gold hover:text-navy"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
