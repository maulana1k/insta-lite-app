import { EngagementMetric } from '../types';
import { MetricCard } from './metric-card';
import { AltArrowUp } from '@solar-icons/react';

interface EngagementInsightsProps {
  metrics: EngagementMetric[];
}

export function EngagementInsights({ metrics }: EngagementInsightsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Engagement Insights</h2>
        <p className="text-xs text-muted-foreground">Last 7 days</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Quick Summary */}
      <div className="p-4 bg-muted/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <AltArrowUp className="size-4 text-green-500" />
          <p className="text-sm font-semibold">Growing Engagement</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your engagement is up 8.5% this week. Keep posting quality content to maintain this growth!
        </p>
      </div>
    </div>
  );
}
