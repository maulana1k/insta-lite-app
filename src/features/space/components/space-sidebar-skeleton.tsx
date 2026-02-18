
import { Skeleton } from "@/components/ui/skeleton";

export function SpaceSidebarSkeleton() {
  return (
    <div className="hidden lg:flex flex-col w-52 sticky top-24 pr-2 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shrink-0 gap-8">

       {/* Feeds Skeleton */}
       <div>
          <Skeleton className="h-6 w-16 mb-4 ml-2" />
          <div className="flex flex-col">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-3">
                <Skeleton className="size-6 rounded-md" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
       </div>

       {/* Your Spaces Skeleton */}
       <div>
         <Skeleton className="h-4 w-24 mb-3 ml-2" />
         <div className="flex flex-col gap-1">
           {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex items-center gap-3 p-2 rounded-xl">
                <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                   <Skeleton className="h-3 w-14" />
                   <Skeleton className="h-3.5 w-24" />
                </div>
             </div>
           ))}
         </div>
       </div>

       {/* Discover link */}
       <div className="px-2">
         <Skeleton className="h-3 w-28" />
       </div>
    </div>
  );
}
