import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="w-full max-w-2xl">
          <h1 className="text-center text-3xl font-semibold tracking-tight">
            Shorten a link
          </h1>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="url"
              name="url"
              placeholder="Paste a long URL"
              aria-label="Long URL"
              required
              className="h-11 flex-1 bg-background text-base"
            />
            <Button type="submit" size="lg" className="h-11 px-6 text-base">
              Shorten link
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
