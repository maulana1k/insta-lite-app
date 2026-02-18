import { Header } from "@/components/layout/header";
import { PostDetail } from '@/features/post/components/post-detail';
import { SpaceSidebar } from '@/features/space/components/space-sidebar';
import { AuthorSidebar } from '@/features/post/components/author-sidebar';
// import { FeedModeToggle, FeedLayoutToggle } from "@/features/feed/components/feed-navigation";

export function generateStaticParams() {
  // TODO: replace with API call: GET /api/v1/posts?fields=id to get all post IDs
  const postIds = [
    't1','t2','t3','t4','t5','t6','t7','t8','t9','t10',
    't11','t12','t13','t14','t15','t16','t17','t18','t19','t20',
    't21','t22','t23','t24','t25','t26','t27','t28','t29','t30',
    't31','t32','t33','t34','t35','t36','t37','t38','t39',
  ];
  return postIds.map((post_id) => ({ post_id }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* <FeedModeToggle /> */}
      {/* <FeedLayoutToggle /> */}
      <Header />

      <div className="mx-auto px-4 py-8 space-y-6 pt-20">
        {/* Same layout as home feeds page: 4:14:6 ratio */}
        <div className="flex w-full justify-center relative min-h-screen px-4">
          <div className="grid grid-cols-[auto_1fr_auto] max-w-7xl w-full gap-6">
            <aside className="hidden lg:block">
              <SpaceSidebar />
            </aside>
            <div className="w-full max-w-2xl mx-auto">
              <PostDetail postId={post_id} />
            </div>
            <AuthorSidebar postId={post_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
