import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CreatorProfile, CoffeeGoal, ShopItem, DevlogPost } from '../types';
import { X, Settings, DollarSign, Coffee, Heart, Plus, Save, Target, Package, Newspaper } from 'lucide-react';

interface CreatorDashboardModalProps {
  profile: CreatorProfile;
  goal: CoffeeGoal;
  onClose: () => void;
  onUpdateGoal: (newGoal: Partial<CoffeeGoal>) => void;
  onUpdateProfile: (newProfile: Partial<CreatorProfile>) => void;
  onAddShopItem: (item: Omit<ShopItem, 'id' | 'salesCount'>) => void;
  onAddDevlog: (post: Omit<DevlogPost, 'id' | 'likes' | 'commentsCount'>) => void;
}

export const CreatorDashboardModal: React.FC<CreatorDashboardModalProps> = ({
  profile,
  goal,
  onClose,
  onUpdateGoal,
  onUpdateProfile,
  onAddShopItem,
  onAddDevlog,
}) => {
  const [tab, setTab] = useState<'stats' | 'goal' | 'shop' | 'post'>('stats');

  // Goal Form
  const [goalTitle, setGoalTitle] = useState(goal.title);
  const [goalTarget, setGoalTarget] = useState(goal.targetAmount);
  const [goalCurrent, setGoalCurrent] = useState(goal.currentAmount);

  // Shop Form
  const [shopTitle, setShopTitle] = useState('');
  const [shopPrice, setShopPrice] = useState(15);
  const [shopCategory, setShopCategory] = useState<'Plugin' | 'License' | 'Guide' | 'Template'>('License');
  const [shopDesc, setShopDesc] = useState('');
  const [shopFeatures, setShopFeatures] = useState('Unlimited Devices, Auto-Backup');

  // Post Form
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'Update' | 'Release' | 'Tutorial' | 'Roadmap'>('Release');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('Obsidian, Sync');

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoal({
      title: goalTitle,
      targetAmount: Number(goalTarget),
      currentAmount: Number(goalCurrent),
    });
    alert('Goal updated successfully!');
  };

  const handleSaveShopItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopTitle.trim()) return;
    onAddShopItem({
      title: shopTitle,
      price: Number(shopPrice),
      category: shopCategory,
      description: shopDesc,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      features: shopFeatures.split(',').map((s) => s.trim()),
      requiresKey: shopCategory === 'License' || shopCategory === 'Plugin',
    });
    setShopTitle('');
    setShopDesc('');
    alert('Product added to Shop!');
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;
    onAddDevlog({
      title: postTitle,
      slug: postTitle.toLowerCase().replace(/\s+/g, '-'),
      publishedAt: 'Just now',
      category: postCategory,
      summary: postSummary,
      content: postContent,
      tags: postTags.split(',').map((t) => t.trim()),
    });
    setPostTitle('');
    setPostSummary('');
    setPostContent('');
    alert('Devlog post published!');
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Creator Management Dashboard</h2>
            <p className="text-xs text-slate-400">Manage ZenCoder's goals, products, and devlog updates</p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'stats', label: 'Stats & Earnings', icon: DollarSign },
            { id: 'goal', label: 'Funding Goal', icon: Target },
            { id: 'shop', label: 'Add Product', icon: Package },
            { id: 'post', label: 'Publish Update', icon: Newspaper },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Stats */}
        {tab === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-mono">Monthly Revenue</span>
                <p className="text-2xl font-extrabold text-emerald-400">${profile.monthlyIncome}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-mono">Total Coffees</span>
                <p className="text-2xl font-extrabold text-amber-400">{profile.coffeesCount}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-mono">Supporters</span>
                <p className="text-2xl font-extrabold text-purple-400">{profile.supportersCount}</p>
              </div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <h4 className="font-bold text-white">Cloud Infrastructure Host Expenses</h4>
              <p>• Tokyo EC2 Sync Relay Node: $140/mo</p>
              <p>• Frankfurt Dedicated Node: $95/mo</p>
              <p>• S3 Cloud Vault Storage: $85/mo</p>
              <p className="text-amber-400 font-mono pt-1">Current Funding Ratio: 87% Covered by Ko-fi Supporters 🎉</p>
            </div>
          </div>
        )}

        {/* Tab 2: Edit Goal */}
        {tab === 'goal' && (
          <form onSubmit={handleSaveGoal} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Goal Title</label>
              <input
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Target Amount ($)</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Current Amount ($)</label>
                <input
                  type="number"
                  value={goalCurrent}
                  onChange={(e) => setGoalCurrent(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Goal Settings
            </button>
          </form>
        )}

        {/* Tab 3: Add Shop Item */}
        {tab === 'shop' && (
          <form onSubmit={handleSaveShopItem} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Product Title</label>
                <input
                  type="text"
                  required
                  value={shopTitle}
                  onChange={(e) => setShopTitle(e.target.value)}
                  placeholder="e.g. VaultSync Pro Key"
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Price ($)</label>
                <input
                  type="number"
                  required
                  value={shopPrice}
                  onChange={(e) => setShopPrice(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={shopCategory}
                onChange={(e) => setShopCategory(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="License">License Key</option>
                <option value="Plugin">Plugin Package</option>
                <option value="Guide">Workflow Guide</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Description</label>
              <textarea
                rows={2}
                value={shopDesc}
                onChange={(e) => setShopDesc(e.target.value)}
                placeholder="Product summary..."
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Publish Product to Shop
            </button>
          </form>
        )}

        {/* Tab 4: Publish Post */}
        {tab === 'post' && (
          <form onSubmit={handleSavePost} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Post Title</label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="e.g. v2.6.0 Update Announcement"
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Summary</label>
              <input
                type="text"
                value={postSummary}
                onChange={(e) => setPostSummary(e.target.value)}
                placeholder="Brief excerpt..."
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Content</label>
              <textarea
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your devlog post..."
                className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Newspaper className="w-4 h-4" /> Publish Devlog Update
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
