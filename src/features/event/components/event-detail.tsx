'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { Calendar, MapPoint, Monitor } from '@solar-icons/react';
import { SPACE_EVENTS } from '../api/mock-data';
import { SPACES } from '@/features/space/api/mock-data';

function formatFullDate(date: string): { month: string; day: string; weekday: string; full: string } {
  const d = new Date(date);
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate().toString();
  const weekday = d.toLocaleDateString('id-ID', { weekday: 'long' });
  const full = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  return { month, day, weekday, full };
}

function formatTime(time: string, timezone: string): string {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return m === '00' ? `${h12}:00 ${ampm} ${timezone}` : `${h12}:${m} ${ampm} ${timezone}`;
}

function formatLocationLabel(location: { type: string; venue?: string; platform?: string; address?: string }): string {
  if (location.type === 'online') return location.platform || 'Virtual';
  if (location.type === 'hybrid') return `${location.venue}`;
  return location.venue || location.address || 'Offline';
}

export function EventDetail({ eventId }: { eventId: string }) {
  const router = useRouter();
  const event = SPACE_EVENTS.find((e) => e.id === eventId);
  const space = event ? SPACES.find((t) => t.id === event.space_id) : null;

  if (!event) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Event tidak ditemukan</p>
        <button onClick={() => router.back()} className="mt-4 text-sm font-medium text-primary hover:underline">
          Kembali
        </button>
      </div>
    );
  }

  const { month, day, full } = formatFullDate(event.schedule.date);
  const isOnline = event.location.type === 'online';
  const isUpcoming = event.status === 'upcoming';

  return (
    <div className="w-full">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 size-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ArrowLeft className="size-5" />
      </button>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* ── Left column ── */}
        <div className="lg:w-lg shrink-0 space-y-6">
          {/* Banner */}
          <div className="rounded-2xl overflow-hidden bg-muted aspect-square">
            <img
              src={event.banner_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hosted By */}
          <div>
            <p className="text-[13px] text-muted-foreground font-medium mb-3">Hosted By</p>
            <div className="flex items-center gap-3">
              <img
                src={event.created_by.avatar_url}
                alt={event.created_by.full_name}
                className="size-8 rounded-full object-cover"
              />
              <p className="text-[14px] font-semibold">{event.created_by.full_name}</p>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <p className="text-[13px] text-muted-foreground font-medium mb-3">
              {event.attendees_count} Going
            </p>
            <div className="flex -space-x-2">
              {Array.from({ length: Math.min(6, event.attendees_count) }).map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?u=attendee-${event.id}-${i}`}
                  alt=""
                  className="size-8 rounded-full border-2 border-background object-cover"
                />
              ))}
              {event.attendees_count > 6 && (
                <div className="size-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
                  +{event.attendees_count - 6}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Featured in space */}
          {space && (
            <Link href="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted transition-colors">
              <img
                src={space.avatar_url}
                alt={space.name}
                className="size-5 rounded-md object-cover"
              />
              <span className="text-[13px] font-medium">Featured in {space.name}</span>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            {event.title}
          </h1>

          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-muted/60 border border-border flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-muted-foreground leading-none">{month}</span>
              <span className="text-[18px] font-bold leading-tight">{day}</span>
            </div>
            <div>
              <p className="text-[15px] font-semibold">{full}</p>
              <p className="text-[14px] text-muted-foreground">{formatTime(event.schedule.time, event.schedule.timezone)}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-muted/60 border border-border flex items-center justify-center shrink-0">
              {isOnline ? <Monitor className="size-5 text-muted-foreground" /> : <MapPoint className="size-5 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[15px] font-semibold">{isOnline ? 'Virtual' : formatLocationLabel(event.location)}</p>
                {!isOnline && event.location.address && (
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                )}
              </div>
              {event.location.address && (
                <p className="text-[14px] text-muted-foreground">{event.location.address}</p>
              )}
              {isOnline && event.location.platform && (
                <p className="text-[14px] text-muted-foreground">{event.location.platform}</p>
              )}
            </div>
          </div>

          {/* Registration */}
          {isUpcoming && (
            <div className="rounded-2xl bg-muted/40 p-5 space-y-3">
              <p className="text-[13px] font-semibold text-muted-foreground">Registration</p>
              <p className="text-[14px] text-foreground/80">
                Bergabung di event ini dan jangan sampai ketinggalan!
              </p>
              <button className="w-full h-12 rounded-xl border border-border bg-background text-foreground font-semibold text-[15px] hover:bg-muted/50 transition-colors">
                {event.cta.label}
              </button>
            </div>
          )}

          {/* About Event */}
          <div>
            <p className="text-[13px] font-semibold text-muted-foreground mb-3">About Event</p>
            <p className="text-[15px] text-foreground/80 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
