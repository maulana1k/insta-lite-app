"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, EllipsisVertical, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  useBlockUser,
  useFollowUser,
  useUnfollowUser,
} from "@/features/users/hooks/use-users";
import type { ProfileUser } from "../types";
import { ProfileHighlights } from "./profile-highlights";

interface ProfileInfoProps {
  user: ProfileUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const router = useRouter();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [blockMenuOpen, setBlockMenuOpen] = useState(false);

  const { currentUser } = useAuthStore();
  const isOwnProfile = currentUser?.username === user.username;

  const { mutate: follow, isPending: isFollowing } = useFollowUser();
  const { mutate: unfollow, isPending: isUnfollowing } = useUnfollowUser();
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();

  const followPending = isFollowing || isUnfollowing;

  function handleFollowToggle() {
    if (user.is_following) {
      unfollow(user.username);
    } else {
      follow(user.username);
    }
  }

  function handleBlock() {
    setBlockMenuOpen(false);
    blockUser(user.username);
  }

  return (
    <div className="flex flex-col w-full md:w-[320px] shrink-0 gap-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="size-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ArrowLeft className="size-5" />
      </button>

      {/* Avatar + options */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setAvatarOpen(true)}
          className="p-[2px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 cursor-pointer hover:opacity-90 transition-opacity"
          aria-label="View avatar"
        >
          <div className="size-42 rounded-full border-4 border-background overflow-hidden relative">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                {user.full_name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </button>

        {!isOwnProfile && (
          <div className="relative">
            <button
              onClick={() => setBlockMenuOpen(!blockMenuOpen)}
              aria-label="More options"
            >
              <EllipsisVertical className="size-7 text-muted-foreground hover:text-foreground cursor-pointer" />
            </button>

            <AnimatePresence>
              {blockMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-8 z-20 min-w-[140px] bg-background border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={handleBlock}
                    disabled={isBlocking}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-muted/50 transition-colors disabled:opacity-60"
                  >
                    {isBlocking ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    Block @{user.username}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {isOwnProfile && (
          <EllipsisVertical className="size-7 text-muted-foreground hover:text-foreground cursor-pointer" />
        )}
      </div>

      {/* Bio */}
      <div className="space-y-1 text-sm">
        <h1 className="font-bold text-xl">{user.full_name}</h1>
        {user.username && (
          <p className="text-muted-foreground">@{user.username}</p>
        )}
        <p className="whitespace-pre-line">{user.bio}</p>
        {user.website && (
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-900 dark:text-blue-100 font-medium hover:underline block mt-1"
          >
            {user.website}
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{user.stats.posts}</span>
          <span className="text-xs text-muted-foreground">posts</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">
            {user.stats.followers >= 1000
              ? `${(user.stats.followers / 1000).toFixed(0)}k`
              : user.stats.followers}
          </span>
          <span className="text-xs text-muted-foreground">followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{user.stats.following}</span>
          <span className="text-xs text-muted-foreground">following</span>
        </div>
      </div>

      {/* Actions */}
      {!isOwnProfile && (
        <div className="flex gap-2">
          <button
            onClick={handleFollowToggle}
            disabled={followPending}
            className={`w-full font-medium rounded-xl py-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 ${
              user.is_following
                ? "bg-muted hover:bg-muted/70"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {followPending && <Loader2 className="size-4 animate-spin" />}
            {user.is_following ? "Following" : "Follow"}
          </button>
          <button className="w-full bg-muted hover:bg-muted/70 font-medium rounded-xl py-2 transition-colors">
            Message
          </button>
        </div>
      )}

      {/* Highlights */}
      <ProfileHighlights highlights={user.highlights} />

      {/* Avatar zoom modal */}
      <AnimatePresence>
        {avatarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setAvatarOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative size-72 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-6xl font-bold text-muted-foreground">
                  {user.full_name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </motion.div>
            <button
              onClick={() => setAvatarOpen(false)}
              className="absolute top-4 right-4 size-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
