'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { ConversationList } from '@/features/messages/components/conversation-list';
import { ChatView } from '@/features/messages/components/chat-view';
import { EmptyChat } from '@/features/messages/components/empty-chat';

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <div className="flex w-full justify-center px-4 py-4 pt-20">
        <div
          className="flex max-w-7xl w-full border border-border rounded-[32px] overflow-hidden"
          style={{ height: 'calc(100vh - 60px - 42px)' }}
        >
          {/* Left: Conversation list */}
          <div className="w-[360px] shrink-0 overflow-hidden border-r border-border">
            <ConversationList
              activeId={activeConversation}
              onSelect={setActiveConversation}
            />
          </div>

          {/* Right: Chat view or empty state */}
          <div className="flex-1 overflow-hidden">
            {activeConversation ? (
              <ChatView conversationId={activeConversation} />
            ) : (
              <EmptyChat />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
