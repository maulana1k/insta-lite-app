import { NotificationUnread } from '@solar-icons/react';

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <NotificationUnread className="size-12 mx-auto mb-4 text-muted-foreground/40" />
      <p className="text-muted-foreground">No activities yet</p>
    </div>
  );
}
