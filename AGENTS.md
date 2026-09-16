<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Shortly project instructions

Shortly is a Next.js App Router link shortener using React, Clerk, Neon Postgres, Drizzle, Tailwind CSS, and shadcn/ui primitives.


## UI component rule

- All UI elements in this app must use shadcn/ui.
- Do not create custom components, custom wrappers, or any bespoke UI implementation.
- Always use shadcn/ui components from `components/ui` for all interface elements.
- No custom UI components or custom UI code are allowed in this app.


## Rules at a glance

- Read the relevant local Next.js guide before changing framework-sensitive code. 
- Preserve existing public APIs and local patterns. Keep changes focused on the requested behavior.
- Never expose secrets or server-only environment variables to client components.
- Prefer existing dependencies and components over introducing new abstractions or packages.
- Do not create commits, branches, or destructive Git changes unless explicitly requested.
- Run the narrowest useful validation after each substantive change and report any unavailable checks.
