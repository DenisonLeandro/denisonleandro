import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,
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
