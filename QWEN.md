# Qwen Code Context - Monk Reflections Admin Portal

## Project Overview

This is a Next.js 16 application bootstrapped with `create-next-app`, serving as an admin portal for managing Monk Reflections content. The application provides authentication, dashboard functionality, and management capabilities for various content types (books, events, forms, preorders, sales).

### Key Technologies
- Next.js 16 (App Router)
- React 19.2.0
- TypeScript
- Tailwind CSS with custom theme configuration
- Framer Motion for animations
- Zustand for state management
- Redis for session management
- React Hook Form and Zod for form validation
- Geist font family

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes (auth, forms, users)
│   ├── dashboard/      # Protected dashboard routes
│   ├── globals.css     # Global styles and Tailwind configuration
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Login page
├── components/         # Reusable UI components
├── lib/               # Shared utilities (authStore, redis.config)
```

### Authentication System
The application implements a session-based authentication system:
- Login page at root (`/`) redirects to dashboard after successful authentication
- Sessions are stored in Redis with 1-hour expiration
- Session validation occurs on initial load and page navigation
- Protected routes check for authentication status

### Features
- **Admin Dashboard**: Homepage with overview statistics
- **Navigation System**: Horizontal navigation component with active tab indicator
- **Content Management**: Separate sections for books, events, forms, preorders, and sales
- **Responsive Design**: Mobile-first responsive UI using Tailwind CSS
- **Dark Mode Support**: Built-in dark theme using CSS variables

## Building and Running

### Prerequisites
- Node.js (version compatible with React 19 and Next.js 16)
- Redis server for session management
- Environment variable: `REDIS_URL`

### Commands
- **Development**: `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`)
- **Build**: `pnpm build` (or `npm run build`, `yarn build`, `bun build`)
- **Start Production**: `pnpm start` (or `npm run start`, `yarn start`, `bun start`)
- **Lint**: `pnpm lint` (or `npm run lint`, `yarn lint`, `bun lint`)

### Environment Variables
- `REDIS_URL`: Required for session management with Redis

### Development Conventions
- Uses TypeScript for type safety
- Implements component-based architecture with React
- Follows Next.js App Router conventions
- Uses Tailwind CSS for styling with custom theme
- Implements zustand for global state management
- Uses Zod for validation schemas and React Hook Form for form handling
- Follows accessibility best practices with proper semantic HTML and ARIA attributes
- Uses framer-motion for smooth animations and transitions

## Important Files
- `src/app/page.tsx`: Login page component with form validation
- `src/lib/authStore.ts`: Authentication state management with zustand
- `src/app/api/auth/`: API routes for login, logout, and session validation
- `src/components/HorizontalNav.tsx`: Reusable navigation component
- `src/app/globals.css`: Tailwind CSS configuration and custom styles
- `src/app/dashboard/page.tsx`: Main dashboard page with statistics

## Security Considerations
- Session management through Redis with timed expiration
- Client-side session validation
- Input validation using Zod schemas
- TODO: Password hashing should be implemented in production (currently compared in plain text)

## Testing
No explicit test configuration was found, but standard Next.js testing setup with Jest and React Testing Library would be appropriate.