import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Denison Henrique Leandro e Advogados Associados" },
      {
        name: "description",
        content:
          "Fale com o escritório Denison Henrique Leandro e Advogados Associados. Unidades em Londrina, Curitiba, Foz do Iguaçu, Ibiporã, Maringá e Florianópolis.",
      },
      { property: "og:title", content: "Contato | Denison Henrique Leandro" },
      {
        property: "og:description",
        content: "Entre em contato com nossas unidades em todo o Brasil.",
      },
    ],
  }),
  component: ContatoPage,
});

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";
const EMAIL = "contato@denisonleandro.adv.br";

type Office = { address: string; phone: string };
type City = { city: string; offices: Office[] };

const cities: City[] = [
  {
    city: "Londrina – PR",
    offices: [
      { address: "Centro — Av. Paraná, 343, 9º andar, sala 902", phone: "(43) 3322-8455" },
      { address: "Região Sul — Av. Aristides de Souza Melo, 26", phone: "(43) 3341-5593" },
      { address: "Região Norte — Av. Saul Elkind, 1503", phone: "(43) 3323-8455" },
    ],
  },
  {
    city: "Curitiba – PR",
    offices: [{ address: "Rua Vicente Machado, 520, Centro", phone: "(41) 99554-0171" }],
  },
  {
    city: "Foz do Iguaçu – PR",
    offices: [{ address: "Rua Xavier da Silva, 868, sala 04", phone: "(45) 3025-3441" }],
  },
  {
    city: "Ibiporã – PR",
    offices: [{ address: "Av. Eng. Francisco Beltrão, 160, 3º andar, sala 15", phone: "(43) 3158-3516" }],
  },
  {
    city: "Maringá – PR",
    offices: [{ address: "Rua Neo Alves Martins, 1632, Centro", phone: "(44) 99804-9956" }],
  },
  {
    city: "Florianópolis – SC",
    offices: [{ address: "Av. Trompowsky, 354, salas 501/502, Centro", phone: "(43) 99680-8308" }],
  },
];

function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Fale conosco"
          title="Contato"
          description="Estamos prontos para atendê-lo em qualquer uma de nossas unidades ou de forma totalmente online."
        />

        {/* Contact CTA */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
            <h2 className="font-serif text-2xl text-deep md:text-3xl">
              Atendimento rápido pelo WhatsApp
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-foreground/75">
              Tire suas dúvidas com um advogado especialista. Respondemos em horário comercial,
              de segunda a sexta-feira.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-elegant transition-all hover:-translate-y-0.5 hover:bg-[#1DA851]"
              >
                <MessageCircle size={18} />
                Falar no WhatsApp — (43) 99680-8308
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy"
              >
                <Mail size={18} />
                {EMAIL}
              </a>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Unidades
              </span>
              <h2 className="mt-4 font-serif text-3xl text-deep md:text-4xl">
                Nossos endereços
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => (
                <div
                  key={c.city}
                  className="flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy text-gold">
                      <MapPin size={18} strokeWidth={1.8} />
                    </div>
                    <h3 className="font-serif text-xl text-navy">{c.city}</h3>
                  </div>
                  <div className="mt-5 h-px w-10 bg-gold" />

                  <div className="mt-5 space-y-5">
                    {c.offices.map((o) => (
                      <div key={o.address}>
                        <p className="text-sm leading-relaxed text-foreground/85">{o.address}</p>
                        <a
                          href={`tel:+55${o.phone.replace(/\D/g, "")}`}
                          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                        >
                          <Phone size={14} />
                          {o.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
