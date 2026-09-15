# Authentication and Data

## Authentication

- Clerk is the only authentication system for this app. Do not add or use any other auth method, including custom sessions, JWT handling, password storage, or alternate providers.
- `/dashboard` is a protected route. Unauthenticated requests must be redirected to Clerk sign-in or otherwise denied according to the existing Clerk middleware pattern.
- Authenticated users visiting `/` must be redirected to `/dashboard`.
- Sign-in and sign-up must always open as Clerk modals. Do not replace them with standalone pages or custom auth forms.
- Keep Clerk checks and redirects in the established Next.js server and middleware boundaries; never expose server-only secrets to client components.

## Data Access

- Keep application data access in the existing Neon Postgres and Drizzle layers.
- Scope user-owned data using the authenticated Clerk user identity.
- Preserve the existing database schema and server-only environment variable boundaries when adding authenticated data operations.
