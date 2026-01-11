import { cn } from '@/lib/utils';
import { EngagementMetric } from '../types';
import { AltArrowUp, AltArrowDown } from '@solar-icons/react';

interface MetricCardProps {
  metric: EngagementMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;
  const isPositive = metric.change >= 0;
  const maxValue = Math.max(...metric.chartData);

  return (
    <div className="p-4 bg-muted/20 hover:bg-muted/30 rounded-2xl transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-xl bg-background", metric.color)}>
          <Icon className="size-4" />
        </div>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <AltArrowUp className="size-3 text-green-500" />
          ) : (
            <AltArrowDown className="size-3 text-red-500" />
          )}
          <span className={cn(
            "text-xs font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? '+' : ''}{metric.change}%
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-2xl font-bold mb-1">
          {metric.label === 'Engagement Rate' 
            ? `${metric.value}%` 
            : metric.value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">{metric.label}</p>
      </div>

      {/* Simple Bar Chart */}
      <div className="flex items-end gap-1 h-12">
        {metric.chartData.map((value, i) => {
          const height = (value / maxValue) * 100;
          return (
            <div
              key={i}
              className="flex-1 bg-muted/40 rounded-sm relative overflow-hidden"
              style={{ minHeight: '4px' }}
            >
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 rounded-sm transition-all",
                  metric.color.replace('text-', 'bg-'),
                  "opacity-60"
                )}
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
