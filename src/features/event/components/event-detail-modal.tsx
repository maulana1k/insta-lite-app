'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, ChevronRight, ArrowUpRight, Copy, Star } from 'lucide-react';
import { Calendar, MapPoint, Monitor } from '@solar-icons/react';
import { useEventStore } from '../store/event-store';
import { SPACE_EVENTS } from '../api/mock-data';
import { SPACES } from '@/features/space/api/mock-data';

function formatFullDate(date: string): { month: string; day: string; full: string } {
  const d = new Date(date);
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate().toString();
  const full = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return { month, day, full };
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

const REVIEWS = [
  { id: 1, user: { name: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?u=1' }, rating: 5, date: '2 days ago', text: 'This event was absolutely amazing! The vibe was electric and well organized.' },
  { id: 2, user: { name: 'Mike T.', avatar: 'https://i.pravatar.cc/150?u=2' }, rating: 4, date: '1 week ago', text: 'Great experience overall. The venue was easy to find, but parking was a bit tight.' },
  { id: 3, user: { name: 'Emily R.', avatar: 'https://i.pravatar.cc/150?u=3' }, rating: 5, date: '2 weeks ago', text: 'Had a blast with my friends! Highly recommended for anyone interested.' },
  { id: 4, user: { name: 'David K.', avatar: 'https://i.pravatar.cc/150?u=4' }, rating: 3, date: '3 weeks ago', text: 'It was okay. Expected a bit more content for the price, but still fun.' },
];

const RATING_SUMMARY = {
  average: 4.6,
  total: 128,
  distribution: { 5: 80, 4: 30, 3: 10, 2: 5, 1: 3 }
};

export function EventDetailModal() {
  const { activeEventId, setActiveEventId } = useEventStore();
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');
  const event = activeEventId ? SPACE_EVENTS.find((e) => e.id === activeEventId) : null;
  const space = event ? SPACES.find((t) => t.id === event.space_id) : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveEventId(null);
    };
    if (activeEventId) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeEventId, setActiveEventId]);

  if (!activeEventId || !event) return null;

  const { month, day, full } = formatFullDate(event.schedule.date);
  const isOnline = event.location.type === 'online';
  const isUpcoming = event.status === 'upcoming';

  const modal = (
    <AnimatePresence>
      {activeEventId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-lg overflow-y-auto overscroll-contain py-10 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveEventId(null); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl bg-background rounded-[32px] overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setActiveEventId(null)}
              className="absolute top-4 right-4 z-10 size-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Banner */}
            <div className="aspect-[2.5/1] bg-muted">
              <img
                src={event.banner_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Two-column: left info, right CTA */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                {/* Left — main info */}
                <div className="flex-1 min-w-0 space-y-5">

                  {/* Featured in space */}
                  {space && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/60">
                      <img src={space.avatar_url} alt={space.name} className="size-5 rounded-md object-cover" />
                      <span className="text-[13px] font-medium">Featured in {space.name}</span>
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                    {event.title}
                  </h2>

                  {/* Date & Time */}
                  <div className="flex items-start gap-3.5">
                    <div className="size-11 rounded-xl bg-muted/60 border border-border flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold text-muted-foreground leading-none">{month}</span>
                      <span className="text-[17px] font-bold leading-tight">{day}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">{full}</p>
                      <p className="text-[13px] text-muted-foreground">{formatTime(event.schedule.time, event.schedule.timezone)}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="size-11 rounded-xl bg-muted/60 border border-border flex items-center justify-center shrink-0">
                      {isOnline ? <Monitor className="size-4.5 text-muted-foreground" /> : <MapPoint className="size-4.5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[14px] font-semibold">{isOnline ? 'Virtual' : formatLocationLabel(event.location)}</p>
                        {!isOnline && event.location.address && <ExternalLink className="size-3 text-muted-foreground" />}
                      </div>
                      {event.location.address && <p className="text-[13px] text-muted-foreground">{event.location.address}</p>}
                      {isOnline && event.location.platform && <p className="text-[13px] text-muted-foreground">{event.location.platform}</p>}
                    </div>
                  </div>
                </div>

                {/* Right — Registration + Hosted by */}
                <div className="lg:w-64 shrink-0 space-y-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/event/${event.id}`}
                      onClick={() => setActiveEventId(null)}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-border text-[14px] font-medium hover:bg-muted/50 transition-colors"
                    >
                      <Copy className="size-4" />
                      Copy Link
                    </Link>
                    <Link
                      href={`/event/${event.id}`}
                      onClick={() => setActiveEventId(null)}
                      className="flex items-center justify-center gap-1 w-full py-2 rounded-xl border border-border text-[14px] font-medium hover:bg-muted/50 transition-colors"
                    >
                      Event Page
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                  {/* Registration */}
                  {isUpcoming && (
                    <div className="rounded-2xl bg-muted/40 p-4 space-y-2.5">
                      <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">Registration</p>
                      <p className="text-[13px] text-foreground/70">Bergabung dan jangan sampai ketinggalan!</p>
                      <button className="w-full h-10 rounded-xl border border-border bg-background text-foreground font-semibold text-[14px] hover:bg-muted/50 transition-colors">
                        {event.cta.label}
                      </button>
                    </div>
                  )}

                  {/* Hosted by */}
                  <div>
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Hosted By</p>
                    <div className="flex items-center gap-2.5">
                      <img src={event.created_by.avatar_url} alt={event.created_by.full_name} className="size-8 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold truncate">{event.created_by.full_name}</p>
                        <p className="text-[11px] text-muted-foreground">@{event.created_by.username}</p>
                      </div>
                    </div>
                  </div>

                  {/* Attendees */}
                  <div>
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">{event.attendees_count} Going</p>
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(6, event.attendees_count) }).map((_, i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/40?u=attendee-${event.id}-${i}`}
                          alt=""
                          className="size-7 rounded-full border-2 border-background object-cover"
                        />
                      ))}
                      {event.attendees_count > 6 && (
                        <div className="size-7 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
                          +{event.attendees_count - 6}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-6 border-b border-border mb-6">
                {(['about', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-3 text-[14px] font-semibold capitalize transition-colors ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
                      }`}
                  >
                    {tab === 'about' ? 'About Event' : 'Reviews'}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[100px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'about' ? (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.1 }}
                    >
                      <p className="text-[14px] text-foreground/80 leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="space-y-8"
                    >
                      {/* Rating Summary */}
                      <div className="flex gap-8 items-start">
                        <div className="text-center space-y-1">
                          <div className="text-5xl font-bold tracking-tight text-foreground">{RATING_SUMMARY.average}</div>
                          <div className="flex gap-0.5 justify-center text-yellow-500">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} className={`size-3.5 ${s <= Math.round(RATING_SUMMARY.average) ? 'fill-current' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <div className="text-[12px] text-muted-foreground">{RATING_SUMMARY.total.toLocaleString()} reviews</div>
                        </div>
                        <div className="flex-1 space-y-1.5 pt-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = RATING_SUMMARY.distribution[rating as keyof typeof RATING_SUMMARY.distribution];
                            const percent = (count / RATING_SUMMARY.total) * 100;
                            return (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="text-[12px] font-medium w-3 text-muted-foreground">{rating}</span>
                                <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Review List */}
                      <div className="space-y-6">
                        {REVIEWS.map((review) => (
                          <div key={review.id} className="flex gap-4">
                            <img src={review.user.avatar} alt={review.user.name} className="size-9 rounded-full object-cover border border-border" />
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-semibold">{review.user.name}</span>
                                <span className="text-[11px] text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="flex gap-0.5 text-yellow-500">
                                {[1, 2, 3, 4, 5].map(s => (
                                  <Star key={s} className={`size-3 ${s <= review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} />
                                ))}
                              </div>
                              <p className="text-[13px] text-foreground/80 leading-relaxed">{review.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Open full page link */}
              <Link
                href={`/event/${event.id}`}
                onClick={() => setActiveEventId(null)}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border text-[14px] font-medium hover:bg-muted/50 transition-colors"
              >
                Buka halaman event
                <ExternalLink className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modal, document.body);
}
