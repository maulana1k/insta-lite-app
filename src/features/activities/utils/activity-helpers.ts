import {
  ChatRound,
  Heart,
  MentionSquare,
  NotificationUnread,
  UserPlus,
} from "@solar-icons/react";
import type { Activity, ActivityType } from "../types";

export function getActivityMessage(type: ActivityType): string {
  switch (type) {
    case "follow":
      return "started following you";
    case "like":
      return "liked your post";
    case "comment":
      return "commented on your post";
    case "mention":
      return "mentioned you in a post";
    default:
      return "";
  }
}

export function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "follow":
      return UserPlus;
    case "like":
      return Heart;
    case "comment":
      return ChatRound;
    case "mention":
      return MentionSquare;
    default:
      return NotificationUnread;
  }
}

export function getActivityIconColor(type: ActivityType): string {
  switch (type) {
    case "follow":
      return "text-blue-500";
    case "like":
      return "text-red-500";
    case "comment":
      return "text-green-500";
    case "mention":
      return "text-purple-500";
    default:
      return "text-muted-foreground";
  }
}

export function groupActivitiesByDate(activities: Activity[]): {
  today: Activity[];
  earlier: Activity[];
} {
  const now = new Date();

  const today = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return activityDate.toDateString() === now.toDateString();
  });

  const earlier = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return activityDate.toDateString() !== now.toDateString();
  });

  return { today, earlier };
}
