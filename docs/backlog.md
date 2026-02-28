# Backlog

Future items not scheduled for current sprints. Each entry has a title and one-line purpose.

---

## API Integration

- **Feed API (For You)** — connect main feed when backend implements `GET /posts?feed=for_you`
- **Feed API (Following)** — connect following feed when endpoint is available
- **Post likes** — implement like/unlike via new API endpoint
- **Post comments** — implement comment read/write via new API endpoint
- **Post reposts** — implement repost action
- **Post saves** — implement save/unsave action
- **Search results** — wire search page to `GET /users/search`
- **Block list page** — wire `/users/me/blocked` to the blocked users UI
- **Followers/Following lists** — wire follow list pages to real API
- **Email verification UI** — show pending verification state after registration + resend link
- **Spaces backend** — connect spaces feature when API is available
- **Events backend** — connect events feature when API is available
- **Messages/DMs** — connect messaging when API is available
- **Activities/notifications** — connect activity feed when API is available
- **Videos backend** — connect video feed when API is available
- **Discover backend** — connect discover when API is available

---

## Auth & Security

- **Two-factor authentication** — implement 2FA setup UI in settings
- **Password change** — wire password change form to new API endpoint
- **Passkeys** — implement WebAuthn passkey flow
- **Apple OAuth** — integrate when backend adds Apple provider
- **Microsoft OAuth** — integrate when backend adds Microsoft provider
- **GitHub OAuth** — integrate when backend adds GitHub provider
- **Session management** — list and revoke active sessions UI

---

## Profile & Social

- **Cover photo upload** — wire cover photo to media upload flow
- **Profile highlights** — implement highlights when API is available
- **Story upload** — connect story creation to media upload + story API
- **Account deletion** — implement full deletion flow with password confirmation

---

## Posts & Media

- **Post editing** — wire edit post form to `PATCH /posts/{id}`
- **Post deletion** — wire delete action to `DELETE /posts/{id}`
- **Anonymous posts** — add toggle for `is_anonymous` in create post
- **Video upload** — support `video/mp4` in media upload flow

---

## UI/UX

- **Error boundaries** — add React error boundaries across all route pages
- **Skeleton loading states** — add skeletons where missing (profile, followers list)
- **Toast notifications** — replace placeholder toasts with real API feedback
- **Optimistic updates** — add optimistic follow/like counts before API confirms
- **Infinite scroll refinement** — ensure all paginated lists handle end-of-data gracefully

---

## Developer Experience

- **React Query DevTools** — add in development mode only
- **MSW (Mock Service Worker)** — replace raw `mock-data.ts` files with MSW for easier API mocking in tests
- **E2E tests** — add Playwright tests for auth and create post flows
- **CI pipeline** — add GitHub Actions for lint + build check on PR
- **i18n** — implement Indonesian/English toggle using a proper i18n library
- **PWA** — add service worker and web app manifest

---

## Settings

- **Social links persistence** — save Instagram/YouTube/TikTok/LinkedIn to backend when API adds fields
- **Notification preferences** — wire notification toggles to backend
- **Privacy settings** — wire private account toggle to backend
- **Language setting** — persist language choice to backend
- **Data export** — implement account data download
- **Insight analytics** — connect real analytics data when API is available
