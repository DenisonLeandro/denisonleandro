import type { FaqItem } from "@/lib/authors";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="font-serif text-2xl text-navy md:text-3xl">Perguntas frequentes</h2>
      <div className="mt-3 h-px w-12 bg-gold" />
      <div className="mt-6 space-y-3">
        {items.map((q) => (
          <details key={q.pergunta} className="group rounded-xl border border-border bg-card p-5 shadow-card">
            <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">{q.pergunta}</summary>
            <p className="mt-3 leading-relaxed text-foreground/85">{q.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const faqSchema = (items: FaqItem[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((q) => ({ "@type": "Question", name: q.pergunta, acceptedAnswer: { "@type": "Answer", text: q.resposta } })),
});
