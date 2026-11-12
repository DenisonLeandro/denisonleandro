import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { findRedirect } from "@/lib/redirects";

const redirectMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  const to = findRedirect(url.pathname);
  if (to) {
    return new Response(null, {
      status: 301,
      headers: { Location: `${to}${url.search}`, "Cache-Control": "public, max-age=86400" },
    });
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [redirectMiddleware, errorMiddleware],
}));
