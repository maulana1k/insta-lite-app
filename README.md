<div align="center">

# Jends!

**Where your voice finds its people.**

A modern social platform for creators, thinkers, and doers — built with Next.js 16 and React 19.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-linter-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Playwright](https://img.shields.io/badge/Playwright-tests-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)

</div>

---

## Overview

Jends! is a Twitter/X-style social platform frontend. It ships with a fully-featured UI and is being progressively connected to a real Go backend across 4 sprints (see [Sprint Progress](#-sprint-progress)).

## Features

| Feature | Status |
|---------|--------|
| Auth — email/password + Google OAuth | ✅ Connected |
| Route protection + silent session restore | ✅ Connected |
| Text feed (For You / Following) | 🟡 Mocked |
| Profile pages | 🟡 Mocked |
| Create post (text + image) | 🟡 Mocked |
| Messages / DMs | 🟡 Mocked |
| Spaces & Events | 🟡 Mocked |
| Videos | 🟡 Mocked |
| Discover | 🟡 Mocked |
| Activities / Notifications | 🟡 Mocked |
| Settings | 🟡 Mocked |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) — App Router |
| UI Library | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + OKLch color space |
| Components | [shadcn/ui](https://ui.shadcn.com) — radix-nova style |
| UI State | [Zustand v5](https://zustand-demo.pmnd.rs) |
| Server State | [TanStack Query v5](https://tanstack.com/query) |
| Auth Storage | httpOnly cookie (refresh token) + Zustand memory (access token) |
| Linting | [Biome](https://biomejs.dev) |
| Package Manager | [Bun](https://bun.sh) |
| E2E Tests | [Playwright](https://playwright.dev) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.x
- Go backend *(optional — the UI works with mock data without it)*

### Setup

```bash
# 1. Clone and install
git clone https://github.com/maulana1k/insta-lite-app.git
cd insta-lite-web
bun install

# 2. Configure environment
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL if pointing to a real backend

# 3. Run
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (no trailing slash) | `http://localhost:8080/v1` |

## Commands

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Lint with Biome
bun format       # Format with Biome (write)
bun test         # Run Playwright e2e tests (requires dev server)
bun test:ui      # Open Playwright interactive UI
bun test:headed  # Run tests in headed browser
```

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── api/auth/cookies/       # httpOnly refresh token route handler
│   └── auth/callback/          # Google OAuth callback page
│
├── features/                   # Self-contained feature modules
│   ├── auth/                   # types · store · api · hooks · components
│   ├── post/                   # Feed & post detail
│   ├── profile/                # User profile
│   ├── settings/               # Settings pages
│   ├── create/                 # Post creation flow
│   ├── messages/               # DMs & chat widget
│   ├── videos/                 # Video feed
│   ├── discover/               # Discovery feed
│   ├── space/                  # Community spaces
│   ├── event/                  # Events
│   └── activities/             # Notifications & activity
│
├── components/
│   ├── layout/                 # Header, SplashScreen, sidebar
│   └── ui/                     # shadcn/ui primitives
│
├── lib/
│   ├── api-client.ts           # Fetch wrapper — bearer token, auto-refresh, typed errors
│   └── utils.ts                # cn() and helpers
│
├── middleware.ts                # Route protection
└── types/                      # Shared database types
```

## Auth Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Login / Register                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                    POST /auth/login|register
                               │
              ┌────────────────┴────────────────┐
              │                                 │
        access_token                      refresh_token
              │                                 │
              ▼                                 ▼
    Zustand store (memory)        POST /api/auth/cookies
                                        │ (Next.js route)
                                        ▼
                                 httpOnly cookie 🍪
                                 (JS cannot read)


┌─────────────────────────────────────────────────────────────┐
│                     Cold Load / Hard Refresh                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                    GET /api/auth/cookies
                    (reads cookie server-side)
                               │
                    POST /auth/refresh → backend
                               │
                        new access_token
                               │
                    Zustand store + GET /users/me
                               │
                          ✅ Session restored
```

## Sprint Progress

| Sprint | Goal | Status |
|--------|------|--------|
| [Sprint 1 — Foundation & Auth](docs/sprints/sprint-1-foundation-auth.md) | Register, login, logout, session restore, route protection | ✅ Done |
| [Sprint 2 — Profile & Users](docs/sprints/sprint-2-profile-users.md) | Real profile data, follow/block actions, settings save | 🔜 Next |
| [Sprint 3 — Create Post & Media](docs/sprints/sprint-3-create-post-media.md) | Text + image post creation with GCS media upload | 🔜 Planned |
| [Sprint 4 — Docs & Cleanup](docs/sprints/sprint-4-docs-cleanup.md) | Developer docs, deployment guide, folder audit | 🔜 Planned |

See [docs/backlog.md](docs/backlog.md) for the full backlog.

## API Reference

The backend API spec lives at [`docs/openapi.yaml`](docs/openapi.yaml).
Open it in [Swagger Editor](https://editor.swagger.io) or any OpenAPI viewer.

## Testing

E2E tests live in `test/` and are organized by domain:

```
test/
├── auth/
│   ├── login.spec.ts           # Login flow, error states, UX
│   ├── register.spec.ts        # Sign-up flow, validation errors
│   ├── session.spec.ts         # Splash screen, session restore
│   └── oauth-providers.spec.ts # OAuth buttons, callback page
├── middleware/
│   └── route-protection.spec.ts # Protected routes, ?next= param
└── api/
    └── cookie-handler.spec.ts  # POST / GET / DELETE cookie route
```

```bash
# Make sure the dev server is running first
bun dev

# Then in another terminal
bun test
```

## Contributing

1. Branch from `main` — use `feat/your-feature` naming
2. Run `bun lint` before committing
3. Keep commits atomic — one concern per commit
4. Add Playwright specs for any new user-facing flow

---

<div align="center">

Made with ☕ &nbsp;·&nbsp; Jends! &nbsp;·&nbsp; 2026

</div>
