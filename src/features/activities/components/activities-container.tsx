import { useState } from 'react';
import { ActivityTab } from '../types';
import { mockActivities, mockEngagementMetrics, activityTabs } from '../data/mock-data';
import { useActivityFilter, useUnreadCount } from '../hooks/use-activity-filter';
import { groupActivitiesByDate } from '../utils/activity-helpers';
import { EngagementInsights } from './engagement-insights';
import { ActivityTabs } from './activity-tabs';
import { ActivityList } from './activity-list';
import { EmptyState } from './empty-state';

export function ActivitiesContainer() {
  const [activeTab, setActiveTab] = useState<ActivityTab>('all');
  const [activities] = useState(mockActivities);

  const filteredActivities = useActivityFilter(activities, activeTab);
  const unreadCount = useUnreadCount(activities);
  const { today, earlier } = groupActivitiesByDate(filteredActivities);

  return (
    <main className="container max-w-5xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Activities</h1>
        {unreadCount > 0 && (
          <p className="text-muted-foreground text-sm">
            You have {unreadCount} new {unreadCount === 1 ? 'notification' : 'notifications'}
          </p>
        )}
      </div>

      {/* Main Layout: Analytics + Activities */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Analytics Section - Top on mobile, Left on desktop */}
        <div className="w-full lg:w-80 shrink-0">
          <EngagementInsights metrics={mockEngagementMetrics} />
        </div>

        {/* Activities Section */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Tabs */}
          <ActivityTabs 
            tabs={activityTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Activities List */}
          <div className="space-y-6">
            {filteredActivities.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <ActivityList activities={today} title="Today" />
                <ActivityList activities={earlier} title="Earlier" />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
