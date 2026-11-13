import { getAuthor } from "@/lib/authors";

const SAUDE_CRED = "Pós-graduado em Direito da Saúde e Direito Médico pelo Hospital Israelita Albert Einstein";

/** Author box (Dr. Denison). For health pages shows the health post-graduation. */
export function AuthorBox({ area }: { area?: string }) {
  const a = getAuthor("denison-henrique-leandro");
  const name = "Dr. Denison Henrique Leandro";
  return (
    <aside aria-label="Sobre o autor" className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-start">
      {a.photo && <img src={a.photo} alt="Foto de Dr. Denison Leandro" width={96} height={96} loading="lazy" className="h-24 w-24 shrink-0 rounded-full object-cover" />}
      <div className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Quem escreve</p>
        <p className="mt-1 font-serif text-xl text-navy">
          <a href={`/equipe/${a.slug}`} className="hover:text-gold">{name}</a>
        </p>
        <p className="text-sm text-muted-foreground">{a.oab} · Sócio fundador</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          {area === "saude" ? `${SAUDE_CRED}. Especialista em Direito do Trabalho, pós-graduado pela FGV.` : a.specialty}
        </p>
      </div>
    </aside>
  );
}
