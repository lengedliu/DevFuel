import React from 'react';
import { CreatorProfile } from '../types';
import { ShieldCheck, Github, ExternalLink, Coffee, Heart, Share2, Sparkles, UserCheck, Eye, Settings, MessageSquare } from 'lucide-react';

interface HeaderBannerProps {
  profile: CreatorProfile;
  isCreatorMode: boolean;
  onToggleCreatorMode: () => void;
  onOpenSupportModal: () => void;
  onOpenShareModal: () => void;
  onOpenDashboardModal: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  profile,
  isCreatorMode,
  onToggleCreatorMode,
  onOpenSupportModal,
  onOpenShareModal,
  onOpenDashboardModal,
}) => {
  return (
    <header className="relative w-full bg-slate-900 text-slate-100 overflow-hidden">
      {/* Cover Image Background */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={profile.coverImage}
          alt="Cover Banner"
          className="w-full h-full object-cover object-center opacity-70 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Obsidian & Developer Theme Graphic Accents */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-purple-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Obsidian Plugin Developer</span>
        </div>

        {/* Creator / Visitor Mode Toggle Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
          <button
            onClick={onToggleCreatorMode}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-lg backdrop-blur-md border ${
              isCreatorMode
                ? 'bg-amber-500 text-slate-950 border-amber-300 font-semibold'
                : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-800 hover:border-slate-500'
            }`}
            title="Toggle between Fan view and Creator management view"
          >
            {isCreatorMode ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Creator Mode (Active)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Switch to Creator View</span>
              </>
            )}
          </button>
          
          {isCreatorMode && (
            <button
              onClick={onOpenDashboardModal}
              className="p-2 rounded-full bg-slate-800/90 hover:bg-purple-600 text-white border border-slate-700 transition-all shadow-lg"
              title="Creator Settings & Revenue Dashboard"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Creator Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Avatar Frame */}
            <div className="relative group">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-slate-950 shadow-2xl bg-slate-800 ring-2 ring-purple-500/40">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-1.5 rounded-xl shadow-lg border-2 border-slate-950" title="Verified Ko-fi Creator">
                <ShieldCheck className="w-5 h-5 text-slate-950 fill-slate-950/20" />
              </div>
            </div>

            {/* Profile Text */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="text-slate-400 font-mono text-sm">@{profile.handle}</span>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-3 h-3" /> Creator
                  </span>
                )}
              </div>

              <p className="text-amber-400 font-medium text-sm flex items-center justify-center sm:justify-start gap-1.5">
                <span>{profile.category}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{profile.location}</span>
              </p>

              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center justify-center sm:justify-end gap-3 flex-wrap pt-2 md:pt-0">
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all text-sm font-medium shadow-sm hover:border-slate-600"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Share</span>
            </button>

            <button
              onClick={onOpenSupportModal}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform active:scale-95"
            >
              <Coffee className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>Buy a Coffee ($3)</span>
            </button>
          </div>
        </div>

        {/* Bio Drawer & Social Badges */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub Repository</span>
            </a>

            <a
              href={profile.obsidianPluginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-950/60 text-purple-300 border border-purple-800/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
              <span>Obsidian Plugins</span>
            </a>

            <a
              href={profile.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-300" />
              <span>Discord Community</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-5 text-slate-300 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span className="font-bold text-white text-sm">{profile.coffeesCount.toLocaleString()}</span> Coffees
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
              <span className="font-bold text-white text-sm">{profile.supportersCount}</span> Supporters
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
