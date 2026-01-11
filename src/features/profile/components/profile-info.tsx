import { ProfileUser } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { ProfileHighlights } from './profile-highlights';

interface ProfileInfoProps {
  user: ProfileUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="flex flex-col w-full md:w-[320px] shrink-0 gap-6">
      {/* Back & Avatar */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="mt-2 text-muted-foreground hover:text-foreground">
           <ChevronLeft className="size-7" />
        </Link>
        <div className="p-[2px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600">
           <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden relative">
              <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
           </div>
        </div>
        <EllipsisVertical className='size-7 text-muted-foreground hover:text-foreground' />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between px-2">
         <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.posts}</span>
            <span className="text-xs text-muted-foreground">posts</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.followers >= 1000 ? `${user.stats.followers/1000}k` : user.stats.followers}</span>
            <span className="text-xs text-muted-foreground">followers</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{user.stats.following}</span>
            <span className="text-xs text-muted-foreground">following</span>
         </div>
      </div>

      {/* Action */}
      <div className="flex gap-2">

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2">
        Follow
      </button>
      <button className="w-full bg-muted hover:bg-muted font-medium rounded-lg py-2">
        Message
      </button>
      </div>

      {/* Bio */}
      <div className="space-y-1 text-sm">
         <h1 className="font-bold text-base">{user.full_name}</h1>
         {user.category && <p className="text-muted-foreground">{user.category}</p>}
         <p className="whitespace-pre-line">{user.bio}</p>
         {user.website && (
           <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-blue-900 dark:text-blue-100 font-medium hover:underline block mt-1">
             {user.website}
           </a>
         )}
      </div>

       {/* Highlights */}
       <ProfileHighlights highlights={user.highlights} />

    </div>
  );
}
