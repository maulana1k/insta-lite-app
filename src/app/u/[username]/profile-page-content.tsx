'use client';

import { Header } from '@/components/layout/header';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfileContent } from '@/features/profile/components/profile-content';
import { useProfile } from '@/features/profile/hooks/use-profile';
import { PostDetailModal } from '@/features/posts/components/post-detail-modal';
import { Loader2 } from 'lucide-react';

export function ProfilePageContent({ username }: { username: string }) {
  const { data: user, isLoading } = useProfile(username);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 py-8 pt-20">
        {isLoading || !user ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12">
            <ProfileInfo user={user} />
            <ProfileContent username={username} />
          </div>
        )}
      </main>

      <PostDetailModal />
    </div>
  );
}
