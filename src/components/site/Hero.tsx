import { MessageCircle, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 placeholder-image-ornament opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
            <img
              src={logoAsset.url}
              alt="DL Advogados"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Denison Leandro Advogados Associados
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
