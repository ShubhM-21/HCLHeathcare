import React, { useState } from 'react';
import {
  ArrowLeft,
  Footprints,
  Flame,
  Award,
  Trophy,
  Calendar,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  Share2,
  Users,
  ChevronRight,
  Info
} from 'lucide-react';
import { ACTIVITY_HOURLY_DATA } from '../data/patientData';

export function ActivityDetailScreen({ patient, onBack, onTrackAnalytics }) {
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const movement = patient?.dailyMovement || {
    steps: 5420,
    goal: 8500,
    activeCalories: 284,
    distanceKm: 3.8,
    activeMinutes: 44,
  };

  const progress = Math.min(100, Math.round((movement.steps / movement.goal) * 100));
  const remaining = Math.max(0, movement.goal - movement.steps);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      if (onTrackAnalytics) {
        onTrackAnalytics('fitness_tracker_synced', { steps: movement.steps });
      }
    }, 800);
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Top Header with Back Navigation */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
          Movement Activity
        </span>
      </div>

      {/* Main Metric Hero Card */}
      <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#99F6E4] flex items-center gap-1">
            <Footprints className="w-3.5 h-3.5" /> Today's Movement
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white">
            Target: {movement.goal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-black tracking-tight">
              {movement.steps.toLocaleString()}
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              steps walked today ({progress}% of daily goal)
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#99F6E4]">
              {remaining.toLocaleString()}
            </div>
            <p className="text-[10px] text-white/70">steps to target</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#5EEAD4] to-[#2DD4BF] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 3 Secondary Movement Stats */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/15 text-center">
          <div>
            <div className="text-sm font-extrabold text-white">
              {movement.activeCalories}
            </div>
            <div className="text-[10px] text-white/70">Active Kcal</div>
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">
              {movement.distanceKm || 3.8} km
            </div>
            <div className="text-[10px] text-white/70">Distance</div>
          </div>
          <div>
            <div className="text-sm font-extrabold text-white">
              {movement.activeMinutes || 44} min
            </div>
            <div className="text-[10px] text-white/70">Active Time</div>
          </div>
        </div>
      </div>

      {/* Hourly Step Distribution Chart */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#0F766E]" />
            Hourly Activity Breakdown
          </h3>
          <span className="text-[10px] text-[#64748B]">Updated 10m ago</span>
        </div>

        <div className="h-32 flex items-end justify-between gap-2 pt-4 px-1">
          {ACTIVITY_HOURLY_DATA.map((h, i) => {
            const heightPct = Math.min(100, Math.round((h.steps / 1300) * 100));
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[9px] font-bold text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">
                  {h.steps}
                </span>
                <div className="w-full bg-[#F1F5F9] rounded-t-lg h-24 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-[#0F766E] group-hover:bg-[#0D9488] rounded-t-lg transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#64748B] font-medium">
                  {h.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corporate Step Challenge Widget */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#0F172A]">
                HealthyEHC 30-Day Step Challenge
              </h3>
              <p className="text-[11px] text-[#64748B]">
                HCL Tech Corporate Wellness League
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
            Rank #14
          </span>
        </div>

        <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#475569]">Your Team Ranking:</span>
            <span className="font-extrabold text-[#0F172A]">
              14th of 320 Participants
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#475569]">Weekly Total:</span>
            <span className="font-bold text-[#0F766E]">41,280 steps</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#475569]">Challenge Reward:</span>
            <span className="font-bold text-[#059669]">
              ₹500 Wellness Credit unlocked at 60k
            </span>
          </div>
        </div>

        {/* Sync Device Button */}
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F766E] font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>
            {syncing
              ? 'Syncing with Apple Health / Google Fit...'
              : synced
              ? 'Synced Just Now (Google Fit & Apple Health)'
              : 'Sync Tracker (Apple Health / Google Fit)'}
          </span>
        </button>
      </div>

      {/* Illustrative Disclaimer */}
      <div className="flex items-center gap-2 text-[10px] text-[#64748B] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
        <Info className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
        <span>
          Activity metrics and corporate step leagues are illustrative simulations for the HealthyEHC interactive prototype.
        </span>
      </div>
    </div>
  );
}
