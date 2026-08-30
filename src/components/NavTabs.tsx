import React from 'react';
import { ActiveTab } from '../types';
import { Coffee, ShoppingBag, Award, Newspaper, Image as ImageIcon } from 'lucide-react';

interface NavTabsProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  shopCount: number;
  tiersCount: number;
  postsCount: number;
  galleryCount: number;
}

export const NavTabs: React.FC<NavTabsProps> = ({
  activeTab,
  onSelectTab,
  shopCount,
  tiersCount,
  postsCount,
  galleryCount,
}) => {
  const tabs = [
    {
      id: 'feed' as ActiveTab,
      label: 'Feed & Support',
      icon: Coffee,
      count: null,
    },
    {
      id: 'shop' as ActiveTab,
      label: 'Shop',
      icon: ShoppingBag,
      count: shopCount,
    },
    {
      id: 'tiers' as ActiveTab,
      label: 'Membership Tiers',
      icon: Award,
      count: tiersCount,
    },
    {
      id: 'posts' as ActiveTab,
      label: 'Devlog & Posts',
      icon: Newspaper,
      count: postsCount,
    },
    {
      id: 'gallery' as ActiveTab,
      label: 'Gallery',
      icon: ImageIcon,
      count: galleryCount,
    },
  ];

  return (
    <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[11px] font-mono rounded-full ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
