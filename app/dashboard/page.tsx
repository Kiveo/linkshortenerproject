import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0d1712] text-[#edf7ef]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/dashboard" className="text-xl font-semibold tracking-tight">
          shortly<span className="text-[#6ee7b7]">.</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-medium text-[#a6c4ae] transition-colors hover:text-[#6ee7b7]">
            Home
          </Link>
          <UserButton />
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-10 lg:px-10">
        <div className="max-w-2xl rounded-3xl border border-[#2b4635] bg-[#14231a]/90 p-8 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6ee7b7]">
            Dashboard
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#edf7ef]">
            Your links are ready to go.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#a6c4ae]">
            This protected area is reserved for authenticated users only, using the Clerk identity and the Neon/Drizzle data layer.
          </p>
        </div>
      </section>
    </main>
  );
}
