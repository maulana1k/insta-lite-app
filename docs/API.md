# Jends API Reference

> Machine-readable specs: [`openapi.yaml`](./openapi.yaml) · [`asyncapi.yaml`](./asyncapi.yaml) (WebSocket)

---

## Base URL

| Environment | URL |
|-------------|-----|
| Production  | `https://api.jends.id/v1` |
| Local dev   | `http://localhost:3001/v1` |

All paths below are relative to this base URL.

---

## Authentication

Every request requires a JWT Bearer token.

```
Authorization: Bearer <token>
```

Missing or invalid tokens return `401 Unauthorized`.

---

## Errors

All errors follow the same envelope:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found"
  }
}
```

| HTTP Status | `code` | Meaning |
|-------------|--------|---------|
| `401` | `UNAUTHORIZED` | Missing or invalid token |
| `404` | `NOT_FOUND` | Resource doesn't exist |
| `422` | `VALIDATION_ERROR` | Invalid query/body params |
| `500` | `INTERNAL_ERROR` | Server error |

---

## Pagination

Feed endpoints use **cursor-based pagination**. Page size is 10.

**Request** — include `cursor` query param (omit for first page):
```
GET /posts?feed=for_you&cursor=t11
```

**Response** — always returns a `PostFeedPage` (or `VideoFeedPage`, `MessageFeedPage`):
```json
{
  "items": [...],
  "nextCursor": "t21"
}
```

Pass `nextCursor` as `cursor` in the next request. `null` means no more pages.

> Endpoints that return bounded lists (e.g. `/spaces`, `/conversations`) return plain arrays — no pagination.

---

## Endpoints

### Feed

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/posts` | Get post feed |

#### `GET /posts`

| Query param | Type | Values | Default |
|-------------|------|--------|---------|
| `feed` | string | `for_you` · `following` · `saved` | `for_you` |
| `cursor` | string | previous `nextCursor` | — |

**Response** `200` → `PostFeedPage`

---

### Posts

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/posts/{post_id}` | Get a post by ID |
| `GET` | `/posts/{post_id}/comments` | Get comments for a post |

#### `GET /posts/{post_id}`

**Response** `200` → `Post` · `404` if not found

#### `GET /posts/{post_id}/comments`

Returns a flat array; each comment has a `replies` array (one level deep).

**Response** `200` → `PostComment[]` · `404` if post not found

---

### Spaces

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/spaces` | List all spaces |
| `GET` | `/spaces/{slug}` | Get a space by slug |
| `GET` | `/spaces/{slug}/posts` | Get posts within a space |
| `GET` | `/spaces/{slug}/events` | Get events for a space |

#### `GET /spaces`
**Response** `200` → `Space[]`

#### `GET /spaces/{slug}`
**Response** `200` → `Space` · `404` if not found

#### `GET /spaces/{slug}/posts`

| Query param | Type | Default |
|-------------|------|---------|
| `cursor` | string | — |

**Response** `200` → `PostFeedPage`

#### `GET /spaces/{slug}/events`

| Query param | Type | Values | Default |
|-------------|------|--------|---------|
| `filter` | string | `all` · `upcoming` · `past` | `all` |

Sorting: upcoming events ascending by date, past events descending. Upcoming shown first when `filter=all`.

**Response** `200` → `SpaceEvent[]`

---

### Events

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/events/{event_id}` | Get an event by ID |

#### `GET /events/{event_id}`
**Response** `200` → `SpaceEvent` · `404` if not found

---

### Users

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/users/suggested` | Get suggested users to follow |
| `GET` | `/users/{username}` | Get a user's profile |
| `GET` | `/users/{username}/posts` | Get posts by a user |

#### `GET /users/suggested`
**Response** `200` → `UserProfile[]`

#### `GET /users/{username}`
**Response** `200` → `ProfileUser` · `404` if not found

#### `GET /users/{username}/posts`

| Query param | Type | Default |
|-------------|------|---------|
| `cursor` | string | — |

**Response** `200` → `PostFeedPage`

---

### Activities

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/activities` | Get activity/notification feed |

#### `GET /activities`

| Query param | Type | Values | Default |
|-------------|------|--------|---------|
| `tab` | string | `all` · `follows` · `mentions` · `likes` · `comments` | `all` |

**Response** `200` → `Activity[]`

---

### Videos

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/videos` | Get video feed |

#### `GET /videos`

| Query param | Type | Values | Default |
|-------------|------|--------|---------|
| `category` | string | `For You` · `Following` · `Popular` · `Featured` · `Live` · `Continue Watching` · `Watch Later` | — |
| `cursor` | string | — | — |

**Response** `200` → `VideoFeedPage`

---

### Messages (REST)

> For real-time messaging see the [WebSocket API](#websocket-api) below.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/conversations` | List conversations |
| `GET` | `/conversations/{conversation_id}/messages` | Get messages in a conversation |

#### `GET /conversations`
**Response** `200` → `Conversation[]` (sorted by most recent message)

#### `GET /conversations/{conversation_id}/messages`

| Query param | Type | Default |
|-------------|------|---------|
| `cursor` | string | — |

Messages are ordered newest-first. Use `cursor` to load older messages.

**Response** `200` → `MessageFeedPage` · `404` if not found

---

### Discover

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/discover` | Get discovery feed |

#### `GET /discover`

Returns all Discover page data in one request: trending hashtags, trending topics, featured posts, and content categories.

**Response** `200` → `DiscoverFeed`

---

## Schemas

### `User`
```
id            string
username      string
full_name     string
avatar_url    string (uri)
bio           string | null
verified      boolean
created_at    string (date-time)
```

### `UserProfile` _(extends User)_
```
+ followers_count   integer
+ following_count   integer
+ mutual_follower   string | null
```

### `ProfileUser` _(extends User)_
```
+ category       string | null
+ website        string | null
+ is_following   boolean | null
+ stats          { posts, followers, following }
+ highlights     { id, title, cover_image }[]
```

### `Space`
```
id              string
name            string
slug            string
description     string
avatar_url      string (uri)
banner_url      string (uri)
members_count   integer
posts_count     integer
created_at      string (date-time)
```

### `Post`
```
id                string
content           string
image_urls        string[] | null
user_id           string
user              User
created_at        string (date-time)
likes_count       integer
comments_count    integer
reposts_count     integer
views_count       integer
repliers_avatars  string[] | null
space             Space | null
is_anonymous      boolean | null
repost            Post | null       ← nested original post if repost
```

### `PostComment`
```
id           string
post_id      string
user         User
content      string
created_at   string (date-time)
likes_count  integer
replies      PostComment[]          ← one level deep
```

### `SpaceEvent`
```
id               string
space_id         string
title            string
description      string
banner_url       string (uri)
created_by       User
schedule         { date, time, timezone }
location         { type: online|offline|hybrid, venue?, platform?, address? }
cta              { type: register|url|custom, label, url? }
attendees_count  integer
max_attendees    integer | null
status           upcoming | past
created_at       string (date-time)
```

### `Video`
```
id             string
title          string
description    string | null
thumbnail_url  string (uri)
video_url      string (uri)
duration       string             ← "MM:SS"
views_count    integer
user_id        string
user           User
created_at     string (date-time)
category       string (enum)
```

### `Activity`
```
id         string
type       follow | mention | like | comment | system
user       { username, avatar_url, verified? }
content    string | null
post       { id, content, image_url? } | null
timestamp  string (date-time)
read       boolean
```

### `Conversation`
```
id               string
user             { name, username, avatar_url }
last_message     string
last_message_by  me | them
timestamp        string (date-time)
unread           boolean
```

### `Message`
```
id               string
conversation_id  string
sender           me | them
content          string
timestamp        string (date-time)
type             text | image
image_url        string | null
```

### `DiscoverFeed`
```
trending_hashtags   { tag, posts_count }[]
trending_topics     { label, category, posts_count }[]
posts               Post[]
categories          { id, name, thumbnail_url }[]
```

### Pagination wrappers

| Schema | `items` type |
|--------|-------------|
| `PostFeedPage` | `Post[]` |
| `VideoFeedPage` | `Video[]` |
| `MessageFeedPage` | `Message[]` |

All have `nextCursor: string | null`.

---

## WebSocket API

Full spec: [`asyncapi.yaml`](./asyncapi.yaml)

**Connection URL:** `wss://api.jends.id/v1`

All frames are JSON with an `event` discriminator field.

### Channels

| Channel | Direction | Event | Description |
|---------|-----------|-------|-------------|
| `conversations/{id}/messages` | subscribe | `message.new` | Receive a new message |
| `conversations/{id}/messages` | publish | `message.send` | Send a message |
| `conversations/{id}/typing` | subscribe | `typing.update` | Receive typing status |
| `conversations/{id}/typing` | publish | `typing.update` | Broadcast typing status |
| `presence` | subscribe | `presence.update` | Contact online/offline status |

### Frame examples

**Send a message:**
```json
{
  "event": "message.send",
  "data": {
    "content": "Jadi, ketemu jam 7 ya!",
    "type": "text"
  }
}
```

**Receive a message:**
```json
{
  "event": "message.new",
  "data": {
    "id": "msg_001",
    "conversation_id": "conv_42",
    "sender": "them",
    "content": "Hei, besok jadi ketemuan?",
    "timestamp": "2025-04-20T10:30:00Z",
    "type": "text",
    "image_url": null
  }
}
```

**Typing indicator:**
```json
{
  "event": "typing.update",
  "data": { "username": "sarahcodes", "is_typing": true }
}
```

---

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2025-04 | Initial MVP spec — GET endpoints only |
