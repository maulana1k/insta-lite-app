'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Header } from "@/components/layout/header";
import { Camera, ClapperboardPlay, Document, Hashtag, Notes, Tag, User } from '@solar-icons/react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [activeTab, setActiveTab] = useState<'users' | 'images' | 'text' | 'videos' | 'tags' >('users');

  const tabs = [
    { id: 'users', icon: User, label: 'Users' },
    { id: 'images', icon: Camera, label: 'Photos' },
    { id: 'text', icon: Notes, label: 'Text' },
    { id: 'videos', icon: ClapperboardPlay, label: 'Videos' },
    { id: 'tags', icon: Hashtag , label: 'Tags' },
  ] as const;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Search Results</h1>
          <p className="text-muted-foreground">{query ? `Results for "${query}"` : 'Enter a keyword to search'}</p>
        </div>

        {/* Tabs */}
        <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-xl border-b border-border -mx-4 px-4">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative py-4 px-1 flex flex-col items-center gap-1 min-w-[60px]"
                >
                  <Icon 
                     className={cn(
                       "size-6 transition-colors duration-200",
                       isActive ? "text-foreground" : "text-muted-foreground"
                     )} 
                  />
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'users' && (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="h-8 w-20 bg-muted rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'images' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
              )}

              {activeTab === 'text' && (
                 <div className="space-y-4">
                 {Array.from({ length: 4 }).map((_, i) => (
                   <div key={i} className="space-y-3 p-4 border border-border rounded-xl">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                     </div>
                     <div className="space-y-2">
                       <div className="h-4 w-full bg-muted rounded animate-pulse" />
                       <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                     </div>
                   </div>
                 ))}
               </div>
              )}

              {activeTab === 'videos' && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div key={i} className="aspect-9/16 bg-muted rounded-lg animate-pulse" />
                 ))}
               </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
