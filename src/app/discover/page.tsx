"use client";

import { Header } from "@/components/layout/header";
// import { DiscoverCategories, DiscoverGrid } from "@/features/discover/components/discover-content";
// import { PlusCircle } from "lucide-react";
import { DiscoverFeed } from "@/features/discover/components/discover-feed";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="mx-auto px-4 py-6 pt-20">
        <DiscoverFeed />
      </main>

      {/* Old image-based discover */}
      {/* <main className="container max-w-6xl mx-auto px-4 py-4 space-y-2">
        <section>
           <DiscoverCategories />
        </section>
        <section>
           <DiscoverGrid />
        </section>
      </main> */}
    </div>
  );
}
