import React, { useState } from 'react';
import { SupporterMessage } from '../types';
import { Heart, MessageSquare, Pin, Coffee, Sparkles, Send, ShieldCheck, Search, Filter } from 'lucide-react';

interface SupporterFeedProps {
  supporters: SupporterMessage[];
  isCreatorMode: boolean;
  onLikeMessage: (id: string) => void;
  onReplyMessage: (id: string, replyText: string) => void;
}

export const SupporterFeed: React.FC<SupporterFeedProps> = ({
  supporters,
  isCreatorMode,
  onLikeMessage,
  onReplyMessage,
}) => {
  const [filter, setFilter] = useState<'all' | 'messages' | 'monthly' | 'pinned'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<string>('');

  const filteredSupporters = supporters.filter((item) => {
    if (filter === 'messages' && !item.message) return false;
    if (filter === 'monthly' && !item.isMonthly) return false;
    if (filter === 'pinned' && !item.pinned) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchMsg = item.message.toLowerCase().includes(q);
      return matchName || matchMsg;
    }
    return true;
  });

  const handleSendReply = (id: string) => {
    if (!replyInput.trim()) return;
    onReplyMessage(id, replyInput.trim());
    setReplyingToId(null);
    setReplyInput('');
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search supporters or notes..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Feed' },
            { id: 'messages', label: 'Notes' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'pinned', label: 'Pinned' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filter === chip.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {filteredSupporters.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
            No supporter messages found matching your filter.
          </div>
        ) : (
          filteredSupporters.map((item) => (
            <div
              key={item.id}
              className={`bg-slate-900/90 border rounded-2xl p-5 shadow-sm transition-all hover:border-slate-700 ${
                item.pinned
                  ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/5 via-slate-900/90 to-slate-900/90'
                  : 'border-slate-800'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  {item.isAnonymous || !item.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-sm">
                      ☕
                    </div>
                  ) : (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  )}

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">
                        {item.name}
                      </span>

                      {item.pinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                          <Pin className="w-2.5 h-2.5" /> Pinned
                        </span>
                      )}

                      {item.tierName && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">
                          <Sparkles className="w-2.5 h-2.5" /> {item.tierName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-amber-400 font-semibold">
                        bought {item.coffees} {item.coffees === 1 ? 'coffee' : 'coffees'} (${item.amount})
                      </span>
                      {item.isMonthly && (
                        <span className="text-slate-500 font-mono text-[11px]">• Monthly</span>
                      )}
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500 text-[11px]">{item.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => onLikeMessage(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                    item.hasLiked
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold'
                      : 'bg-slate-950/60 text-slate-400 hover:text-rose-400 border border-slate-800'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>{item.likes}</span>
                </button>
              </div>

              {/* Message Body */}
              {item.message && (
                <p className="mt-3 text-slate-200 text-sm leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                  "{item.message}"
                </p>
              )}

              {/* Creator Reply Thread */}
              {item.creatorReply ? (
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-start gap-3 bg-purple-950/20 p-3 rounded-xl border border-purple-900/30">
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300">HaierKeys (Creator)</span>
                      <span className="text-[10px] text-slate-500">{item.creatorReply.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.creatorReply.text}
                    </p>
                  </div>
                </div>
              ) : isCreatorMode ? (
                <div className="mt-3 pt-2">
                  {replyingToId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder="Type reply as HaierKeys..."
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-amber-500/40 rounded-xl text-xs text-white focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSendReply(item.id)}
                        className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 hover:bg-amber-400"
                      >
                        <Send className="w-3 h-3" /> Reply
                      </button>
                      <button
                        onClick={() => setReplyingToId(null)}
                        className="px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setReplyingToId(item.id);
                        setReplyInput('');
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" /> Reply to Supporter (Creator Mode)
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
