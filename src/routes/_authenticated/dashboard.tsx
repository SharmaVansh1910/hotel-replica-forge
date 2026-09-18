import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, LogOut, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [
    { title: "My stays | Qcent Hotels" },
    { name: "description", content: "Manage your Qcent Hotels reservations and account details." },
    { property: "og:title", content: "My stays | Qcent Hotels" },
    { property: "og:description", content: "Manage your Qcent Hotels reservations and account details." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ["current-user"], queryFn: async () => (await supabase.auth.getUser()).data.user });
  const { data: bookings = [], isLoading } = useQuery({ queryKey: ["my-bookings"], queryFn: async () => {
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><div><Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back to Qcent</Link><p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Your account</p><h1 className="mt-3 font-display text-6xl leading-none">My stays.</h1><p className="mt-4 text-muted-foreground">{user?.email ?? "Your Qcent account"}</p></div><Button variant="outline" onClick={signOut}><LogOut /> Sign out</Button></div><section className="mt-14 grid gap-6 md:grid-cols-3"><div className="rounded-md border border-border bg-card p-6"><UserRound className="h-5 w-5 text-accent" /><p className="mt-8 text-sm text-muted-foreground">Account</p><p className="mt-1 font-medium">{user?.email}</p></div><div className="rounded-md border border-border bg-card p-6"><CalendarDays className="h-5 w-5 text-accent" /><p className="mt-8 text-sm text-muted-foreground">Reservations</p><p className="mt-1 font-display text-3xl">{bookings.length}</p></div><div className="rounded-md border border-border bg-card p-6"><MapPin className="h-5 w-5 text-accent" /><p className="mt-8 text-sm text-muted-foreground">Next step</p><Link to="/hotels" className="mt-1 inline-flex items-center font-medium underline underline-offset-4">Find a stay</Link></div></section><section className="mt-14"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Your history</p><h2 className="mt-3 font-display text-4xl">Reservations</h2></div><Button asChild><Link to="/reserve">New enquiry</Link></Button></div>{isLoading ? <div className="mt-8 h-32 animate-pulse rounded-md bg-secondary" /> : bookings.length === 0 ? <div className="mt-8 border-l-2 border-accent pl-5"><p className="font-display text-3xl">No bookings yet.</p><p className="mt-2 text-muted-foreground">Your confirmed stays will appear here.</p></div> : <div className="mt-8 grid gap-4">{bookings.map((booking) => <article key={booking.id} className="grid gap-4 rounded-md border border-border bg-card p-5 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{booking.reference}</p><p className="mt-2 font-display text-2xl">{booking.check_in} — {booking.check_out}</p><p className="mt-1 text-sm text-muted-foreground">{booking.adults} adults · {booking.rooms_count} room{booking.rooms_count === 1 ? "" : "s"}</p></div><span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{booking.status}</span></article>)}</div>}</section></main>;
}