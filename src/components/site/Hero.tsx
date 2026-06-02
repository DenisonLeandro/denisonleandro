import { MessageCircle, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 placeholder-image-ornament opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6 md:text-left">
            <span className="flex h-28 w-28 shrink-0 items-center justify-center md:h-36 md:w-36 lg:h-44 lg:w-44">
              <img
                src={logoAsset.url}
                alt="DL Advogados"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-3xl font-semibold text-white md:text-5xl lg:text-6xl">
                Denison Leandro
              </span>
              <span className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70 md:text-sm lg:text-base">
                Advogados Associados
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/80">
            Atuação Full Service em Direito Trabalhista, Previdenciário, Consumidor,
            Família, Contratos, Bancário e Mediação.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-[#1DA851]"
            >
              <MessageCircle size={18} /> Fale no WhatsApp
            </a>
            <a
              href="#areas"
              className="inline-flex items-center gap-2 rounded-md border border-gold/60 px-6 py-3.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-gold/10"
            >
              Conheça as Áreas de Atuação <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
