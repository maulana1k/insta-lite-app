"use client";

import { Camera, Notes } from "@solar-icons/react";
import { AtSign, GalleryVertical, Grid2X2, Grid3X3 } from "lucide-react";
import { useFeedStore as usePostFeedStore } from "@/features/post/store/feed-store";
import { cn } from "@/lib/utils";
import { useFeedStore } from "../store/feed-store";

export function FeedModeToggle() {
  const { mode, setMode } = usePostFeedStore();

  return (
    <div className="fixed h-screen flex flex-col left-8 justify-center z-10 gap-2">
      <button
        onClick={() => setMode("visual")}
        className={cn(
          "p-4 transition-opacity",
          mode === "visual"
            ? "opacity-100 text-foreground"
            : "opacity-30 hover:opacity-100",
        )}
        title="Visual Feed"
      >
        <Camera size={32} />
      </button>
      <button
        onClick={() => setMode("text")}
        className={cn(
          "p-4 transition-opacity",
          mode === "text"
            ? "opacity-100 text-foreground"
            : "opacity-30 hover:opacity-100",
        )}
        title="Text Feed"
      >
        <Notes size={32} />
      </button>
    </div>
  );
}

export function FeedLayoutToggle() {
  const { mode } = usePostFeedStore();
  const { layout, setLayout } = useFeedStore();

  if (mode !== "visual") return null;

  return (
    <div className="fixed h-screen flex flex-col right-8 justify-center z-10">
      <button
        onClick={() => setLayout("grid3")}
        className={cn(
          "p-4 transition-opacity",
          layout === "grid3"
            ? "opacity-100 text-foreground"
            : "opacity-30 hover:opacity-100",
        )}
        title="Grid View (3x3)"
      >
        <Grid3X3 size={26} />
      </button>
      <button
        onClick={() => setLayout("grid2")}
        className={cn(
          "p-4 transition-opacity",
          layout === "grid2"
            ? "opacity-100 text-foreground"
            : "opacity-30 hover:opacity-100",
        )}
        title="Large Grid View (2x2)"
      >
        <Grid2X2 size={26} />
      </button>
      <button
        onClick={() => setLayout("list")}
        className={cn(
          "p-4 transition-opacity",
          layout === "list"
            ? "opacity-100 text-foreground"
            : "opacity-30 hover:opacity-100",
        )}
        title="List View"
      >
        <GalleryVertical size={26} />
      </button>
    </div>
  );
}
