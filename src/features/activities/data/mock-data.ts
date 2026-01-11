import { Activity, EngagementMetric, TabConfig } from '../types';
import { Heart, ChatRound, UserPlus, MentionSquare, NotificationUnread, Graph } from '@solar-icons/react';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'follow',
    user: {
      username: 'johndoe',
      avatar_url: 'https://i.pravatar.cc/150?img=1',
      verified: true,
    },
    timestamp: '2025-12-20T08:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      username: 'janedoe',
      avatar_url: 'https://i.pravatar.cc/150?img=2',
    },
    post: {
      id: '1',
      content: 'Just finished my morning workout! Feeling energized 💪',
      image_url: 'https://picsum.photos/400/500?random=1',
    },
    timestamp: '2025-12-20T07:15:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      username: 'alexsmith',
      avatar_url: 'https://i.pravatar.cc/150?img=3',
    },
    content: 'This is amazing! Keep up the great work 🔥',
    post: {
      id: '2',
      content: 'Working on something exciting...',
      image_url: 'https://picsum.photos/400/500?random=2',
    },
    timestamp: '2025-12-20T06:45:00Z',
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    user: {
      username: 'sarahwilson',
      avatar_url: 'https://i.pravatar.cc/150?img=4',
      verified: true,
    },
    content: 'Hey @you check this out!',
    post: {
      id: '3',
      content: 'New design trends for 2025 are here!',
    },
    timestamp: '2025-12-20T05:20:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'like',
    user: {
      username: 'mikebrown',
      avatar_url: 'https://i.pravatar.cc/150?img=5',
    },
    post: {
      id: '4',
      content: 'Beautiful sunset today 🌅',
      image_url: 'https://picsum.photos/400/500?random=3',
    },
    timestamp: '2025-12-20T04:10:00Z',
    read: true,
  },
  {
    id: '6',
    type: 'follow',
    user: {
      username: 'emilyjones',
      avatar_url: 'https://i.pravatar.cc/150?img=6',
    },
    timestamp: '2025-12-19T22:30:00Z',
    read: true,
  },
  {
    id: '7',
    type: 'comment',
    user: {
      username: 'davidlee',
      avatar_url: 'https://i.pravatar.cc/150?img=7',
    },
    content: 'Love this perspective!',
    post: {
      id: '5',
      content: 'Exploring new places...',
      image_url: 'https://picsum.photos/400/500?random=4',
    },
    timestamp: '2025-12-19T20:15:00Z',
    read: true,
  },
  {
    id: '8',
    type: 'like',
    user: {
      username: 'sophiagarcia',
      avatar_url: 'https://i.pravatar.cc/150?img=8',
    },
    post: {
      id: '6',
      content: 'Coding late night sessions 💻',
    },
    timestamp: '2025-12-18T18:45:00Z',
    read: true,
  },
  {
    id: '9',
    type: 'comment',
    user: {
      username: 'liammartinez',
      avatar_url: 'https://i.pravatar.cc/150?img=9',
      verified: true,
    },
    content: 'Absolutely stunning work!',
    post: {
      id: '7',
      content: 'My latest design project',
      image_url: 'https://picsum.photos/400/500?random=5',
    },
    timestamp: '2025-12-18T14:20:00Z',
    read: true,
  },
];

export const mockEngagementMetrics: EngagementMetric[] = [
  {
    label: 'Followers Gained',
    value: 127,
    change: 12.5,
    icon: UserPlus,
    color: 'text-blue-500',
    chartData: [45, 52, 38, 65, 72, 58, 85],
  },
  {
    label: 'Total Likes',
    value: 1543,
    change: 8.3,
    icon: Heart,
    color: 'text-red-500',
    chartData: [120, 145, 132, 168, 195, 178, 210],
  },
  {
    label: 'Comments',
    value: 284,
    change: -3.2,
    icon: ChatRound,
    color: 'text-green-500',
    chartData: [42, 48, 45, 38, 41, 35, 40],
  },
  {
    label: 'Engagement Rate',
    value: 4.8,
    change: 5.1,
    icon: Graph,
    color: 'text-purple-500',
    chartData: [3.2, 3.8, 4.1, 4.5, 4.3, 4.6, 4.8],
  },
];

export const activityTabs: TabConfig[] = [
  { id: 'all', label: 'All', icon: NotificationUnread },
  { id: 'follows', label: 'Follows', icon: UserPlus },
  { id: 'mentions', label: 'Mentions', icon: MentionSquare },
  { id: 'likes', label: 'Likes', icon: Heart },
  { id: 'comments', label: 'Comments', icon: ChatRound },
];
