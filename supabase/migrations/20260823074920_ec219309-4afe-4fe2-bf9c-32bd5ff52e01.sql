
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

DROP POLICY "public read published properties" ON public.properties;
CREATE POLICY "public read published properties" ON public.properties FOR SELECT USING (status = 'published');
CREATE POLICY "staff read all properties" ON public.properties FOR SELECT TO authenticated USING (host_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

DROP POLICY "public read pg properties" ON public.pg_properties;
CREATE POLICY "public read pg properties" ON public.pg_properties FOR SELECT USING (status = 'published');
CREATE POLICY "admin read pg properties" ON public.pg_properties FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY "public read reviews" ON public.reviews;
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT USING (approved = true);
CREATE POLICY "own reviews read" ON public.reviews FOR SELECT TO authenticated USING (user_id = auth.uid());
