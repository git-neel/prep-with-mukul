# MasterMukul - Online Math Tuition Platform

## Overview

MasterMukul is an education services landing page for online math tuition targeting Class 10 CBSE students. The platform combines personal branding with social proof and conversion optimization, inspired by mastermath.in. The core value proposition is an assured boost in scores up to +15% within three months through small-batch online classes with support until the final board exam.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing.

**State Management**: TanStack React Query for server state management and data fetching.

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS styling. Components are located in `client/src/components/ui/` and follow the "new-york" style variant.

**Styling Approach**: 
- Tailwind CSS with CSS variables for theming
- Custom font stack: Roboto (body), Josefin Sans (headings), Allison (handwritten accents)
- Blue primary color scheme (#0474FC) on light background
- Design guidelines documented in `design_guidelines.md`

**Form Handling**: React Hook Form with Zod validation via @hookform/resolvers.

### Backend Architecture

**Framework**: Express.js running on Node.js with TypeScript.

**API Pattern**: RESTful API with JSON responses. Routes registered in `server/routes.ts`.

**Current Endpoints**:
- `POST /api/bookings` - Create demo session booking
- `GET /api/bookings` - Retrieve all bookings (admin)

**Build Process**: Custom build script using esbuild for server bundling and Vite for client build. Production output goes to `dist/` directory.

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect configured.

**Schema Location**: `shared/schema.ts` contains all database table definitions.

**Current Tables**:
- `users` - Basic user authentication (id, username, password)
- `demo_bookings` - Demo session requests (name, email, phone, grade, message)

**Validation**: Drizzle-zod generates Zod schemas from database tables for type-safe validation.

**Development Storage**: MemStorage class in `server/storage.ts` provides in-memory storage for development. Production should use PostgreSQL via DATABASE_URL environment variable.

### Shared Code

The `shared/` directory contains code used by both frontend and backend:
- Database schema definitions
- Zod validation schemas
- TypeScript types

Path aliases configured: `@/*` for client code, `@shared/*` for shared code.

## External Dependencies

**Database**: PostgreSQL (requires DATABASE_URL environment variable for production). Drizzle Kit handles migrations via `npm run db:push`.

**Session Storage**: connect-pg-simple for PostgreSQL-backed sessions in production.

**Google Fonts**: Roboto, Josefin Sans, and Allison loaded via CDN in index.html.

**Replit-Specific**: 
- @replit/vite-plugin-runtime-error-modal for error handling
- @replit/vite-plugin-cartographer and @replit/vite-plugin-dev-banner for development features (only in dev mode on Replit)