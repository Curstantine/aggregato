# Gemini Project Context: aggregato

This document provides context for the "aggregato" project, a music aggregation and update retrieval platform.

## Project Overview

- **Purpose**: To aggregate music information and retrieve updates.
- **Frontend**: SvelteKit with TypeScript and Tailwind CSS.
- **Backend**: SvelteKit server routes with a Turso database.
- **Database**: Drizzle ORM is used to interact with the Turso (distributed SQLite) database. The schema is defined in `src/lib/server/db/schema.ts`.
- **Deployment**: The project is configured for deployment on Vercel.

## Key Files

- `package.json`: Defines project scripts and dependencies.
- `svelte.config.js`: SvelteKit configuration, including the Vercel adapter.
- `vite.config.ts`: Vite configuration.
- `drizzle.config.ts`: Drizzle ORM configuration for database access.
- `src/lib/server/db/schema.ts`: The heart of the backend, defining the database schema for users, artists, releases, etc.
- `src/routes/`: Contains the application's pages and API endpoints.

## Building and Running

### Prerequisites

- Node.js and pnpm are required.
- Set up a Turso database and create a `.env` file with `DATABASE_URL` and `DATABASE_AUTH_TOKEN`. An example is provided in `.env.example`.

### Commands

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Preview**: `pnpm preview`
- **Linting & Formatting**:
    - `pnpm lint`: Check code for linting errors.
    - `pnpm format`: Format the entire codebase.
- **Database**:
    - `pnpm db:push`: Push schema changes to the database.
    - `pnpm db:migrate`: Create a migration file from schema changes.
    - `pnpm db:studio`: Open the Drizzle Kit studio to browse data.
- **Testing**: `pnpm test`

## Development Conventions

- **Coding Style**: The project uses ESLint and Prettier to enforce a consistent coding style. Run `pnpm lint` and `pnpm format` before committing.
- **Database Migrations**: Database schema changes are managed by Drizzle Kit. When you modify `src/lib/server/db/schema.ts`, you should create a new migration using `pnpm db:migrate` and then apply it.
- **Environment Variables**: All necessary environment variables are listed in `.env.example`. Copy this file to `.env` and fill in the values.
