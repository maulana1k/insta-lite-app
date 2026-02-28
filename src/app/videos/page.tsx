"use client";

// import { VideoDetailModal } from "@/features/videos/components/video-detail-modal";
import { ClapperboardPlay } from "@solar-icons/react";
import { Header } from "@/components/layout/header";
import { VideosGrid } from "@/features/videos/components/videos-grid";
import { VideosHeader } from "@/features/videos/components/videos-header";

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      {/* Actual page content visible as preview */}
      <main className="container max-w-7xl mx-auto px-4 md:px-8">
        <VideosHeader />
        <VideosGrid />
      </main>

      {/* Coming soon overlay on top of content — blocks all interaction */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        {/* Gradient: solid at bottom, fades to transparent at top — lets content peek through */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />

        {/* Copy */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
          <div className="size-16 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center mb-6 backdrop-blur-sm">
            <ClapperboardPlay className="size-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Sesuatu yang seru sedang disiapkan
          </h1>
          <p className="text-[16px] text-muted-foreground leading-relaxed mb-4">
            Kami sedang merancang pengalaman video yang baru — dibuat untuk
            menginspirasi, menghibur, dan menghubungkan. Tunggu sebentar lagi,
            pasti worth it.
          </p>
          <span className="text-[13px] font-medium text-muted-foreground/60 uppercase tracking-widest">
            Segera Hadir
          </span>
        </div>
      </div>

      {/* <VideoDetailModal /> */}
    </div>
  );
}
