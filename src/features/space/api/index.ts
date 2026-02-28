/**
 * Space API
 *
 * All functions are typed and include REST endpoint comments.
 * Replace the mock implementations with real API calls when the backend is ready.
 */

import type { Space } from "../types";
import { SPACES } from "./mock-data";

/** Simulate network latency in development */
async function simulateLatency(ms = 400) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Spaces ─────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/spaces
 * Authorization: Bearer {token}
 *
 * Returns all available spaces (communities).
 */
export async function fetchSpaces(): Promise<Space[]> {
  // TODO: replace mock with:
  // return apiClient.get<Space[]>('/spaces');
  await simulateLatency();
  return SPACES;
}

/**
 * GET /api/v1/spaces/{slug}
 * Authorization: Bearer {token}
 */
export async function fetchSpace(slug: string): Promise<Space | null> {
  // TODO: replace mock with:
  // return apiClient.get<Space>(`/spaces/${slug}`);
  await simulateLatency(300);
  return SPACES.find((s) => s.slug === slug) ?? null;
}
