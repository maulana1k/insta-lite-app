'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Eye, UserPlus, Repeat2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Types ──────────────────────────────────────────────────────────────────

type Period = '7d' | '30d' | '90d';

// ── Mock data ──────────────────────────────────────────────────────────────

const SPARKLINE_DATA: Record<string, number[]> = {
  followers: [400, 500, 300, 1269, 1295, 1312, 1340],
  impressions: [4200, 3800, 5100, 4700, 6200, 5800, 7100],
  likes: [312, 280, 395, 421, 388, 450, 512],
  comments: [48, 52, 39, 61, 55, 70, 83],
  reach: [2100, 2300, 1950, 2600, 2800, 3100, 3400],
  shares: [22, 18, 31, 27, 35, 42, 38],
};

const BAR_DATA_30D = [
  { day: 'Sen', impressions: 4200, likes: 312, comments: 48 },
  { day: 'Sel', impressions: 3800, likes: 280, comments: 52 },
  { day: 'Rab', impressions: 5100, likes: 395, comments: 39 },
  { day: 'Kam', impressions: 4700, likes: 421, comments: 61 },
  { day: 'Jum', impressions: 6200, likes: 388, comments: 55 },
  { day: 'Sab', impressions: 5800, likes: 450, comments: 70 },
  { day: 'Min', impressions: 7100, likes: 512, comments: 83 },
  { day: 'Sen', impressions: 6500, likes: 470, comments: 75 },
  { day: 'Sel', impressions: 5900, likes: 430, comments: 68 },
  { day: 'Rab', impressions: 7400, likes: 560, comments: 91 },
  { day: 'Kam', impressions: 6800, likes: 510, comments: 84 },
  { day: 'Jum', impressions: 8100, likes: 620, comments: 105 },
  { day: 'Sab', impressions: 7600, likes: 580, comments: 97 },
  { day: 'Min', impressions: 8900, likes: 680, comments: 112 },
];

const TOP_POSTS = [
  { id: 1, caption: 'Golden hour di Bromo 🌄', likes: 1420, comments: 87, reach: 12400, img: 'https://picsum.photos/seed/bromo/80/80' },
  { id: 2, caption: 'Street food hunting di Malang', likes: 980, comments: 62, reach: 8700, img: 'https://picsum.photos/seed/malang/80/80' },
  { id: 3, caption: 'Behind the lens — Sony A7IV', likes: 860, comments: 114, reach: 7200, img: 'https://picsum.photos/seed/sony/80/80' },
];

const AUDIENCE = [
  { label: '18–24', pct: 28 },
  { label: '25–34', pct: 42 },
  { label: '35–44', pct: 18 },
  { label: '45+', pct: 12 },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

// ── Sparkline SVG ──────────────────────────────────────────────────────────

function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  const w = 80, h = 32, pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  // fill area
  const fill = `${pts[0]} ${pts.join(' ')} ${w - pad},${h - pad} ${pad},${h - pad}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? '#22c55e' : '#ef4444'} stopOpacity="0.25" />
          <stop offset="100%" stopColor={positive ? '#22c55e' : '#ef4444'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#sg-${positive})`} />
      <polyline
        points={polyline}
        fill="none"
        stroke={positive ? '#22c55e' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Bar chart SVG ──────────────────────────────────────────────────────────

function BarChart({ data, metric }: { data: typeof BAR_DATA_30D; metric: 'impressions' | 'likes' | 'comments' }) {
  const values = data.map((d) => d[metric]);
  const max = Math.max(...values);
  const H = 120, barW = 14, gap = 6;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${H + 20}`} preserveAspectRatio="none" className="w-full">
      {data.map((d, i) => {
        const val = d[metric];
        const barH = (val / max) * H;
        const x = i * (barW + gap);
        const y = H - barH;
        return (
          <g key={i}>
            <rect
              x={x} y={y} width={barW} height={barH}
              rx={3}
              className="fill-foreground/10 hover:fill-foreground/25 transition-colors cursor-pointer"
            />
            {/* last bar highlight */}
            {i === data.length - 1 && (
              <rect x={x} y={y} width={barW} height={barH} rx={3} className="fill-foreground/40" />
            )}
            <text
              x={x + barW / 2} y={H + 14}
              textAnchor="middle"
              fontSize="7"
              className="fill-muted-foreground"
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Metric card ────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  diff,
  diffPct,
  icon: Icon,
  sparkKey,
}: {
  label: string;
  value: number;
  diff: number;
  diffPct: number;
  icon: React.ElementType;
  sparkKey: string;
}) {
  const positive = diff >= 0;
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="size-4" />
          <span className="text-[13px]">{label}</span>
        </div>
        <span
          className={cn(
            'flex items-center gap-0.5 text-[12px] font-medium px-1.5 py-0.5 rounded-md',
            positive ? 'text-green-600 bg-green-500/10' : 'text-red-500 bg-red-500/10'
          )}
        >
          {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {positive ? '+' : ''}{diffPct}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[28px] font-bold leading-none">{fmt(value)}</p>
          <p className={cn('text-[12px] mt-1', positive ? 'text-green-600' : 'text-red-500')}>
            {positive ? '+' : ''}{fmt(diff)} dari periode lalu
          </p>
        </div>
        <Sparkline data={SPARKLINE_DATA[sparkKey]} positive={positive} />
      </div>
    </div>
  );
}

// ── Activity timeline ──────────────────────────────────────────────────────

const ACTIVITY = [
  { time: '2j lalu', text: '47 orang menyukai postingan Anda', type: 'like' },
  { time: '5j lalu', text: '12 komentar baru di foto Bromo', type: 'comment' },
  { time: '1h lalu', text: '38 pengikut baru hari ini', type: 'follow' },
  { time: '2h lalu', text: 'Postingan Anda dibagikan 9×', type: 'share' },
  { time: 'Kemarin', text: 'Jangkauan mencapai 3.4k', type: 'reach' },
];

const ACTIVITY_ICON: Record<string, React.ElementType> = {
  like: Heart, comment: MessageCircle, follow: UserPlus, share: Repeat2, reach: Eye,
};

// ── Main component ─────────────────────────────────────────────────────────

export function SettingsInsight() {
  const [period, setPeriod] = useState<Period>('7d');
  const [barMetric, setBarMetric] = useState<'impressions' | 'likes' | 'comments'>('impressions');

  return (
    <div className="space-y-8 pb-10">

      {/* Header + period toggle */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold leading-tight">Insight</h2>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Performa akun dan konten Anda.
          </p>
        </div>
        <div className="flex items-center rounded-xl border border-border overflow-hidden shrink-0 text-[13px] font-medium">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3.5 py-1.5 transition-colors',
                period === p
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p === '7d' ? '7 Hari' : p === '30d' ? '30 Hari' : '90 Hari'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Metric grid ────────────────────────────────── */}
      <section>
        <h3 className="text-[15px] font-semibold mb-3">Ringkasan</h3>
        <div className="rounded-2xl border border-border overflow-hidden">
          {/* row 1 */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <MetricCard label="Pengikut"  value={1340} diff={100}  diffPct={8}   icon={Users}         sparkKey="followers"   />
            <MetricCard label="Impresi"   value={7100} diff={900}  diffPct={15}  icon={Eye}           sparkKey="impressions" />
          </div>
          <div className="h-px bg-border" />
          {/* row 2 */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <MetricCard label="Suka"      value={512}  diff={62}   diffPct={14}  icon={Heart}         sparkKey="likes"       />
            <MetricCard label="Komentar"  value={83}   diff={13}   diffPct={19}  icon={MessageCircle} sparkKey="comments"    />
          </div>
          <div className="h-px bg-border" />
          {/* row 3 */}
          <div className="grid grid-cols-2 divide-x divide-border">
            <MetricCard label="Jangkauan" value={3400} diff={300}  diffPct={10}  icon={UserPlus}      sparkKey="reach"       />
            <MetricCard label="Dibagikan" value={38}   diff={-4}   diffPct={-10} icon={Repeat2}       sparkKey="shares"      />
          </div>
        </div>
      </section>

      {/* ── Bar chart ──────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold">Tren Harian</h3>
          <div className="flex items-center gap-1 rounded-xl border border-border overflow-hidden text-[12px] font-medium">
            {(['impressions', 'likes', 'comments'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setBarMetric(m)}
                className={cn(
                  'px-3 py-1.5 transition-colors capitalize',
                  barMetric === m
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'impressions' ? 'Impresi' : m === 'likes' ? 'Suka' : 'Komentar'}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <BarChart data={BAR_DATA_30D} metric={barMetric} />
        </div>
      </section>

      {/* ── Top posts + Audience side by side ──────────── */}
      <div className="grid grid-cols-[1fr_200px] gap-4 items-start">

        {/* Top posts */}
        <section>
          <h3 className="text-[15px] font-semibold mb-3">Postingan Terbaik</h3>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {TOP_POSTS.map((post, i) => (
              <div key={post.id} className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-[13px] font-bold text-muted-foreground/40 w-4 shrink-0">{i + 1}</span>
                <img src={post.img} alt="" className="size-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate">{post.caption}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <Heart className="size-3" />{fmt(post.likes)}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <MessageCircle className="size-3" />{post.comments}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <Eye className="size-3" />{fmt(post.reach)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audience age */}
        <section>
          <h3 className="text-[15px] font-semibold mb-3">Usia Audiens</h3>
          <div className="rounded-2xl border border-border p-4 space-y-3">
            {AUDIENCE.map((seg) => (
              <div key={seg.label} className="space-y-1">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-muted-foreground">{seg.label}</span>
                  <span className="font-semibold">{seg.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground transition-all duration-500"
                    style={{ width: `${seg.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Recent activity ────────────────────────────── */}
      <section>
        <h3 className="text-[15px] font-semibold mb-3">Aktivitas Terbaru</h3>
        <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {ACTIVITY.map((item, i) => {
            const Icon = ACTIVITY_ICON[item.type];
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                <div className="size-8 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <p className="flex-1 text-[14px]">{item.text}</p>
                <span className="text-[12px] text-muted-foreground shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
