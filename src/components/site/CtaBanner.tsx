import { MessageCircle } from "lucide-react";

export function CtaBanner() {
  return (
    <section id="contato" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gold p-10 shadow-elegant md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-navy/10" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-navy/5" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/70">
                Atendimento Direto
              </span>
              <h2 className="mt-3 font-serif text-3xl text-deep md:text-4xl lg:text-5xl">
                Tire suas dúvidas com um advogado especialista
              </h2>
            </div>
            <a
              href="https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-[#1DA851]"
            >
              <MessageCircle size={20} /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
