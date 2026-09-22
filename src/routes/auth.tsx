import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | Pride Vacations" },
      {
        name: "description",
        content:
          "Sign in to manage your Pride Vacations stays and reservations.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) {
        void navigate({ to: "/dashboard", replace: true });
      }
    });

    return () => {
      mounted = false;
    };
  }, [navigate]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);

    try {
      const form = new FormData(event.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");
      const fullName = String(form.get("full_name") ?? "").trim();

      if (!email || !password) {
        toast.error("Please enter your email and password.");
        return;
      }

      if (mode === "sign-up" && !fullName) {
        toast.error("Please enter your full name.");
        return;
      }

      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (!data.session) {
          toast.success(
            "Account created. Check your email to confirm your account.",
          );
          setMode("sign-in");
          return;
        }

        toast.success("Account created successfully.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (!data.session) {
          toast.error("Could not create a session. Please try again.");
          return;
        }

        toast.success("Welcome back to Pride Vacations.");
      }

      await navigate({ to: "/dashboard", replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      if (message.toLowerCase().includes("email not confirmed")) {
        toast.error("Please confirm your email before signing in.");
      } else if (message.toLowerCase().includes("invalid login")) {
        toast.error("Incorrect email or password.");
      } else if (message.toLowerCase().includes("already registered")) {
        toast.error("This email is already registered. Please sign in.");
      } else {
        toast.error(message);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-[1fr_440px] lg:px-8 lg:py-24">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <p className="mt-16 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Your Pride Vacations space
        </p>

        <h1 className="mt-4 max-w-xl font-display text-6xl leading-none">
          Keep your stays close.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
          See reservations, keep your details handy and make your next escape
          easier.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-md border border-border bg-card p-6 shadow-sm md:p-8"
      >
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <LockKeyhole className="h-5 w-5 text-accent" />
        </div>

        <h2 className="font-display text-4xl">
          {mode === "sign-in" ? "Welcome back." : "Create your account."}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "sign-in"
            ? "Sign in to view your Pride Vacations reservations."
            : "Join Pride Vacations to keep your stays in one place."}
        </p>

        <div className="mt-8 grid gap-4">
          {mode === "sign-up" && (
            <label className="grid gap-2 text-sm">
              Full name
              <input
                required
                name="full_name"
                autoComplete="name"
                className="h-11 rounded-md border border-input bg-background px-3"
              />
            </label>
          )}

          <label className="grid gap-2 text-sm">
            Email
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className="h-11 rounded-md border border-input bg-background px-3"
            />
          </label>

          <label className="grid gap-2 text-sm">
            Password
            <input
              required
              name="password"
              type="password"
              minLength={6}
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
              className="h-11 rounded-md border border-input bg-background px-3"
            />
          </label>

          <Button type="submit" size="lg" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "sign-in"
                ? "Sign in"
                : "Create account"}
            <ArrowUpRight />
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "sign-in"
            ? "New to Pride Vacations?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-semibold text-foreground underline underline-offset-4"
            onClick={() =>
              setMode(mode === "sign-in" ? "sign-up" : "sign-in")
            }
          >
            {mode === "sign-in" ? "Create one" : "Sign in"}
          </button>
        </p>
      </form>
    </main>
  );
}
