import React from 'react';
import { MembershipTier } from '../types';
import { Award, Check, Sparkles, Shield, Heart } from 'lucide-react';

interface TiersTabProps {
  tiers: MembershipTier[];
  onJoinTier: (tier: MembershipTier) => void;
}

export const TiersTab: React.FC<TiersTabProps> = ({ tiers, onJoinTier }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5" /> Monthly Creator Memberships
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Support ZenCoder & Get Exclusive Perks
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Join a monthly tier to get early plugin beta access, high-speed sync relay node access, private Discord roles, and direct influence on development roadmap!
        </p>
      </div>

      {/* Grid of Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between shadow-xl relative transition-all duration-300 hover:-translate-y-1 ${
              tier.popular
                ? 'border-amber-500/60 ring-2 ring-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-extrabold tracking-wider shadow-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> MOST POPULAR
              </div>
            )}

            <div className="space-y-4">
              {/* Icon & Title */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md border border-slate-800"
                  style={{ backgroundColor: `${tier.color}20`, borderColor: `${tier.color}40` }}
                >
                  {tier.badgeIcon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {tier.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {tier.membersCount} active members
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="py-2 border-y border-slate-800/80">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">${tier.price}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {tier.billingPeriod}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {tier.description}
              </p>

              {/* Perks List */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Included Perks:
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Join Action */}
            <div className="pt-6 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => onJoinTier(tier)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Join Tier (${tier.price}/mo)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
