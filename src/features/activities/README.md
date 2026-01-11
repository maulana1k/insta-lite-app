# Activities Feature

A modular, clean-code implementation of the activities/notifications feature.

## Directory Structure

```
features/activities/
├── components/           # React components
│   ├── activities-container.tsx    # Main container component
│   ├── activity-item.tsx          # Individual activity card
│   ├── activity-list.tsx          # Grouped activity list
│   ├── activity-tabs.tsx          # Tab navigation
│   ├── engagement-insights.tsx    # Analytics sidebar
│   ├── metric-card.tsx            # Individual metric card
│   └── empty-state.tsx            # Empty state UI
├── data/                # Mock data and constants
│   └── mock-data.ts              # Mock activities and metrics
├── hooks/               # Custom React hooks
│   └── use-activity-filter.ts    # Activity filtering logic
├── types/               # TypeScript definitions
│   └── index.ts                  # All type definitions
├── utils/               # Helper functions
│   ├── activity-helpers.ts       # Activity-related utilities
│   └── time.ts                   # Time formatting utilities
└── index.ts             # Public API exports
```

## Components

### ActivitiesContainer
Main container component that orchestrates the entire activities page.
- Manages state for active tab and activities
- Composes all child components
- Handles data flow

### ActivityItem
Displays a single activity notification with:
- User avatar with activity type icon badge
- Activity message and timestamp
- Post preview (if applicable)
- Follow button (for follow activities)
- Unread indicator

### ActivityList
Groups activities under a title (e.g., "Today", "Earlier").

### ActivityTabs
Tab navigation for filtering activities by type.

### EngagementInsights
Analytics sidebar showing:
- Engagement metrics with charts
- Trend indicators
- Quick summary

### MetricCard
Individual metric card with:
- Icon and value
- Percentage change
- 7-day bar chart

### EmptyState
Displayed when no activities match the current filter.

## Hooks

### useActivityFilter
Filters activities based on the selected tab.
- Memoized for performance
- Returns filtered activities array

### useUnreadCount
Calculates the number of unread activities.
- Memoized for performance
- Returns unread count number

## Utils

### activity-helpers.ts
- `getActivityMessage()` - Returns message text for activity type
- `getActivityIcon()` - Returns icon component for activity type
- `getActivityIconColor()` - Returns color class for activity type
- `groupActivitiesByDate()` - Groups activities into today/earlier

### time.ts
- `timeAgo()` - Formats timestamp as relative time (e.g., "2h", "5m")
- `isToday()` - Checks if a date is today

## Types

All TypeScript interfaces and types are defined in `types/index.ts`:
- `Activity` - Activity notification data
- `ActivityType` - Type of activity (follow, like, comment, mention)
- `ActivityTab` - Tab filter options
- `EngagementMetric` - Metric data with chart
- `TabConfig` - Tab configuration

## Usage

```tsx
import { ActivitiesContainer } from '@/features/activities';

export default function ActivitiesPage() {
  return (
    <div>
      <Header />
      <ActivitiesContainer />
    </div>
  );
}
```

## Design Principles

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components are designed to be reusable
3. **Type Safety**: Full TypeScript coverage
4. **Performance**: Memoization where appropriate
5. **Clean Code**: Clear naming, small functions, well-organized
6. **No Framer Motion**: Uses only Tailwind CSS for animations

## Future Enhancements

- Add API integration (replace mock data)
- Implement real-time updates
- Add mark as read/unread functionality
- Implement infinite scroll
- Add notification settings
