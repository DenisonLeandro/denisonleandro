ALTER TABLE public.articles DISABLE TRIGGER update_articles_updated_at;
UPDATE public.articles SET summary = NULL, faq = '[]'::jsonb
WHERE slug = 'metas-impossiveis-no-trabalho-podem-gerar-direito-a-indenizacao';
ALTER TABLE public.articles ENABLE TRIGGER update_articles_updated_at;