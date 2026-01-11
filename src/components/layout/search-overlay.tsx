'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockCircle } from '@solar-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES = [
  'nike air force 1',
  'sunset photography',
  'minimal design',
  'street style',
  'architecture',
  'food photography',
];

export function SearchOverlay() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isSearchOpen]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="">
      {!currentQuery ? (
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="
              flex items-center justify-center gap-2
              w-52 px-4 py-2
              rounded-xl
              bg-muted
              border border-border
              text-sm font-medium text-muted-foreground

              transition-all duration-150 ease-out
              hover:bg-muted/80
              
              active:scale-[0.9]
              active:bg-muted/70
              
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/30
              "
        >
          Search
        </button>
      ) : (
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="
              flex items-center justify-center gap-2
              w-52 px-4 py-2
              rounded-xl
              border-2 border-border
              text-sm font-medium 

              transition-all duration-150 ease-out
              hover:bg-muted/80
              
              active:scale-[0.9]
              active:bg-muted/70
              "
        >
          {currentQuery}
        </button>
      )}

      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed z-50 top-full left-1/2 -translate-x-1/2 mt w-[500px] origin-top"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -6 }}
              transition={{
                type: 'spring',
                stiffness: 620,
                damping: 34,
                mass: 1.5,
              }}
              onClick={(e) => e.stopPropagation()}
            >

              <div
                ref={overlayRef}
                className="
                border border-border
                rounded-4xl
                bg-white dark:bg-neutral-900
                shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]
                overflow-hidden
              "
              >
                {/* Search input */}
                <div className="p-4 pb-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-1 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />

                    <input
                      ref={inputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value.trimStart())}
                      onKeyDown={handleKeyDown}
                      placeholder="Search users, posts or videos"
                      className='w-full border-none focus:outline-none pl-9'
                    // className="
                    //   w-full pl-11 pr-10 py-2.5
                    //   bg-muted/40
                    //   border border-border
                    //   rounded-xl text-sm
                    //   transition-all duration-200
                    //   focus:outline-none
                    // "
                    />

                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-muted rounded-full p-1"
                      >
                        <X className="size-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="max-h-[360px] overflow-y-auto no-scrollbar">
                  <div
                    className={`
      transition-all duration-300 ease-out
      ${searchQuery ? 'opacity-0 max-h-0 pointer-events-none' : 'opacity-100 max-h-[360px]'}
    `}
                  >
                    <div className="p-3 space-y-1">
                      <h3 className="px-3 text-sm font-semibold">Recent</h3>
                      {RECENT_SEARCHES.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleSearch(item)}
                          className="w-full flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-muted"
                        >
                          <ClockCircle weight="Bold" className="size-5 text-muted-foreground/70" />
                          <span className="text-[15px]">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`
      transition-all duration-300 ease-out
      ${searchQuery ? 'opacity-100 min-h-[50px] pointer-events-none' : 'opacity-0 max-h-0'}
    `}
                  >

                    <div
                      className={`
                      transition-all duration-200 ease-out
                      ${searchQuery ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                      `}
                    >
                      <div
                        className="p-6 text-sm text-muted-foreground cursor-pointer"
                        onClick={() => handleSearch(searchQuery)}
                      >
                        Search for “{searchQuery}”
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

  );
}


