import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#f5f7f2] text-[#16251d]">
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#c8e6d0] opacity-70 blur-3xl" />
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          shortly<span className="text-[#16845b]">.</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-3 py-2 text-[#426050] transition-colors hover:text-[#16845b]">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full bg-[#16845b] px-4 py-2.5 text-white shadow-sm transition-colors hover:bg-[#0f6b48]">Create account</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </nav>
      </header>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-20 pt-12 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#16845b]">Your links, refined</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#16251d] sm:text-7xl">
            Short links. <span className="text-[#16845b]">Long reach.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#587062]">
            Turn long, forgettable URLs into links people can trust, share, and remember.
          </p>
        </div>

        <div className="mt-14 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#d9e6dc] bg-white/80 p-3 shadow-[0_20px_60px_-35px_rgba(22,37,29,0.45)] backdrop-blur sm:flex-row">
          <input
            type="url"
            placeholder="Paste a long URL to get started"
            className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-base outline-none placeholder:text-[#91a69a]"
            aria-label="Long URL"
          />
          <button className="rounded-xl bg-[#16251d] px-6 py-3 font-medium text-white transition-colors hover:bg-[#274432]">Shorten link</button>
        </div>

        <p className="mt-5 text-sm text-[#789083]">Free to try. No credit card required.</p>
      </main>
    </div>
  );
}
