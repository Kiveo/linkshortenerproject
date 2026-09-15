# Shortly

A Next.js link shortener powered by Clerk authentication and a Neon/Postgres database.

## Environment variables

The project currently uses the following environment variables in its local setup:

```bash
# Next.js / Clerk routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Clerk auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Neon / Postgres
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DATABASE_URL_UNPOOLED="postgresql://user:password@host:5432/dbname"
NEON_BRANCH=production
```

### Notes

- `DATABASE_URL` is required by the Drizzle client in `db/index.ts`.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is required by the Clerk frontend provider in `app/layout.tsx`.
- `CLERK_SECRET_KEY` is required for server-side auth operations and must stay out of client code.
- `DATABASE_URL_UNPOOLED` and `NEON_BRANCH` are present in the repo's current `.env` file and are useful for local Neon workflow compatibility.

> The current repo `.env` also contains a duplicate `DATABASE_URL` entry. In dotenv, only the last value wins, so keep a single canonical `DATABASE_URL` and remove the duplicate assignment.

## Local setup

1. Create a `.env.local` file in the project root.
2. Add the variables above with your real values.
3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Example config

```bash
# Next.js / Clerk routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Clerk auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Neon / Postgres
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DATABASE_URL_UNPOOLED="postgresql://user:password@host:5432/dbname"
NEON_BRANCH=production
```

## Production note

Do not commit `.env.local` or any real secret values. Keep them in your deployment environment or secret manager instead.
