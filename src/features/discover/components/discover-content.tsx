'use client';

import { DISCOVER_CATEGORIES, DISCOVER_POSTS } from '../api/mock-data';
import { cn } from '@/lib/utils';
import { Play, Copy, Video as VideoIcon } from 'lucide-react';

export function DiscoverCategories() {
  return (
    <div className="flex items-center justify-center gap-4 overflow-x-auto py-6 no-scrollbar">

      <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]">
        <div className="w-20 h-14 rounded-lg overflow-hidden border-2 border-foreground relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop"
            alt="For you"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <span className="text-xs font-semibold  border-foreground pb-0.5">For you</span>
      </div>

      {DISCOVER_CATEGORIES.map((category) => (
        <div key={category.id} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]">
          <div className="w-20 h-14 rounded-lg overflow-hidden border border-transparent group-hover:border-foreground/20 transition-all relative">
            <img
              src={category.thumbnail_url}
              alt={category.name}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{category.name}</span>
        </div>
      ))}

      <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[80px]">
        <div className="w-20 h-14 rounded-lg border border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors">
          <span className="text-[10px] font-semibold text-muted-foreground">See More</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">See More</span>
      </div>
    </div>
  );
}

export function DiscoverGrid() {
  const posts = DISCOVER_POSTS;

  // Custom layout logic to mimic the reference image
  // First item is big (span 2 cols, 2 rows)
  // Rest are 1x1

  return (
    <div className="grid grid-cols-3 auto-rows-[250px] gap-1 md:gap-4 pb-20">
      {posts.map((post, index) => {
        // Mock logic for the "Big Video Card" at index 0
        const isFeatured = index === 0;

        return (
          <div
            key={post.id}
            className={cn(
              "relative group cursor-pointer",
              // First item spans 2 columns and 2 rows
              isFeatured ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            )}
          >
            {/* Ambient Glow Backend */}
            {/* {isFeatured && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-100 pointer-events-none "
                style={{ backgroundImage: `url(${post.image_url})` }}
              />
            )} */}

            <div className="relative w-full h-full overflow-hidden bg-muted">
              <img
                src={post.image_url}
                alt={post.caption || 'Post'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay for hover or featured text */}
              <div className={cn(
                "absolute inset-0 bg-black/0 transition-colors",
                isFeatured ? "bg-black/10" : "group-hover:bg-black/20"
              )} />

              {/* Featured Item Content */}
              {isFeatured && (
                <div className="absolute bottom-6 left-6 text-white group">
                  {/* glow */}
                  <div
                    className="
            absolute -inset-6
            rounded-3xl
            bg-linear-to-br from-white/20 via-white/10 to-transparent
            blur-2xl
            opacity-70
            pointer-events-none
          "
                  />

                  {/* content */}
                  <div className="relative">
                    <div className="
            w-12 h-12 rounded-full
            border-2 border-white/80
            flex items-center justify-center
            mb-3
            backdrop-blur-sm bg-white/10
            group-hover:scale-105 transition-transform
          ">
                      <Play fill="white" className="ml-1" size={20} />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1 block">
                      Watch
                    </span>

                    <h3 className="text-2xl font-bold leading-tight">
                      Videos You Might Like
                    </h3>
                  </div>
                </div>
              )}

              {/* Generic Icon overlays for non-featured items */}
              {!isFeatured && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                  {index % 3 === 0 ? <Copy color="white" size={18} /> : index % 2 === 0 ? <VideoIcon color="white" size={18} /> : null}
                </div>
              )}

              {/* Hover stats for non-featured */}
              {!isFeatured && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white font-bold gap-4 pointer-events-none">
                  <span className='drop-shadow-md'>{formatNumber(post.likes_count)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatNumber(num: number) {
  if (num > 999) return (num / 1000).toFixed(1) + 'k';
  return num;
}
