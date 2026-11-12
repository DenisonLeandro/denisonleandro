import { MessageCircle } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { whatsappUrl, articleMessage } from "@/lib/whatsapp";

const PAGES: Record<string, string> = {
  "/": "na página principal",
  "/contato": "na página de Contato",
  "/escritorio": "na página do Escritório",
  "/profissionais": "na página de Profissionais",
  "/areas-de-atuacao": "na página de Áreas de Atuação",
  "/noticias": "na página de Notícias",
};

export function FloatingWhatsApp() {
  const { pathname, matches } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, matches: s.matches }),
  });
  const article = matches
    .map((m) => (m.loaderData as { article?: { title?: string } } | undefined)?.article)
    .find((a) => a?.title);
  let message: string;
  if (article?.title) message = articleMessage(article.title);
  else if (pathname === "/acidente-de-trabalho") message = articleMessage("Acidente de Trabalho");
  else {
    const nice = (slug: string) =>
      slug.split("-").map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
    const area = pathname.match(/^\/areas\/([^/]+)/);
    const equipe = pathname.match(/^\/equipe\/([^/]+)/);
    const where =
      PAGES[pathname] ??
      (area ? `na área de ${nice(area[1])}` : equipe ? `no perfil de ${nice(equipe[1])}` : "no site");
    message = `Olá! Estava navegando ${where} do site Denison Leandro e gostaria de falar com um advogado.`;
  }
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#1DA851] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
