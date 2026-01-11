
import { Skeleton } from "@/components/ui/skeleton";

export function TopicSidebarSkeleton() {
  return (
    <div className="hidden lg:flex flex-col w-80 sticky top-24 pr-4 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shrink-0 gap-6">
       
       {/* Feeds Skeleton */}
       <div>
          <Skeleton className="h-6 w-20 mb-3 ml-2" /> {/* Title */}
          <div className="flex items-center gap-3 px-2 py-2">
             <Skeleton className="w-10 h-10 rounded-lg" />
             <Skeleton className="h-4 w-24" />
          </div>
       </div>

       {/* Your Spaces Skeleton */}
       <div>
         <Skeleton className="h-6 w-28 mb-3 ml-2" />
         <div className="flex flex-col gap-1">
           {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex items-center gap-3 p-2">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                   <Skeleton className="h-4 w-32" />
                </div>
             </div>
           ))}
         </div>
       </div>

       {/* Recommended Skeleton */}
       <div>
         <Skeleton className="h-6 w-32 mb-3 ml-2" />
         <div className="flex flex-col gap-4">
           {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex items-start gap-3 p-2">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                   <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-7 w-16 rounded-full" />
                   </div>
                   <Skeleton className="h-3 w-full" />
                   <Skeleton className="h-3 w-[80%]" />
                </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
}
