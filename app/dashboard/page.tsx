import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getUserLinks } from "@/data/links";

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

          <Button type="button" size="default" className="w-fit">
            Create link
          </Button>
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
              const shortUrl = `${shortBaseUrl}/${link.shortCode}`;

              return (
                <article
                  key={link.id}
                  className="rounded-3xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent/30"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Short link
                      </p>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block truncate text-lg font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {shortUrl}
                      </a>
                      <p className="mt-2 truncate text-sm text-muted-foreground">
                        {link.originalUrl}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button type="button" variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
