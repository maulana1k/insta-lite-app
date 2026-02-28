# Sprint 2 — Profile & Users

**Sprint Goal:** Profile pages show real data. Follow/unfollow/block works. Settings saves to backend.

---

## Tasks

### T2.1 — Users Types (`src/features/users/types/index.ts`)

Types to define:
- `MyProfile`
- `PublicProfile`
- `UserSummary`
- `FollowListItem`
- `FollowListPage`
- `UpdateProfileRequest`

- **DoD:** All fields match OpenAPI spec exactly. TypeScript strict mode passes.

---

### T2.2 — Users API (`src/features/users/api/index.ts`)

Functions:
- `getMe`
- `updateMe`
- `deleteMe`
- `getProfile`
- `follow`
- `unfollow`
- `block`
- `unblock`
- `searchUsers`
- `getFollowers`
- `getFollowing`
- `getUserPosts`

- **DoD:** All functions call correct endpoints. No TypeScript errors.

---

### T2.3 — Users Hooks (`src/features/users/hooks/use-users.ts`)

- `useMyProfile()` — query, key: `['users', 'me']`
- `usePublicProfile(username)` — query
- `useFollowUser` / `useUnfollowUser` — mutations, invalidate `['profile', username]`
- `useBlockUser` / `useUnblockUser` — mutations
- `useUserPosts(username)` — infinite query with cursor pagination
- **DoD:** Hooks return correct data. Invalidation triggers profile re-fetch.

---

### T2.4 — Profile Feature Integration

- `src/features/profile/hooks/use-profile.ts` — replace mock `queryFn` with `usersApi.getProfile(username)`
- `src/features/profile/types/index.ts` — add `publicProfileToProfileUser` adapter function
- Wire `useUserPosts` for profile post grid
- **DoD:** `/u/{username}` shows real follower count, bio, posts from backend

---

### T2.5 — Follow/Block Actions

- Wire follow/unfollow/block/unblock buttons in profile components to mutations
- Show loading spinner during mutation
- **DoD:** Clicking Follow calls API, button switches to Unfollow, count updates

---

### T2.6 — Header Profile Link

- Replace hardcoded `/u/shadcn` with `useAuthStore().currentUser?.username`
- **DoD:** Header avatar links to the actual logged-in user's profile

---

### T2.7 — Settings Profile Save

- `src/features/settings/components/settings-account.tsx` — replace mock save with `usersApi.updateMe()` mutation
- On success: invalidate `['users', 'me']`, update `useAuthStore().currentUser`
- **DoD:** Editing display name/bio/website in settings and saving persists to backend and refreshes UI
