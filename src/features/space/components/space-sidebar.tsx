"use client";

import { Bookmark, FireMinimalistic, UserCheck } from "@solar-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFeedStore } from "@/features/post/store/feed-store";
import { cn } from "@/lib/utils";
import { SPACES } from "../api/mock-data";

export function SpaceSidebar() {
  const { activeSpaceId } = useFeedStore();
  const pathname = usePathname();

  const FOLLOWED_SPACES = SPACES.slice(0, 3);

  const FEED_ITEMS = [
    { id: "all", href: "/", label: "For You", icon: FireMinimalistic },
    {
      id: "following",
      href: "/following",
      label: "Following",
      icon: UserCheck,
    },
    { id: "saved", href: "/saved", label: "Saved", icon: Bookmark },
  ];

  return (
    <div className="hidden lg:flex flex-col w-52 sticky top-24 pr-2 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shrink-0 gap-8">
      {/* Main Feeds */}
      <div>
        <h3 className="font-bold text-xl px-2 mb-4 text-foreground">Feeds</h3>
        <div className="flex flex-col">
          {FEED_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-2 py-3 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <item.icon
                  className="size-6 text-foreground"
                  weight={isActive ? "Bold" : "Linear"}
                />
                <span
                  className={cn(
                    "text-[17px] text-foreground",
                    isActive ? "font-bold" : "font-normal",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Followed Spaces */}
      <div>
        <h3 className="font-bold text-[15px] px-2 mb-3 text-foreground/80">
          Your Spaces
        </h3>
        <div className="flex flex-col gap-1">
          {FOLLOWED_SPACES.map((space) => {
            const isActive = activeSpaceId === space.id;
            return (
              <Link
                key={space.id}
                href={`/space/${space.slug}`}
                className={cn(
                  "flex items-center gap-3 group cursor-pointer p-2 rounded-xl transition-colors",
                  isActive ? "bg-muted" : "hover:bg-muted/30",
                )}
              >
                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-muted border border-border">
                  <img
                    src={space.avatar_url}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground truncate">
                    s/{space.slug}
                  </p>
                  <h4
                    className={cn(
                      "font-semibold text-[14px] truncate",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {space.name}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-2 px-2">
        <Link
          href="/discover"
          className="text-xs text-muted-foreground hover:underline cursor-pointer"
        >
          Discover more spaces
        </Link>
      </div>
    </div>
  );
}
