/**
 * Event API
 *
 * All functions are typed and include REST endpoint comments.
 * Replace the mock implementations with real API calls when the backend is ready.
 */

import { SPACE_EVENTS } from './mock-data';
import { SpaceEvent, EventFilter } from '../types';

/** Simulate network latency in development */
async function simulateLatency(ms = 400) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Space Events ───────────────────────────────────────────────────────────

/**
 * GET /api/v1/spaces/{spaceId}/events?filter={filter}
 * Authorization: Bearer {token}
 */
export async function fetchSpaceEvents(
  spaceId: string,
  filter: EventFilter = 'all',
): Promise<SpaceEvent[]> {
  // TODO: replace mock with:
  // return apiClient.get<SpaceEvent[]>(`/spaces/${spaceId}/events`, { params: { filter } });
  await simulateLatency();

  let events = SPACE_EVENTS.filter((e) => e.space_id === spaceId);

  if (filter === 'upcoming') {
    events = events.filter((e) => e.status === 'upcoming');
  } else if (filter === 'past') {
    events = events.filter((e) => e.status === 'past');
  }

  return events.sort((a, b) => {
    if (a.status === 'upcoming' && b.status === 'upcoming') {
      return new Date(a.schedule.date).getTime() - new Date(b.schedule.date).getTime();
    }
    if (a.status === 'past' && b.status === 'past') {
      return new Date(b.schedule.date).getTime() - new Date(a.schedule.date).getTime();
    }
    return a.status === 'upcoming' ? -1 : 1;
  });
}
