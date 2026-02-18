'use client';

import { useState } from 'react';
import { ArrowLeft, EllipsisVertical, X } from 'lucide-react';
import { ProfileHighlights } from './profile-highlights';
import { ProfileUser } from '../types';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface ProfileInfoProps {
  user: ProfileUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const router = useRouter();
  const [avatarOpen, setAvatarOpen] = useState(false);

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
            <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
          </div>
        </button>
        <EllipsisVertical className="size-7 text-muted-foreground hover:text-foreground cursor-pointer" />
      </div>

      {/* Bio */}
      <div className="space-y-1 text-sm">
        <h1 className="font-bold text-xl">{user.full_name}</h1>
        {user.username && <p className="text-muted-foreground">@{user.username}</p>}
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
      <div className="flex gap-2">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl py-2 transition-colors">
          Follow
        </button>
        <button className="w-full bg-muted hover:bg-muted/70 font-medium rounded-xl py-2 transition-colors">
          Message
        </button>
      </div>

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
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative size-72 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
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
