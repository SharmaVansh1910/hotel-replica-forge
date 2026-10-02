import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Check, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { asRecords, asStrings, getProperty, getRestaurants, getReviews, getRooms } from "@/lib/data";

export const Route = createFileRoute("/hotels/$slug")({
  head: () => ({ meta: [{ title: "Hotel details | Pride Vacations" }, { name: "description", content: "Explore your next Pride Vacations stay, from rooms and dining to the details that make it yours." }, { property: "og:title", content: "Hotel details | Pride Vacations" }, { property: "og:description", content: "Explore your next Pride Vacations stay with Pride Vacations." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HotelDetails,
});

function HotelDetails() {
  const { slug } = Route.useParams();
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: () => getProperty(slug),
  });
  useEffect(() => {
    if (property && property.slug !== slug) {
      window.history.replaceState(
        {},
        "",
        `/hotels/${property.slug}`
      );
    }
  }, [property, slug]);
  const { data: rooms = [] } = useQuery({ queryKey: ["rooms", property?.id], queryFn: () => getRooms(property?.id ?? ""), enabled: Boolean(property?.id) });
  const { data: restaurants = [] } = useQuery({ queryKey: ["restaurants", property?.id], queryFn: () => getRestaurants(property?.id ?? ""), enabled: Boolean(property?.id) });
  const { data: reviews = [] } = useQuery({ queryKey: ["reviews", property?.id], queryFn: () => getReviews(property?.id ?? ""), enabled: Boolean(property?.id) });
  if (isLoading) return <div className="mx-auto max-w-7xl px-5 py-24"><div className="h-96 animate-pulse rounded-md bg-secondary" /></div>;
  if (!property) return <div className="mx-auto max-w-7xl px-5 py-24"><h1 className="font-display text-5xl">Stay not found</h1><Link to="/hotels" className="mt-5 inline-block underline">Back to hotels</Link></div>;
  const gallery = asStrings(property.gallery);
  const amenities = asRecords(property.amenities);
  return <div><section className="relative h-[70vh] min-h-[520px] overflow-hidden bg-primary text-primary-foreground"><img src={property.hero_image ?? gallery[0]} alt={`Stay in ${property.city}, ${property.state}`} className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="absolute inset-0 bg-primary/45" /><div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 lg:px-8 lg:pb-16"><div className="max-w-3xl"><p className="mb-4 flex items-center gap-2 text-sm text-primary-foreground/80"><MapPin className="h-4 w-4" /> {property.city}, {property.state}</p><h1 className="font-display text-6xl leading-none md:text-8xl">{property.city}, {property.state}</h1><p className="mt-5 max-w-xl text-lg text-primary-foreground/80">{property.tagline}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/book/$slug" params={{ slug: property.slug }}>Book your stay <ArrowUpRight /></Link></Button><Button asChild variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/reserve">Reserve now</Link></Button></div></div></div></section><section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-28"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Welcome in</p><h2 className="mt-4 font-display text-5xl leading-tight">{property.welcome_text}</h2><p className="mt-7 whitespace-pre-line text-base leading-8 text-muted-foreground">{property.about}</p></div><div className="border-l border-border pl-7"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">The highlights</p><div className="mt-6 grid gap-5">{asStrings(property.highlights).map((highlight) => <p key={highlight} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" /> {highlight}</p>)}</div></div></section><section className="border-y border-border bg-secondary/40"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Stay awhile</p><h2 className="mt-3 font-display text-5xl">Rooms made for rest.</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <article key={room.id} className="overflow-hidden rounded-md border border-border bg-card"><div className="aspect-[4/3] overflow-hidden"><img src={asStrings(room.images)[0] ?? property.hero_image ?? ""} alt={room.name} className="h-full w-full object-cover" /></div><div className="p-5"><h3 className="font-display text-2xl">{room.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{room.description}</p><p className="mt-5 text-sm">From <strong>₹{room.base_price.toLocaleString("en-IN")}</strong> / night</p></div></article>)}</div>{!rooms.length && <p className="mt-7 text-muted-foreground">Room details are being refreshed. Contact us to plan your stay.</p>}</div></section>{restaurants.length > 0 && <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good food, close by</p><h2 className="mt-3 font-display text-5xl">On the table</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{restaurants.map((restaurant) => <article key={restaurant.id} className="border-b border-border pb-7"><h3 className="font-display text-3xl">{restaurant.name}</h3><p className="mt-2 text-sm text-accent">{restaurant.cuisine} · {restaurant.timing}</p><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{restaurant.description}</p></article>)}</div></section>}<section className="border-t border-border bg-accent px-5 py-16 text-accent-foreground lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.2em]">Make it yours</p><h2 className="mt-3 font-display text-5xl">Ready when you are.</h2></div><Button asChild variant="outline" size="lg" className="border-accent-foreground/40 bg-transparent text-accent-foreground hover:bg-accent-foreground hover:text-accent"><Link to="/book/$slug" params={{ slug: property.slug }}>Book your stay <ArrowUpRight /></Link></Button></div></section>{reviews.length > 0 && <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="flex items-center gap-2"><Star className="h-5 w-5 fill-accent text-accent" /> {property.rating.toFixed(1)} guest rating</div></section>}</div>;
}