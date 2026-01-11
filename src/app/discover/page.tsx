
import { Header } from "@/components/layout/header";
import { DiscoverCategories, DiscoverGrid } from "@/features/discover/components/discover-content";
import { PlusCircle } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-4 space-y-2">
        <section>
           <DiscoverCategories />
        </section>

        <section>
           <DiscoverGrid />
        </section>
      </main>
      
      {/* Floating Action Button from design */}
      {/* <button className="fixed bottom-10 right-10 z-50 bg-background rounded-2xl shadow-lg border border-border p-3 group hover:scale-105 transition-transform text-foreground">
         <PlusCircle size={32} strokeWidth={1.5} />
      </button> */}
    </div>
  );
}
