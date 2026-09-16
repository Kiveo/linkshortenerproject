For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. This is extremely important: ALWAYS read the relevant individual instruction file(s) in `/docs` before generating, proposing, or editing any code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Shortly project instructions

Shortly is a Next.js App Router link shortener using React, Clerk, Neon Postgres, Drizzle, Tailwind CSS, and shadcn/ui primitives.

Use the focused guides below for project-specific decisions:

- [Next.js and React](docs/nextjs-and-react.md): App Router, server/client boundaries, and framework checks.
- [Authentication and data](docs/auth-and-data.md): Clerk-only authentication, protected routes, modal sign-in/sign-up, Neon, Drizzle, and environment variables.
- [Frontend](docs/frontend.md): Tailwind, shadcn/ui, accessibility, and visual conventions.

## UI component rule

- All UI elements in this app must use shadcn/ui.
- Do not create custom components, custom wrappers, or any bespoke UI implementation.
- Always use shadcn/ui components from `components/ui` for all interface elements.
- No custom UI components or custom UI code are allowed in this app.

## Required documentation lookup

This is mandatory and non-negotiable: before generating, proposing, or editing any code, identify the relevant topic and read the specific instruction file(s) in `docs/` that apply to that task. Treat those individual guides as the source of truth for project-specific conventions. For work that spans multiple topics, read every applicable guide before writing code. When no guide clearly matches, read [Project overview](docs/project-overview.md) and [Development workflow](docs/development-workflow.md) first, then add or update a focused guide if the new convention should persist.

Do not skip this step. Do not infer conventions without checking the relevant docs first. The docs in `/docs` must be read before any code is generated.

## Rules at a glance

- Read the relevant local Next.js guide before changing framework-sensitive code. The installed documentation lives under `node_modules/next/dist/docs/`.
- Always read the relevant individual `docs/*.md` guide before generating any code, including small snippets, fixes, tests, configuration, and refactors.
- This requirement is critical: the relevant docs must be reviewed before any code generation begins.
- Preserve existing public APIs and local patterns. Keep changes focused on the requested behavior.
- Never expose secrets or server-only environment variables to client components.
- Prefer existing dependencies and components over introducing new abstractions or packages.
- Do not create commits, branches, or destructive Git changes unless explicitly requested.
- Run the narrowest useful validation after each substantive change and report any unavailable checks.
