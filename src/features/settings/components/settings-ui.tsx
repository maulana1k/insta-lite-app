'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

// iOS-style toggle — green when on
export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={cn(
        'relative shrink-0 w-[51px] h-[31px] rounded-full transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        on ? 'bg-[#34C759] dark:bg-[#30D158]' : 'bg-black/20 dark:bg-white/25'
      )}
    >
      <span
        className={cn(
          'absolute top-[2px] left-[2px] size-[27px] rounded-full bg-white',
          'shadow-[0_2px_6px_rgba(0,0,0,0.20)]',
          'transition-transform duration-200',
          on ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

// Grouped section container — Apple inset grouped style
export function SettingsGroup({
  children,
  header,
  footer,
  className,
}: {
  children: React.ReactNode;
  header?: string;
  footer?: string;
  className?: string;
}) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={cn('space-y-1', className)}>
      {header && (
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.07em] px-1 pb-0.5">
          {header}
        </p>
      )}
      <div className="rounded-xl overflow-hidden bg-muted/50 dark:bg-white/[0.06]">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="h-px bg-border/60 ml-4" />}
            {item}
          </React.Fragment>
        ))}
      </div>
      {footer && (
        <p className="text-[12px] text-muted-foreground px-1 pt-1 leading-relaxed">
          {footer}
        </p>
      )}
    </div>
  );
}

// Single row inside a group
export function SettingsRow({
  label,
  value,
  onClick,
  danger,
  children,
}: {
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
  children?: React.ReactNode; // override right side
}) {
  const content = (
    <div className="flex items-center justify-between h-11 px-4 gap-4">
      <span className={cn('text-[15px] truncate flex-1', danger ? 'text-red-500' : 'text-foreground')}>
        {label}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        {children !== undefined ? (
          children
        ) : (
          <>
            {value && (
              <span className="text-[15px] text-muted-foreground">{value}</span>
            )}
            {onClick && (
              <ChevronRight className="size-[17px] text-muted-foreground/40" />
            )}
          </>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.04] active:bg-black/[0.07] transition-colors"
      >
        {content}
      </button>
    );
  }
  return <div>{content}</div>;
}

// Expandable edit row — click to reveal inline form
export function EditRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: (onClose: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between h-11 px-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
      >
        <span className="text-[15px] text-foreground">{label}</span>
        <div className="flex items-center gap-1">
          <span className="text-[15px] text-muted-foreground truncate max-w-[200px]">{value}</span>
          <ChevronRight
            className={cn(
              'size-[17px] text-muted-foreground/40 transition-transform duration-200',
              open && 'rotate-90'
            )}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2.5 border-t border-border/40">
              {children(() => setOpen(false))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
