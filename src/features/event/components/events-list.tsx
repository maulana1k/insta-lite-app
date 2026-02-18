'use client';

import { useMemo } from 'react';
import { useEvents } from '../hooks/use-events';
import { useEventStore } from '../store/event-store';
import { EventCard } from './event-card';
import { SpaceEvent } from '../types';

function formatSectionHeader(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleDateString('id-ID', { month: 'long' }).toUpperCase();
  const weekday = d.toLocaleDateString('id-ID', { weekday: 'long' });
  return <div className="text-sm my-2 font-semibold">{day} {month} <span className="text-muted-foreground">{weekday}</span></div>
}

function groupByDate(events: SpaceEvent[]): { date: string; events: SpaceEvent[] }[] {
  const groups: Record<string, SpaceEvent[]> = {};
  for (const event of events) {
    const key = event.schedule.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  }
  return Object.entries(groups).map(([date, events]) => ({ date, events }));
}

export function EventsList() {
  const { eventFilter } = useEventStore();
  const { data: events, isLoading } = useEvents(eventFilter);

  const grouped = useMemo(() => (events ? groupByDate(events) : []), [events]);

  if (isLoading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-3 bg-muted rounded w-36 mb-3" />
            <div className="rounded-2xl bg-muted/40 p-1">
              <div className="flex items-center gap-3.5 p-2.5">
                <div className="size-20 rounded-2xl bg-muted shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!grouped.length) {
    return (
      <div className="text-center py-16 text-muted-foreground text-[14px]">
        Belum ada event di space ini
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {grouped.map((group) => (
        <div key={group.date}>
          {/* Section header */}
          {formatSectionHeader(group.date)}

          {/* Grouped card */}
          <div className="rounded-2xl bg-muted/40 border border-transparent hover:border-border ">
            {group.events.map((event, i) => (
              <div key={event.id}>
                <EventCard event={event} />
                {i < group.events.length - 1 && (
                  <div className="ml-[calc(7rem+1rem+0.25rem)] mr-3">
                    <div className="h-px bg-border/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
