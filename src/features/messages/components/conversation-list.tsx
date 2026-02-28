"use client";

import { PenNewSquare } from "@solar-icons/react";
import { Search, UserPlus, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CONVERSATIONS } from "../api/mock-data";
import type { Conversation } from "../types";

interface ConversationListProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({
  activeId,
  onSelect,
}: ConversationListProps) {
  const [tab, setTab] = useState<"pesan" | "permintaan">("pesan");
  const [search, setSearch] = useState("");

  const filtered = CONVERSATIONS.filter(
    (c) =>
      c.user.name.toLowerCase().includes(search.toLowerCase()) ||
      c.user.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-xl font-bold">Pesan</h1>
        <button className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <UserRoundPlus className="size-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-muted/60 text-sm placeholder:text-muted-foreground outline-none focus:bg-muted transition-all"
          />
        </div>
      </div>

      {/* Tabs — filled style */}
      <div className="flex mx-4 mb-2 p-1 gap-1 rounded-xl bg-muted/60">
        <button
          onClick={() => setTab("pesan")}
          className={cn(
            "flex-1 py-1.5 text-[13px] font-semibold text-center rounded-lg transition-all",
            tab === "pesan"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground/70",
          )}
        >
          Pesan
        </button>
        <button
          onClick={() => setTab("permintaan")}
          className={cn(
            "flex-1 py-1.5 text-[13px] font-semibold text-center rounded-lg transition-all",
            tab === "permintaan"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground/70",
          )}
        >
          Permintaan
        </button>
      </div>

      {/* Conversation items */}
      <div className="flex-1 overflow-y-auto pt-1">
        {tab === "pesan" ? (
          filtered.length > 0 ? (
            filtered.map((convo) => (
              <ConversationItem
                key={convo.id}
                conversation={convo}
                active={activeId === convo.id}
                onClick={() => onSelect(convo.id)}
              />
            ))
          ) : (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              Tidak ada percakapan ditemukan
            </div>
          )
        ) : (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            Tidak ada permintaan pesan
          </div>
        )}
      </div>
    </div>
  );
}

function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors",
        active
          ? "bg-black/8 dark:bg-white/10"
          : "hover:bg-black/4 dark:hover:bg-white/5",
      )}
    >
      <div className="size-12 rounded-full overflow-hidden shrink-0">
        <img
          src={conversation.user.avatar_url}
          alt={conversation.user.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "text-[14px] block truncate",
            conversation.unread ? "font-bold" : "font-medium",
          )}
        >
          {conversation.user.name}
        </span>
        <span
          className={cn(
            "text-[13px] block truncate",
            conversation.unread
              ? "text-foreground font-medium"
              : "text-muted-foreground",
          )}
        >
          {conversation.last_message} · {conversation.timestamp}
        </span>
      </div>
      {conversation.unread && (
        <div className="size-2.5 rounded-full bg-blue-500 shrink-0" />
      )}
    </button>
  );
}
