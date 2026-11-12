import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { buildLlmsTxt, textResponse } = await import("@/lib/llms.server");
        try {
          return textResponse(await buildLlmsTxt());
        } catch (err) {
          console.error("[llms.txt]", err);
          return new Response("Temporariamente indisponível", { status: 503 });
        }
      },
    },
  },
});
