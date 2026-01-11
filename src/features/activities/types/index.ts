export type ActivityTab = 'all' | 'follows' | 'mentions' | 'likes' | 'comments';

export type ActivityType = 'follow' | 'mention' | 'like' | 'comment' | 'system';

export interface Activity {
  id: string;
  type: ActivityType;
  user: {
    username: string;
    avatar_url: string;
    verified?: boolean;
  };
  content?: string;
  post?: {
    id: string;
    content: string;
    image_url?: string;
  };
  timestamp: string;
  read: boolean;
}

export interface EngagementMetric {
  label: string;
  value: number;
  change: number;
  icon: any;
  color: string;
  chartData: number[];
}

export interface TabConfig {
  id: ActivityTab;
  label: string;
  icon: any;
}
