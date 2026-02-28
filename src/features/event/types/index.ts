import type { User } from "@/types/database";

export interface SpaceEvent {
  id: string;
  space_id: string;
  title: string;
  description: string;
  banner_url: string;
  created_by: User;
  schedule: { date: string; time: string; timezone: string };
  location: {
    type: "online" | "offline" | "hybrid";
    venue?: string;
    platform?: string;
    address?: string;
  };
  cta: { type: "register" | "url" | "custom"; label: string; url?: string };
  attendees_count: number;
  max_attendees?: number;
  status: "upcoming" | "past";
  created_at: string;
}

export type EventFilter = "all" | "upcoming" | "past";
