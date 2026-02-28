"use client";

import { Bell } from "@solar-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Types ──

type NotificationType = "like" | "comment" | "follow" | "mention" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  username: string;
  avatar_url: string;
  message: string;
  date: string;
  isNew?: boolean;
  showFollowBack?: boolean;
  thumbnail_url?: string;
  systemDot?: boolean;
}

interface FollowRequest {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  mutual_follower?: string;
  date: string;
}

// ── Mock Data ──

const MOCK_FOLLOW_REQUESTS: FollowRequest[] = [
  {
    id: "fr1",
    username: "kaidev",
    full_name: "Kai Nakamura",
    avatar_url: "https://i.pravatar.cc/150?u=kai",
    mutual_follower: "budikoding",
    date: "2025-02-13",
  },
  {
    id: "fr2",
    username: "liambuilds",
    full_name: "Liam O'Brien",
    avatar_url: "https://i.pravatar.cc/150?u=liam",
    date: "2025-02-12",
  },
  {
    id: "fr3",
    username: "miathemaker",
    full_name: "Mia Torres",
    avatar_url: "https://i.pravatar.cc/150?u=mia",
    mutual_follower: "dinda.ui",
    date: "2025-02-11",
  },
  {
    id: "fr4",
    username: "ryanstartup",
    full_name: "Ryan Hughes",
    avatar_url: "https://i.pravatar.cc/150?u=ryan",
    date: "2025-02-10",
  },
  {
    id: "fr5",
    username: "jakethesnake",
    full_name: "Jake Williams",
    avatar_url: "https://i.pravatar.cc/150?u=jake",
    mutual_follower: "sarahcodes",
    date: "2025-02-09",
  },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n0",
    type: "system",
    username: "Notifikasi Sistem",
    avatar_url: "",
    message: "Umpan Balik: Beri tahu kami pendapat Anda...",
    date: "",
    isNew: true,
    systemDot: true,
  },
  {
    id: "n1",
    type: "follow",
    username: "budikoding",
    avatar_url: "https://i.pravatar.cc/150?u=budi",
    message: "mulai mengikuti Anda.",
    date: "2025-02-13",
    isNew: true,
    showFollowBack: true,
  },
  {
    id: "n2",
    type: "like",
    username: "rinadev_",
    avatar_url: "https://i.pravatar.cc/150?u=rina",
    message: "menyukai postingan Anda.",
    date: "2025-02-13",
    isNew: true,
  },
  {
    id: "n3",
    type: "comment",
    username: "dinda.ui",
    avatar_url: "https://i.pravatar.cc/150?u=dinda",
    message: 'mengomentari postingan Anda: "Setuju banget sih ini..."',
    date: "2025-02-12",
  },
  {
    id: "n4",
    type: "like",
    username: "agus.backend",
    avatar_url: "https://i.pravatar.cc/150?u=agus",
    message: "menyukai postingan Anda.",
    date: "2025-02-12",
    thumbnail_url:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=80&h=80&fit=crop",
  },
  {
    id: "n5",
    type: "follow",
    username: "fajar_ngoding",
    avatar_url: "https://i.pravatar.cc/150?u=fajar",
    message: "mulai mengikuti Anda.",
    date: "2025-02-11",
    showFollowBack: true,
  },
  {
    id: "n6",
    type: "mention",
    username: "andistartupin",
    avatar_url: "https://i.pravatar.cc/150?u=andi",
    message: "menyebut Anda dalam komentar.",
    date: "2025-02-10",
  },
  {
    id: "n7",
    type: "like",
    username: "megacloud",
    avatar_url: "https://i.pravatar.cc/150?u=mega",
    message: "menyukai postingan Anda.",
    date: "2025-02-09",
  },
  {
    id: "n8",
    type: "comment",
    username: "sitiux",
    avatar_url: "https://i.pravatar.cc/150?u=siti",
    message: 'mengomentari postingan Anda: "Wah keren ini!"',
    date: "2025-02-08",
  },
  {
    id: "n9",
    type: "follow",
    username: "sarahcodes",
    avatar_url: "https://i.pravatar.cc/150?u=sarah",
    message: "mulai mengikuti Anda.",
    date: "2025-02-07",
    showFollowBack: true,
  },
];

const FILTERS = [
  { id: "all", label: "Semua aktivitas" },
  { id: "like", label: "Suka" },
  { id: "comment", label: "Komentar" },
  { id: "mention", label: "Sebutan" },
  { id: "follow", label: "Pengikut" },
] as const;

type ViewState = "notifications" | "follow-requests";

// ── Slide variants ──

const slideVariants = {
  enterFromRight: { x: "100%", opacity: 0 },
  enterFromLeft: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-100%", opacity: 0 },
  exitToRight: { x: "100%", opacity: 0 },
};

// ── Component ──

export function NotificationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [view, setView] = useState<ViewState>("notifications");
  const [slideDirection, setSlideDirection] = useState<"forward" | "back">(
    "forward",
  );
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "follow-requests") {
          goBack();
        } else {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, view]);

  // Reset view when popup closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay so the exit animation plays first
      const t = setTimeout(() => {
        setView("notifications");
        setActiveFilter("all");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const goToFollowRequests = () => {
    setSlideDirection("forward");
    setView("follow-requests");
  };

  const goBack = () => {
    setSlideDirection("back");
    setView("notifications");
  };

  const filtered =
    activeFilter === "all"
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter((n) => n.type === activeFilter);

  const newNotifs = filtered.filter((n) => n.isNew);
  const olderNotifs = filtered.filter((n) => !n.isNew);

  const hasUnread = MOCK_NOTIFICATIONS.some((n) => n.isNew);

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <Button
        variant="ghost"
        className="shrink-0 size-12 relative rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="size-6" weight={isOpen ? "Bold" : "Linear"} />
        {hasUnread && (
          <span className="absolute top-2 right-3 size-3 rounded-full bg-red-500 border-2 border-background" />
        )}
        <span className="sr-only">Notifications</span>
      </Button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 top-full right-0 mt-3 w-96 origin-top-right"
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -6 }}
            transition={{
              type: "spring",
              stiffness: 620,
              damping: 34,
              mass: 1.5,
            }}
          >
            <div className="bg-background dark:bg-neutral-900 border border-border rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col max-h-[75vh]">
              {/* Sliding panels container */}
              <div className="relative overflow-hidden flex-1 flex flex-col">
                <AnimatePresence initial={false} mode="popLayout">
                  {view === "notifications" ? (
                    <motion.div
                      key="notifications"
                      className="flex flex-col flex-1 min-h-0"
                      initial={
                        slideDirection === "back" ? "enterFromLeft" : "center"
                      }
                      animate="center"
                      exit="exitToLeft"
                      variants={slideVariants}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                      }}
                    >
                      <NotificationsView
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        newNotifs={newNotifs}
                        olderNotifs={olderNotifs}
                        filtered={filtered}
                        onClose={() => setIsOpen(false)}
                        onOpenFollowRequests={goToFollowRequests}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="follow-requests"
                      className="flex flex-col flex-1 min-h-0"
                      initial="enterFromRight"
                      animate="center"
                      exit="exitToRight"
                      variants={slideVariants}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                      }}
                    >
                      <FollowRequestsView onBack={goBack} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Notifications View ──

function NotificationsView({
  activeFilter,
  setActiveFilter,
  newNotifs,
  olderNotifs,
  filtered,
  onClose,
  onOpenFollowRequests,
}: {
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  newNotifs: Notification[];
  olderNotifs: Notification[];
  filtered: Notification[];
  onClose: () => void;
  onOpenFollowRequests: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <h2 className="text-2xl font-bold">Notifikasi</h2>
        <button
          onClick={onClose}
          className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="size-4.5" />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 px-5 pb-4 shrink-0">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border",
              activeFilter === f.id
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:bg-muted",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto overscroll-contain flex-1">
        {/* Follow requests */}
        {activeFilter === "all" && (
          <button
            onClick={onOpenFollowRequests}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/40 transition-colors"
          >
            <span className="text-[14px] font-semibold">
              Permintaan mengikuti
            </span>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500" />
              <span className="text-[14px] text-muted-foreground">
                {MOCK_FOLLOW_REQUESTS.length}
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </button>
        )}

        {/* New section */}
        {newNotifs.length > 0 && (
          <>
            <div className="px-5 pt-3 pb-1.5">
              <span className="text-[13px] font-semibold text-muted-foreground">
                Baru
              </span>
            </div>
            {newNotifs.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} />
            ))}
          </>
        )}

        {/* Earlier section */}
        {olderNotifs.length > 0 && (
          <>
            <div className="px-5 pt-4 pb-1.5">
              <span className="text-[13px] font-semibold text-muted-foreground">
                Sebelumnya
              </span>
            </div>
            {olderNotifs.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} />
            ))}
          </>
        )}

        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-[14px] text-muted-foreground">
              Belum ada notifikasi.
            </p>
          </div>
        )}

        <div className="h-3" />
      </div>
    </>
  );
}

// ── Follow Requests View ──

function FollowRequestsView({ onBack }: { onBack: () => void }) {
  return (
    <>
      {/* Header with back button */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors -ml-1"
        >
          <ChevronLeft className="size-5" />
        </button>
        <h2 className="text-lg font-bold">Permintaan mengikuti</h2>
      </div>

      {/* Separator */}
      <div className="h-px bg-border mx-5" />

      {/* Scrollable list */}
      <div className="overflow-y-auto overscroll-contain flex-1">
        {MOCK_FOLLOW_REQUESTS.map((req) => (
          <FollowRequestItem key={req.id} request={req} />
        ))}

        {MOCK_FOLLOW_REQUESTS.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-[14px] text-muted-foreground">
              Tidak ada permintaan mengikuti.
            </p>
          </div>
        )}

        <div className="h-3" />
      </div>
    </>
  );
}

// ── Follow Request Item ──

function FollowRequestItem({ request }: { request: FollowRequest }) {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">(
    "pending",
  );

  if (status === "accepted") {
    return (
      <div className="flex items-center gap-3 px-5 py-3">
        <div className="size-12 rounded-full overflow-hidden shrink-0 opacity-60">
          <img
            src={request.avatar_url}
            alt={request.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] text-muted-foreground">
            <span className="font-semibold text-foreground/60">
              {request.username}
            </span>{" "}
            diterima
          </p>
        </div>
      </div>
    );
  }

  if (status === "declined") return null;

  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors">
      {/* Avatar */}
      <div className="size-12 rounded-full overflow-hidden shrink-0">
        <img
          src={request.avatar_url}
          alt={request.username}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[14px] truncate">{request.username}</p>
        <p className="text-[12px] text-muted-foreground truncate">
          {request.full_name}
        </p>
        {request.mutual_follower && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Diikuti oleh {request.mutual_follower}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setStatus("accepted")}
          className="px-2.5 py-1 flex text-[13px] font-medium items-center justify-center rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          {/* <Check className="size-4" /> */}
          Accept
        </button>
        <button
          onClick={() => setStatus("declined")}
          className="size-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ── Notification Item ──

function NotificationItem({ notif }: { notif: Notification }) {
  if (notif.type === "system") {
    return (
      <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors text-left">
        <div className="size-12 rounded-full bg-foreground flex items-center justify-center shrink-0">
          <Bell className="size-5 text-background" weight="Bold" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[14px]">{notif.username}</span>
            {notif.systemDot && (
              <span className="size-1.5 rounded-full bg-red-500" />
            )}
          </div>
          <p className="text-[13px] text-muted-foreground truncate">
            {notif.message}
          </p>
        </div>
        <ChevronRight className="size-4 text-muted-foreground shrink-0" />
      </button>
    );
  }

  return (
    <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors text-left">
      <div className="size-12 rounded-full overflow-hidden shrink-0">
        <img
          src={notif.avatar_url}
          alt={notif.username}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] leading-snug">
          <span className="font-bold">{notif.username}</span>{" "}
          <span className="text-muted-foreground">{notif.message}</span>
        </p>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          {formatDate(notif.date)}
        </p>
      </div>
      {notif.showFollowBack && (
        <div
          role="button"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border text-[13px] font-semibold hover:bg-muted transition-colors shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowLeftRight className="size-3.5" />
          Teman
        </div>
      )}
      {notif.thumbnail_url && (
        <div className="size-11 rounded-lg overflow-hidden shrink-0">
          <img
            src={notif.thumbnail_url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </button>
  );
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
