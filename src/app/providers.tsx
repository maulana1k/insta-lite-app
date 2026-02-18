"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ChatWidget } from "@/features/messages/components/chat-widget";

const CHAT_EXCLUDED_PATHS = ['/auth'];

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        {!CHAT_EXCLUDED_PATHS.includes(pathname) && <ChatWidget />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
