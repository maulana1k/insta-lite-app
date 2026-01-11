'use client';

import { useFeedModeStore } from '../store/feed-mode-store';
import { TOPICS } from '../api/mock-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';


export function TopicSidebar() {
  const { activeTopicId, setActiveTopicId } = useFeedModeStore();

  const FOLLOWED_TOPICS = TOPICS.slice(0, 3);
  const RECOMMENDED_TOPICS = TOPICS.slice(3);

  return (
    <div className="hidden lg:flex flex-col w-80 sticky top-24 pr-4 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shrink-0 gap-6">
       
       {/* Main Feeds */}
       <div>
          <h3 className="font-bold text-lg px-2 mb-3 text-foreground/80">Feeds</h3>
          <div 
             onClick={() => setActiveTopicId('all')}
             className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors",
                activeTopicId === 'all' ? "bg-muted" : "hover:bg-muted/50"
             )}
          >
             <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Compass size={24}  />
             </div>
             <span className={cn("font-medium", activeTopicId === 'all' ? "text-foreground" : "text-muted-foreground")}>
                For You
             </span>
          </div>
       </div>

       {/* Followed Spaces */}
       <div>
         <h3 className="font-bold text-lg px-2 mb-3 text-foreground/80">Your Spaces</h3>
         <div className="flex flex-col gap-1">
           {FOLLOWED_TOPICS.map((topic) => (
             <div 
               key={topic.id} 
               onClick={() => setActiveTopicId(topic.id)}
               className={cn(
                  "flex items-center gap-3 group cursor-pointer p-2 rounded-xl transition-colors",
                  activeTopicId === topic.id ? "bg-muted" : "hover:bg-muted/30"
               )}
             >
                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-muted border border-border">
                   <img src={topic.avatar_url} alt={topic.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <h4 className={cn("font-semibold text-[14px] truncate", activeTopicId === topic.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                      {topic.name}
                   </h4>
                   {/* <p className="text-[11px] text-muted-foreground">{formatCount(topic.posts_count)} posts</p> */}
                </div>
             </div>
           ))}
         </div>
       </div>

       {/* Recommended Spaces (keep existing design but list only recommended) */}
       <div>
         <h3 className="font-bold text-lg px-2 mb-3 text-foreground/80">Recommended</h3>
         <div className="flex flex-col gap-4">
           {RECOMMENDED_TOPICS.map((topic) => (
             <div key={topic.id} className="flex items-start gap-3 group cursor-pointer hover:bg-muted/30 p-2 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-muted border border-border mt-1">
                   <img src={topic.avatar_url} alt={topic.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-[14px] truncate text-foreground">{topic.name}</h4>
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs rounded-full border-muted-foreground/30 hover:bg-transparent hover:border-foreground transition-colors">
                         Follow
                      </Button>
                   </div>
                   <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {topic.description}
                   </p>
                </div>
             </div>
           ))}
         </div>
       </div>
       
       <div className="mt-4 px-2">
           <p className="text-xs text-muted-foreground hover:underline cursor-pointer">
              Discover more spaces
           </p>
       </div>
    </div>
  );
}

function formatCount(count: number) {
   if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
   if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
   return count.toString();
}
