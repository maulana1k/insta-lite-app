import { PostDetail } from "@/features/text-feed/components/post-detail";
import { Header } from "@/components/layout/header";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />
      <div className="pt-16">
        <PostDetail postId={id} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { id: 't1' },
    { id: 't2' },
    { id: 't3' },
    { id: 't4' },
  ];
}
