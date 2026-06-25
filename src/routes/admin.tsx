import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () =>
    buildHead({
      title: "Administração",
      description: "Painel administrativo do escritório.",
      path: "/admin",
      noindex: true,
    }),
  component: AdminRedirect,
});

function AdminRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: "/admin/artigos", replace: true });
      } else {
        navigate({ to: "/auth", replace: true });
      }
    });
  }, [navigate]);

  return null;
}
