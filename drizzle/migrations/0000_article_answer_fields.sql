ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS summary text,
  ADD COLUMN IF NOT EXISTS faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS author_slug text NOT NULL DEFAULT 'denison-henrique-leandro',
  ADD COLUMN IF NOT EXISTS area_slug text;

UPDATE public.articles SET area_slug = CASE
  WHEN category ~* 'previd|inss' THEN 'previdenciario'
  WHEN category ~* 'trabalh' THEN 'trabalhista'
  WHEN category ~* 'consumidor' THEN 'consumidor'
  WHEN category ~* 'fam[ií]lia' THEN 'familia'
  WHEN category ~* 'contrato' THEN 'contratos'
  WHEN category ~* 'banc' THEN 'bancario'
  WHEN category ~* 'media' THEN 'mediacao'
  ELSE NULL END
WHERE area_slug IS NULL;