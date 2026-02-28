import { Skeleton } from "@/components/ui/skeleton";

export function FeedSkeleton() {
  return (
    <div className="max-w-2xl mx-auto pb-20 space-y-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-3 px-4">
          <div className="flex gap-2">
            {/* Left Col: Avatar (stacked topic + user style) */}
            <div className="flex flex-col items-center shrink-0 w-10">
              <div className="relative w-10 h-10 mb-2">
                <Skeleton className="absolute top-0 left-0 w-7 h-7 rounded-md" />
                <Skeleton className="absolute bottom-0 right-0 w-7 h-7 rounded-full" />
              </div>
              <div className="w-0.5 grow bg-muted my-1 rounded-full min-h-8" />
            </div>

            {/* Right Col: Content */}
            <div className="flex-1 min-w-0 pb-2 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3.5 w-8" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>

              {/* Body Text */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[55%]" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 -ml-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-1.5 px-2 py-1.5"
                  >
                    <Skeleton className="size-5 rounded-full" />
                    {j < 3 && <Skeleton className="h-3.5 w-8" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show replies row */}
          <div className="flex items-center gap-2 pb-2">
            <div className="shrink-0 w-10 flex justify-center">
              <Skeleton className="size-5 rounded" />
            </div>
            <Skeleton className="h-3.5 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
