# Architecture

This is a **client-only** Next.js 16 app (App Router, `output: 'export'`) that functions as an Instagram/Threads-style social platform. No backend is included — all data is mocked and all state is ephemeral.

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Styling | Tailwind CSS v4 + `cn()` utility |
| UI Primitives | shadcn/ui (Radix-based) |
| Icons | `@solar-icons/react` (primary) · `lucide-react` (secondary) |
| State — global | Zustand v5 (no persist) |
| State — server | TanStack Query v5 (`useQuery` / `useInfiniteQuery`) |
| Animation | Framer Motion (`AnimatePresence`, `motion.*`) |
| Themes | `next-themes` (`useTheme()`) |
| Fonts | Inter (primary `--font-sans`), Geist, Geist Mono |

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — wraps Providers
│   ├── providers.tsx       # QueryClient + ThemeProvider + ChatWidget
│   ├── page.tsx            # / → For You feed
│   ├── following/          # /following feed
│   ├── saved/              # /saved feed
│   ├── space/[slug]/       # /space/[slug] — Space profile + posts
│   │   └── events/         # /space/[slug]/events — Space events list
│   ├── post/[post_id]/     # /post/[post_id] — Single post detail
│   ├── u/[username]/       # /u/[username] — User profile
│   ├── messages/           # /messages — Inbox (sidebar + chat)
│   ├── discover/           # /discover — Explore/search
│   ├── activities/         # /activities — Notifications
│   ├── videos/             # /videos — Short video feed
│   ├── settings/           # /settings — User settings
│   └── event/[event_id]/   # /event/[event_id] — Single event detail
│
├── features/               # Feature modules (the main code lives here)
│   ├── text-feed/          # Core home feed (posts, spaces, events)
│   ├── feed/               # Visual photo grid feed (disabled, kept for future)
│   ├── stories/            # Story player (disabled, kept for future)
│   ├── messages/           # Messaging / chat
│   ├── profile/            # User profile page
│   ├── discover/           # Discover / explore content
│   ├── activities/         # Activity notifications
│   ├── videos/             # Video feed
│   ├── create/             # Photo post creation flow (upload → crop → edit → caption)
│   ├── posts/              # Post detail modal + query
│   └── settings/           # Settings page sections + store
│
├── components/
│   ├── layout/             # App-wide layout: Header, SearchOverlay, NotificationPopup, ChatWidget
│   └── ui/                 # shadcn/ui primitives: Button, Input, Avatar, Badge, etc.
│
├── lib/
│   ├── utils.ts            # cn() — clsx + tailwind-merge
│   └── time.ts             # timeAgo(), isToday() — canonical time helpers
│
└── types/
    └── database.ts         # Shared base types: User, Post, Comment, etc.
```

---

## Feature Module Structure

Each feature follows this internal structure:

```
features/[name]/
├── api/
│   ├── index.ts        # Typed API functions with REST endpoint comments
│   └── mock-data.ts    # Mock data (replace with real API calls later)
├── components/         # Feature-specific React components
├── hooks/              # Data-fetching hooks (useQuery / useInfiniteQuery)
├── store/              # Zustand stores (feature-scoped state)
├── types/
│   └── index.ts        # Feature-specific TypeScript types
└── utils/              # Pure utility functions (no side effects)
```

---

## Routing

All home feed tabs are **top-level routes** (not tab-switching via state):

| URL | Purpose |
|---|---|
| `/` | For You feed (all posts) |
| `/following` | Posts from followed users |
| `/saved` | Saved/bookmarked posts |
| `/space/[slug]` | Space profile + post feed |
| `/space/[slug]/events` | Space events list |
| `/post/[post_id]` | Single post detail (full page) |
| `/u/[username]` | User profile |
| `/messages` | Messaging inbox |
| `/discover` | Explore / search |
| `/activities` | Activity / notifications |
| `/videos` | Video feed |
| `/settings` | User settings |
| `/event/[event_id]` | Single event detail |

Feed pages share the same 3-column layout: `TopicSidebar` (left) · main content (center, `max-w-2xl`) · contextual right sidebar (right).

---

## State Management

### Zustand Stores

| Store | Location | Purpose |
|---|---|---|
| `useFeedModeStore` | `text-feed/store/feed-mode-store.ts` | Active feed mode, selected space/topic, space view mode (posts vs events), active event |
| `useSettingsStore` | `settings/store/settings-store.ts` | User settings: profile, privacy, notifications, appearance |
| `useVideosStore` | `videos/store/videos-store.ts` | Active video, mute state |
| `useProfileStore` | `profile/store/profile-store.ts` | Follow state for profile page |
| `useCreatePostStore` | `create/store/create-post-store.ts` | Multi-step image post creation state |
| `useStoryPlayerStore` | `stories/store/story-player-store.ts` | Story playback state (disabled feature) |
| `useFeedStore` | `feed/store/feed-store.ts` | Visual photo feed state (disabled feature) |

Stores do **not** use `persist` middleware — all state resets on page reload.

### TanStack Query

Used for all async data fetching (even though data is mocked). Cache keys follow the pattern `[feature, ...params]`:

```ts
queryKey: ['text-feed', feedMode]
queryKey: ['space-events', spaceSlug, filter]
queryKey: ['post-detail', postId]
queryKey: ['profile', username]
```

The `QueryClient` is created once in `providers.tsx` with default stale/retry options. No server-side prefetching (static export).

---

## API Layer Pattern

Each feature that fetches data has an `api/index.ts` with typed functions:

```ts
// GET /api/v1/posts?feed=for_you&cursor={cursor}
// Authorization: Bearer {token}
export async function fetchForYouFeed(cursor?: string): Promise<FeedPage<TextPost>> {
  // TODO: replace mock with: return apiClient.get('/posts', { params: { feed: 'for_you', cursor } })
  await simulateLatency();
  return { items: MOCK_TEXT_POSTS, nextCursor: null };
}
```

**Authentication placeholder**: All API functions include a `// Authorization: Bearer {token}` comment where the JWT auth header would be added.

---

## Key Patterns

### Feed Layout (3-column)
All feed pages use the same grid:
```tsx
<div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6">
  <aside>  <TopicSidebar />     </aside>   {/* left: space/feed nav */}
  <main>   <TextFeedList />     </main>    {/* center: posts, max-w-2xl */}
  <aside>  <SuggestedUsers />   </aside>   {/* right: contextual sidebar */}
</aside>
```

### Settings UI Primitives (`settings/components/settings-ui.tsx`)
Reusable Apple iOS-style grouped list primitives:
- `Toggle` — iOS green switch (`bg-[#34C759]`)
- `SettingsGroup` — inset grouped container with `ml-4` separators
- `SettingsRow` — 44px tappable row with label/value/chevron
- `EditRow` — expandable inline edit form (uses `AnimatePresence` height animation)

### Infinite Scroll
Feed hooks use `useInfiniteQuery` with cursor-based pagination:
```ts
getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
```

### Page-to-Store Sync
Each feed route page syncs the Zustand store on mount so the sidebar highlights correctly:
```ts
useEffect(() => { setActiveTopicId('following'); }, []);
```

### `cn()` utility
All conditional class names use `cn()` from `lib/utils.ts` (clsx + tailwind-merge).

---

## Disabled Features (Keep, Don't Touch)

These features exist in the codebase but are **commented out / disabled**. Leave them untouched:

- **`features/feed/`** — Visual photo grid feed (`FeedGrid`, `UserStories`, `FeedNavigation`)
- **`features/stories/`** — Story player (`StoryPlayer`, `StoryPlayerUI`)

They are imported and commented out in `app/page.tsx` and can be re-enabled by uncommenting.

---

## Conventions

- **Language**: UI text is in Indonesian (`id`)
- **Date/time**: Always use `timeAgo()` from `@/lib/time` (the canonical location)
- **Icons**: Prefer `@solar-icons/react` with `weight="Bold"` for active state, `weight="Linear"` for inactive
- **Colors**: Blue actions use `#007AFF`, green toggles use `#34C759`, destructive uses `text-red-500`
- **Spacing**: `pt-15` header offset on pages, `max-w-2xl` for feed content width
- **Skeleton loaders**: Every data-dependent component has a `*-skeleton.tsx` counterpart
