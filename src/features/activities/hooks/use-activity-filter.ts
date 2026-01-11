import { useState, useMemo } from 'react';
import { Activity, ActivityTab } from '../types';

export function useActivityFilter(activities: Activity[], activeTab: ActivityTab) {
  return useMemo(() => {
    if (activeTab === 'all') return activities;
    if (activeTab === 'follows') return activities.filter(a => a.type === 'follow');
    if (activeTab === 'mentions') return activities.filter(a => a.type === 'mention');
    if (activeTab === 'likes') return activities.filter(a => a.type === 'like');
    if (activeTab === 'comments') return activities.filter(a => a.type === 'comment');
    return activities;
  }, [activities, activeTab]);
}

export function useUnreadCount(activities: Activity[]) {
  return useMemo(() => {
    return activities.filter(a => !a.read).length;
  }, [activities]);
}
