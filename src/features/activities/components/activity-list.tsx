import { Activity } from '../types';
import { ActivityItem } from './activity-item';

interface ActivityListProps {
  activities: Activity[];
  title: string;
}

export function ActivityList({ activities, title }: ActivityListProps) {
  if (activities.length === 0) return null;

  return (
    <div className="space-y-0">
      <h2 className="text-sm font-semibold text-muted-foreground px-4 mb-2">{title}</h2>
      <div className="space-y-0">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
