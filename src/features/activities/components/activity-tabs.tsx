import { cn } from '@/lib/utils';
import { ActivityTab, TabConfig } from '../types';

interface ActivityTabsProps {
  tabs: TabConfig[];
  activeTab: ActivityTab;
  onTabChange: (tab: ActivityTab) => void;
}

export function ActivityTabs({ tabs, activeTab, onTabChange }: ActivityTabsProps) {
  return (
    <div className="sticky top-[60px] z-10 bg-background/80 backdrop-blur-xl -mx-4 px-4 pb-3">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative py-2 px-4 flex items-center gap-2 rounded-full transition-all duration-200 whitespace-nowrap",
                isActive 
                  ? "bg-foreground text-background" 
                  : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
              )}
            >
              <Icon className="size-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
