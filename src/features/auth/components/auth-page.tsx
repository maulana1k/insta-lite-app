'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type React from 'react';

/* ─── OAuth Provider Icons ─────────────────────────────────────── */

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#7FBA00" />
      <path d="M24 11.4H12.6V0H24v11.4z" fill="#FFB900" />
      <path d="M11.4 24H0V12.6h11.4V24z" fill="#F25022" />
      <path d="M24 24H12.6V12.6H24V24z" fill="#00A4EF" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ─── Floating post cards (left panel decoration) ───────────────── */

const FLOATING_CARDS: {
  text: string;
  likes: string;
  name: string;
  style: React.CSSProperties;
}[] = [
    {
      text: 'Golden hour at 5am in the Scottish Highlands. Worth every cold step. 🏔️',
      likes: '3.2k',
      name: 'jackharding',
      style: { top: '6%', left: '7%', transform: 'rotate(-5deg)' },
    },
    {
      text: 'Hot take: the best travel photos are taken at 6am when the world is yours alone.',
      likes: '1.8k',
      name: 'jackharding',
      style: { top: '8%', right: '6%', transform: 'rotate(5deg)' },
    },
    {
      text: "Gear doesn't make the photo. Stop waiting for the perfect camera. Go outside.",
      likes: '4.4k',
      name: 'jackharding',
      style: { top: '22%', left: '34%', transform: 'rotate(-2deg)' },
    },
    {
      text: "Keep shooting. Your follower count doesn't determine the quality of your work.",
      likes: '5.5k',
      name: 'jackharding',
      style: { top: '30%', left: '5%', transform: 'rotate(3deg)' },
    },
    {
      text: 'Croatia — June 2024. The Adriatic never gets old.',
      likes: '5.6k',
      name: 'jackharding',
      style: { top: '28%', right: '5%', transform: 'rotate(-4deg)' },
    },
    {
      text: 'Some observations from 3 weeks in Indonesia: get off the tourist trail by day 3.',
      likes: '2.9k',
      name: 'jackharding',
      style: { top: '46%', left: '8%', transform: 'rotate(-3deg)' },
    },
    {
      text: "Madeira from above. Drone nearly didn't make it back 😅",
      likes: '6.9k',
      name: 'jackharding',
      style: { top: '44%', right: '7%', transform: 'rotate(4deg)' },
    },
  ];

function FloatingCard({
  text,
  likes,
  name,
  style,
}: {
  text: string;
  likes: string;
  name: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute w-48 rounded-2xl border border-white/[0.07] bg-white/[0.05] p-3.5 shadow-2xl pointer-events-none backdrop-blur-[2px]"
      style={style}
    >
      <p className="text-white/65 text-[11.5px] leading-relaxed line-clamp-3">{text}</p>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-white/30 text-[10px]">@{name}</span>
        <span className="flex items-center gap-1 text-white/30 text-[10px]">
          <Heart className="size-2.5" />
          {likes}
        </span>
      </div>
    </div>
  );
}

/* ─── Provider data ─────────────────────────────────────────────── */

const PRIMARY_PROVIDERS = [
  { id: 'apple', label: 'Apple', icon: <AppleIcon /> },
  { id: 'google', label: 'Google', icon: <GoogleIcon /> },
  { id: 'microsoft', label: 'Microsoft', icon: <MicrosoftIcon /> },
];

const MORE_PROVIDERS = [{ id: 'github', label: 'GitHub', icon: <GitHubIcon /> }];

/* ─── Main component ────────────────────────────────────────────── */

export function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);

  const isSignup = mode === 'signup';
  const verb = isSignup ? 'Sign up' : 'Log in';

  const handleContinue = () => {
    if (email.trim()) router.push(isSignup ? '/onboarding' : '/');
  };

  const allProviders = moreOpen
    ? [...PRIMARY_PROVIDERS, ...MORE_PROVIDERS]
    : PRIMARY_PROVIDERS;

  return (
    <div className="min-h-screen flex bg-background text-foreground">

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div
        className="hidden lg:flex w-[52%] xl:w-[55%] relative overflow-hidden flex-col shrink-0"
        style={{ background: '#0d0d0f' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Floating post cards */}
        {FLOATING_CARDS.map((card) => (
          <FloatingCard key={card.text} {...card} />
        ))}

        {/* Bottom gradient — clears space for the manifesto text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 30%, #0d0d0f 68%)',
          }}
        />

        {/* Manifesto text */}
        <div className="absolute bottom-12 left-10 right-10 z-10">
          <span className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-5">
            Jends!
          </span>
          <h2 className="font-black text-[50px] xl:text-[58px] leading-[1.02] tracking-tighter text-white">
            Where your
            <br />
            <span className="text-white/20">voice finds</span>
            <br />
            its people.
          </h2>
          <p className="mt-5 text-white/35 text-[13.5px] leading-relaxed max-w-xs">
            Join creators, thinkers, and doers — sharing what actually matters.
          </p>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block w-px bg-border/25 shrink-0" />

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle, oklch(0.55 0 0 / 0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5">
          {/* Brand (visible on mobile only — left panel hides it on desktop) */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tighter select-none lg:invisible"
          >
            Jends!
          </Link>

          <p className="text-sm text-muted-foreground ml-auto">
            {isSignup ? 'Already a member?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setMode(isSignup ? 'login' : 'signup')}
              className="font-semibold text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </header>

        {/* Form */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-[360px] flex flex-col gap-7">

            {/* Heading */}
            <div>
              <h1 className="text-[36px] font-black leading-tight tracking-tight">{verb}</h1>
              <p className="text-muted-foreground mt-1 text-[14px]">
                {isSignup ? 'You belong here.' : 'Good to see you again.'}
              </p>
            </div>

            {/* OAuth buttons */}
            <div className="flex flex-col gap-2">
              {allProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => router.push(isSignup ? '/onboarding' : '/')}
                  className="w-full flex items-center gap-3.5 bg-white text-black font-semibold rounded-2xl py-[11px] px-5 hover:bg-gray-50 active:scale-[0.98] transition-all duration-150"
                >
                  <span className="size-[18px] shrink-0">{provider.icon}</span>
                  <span className="flex-1 text-center text-[14px]">
                    {verb} with {provider.label}
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors self-end mt-0.5"
              >
                {moreOpen ? 'Fewer options' : 'More options'}
                {moreOpen ? (
                  <ChevronUp className="size-3.5" />
                ) : (
                  <ChevronDown className="size-3.5" />
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-[12px] text-muted-foreground/50 shrink-0">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* Email + continue */}
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                placeholder="yourname@email.com"
                className={cn(
                  'w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-[14px]',
                  'placeholder:text-muted-foreground/40',
                  'outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/25',
                  'transition',
                )}
              />

              <button
                type="button"
                onClick={handleContinue}
                disabled={!email.trim()}
                className={cn(
                  'w-full flex items-center justify-center gap-2 rounded-2xl py-[11px] text-[14px] font-semibold',
                  'transition-all duration-150 active:scale-[0.97]',
                  email.trim()
                    ? 'bg-foreground text-background hover:opacity-85'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-40',
                )}
              >
                Continue
                {email.trim() && <ArrowRight className="size-4" />}
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-7 px-8">
          <p className="text-[11.5px] text-muted-foreground/50 text-center leading-relaxed max-w-xs mx-auto">
            By {isSignup ? 'signing up' : 'logging in'}, you agree to our{' '}
            <Link
              href="#"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="#"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            .{isSignup && ' You also admit that you are beautiful.'}
          </p>
        </footer>
      </div>
    </div>
  );
}
