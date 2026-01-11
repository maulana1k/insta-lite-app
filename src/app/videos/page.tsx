import { Header } from "@/components/layout/header";
import { VideosHeader } from "@/features/videos/components/videos-header";
import { VideosGrid } from "@/features/videos/components/videos-grid";
import { VideoDetailModal } from "@/features/videos/components/video-detail-modal";

export default function VideosPage() {
  return (
    <div className="dark min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 md:px-8">
        <VideosHeader />
        <VideosGrid />
      </main>

      <VideoDetailModal />
    </div>
  );
}
