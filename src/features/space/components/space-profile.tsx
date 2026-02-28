"use client";

import { Bell, Calendar, Document, Notes, User } from "@solar-icons/react";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { UpcomingEventWidget } from "@/features/event/components/upcoming-event-widget";
import type { Space } from "../types";

function formatCount(count: number): string {
  if (count >= 1_000_000)
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1_000)
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return count.toString();
}

function formatCreatedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

export function SpaceProfile({ topic }: { topic: Space }) {
  const [activeTab, setActiveTab] = useState<"about" | "rules">("about");

  return (
    <div className="hidden xl:flex flex-col w-80 h-fit sticky top-24 shrink-0 gap-4">
      {/* Main card */}
      <div className="rounded-3xl overflow-hidden border border-border">
        {/* Banner */}
        <div className="relative h-28">
          <img
            src={topic.banner_url}
            alt={topic.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button className="absolute top-3 right-3 size-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <MoreHorizontal className="size-4" />
          </button>
        </div>

        {/* Profile info */}
        <div className="px-5 pb-5">
          {/* Avatar + name */}
          <div className="flex flex-col -mt-9 relative z-10 mb-3">
            <div className="size-16 rounded-2xl overflow-hidden border-3 border-background shrink-0 bg-background shadow-sm">
              <img
                src={topic.avatar_url}
                alt={topic.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-bold text-xl leading-tight truncate mt-2.5">
              {topic.name}
            </h2>
            <p className="text-[13px] text-muted-foreground">f/{topic.slug}</p>
          </div>

          {/* Description */}
          <p className="text-[13px] text-foreground/80 leading-relaxed mb-4">
            {topic.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4 text-[13px]">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>
                <strong className="text-foreground">
                  {formatCount(topic.members_count)}
                </strong>{" "}
                followers
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>
                <strong className="text-foreground">
                  {formatCount(topic.members_count)}
                </strong>{" "}
                members
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>
                <strong className="text-foreground">
                  {formatCount(topic.posts_count)}
                </strong>{" "}
                posts
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="w-full py-2 bg-blue-500 text-white rounded-xl text-[13px] font-semibold hover:opacity-90 transition-opacity">
              Follow
            </button>
            <button className="w-full py-2 bg-border rounded-xl text-[13px] font-semibold hover:opacity-70 transition-opacity">
              Ask to join
            </button>
          </div>
        </div>
      </div>

      {/* About / Rules card */}
      <div className="rounded-2xl border border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex p-1 mx-3 mt-3 rounded-xl bg-muted/60">
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${
              activeTab === "about"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            Tentang
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${
              activeTab === "rules"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            Aturan
          </button>
        </div>

        {/* Tab content */}
        <div className="px-5 py-4">
          {activeTab === "about" ? (
            <div className="space-y-3">
              <p className="text-[13px] text-foreground/70 leading-relaxed">
                {topic.description}
              </p>
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                <Calendar className="size-3.5" />
                <span>Dibuat {formatCreatedDate(topic.created_at)}</span>
              </div>
            </div>
          ) : (
            <ol className="text-[13px] text-foreground/70 leading-relaxed space-y-2">
              <li className="flex gap-2.5">
                <span className="text-muted-foreground/50 font-semibold shrink-0">
                  1.
                </span>
                <span>Jaga sopan santun dan saling menghargai</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-muted-foreground/50 font-semibold shrink-0">
                  2.
                </span>
                <span>Dilarang spam atau self-promo berlebihan</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-muted-foreground/50 font-semibold shrink-0">
                  3.
                </span>
                <span>Gunakan topik yang sesuai</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-muted-foreground/50 font-semibold shrink-0">
                  4.
                </span>
                <span>Dilarang SARA dan ujaran kebencian</span>
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
