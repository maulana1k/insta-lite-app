'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Search, LayoutGrid, LayoutList, X, History } from 'lucide-react';
import { useSpaceStore } from '../store/space-store';
import { useEventStore } from '@/features/event/store/event-store';
import { useFeedStore } from '@/features/post/store/feed-store';
import { EventFilter } from '@/features/event/types';
import { FireMinimalistic, Like } from '@solar-icons/react';

type SortMode = 'recent' | 'top' | 'trending';
type ViewMode = 'card' | 'compact';

const EVENT_FILTER_LABELS: Record<EventFilter, string> = {
  all: 'Semua',
  upcoming: 'Mendatang',
  past: 'Selesai',
};

export function SpaceFeedToolbar() {
  const { setActiveSpaceId } = useFeedStore();
  const { spaceViewMode, setSpaceViewMode } = useSpaceStore();
  const { eventFilter, setEventFilter } = useEventStore();
  const [sortMode, setSortMode] = useState<SortMode>('trending');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [sortOpen, setSortOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
      if (viewRef.current && !viewRef.current.contains(e.target as Node)) setViewOpen(false);
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const sortLabels: Record<SortMode, string> = {
    recent: 'Recent',
    top: 'Top',
    trending: 'Trending',
  };

  const sortIcons: Record<SortMode, React.ReactNode> = {
    recent: <History className="size-5" />,
    top: <Like weight='Bold' className="size-5" />,
    trending: <FireMinimalistic weight='Bold' className="size-5" />,
  };

  const handleBack = () => {
    setActiveSpaceId('all');
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="size-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors shrink-0"
      >
        <ArrowLeft className="size-5" />
      </button>

      {/* Posts / Events segmented control */}
      <div className="flex p-1 rounded-xl bg-muted/60">
        <button
          onClick={() => setSpaceViewMode('posts')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${spaceViewMode === 'posts'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground/70'
            }`}
        >
          Posts
        </button>
        <button
          onClick={() => setSpaceViewMode('events')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${spaceViewMode === 'events'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground/70'
            }`}
        >
          Events
        </button>
      </div>

      {/* Sort/View (posts) or Event filter (events) */}
      <AnimatePresence mode="wait">
        {!searchOpen && spaceViewMode === 'posts' && (
          <motion.div
            key="post-controls"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => { setSortOpen(!sortOpen); setViewOpen(false); }}
                className="h-10 px-4 rounded-full bg-muted/80 flex items-center gap-2 hover:bg-muted transition-colors text-[14px] font-medium"
              >
                {sortIcons[sortMode]}
                {sortLabels[sortMode]}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-background dark:bg-neutral-900 border border-border rounded-xl shadow-lg overflow-hidden z-10"
                  >
                    {(['recent', 'top', 'trending'] as SortMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setSortMode(mode); setSortOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2 ${sortMode === mode ? 'bg-muted text-foreground' : 'hover:bg-muted/50 text-foreground/80'
                          }`}
                      >
                        {sortIcons[mode]}
                        {sortLabels[mode]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View mode dropdown */}
            <div className="relative" ref={viewRef}>
              <button
                onClick={() => { setViewOpen(!viewOpen); setSortOpen(false); }}
                className="h-10 px-3.5 rounded-full bg-muted/80 flex items-center gap-2 hover:bg-muted transition-colors"
              >
                {viewMode === 'card' ? <LayoutGrid className="size-4.5" /> : <LayoutList className="size-4.5" />}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {viewOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-36 bg-background dark:bg-neutral-900 border border-border rounded-xl shadow-lg overflow-hidden z-10"
                  >
                    <button
                      onClick={() => { setViewMode('card'); setViewOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2 ${viewMode === 'card' ? 'bg-muted text-foreground' : 'hover:bg-muted/50 text-foreground/80'
                        }`}
                    >
                      <LayoutGrid className="size-4" />
                      Card
                    </button>
                    <button
                      onClick={() => { setViewMode('compact'); setViewOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors flex items-center gap-2 ${viewMode === 'compact' ? 'bg-muted text-foreground' : 'hover:bg-muted/50 text-foreground/80'
                        }`}
                    >
                      <LayoutList className="size-4" />
                      Compact
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {!searchOpen && spaceViewMode === 'events' && (
          <motion.div
            key="event-controls"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="h-10 px-4 rounded-full bg-muted/80 flex items-center gap-2 hover:bg-muted transition-colors text-[14px] font-medium"
              >
                {EVENT_FILTER_LABELS[eventFilter]}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-background dark:bg-neutral-900 border border-border rounded-xl shadow-lg overflow-hidden z-10"
                  >
                    {(['all', 'upcoming', 'past'] as EventFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => { setEventFilter(f); setFilterOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-[13px] font-medium transition-colors ${eventFilter === f ? 'bg-muted text-foreground' : 'hover:bg-muted/50 text-foreground/80'
                          }`}
                      >
                        {EVENT_FILTER_LABELS[f]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search — expands in place */}
      <AnimatePresence mode="wait">
        {searchOpen ? (
          <motion.div
            key="search-field"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'circOut' }}
            className="flex items-center gap-2 h-10 bg-muted/80 rounded-full px-3 overflow-hidden"
          >
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Cari di space..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground min-w-0"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="search-btn"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => { setSearchOpen(true); setSortOpen(false); setViewOpen(false); setFilterOpen(false); }}
            className="size-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors shrink-0"
          >
            <Search className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
