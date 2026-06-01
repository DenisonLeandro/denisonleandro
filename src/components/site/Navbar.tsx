import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "O Escritório", href: "#escritorio" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Profissionais", href: "#profissionais" },
  { label: "Notícias", href: "#noticias" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-gold">
            <span className="font-serif text-xl font-bold">D</span>
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-sm font-semibold text-navy">Denison Henrique Leandro</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Advogados Associados
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-navy"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
          >
            <MessageCircle size={16} />
            Fale no WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-navy lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground"
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
