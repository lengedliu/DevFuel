import React, { useState, useEffect } from 'react';
import {
  initialCreatorProfile,
  initialGoal,
  initialSupporters,
  initialShopItems,
  initialTiers,
  initialDevlogs,
  initialGallery,
} from './data/mockData';
import { CreatorProfile, CoffeeGoal, SupporterMessage, ShopItem, MembershipTier, DevlogPost, ActiveTab } from './types';
import { HeaderBanner } from './components/HeaderBanner';
import { NavTabs } from './components/NavTabs';
import { CoffeeWidget } from './components/CoffeeWidget';
import { GoalTracker } from './components/GoalTracker';
import { SupporterFeed } from './components/SupporterFeed';
import { ShopTab } from './components/ShopTab';
import { TiersTab } from './components/TiersTab';
import { PostsTab } from './components/PostsTab';
import { GalleryTab } from './components/GalleryTab';
import { CheckoutModal } from './components/CheckoutModal';
import { CreatorDashboardModal } from './components/CreatorDashboardModal';
import { ShareModal } from './components/ShareModal';
import { Coffee, Heart, Sparkles, Server } from 'lucide-react';

export default function App() {
  // State with LocalStorage Persistence
  const [profile, setProfile] = useState<CreatorProfile>(() => {
    try {
      const saved = localStorage.getItem('haierkeys_profile');
      return saved ? JSON.parse(saved) : initialCreatorProfile;
    } catch {
      return initialCreatorProfile;
    }
  });

  const [goal, setGoal] = useState<CoffeeGoal>(() => {
    try {
      const saved = localStorage.getItem('haierkeys_goal');
      return saved ? JSON.parse(saved) : initialGoal;
    } catch {
      return initialGoal;
    }
  });

  const [supporters, setSupporters] = useState<SupporterMessage[]>(() => {
    try {
      const saved = localStorage.getItem('haierkeys_supporters');
      return saved ? JSON.parse(saved) : initialSupporters;
    } catch {
      return initialSupporters;
    }
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    try {
      const saved = localStorage.getItem('haierkeys_shop');
      return saved ? JSON.parse(saved) : initialShopItems;
    } catch {
      return initialShopItems;
    }
  });

  const [devlogs, setDevlogs] = useState<DevlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('haierkeys_devlogs');
      return saved ? JSON.parse(saved) : initialDevlogs;
    } catch {
      return initialDevlogs;
    }
  });

  const [tiers] = useState<MembershipTier[]>(initialTiers);
  const [gallery] = useState(initialGallery);

  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(false);

  // Modals
  const [checkoutItem, setCheckoutItem] = useState<{
    title: string;
    price: number;
    type: 'coffee' | 'shop' | 'tier';
    requiresKey?: boolean;
  } | null>(null);

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState<boolean>(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('haierkeys_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('haierkeys_goal', JSON.stringify(goal));
  }, [goal]);

  useEffect(() => {
    localStorage.setItem('haierkeys_supporters', JSON.stringify(supporters));
  }, [supporters]);

  useEffect(() => {
    localStorage.setItem('haierkeys_shop', JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem('haierkeys_devlogs', JSON.stringify(devlogs));
  }, [devlogs]);

  // Handlers
  const handleSendCoffee = (data: {
    coffees: number;
    amount: number;
    name: string;
    message: string;
    isAnonymous: boolean;
    isMonthly: boolean;
  }) => {
    const newSupporter: SupporterMessage = {
      id: `sup-${Date.now()}`,
      name: data.name,
      isAnonymous: data.isAnonymous,
      coffees: data.coffees,
      amount: data.amount,
      message: data.message,
      timestamp: 'Just now',
      isMonthly: data.isMonthly,
      likes: 0,
    };

    setSupporters([newSupporter, ...supporters]);

    setProfile((prev) => ({
      ...prev,
      coffeesCount: prev.coffeesCount + data.coffees,
      supportersCount: prev.supportersCount + 1,
      monthlyIncome: data.isMonthly ? prev.monthlyIncome + data.amount : prev.monthlyIncome,
    }));

    setGoal((prev) => ({
      ...prev,
      currentAmount: prev.currentAmount + data.amount,
    }));
  };

  const handleLikeMessage = (id: string) => {
    setSupporters((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const hasLiked = item.hasLiked;
          return {
            ...item,
            hasLiked: !hasLiked,
            likes: hasLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const handleReplyMessage = (id: string, replyText: string) => {
    setSupporters((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            creatorReply: {
              text: replyText,
              timestamp: 'Just now',
            },
          };
        }
        return item;
      })
    );
  };

  const handleLikePost = (postId: string) => {
    setDevlogs((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const handleAddPostComment = (postId: string) => {
    setDevlogs((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, commentsCount: post.commentsCount + 1 };
        }
        return post;
      })
    );
  };

  const handleBuyShopItem = (item: ShopItem) => {
    setCheckoutItem({
      title: item.title,
      price: item.price,
      type: 'shop',
      requiresKey: item.requiresKey,
    });
  };

  const handleJoinTier = (tier: MembershipTier) => {
    setCheckoutItem({
      title: `${tier.name} (Monthly Membership)`,
      price: tier.price,
      type: 'tier',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Header Banner */}
      <HeaderBanner
        profile={profile}
        isCreatorMode={isCreatorMode}
        onToggleCreatorMode={() => setIsCreatorMode(!isCreatorMode)}
        onOpenSupportModal={() => {
          setActiveTab('feed');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenDashboardModal={() => setIsDashboardModalOpen(true)}
      />

      {/* Navigation Bar */}
      <NavTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        shopCount={shopItems.length}
        tiersCount={tiers.length}
        postsCount={devlogs.length}
        galleryCount={gallery.length}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tipping Widget & Goal Tracker */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
              <CoffeeWidget
                coffeePrice={profile.coffeePrice}
                onSendCoffee={handleSendCoffee}
              />

              <GoalTracker
                goal={goal}
                isCreatorMode={isCreatorMode}
                onEditGoal={() => setIsDashboardModalOpen(true)}
              />
            </div>

            {/* Right Column: Supporter Feed & Creator Notes */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>About HaierKeys & Projects</span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                    Obsidian Ecosystem
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <SupporterFeed
                supporters={supporters}
                isCreatorMode={isCreatorMode}
                onLikeMessage={handleLikeMessage}
                onReplyMessage={handleReplyMessage}
              />
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <ShopTab
            items={shopItems}
            isCreatorMode={isCreatorMode}
            onBuyItem={handleBuyShopItem}
            onAddShopItem={() => setIsDashboardModalOpen(true)}
          />
        )}

        {activeTab === 'tiers' && (
          <TiersTab
            tiers={tiers}
            onJoinTier={handleJoinTier}
          />
        )}

        {activeTab === 'posts' && (
          <PostsTab
            posts={devlogs}
            isCreatorMode={isCreatorMode}
            onLikePost={handleLikePost}
            onAddComment={handleAddPostComment}
            onOpenCreatePostModal={() => setIsDashboardModalOpen(true)}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryTab gallery={gallery} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5 font-mono">
          <span>Powered by Ko-fi Engine</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">HaierKeys Creator Page</span>
        </p>
        <p className="text-[11px] text-slate-600">
          Fast Note Sync & Custom Image Auto Uploader for Obsidian © 2026. Built with React & Tailwind CSS.
        </p>
      </footer>

      {/* Checkout Modal */}
      {checkoutItem && (
        <CheckoutModal
          title={checkoutItem.title}
          price={checkoutItem.price}
          itemType={checkoutItem.type}
          requiresKey={checkoutItem.requiresKey}
          onClose={() => setCheckoutItem(null)}
          onSuccess={() => {
            if (checkoutItem.type === 'shop') {
              setShopItems((prev) =>
                prev.map((i) =>
                  i.title === checkoutItem.title ? { ...i, salesCount: i.salesCount + 1 } : i
                )
              );
            }
          }}
        />
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}

      {/* Creator Dashboard Modal */}
      {isDashboardModalOpen && (
        <CreatorDashboardModal
          profile={profile}
          goal={goal}
          onClose={() => setIsDashboardModalOpen(false)}
          onUpdateGoal={(newGoal) => setGoal((prev) => ({ ...prev, ...newGoal }))}
          onUpdateProfile={(newProf) => setProfile((prev) => ({ ...prev, ...newProf }))}
          onAddShopItem={(newItem) =>
            setShopItems((prev) => [
              { ...newItem, id: `shop-${Date.now()}`, salesCount: 0 },
              ...prev,
            ])
          }
          onAddDevlog={(newPost) =>
            setDevlogs((prev) => [
              { ...newPost, id: `post-${Date.now()}`, likes: 0, commentsCount: 0 },
              ...prev,
            ])
          }
        />
      )}
    </div>
  );
}
