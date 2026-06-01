import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-all hover:scale-110 hover:bg-[#B8470A] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
