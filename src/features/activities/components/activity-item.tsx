import { VerifiedCheck } from "@solar-icons/react";
import { timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";
import type { Activity } from "../types";
import {
  getActivityIcon,
  getActivityIconColor,
  getActivityMessage,
} from "../utils/activity-helpers";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = getActivityIcon(activity.type);
  const iconColor = getActivityIconColor(activity.type);
  const message = getActivityMessage(activity.type);

  return (
    <div
      className={cn(
        "relative py-4 px-4 -mx-4 hover:bg-muted/5 transition-colors cursor-pointer",
        !activity.read && "bg-muted/10",
      )}
    >
      <div className="flex gap-3">
        {/* Avatar with icon badge */}
        <div className="relative shrink-0">
          <div className="size-11 rounded-full overflow-hidden">
            <img
              src={activity.user.avatar_url}
              alt={activity.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 size-5 bg-background rounded-full flex items-center justify-center">
            <Icon
              className={cn("size-4", iconColor)}
              weight={activity.type === "like" ? "Bold" : "Linear"}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[15px] leading-snug">
                <span className="font-semibold">{activity.user.username}</span>
                {activity.user.verified && (
                  <VerifiedCheck
                    className="inline-block w-4 h-4 ml-1 text-blue-500"
                    weight="Bold"
                  />
                )}{" "}
                <span className="text-muted-foreground">{message}</span>
              </p>

              {activity.content && (
                <p className="text-[14px] text-foreground/80 mt-1 line-clamp-2">
                  {activity.content}
                </p>
              )}

              <p className="text-[13px] text-muted-foreground mt-1">
                {timeAgo(activity.timestamp)}
              </p>
            </div>

            {/* Post preview thumbnail */}
            {activity.post?.image_url && (
              <div className="shrink-0 size-12 rounded-lg overflow-hidden bg-muted">
                <img
                  src={activity.post.image_url}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Follow button for follow notifications */}
            {activity.type === "follow" && (
              <button className="shrink-0 px-4 py-1.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors">
                Follow
              </button>
            )}
          </div>

          {/* Post content preview (for non-image posts) */}
          {activity.post &&
            !activity.post.image_url &&
            activity.post.content && (
              <div className="mt-2 p-3 bg-muted/30 rounded-xl">
                <p className="text-[13px] text-muted-foreground line-clamp-2">
                  {activity.post.content}
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Unread indicator */}
      {!activity.read && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 size-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}
