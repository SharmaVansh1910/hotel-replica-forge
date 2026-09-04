import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { HotelCard } from "@/components/hotel-card";
import { getProperties } from "@/lib/data";

export const Route = createFileRoute("/hotels")({
  head: () => ({ meta: [{ title: "Our Hotels | Qcent Hotels" }, { name: "description", content: "Find your next Qcent stay across India's most memorable places." }, { property: "og:title", content: "Our Hotels | Qcent Hotels" }, { property: "og:description", content: "Find your next Qcent stay across India's most memorable places." }] }),
  component: HotelsPage,
});

function HotelsPage() {
  const { data: properties = [], isLoading } = useQuery({ queryKey: ["properties"], queryFn: getProperties });
  return <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">The collection</p><h1 className="mt-4 max-w-2xl font-display text-6xl leading-none">Places with a point of view.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">From forest air to city energy, find a stay that fits the way you want to feel.</p><div className="mt-14">{isLoading ? <div className="h-80 animate-pulse rounded-md bg-secondary" /> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties.map((property) => <HotelCard key={property.id} property={property} />)}</div>}</div></div>;
}