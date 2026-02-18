'use client';

import { useEffect, useRef, useState } from 'react';
import { SmileCircle, Microphone, GalleryAdd } from '@solar-icons/react';
import { Phone, Video, Info } from 'lucide-react';
import { CONVERSATIONS, MESSAGES } from '../api/mock-data';
import type { Message } from '../types';
import { cn } from '@/lib/utils';

interface ChatViewProps {
  conversationId: string;
}

export function ChatView({ conversationId }: ChatViewProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation = CONVERSATIONS.find((c) => c.id === conversationId);
  const messages = MESSAGES[conversationId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) return null;

  // Group messages by timestamp for date separators
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden shrink-0">
            <img
              src={conversation.user.avatar_url}
              alt={conversation.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[15px] font-semibold block">{conversation.user.name}</span>
            <span className="text-[13px] text-muted-foreground">{conversation.user.username}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Phone className="size-5" />
          </button>
          <button className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Video className="size-5" />
          </button>
          <button className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Info className="size-5" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {groupedMessages.map((group, gi) => (
          <div key={gi}>
            {/* Date separator */}
            <div className="flex justify-center my-4">
              <span className="text-[12px] text-muted-foreground/60">{group.date}</span>
            </div>
            {/* Messages in group */}
            <div className="space-y-1.5">
              {group.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} avatarUrl={conversation.user.avatar_url} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="px-5 py-3 shrink-0">
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2">
          <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
            <SmileCircle className="size-6" />
          </button>
          <input
            type="text"
            placeholder="Kirim pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-2 shrink-0">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Microphone className="size-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <GalleryAdd className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, avatarUrl }: { message: Message; avatarUrl: string }) {
  const isMe = message.sender === 'me';

  return (
    <div className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
      {!isMe && (
        <div className="size-7 rounded-full overflow-hidden shrink-0 mb-0.5">
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[70%] px-3.5 py-2 text-[14px] leading-relaxed',
          isMe
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
            : 'bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-bl-md'
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function groupMessagesByDate(messages: Message[]) {
  const groups: { date: string; messages: Message[] }[] = [];

  messages.forEach((msg) => {
    const date = msg.timestamp.replace(/\s\d{2}\.\d{2}$/, ''); // strip time
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === date) {
      lastGroup.messages.push(msg);
    } else {
      groups.push({ date, messages: [msg] });
    }
  });

  return groups;
}
