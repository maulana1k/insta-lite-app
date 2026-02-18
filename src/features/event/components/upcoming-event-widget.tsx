'use client';

import { Calendar } from '@solar-icons/react';
import { SPACE_EVENTS } from '../api/mock-data';
import { useFeedStore } from '@/features/post/store/feed-store';
import { useSpaceStore } from '@/features/space/store/space-store';

function formatShortDate(date: string, time: string): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString('id-ID', { month: 'short' });
  return `${day} ${month} \u00B7 ${time} WIB`;
}

export function UpcomingEventWidget() {
  const { activeSpaceId } = useFeedStore();
  const { setSpaceViewMode } = useSpaceStore();

  const nextEvent = SPACE_EVENTS
    .filter((e) => e.space_id === activeSpaceId && e.status === 'upcoming')
    .sort((a, b) => new Date(a.schedule.date).getTime() - new Date(b.schedule.date).getTime())[0];

  if (!nextEvent) return null;

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* Small banner */}
      <div className="relative h-24">
        <img
          src={nextEvent.banner_url}
          alt={nextEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-[10px] font-semibold">
          Mendatang
        </span>
      </div>

      <div className="px-4 py-3 space-y-2">
        <h4 className="font-semibold text-[14px] leading-snug line-clamp-2">
          {nextEvent.title}
        </h4>
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>{formatShortDate(nextEvent.schedule.date, nextEvent.schedule.time)}</span>
        </div>
        <button
          onClick={() => setSpaceViewMode('events')}
          className="text-[12px] font-semibold text-primary hover:underline"
        >
          Lihat semua event &rarr;
        </button>
      </div>
    </div>
  );
}
