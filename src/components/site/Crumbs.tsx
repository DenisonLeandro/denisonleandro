import { Fragment } from "react";

export function Crumbs({ items }: { items: Array<[string, string]> }) {
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map(([label, href], i) => (
          <Fragment key={href}>
            {i > 0 && <li aria-hidden="true">›</li>}
            <li>
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-navy">{label}</span>
              ) : (
                <a href={href} className="hover:text-gold">{label}</a>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
