import { MessageCircle, ArrowRight } from "lucide-react";
import escritorioAsset from "@/assets/escritorio.jpg.asset.json";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 placeholder-image-ornament opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Advocacia de Excelência e Credibilidade
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            25 anos defendendo<br />
            <span className="text-white">seus direitos</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-foreground/80">
            Atuação Full Service em Direito Trabalhista, Previdenciário, Consumidor,
            Família, Contratos, Bancário e Mediação.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-elegant transition-all hover:-translate-y-0.5"
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

        <div className="relative">
          <img
            src={escritorioAsset.url}
            alt="Escritório Denison Henrique Leandro e Advogados Associados"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-elegant ring-1 ring-gold/30"
          />
          <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-2xl border-2 border-gold md:block" />
        </div>
      </div>
    </section>
  );
}
