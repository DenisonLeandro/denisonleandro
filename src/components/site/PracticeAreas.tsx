import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AREA_CARDS } from "@/lib/area-cards";
import type { TopicSummary } from "@/lib/area-topics.functions";

/** Equal-size area cards; incomplete last row is centered. */
export function AreaCardsGrid({ topics = [], exclude }: { topics?: TopicSummary[]; exclude?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {AREA_CARDS.filter((a) => a.slug !== exclude).map((a) => {
        const top = topics.filter((t) => t.area_slug === a.slug).slice(0, 2);
        return (
          <article
            key={a.slug}
            className="group flex h-[300px] w-full flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)]"
          >
            <h3 className="font-serif text-xl text-navy">
              <Link to={a.to} className="hover:text-gold">{a.title}</Link>
            </h3>
            <div className="mt-3 h-px w-10 bg-gold" />
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            {top.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {top.map((t) => (
                  <li key={t.slug} className="line-clamp-1 text-sm">
                    <Link to="/areas/$area/$tema" params={{ area: t.area_slug, tema: t.slug }} className="text-navy hover:text-gold">
                      › {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link to={a.to} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-gold transition-all group-hover:gap-2.5">
              Saiba mais <ArrowUpRight size={14} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function PracticeAreas({ topics = [] }: { topics?: TopicSummary[] }) {
  return (
    <section id="areas" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Especialidades</span>
          <h2 className="mt-4 font-serif text-4xl text-deep md:text-5xl">Áreas de Atuação</h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        </div>
        <div className="mt-16">
          <AreaCardsGrid topics={topics} />
        </div>
      </div>
    </section>
  );
}
