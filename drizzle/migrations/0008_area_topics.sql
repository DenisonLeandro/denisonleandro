CREATE TABLE public.area_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area_slug text NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  seo_title text,
  seo_description text,
  summary text,
  content text NOT NULL DEFAULT '',
  faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (area_slug, slug)
);
GRANT SELECT ON public.area_topics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.area_topics TO authenticated;
GRANT ALL ON public.area_topics TO service_role;
ALTER TABLE public.area_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published topics" ON public.area_topics FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Editors read all topics" ON public.area_topics FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'editor') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Editors insert topics" ON public.area_topics FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'editor') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Editors update topics" ON public.area_topics FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'editor') OR public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'editor') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Editors delete topics" ON public.area_topics FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'editor') OR public.has_role(auth.uid(),'admin'));
CREATE OR REPLACE FUNCTION public.area_topics_touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.title IS DISTINCT FROM OLD.title OR NEW.content IS DISTINCT FROM OLD.content
     OR NEW.summary IS DISTINCT FROM OLD.summary OR NEW.faq IS DISTINCT FROM OLD.faq THEN
    NEW.updated_at = now();
  ELSE
    NEW.updated_at = OLD.updated_at;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER update_area_topics_updated_at BEFORE UPDATE ON public.area_topics
FOR EACH ROW EXECUTE FUNCTION public.area_topics_touch_updated_at();