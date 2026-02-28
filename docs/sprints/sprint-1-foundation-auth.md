# Sprint 1 — Foundation & Auth

**Sprint Goal:** The app can register, login, logout, and restore sessions. Route protection is active.

**Locked Decisions:**
- Token storage: httpOnly cookie (refresh token) + in-memory Zustand (access token)
- Google OAuth callback: `/auth/callback?access_token=...&refresh_token=...`

---

## Tasks

### T1.1 — Environment Setup

- Create `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8080/v1`
- Create `.env.local.example` with comments
- **DoD:** `process.env.NEXT_PUBLIC_API_URL` resolves correctly in browser; `.env.local` is gitignored

---

### T1.2 — API Client (`src/lib/api-client.ts`)

- Native fetch wrapper
- Attaches Bearer token from auth store
- Unwraps `{ data }` / `{ error }` envelopes
- Throws typed `ApiError(code, message, status)`
- Auto-refreshes on `token_expired` 401, queues concurrent requests
- On unrecoverable 401: clears auth + redirects to `/auth`
- **DoD:** Unit-testable. All API calls in later tasks use this client. Token refresh retry works in manual test.

---

### T1.3 — Cookie Route Handler (`src/app/api/auth/cookies/route.ts`)

- `POST`: sets `refresh_token` as httpOnly, Secure, SameSite=Lax cookie
- `DELETE`: clears cookie
- **DoD:** Postman/curl test confirms cookie is set with correct flags; JS `document.cookie` cannot read it

---

### T1.4 — Auth Types + API

Files:
- `src/features/auth/types/index.ts`
- `src/features/auth/api/index.ts`

Types: `TokenPair`, `LoginRequest`, `RegisterRequest`, `RegisterResponse`

API functions: `register`, `login`, `refresh`, `logout`, `resendVerification`

- **DoD:** TypeScript compiles with no errors; all functions call correct endpoints with correct request shapes

---

### T1.5 — Auth Store (`src/features/auth/store/auth-store.ts`)

Zustand store fields:
- `accessToken: string | null`
- `currentUser: MyProfile | null`
- `isInitialized: boolean`

Actions: `setTokens`, `setCurrentUser`, `clearAuth`, `setInitialized`

- **DoD:** Store accessible from any component; cleared correctly on logout

---

### T1.6 — Auth Hooks (`src/features/auth/hooks/use-auth.ts`)

- `useLogin`: mutation → set token → persist refresh cookie → fetch `/users/me` → redirect `/`
- `useRegister`: mutation → redirect `/onboarding` with pending email verification state
- `useLogout`: mutation → clear store → delete cookie → redirect `/auth`
- `useInitializeAuth`: on mount, silent refresh → restore session or clear auth
- **DoD:** Login/logout cycle works end-to-end in browser. Session persists after hard refresh.

---

### T1.7 — Middleware (`src/middleware.ts`)

Protected paths: `/settings`, `/create`, `/messages`, `/activities`, `/saved`, `/following`

- No cookie → redirect `/auth?next={pathname}`
- Has cookie + on `/auth` → redirect `/`
- **DoD:** Navigating to `/settings` without session redirects to `/auth`. After login, `/auth` redirects to `/`.

---

### T1.8 — Session Initializer in Providers

- Add `<AuthInitializer />` client component to `src/app/providers.tsx`
- Calls `useInitializeAuth()` on mount
- `SplashScreen` stays visible until `isInitialized = true`
- **DoD:** App shows splash on cold load, silently restores session if refresh cookie exists

---

### T1.9 — Auth Page Wiring (`src/features/auth/components/auth-page.tsx`)

- Add password field
- Wire `useLogin` and `useRegister` mutations
- Show inline error from `ApiError.message`
- Google button → `window.location.href = NEXT_PUBLIC_API_URL + '/auth/google'`
- Apple/Microsoft/GitHub → show "Coming soon" on click
- **DoD:** Login with valid credentials works. Wrong password shows error message. Google button redirects correctly.

---

### T1.10 — OAuth Callback Page (`src/app/auth/callback/page.tsx`)

- Reads `?access_token=...&refresh_token=...` from URL
- Sets access token in store, persists refresh cookie
- Fetches `/users/me`, sets `currentUser`
- Redirects to `/` (or `?next=` param)
- **DoD:** Google OAuth full cycle works end-to-end in browser
