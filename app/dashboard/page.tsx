import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserLinks } from "@/data/links";

import { CreateLinkDialog } from "./create-link-dialog";
import { LinkActions } from "./link-actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserLinks(userId);
  const shortBaseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/dashboard" className="text-xl font-semibold tracking-tight text-foreground">
          shortly<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <UserButton />
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-border bg-card/80 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your links
            </h1>
          </div>

      <CreateLinkDialog />
        </div>

        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="text-lg font-medium text-foreground">No shortened links yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Start by creating a short link from a long URL.
              </p>
            </div>
          ) : (
            links.map((link) => {
              const shortUrl = `${shortBaseUrl}/l/${link.shortCode}`;
              const shortPath = `/l/${link.shortCode}`;

              return (
                <article
                  key={link.id}
                  className="rounded-3xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent/30"
                >
                  <LinkActions
                    shortUrl={shortUrl}
                    shortPath={shortPath}
                    originalUrl={link.originalUrl}
                  />
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
