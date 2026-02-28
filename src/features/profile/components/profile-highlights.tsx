import { Plus } from "lucide-react";
import type { Highlight } from "../types";

interface ProfileHighlightsProps {
  highlights: Highlight[];
}

export function ProfileHighlights({ highlights }: ProfileHighlightsProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="flex flex-col items-center gap-2 cursor-pointer group w-16"
        >
          <div className="relative p-[2px] rounded-full bg-border hover:bg-muted-foreground transition-colors">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-background group-hover:scale-95 transition-transform duration-200 bg-muted">
              <img
                src={highlight.cover_image}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs font-medium text-center truncate w-full">
            {highlight.title}
          </span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2 cursor-pointer group w-16">
        <div className="w-[60px] h-[60px] rounded-full border border-border flex items-center justify-center bg-transparent group-hover:bg-muted/50 transition-colors">
          <div className="w-0 h-0 border-l-[8px] border-l-primary border-y-[5px] border-y-transparent ml-1" />
        </div>
        <span className="text-xs font-bold text-center w-full">Watch all</span>
      </div>
    </div>
  );
}
