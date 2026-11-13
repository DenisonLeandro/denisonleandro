import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppButton({ message, label = "Falar com especialista no WhatsApp" }: { message: string; label?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-elegant"
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
