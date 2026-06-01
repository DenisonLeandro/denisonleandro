import { Mail, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/site/PageHeader";

const WHATSAPP_URL =
  "https://wa.me/5543996808308?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

type Props = {
  name: string;
  oab: string;
  email: string;
  bio: string;
  photo: string | null;
};

export function LawyerDetail({ name, oab, email, bio, photo }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHeader eyebrow="Equipe" title={name} description={oab} />

        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <article className="grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-card md:p-10 lg:grid-cols-[260px_1fr] lg:items-start">
              <div className="flex justify-center lg:justify-start">
                {photo ? (
                  <img
                    src={photo}
                    alt={name}
                    className="h-56 w-56 rounded-full object-cover object-top ring-2 ring-gold/30"
                  />
                ) : (
                  <div className="h-56 w-56 rounded-full placeholder-image ring-2 ring-gold/30" />
                )}
              </div>

              <div>
                <h2 className="font-serif text-2xl text-navy md:text-3xl">{name}</h2>
                <div className="mt-3 h-px w-12 bg-gold" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  {oab}
                </p>

                <p className="mt-6 text-base leading-relaxed text-foreground/85">{bio}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
                  >
                    <Mail size={16} strokeWidth={1.8} />
                    {email}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-elegant"
                  >
                    <MessageCircle size={16} />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
