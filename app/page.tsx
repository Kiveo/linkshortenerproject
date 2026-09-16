import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#0d1712] text-[#edf7ef]">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#24583f] opacity-70 blur-3xl" />
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          shortly<span className="text-[#6ee7b7]">.</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="ghost" size="sm" className="h-auto px-3 py-2 text-[#a6c4ae] hover:text-[#6ee7b7]">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button size="sm" className="rounded-full bg-[#35b879] px-4 py-2.5 text-[#07110b] shadow-sm hover:bg-[#6ee7b7]">
                Create account
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </header>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20 pt-12 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#6ee7b7]">Your links, refined</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#edf7ef] sm:text-7xl">
            Short links. <span className="text-[#6ee7b7]">Long reach.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#a6c4ae]">
            Turn long, forgettable URLs into links people can trust, share, and remember.
          </p>
        </div>

        <div className="mt-14 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#2b4635] bg-[#14231a]/90 p-3 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] backdrop-blur sm:flex-row">
          <Input
            type="url"
            placeholder="Paste a long URL to get started"
            aria-label="Long URL"
            className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 py-3 text-base text-[#edf7ef] shadow-none placeholder:text-[#789083] focus-visible:ring-0"
          />
          <Button className="rounded-xl bg-[#35b879] px-6 py-3 font-medium text-[#07110b] hover:bg-[#6ee7b7]">
            Shorten link
          </Button>
        </div>

        <p className="mt-5 text-sm text-[#789083]">Free to try. No credit card required.</p>
      </main>
    </div>
  );
}
