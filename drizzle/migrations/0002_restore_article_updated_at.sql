ALTER TABLE public.articles DISABLE TRIGGER update_articles_updated_at;
UPDATE public.articles
SET updated_at = COALESCE(published_at, created_at)
WHERE updated_at = '2026-11-12 02:14:37.298661+00'
  AND slug NOT IN (
    'fim-da-escala-6x1-congresso-aprova-mudanca-na-jornada-de-trabalho-veja-o-que-muda',
    'estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir',
    'acidente-de-trabalho-estabilidade-apos-acidente-de-trabalho-quanto-tempo-a-empresa-nao-pode-demitir',
    'fim-da-escala-6x1-o-que-pode-mudar-para-quem-trabalha-aos-domingos'
  );
ALTER TABLE public.articles ENABLE TRIGGER update_articles_updated_at;