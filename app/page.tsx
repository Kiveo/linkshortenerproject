import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-full flex-1 bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-end gap-2 px-6 py-6">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button variant="outline" size="default" className="text-base">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="default" className="text-base">
              Sign up
            </Button>
          </SignUpButton>
        </Show>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-89px)] w-full max-w-4xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Shortly
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Share links that are short, simple, and easy to remember.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Turn long URLs into clean short links and manage them from one
            focused dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}
