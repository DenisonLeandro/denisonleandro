import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { goneResponse } from "@/lib/gone-response";

export const Route = createFileRoute("/comments/$")({
  server: { handlers: { GET: async () => goneResponse() } },
});
