
import { Skeleton } from "@/components/ui/skeleton";

export function SuggestedUsersSkeleton() {
  return (
    <div className="hidden xl:flex flex-col w-72 h-fit gap-5 sticky top-24 shrink-0">
      {/* Recommended Spaces Skeleton */}
      <div className="w-full rounded-2xl px-4">
        <Skeleton className="h-5 w-40 mb-3" />
        <div className="flex flex-col">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="size-4 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* You May Know Skeleton */}
      <div className="w-full rounded-2xl px-4">
        <Skeleton className="h-5 w-28 mb-4" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
