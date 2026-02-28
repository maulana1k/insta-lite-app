"use client";

import {
  Calendar,
  MapPoint,
  Monitor,
  UsersGroupTwoRounded,
} from "@solar-icons/react";
import { useEventStore } from "../store/event-store";
import type { SpaceEvent } from "../types";

function formatTime(time: string, timezone: string): string {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return m === "00"
    ? `${h12} ${ampm} ${timezone}`
    : `${h12}:${m} ${ampm} ${timezone}`;
}

function formatShortDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function formatLocationLabel(location: SpaceEvent["location"]): string {
  if (location.type === "online") return location.platform || "Virtual";
  if (location.type === "hybrid") return `${location.venue}`;
  return location.venue || location.address || "Offline";
}

export function EventCard({ event }: { event: SpaceEvent }) {
  const isOnline = event.location.type === "online";
  const { setActiveEventId } = useEventStore();

  return (
    <div
      onClick={() => setActiveEventId(event.id)}
      className="flex gap-4 p-2 cursor-pointer group active:opacity-70 transition-opacity"
    >
      {/* Banner — left */}
      <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-muted relative">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Date overlay badge */}
        <div className="absolute top-1.5 left-1.5 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <p className="text-[11px] font-bold leading-tight text-center">
            {formatShortDate(event.schedule.date)}
          </p>
        </div>
      </div>

      {/* Info — right */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
        {/* Title */}
        <h3 className="font-semibold text-xl leading-tight line-clamp-2 tracking-[-0.01em]">
          {event.title}
        </h3>

        {/* Time */}
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" />
          <span>
            {formatTime(event.schedule.time, event.schedule.timezone)}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          {isOnline ? (
            <Monitor className="size-3.5 shrink-0" />
          ) : (
            <MapPoint className="size-3.5 shrink-0" />
          )}
          <span className="truncate">
            {isOnline ? "Virtual" : formatLocationLabel(event.location)}
          </span>
        </div>

        {/* Attendees */}
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <UsersGroupTwoRounded className="size-3.5 shrink-0" />
          <span>
            {event.attendees_count} peserta
            {event.max_attendees ? ` / ${event.max_attendees}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
