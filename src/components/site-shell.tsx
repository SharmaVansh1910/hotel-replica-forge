import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight, Instagram, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProperties, type Property } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type NavigationProperty = Pick<Property, "id" | "slug">;
type Navigation = Array<{ state: string; cities: Array<{ city: string; properties: NavigationProperty[] }> }>;

const fallbackNavigation: Navigation = [
  { state: "Uttarakhand", cities: [{ city: "Rishikesh", properties: [{ id: "woods", slug: "qcent-woods-resort-spa" }, { id: "pacific", slug: "pacific-inn-360-degree-resort" }] }] },
  { state: "Haryana", cities: [{ city: "Gurugram", properties: [{ id: "gurugram", slug: "qcent-hotel-gurugram" }] }] },
  { state: "Himachal Pradesh", cities: [{ city: "Shimla", properties: [{ id: "shimla", slug: "qcent-shimla" }] }] },
];

function navigationFromProperties(properties: Property[]) {
  if (!properties.length) return fallbackNavigation;
  return Object.entries(
    properties.reduce<Record<string, Record<string, NavigationProperty[]>>>((states, property) => {
      const state = states[property.state] ?? (states[property.state] = {});
      const city = state[property.city] ?? (state[property.city] = []);
      city.push({ id: property.id, slug: property.slug });
      return states;
    }, {}),
  ).map(([state, cities]) => ({
    state,
    cities: Object.entries(cities).map(([city, cityProperties]) => ({ city, properties: cityProperties })),
  }));
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  useEffect(() => {
  if (!hotelsOpen) return;

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (
      !target.closest("[data-explore-trigger]") &&
      !target.closest("[data-explore-menu]")
    ) {
      setHotelsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [hotelsOpen]);
  const [signedIn, setSignedIn] = useState(false);
  const { data: properties = [] } = useQuery({ queryKey: ["properties", "navigation"], queryFn: getProperties, staleTime: 60_000 });
  const navigation = navigationFromProperties(properties);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") setSignedIn(Boolean(session));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => { setMobileOpen(false); setHotelsOpen(false); }}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">PV</span>
            <span className="font-display text-2xl font-semibold tracking-tight">Pride Vacations<span className="text-accent">.</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <Link to="/hotels" className="transition-colors hover:text-accent" onClick={() => setHotelsOpen(false)}>Our destinations</Link>
          <Button
            type="button"
            variant="ghost"
            className="h-auto gap-1 rounded-none px-0 py-0 font-medium hover:bg-transparent hover:text-accent"
            onClick={() => setHotelsOpen((open) => !open)}
            data-explore-trigger
         >
            Explore
            <ChevronDown
              className={`h-4 w-4 transition-transform ${hotelsOpen ? "rotate-180" : ""}`}
            />
          </Button>            
            <Link to="/events" className="transition-colors hover:text-accent" onClick={() => setHotelsOpen(false)}>Events</Link>
            <Link to="/pg" className="transition-colors hover:text-accent" onClick={() => setHotelsOpen(false)}>HomeStay</Link>
            {/* <Link to="/Farmhouses" className="transition-colors hover:text-accent" onClick={() => setHotelsOpen(false)}>Farmhouses</Link> */}
            <Link to="/contact" className="transition-colors hover:text-accent" onClick={() => setHotelsOpen(false)}>Contact</Link>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+919818041059" aria-label="Call Pride Vacations" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"><Phone className="h-4 w-4" /></a>
            <Button asChild variant="ghost" size="sm"><Link to={signedIn ? "/dashboard" : "/auth"}><UserRound /> {signedIn ? "My stays" : "Sign in"}</Link></Button>
            <Button asChild size="sm"><Link to="/reserve">Reserve now <ArrowUpRight /></Link></Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {hotelsOpen && <DesktopMenu navigation={navigation} onClose={() => setHotelsOpen(false)} />}
        {mobileOpen && <MobileMenu navigation={navigation} signedIn={signedIn} onClose={() => setMobileOpen(false)} />}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div><div className="mb-4 font-display text-4xl">Pride Vacations<span className="text-accent">.</span></div><p className="max-w-sm text-sm leading-7 text-primary-foreground/70">Stays with a story. Thoughtful hotels, warm service and places worth taking the long way to.</p></div>
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Discover</p><div className="grid gap-3 text-sm text-primary-foreground/75"><Link to="/hotels">Our hotels</Link><Link to="/events">Events & weddings</Link><Link to="/pg">HomeStay</Link></div></div>
          <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Stay in touch</p><p className="text-sm leading-6 text-primary-foreground/75"><a href="mailto:prideshotels@gmail.com">prideshotels@gmail.com</a><br /><a href="tel:+919818041059">+91 98180 41059</a></p><div className="mt-5 flex gap-3"><a href="https://instagram.com" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20"><Instagram className="h-4 w-4" /></a></div></div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-primary-foreground/15 px-5 py-5 text-xs text-primary-foreground/50 lg:px-8">© 2026 Pride Vacations. Made for slow mornings and good stories.</div>
      </footer>
    </div>
  );
}

function DesktopMenu({
  navigation,
  onClose,
}: {
  navigation: Navigation;
  onClose: () => void;
}) {
  return (
    <div
      data-explore-menu
      className="absolute left-0 right-0 top-[4.5rem] border-b border-border bg-card shadow-lg"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-10 px-8 py-8">
        {navigation.map((item) => (
          <div key={item.state}>
            <p className="mb-4 font-display text-xl">{item.state}</p>

            {item.cities.map((city) => (
              <div key={city.city} className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {city.city}
                </p>

                <div className="grid gap-2 text-sm">
                  {city.properties.map((property) => (
                    <Link
                      key={property.id}
                      to="/hotels/$slug"
                      params={{ slug: property.slug }}
                      onClick={onClose}
                      className="hover:text-accent"
                    >
                      {city.city}
                      {city.properties.length > 1
                        ? ` · Stay ${city.properties.indexOf(property) + 1}`
                        : ""}{" "}
                      <ArrowUpRight className="ml-1 inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ navigation, signedIn, onClose }: { navigation: Navigation; signedIn: boolean; onClose: () => void }) {
  const [openState, setOpenState] = useState<string | null>(null);
  return <div className="border-t border-border bg-card px-5 py-5 lg:hidden"><div className="grid gap-1"><Link to="/hotels" onClick={onClose} className="border-b border-border py-3 font-medium">Our destinations</Link>{navigation.map((item) => <div key={item.state} className="border-b border-border"><Button type="button" variant="ghost" className="h-auto w-full justify-between rounded-none px-0 py-3 font-medium" onClick={() => setOpenState(openState === item.state ? null : item.state)}>{item.state}<ChevronDown className={`h-4 w-4 transition-transform ${openState === item.state ? "rotate-180" : ""}`} /></Button>{openState === item.state && <div className="grid gap-4 pb-4 pl-3">{item.cities.map((city) => <div key={city.city}><p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{city.city}</p>{city.properties.map((property) => <Link key={property.id} to="/hotels/$slug" params={{ slug: property.slug }} onClick={onClose} className="block py-1 text-sm">{city.city}{city.properties.length > 1 ? ` · Stay ${city.properties.indexOf(property) + 1}` : ""}</Link>)}</div>)}</div>}</div>)}<Link to="/events" onClick={onClose} className="border-b border-border py-3 font-medium">Events</Link><Link to="/pg" onClick={onClose} className="border-b border-border py-3 font-medium">PV PG & Co-Living</Link><Link to="/contact" onClick={onClose} className="border-b border-border py-3 font-medium">Contact</Link><Button asChild className="mt-4"><Link to={signedIn ? "/dashboard" : "/auth"} onClick={onClose}>{signedIn ? "My stays" : "Sign in"} <UserRound /></Link></Button><Button asChild variant="outline" className="mt-2"><Link to="/reserve" onClick={onClose}>Reserve now <ArrowUpRight /></Link></Button></div></div>;
}
