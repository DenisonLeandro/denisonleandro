ALTER TABLE public.articles DISABLE TRIGGER update_articles_updated_at;
UPDATE public.articles SET summary = '[TESTE] Sim, metas abusivas podem gerar indenização quando a cobrança ultrapassa os limites legais. Este texto é apenas um teste de layout e será apagado.',
faq = '[{"pergunta":"[TESTE] Toda meta alta gera indenização?","resposta":"Não. Esta resposta é apenas um teste de layout e será apagada."},{"pergunta":"[TESTE] Posso pedir indenização depois de sair da empresa?","resposta":"Resposta de teste."}]'::jsonb
WHERE slug = 'metas-impossiveis-no-trabalho-podem-gerar-direito-a-indenizacao';
ALTER TABLE public.articles ENABLE TRIGGER update_articles_updated_at;