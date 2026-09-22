import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  ssr: false,

  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      throw redirect({ to: "/auth" });
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      throw redirect({ to: "/dashboard" });
    }

    return { user: data.user };
  },

  head: () => ({
    meta: [
      { title: "Admin | Pride Vacations" },
      {
        name: "description",
        content: "Pride Vacations administration dashboard.",
      },
    ],
  }),

  component: AdminPage,
});

type Tab = "reservations" | "events" | "contacts";

const statuses = ["New", "Contacted", "Confirmed", "Closed"];

function AdminPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("reservations");

  const reservations = useQuery({
    queryKey: ["admin-reservations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservation_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const events = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const contacts = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const loading =
    reservations.isLoading || events.isLoading || contacts.isLoading;

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["admin-reservations"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-events"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pride Vacations
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Administration
            </p>
          </div>

          <h1 className="mt-3 font-display text-6xl leading-none">
            Admin portal.
          </h1>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Manage reservation, event and contact enquiries from one place.
          </p>
        </div>

        <Button variant="outline" onClick={refresh} disabled={loading}>
          <RefreshCw className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<CalendarDays />}
          label="Reservations"
          value={reservations.data?.length ?? 0}
        />

        <StatCard
          icon={<CalendarDays />}
          label="Event enquiries"
          value={events.data?.length ?? 0}
        />

        <StatCard
          icon={<Mail />}
          label="Contact messages"
          value={contacts.data?.length ?? 0}
        />
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          <TabButton
            active={tab === "reservations"}
            onClick={() => setTab("reservations")}
          >
            Reservations
          </TabButton>

          <TabButton
            active={tab === "events"}
            onClick={() => setTab("events")}
          >
            Events
          </TabButton>

          <TabButton
            active={tab === "contacts"}
            onClick={() => setTab("contacts")}
          >
            Contacts
          </TabButton>
        </div>

        <div className="mt-6">
          {tab === "reservations" && (
            <ReservationsTable
              rows={reservations.data ?? []}
              onUpdate={refresh}
            />
          )}

          {tab === "events" && (
            <EventsTable rows={events.data ?? []} onUpdate={refresh} />
          )}

          {tab === "contacts" && (
            <ContactsTable rows={contacts.data ?? []} onUpdate={refresh} />
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="text-accent">{icon}</div>
      <p className="mt-8 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-4xl">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      className="rounded-full"
    >
      {children}
    </Button>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 appearance-none rounded-md border border-input bg-background py-1 pl-3 pr-8 text-xs font-medium"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5" />
    </div>
  );
}

async function updateStatus(
  table:
    | "reservation_requests"
    | "event_enquiries"
    | "contact_messages",
  id: string,
  status: string,
  onUpdate: () => void,
) {
  const { error } = await supabase.from(table).update({ status }).eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  onUpdate();
}

function ReservationsTable({
  rows,
  onUpdate,
}: {
  rows: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    check_in: string | null;
    check_out: string | null;
    adults: number;
    children: number;
    rooms_count: number;
    room_preference: string | null;
    message: string | null;
    status: string;
    created_at: string;
  }>;
  onUpdate: () => void;
}) {
  if (!rows.length) return <EmptyState text="No reservation enquiries yet." />;

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-md border border-border bg-card p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl">{row.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {row.email} · {row.phone}
              </p>
            </div>

            <StatusSelect
              value={row.status}
              onChange={(status) =>
                updateStatus(
                  "reservation_requests",
                  row.id,
                  status,
                  onUpdate,
                )
              }
            />
          </div>

          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
            <Info label="Dates">
              {row.check_in ?? "—"} → {row.check_out ?? "—"}
            </Info>

            <Info label="Guests">
              {row.adults} adults · {row.children} children
            </Info>

            <Info label="Rooms">
              {row.rooms_count}
              {row.room_preference ? ` · ${row.room_preference}` : ""}
            </Info>
          </div>

          {row.message && (
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-muted-foreground">
              {row.message}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function EventsTable({
  rows,
  onUpdate,
}: {
  rows: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    event_type: string;
    event_date: string | null;
    guests: number | null;
    budget: string | null;
    message: string | null;
    status: string;
    created_at: string;
  }>;
  onUpdate: () => void;
}) {
  if (!rows.length) return <EmptyState text="No event enquiries yet." />;

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-md border border-border bg-card p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl">{row.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {row.event_type} · {row.email} · {row.phone}
              </p>
            </div>

            <StatusSelect
              value={row.status}
              onChange={(status) =>
                updateStatus("event_enquiries", row.id, status, onUpdate)
              }
            />
          </div>

          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
            <Info label="Event date">{row.event_date ?? "—"}</Info>
            <Info label="Guests">{row.guests ?? "—"}</Info>
            <Info label="Budget">{row.budget ?? "—"}</Info>
          </div>

          {row.message && (
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-muted-foreground">
              {row.message}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function ContactsTable({
  rows,
  onUpdate,
}: {
  rows: Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    created_at: string;
  }>;
  onUpdate: () => void;
}) {
  if (!rows.length) return <EmptyState text="No contact messages yet." />;

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className="rounded-md border border-border bg-card p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <UserRound className="h-4 w-4 text-accent" />
              </div>

              <div>
                <p className="font-display text-2xl">{row.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {row.email}
                  {row.phone ? ` · ${row.phone}` : ""}
                </p>
              </div>
            </div>

            <StatusSelect
              value={row.status}
              onChange={(status) =>
                updateStatus("contact_messages", row.id, status, onUpdate)
              }
            />
          </div>

          <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">
            {row.message}
          </p>
        </article>
      ))}
    </div>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium">{children}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-border p-10 text-center">
      <Check className="mx-auto h-6 w-6 text-accent" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
