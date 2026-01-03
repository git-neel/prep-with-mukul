# AI Agent Guidelines for MasterMukul

A full-stack education platform landing page for online math tuition (Class 10 CBSE). Features a React frontend with shadcn/ui components, Express backend, and PostgreSQL database via Drizzle ORM.

## Architecture Overview

**Monorepo structure** with three main domains:

- **Client** (`client/src/`): React 18 + TypeScript, Vite build tool
- **Server** (`server/`): Express.js + Node.js, custom esbuild bundling
- **Shared** (`shared/`): Zod schemas and types used by both client and server

**Key boundary**: The `shared/schema.ts` file contains all database schemas and type definitions—ensure server-side changes update schemas there first, then client validation uses those same schemas.

## Development Workflow

**Local development**: `npm run dev` runs the Express server at port 3000, which serves the Vite dev server for the client.

**Build**: `npm run build` (uses esbuild + Vite) produces `dist/index.cjs` server bundle and `dist/public/` client assets.

**Production**: `npm start` (NODE_ENV=production).

**Database migrations**: `npm run db:push` applies Drizzle migrations to PostgreSQL.

## Patterns & Conventions

### Client-Side

- **Routing**: Lightweight Wouter library in `client/src/pages/` (currently just `home.tsx` for landing page). Add new pages as components in `pages/` directory.
- **API calls**: Use TanStack React Query (`useMutation`, `useQuery`) for server state. Example: demo booking form in `home.tsx` uses `useMutation` to POST to `/api/bookings`.
- **Form validation**: React Hook Form + Zod resolver. Validation schema lives in `shared/schema.ts` (e.g., `insertDemoBookingSchema`), imported on client to validate before submission.
- **UI components**: All from shadcn/ui (`client/src/components/ui/`), styled with Tailwind CSS. Use `cn()` utility from `client/src/lib/utils.ts` to merge Tailwind classes.
- **Styling**: Primary color is `#0474FC` (blue). Typography: Roboto (body), Josefin Sans (headings), Allison (accents). Refer to `design_guidelines.md` for spacing, layout grids, and component patterns.

### Server-Side

- **Routes**: Define in `server/routes.ts` as Express route handlers. Always validate input with Zod schemas from `shared/schema.ts` using `safeParse()`. Return errors as JSON with appropriate HTTP status codes (400 for validation, 500 for server errors).
- **Storage**: Abstract via `IStorage` interface in `server/storage.ts`. Currently uses in-memory `MemStorage`; can swap for PostgreSQL implementation later.
- **Error handling**: Wrap route logic in try-catch. Use `zod-validation-error`'s `fromError()` to convert validation errors to user-friendly messages.
- **Logging**: Use the `log()` function exported from `server/index.ts` for consistent formatting.

### Shared Layer

- **Database schemas**: Drizzle ORM tables in `shared/schema.ts`. Use `createInsertSchema()` from drizzle-zod to generate Zod validators from table definitions.
- **Type exports**: Generate TypeScript types from Drizzle tables using `$inferSelect` (read) and infer from Zod schemas (for inserts). Example: `type User = typeof users.$inferSelect`.

## Common Tasks

**Adding a new API endpoint**:

1. Add table (if needed) to `shared/schema.ts` with Zod schema via `createInsertSchema()`.
2. Add route handler in `server/routes.ts`, validate with `safeParse()`, call `storage.method()`.
3. Update `storage.ts` with the new `IStorage` method and implementation.
4. Client calls it via `useMutation()` in React component.

**Adding a new page**:

1. Create component in `client/src/pages/newpage.tsx`.
2. Add route in `App.tsx` Router using Wouter: `<Route path="/path" component={NewPage} />`.
3. Use shadcn/ui components, follow design guidelines, validate forms with Zod from `shared/schema.ts`.

**Updating the design**: All component visual patterns are in `design_guidelines.md`. Follow spacing units (p-4, mb-8, py-12, etc.), grid layouts (grid-cols-1 md:grid-cols-3), and typography rules there.

## External Dependencies & Integrations

- **Database**: PostgreSQL via Drizzle ORM. Dialect: `postgresql`, config in `drizzle.config.ts`, schema in `shared/schema.ts`.
- **React Query**: For async state. Client-side setup in `client/src/lib/queryClient.ts`.
- **Radix UI**: Headless component primitives; shadcn/ui wraps them with Tailwind.
- **Vite plugins** (Replit-specific): Runtime error modal, cartographer, dev banner (only in non-production + Replit env).

## Important Notes

- **Type safety**: Lean on shared types across client/server. Validate API responses with the same Zod schemas used server-side.
- **No hardcoded environment variables**: Use `process.env.DATABASE_URL` (required for Drizzle), check it exists.
- **In-memory storage**: Current implementation uses `MemStorage`—data resets on server restart. Production will need PostgreSQL swap.
- **Build optimization**: The esbuild allowlist in `script/build.ts` bundles key dependencies to reduce cold-start syscalls on serverless platforms.
