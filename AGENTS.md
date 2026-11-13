
- Article body rendering goes through src/lib/article-content.ts (plain text/HTML → semantic HTML with H2 ids + TOC); keep heading-detection rules there and covered by its test, because the stored content is never rewritten.
- Data-fix migrations on articles must disable trigger update_articles_updated_at, because updated_at feeds dateModified and "Atualizado em".
- Area topic pages live in table area_topics and render through the generic route areas.$area.$tema.tsx; area order/card text come from src/lib/area-cards.ts, so every listing (home, /areas-de-atuacao, footer, "Outras áreas") stays consistent.
- Unpublished topics return a real 404 from SSR; editors see the draft client-side via the route's notFoundComponent (RLS lets editors read drafts), so crawlers never get draft HTML.
