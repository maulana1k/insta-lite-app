'use client';

import { useVideosStore } from '../store/videos-store';
import { cn } from '@/lib/utils';
import { Search, Settings } from 'lucide-react';

const CATEGORIES = [
  'For You',
  'Following',
  'Popular',
  'Featured',
  'Live',
  'Continue Watching',
  'Watch Later'
];

export function VideosHeader() {
  const { activeCategory, setActiveCategory } = useVideosStore();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 pt-3 sticky top-15 bg-background/90 backdrop-blur-lg z-20">
      {/* Categories */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "py-3 text-sm font-medium whitespace-nowrap transition-colors relative",
              activeCategory === category 
                ? "text-foreground font-bold" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
            {activeCategory === category && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Search Bar - Specific for Videos as per design */}
      <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
          <button className="md:hidden">
              <Search className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 w-[250px]">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input 
                 type="text" 
                 placeholder="Search" 
                 className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
              />
          </div>
          <button className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
}
