import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const { buildLlmsFullTxt, textResponse } = await import("@/lib/llms.server");
        try {
          return textResponse(await buildLlmsFullTxt());
        } catch (err) {
          console.error("[llms-full.txt]", err);
          return new Response("Temporariamente indisponível", { status: 503 });
        }
      },
    },
  },
});
