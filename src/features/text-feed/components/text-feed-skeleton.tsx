
import { Skeleton } from "@/components/ui/skeleton";

export function TextFeedSkeleton() {
  return (
    <div className="max-w-xl mx-auto pb-20 space-y-0">
      {/* Repeats to fill screen */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-3 px-4 border-b border-border/40">
           <div className="flex gap-4">
              {/* Left Col: Avatar + Line */}
              <div className="flex flex-col items-center shrink-0 w-10">
                 <Skeleton className="w-10 h-10 rounded-full mb-2" />
                 <div className="w-0.5 grow bg-muted my-2 rounded-full" />
              </div>

              {/* Right Col: Content */}
              <div className="flex-1 min-w-0 pb-4 space-y-3">
                 {/* Header */}
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Skeleton className="h-4 w-24" />
                       <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                 </div>

                 {/* Body Text */}
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[60%]" />
                 </div>
                 
                 {/* Action Icons */}
                 <div className="flex items-center gap-5 mt-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                 </div>
              </div>
           </div>
        </div>
      ))}
    </div>
  );
}
