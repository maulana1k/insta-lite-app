import { ProfileUser } from '../types';
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import { ProfileHighlights } from './profile-highlights';
import { useRouter } from 'next/navigation';

interface ProfileInfoProps {
  user: ProfileUser;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full md:w-[320px] shrink-0 gap-6">
      {/* Back & Avatar */}
      <button
        onClick={() => router.back()}
        className="size-10 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="flex items-center justify-between gap-4">
        <div className="p-[2px] rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600">
          <div className="size-42 rounded-full border-4 border-background overflow-hidden relative">
            <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
          </div>
        </div>
        <EllipsisVertical className='size-7 text-muted-foreground hover:text-foreground' />
      </div>
      {/* Bio */}
      <div className="space-y-1 text-sm">
        <h1 className="font-bold text-xl">{user.full_name}</h1>
        {user.username && <p className="text-muted-foreground">@{user.username}</p>}
        <p className="whitespace-pre-line">{user.bio}</p>
        {user.website && (
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-blue-900 dark:text-blue-100 font-medium hover:underline block mt-1">
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
          <span className="font-bold text-lg">{user.stats.followers >= 1000 ? `${user.stats.followers / 1000}k` : user.stats.followers}</span>
          <span className="text-xs text-muted-foreground">followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg">{user.stats.following}</span>
          <span className="text-xs text-muted-foreground">following</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex gap-2">

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl py-2">
          Follow
        </button>
        <button className="w-full bg-muted hover:bg-muted font-medium rounded-xl py-2">
          Message
        </button>
      </div>



      {/* Highlights */}
      <ProfileHighlights highlights={user.highlights} />

    </div>
  );
}
