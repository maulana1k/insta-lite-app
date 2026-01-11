import { Post } from "@/types/database";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { useFeedStore } from "../store/feed-store";
import Link from "next/link";
import { MenuDots, Plain } from "@solar-icons/react";

interface IFeedCard {
  post: Post;
  layout: 'grid3' | 'grid2' | 'list';
}

export function FeedCard({ post, layout }: IFeedCard) {
  const setActivePostId = useFeedStore((state) => state.setActivePostId);

  return (
    <div className={"flex flex-col gap-3 group"}>
      {/* Header */}
      {layout === 'list' && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Link href={`/u/${post.user?.username}`}>
              <div className="size-8 rounded-full overflow-hidden border border-border">
                <img
                  src={post.user?.avatar_url}
                  alt={post.user?.username}
                  className="h-full w-full object-cover "
                />
              </div>
            </Link>
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-foreground">
                {post.user?.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {/* Simplified time format manually if date-fns not installed, but I'll assume standard JS for now or basic math */}
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button className="">
            <MenuDots weight="Bold" className="size-6" />
          </button>
        </div>

      )}
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden rounded bg-muted cursor-pointer"
        onClick={() => setActivePostId(post.id)}
      >
        <img
          src={post.image_url}
          alt={post.caption}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-100"
        />
      </div>


      {/* Post text */}
      {layout === 'list' && (
        <div className="flex flex-col gap-3" >
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="text-foreground hover:text-red-500 transition-colors">
              <Heart className="size-6" />
            </button>
            <button className="text-foreground">
              <MessageCircle className="size-6" />
            </button>
            <button className="text-foreground">
              <Plain className="size-6" />
            </button>
          </div>
          {/* <span className="text-foreground">{post.likes_count}</span> */}
          <div className="font-base text-sm line-clamp-2"><span className="font-semibold">{post.user?.username}</span> Trying out a new productivity routine. Let us see if it sticks</div>
        </div>
      )}

      {/* Footer Info */}

      {layout !== 'list' && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Link href={`/u/${post.user?.username}`}>
              <div className="size-8 rounded-full overflow-hidden border border-border">
                <img
                  src={post.user?.avatar_url}
                  alt={post.user?.username}
                  className="h-full w-full object-cover "
                />
              </div>
            </Link>
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-foreground">
                {post.user?.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {/* Simplified time format manually if date-fns not installed, but I'll assume standard JS for now or basic math */}
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="text-foreground">{post.likes_count} likes</span>
            <button className="text-foreground hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-foreground/60 hover:text-foreground transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
