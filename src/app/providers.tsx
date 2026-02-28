"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { useState } from "react";
import { SplashScreen } from "@/components/layout/splash-screen";
import { useInitializeAuth } from "@/features/auth/hooks/use-auth";
import { ChatWidget } from "@/features/messages/components/chat-widget";

const CHAT_EXCLUDED_PATHS = ["/auth"];

function AuthInitializer() {
  useInitializeAuth();
  return null;
}

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
        <AuthInitializer />
        <SplashScreen />
        {children}
        {!CHAT_EXCLUDED_PATHS.includes(pathname) && <ChatWidget />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
