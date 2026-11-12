ALTER TABLE public.articles DISABLE TRIGGER update_articles_updated_at;
ALTER TABLE public.articles ADD COLUMN is_featured boolean NOT NULL DEFAULT false;
CREATE UNIQUE INDEX articles_one_featured ON public.articles (is_featured) WHERE is_featured;
CREATE OR REPLACE FUNCTION public.unset_other_featured() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.is_featured THEN
    UPDATE public.articles SET is_featured = false WHERE is_featured AND id <> NEW.id;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER articles_single_featured BEFORE INSERT OR UPDATE OF is_featured ON public.articles
FOR EACH ROW WHEN (NEW.is_featured) EXECUTE FUNCTION public.unset_other_featured();
UPDATE public.articles SET is_featured = true WHERE slug = 'vendedor-externo-tem-direito-a-horas-extras-entenda-quando-a-empresa-deve-pagar';
ALTER TABLE public.articles ENABLE TRIGGER update_articles_updated_at;