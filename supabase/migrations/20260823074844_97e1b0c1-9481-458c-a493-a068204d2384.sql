
-- ROLES
CREATE TYPE public.app_role AS ENUM ('user','host','admin');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile ins" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile upd" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name',''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- PROPERTIES
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text,
  state text NOT NULL,
  city text NOT NULL,
  address text,
  hero_image text,
  gallery jsonb NOT NULL DEFAULT '[]',
  welcome_text text,
  about text,
  highlights jsonb NOT NULL DEFAULT '[]',
  amenities jsonb NOT NULL DEFAULT '[]',
  experiences jsonb NOT NULL DEFAULT '[]',
  nearby jsonb NOT NULL DEFAULT '[]',
  policies jsonb NOT NULL DEFAULT '[]',
  contact jsonb NOT NULL DEFAULT '{}',
  coordinates jsonb NOT NULL DEFAULT '{}',
  seo jsonb NOT NULL DEFAULT '{}',
  property_type text NOT NULL DEFAULT 'Resort',
  rating numeric NOT NULL DEFAULT 4.5,
  starting_price integer NOT NULL DEFAULT 3500,
  reserve_url text,
  status text NOT NULL DEFAULT 'published',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  host_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.properties (state);
CREATE INDEX ON public.properties (city);
GRANT SELECT ON public.properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published properties" ON public.properties FOR SELECT USING (status = 'published' OR host_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "hosts insert own properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (host_id = auth.uid() AND (public.has_role(auth.uid(),'host') OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "hosts update own properties" ON public.properties FOR UPDATE TO authenticated USING (host_id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (host_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "hosts delete own properties" ON public.properties FOR DELETE TO authenticated USING (host_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Accommodation',
  description text,
  images jsonb NOT NULL DEFAULT '[]',
  size_sqft integer,
  bed_type text,
  max_occupancy integer NOT NULL DEFAULT 2,
  amenities jsonb NOT NULL DEFAULT '[]',
  base_price integer NOT NULL DEFAULT 3500,
  meal_plans jsonb NOT NULL DEFAULT '[]',
  cancellation_policy text,
  total_inventory integer NOT NULL DEFAULT 5,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (property_id, slug)
);
GRANT SELECT ON public.rooms TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO authenticated;
GRANT ALL ON public.rooms TO service_role;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "host manage rooms" ON public.rooms FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.host_id = auth.uid() OR public.has_role(auth.uid(),'admin'))))
WITH CHECK (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.host_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

CREATE TABLE public.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  cuisine text,
  images jsonb NOT NULL DEFAULT '[]',
  timing text,
  seating text,
  features jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.restaurants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.restaurants TO authenticated;
GRANT ALL ON public.restaurants TO service_role;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "host manage restaurants" ON public.restaurants FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.host_id = auth.uid() OR public.has_role(auth.uid(),'admin'))))
WITH CHECK (EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND (p.host_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- BOOKINGS
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('QC' || upper(substr(md5(random()::text),1,8))),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  check_in date NOT NULL,
  check_out date NOT NULL,
  nights integer NOT NULL,
  adults integer NOT NULL DEFAULT 2,
  children integer NOT NULL DEFAULT 0,
  rooms_count integer NOT NULL DEFAULT 1,
  meal_plan text NOT NULL DEFAULT 'EP',
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  special_requests text,
  base_amount numeric NOT NULL DEFAULT 0,
  meal_amount numeric NOT NULL DEFAULT 0,
  taxes numeric NOT NULL DEFAULT 0,
  service_fee numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.bookings (room_id, check_in, check_out);
GRANT SELECT, INSERT, UPDATE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bookings read" ON public.bookings FOR SELECT TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin')
  OR EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.host_id = auth.uid()));
CREATE POLICY "own bookings insert" ON public.bookings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "own bookings update" ON public.bookings FOR UPDATE TO authenticated USING (
  user_id = auth.uid() OR public.has_role(auth.uid(),'admin')
  OR EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id AND p.host_id = auth.uid()));

-- ENQUIRY TABLES
CREATE TABLE public.reservation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
  check_in date, check_out date,
  adults integer NOT NULL DEFAULT 2,
  children integer NOT NULL DEFAULT 0,
  rooms_count integer NOT NULL DEFAULT 1,
  room_preference text,
  name text NOT NULL, email text NOT NULL, phone text NOT NULL, message text,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.event_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, phone text NOT NULL, email text NOT NULL,
  event_type text NOT NULL, event_date date, guests integer,
  property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
  budget text, message text,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, email text NOT NULL, phone text, message text NOT NULL,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.pg_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL, city text NOT NULL, state text NOT NULL, address text,
  description text, hero_image text, gallery jsonb NOT NULL DEFAULT '[]',
  amenities jsonb NOT NULL DEFAULT '[]',
  room_types jsonb NOT NULL DEFAULT '[]',
  starting_price integer NOT NULL DEFAULT 9000,
  contact jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.pg_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pg_property_id uuid REFERENCES public.pg_properties(id) ON DELETE SET NULL,
  room_type text, move_in date,
  name text NOT NULL, email text NOT NULL, phone text NOT NULL, message text,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservation_requests, public.event_enquiries, public.contact_messages, public.pg_enquiries TO anon, authenticated;
GRANT SELECT, UPDATE ON public.reservation_requests, public.event_enquiries, public.contact_messages, public.pg_enquiries TO authenticated;
GRANT ALL ON public.reservation_requests, public.event_enquiries, public.contact_messages, public.pg_enquiries TO service_role;
GRANT SELECT ON public.pg_properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pg_properties TO authenticated;
GRANT ALL ON public.pg_properties TO service_role;

ALTER TABLE public.reservation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pg_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pg_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone submit reservation" ON public.reservation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read reservation" ON public.reservation_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update reservation" ON public.reservation_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "anyone submit event" ON public.event_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read event" ON public.event_enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update event" ON public.event_enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "anyone submit contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read contact" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update contact" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "anyone submit pg enquiry" ON public.pg_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read pg enquiry" ON public.pg_enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update pg enquiry" ON public.pg_enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "public read pg properties" ON public.pg_properties FOR SELECT USING (status = 'published' OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage pg properties" ON public.pg_properties FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- REVIEWS + WISHLIST
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text, body text,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read reviews" ON public.reviews FOR SELECT USING (approved = true OR user_id = auth.uid());
CREATE POLICY "user insert review" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "user update review" ON public.reviews FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "user delete review" ON public.reviews FOR DELETE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, property_id)
);
GRANT SELECT, INSERT, DELETE ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlists TO service_role;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wishlist" ON public.wishlists FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
