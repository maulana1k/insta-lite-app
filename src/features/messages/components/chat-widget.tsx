'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SmileCircle, Microphone, GalleryAdd, PenNewSquare, Plain, Pen } from '@solar-icons/react';
import { ArrowLeft, Maximize2, X } from 'lucide-react';
import { CONVERSATIONS, MESSAGES } from '../api/mock-data';
import type { Message } from '../types';
import { cn } from '@/lib/utils';

type WidgetView = 'list' | 'chat';

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<WidgetView>('list');
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Hide on /messages page
  if (pathname === '/messages') return null;

  const unreadCount = CONVERSATIONS.filter((c) => c.unread).length;

  const handleSelectConvo = (id: string) => {
    setDirection(1);
    setActiveConvoId(id);
    setView('chat');
  };

  const handleBack = () => {
    setDirection(-1);
    setView('list');
    setActiveConvoId(null);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset after animation
    setTimeout(() => {
      setView('list');
      setActiveConvoId(null);
    }, 150);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 15 : -15,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -15 : 15,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* FAB — closed state */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-foreground text-background shadow-lg shadow-black/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Plain weight='Bold' className="size-8" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-background">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel — open state */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={widgetRef}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-background dark:bg-neutral-900/80 backdrop-blur-md border border-border rounded-[28px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.85, y: 30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30, x: 20 }}
            // transition={{ duration: 0.15 }}
            transition={{
              type: 'spring',
              stiffness: 620,
              damping: 34,
              mass: 1.5,
            }}
          >
            {/* Sliding views — absolute positioned to prevent layout fighting */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="sync" custom={direction} initial={false}>
                {view === 'list' ? (
                  <motion.div
                    key="list"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exitToLeft"
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <WidgetListView
                      unreadCount={unreadCount}
                      onSelect={handleSelectConvo}
                      onClose={handleClose}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exitToRight"
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <WidgetChatView
                      conversationId={activeConvoId!}
                      onBack={handleBack}
                      onClose={handleClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── List View ─── */

function WidgetListView({
  unreadCount,
  onSelect,
  onClose,
}: {
  unreadCount: number;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Pesan</h2>
          {unreadCount > 0 && (
            <span className="size-5 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/messages"
            className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <Maximize2 className="size-5" />
          </Link>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {CONVERSATIONS.map((convo) => (
          <button
            key={convo.id}
            onClick={() => onSelect(convo.id)}
            className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-muted/40"
          >
            <div className="size-11 rounded-full overflow-hidden shrink-0">
              <img
                src={convo.user.avatar_url}
                alt={convo.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className={cn('text-[14px] block truncate', convo.unread ? 'font-bold' : 'font-medium')}>
                {convo.user.name}
              </span>
              <span
                className={cn(
                  'text-[13px] block truncate',
                  convo.unread ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                {convo.last_message} · {convo.timestamp}
              </span>
            </div>
            {convo.unread && (
              <div className="size-2.5 rounded-full bg-blue-500 shrink-0" />
            )}
          </button>
        ))}
        <div className="shrink-0 absolute bottom-2 right-2 px-4 pb-4 pt-2 flex justify-end">
          <button className="size-14 rounded-full bg-background text-foreground border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-all">
            <Pen weight='Bold' className="size-5" />
          </button>
        </div>
      </div>

      {/* Compose FAB */}
    </>
  );
}

/* ─── Chat View ─── */

function WidgetChatView({
  conversationId,
  onBack,
  onClose,
}: {
  conversationId: string;
  onBack: () => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation = CONVERSATIONS.find((c) => c.id === conversationId);
  const messages = MESSAGES[conversationId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationId]);

  if (!conversation) return null;

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={onBack}
            className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-4.5" />
          </button>
          <div className="flex items-center gap-2.5 ml-1">
            <div className="size-8 rounded-full overflow-hidden shrink-0">
              <img
                src={conversation.user.avatar_url}
                alt={conversation.user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <span className="text-[14px] font-semibold block">{conversation.user.name}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {groupedMessages.map((group, gi) => (
          <div key={gi}>
            <div className="flex justify-center my-3">
              <span className="text-[11px] text-muted-foreground/60">{group.date}</span>
            </div>
            <div className="space-y-1">
              {group.messages.map((msg) => (
                <WidgetBubble key={msg.id} message={msg} avatarUrl={conversation.user.avatar_url} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 shrink-0">
        <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-3">
          <button className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
            <SmileCircle className="size-5" />
          </button>
          <input
            type="text"
            placeholder="Kirim pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Microphone className="size-4.5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <GalleryAdd className="size-4.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function WidgetBubble({ message, avatarUrl }: { message: Message; avatarUrl: string }) {
  const isMe = message.sender === 'me';

  return (
    <div className={cn('flex items-end gap-1.5', isMe ? 'justify-end' : 'justify-start')}>
      {!isMe && (
        <div className="size-6 rounded-full overflow-hidden shrink-0 mb-0.5">
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[75%] px-3 py-1.5 text-[13px] leading-relaxed',
          isMe
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm'
            : 'bg-muted rounded-2xl rounded-bl-sm'
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
    const date = msg.timestamp.replace(/\s\d{2}\.\d{2}$/, '');
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.date === date) {
      lastGroup.messages.push(msg);
    } else {
      groups.push({ date, messages: [msg] });
    }
  });
  return groups;
}
