'use client';

import { Plain } from '@solar-icons/react';

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="size-16 rounded-2xl bg-black/5 dark:bg-white/8 flex items-center justify-center mb-5">
        <Plain className="size-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">Pesan kamu</h2>
      <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xs">
        Kirim pesan pribadi ke teman atau grup. Pilih percakapan untuk mulai.
      </p>
    </div>
  );
}
