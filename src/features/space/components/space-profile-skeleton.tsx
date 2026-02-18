
import { Skeleton } from "@/components/ui/skeleton";

export function SpaceProfileSkeleton() {
  return (
    <div className="hidden xl:flex flex-col w-80 h-fit sticky top-24 shrink-0 gap-4">
      {/* Main card */}
      <div className="rounded-3xl overflow-hidden border border-border">
        {/* Banner */}
        <Skeleton className="w-full h-28 rounded-none" />

        {/* Profile info */}
        <div className="px-5 pb-5">
          {/* Avatar row */}
          <div className="flex items-end gap-3 -mt-7 relative z-10 mb-3">
            <Skeleton className="size-14 rounded-2xl shrink-0 border-3 border-background" />
            <div className="flex-1 min-w-0 pb-0.5 space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 mb-4">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[85%]" />
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-20" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Skeleton className="flex-1 h-9 rounded-full" />
            <Skeleton className="size-9 rounded-full shrink-0" />
          </div>
        </div>
      </div>

      {/* About / Rules card */}
      <div className="rounded-2xl border border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex p-1 mx-3 mt-3 rounded-xl bg-muted/60">
          <Skeleton className="flex-1 h-7 rounded-lg" />
          <Skeleton className="flex-1 h-7 rounded-lg" />
        </div>

        {/* Tab content */}
        <div className="px-5 py-4 space-y-2.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-[80%]" />
          <Skeleton className="h-3.5 w-[60%]" />
          <Skeleton className="h-3 w-28 mt-1" />
        </div>
      </div>
    </div>
  );
}
