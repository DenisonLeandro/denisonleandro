import { MapPin } from "lucide-react";

const cities = [
  { name: "Londrina", state: "PR — Sede" },
  { name: "Curitiba", state: "PR" },
  { name: "Foz do Iguaçu", state: "PR" },
  { name: "Ibiporã", state: "PR" },
  { name: "Maringá", state: "PR" },
  { name: "Florianópolis", state: "SC" },
];

export function Locations() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Onde estamos</span>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">Estamos presentes em</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <div
              key={c.name}
              className="group flex items-center gap-5 rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold">
                <MapPin size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-navy">{c.name}</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.state}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
