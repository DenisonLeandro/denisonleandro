import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import escritorioAsset from "@/assets/escritorio-v2.jpg.asset.json";

export function About() {
  return (
    <section id="escritorio" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative">
          <img
            src={escritorioAsset.url}
            alt="Escritório Denison Leandro e Advogados Associados"
            className="aspect-[5/6] w-full rounded-2xl object-cover shadow-elegant ring-1 ring-gold/30"
          />
          <div className="absolute -right-5 -top-5 hidden h-28 w-28 rounded-2xl border-2 border-gold md:block" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Quem somos</span>
          <h2 className="mt-4 font-serif text-4xl text-deep md:text-5xl">O Escritório</h2>
          <div className="mt-6 h-px w-16 bg-gold" />
          <p className="mt-8 text-base leading-relaxed text-foreground/80 md:text-lg">
            Com sede em Londrina-PR e filiais em Ibiporã, Curitiba, Maringá, Foz do Iguaçu
            e Florianópolis, o escritório tem como objetivo a excelência na prestação de
            serviços jurídicos, sempre com transparência e credibilidade, firmando laços
            de parceria e confiança. Priorizamos a busca da melhor solução para cada cliente.
          </p>
          <Link
            to="/escritorio"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
          >
            Saiba mais <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
