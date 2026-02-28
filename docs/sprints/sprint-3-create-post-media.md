# Sprint 3 — Create Post & Media

**Sprint Goal:** Users can create text posts and image posts connected to the real backend.

---

## Tasks

### T3.1 — Posts API Types (`src/features/posts/types/api.ts`)

Types:
- `ApiPost` — API-native field names: `like_count`, `comment_count`, `media_urls[]`, `author: UserSummary | null`, `entities`, `deleted_at`
- `PostEntities`
- `MentionEntity`
- `HashtagEntity`
- `UrlEntity`

Adapter function: `apiPostToPost()` — bridges `ApiPost` to existing `Post` type used by components

- **DoD:** No TypeScript errors. Adapter maps all fields correctly.

---

### T3.2 — Media Feature (`src/features/media/`)

Files:
- `types/index.ts`: `UploadURLRequest`, `UploadURLResponse`, `ConfirmUploadResponse`
- `api/index.ts`: `requestUploadUrl`, `confirmUpload`, `deleteMedia`
- `hooks/use-media-upload.ts`

Upload flow (3-step GCS):
1. `POST /media/upload-url` → `{ media_id, upload_url }`
2. `PUT upload_url` — direct to GCS, **no auth header, no apiClient**
3. `POST /media/confirm` → `{ public_url }`

Hook returns: `{ upload(file, context), isUploading, progress }`

- **DoD:** Image uploads to GCS successfully. `media_id` returned is valid UUID. Unconfirmed upload is purged after 15 min.

---

### T3.3 — Create Text Post

- `src/features/create/hooks/use-create-post.ts` — add `useMutation` calling `POST /posts` with `{ content }`
- On success: invalidate user's posts query, navigate to home or new post
- **DoD:** Submitting caption-only post creates real post in backend. Post appears in profile feed.

---

### T3.4 — Create Media Post

- Extend `use-create-post.ts` — if media selected, run `use-media-upload` first, then include `media_ids` in `POST /posts`
- **DoD:** Submitting post with image uploads to GCS first, then creates post with `media_urls` populated.

---

### T3.5 — Single Post Fetch

- `src/features/post/api/index.ts` — replace `fetchPost` mock with `apiClient.get<ApiPost>('/posts/${postId}')` + apply `apiPostToPost` adapter
- Add comment to `fetchForYouFeed`/`fetchFollowingFeed` explaining why they stay mocked (no feed API endpoint)
- **DoD:** `/post/{id}` page loads real post data from backend.

---

### T3.6 — Avatar Upload in Settings

- Wire avatar upload in `settings-account.tsx` using `use-media-upload` with `context: 'avatar'`
- Pass resulting `media_id` to `usersApi.updateMe({ avatar_media_id })`
- **DoD:** Changing avatar in settings updates profile picture across the app.
