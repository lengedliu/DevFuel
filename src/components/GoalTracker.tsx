import React from 'react';
import { CoffeeGoal } from '../types';
import { Target, Server, Calendar, Edit2, CheckCircle2 } from 'lucide-react';

interface GoalTrackerProps {
  goal: CoffeeGoal;
  isCreatorMode: boolean;
  onEditGoal?: () => void;
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({ goal, isCreatorMode, onEditGoal }) => {
  const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg relative overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header & Title */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
            <Server className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
              Monthly Funding Goal
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{goal.title}</span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Reached!
                </span>
              )}
            </h3>
          </div>
        </div>

        {isCreatorMode && onEditGoal && (
          <button
            onClick={onEditGoal}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors"
            title="Edit Goal (Creator Mode)"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        {goal.description}
      </p>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-amber-400 font-bold text-sm">
            {goal.currency}{goal.currentAmount} <span className="text-slate-400 text-xs font-normal">raised of {goal.currency}{goal.targetAmount}</span>
          </span>
          <span className="text-purple-300 font-bold">{percentage}%</span>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-1000 shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{goal.deadlineDaysLeft} days remaining this month</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <span>87 Supporters Contributed</span>
        </div>
      </div>
    </div>
  );
};
