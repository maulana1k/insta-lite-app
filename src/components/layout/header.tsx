'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClapperboardPlay, Home, Plain, Settings, Logout, PenNewSquare, VideoLibrary, PlayStream, Tv } from "@solar-icons/react";
import { NotificationPopup } from './notification-popup';
import { SearchOverlay } from './search-overlay';
import { Search, Moon, Sun, Monitor } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { CreatePostModal } from '@/features/post/components/create-post-modal';

export function Header() {
  const pathname = usePathname();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="mx-auto h-15 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <AppLogo />

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <NavButton icon={Home} label="Home" active={pathname === '/'} iconType="solar" />
          </Link>
          <Link href="/discover">
            <NavButton icon={Search} label="Discover" active={pathname === '/discover'} iconType="lucide" />
          </Link>
          <Suspense fallback={<div className="w-52 h-10" />}>
            <SearchOverlay />
          </Suspense>
          <Link href="/videos">
            {/* <NavButton icon={ClapperboardPlay} label="Reels" active={pathname === '/videos'} iconType="solar" /> */}
            <NavButton icon={Tv} label="Reels" active={pathname === '/videos'} iconType="solar" />
          </Link>
          <Link href="/messages">
            <NavButton icon={Plain} label="Messages" active={pathname === '/messages'} iconType="solar" />
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* <Link href="/create"> */}
          <Button variant="ghost" className="shrink-0 size-12 rounded-xl" onClick={() => setCreateModalOpen(true)}>
            <PenNewSquare className="size-6" />
            <span className="sr-only">Create Post</span>
          </Button>
          {/* </Link> */}
          <NotificationPopup />
          <ProfileMenu />
        </div>
      </div>

      <CreatePostModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  iconType = 'solar',
}: {
  icon: any;
  label: string;
  active?: boolean;
  iconType?: 'solar' | 'lucide';
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-12 w-12 rounded-xl", active && "text-foreground")}
    >
      {iconType === 'solar' ? (
        <Icon
          weight={active ? "Bold" : "Linear"}
          className={cn("size-6")}
        />
      ) : (
        <Icon
          fill={active ? "currentColor" : "none"}
          className={cn("size-6", active ? "**:stroke-3" : "")}
        />

      )}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function AppLogo() {
  return (
    <Link
      href="/"
      className="text-3xl font-bold tracking-tighter shrink-0 "
    >
      Jends!
    </Link>
  );
}

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const cycleTheme = () => {
    const order = ['system', 'light', 'dark'] as const;
    const currentIndex = order.indexOf(theme as typeof order[number]);
    setTheme(order[(currentIndex + 1) % order.length]);
  };

  const themeIcon = theme === 'dark' ? <Moon className="size-5" /> : theme === 'light' ? <Sun className="size-5" /> : <Monitor className="size-5" />;
  const themeLabel = theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shrink-0 rounded-full overflow-hidden size-8 ring-2 ring-transparent hover:ring-muted-foreground/20 transition-all"
      >
        <img
          src="https://github.com/shadcn.png"
          alt="User"
          className="h-full w-full object-cover"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 top-full right-0 mt-3 w-72 origin-top-right"
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -6 }}
            transition={{
              type: 'spring',
              stiffness: 620,
              damping: 34,
              mass: 1.5,
            }}
          >
            <div className="bg-background dark:bg-neutral-900 border border-border rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
              {/* Profile Info */}
              <Link
                href="/u/shadcn"
                className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="size-12 rounded-full overflow-hidden ring-1 ring-border">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">shadcn</span>
                  <span className="text-sm text-muted-foreground">View your profile</span>
                </div>
              </Link>

              <div className="border-t border-border" />

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/40 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="size-5" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>

                <button
                  onClick={cycleTheme}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {themeIcon}
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1.5 rounded-lg">
                    <span>{themeLabel}</span>
                  </div>
                </button>
              </div>

              <div className="border-t border-border" />

              {/* Sign Out */}
              <div className="p-2">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/40 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    // Add sign out logic here
                  }}
                >
                  <Logout className="size-5" />
                  <span className="text-sm font-medium">Sign out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}