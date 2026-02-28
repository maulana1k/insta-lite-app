import { Plus } from "lucide-react";
import { useStoryPlayerStore } from "@/features/stories/store/story-player-store";
import { useStories } from "../hooks/use-feed-query";

export function UserStories() {
  const { data: stories } = useStories();
  const { openStoryPlayer } = useStoryPlayerStore();

  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
      <div className="flex items-center gap-8 px-4 min-w-max mx-auto justify-center">
        {/* Current User Story Add */}
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="relative p-[2px]">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-background ring-1 ring-muted-foreground/60">
              <img
                src="https://github.com/shadcn.png"
                alt="Your Story"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-0.5 border-2 border-background">
              <Plus className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Your Story
          </span>
        </div>

        {/* Other Stories */}
        {stories?.map((story, index) => (
          <div
            key={story.id}
            onClick={() => openStoryPlayer(index)}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="relative p-[2px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-background group-hover:scale-95 transition-transform duration-200">
                <img
                  src={story.user?.avatar_url}
                  alt={story.user?.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs font-medium truncate max-w-[70px] text-center">
              {story.user?.username}
            </span>
          </div>
        ))}

        {/* Watch All Button */}
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="w-17 h-17 rounded-full border-2 border-foreground flex items-center justify-center bg-muted/50">
            <div className="w-0 h-0 border-l-10 border-l-foreground border-y-[6px] border-y-transparent ml-1" />
          </div>
          <span className="text-xs font-bold text-foreground">Watch all</span>
        </div>
      </div>
    </div>
  );
}
