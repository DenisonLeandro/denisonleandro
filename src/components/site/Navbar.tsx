import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

const links = [
  { label: "Início", to: "/" as const },
  { label: "O Escritório", to: "/escritorio" as const },
  { label: "Áreas de Atuação", to: "/areas-de-atuacao" as const },
  { label: "Profissionais", to: "/profissionais" as const },
  { label: "Notícias", to: "/noticias" as const },
  { label: "Contato", to: "/contato" as const },
];

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src={logoAsset.url} alt="DL Advogados" className="h-full w-full object-contain" />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-sm font-semibold text-white">Denison Henrique Leandro</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
              Advogados Associados
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-white" }}
              inactiveProps={{ className: "text-white/80" }}
              className="text-sm font-medium transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-elegant"
          >
            <MessageCircle size={16} />
            Fale no WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-navy lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1DA851]"
            >
              <MessageCircle size={16} />
              Fale no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
