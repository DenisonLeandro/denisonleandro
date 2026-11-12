
- Article body rendering goes through src/lib/article-content.ts (plain text/HTML → semantic HTML with H2 ids + TOC); keep heading-detection rules there and covered by its test, because the stored content is never rewritten.
- Data-fix migrations on articles must disable trigger update_articles_updated_at, because updated_at feeds dateModified and "Atualizado em".
