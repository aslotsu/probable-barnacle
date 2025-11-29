# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 admin dashboard application for managing MonkReflections business operations (sales, preorders, events, books). It uses Redis for authentication/session management and features a protected dashboard with multiple sections.

## Development Commands

```bash
# Start development server (uses pnpm)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## Architecture

### Authentication Flow

The app uses a **custom session-based authentication** stored in Redis:

1. **Login**: `/api/auth/login` validates credentials against Redis (`user:${email}` keys), creates session with 1-hour expiry
2. **Session Management**: Sessions stored in Redis as `session:${timestamp}-${random}` with user data
3. **Client State**: Managed by Zustand store (`src/lib/authStore.ts`) with localStorage persistence
4. **Protection**: `ProtectedRoute` component validates sessions on mount and redirects unauthenticated users

**Important**: Passwords are currently stored in plain text in Redis (development only - production should use hashing).

### Redis Configuration

- Redis URL configured in `src/lib/redis.config.ts`
- Falls back to hardcoded URL if `REDIS_URL` env var not set
- **WARNING**: Hardcoded credentials exist in `redis.config.ts` and `api/auth/login/route.ts` - should be removed for production
- Each API route creates/destroys Redis client connection (no connection pooling)

### State Management

- **Zustand** for global auth state (`src/lib/authStore.ts`)
- Auth state includes: `user`, `isAuthenticated`, `isLoading`, `error`, `sessionId`
- Session ID persisted in localStorage for validation across page refreshes

### Dashboard Structure

The dashboard uses Next.js App Router with nested layouts:

```
/dashboard
  ├─ page.tsx (overview with stats cards)
  ├─ layout.tsx (wraps all dashboard routes with ProtectedRoute)
  ├─ /sales (layout.tsx + page.tsx)
  ├─ /preorders (layout.tsx + page.tsx)
  ├─ /events (layout.tsx + page.tsx)
  └─ /books (layout.tsx + page.tsx)
```

**Layout Pattern**: Each section (sales/preorders/events/books) has its own `layout.tsx` that duplicates the Sidebar setup. This creates redundancy - the sidebar items array is repeated in multiple files.

### Component Architecture

- **Sidebar** (`src/components/Sidebar.tsx`): Reusable navigation with active state highlighting using framer-motion `layoutId`
- **ProtectedRoute** (`src/components/ProtectedRoute.tsx`): HOC that validates session on mount and redirects if unauthenticated
- **TabView** (`src/components/TabView.tsx`): Exists but usage unclear from codebase

### Styling

- **Tailwind CSS 4.x** with PostCSS
- Design system: Indigo/purple gradient backgrounds, indigo primary color
- **Framer Motion** for animations (page transitions, sidebar active indicator)

## API Routes

All routes are POST-based:

- `/api/auth/login` - Validates credentials, creates session
- `/api/auth/logout` - Destroys session in Redis
- `/api/auth/session` - Validates existing session
- `/api/users/init` - (Check implementation for user initialization)

## Key Technical Decisions

1. **No Next.js built-in auth**: Using custom Redis session management instead of NextAuth
2. **Client-side protection**: ProtectedRoute runs in browser (could add middleware for server-side protection)
3. **Duplicate layouts**: Each dashboard section has redundant layout code instead of shared parent layout
4. **Direct Redis connections**: No connection pooling - each request creates new client connection

## Development Notes

- Project uses **pnpm** as package manager (not npm/yarn)
- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- No test framework currently configured
- No environment variable validation (relies on fallback values)
