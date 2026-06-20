
CREATE POLICY "Public read article-covers"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'article-covers');

CREATE POLICY "Editors/admins upload article-covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-covers'
  AND (has_role(auth.uid(), 'editor'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Editors/admins update article-covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'article-covers'
  AND (has_role(auth.uid(), 'editor'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
)
WITH CHECK (
  bucket_id = 'article-covers'
  AND (has_role(auth.uid(), 'editor'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Editors/admins delete article-covers"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'article-covers'
  AND (has_role(auth.uid(), 'editor'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
);
