import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProperties, asStrings } from "@/lib/data";

export const Route = createFileRoute("/farmhouses")({
  head: () => ({
    meta: [
      { title: "Farmhouses | Pride Vacations" },
      {
        name: "description",
        content: "Private farmhouse stays with comfort, space and beautiful surroundings.",
      },
      { property: "og:title", content: "Farmhouses | Pride Vacations" },
      {
        property: "og:description",
        content: "Private farmhouse stays from Pride Vacations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmhousesPage,
});

function FarmhousesPage() {
  const { data: places = [], isLoading } = useQuery({
    queryKey: ["farmhouses"],
    queryFn: getProperties,
    select: (properties) =>
      properties.filter(
        (property) =>
          property.property_type?.toLowerCase().includes("farm"),
      ),
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        Farmhouses
      </p>

      <h1 className="mt-4 max-w-2xl font-display text-6xl leading-none">
        Space to slow down.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
        Relaxed farmhouse stays with more space, privacy and everything you
        need to enjoy your time away.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="h-72 animate-pulse rounded-md bg-secondary" />
        ) : places.length ? (
          places.map((place) => (
            <article
              key={place.id}
              className="overflow-hidden rounded-md border border-border bg-card"
            >
              <div className="aspect-[16/8] overflow-hidden">
                <img
                  src={place.hero_image ?? asStrings(place.gallery)[0] ?? ""}
                  alt={`${place.name} in ${place.city}, ${place.state}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {place.city}, {place.state}
                </p>

                <h2 className="mt-2 font-display text-3xl">
                  {place.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {place.description ?? place.tagline ?? ""}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              Farmhouse stays are coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
