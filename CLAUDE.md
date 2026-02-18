# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run Biome linter
bun format       # Format code with Biome (write mode)
```

> This project uses **Bun** as the package manager (not npm/yarn/pnpm).

## Architecture Overview

This is a **Next.js (App Router) + React 19** frontend for a Twitter/X-like social platform ("Jends"). All data is currently mocked — there is no backend or authentication.

### State Management Pattern

Two complementary tools handle state:

- **Zustand** — lightweight UI state (active feed mode, topic selection, modal open/closed, etc.)
- **React Query (TanStack Query)** — async data fetching with caching; hooks call mock data functions that simulate API delays

Store files live at `src/features/<feature>/store/<feature>-store.ts`. Custom hooks at `src/features/<feature>/hooks/use-<feature>.ts` compose Zustand + React Query together.

### Feature-Based Structure

Each feature under `src/features/` is self-contained:
```
src/features/<feature>/
  api/mock-data.ts    # Mock data + simulated fetch functions
  types/index.ts      # Feature-specific TypeScript types
  store/              # Zustand store(s)
  hooks/              # React Query + store hooks
  components/         # React components
```

Key features: `text-feed` (main feed), `messages`, `videos`, `profile`, `discover`, `settings`, `stories`, `create`, `activities`.

### Providers (`src/app/providers.tsx`)

Wraps the app with:
1. `ThemeProvider` (next-themes) — dark/light mode
2. `QueryClientProvider` (React Query)
3. `ChatWidget` — floating chat bubble rendered globally

### Routing

Uses Next.js App Router. Pages are under `src/app/`. Most route components are thin shells that import and render feature components. Dynamic routes: `/u/[username]`, `/p/[id]`, `/post/[post_id]`, `/event/[event_id]`.

### Styling

- **Tailwind CSS v4** with PostCSS
- **OKLch color space** CSS variables for theming (defined in `src/app/globals.css`)
- Utility function `cn()` in `src/lib/utils.ts` merges classes (clsx + tailwind-merge)
- Shadcn UI components in `src/components/ui/` (configured via `components.json`, style: radix-nova)
- Icons from `lucide-react` and `@solar-icons/react`

### Key Shared Types

- `src/types/database.ts` — `User`, `Post`, `Comment`, `Story`
- `src/features/text-feed/types/index.ts` — `TextPost`, `Topic`, `SpaceEvent`, `PostComment`

### Tooling

- **Biome** (not ESLint/Prettier) for linting and formatting — config in `biome.json`
- **TypeScript** strict mode, path alias `@/*` → `./src/*`
- All components that use hooks, browser APIs, or interactivity require `"use client"` directive
