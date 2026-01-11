import { Plain, Heart, ChatRound, Repeat, MenuDots, VerifiedCheck, Restart } from '@solar-icons/react';
import { TextPost } from '../types';
import { useRef } from 'react';
import Link from 'next/link';

interface TextPostCardProps {
   post: TextPost;
}

export function TextPostCard({ post }: TextPostCardProps) {
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   return (
      <div className="py-3 hover:bg-muted/5 transition-colors cursor-pointer px-4">
         <div className="flex gap-4">
            {/* Left Column: Avatar + Thread Line */}
            <div className="flex flex-col items-center shrink-0 w-10">
               <div className="relative w-10 h-10 mb-2">
                  {post.topic ? (
                     <>
                        <div className="absolute top-0 left-0 w-7 h-7 rounded-md overflow-hidden border border-border/50">
                           <img src={post.topic.avatar_url} alt={post.topic.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full overflow-hidden border-2 border-background">
                           <img src={post.user.avatar_url} alt={post.user.username} className="w-full h-full object-cover" />
                        </div>
                     </>
                  ) : (
                     <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50">
                        <img src={post.user.avatar_url} alt={post.user.username} className="w-full h-full object-cover" />
                     </div>
                  )}
                  {/* Add a tiny plus icon if needed, but not in visual ref */}
               </div>

               {/* Thread Line - Connecting to repliers */}
               <div className="w-0.5 grow bg-border/40 my-2 rounded-full" />

               {/* Repliers Pile (optional visual helper) */}
               {post.repliers_avatars && post.repliers_avatars.length > 0 && (
                  <div className="w-8 h-8 relative mt-2">
                     {post.repliers_avatars.slice(0, 2).map((avatar, i) => (
                        <div key={i} className={`absolute w-4 h-4 rounded-full border-2 border-background overflow-hidden ${i === 0 ? 'top-1 right-0 w-5 h-5' : 'bottom-0 left-0'}`}>
                           <img src={avatar} className="w-full h-full object-cover" />
                        </div>
                     ))}
                     {post.repliers_avatars.length > 2 && (
                        <div className="absolute top-0 left-1 w-3 h-3 rounded-full border-2 border-background overflow-hidden">
                           <img src={post.repliers_avatars[2]} className="w-full h-full object-cover" />
                        </div>
                     )}
                  </div>
               )}
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 min-w-0 pb-2">
               {/* Header */}
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                     <span className="font-semibold text-[15px]">{post.topic?.name}</span>
                     <span className="text-[15px]">by</span>
                     <span className="font-semibold text-[15px]">{post.user.username}</span>
                     {post.user.verified && <VerifiedCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />}
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-muted-foreground text-[14px]">{timeAgo(post.created_at)}</span>
                     <button className="text-muted-foreground hover:text-foreground">
                        <MenuDots className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               {/* Text Content */}
               <p className="text-[15px] whitespace-pre-wrap mb-3 leading-snug text-foreground/90 font-normal">
                  {post.content}
               </p>

               {/* Images */}
               {post.image_urls && post.image_urls.length > 0 && (
                  <div className="mb-3 w-full overflow-hidden">
                     <div
                        ref={scrollContainerRef}
                        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
                     >
                        {post.image_urls.map((url, idx) => (
                           <div key={idx} className="shrink-0 snap-start w-full md:w-auto h-64 aspect-4/5 rounded-xl overflow-hidden border border-border bg-muted relative">
                              <img src={url} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Action Icons */}
               <div className="flex items-center gap-3 mt-2 mb-3">
                  <ActionIcon icon={Heart} />
                  <ActionIcon icon={ChatRound} />
                  <ActionIcon icon={Restart} />
                  <ActionIcon icon={Plain} />
               </div>

               {/* Footer: Replies & Likes */}
               <div className="flex items-center gap-2 text-muted-foreground text-[14px]">
                  {post.repliers_avatars && post.repliers_avatars.length > 0 && (
                     <Link href={`/p/${post.id}`} className="hover:text-foreground cursor-pointer">
                        {post.comments_count} replies
                     </Link>
                  )}
                  <span className="text-muted-foreground/50">•</span>
                  <span className="hover:text-foreground cursor-pointer">{post.likes_count} likes</span>
               </div>
            </div>
         </div>
      </div>
   );
}

function ActionIcon({ icon: Icon }: { icon: any; }) {
   return (
      <button className="p-1 -ml-1 text-foreground hover:bg-muted rounded-full transition-colors">
         <Icon className="w-[22px] h-[22px]" strokeWidth={2} />
      </button>
   );
}

function timeAgo(dateString: string) {
   const date = new Date(dateString);
   const now = new Date();
   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

   if (seconds < 60) return `${seconds}s`;
   const minutes = Math.floor(seconds / 60);
   if (minutes < 60) return `${minutes}m`;
   const hours = Math.floor(minutes / 60);
   if (hours < 24) return `${hours}h`;
   return Math.floor(hours / 24) + 'd';
}
