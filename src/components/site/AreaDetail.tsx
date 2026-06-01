import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

type Props = {
  title: string;
  intro: string;
  items: string[];
};

export function AreaDetail({ title, intro, items }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader eyebrow="Área de Atuação" title={title} description={intro} />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-10">
              <h2 className="font-serif text-2xl text-navy md:text-3xl">Serviços</h2>
              <div className="mt-3 h-px w-12 bg-gold" />
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-elegant"
                >
                  <MessageCircle size={16} />
                  Falar com especialista no WhatsApp
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
