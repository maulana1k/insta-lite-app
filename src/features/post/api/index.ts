/**
 * Post API
 *
 * All functions are typed and include REST endpoint comments.
 * Replace the mock implementations with real API calls when the backend is ready.
 *
 * Authentication pattern (add to all authenticated requests):
 *   Authorization: Bearer {token}
 */

import type { Post, PostComment } from "../types";
import {
  FOLLOWING_POST_IDS,
  MOCK_COMMENTS,
  MOCK_POSTS,
  SAVED_POST_IDS,
} from "./mock-data";

// ── Pagination ─────────────────────────────────────────────────────────────

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

const PAGE_SIZE = 10;

/** Simulate network latency in development */
async function simulateLatency(ms = 600) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/** Cursor-based slicing for mock data */
function paginateMock<T extends { id: string }>(
  items: T[],
  cursor?: string,
): Page<T> {
  const startIndex = cursor
    ? items.findIndex((item) => item.id === cursor) + 1
    : 0;
  const slice = items.slice(startIndex, startIndex + PAGE_SIZE);
  const nextCursor =
    slice.length === PAGE_SIZE ? slice[slice.length - 1].id : null;
  return { items: slice, nextCursor };
}

// ── Feed ───────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/posts?feed=for_you&cursor={cursor}
 * Authorization: Bearer {token}
 *
 * Returns the "For You" feed with cursor-based pagination.
 */
export async function fetchForYouFeed(cursor?: string): Promise<Page<Post>> {
  // TODO: replace mock with:
  // return apiClient.get<Page<Post>>('/posts', { params: { feed: 'for_you', cursor } });
  await simulateLatency();
  return paginateMock(MOCK_POSTS, cursor);
}

/**
 * GET /api/v1/posts?feed=following&cursor={cursor}
 * Authorization: Bearer {token}
 *
 * Returns posts from users the current user follows.
 */
export async function fetchFollowingFeed(cursor?: string): Promise<Page<Post>> {
  // TODO: replace mock with:
  // return apiClient.get<Page<Post>>('/posts', { params: { feed: 'following', cursor } });
  await simulateLatency();
  const filtered = MOCK_POSTS.filter((post) =>
    FOLLOWING_POST_IDS.includes(post.id),
  );
  return paginateMock(filtered, cursor);
}

/**
 * GET /api/v1/posts?feed=saved&cursor={cursor}
 * Authorization: Bearer {token}
 *
 * Returns the current user's saved/bookmarked posts.
 */
export async function fetchSavedFeed(cursor?: string): Promise<Page<Post>> {
  // TODO: replace mock with:
  // return apiClient.get<Page<Post>>('/posts', { params: { feed: 'saved', cursor } });
  await simulateLatency();
  const filtered = MOCK_POSTS.filter((post) =>
    SAVED_POST_IDS.includes(post.id),
  );
  return paginateMock(filtered, cursor);
}

/**
 * GET /api/v1/spaces/{spaceId}/posts?cursor={cursor}
 * Authorization: Bearer {token}
 *
 * Returns posts belonging to the given space.
 */
export async function fetchSpaceFeed(
  spaceId: string,
  cursor?: string,
): Promise<Page<Post>> {
  // TODO: replace mock with:
  // return apiClient.get<Page<Post>>(`/spaces/${spaceId}/posts`, { params: { cursor } });
  await simulateLatency();
  const filtered = MOCK_POSTS.filter((post) => post.space?.id === spaceId);
  return paginateMock(filtered, cursor);
}

// ── Posts ──────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/posts/{postId}
 * Authorization: Bearer {token}
 */
export async function fetchPost(postId: string): Promise<Post | null> {
  // TODO: replace mock with:
  // return apiClient.get<Post>(`/posts/${postId}`);
  await simulateLatency(300);
  return MOCK_POSTS.find((p) => p.id === postId) ?? null;
}

/**
 * GET /api/v1/posts/{postId}/comments
 * Authorization: Bearer {token}
 */
export async function fetchPostComments(
  postId: string,
): Promise<PostComment[]> {
  // TODO: replace mock with:
  // return apiClient.get<PostComment[]>(`/posts/${postId}/comments`);
  await simulateLatency(400);
  return MOCK_COMMENTS[postId] ?? [];
}
