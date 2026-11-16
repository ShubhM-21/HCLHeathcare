import React, { useState, useRef, useEffect } from 'react';
import {
  Activity,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Stethoscope,
  FlaskConical,
  Apple,
  Footprints,
  Calendar,
  Search,
  X,
  Check,
  Smartphone,
  Layers,
  Info,
  Sparkles,
  ShieldCheck,
  Clock,
  Trophy,
  Lock,
  RefreshCw,
  SlidersHorizontal,
  FileText,
  Building2,
  Home,
  HeartPulse,
  ShoppingBag,
  User,
  Heart
} from 'lucide-react';

import {
  PATIENT_PROFILES,
  PATIENT_PROFILE,
  GLOSSARY_TERMS,
  BIOMARKER_CATEGORIES,
  BIOMARKER_CATEGORIES_OPTIMAL,
  HRA_QUESTIONS,
  RISK_PROBABILITIES,
  ACTION_PLAN_ITEMS,
  EMPLOYER_BENEFITS,
  NOTIFICATIONS_DATA,
  ACTIVITY_HOURLY_DATA,
} from './data/patientData';

import { AppBottomNav } from './components/AppBottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen, ProfileScreen } from './components/PlaceholderScreens';
import { ActivityDetailScreen } from './components/ActivityDetailScreen';
import { NotificationsModal } from './components/NotificationsModal';
import {
  DoctorConsultationScreen,
  LabTestsScreen,
  NutritionGuidanceScreen,
  PhysicalActivityScreen,
} from './components/ActionDestinationScreens';

// Re-export for compatibility
// ============================================================================
// HELPER: ACCESSIBLE SEMANTIC BADGE & INLINE GLOSSARY TRIGGER
// ============================================================================

const STATUS_STYLES = {
  normal: {
    badgeBg: 'bg-[#ECFDF5]',
    badgeText: 'text-[#059669]',
    badgeBorder: 'border-[#A7F3D0]',
    dot: 'bg-[#059669]',
    label: 'NORMAL',
  },
  borderline: {
    badgeBg: 'bg-[#FFFBEB]',
    badgeText: 'text-[#B45309]',
    badgeBorder: 'border-[#FDE68A]',
    dot: 'bg-[#B45309]',
    label: 'BORDERLINE',
  },
  flagged: {
    badgeBg: 'bg-[#FEF2F2]',
    badgeText: 'text-[#DC2626]',
    badgeBorder: 'border-[#FECACA]',
    dot: 'bg-[#DC2626]',
    label: 'FLAGGED',
  },
};

export function GlossaryTerm({ termKey, label, onOpenGlossary, className = '' }) {
  if (!termKey || !GLOSSARY_TERMS[termKey]) {
    return <span className={className}>{label || termKey}</span>;
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenGlossary(termKey);
      }}
      className={`inline font-medium text-[#0F766E] underline decoration-[#0D9488]/60 decoration-dotted underline-offset-4 hover:text-[#0D9488] hover:decoration-solid focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 rounded-xs transition-colors cursor-pointer ${className}`}
      title={`Tap to view plain-English definition of ${termKey}`}
    >
      {label || termKey}
    </button>
  );
}

// ============================================================================
// COMPONENT 1: HEALTH SCORE CARD (`HealthScoreCard`)
// ============================================================================

export function HealthScoreCard({
  score = 74,
  tier = 'FAIR',
  totalParameters = 50,
  previousScore = 68,
  interpretation = 'Solid baseline with 3 markers needing focus',
  counts = { flagged: 3, borderline: 5, normal: 42 },
  onOpenInfo,
}) {
  const radius = 54;
  const circumference = Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const scoreColor =
    score >= 80 ? 'text-[#059669]' : score >= 65 ? 'text-[#B45309]' : 'text-[#DC2626]';
  const tierBg =
    score >= 80
      ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
      : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#475569]">
            Overall Health Score
          </span>
          {onOpenInfo && (
            <button
              type="button"
              onClick={onOpenInfo}
              className="text-[#64748B] hover:text-[#0F766E] transition cursor-pointer"
              title="How is this illustrative score calculated?"
              aria-label="Score calculation info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${tierBg}`}
        >
          {tier}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Semi-circular Radial Gauge */}
        <div className="relative w-32 h-20 flex-shrink-0 flex items-end justify-center">
          <svg
            viewBox="0 0 128 72"
            className="w-full h-full overflow-visible"
            aria-label={`Health score ${score} out of 100`}
          >
            <path
              d="M 10 64 A 54 54 0 0 1 118 64"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 10 64 A 54 54 0 0 1 118 64"
              fill="none"
              stroke={score >= 80 ? '#059669' : '#0F766E'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute bottom-0.5 text-center">
            <span className={`text-2xl font-extrabold ${scoreColor} leading-none`}>
              {score}
            </span>
            <span className="text-xs font-medium text-[#64748B]">/100</span>
          </div>
        </div>

        {/* Interpretation & Delta */}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-snug">
            {interpretation}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#475569]">
            <span className="text-[#059669] font-bold">
              {score >= previousScore ? `+${score - previousScore} pts` : `${score - previousScore} pts`}
            </span>
            <span>vs. 2025 ({previousScore})</span>
          </div>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Tested across {totalParameters} clinical parameters
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 2: COMPARISON CHARTS (`ComparisonCharts`)
// ============================================================================

export function ComparisonCharts({
  variant = 'compact',
  onViewBenchmarks,
  onOpenGlossary,
  onStartHra,
  isHraComplete = false,
}) {
  const [peerFilter, setPeerFilter] = useState('all');

  const peerStats =
    peerFilter === 'all'
      ? {
          yourScore: 74,
          avgScore: 69,
          percentile: 68,
          caption: 'You score higher than 68% of users across HealthyEHC client companies.',
        }
      : {
          yourScore: 74,
          avgScore: 71,
          percentile: 62,
          caption: 'You score higher than 62% of peers in your age & gender cohort (30–40, Male).',
        };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#475569]">
            Benchmarks & Trends
          </span>
          {onViewBenchmarks && (
            <button
              type="button"
              onClick={onViewBenchmarks}
              className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0F766E] hover:text-[#0D9488] focus:outline-none cursor-pointer"
            >
              View Trends <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div
          onClick={onViewBenchmarks}
          role={onViewBenchmarks ? 'button' : undefined}
          tabIndex={onViewBenchmarks ? 0 : undefined}
          onKeyDown={(e) => {
            if (onViewBenchmarks && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onViewBenchmarks();
            }
          }}
          className={`grid grid-cols-2 gap-2.5 ${onViewBenchmarks ? 'cursor-pointer' : ''}`}
        >
          <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 hover:border-[#0D9488]/40 transition-colors">
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#475569]">
              <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
              <span>vs. Last Year</span>
            </div>
            <div className="mt-1 text-sm font-bold text-[#059669]">
              +6 pts <span className="text-xs font-normal text-[#475569]">(68 → 74)</span>
            </div>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 hover:border-[#0D9488]/40 transition-colors">
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#475569]">
              <Users className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>vs. Platform Peers</span>
            </div>
            <div className="mt-1 text-sm font-bold text-[#0F172A]">
              Better than 68%
            </div>
          </div>
        </div>
      </div>
    );
  }

  const historicalYears = [
    { year: '2026', score: 74, delta: '+6', active: true },
    { year: '2025', score: 68, delta: '+3', active: false },
    { year: '2024', score: 65, delta: null, active: false },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Year-on-Year Health Score Bar Chart */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold tracking-wider uppercase text-[#475569]">
            Year-on-Year Health Score
          </h3>
          <span className="text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
            +9 pts since 2024
          </span>
        </div>

        <div className="space-y-3">
          {historicalYears.map((item) => (
            <div key={item.year} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${item.active ? 'text-[#0F172A]' : 'text-[#475569]'}`}>
                  {item.year} {item.active && '(Current)'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#0F172A]">{item.score}</span>
                  {item.delta && (
                    <span className="text-[11px] font-semibold text-[#059669]">
                      ({item.delta})
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.active ? 'bg-[#0F766E]' : 'bg-[#94A3B8]'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Key Biomarker Shifts */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
        <h3 className="text-xs font-bold tracking-wider uppercase text-[#475569] mb-3">
          Key Biomarker Shifts (2025 → 2026)
        </h3>
        <div className="space-y-2.5">
          <div className="rounded-xl bg-[#ECFDF5]/70 border border-[#A7F3D0] p-3 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#065F46]">
                  Improved:{' '}
                  <GlossaryTerm
                    termKey="Triglycerides"
                    onOpenGlossary={onOpenGlossary}
                    className="text-[#065F46] font-bold"
                  />
                </span>
                <span className="text-[11px] font-bold text-[#059669] bg-white px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                  -15%
                </span>
              </div>
              <p className="text-xs text-[#047857] mt-0.5">
                150 mg/dL → <span className="font-bold">128 mg/dL</span> (Now Normal)
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#FEF2F2]/70 border border-[#FECACA] p-3 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#991B1B]">
                  Worsened:{' '}
                  <GlossaryTerm
                    termKey="LDL Cholesterol"
                    onOpenGlossary={onOpenGlossary}
                    className="text-[#991B1B] font-bold"
                  />
                </span>
                <span className="text-[11px] font-bold text-[#DC2626] bg-white px-2 py-0.5 rounded-full border border-[#FECACA]">
                  +18%
                </span>
              </div>
              <p className="text-xs text-[#B91C1C] mt-0.5">
                134 mg/dL → <span className="font-bold">158 mg/dL</span> (Flagged High)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Platform Peer Comparison */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xs font-bold tracking-wider uppercase text-[#475569]">
            Platform Peer Comparison
          </h3>
          <span className="text-[10px] text-[#64748B] italic">Illustrative cohort</span>
        </div>

        <div className="flex gap-1.5 mb-3.5">
          <button
            type="button"
            onClick={() => setPeerFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              peerFilter === 'all'
                ? 'bg-[#0F766E] text-white'
                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            All Users (India)
          </button>
          <button
            type="button"
            onClick={() => setPeerFilter('demographic')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              peerFilter === 'demographic'
                ? 'bg-[#0F766E] text-white'
                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
            }`}
          >
            Age & Gender Cohort
          </button>
        </div>

        <div className="grid grid-cols-2 divide-x divide-[#E2E8F0] bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] py-2.5 mb-4">
          <div className="text-center px-2">
            <div className="text-[11px] text-[#475569]">Your Score</div>
            <div className="text-lg font-extrabold text-[#0F766E]">{peerStats.yourScore}</div>
          </div>
          <div className="text-center px-2">
            <div className="text-[11px] text-[#475569]">Platform Avg</div>
            <div className="text-lg font-extrabold text-[#475569]">{peerStats.avgScore}</div>
          </div>
        </div>

        <div className="relative pt-6 pb-2">
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
            style={{ left: `${peerStats.yourScore}%` }}
          >
            <span className="px-2 py-0.5 rounded bg-[#0F766E] text-white text-[10px] font-bold shadow-xs whitespace-nowrap">
              YOU: {peerStats.yourScore}
            </span>
            <div className="w-0.5 h-2 bg-[#0F766E]" />
          </div>

          <div className="h-3 rounded-full bg-gradient-to-r from-[#E2E8F0] via-[#CCFBF1] to-[#99F6E4] relative border border-[#CBD5E1]">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#475569]"
              style={{ left: `${peerStats.avgScore}%` }}
              title={`Platform Average: ${peerStats.avgScore}`}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0F766E] border-2 border-white shadow-xs transition-all duration-300"
              style={{ left: `${peerStats.yourScore}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-medium text-[#64748B] mt-1.5">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <p className="mt-2 text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
          {peerStats.caption}
        </p>
      </div>

      {/* Contextual HRA CTA inside Benchmarks */}
      {!isHraComplete && onStartHra && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#065F46] block">
              Personalise your risk assessment
            </span>
            <span className="text-[11px] text-[#047857]">
              Answer 5 questions to adjust long-term benchmarks.
            </span>
          </div>
          <button
            type="button"
            onClick={onStartHra}
            className="px-3 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#0D9488] transition cursor-pointer flex-shrink-0"
          >
            Start (1 min) →
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT 3: HEALTH CATEGORY SUMMARY (`HealthCategorySummary`)
// ============================================================================

export function HealthCategorySummary({
  categories = BIOMARKER_CATEGORIES,
  counts = { flagged: 3, borderline: 5, normal: 42 },
  onSelectCategory,
  onOpenGlossary,
}) {
  const [normalExpanded, setNormalExpanded] = useState(false);

  const priorityCategories = categories.filter(
    (c) => c.flaggedCount > 0 || c.borderlineCount > 0
  );
  const allNormalCategories = categories.filter(
    (c) => c.flaggedCount === 0 && c.borderlineCount === 0
  );
  const allNormalParamCount = allNormalCategories.reduce(
    (acc, c) => acc + c.totalCount,
    0
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#475569]">
          Health Results By Category ({categories.reduce((acc, c) => acc + c.totalCount, 0)} Tests)
        </span>
      </div>

      {/* Priority Abnormal Category Cards */}
      <div className="space-y-2.5">
        {priorityCategories.map((cat) => {
          const hasFlagged = cat.flaggedCount > 0;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.id, 'all')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory && onSelectCategory(cat.id, 'all');
                }
              }}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs hover:border-[#0D9488]/50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {hasFlagged ? (
                    <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#B45309] flex-shrink-0" />
                  )}
                  <span className="text-sm font-bold text-[#0F172A] truncate">
                    {cat.name}{' '}
                    <span className="font-normal text-[#64748B]">
                      ({cat.totalCount})
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {cat.flaggedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                      {cat.flaggedCount} Flagged
                    </span>
                  )}
                  {cat.flaggedCount === 0 && cat.borderlineCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                      {cat.borderlineCount} Borderline
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                </div>
              </div>

              {cat.summaryPreview.length > 0 && (
                <div className="mt-2 pl-6 space-y-1">
                  {cat.summaryPreview.map((item) => (
                    <div
                      key={item.term}
                      className="flex items-center justify-between text-xs"
                    >
                      <GlossaryTerm
                        termKey={item.term}
                        onOpenGlossary={onOpenGlossary}
                      />
                      <span
                        className={`font-semibold ${
                          item.status === 'flagged' ? 'text-[#DC2626]' : 'text-[#B45309]'
                        }`}
                      >
                        {item.value}{' '}
                        <span className="font-normal text-[11px]">
                          ({item.status === 'flagged' ? 'Flagged' : 'Borderline'})
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Expandable Accordion for All-Normal Categories */}
        {allNormalCategories.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={() => setNormalExpanded((prev) => !prev)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              aria-expanded={normalExpanded}
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-[#059669] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#0F172A]">
                    {allNormalCategories.length} Other Categories{' '}
                    <span className="font-normal text-[#64748B]">
                      ({allNormalParamCount} tests)
                    </span>
                  </div>
                  <div className="text-xs text-[#475569] truncate">
                    {allNormalCategories.map((c) => c.name).join(', ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  All Normal
                </span>
                {normalExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#64748B]" />
                )}
              </div>
            </button>

            {normalExpanded && (
              <div className="border-t border-[#E2E8F0] divide-y divide-[#F1F5F9] bg-[#F8FAFC]/60">
                {allNormalCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory && onSelectCategory(cat.id, 'all')}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-xs hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-[#0F172A]">
                      {cat.name}{' '}
                      <span className="font-normal text-[#64748B]">
                        ({cat.totalCount} tests)
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#059669]">
                      All Normal <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 4: TEST PARAMETER CARD (`TestParameterCard`)
// ============================================================================

export function TestParameterCard({ parameter, onOpenGlossary, isHighlighted = false }) {
  const style = STATUS_STYLES[parameter.status] || STATUS_STYLES.normal;
  const isLowBad = parameter.spectrumType === 'low-bad';

  return (
    <div
      id={`param-${parameter.id}`}
      className={`bg-white rounded-2xl border p-3.5 shadow-xs space-y-2.5 transition-all duration-300 ${
        isHighlighted
          ? 'border-[#0F766E] ring-2 ring-[#0F766E]/20 bg-[#CCFBF1]/10'
          : 'border-[#E2E8F0]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-bold text-[#0F172A]">
          {parameter.glossaryKey ? (
            <GlossaryTerm
              termKey={parameter.glossaryKey}
              label={parameter.name}
              onOpenGlossary={onOpenGlossary}
              className="font-bold text-left"
            />
          ) : (
            parameter.name
          )}
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider border flex-shrink-0 ${style.badgeBg} ${style.badgeText} ${style.badgeBorder}`}
        >
          {style.label}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div>
          <span className="text-lg font-extrabold text-[#0F172A]">{parameter.value}</span>{' '}
          <span className="text-xs font-medium text-[#475569]">{parameter.unit}</span>
        </div>
        <span className="text-xs font-medium text-[#475569]">{parameter.normalRange}</span>
      </div>

      <div className="pt-1 pb-0.5">
        <div className="relative h-2.5 w-full rounded-full flex overflow-hidden bg-[#F1F5F9]">
          {isLowBad ? (
            <>
              <div className="w-[30%] bg-[#FECACA]" title="Flagged Low" />
              <div className="w-[25%] bg-[#FDE68A]" title="Borderline" />
              <div className="w-[45%] bg-[#A7F3D0]" title="Normal" />
            </>
          ) : (
            <>
              <div className="w-[45%] bg-[#A7F3D0]" title="Normal" />
              <div className="w-[25%] bg-[#FDE68A]" title="Borderline" />
              <div className="w-[30%] bg-[#FECACA]" title="Flagged High" />
            </>
          )}
        </div>

        <div className="relative h-2 -mt-2.5">
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${style.dot}`}
            style={{ left: `${parameter.pinPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] font-medium text-[#64748B] mt-1">
          {isLowBad ? (
            <>
              <span>Low</span>
              <span>Borderline</span>
              <span>Normal</span>
            </>
          ) : (
            <>
              <span>Normal</span>
              <span>Borderline</span>
              <span>High</span>
            </>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-[#F1F5F9] flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium text-[#475569]">{parameter.yoyText}</span>
          {parameter.yoyTrend === 'improved' && (
            <span className="font-semibold text-[#059669]">Improved</span>
          )}
          {parameter.yoyTrend === 'worsened' && (
            <span className="font-semibold text-[#DC2626]">Needs focus</span>
          )}
        </div>
        {parameter.note && (
          <p className="text-[11px] text-[#475569] leading-relaxed">
            {parameter.note}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 5: GLOSSARY BOTTOM SHEET (`GlossaryBottomSheet`)
// ============================================================================

export function GlossaryBottomSheet({
  isOpen,
  mode = 'contextual',
  selectedTermKey,
  onSelectTerm,
  onClose,
  onJumpToParameter,
  isInlinePreview = false,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen && mode === 'global') {
      setSearchQuery('');
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const allEntries = Object.values(GLOSSARY_TERMS).sort((a, b) =>
    a.term.localeCompare(b.term)
  );
  const filteredEntries = allEntries.filter(
    (entry) =>
      entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeEntry =
    selectedTermKey && GLOSSARY_TERMS[selectedTermKey]
      ? GLOSSARY_TERMS[selectedTermKey]
      : allEntries[0];

  const sheetBody = (
    <div
      className={`bg-white shadow-2xl flex flex-col w-full overflow-hidden ${
        isInlinePreview
          ? 'rounded-2xl border border-[#CBD5E1]'
          : 'rounded-t-3xl border-t border-[#CBD5E1] max-h-[82%]'
      }`}
    >
      <div className="px-4 pt-2.5 pb-3 border-b border-[#E2E8F0] flex-shrink-0">
        {!isInlinePreview && (
          <div className="w-10 h-1 bg-[#CBD5E1] rounded-full mx-auto mb-2.5" />
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                {mode === 'contextual' ? 'Health Glossary' : 'Health Glossary (A–Z)'}
              </h3>
              <p className="text-[11px] text-[#475569]">
                Plain-English medical explanation guide
              </p>
            </div>
          </div>
          {!isInlinePreview && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] flex items-center justify-center cursor-pointer"
              aria-label="Close glossary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {mode === 'global' && (
          <div className="mt-3 relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search biomarkers, risks, or medical terms..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        )}
      </div>

      <div className="p-4 overflow-y-auto space-y-3 flex-1">
        {mode === 'contextual' ? (
          <>
            <div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] text-[10px] font-bold uppercase tracking-wider mb-1">
                {activeEntry.category}
              </span>
              <h4 className="text-base font-extrabold text-[#0F172A]">{activeEntry.term}</h4>
              <p className="text-xs font-medium text-[#475569]">{activeEntry.fullName}</p>
            </div>

            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                What is it?
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">{activeEntry.whatItIs}</p>
            </div>

            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                What high / low levels mean
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">{activeEntry.levelsMean}</p>
            </div>

            {activeEntry.paramId && onJumpToParameter && (
              <button
                type="button"
                onClick={() => onJumpToParameter(activeEntry.paramId)}
                className="w-full py-2 px-3 rounded-xl border border-[#0F766E]/30 bg-[#CCFBF1]/30 text-[#0F766E] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#CCFBF1]/50 transition cursor-pointer"
              >
                View in My Detailed Results <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        ) : (
          <div className="space-y-2">
            {filteredEntries.length === 0 ? (
              <p className="text-xs text-[#64748B] text-center py-6">
                No medical terms matched "{searchQuery}".
              </p>
            ) : (
              filteredEntries.map((entry) => (
                <button
                  key={entry.term}
                  type="button"
                  onClick={() => onSelectTerm && onSelectTerm(entry.term)}
                  className="w-full text-left p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F766E]/50 transition flex items-start justify-between gap-2 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0F172A]">{entry.term}</div>
                    <div className="text-[11px] text-[#475569] line-clamp-2 mt-0.5">
                      {entry.whatItIs}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-0.5" />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-3.5 border-t border-[#E2E8F0] bg-white flex-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          Got It — Return to Report
        </button>
      </div>
    </div>
  );

  if (isInlinePreview) {
    return (
      <div className="rounded-2xl border border-[#CBD5E1] bg-[#0F172A]/5 p-2 flex items-end justify-center">
        {sheetBody}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 z-40 bg-[#0F172A]/45 backdrop-blur-xs flex items-end animate-fadeIn"
      onClick={onClose}
    >
      <div className="w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
        {sheetBody}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 6: ASSESSMENT QUESTION CARD (`AssessmentQuestionCard`)
// ============================================================================

export function AssessmentQuestionCard({
  questionData,
  totalQuestions = 5,
  selectedOptionId,
  onSelectOption,
  onPrev,
  onNext,
  onSubmitQuiz,
  onSaveAndExit,
  onOpenGlossary,
}) {
  const progressPct = Math.round((questionData.number / totalQuestions) * 100);
  const isLast = questionData.number === totalQuestions;

  return (
    <div className="space-y-4">
      {/* Progress & Coin Header */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#0F172A]">
            Question {questionData.number} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[11px] font-bold">
              <Award className="w-3.5 h-3.5" /> +50 Coins
            </span>
            {onSaveAndExit && (
              <button
                type="button"
                onClick={onSaveAndExit}
                className="text-[11px] font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                Save & Exit
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F766E] rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3.5">
        <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
          {questionData.question}
        </h3>

        <div className="space-y-2.5">
          {questionData.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(questionData.id, opt.id)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#CCFBF1]/35 border-[#0F766E] text-[#0F172A] shadow-2xs'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#0D9488]/50'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-[#0F766E] bg-[#0F766E]' : 'border-[#94A3B8] bg-white'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <span className="text-xs font-semibold leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#475569] leading-relaxed">
            <span className="font-bold text-[#0F172A]">Why this matters: </span>
            {questionData.whyTextPrefix}
            <GlossaryTerm
              termKey={questionData.whyGlossaryTerm}
              onOpenGlossary={onOpenGlossary}
            />
            {questionData.whyTextMiddle}
            {questionData.whyGlossaryTerm2 && (
              <GlossaryTerm
                termKey={questionData.whyGlossaryTerm2}
                onOpenGlossary={onOpenGlossary}
              />
            )}
            {questionData.whyTextSuffix}
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={questionData.number === 1}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition ${
            questionData.number === 1
              ? 'border-[#E2E8F0] text-[#94A3B8] cursor-not-allowed bg-white'
              : 'border-[#CBD5E1] text-[#0F172A] bg-white hover:bg-[#F1F5F9] cursor-pointer'
          }`}
        >
          ← Prev
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmitQuiz}
            disabled={!selectedOptionId}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-xs ${
              selectedOptionId
                ? 'bg-[#0F766E] hover:bg-[#0D9488] text-white cursor-pointer'
                : 'bg-[#CBD5E1] text-[#64748B] cursor-not-allowed'
            }`}
          >
            Submit & Calculate Risks →
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedOptionId}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              selectedOptionId
                ? 'bg-[#0F766E] text-white hover:bg-[#0D9488] cursor-pointer shadow-xs'
                : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 7: RISK PROBABILITY CARD (`RiskProbabilityCard`)
// ============================================================================

export function RiskProbabilityCard({ risk, onOpenGlossary }) {
  const isModerate = risk.level === 'MODERATE';

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-bold text-[#0F172A]">
          {risk.rank}.{' '}
          <GlossaryTerm
            termKey={risk.glossaryKey}
            label={risk.title}
            onOpenGlossary={onOpenGlossary}
            className="font-bold"
          />
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider border ${
            isModerate
              ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
              : 'bg-[#FEF3C7]/70 text-[#92400E] border-[#FDE68A]'
          }`}
        >
          {risk.level}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-[#0F172A]">{risk.percentage}%</span>
          <span className="text-xs font-medium text-[#475569]">estimated 10-year risk</span>
        </div>

        <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D97706] rounded-full transition-all duration-500"
            style={{ width: `${risk.percentage}%` }}
          />
        </div>
      </div>

      <div className="pt-1">
        <span className="text-[11px] font-semibold text-[#475569] block mb-1">
          Key Drivers:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {risk.drivers.map((driver) => (
            <span
              key={driver.label}
              className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#0F172A]"
            >
              {driver.glossaryKey ? (
                <GlossaryTerm
                  termKey={driver.glossaryKey}
                  label={driver.label}
                  onOpenGlossary={onOpenGlossary}
                />
              ) : (
                driver.label
              )}
            </span>
          ))}
        </div>
        {risk.explanation && (
          <p className="text-[11px] text-[#64748B] mt-2 leading-relaxed">
            {risk.explanation}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 8: ACTION PLAN RECOMMENDATION CARD (`ActionPlanRecommendationCard`)
// ============================================================================

export function ActionPlanRecommendationCard({
  item,
  completedActionIds = [],
  onTriggerAction,
  onOpenGlossary,
}) {
  const iconMap = {
    consult: Stethoscope,
    labs: FlaskConical,
    nutrition: Apple,
    activity: Footprints,
  };
  const IconComponent = iconMap[item.id] || Stethoscope;

  const isCompleted = item.actions.some((a) => completedActionIds.includes(a.id));

  return (
    <div
      className={`bg-white rounded-2xl border p-4 shadow-xs space-y-3 ${
        item.isPriority
          ? 'border-[#0F766E]/50 ring-1 ring-[#0F766E]/10'
          : 'border-[#E2E8F0]'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-[#CCFBF1]/60 text-[#0F766E] flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-4 h-4" />
          </span>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#475569]">
            {item.stepNumber}. {item.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              <Check className="w-3 h-3" /> Demo Active
            </span>
          )}
          {item.isPriority && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-[#0F766E] text-white">
              PRIORITY
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
        <p className="text-xs text-[#475569] leading-relaxed">
          {item.whyRecommended}
        </p>
        {item.relatesTo && (
          <div className="text-[11px] text-[#64748B] pt-0.5">
            <span className="font-semibold text-[#0F766E]">Relates to: </span>
            {item.relatesTo}
          </div>
        )}
      </div>

      <div className={`grid gap-2 pt-0.5 ${item.actions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {item.actions.map((action) => {
          const isPrimary = action.variant === 'primary';
          const isDone = completedActionIds.includes(action.id);
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onTriggerAction(action)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                isPrimary
                  ? 'bg-[#0F766E] hover:bg-[#0D9488] text-white shadow-2xs'
                  : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F766E] border border-[#CBD5E1]'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : null}
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  const [viewMode, setViewMode] = useState('prototype'); // 'prototype' | 'components'
  const [currentProfileId, setCurrentProfileId] = useState('rohan'); // 'rohan' | 'priya'
  const [activeAppTab, setActiveAppTab] = useState('home'); // 'home' | 'health' | 'services' | 'profile'
  const [reportStatus, setReportStatus] = useState('ready'); // 'ready' | 'pending' | 'not_completed' | 'viewed'
  const [homeSubScreen, setHomeSubScreen] = useState('root'); // 'root' | 'activity' | 'doctor' | 'labs' | 'nutrition'
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [currentScenario, setCurrentScenario] = useState('scenario-1');

  // Analytics event stream (Section 10)
  const [analyticsEvents, setAnalyticsEvents] = useState([
    { id: 1, name: 'home_screen_viewed', time: '9:41 AM', payload: { user: 'Rohan Sharma' } },
    { id: 2, name: 'next_health_action_viewed', time: '9:41 AM', payload: { recommendation: 'Complete HRA' } },
  ]);
  const [showAnalyticsDrawer, setShowAnalyticsDrawer] = useState(false);

  const logAnalyticsEvent = (name, payload = {}) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(`[HealthyEHC Analytics] ${name}`, payload);
    setAnalyticsEvents((prev) => [
      { id: Date.now(), name, time: timestamp, payload },
      ...prev.slice(0, 14),
    ]);
  };

  const handleSelectAppTab = (tabId) => {
    logAnalyticsEvent('bottom_navigation_clicked', { fromTab: activeAppTab, toTab: tabId });
    setActiveAppTab(tabId);
    if (tabId === 'home') {
      setHomeSubScreen('root');
      logAnalyticsEvent('home_screen_viewed', { user: currentPatient.name });
    } else if (tabId === 'health') {
      logAnalyticsEvent('health_report_opened', { user: currentPatient.name });
    }
  };

  const handleApplyScenario = (scenarioId) => {
    setCurrentScenario(scenarioId);
    setActiveAppTab('home');
    setHomeSubScreen('root');
    if (scenarioId === 'scenario-1') {
      setCurrentProfileId('rohan');
      setReportStatus('ready');
      setQuizCompleted(false);
      setHraAnswers({});
      logAnalyticsEvent('scenario_applied', { scenario: 'Scenario 1: Report Ready, HRA Incomplete' });
    } else if (scenarioId === 'scenario-2') {
      setCurrentProfileId('rohan');
      setReportStatus('ready');
      setQuizCompleted(true);
      setHraAnswers({
        q1: 'yes_immediate',
        q2: 'sedentary',
        q3: 'never',
        q4: 'low',
        q5: 'short',
      });
      logAnalyticsEvent('scenario_applied', { scenario: 'Scenario 2: Report Ready, HRA Completed' });
    } else if (scenarioId === 'scenario-3') {
      setReportStatus('pending');
      logAnalyticsEvent('scenario_applied', { scenario: 'Scenario 3: Report Pending' });
    } else if (scenarioId === 'scenario-4') {
      setCurrentProfileId('rohan');
      setReportStatus('ready');
      logAnalyticsEvent('scenario_applied', { scenario: 'Scenario 4: Priority Finding (Rohan - LDL 158)' });
    } else if (scenarioId === 'scenario-5') {
      setCurrentProfileId('priya');
      setReportStatus('ready');
      logAnalyticsEvent('scenario_applied', { scenario: 'Scenario 5: Optimal Health (Priya - 92 Score)' });
    }
  };

  // Internal Report Screen:
  // 'overview' | 'benchmarks' | 'details' | 'hra-intro' | 'quiz' | 'plan' | 'dest-doctor' | 'dest-labs' | 'dest-nutrition' | 'dest-activity'
  const [activeScreen, setActiveScreen] = useState('overview');

  // Detailed results filter & category state
  const [detailStatusFilter, setDetailStatusFilter] = useState('all');
  const [highlightedParamId, setHighlightedParamId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({
    lipids: true,
    vitamins: true,
    glucose: true,
    physicals: true,
    liver: false,
    kidney: false,
    blood: false,
    thyroid: false,
  });

  // HRA state (persistent throughout session)
  const [hraAnswers, setHraAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Completed demo action IDs
  const [completedActionIds, setCompletedActionIds] = useState([]);

  // Glossary Bottom Sheet state
  const [glossaryState, setGlossaryState] = useState({
    isOpen: false,
    mode: 'contextual',
    selectedTermKey: 'LDL Cholesterol',
  });

  // Score Info Modal
  const [showScoreInfoModal, setShowScoreInfoModal] = useState(false);

  const scrollContainerRef = useRef(null);

  // Active patient profile data
  const basePatient = PATIENT_PROFILES[currentProfileId] || PATIENT_PROFILES.rohan;
  const currentPatient = {
    ...basePatient,
    reportStatus,
  };
  const currentCategories =
    currentProfileId === 'priya' ? BIOMARKER_CATEGORIES_OPTIMAL : BIOMARKER_CATEGORIES;

  // Scroll to top when switching internal report screens
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeScreen, activeAppTab, homeSubScreen]);

  // Glossary handlers
  const openContextualGlossary = (termKey) => {
    setGlossaryState({
      isOpen: true,
      mode: 'contextual',
      selectedTermKey: termKey,
    });
  };

  const openGlobalGlossary = () => {
    setGlossaryState((prev) => ({
      ...prev,
      isOpen: true,
      mode: 'global',
    }));
  };

  const closeGlossary = () => {
    setGlossaryState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleJumpToParameter = (paramId) => {
    closeGlossary();
    setActiveAppTab('health');
    setActiveScreen('details');
    setDetailStatusFilter('all');
    setHighlightedParamId(paramId);

    const targetCategory = currentCategories.find((cat) =>
      cat.parameters.some((p) => p.id === paramId)
    );
    if (targetCategory) {
      setExpandedCategories((prev) => ({
        ...prev,
        [targetCategory.id]: true,
      }));
    }

    setTimeout(() => {
      const el = document.getElementById(`param-${paramId}`);
      if (el && scrollContainerRef.current) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    setTimeout(() => {
      setHighlightedParamId(null);
    }, 2500);
  };

  // Overview status card clicks (Flagged, Borderline, Normal)
  const handleStatusFilterClick = (statusFilter) => {
    setDetailStatusFilter(statusFilter);
    setActiveScreen('details');
  };

  // Category select from category summary
  const handleSelectCategoryFromOverview = (categoryId, statusFilter = 'all') => {
    setDetailStatusFilter(statusFilter);
    if (categoryId) {
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryId]: true,
      }));
    }
    setActiveScreen('details');
  };

  // Priority finding exploration
  const handleExplorePriorityFinding = (finding) => {
    handleJumpToParameter(finding.paramId);
  };

  // HRA logic
  const answeredCount = Object.keys(hraAnswers).length;

  const handleStartOrResumeHra = () => {
    if (quizCompleted) {
      setActiveScreen('plan');
      return;
    }
    if (answeredCount === 0) {
      setActiveScreen('hra-intro');
    } else {
      // Find the first unanswered question
      const firstUnansweredIndex = HRA_QUESTIONS.findIndex(
        (q) => !hraAnswers[q.id]
      );
      setCurrentQuestionIndex(firstUnansweredIndex >= 0 ? firstUnansweredIndex : 0);
      setActiveScreen('quiz');
    }
  };

  const handleBeginQuestions = () => {
    setCurrentQuestionIndex(0);
    setActiveScreen('quiz');
  };

  const handleSelectHraOption = (questionId, optionId) => {
    setHraAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    // Subtle auto-advance for questions 1 to 4
    if (currentQuestionIndex < HRA_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 250);
    }
  };

  const handleSubmitHraQuiz = () => {
    // Validate that all 5 questions are answered
    const unanswered = HRA_QUESTIONS.filter((q) => !hraAnswers[q.id]);
    if (unanswered.length > 0) {
      alert(`Please answer Question ${unanswered[0].number} before submitting.`);
      const idx = HRA_QUESTIONS.findIndex((q) => q.id === unanswered[0].id);
      setCurrentQuestionIndex(idx >= 0 ? idx : 0);
      return;
    }
    setQuizCompleted(true);
    setActiveScreen('plan');
  };

  // Action execution triggers
  const handleTriggerAction = (action) => {
    if (action.destinationId === 'doctor') {
      setActiveScreen('dest-doctor');
    } else if (action.destinationId === 'labs') {
      setActiveScreen('dest-labs');
    } else if (action.destinationId === 'nutrition') {
      setActiveScreen('dest-nutrition');
    } else if (action.destinationId === 'activity') {
      setActiveScreen('dest-activity');
    } else {
      setActiveScreen('plan');
    }
  };

  const handleCompleteAction = (actionId) => {
    if (!completedActionIds.includes(actionId)) {
      setCompletedActionIds((prev) => [...prev, actionId]);
    }
  };

  // Navigation back handler
  const handleBackNavigation = () => {
    if (activeScreen === 'benchmarks') setActiveScreen('overview');
    else if (activeScreen === 'details') setActiveScreen('overview');
    else if (activeScreen === 'hra-intro') setActiveScreen('overview');
    else if (activeScreen === 'quiz') setActiveScreen('overview');
    else if (activeScreen === 'plan') setActiveScreen('overview');
    else if (activeScreen.startsWith('dest-')) setActiveScreen('plan');
  };

  // Screen meta mapping for internal report navigation
  const screenMeta = {
    overview: { title: 'Intelligent Health Report', step: 1, showBack: false },
    benchmarks: { title: 'Benchmarks & Trends', step: 1, showBack: true },
    details: { title: 'Detailed Test Results', step: 2, showBack: true },
    'hra-intro': { title: 'Health Risk Assessment', step: 3, showBack: true },
    quiz: { title: 'Health Risk Assessment', step: 3, showBack: true },
    plan: { title: 'Risk & Action Plan', step: 4, showBack: true },
    'dest-doctor': { title: 'Book Doctor Review', step: 4, showBack: true },
    'dest-labs': { title: 'Schedule Follow-Up Tests', step: 4, showBack: true },
    'dest-nutrition': { title: 'Personalised Nutrition', step: 4, showBack: true },
    'dest-activity': { title: 'Activity & Step Goal', step: 4, showBack: true },
  };

  const currentMeta = screenMeta[activeScreen] || screenMeta.overview;

  const quickJumpPills = [
    { id: 'overview', label: '1. Overview' },
    { id: 'benchmarks', label: '1A. Benchmarks' },
    { id: 'details', label: '2. Details' },
    { id: 'quiz', label: '3. HRA Quiz' },
    { id: 'plan', label: '4. Risk & Plan' },
  ];

  const steps = [
    { num: 1, label: 'Overview', screen: 'overview' },
    { num: 2, label: 'Details', screen: 'details' },
    { num: 3, label: 'Quiz', screen: 'quiz' },
    { num: 4, label: 'Plan', screen: 'plan' },
  ];

  // Detailed categories filter
  const filteredCategories = currentCategories
    .map((cat) => {
      const matchingParams =
        detailStatusFilter === 'all'
          ? cat.parameters
          : cat.parameters.filter((p) => p.status === detailStatusFilter);
      return {
        ...cat,
        matchingParams,
      };
    })
    .filter((cat) => cat.matchingParams.length > 0);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] flex flex-col font-sans antialiased">
      {/* ====================================================================
          TOP APPLICATION WORKSPACE HEADER
          ==================================================================== */}
      <header className="bg-white border-b border-[#E2E8F0] px-4 py-3 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
              EHC
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                  HealthyEHC — Intelligent User Health Report
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1]">
                  Annual Health Check 2026
                </span>
              </div>
              <p className="text-xs text-[#475569]">
                Employer-Sponsored Health Intelligence & Personalised Care Action Plan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* 5 Scenario Selector (PRD Section 6) */}
            <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#CBD5E1] p-1 rounded-xl text-xs">
              <span className="text-[10px] font-bold text-[#64748B] px-1 hidden lg:inline">Scenario:</span>
              <select
                value={currentScenario}
                onChange={(e) => handleApplyScenario(e.target.value)}
                className="bg-white border border-[#CBD5E1] rounded-lg px-2 py-1 text-xs font-bold text-[#0F172A] cursor-pointer"
              >
                <option value="scenario-1">Scenario 1: Report Ready + HRA Incomplete (Rohan)</option>
                <option value="scenario-2">Scenario 2: Report Ready + HRA Complete (Rohan)</option>
                <option value="scenario-3">Scenario 3: Report Pending in Lab</option>
                <option value="scenario-4">Scenario 4: Priority Findings (Rohan LDL)</option>
                <option value="scenario-5">Scenario 5: Optimal Health (Priya 92/100)</option>
              </select>
            </div>

            {/* Live Analytics Drawer Toggle (PRD Section 10) */}
            <button
              type="button"
              onClick={() => setShowAnalyticsDrawer(!showAnalyticsDrawer)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                showAnalyticsDrawer
                  ? 'bg-[#0F766E] text-white border-[#0F766E]'
                  : 'bg-white text-[#475569] border-[#CBD5E1] hover:border-[#0F766E]'
              }`}
              title="Inspect Live Analytics Events (Section 10)"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#CCFBF1] text-[#0F766E] font-black">
                {analyticsEvents.length}
              </span>
            </button>

            {/* Demo Profile Toggle (Journey A vs Journey D) */}
            <div className="inline-flex p-0.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs">
              <button
                type="button"
                onClick={() => {
                  setCurrentProfileId('rohan');
                  logAnalyticsEvent('profile_switched', { profile: 'rohan' });
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentProfileId === 'rohan'
                    ? 'bg-[#0F766E] text-white shadow-2xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
                title="Rohan: 3 Flagged, 5 Borderline (Clinical Review)"
              >
                Profile A (Rohan)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentProfileId('priya');
                  logAnalyticsEvent('profile_switched', { profile: 'priya' });
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentProfileId === 'priya'
                    ? 'bg-[#0F766E] text-white shadow-2xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
                title="Priya: All 50 Normal (Preventive Care)"
              >
                Profile B (Priya)
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setViewMode('prototype')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'prototype'
                    ? 'bg-white text-[#0F766E] shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile App
              </button>
              <button
                type="button"
                onClick={() => setViewMode('components')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'components'
                    ? 'bg-white text-[#0F766E] shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Components
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          MODE 1: INTERACTIVE MOBILE PROTOTYPE (390PX VIEWPORT)
          ==================================================================== */}
      {viewMode === 'prototype' ? (
        <main className="flex-1 flex flex-col items-center py-4 px-2">
          {/* Quick Screen Switcher for Testing (outside frame) */}
          <div className="w-full max-w-[520px] mb-3">
            <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs">
              <span className="text-[11px] font-semibold text-[#64748B] mr-1">App View:</span>
              <button
                type="button"
                onClick={() => handleSelectAppTab('home')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeAppTab === 'home' && homeSubScreen === 'root'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0F766E]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAppTab('home');
                  setHomeSubScreen('activity');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeAppTab === 'home' && homeSubScreen === 'activity'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0F766E]'
                }`}
              >
                Activity Details
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelectAppTab('health');
                  setActiveScreen('overview');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeAppTab === 'health' && activeScreen === 'overview'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0F766E]'
                }`}
              >
                Health Report
              </button>
              <button
                type="button"
                onClick={() => handleSelectAppTab('services')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeAppTab === 'services'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0F766E]'
                }`}
              >
                Services & Benefits
              </button>
              <button
                type="button"
                onClick={() => handleSelectAppTab('profile')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeAppTab === 'profile'
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0F766E]'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* Centered Mobile Device Frame (390px x 820px) */}
          <div className="w-full max-w-[390px] h-[820px] bg-[#F8FAFC] rounded-[42px] border-[8px] border-[#1E293B] shadow-2xl overflow-hidden flex flex-col relative">
            {/* iOS Dynamic Island Status Bar */}
            <div className="bg-white px-6 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-bold text-[#0F172A] flex-shrink-0 select-none">
              <span>9:41</span>
              <div className="w-20 h-4 bg-[#1E293B] rounded-full" />
              <div className="flex items-center gap-1.5">
                <span>5G</span>
                <span className="px-1 py-[1px] border border-[#0F172A] rounded text-[9px]">
                  100%
                </span>
              </div>
            </div>

            {/* Health Report Top Chrome (visible when on 'health' tab) */}
            {activeAppTab === 'health' && (
              <div className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex-shrink-0 z-20">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {currentMeta.showBack && (
                      <button
                        type="button"
                        onClick={handleBackNavigation}
                        className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F1F5F9] flex-shrink-0 cursor-pointer"
                        aria-label="Go back"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    )}
                    <h2 className="text-sm font-extrabold text-[#0F172A] truncate">
                      {currentMeta.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={openGlobalGlossary}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#CCFBF1]/60 hover:bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4] text-xs font-bold flex-shrink-0 transition cursor-pointer"
                  >
                    <span className="text-[11px] font-extrabold">Aa</span>
                    <span>Glossary</span>
                  </button>
                </div>

                {/* Patient Context Summary in Header */}
                {activeScreen === 'overview' && (
                  <div className="mt-2 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#475569]">
                    <span className="font-semibold text-[#0F172A]">
                      {currentPatient.name}{' '}
                      <span className="font-normal text-[#64748B]">
                        ({currentPatient.relation})
                      </span>
                    </span>
                    <span className="text-[10px] text-[#64748B]">
                      Checked {currentPatient.annualCheckDate} • Metropolis
                    </span>
                  </div>
                )}

                {/* 4-Step Internal Report Progress Bar */}
                <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] grid grid-cols-4 gap-1">
                  {steps.map((s) => {
                    const isCurrent = currentMeta.step === s.num;
                    const isCompleted =
                      s.num === 1 || (s.num === 2) || (s.num === 3 && quizCompleted) || (s.num === 4 && quizCompleted);
                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                          if (s.screen === 'quiz') handleStartOrResumeHra();
                          else if (s.screen === 'plan') {
                            if (quizCompleted) setActiveScreen('plan');
                            else setActiveScreen('plan'); // shows informative locked state
                          } else {
                            setActiveScreen(s.screen);
                          }
                        }}
                        className={`py-1 px-1 rounded-lg text-[10px] font-bold text-center transition cursor-pointer ${
                          isCurrent
                            ? 'bg-[#0F766E] text-white shadow-2xs'
                            : isCompleted
                            ? 'bg-[#CCFBF1]/70 text-[#0F766E]'
                            : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A]'
                        }`}
                      >
                        {s.num} {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* App Screen Headers for Services and Profile */}
            {(activeAppTab === 'services' || activeAppTab === 'profile') && (
              <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex-shrink-0 z-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs">
                    EHC
                  </div>
                  <h2 className="text-sm font-extrabold text-[#0F172A] capitalize">
                    HealthyEHC {activeAppTab}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectAppTab('health')}
                  className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
                >
                  Health Report →
                </button>
              </div>
            )}

            {/* Scrollable Viewport Body */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4 scroll-smooth pb-24"
            >
              {/* ============================================================
                  TAB 1: HOME DASHBOARD SCREEN (SECTIONS A TO G)
                  ============================================================ */}
              {activeAppTab === 'home' && homeSubScreen === 'root' && (
                <HomeScreen
                  patient={currentPatient}
                  reportStatus={reportStatus}
                  quizCompleted={quizCompleted}
                  hraAnsweredCount={answeredCount}
                  onOpenHealthReport={() => {
                    logAnalyticsEvent('health_report_opened', { from: 'snapshot_card' });
                    setActiveAppTab('health');
                    setActiveScreen('overview');
                  }}
                  onStartOrResumeHra={() => {
                    logAnalyticsEvent('hra_cta_clicked', { source: 'next_health_action' });
                    setActiveAppTab('health');
                    handleStartOrResumeHra();
                  }}
                  onOpenActivityDetail={() => {
                    logAnalyticsEvent('daily_activity_card_clicked', { steps: currentPatient.dailyMovement?.steps });
                    setHomeSubScreen('activity');
                  }}
                  onNavigateToService={(serviceId) => {
                    if (serviceId === 'benefits') {
                      logAnalyticsEvent('employee_benefits_clicked');
                      setActiveAppTab('services');
                    } else {
                      logAnalyticsEvent('quick_service_clicked', { service: serviceId });
                      setHomeSubScreen(serviceId);
                    }
                  }}
                  onOpenNotifications={() => {
                    logAnalyticsEvent('notifications_viewed');
                    setShowNotificationsModal(true);
                  }}
                  onOpenProfile={() => {
                    handleSelectAppTab('profile');
                  }}
                  onTrackAnalytics={logAnalyticsEvent}
                />
              )}

              {activeAppTab === 'home' && homeSubScreen === 'activity' && (
                <ActivityDetailScreen
                  patient={currentPatient}
                  onBack={() => setHomeSubScreen('root')}
                  onTrackAnalytics={logAnalyticsEvent}
                />
              )}

              {activeAppTab === 'home' && homeSubScreen === 'doctor' && (
                <DoctorConsultationScreen
                  onBack={() => setHomeSubScreen('root')}
                  onComplete={() => {
                    handleCompleteAction('act-1');
                    setHomeSubScreen('root');
                  }}
                />
              )}

              {activeAppTab === 'home' && homeSubScreen === 'labs' && (
                <LabTestsScreen
                  onBack={() => setHomeSubScreen('root')}
                  onComplete={() => {
                    handleCompleteAction('act-2');
                    setHomeSubScreen('root');
                  }}
                />
              )}

              {activeAppTab === 'home' && homeSubScreen === 'nutrition' && (
                <NutritionGuidanceScreen
                  onBack={() => setHomeSubScreen('root')}
                  onComplete={() => {
                    handleCompleteAction('act-3');
                    setHomeSubScreen('root');
                  }}
                />
              )}

              {/* ============================================================
                  TAB 3: SERVICES & BENEFITS SCREEN
                  ============================================================ */}
              {activeAppTab === 'services' && (
                <ServicesScreen
                  onNavigateToService={(serviceId) => {
                    logAnalyticsEvent('quick_service_clicked', { service: serviceId, source: 'services_tab' });
                    if (serviceId === 'doctor') {
                      setActiveAppTab('home');
                      setHomeSubScreen('doctor');
                    } else if (serviceId === 'labs') {
                      setActiveAppTab('home');
                      setHomeSubScreen('labs');
                    } else if (serviceId === 'nutrition') {
                      setActiveAppTab('home');
                      setHomeSubScreen('nutrition');
                    } else if (serviceId === 'challenges') {
                      setActiveAppTab('home');
                      setHomeSubScreen('activity');
                    } else {
                      setActiveAppTab('health');
                      setActiveScreen('overview');
                    }
                  }}
                />
              )}

              {/* ============================================================
                  TAB 4: PROFILE SCREEN WITH DEMO SCENARIO SWITCHER
                  ============================================================ */}
              {activeAppTab === 'profile' && (
                <ProfileScreen
                  patient={currentPatient}
                  currentProfileId={currentProfileId}
                  onSwitchProfile={(id) => {
                    setCurrentProfileId(id);
                    logAnalyticsEvent('profile_switched', { profile: id });
                  }}
                  reportStatus={reportStatus}
                  onSetReportStatus={(status) => {
                    setReportStatus(status);
                    logAnalyticsEvent('report_status_changed', { status });
                  }}
                  quizCompleted={quizCompleted}
                  onToggleQuizCompleted={(completed) => setQuizCompleted(completed)}
                />
              )}

              {/* ============================================================
                  TAB 2: HEALTH REPORT EXPERIENCES
                  ============================================================ */}
              {activeAppTab === 'health' && (
                <>
                  {/* ========================================================
                      SCREEN 1: REDESIGNED OVERVIEW SCREEN
                      Exact order specified in PRD Section 4:
                      1. Header & Patient context
                      2. Overall Health Score
                      3. Health results at a glance (Flagged → Borderline → Normal)
                      4. Priority findings ("Areas to pay attention to")
                      5. Contextual health recommendation banner
                      6. Health Risk Assessment completion card
                      7. Secondary report navigation
                      ======================================================== */}
                  {activeScreen === 'overview' && (
                    <>
                      {/* Section 1: Report Header & Patient Context */}
                      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E]">
                              Corporate Annual Health Check
                            </span>
                            <h3 className="text-sm font-extrabold text-[#0F172A]">
                              Intelligent User Health Report
                            </h3>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                            Verified NABL
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#F1F5F9]">
                          <div>
                            <span className="text-[#64748B]">Employee: </span>
                            <span className="font-semibold text-[#0F172A]">{currentPatient.name}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B]">Relation: </span>
                            <span className="font-semibold text-[#0F172A]">{currentPatient.relation}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B]">Checkup Date: </span>
                            <span className="font-semibold text-[#0F172A]">{currentPatient.annualCheckDate}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B]">Lab Partner: </span>
                            <span className="font-semibold text-[#0F172A]">{currentPatient.labPartner}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Overall Health Score */}
                      <HealthScoreCard
                        score={currentPatient.overallScore}
                        tier={currentPatient.scoreTier}
                        totalParameters={currentPatient.totalParameters}
                        previousScore={currentPatient.previousScore}
                        interpretation={currentPatient.interpretation}
                        counts={currentPatient.counts}
                        onOpenInfo={() => setShowScoreInfoModal(true)}
                      />

                      {/* Section 3: Health Results At a Glance (Flagged → Borderline → Normal) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#475569]">
                            Health Results At a Glance
                          </span>
                          <span className="text-[10px] text-[#64748B]">
                            Tap any card to filter details
                          </span>
                        </div>

                        {/* 3 Prominent Horizontally Aligned Cards */}
                        <div className="grid grid-cols-3 gap-2">
                          {/* 1. FLAGGED (FIRST) */}
                          <button
                            type="button"
                            onClick={() => handleStatusFilterClick('flagged')}
                            className="p-3 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] hover:border-[#DC2626] transition text-center shadow-2xs cursor-pointer group"
                          >
                            <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#DC2626] block">
                              Flagged
                            </span>
                            <span className="text-2xl font-extrabold text-[#DC2626] block my-0.5">
                              {currentPatient.counts.flagged}
                            </span>
                            <span className="text-[10px] text-[#991B1B] font-medium group-hover:underline">
                              Needs focus →
                            </span>
                          </button>

                          {/* 2. BORDERLINE (SECOND) */}
                          <button
                            type="button"
                            onClick={() => handleStatusFilterClick('borderline')}
                            className="p-3 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] hover:border-[#B45309] transition text-center shadow-2xs cursor-pointer group"
                          >
                            <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#B45309] block">
                              Borderline
                            </span>
                            <span className="text-2xl font-extrabold text-[#B45309] block my-0.5">
                              {currentPatient.counts.borderline}
                            </span>
                            <span className="text-[10px] text-[#92400E] font-medium group-hover:underline">
                              Monitor →
                            </span>
                          </button>

                          {/* 3. NORMAL (THIRD) */}
                          <button
                            type="button"
                            onClick={() => handleStatusFilterClick('normal')}
                            className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] hover:border-[#059669] transition text-center shadow-2xs cursor-pointer group"
                          >
                            <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#059669] block">
                              Normal
                            </span>
                            <span className="text-2xl font-extrabold text-[#059669] block my-0.5">
                              {currentPatient.counts.normal}
                            </span>
                            <span className="text-[10px] text-[#065F46] font-medium group-hover:underline">
                              Healthy →
                            </span>
                          </button>
                        </div>

                        {/* Horizontal Distribution Bar directly underneath */}
                        <div className="bg-white rounded-xl border border-[#E2E8F0] p-2.5">
                          <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-1.5">
                            <span>Test Distribution ({currentPatient.totalParameters} total)</span>
                            <span>
                              {Math.round((currentPatient.counts.normal / currentPatient.totalParameters) * 100)}% Optimal
                            </span>
                          </div>
                          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-[#F1F5F9]">
                            {currentPatient.counts.flagged > 0 && (
                              <div
                                style={{
                                  width: `${(currentPatient.counts.flagged / currentPatient.totalParameters) * 100}%`,
                                }}
                                className="bg-[#DC2626] rounded-l-full"
                                title={`${currentPatient.counts.flagged} Flagged`}
                              />
                            )}
                            {currentPatient.counts.borderline > 0 && (
                              <div
                                style={{
                                  width: `${(currentPatient.counts.borderline / currentPatient.totalParameters) * 100}%`,
                                }}
                                className="bg-[#D97706]"
                                title={`${currentPatient.counts.borderline} Borderline`}
                              />
                            )}
                            <div
                              style={{
                                width: `${(currentPatient.counts.normal / currentPatient.totalParameters) * 100}%`,
                              }}
                              className="bg-[#059669] rounded-r-full"
                              title={`${currentPatient.counts.normal} Normal`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Priority Findings ("Areas to pay attention to") */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-[#475569]">
                              Areas to Pay Attention To
                            </span>
                            {currentPatient.priorityFindings.length > 0 && (
                              <span className="px-1.5 py-0.2 rounded-md bg-[#FEF2F2] text-[#DC2626] text-[10px] font-extrabold border border-[#FECACA]">
                                {currentPatient.priorityFindings.length}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setDetailStatusFilter('all');
                              setActiveScreen('details');
                            }}
                            className="text-xs font-semibold text-[#0F766E] hover:underline cursor-pointer"
                          >
                            Explore all 50 →
                          </button>
                        </div>

                        {currentPatient.priorityFindings.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-[#A7F3D0] p-4 text-center space-y-1.5">
                            <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h4 className="text-xs font-bold text-[#065F46]">
                              No Flagged or Borderline Markers
                            </h4>
                            <p className="text-[11px] text-[#047857]">
                              All 50 parameters are within standard reference ranges. Great job maintaining health!
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {currentPatient.priorityFindings.map((finding) => (
                              <div
                                key={finding.id}
                                onClick={() => handleExplorePriorityFinding(finding)}
                                className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs hover:border-[#0F766E] transition cursor-pointer space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {finding.status === 'flagged' ? (
                                      <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />
                                    ) : (
                                      <AlertTriangle className="w-4 h-4 text-[#B45309] flex-shrink-0" />
                                    )}
                                    <span className="text-xs font-bold text-[#0F172A]">
                                      {finding.name}
                                    </span>
                                  </div>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                                      finding.status === 'flagged'
                                        ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                                        : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                                    }`}
                                  >
                                    {finding.value} {finding.unit}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#475569] leading-relaxed">
                                  {finding.explanation}
                                </p>
                                <div className="pt-1 flex items-center justify-between text-[11px]">
                                  <span className="text-[#64748B] text-[10px]">
                                    Category: {finding.categoryId}
                                  </span>
                                  <span className="font-bold text-[#0F766E] hover:underline flex items-center gap-0.5">
                                    Explore parameter <ChevronRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Section 5: Contextual Health Recommendation Banner */}
                      <div
                        className={`rounded-2xl border p-4 shadow-xs space-y-2.5 ${
                          currentPatient.recommendationType === 'clinical_review'
                            ? 'bg-[#FEF3C7]/40 border-[#FDE68A]'
                            : 'bg-[#ECFDF5] border-[#A7F3D0]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              currentPatient.recommendationType === 'clinical_review'
                                ? 'bg-[#FDE68A] text-[#92400E]'
                                : 'bg-[#CCFBF1] text-[#059669]'
                            }`}
                          >
                            <Stethoscope className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#475569]">
                              Recommended Next Step
                            </span>
                            <h4 className="text-xs font-bold text-[#0F172A]">
                              {currentPatient.recommendationTitle}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs text-[#475569] leading-relaxed">
                          {currentPatient.recommendationText}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            if (currentPatient.recommendationType === 'clinical_review') {
                              setActiveScreen('dest-doctor');
                            } else {
                              setActiveScreen('dest-nutrition');
                            }
                          }}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                            currentPatient.recommendationType === 'clinical_review'
                              ? 'bg-[#0F766E] hover:bg-[#0D9488] text-white'
                              : 'bg-[#059669] hover:bg-[#047857] text-white'
                          }`}
                        >
                          {currentPatient.recommendationCta} →
                        </button>
                      </div>

                      {/* Section 6: Health Risk Assessment Completion Card */}
                      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
                              <Sparkles className="w-4 h-4" />
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-[#0F172A]">
                                Health Risk Assessment (HRA)
                              </h4>
                              <span className="text-[10px] text-[#64748B]">
                                5 short questions • ~1 minute
                              </span>
                            </div>
                          </div>

                          {quizCompleted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                              Completed ✓
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                              {answeredCount}/5 Answered
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#475569] leading-relaxed">
                          {quizCompleted
                            ? 'Your responses have been processed to compute your cardiovascular, hypertension, and diabetes risk probabilities.'
                            : 'Answer 5 short lifestyle & family history questions to personalise your health risk assessment and action plan.'}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0F766E] rounded-full transition-all duration-300"
                            style={{
                              width: quizCompleted ? '100%' : `${(answeredCount / 5) * 100}%`,
                            }}
                          />
                        </div>

                        {quizCompleted ? (
                          <button
                            type="button"
                            onClick={() => setActiveScreen('plan')}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            View Your Risk Profile & Action Plan →
                          </button>
                        ) : answeredCount > 0 ? (
                          <button
                            type="button"
                            onClick={handleStartOrResumeHra}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            Continue Assessment ({answeredCount} of 5 completed) →
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleStartOrResumeHra}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            Start Assessment (Earn +50 Coins) →
                          </button>
                        )}
                      </div>

                      {/* Section 7: Secondary Report Navigation */}
                      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 divide-y divide-[#F1F5F9] shadow-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setDetailStatusFilter('all');
                            setActiveScreen('details');
                          }}
                          className="w-full py-2.5 px-1 flex items-center justify-between text-xs font-semibold text-[#0F172A] hover:text-[#0F766E] transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0F766E]" />
                            <span>View All 50 Detailed Test Results</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveScreen('benchmarks')}
                          className="w-full py-2.5 px-1 flex items-center justify-between text-xs font-semibold text-[#0F172A] hover:text-[#0F766E] transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#0F766E]" />
                            <span>Compare with Last Year & Platform Peers</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        </button>

                        <button
                          type="button"
                          onClick={openGlobalGlossary}
                          className="w-full py-2.5 px-1 flex items-center justify-between text-xs font-semibold text-[#0F172A] hover:text-[#0F766E] transition cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#0F766E]" />
                            <span>Explore Clinical Health Glossary (A–Z)</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        </button>
                      </div>
                    </>
                  )}

                  {/* ========================================================
                      SCREEN 1A: BENCHMARKS & TRENDS
                      ======================================================== */}
                  {activeScreen === 'benchmarks' && (
                    <ComparisonCharts
                      variant="full"
                      onOpenGlossary={openContextualGlossary}
                      onStartHra={handleStartOrResumeHra}
                      isHraComplete={quizCompleted}
                    />
                  )}

                  {/* ========================================================
                      SCREEN 2: DETAILED TEST RESULTS
                      ======================================================== */}
                  {activeScreen === 'details' && (
                    <>
                      {/* Contextual HRA Reminder in Detailed Results if Incomplete */}
                      {!quizCompleted && (
                        <div className="rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] p-3 flex items-center justify-between gap-3 shadow-2xs">
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-[#065F46] block">
                              Personalise your risk profile
                            </span>
                            <span className="text-[11px] text-[#047857]">
                              Your test results are available. Complete 5 short questions to generate your risk forecast.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleStartOrResumeHra}
                            className="px-3 py-1.5 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#0D9488] transition cursor-pointer flex-shrink-0"
                          >
                            Complete HRA →
                          </button>
                        </div>
                      )}

                      {/* Sticky Filter Tabs */}
                      <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-[#F8FAFC]/95 backdrop-blur-xs border-b border-[#E2E8F0]">
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: 'all', label: `All ${currentPatient.totalParameters}` },
                            { id: 'flagged', label: `Flagged ${currentPatient.counts.flagged}` },
                            { id: 'borderline', label: `Border ${currentPatient.counts.borderline}` },
                            { id: 'normal', label: `Norm ${currentPatient.counts.normal}` },
                          ].map((tab) => {
                            const active = detailStatusFilter === tab.id;
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setDetailStatusFilter(tab.id)}
                                className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                                  active
                                    ? 'bg-[#0F766E] text-white shadow-2xs'
                                    : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#0D9488]'
                                }`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Categorized Test Accordions */}
                      <div className="space-y-3">
                        {filteredCategories.map((cat) => {
                          const isExpanded =
                            detailStatusFilter !== 'all' || !!expandedCategories[cat.id];

                          return (
                            <div
                              key={cat.id}
                              className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-xs"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedCategories((prev) => ({
                                    ...prev,
                                    [cat.id]: !prev[cat.id],
                                  }))
                                }
                                className="w-full px-3.5 py-3 flex items-center justify-between text-left bg-white hover:bg-[#F8FAFC] transition cursor-pointer"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                                  )}
                                  <span className="text-xs font-extrabold text-[#0F172A] truncate">
                                    {cat.name} ({cat.matchingParams.length})
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {cat.flaggedCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
                                      {cat.flaggedCount} Flagged
                                    </span>
                                  )}
                                  {cat.flaggedCount === 0 && cat.borderlineCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                                      {cat.borderlineCount} Borderline
                                    </span>
                                  )}
                                  {cat.flaggedCount === 0 && cat.borderlineCount === 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                                      All Normal
                                    </span>
                                  )}
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="p-3 pt-1 space-y-2.5 bg-[#F8FAFC]/70 border-t border-[#F1F5F9]">
                                  {cat.matchingParams.map((param) => (
                                    <TestParameterCard
                                      key={param.id}
                                      parameter={param}
                                      onOpenGlossary={openContextualGlossary}
                                      isHighlighted={highlightedParamId === param.id}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* ========================================================
                      SCREEN 3A: HRA INTRODUCTION SCREEN
                      ======================================================== */}
                  {activeScreen === 'hra-intro' && (
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 animate-fadeIn">
                      <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold text-base">
                        <Sparkles className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                          Step 3 • Lifestyle Assessment
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F172A]">
                          Let's understand your health risks
                        </h3>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          Your lab results tell us about your current biological markers. A few additional questions about your lifestyle and family history help compute personalised risk probabilities.
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
                          <Clock className="w-4 h-4 text-[#0F766E]" />
                          <span>5 questions • Approximately 1 minute</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
                          <Award className="w-4 h-4 text-[#B45309]" />
                          <span>Earn +50 Healthy Coins towards consultations</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#0F172A] font-semibold">
                          <ShieldCheck className="w-4 h-4 text-[#059669]" />
                          <span>Confidential • Never shared without consent</span>
                        </div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          type="button"
                          onClick={handleBeginQuestions}
                          className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
                        >
                          Start Assessment →
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveScreen('overview')}
                          className="w-full py-2 text-center text-xs font-semibold text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                        >
                          Skip for now & return to report
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================
                      SCREEN 3B: HRA QUESTION FLOW
                      ======================================================== */}
                  {activeScreen === 'quiz' && (
                    <AssessmentQuestionCard
                      questionData={HRA_QUESTIONS[currentQuestionIndex]}
                      totalQuestions={HRA_QUESTIONS.length}
                      selectedOptionId={hraAnswers[HRA_QUESTIONS[currentQuestionIndex].id]}
                      onSelectOption={handleSelectHraOption}
                      onPrev={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      onNext={() =>
                        setCurrentQuestionIndex((prev) =>
                          Math.min(HRA_QUESTIONS.length - 1, prev + 1)
                        )
                      }
                      onSubmitQuiz={handleSubmitHraQuiz}
                      onSaveAndExit={() => setActiveScreen('overview')}
                      onOpenGlossary={openContextualGlossary}
                    />
                  )}

                  {/* ========================================================
                      SCREEN 4: RISK PROBABILITY & PERSONALISED ACTION PLAN
                      ======================================================== */}
                  {activeScreen === 'plan' && (
                    <>
                      {!quizCompleted ? (
                        /* INFORMATIVE LOCKED STATE IF USER SKIPPED HRA */
                        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 text-center space-y-3.5 shadow-xs">
                          <div className="w-12 h-12 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] flex items-center justify-center mx-auto">
                            <Lock className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309]">
                              Assessment Required
                            </span>
                            <h3 className="text-base font-extrabold text-[#0F172A] mt-1">
                              Unlock Your Personalised Risk Profile
                            </h3>
                            <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                              Cardiovascular, diabetes, and hypertension probabilities require your 5 lifestyle and family history answers to calculate accurately alongside lab parameters.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleStartOrResumeHra}
                            className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
                          >
                            Complete 1-Minute Assessment Now →
                          </button>
                        </div>
                      ) : (
                        /* UNLOCKED RISK PROFILE & ACTION PLAN */
                        <>
                          <div className="rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] p-3 flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center flex-shrink-0">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="text-xs">
                              <span className="font-bold text-[#065F46]">
                                Health Risk Assessment Submitted!
                              </span>
                              <p className="text-[11px] text-[#047857]">
                                Risk probabilities and 4-part action recommendations unlocked below.
                              </p>
                            </div>
                          </div>

                          {/* Section A: Top 3 Risk Probabilities */}
                          <div className="space-y-2.5">
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-extrabold tracking-wider uppercase text-[#475569]">
                                  Your Top 3 Risk Probabilities
                                </h3>
                                <span className="text-[10px] text-[#64748B] italic">
                                  Illustrative prototype
                                </span>
                              </div>
                              <p className="text-[11px] text-[#64748B]">
                                Synthesized from Lab Parameters + Lifestyle HRA
                              </p>
                            </div>

                            {RISK_PROBABILITIES.map((risk) => (
                              <RiskProbabilityCard
                                key={risk.id}
                                risk={risk}
                                onOpenGlossary={openContextualGlossary}
                              />
                            ))}

                            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] text-[#64748B] leading-relaxed">
                              *Disclaimer: Displayed risk percentages are illustrative prototype simulations based on clinical risk algorithms. They do not constitute formal medical diagnoses or predictive guarantees.
                            </div>
                          </div>

                          {/* Section B: Personalised 4-Part Action Plan */}
                          <div className="space-y-2.5 pt-1">
                            <div>
                              <h3 className="text-[11px] font-extrabold tracking-wider uppercase text-[#475569]">
                                Personalised 4-Part Action Plan
                              </h3>
                              <p className="text-[11px] text-[#64748B]">
                                Evidence-based recommendations tailored to your lab and lifestyle findings
                              </p>
                            </div>

                            {ACTION_PLAN_ITEMS.map((item) => (
                              <ActionPlanRecommendationCard
                                key={item.id}
                                item={item}
                                completedActionIds={completedActionIds}
                                onTriggerAction={handleTriggerAction}
                                onOpenGlossary={openContextualGlossary}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* ========================================================
                      ACTION DESTINATIONS (SCREENS 5A, 5B, 5C, 5D)
                      ======================================================== */}
                  {activeScreen === 'dest-doctor' && (
                    <DoctorConsultationScreen
                      onBack={() => setActiveScreen('plan')}
                      onCompleteAction={handleCompleteAction}
                      isCompleted={completedActionIds.includes('video-consult')}
                    />
                  )}

                  {activeScreen === 'dest-labs' && (
                    <LabTestsScreen
                      onBack={() => setActiveScreen('plan')}
                      onCompleteAction={handleCompleteAction}
                      isCompleted={completedActionIds.includes('lab-followup')}
                    />
                  )}

                  {activeScreen === 'dest-nutrition' && (
                    <NutritionGuidanceScreen
                      onBack={() => setActiveScreen('plan')}
                      onCompleteAction={handleCompleteAction}
                      isCompleted={completedActionIds.includes('diet-guide')}
                    />
                  )}

                  {activeScreen === 'dest-activity' && (
                    <PhysicalActivityScreen
                      onBack={() => setActiveScreen('plan')}
                      onCompleteAction={handleCompleteAction}
                      isCompleted={completedActionIds.includes('step-goal')}
                    />
                  )}
                </>
              )}
            </div>

            {/* Persistent Bottom App Navigation Bar (Home, Health, Services, Profile) */}
            <AppBottomNav
              activeTab={activeAppTab}
              onSelectTab={(tabId) => handleSelectAppTab(tabId)}
            />

            {/* Persistent Notifications Modal (PRD Section A & Section 5) */}
            <NotificationsModal
              isOpen={showNotificationsModal}
              onClose={() => setShowNotificationsModal(false)}
              onNavigateAction={(type) => {
                setShowNotificationsModal(false);
                if (type === 'report') {
                  logAnalyticsEvent('health_report_opened', { from: 'notification' });
                  handleSelectAppTab('health');
                  setActiveScreen('overview');
                } else if (type === 'activity') {
                  logAnalyticsEvent('daily_activity_card_clicked', { from: 'notification' });
                  setActiveAppTab('home');
                  setHomeSubScreen('activity');
                } else if (type === 'hra') {
                  logAnalyticsEvent('hra_cta_clicked', { from: 'notification' });
                  handleSelectAppTab('health');
                  handleStartOrResumeHra();
                }
              }}
            />

            {/* Persistent Glossary Bottom Sheet Overlay */}
            <GlossaryBottomSheet
              isOpen={glossaryState.isOpen}
              mode={glossaryState.mode}
              selectedTermKey={glossaryState.selectedTermKey}
              onSelectTerm={(term) =>
                setGlossaryState({
                  isOpen: true,
                  mode: 'contextual',
                  selectedTermKey: term,
                })
              }
              onClose={closeGlossary}
              onJumpToParameter={handleJumpToParameter}
            />

            {/* Overall Score Info Modal */}
            {showScoreInfoModal && (
              <div
                className="absolute inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
                onClick={() => setShowScoreInfoModal(false)}
              >
                <div
                  className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold">
                      <Info className="w-4 h-4" />
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowScoreInfoModal(false)}
                      className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#475569] flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0F172A]">
                      About Your Health Score
                    </h4>
                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                      The HealthyEHC overall score is an illustrative orientation index (0–100) reflecting how many of your 50 tested parameters fall within target reference limits.
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-2 leading-relaxed bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                      Notice: This score is a wellness benchmark, NOT a clinical diagnosis or medical prediction.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowScoreInfoModal(false)}
                    className="w-full py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#0D9488] transition cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Product Analytics Drawer (PRD Section 10) */}
          {showAnalyticsDrawer && (
            <div className="w-full max-w-[420px] bg-white border border-[#CBD5E1] rounded-2xl p-3.5 shadow-lg space-y-2 mt-3 animate-fadeIn text-xs">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
                <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
                  <Activity className="w-4 h-4 text-[#0F766E]" />
                  <span>Live Product Analytics Event Stream</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAnalyticsDrawer(false)}
                  className="text-[#64748B] hover:text-[#0F172A] cursor-pointer text-xs font-semibold"
                >
                  Close ✕
                </button>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Logging real-time product instrumentation events specified in Section 10:
              </p>
              <div className="max-h-44 overflow-y-auto space-y-1.5 font-mono text-[11px]">
                {analyticsEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E2E8F0]"
                  >
                    <span className="font-bold text-[#0F766E]">{evt.name}</span>
                    <span className="text-[10px] text-[#64748B]">{evt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      ) : (
        /* ====================================================================
           MODE 2: REUSABLE COMPONENT LIBRARY (8 CLINICAL COMPONENTS)
           ==================================================================== */
        <main className="flex-1 max-w-6xl w-full mx-auto py-6 px-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-xs">
            <div>
              <h2 className="text-base font-extrabold text-[#0F172A]">
                HealthyEHC Clinical Design System — 8 Reusable Components
              </h2>
              <p className="text-xs text-[#475569]">
                WCAG AA compliant semantic indicators (Normal Emerald, Borderline Amber, Flagged Crimson) with interactive glossary triggers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('prototype')}
              className="px-3.5 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-bold hover:bg-[#0D9488] transition self-start sm:self-auto cursor-pointer"
            >
              Open Interactive Prototype →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. HealthScoreCard */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  1. HealthScoreCard
                </h3>
                <span className="text-[11px] text-[#64748B]">Radial Gauge + Tier + Interpretation</span>
              </div>
              <HealthScoreCard
                score={74}
                tier="FAIR"
                totalParameters={50}
                previousScore={68}
                interpretation="Solid baseline with 3 markers needing focus"
                onOpenInfo={() => alert('Informative score calculation modal')}
              />
            </section>

            {/* 2. ComparisonCharts */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  2. ComparisonCharts (Compact & Full)
                </h3>
                <span className="text-[11px] text-[#64748B]">YoY Delta + Peer Percentile</span>
              </div>
              <ComparisonCharts
                variant="compact"
                onViewBenchmarks={() => {
                  setActiveScreen('benchmarks');
                  setViewMode('prototype');
                }}
                onOpenGlossary={openContextualGlossary}
              />
            </section>

            {/* 3. HealthCategorySummary */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  3. HealthCategorySummary
                </h3>
                <span className="text-[11px] text-[#64748B]">Exception-First + Collapsible Normal</span>
              </div>
              <HealthCategorySummary
                categories={BIOMARKER_CATEGORIES}
                counts={PATIENT_PROFILE.counts}
                onSelectCategory={(catId, filter) => {
                  handleSelectCategoryFromOverview(catId, filter);
                  setViewMode('prototype');
                }}
                onOpenGlossary={openContextualGlossary}
              />
            </section>

            {/* 4. TestParameterCard */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  4. TestParameterCard (Semantic States)
                </h3>
                <span className="text-[11px] text-[#64748B]">Spectrum Bar + Pin + YoY</span>
              </div>
              <div className="space-y-3">
                <TestParameterCard
                  parameter={BIOMARKER_CATEGORIES[0].parameters[0]} // Flagged LDL
                  onOpenGlossary={openContextualGlossary}
                />
                <TestParameterCard
                  parameter={BIOMARKER_CATEGORIES[2].parameters[0]} // Borderline HbA1c
                  onOpenGlossary={openContextualGlossary}
                />
                <TestParameterCard
                  parameter={BIOMARKER_CATEGORIES[0].parameters[3]} // Normal Triglycerides
                  onOpenGlossary={openContextualGlossary}
                />
              </div>
            </section>

            {/* 5. GlossaryBottomSheet */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  5. GlossaryBottomSheet
                </h3>
                <span className="text-[11px] text-[#64748B]">Contextual & Searchable Dictionary</span>
              </div>
              <GlossaryBottomSheet
                isOpen={true}
                mode="contextual"
                selectedTermKey={glossaryState.selectedTermKey}
                onClose={() => {}}
                isInlinePreview={true}
              />
            </section>

            {/* 6. AssessmentQuestionCard */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  6. AssessmentQuestionCard
                </h3>
                <span className="text-[11px] text-[#64748B]">Single-Tap HRA + Coin Incentive</span>
              </div>
              <AssessmentQuestionCard
                questionData={HRA_QUESTIONS[2]}
                totalQuestions={5}
                selectedOptionId={hraAnswers[HRA_QUESTIONS[2].id] || 'moderate'}
                onSelectOption={(qId, oId) =>
                  setHraAnswers((prev) => ({ ...prev, [qId]: oId }))
                }
                onPrev={() => {}}
                onNext={() => {}}
                onSubmitQuiz={() => {
                  setQuizCompleted(true);
                  setActiveScreen('plan');
                  setViewMode('prototype');
                }}
                onOpenGlossary={openContextualGlossary}
              />
            </section>

            {/* 7. RiskProbabilityCard */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  7. RiskProbabilityCard
                </h3>
                <span className="text-[11px] text-[#64748B]">Ranked % Risk + Causal Driver Chips</span>
              </div>
              <div className="space-y-3">
                {RISK_PROBABILITIES.map((risk) => (
                  <RiskProbabilityCard
                    key={risk.id}
                    risk={risk}
                    onOpenGlossary={openContextualGlossary}
                  />
                ))}
              </div>
            </section>

            {/* 8. ActionPlanRecommendationCard */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  8. ActionPlanRecommendationCard
                </h3>
                <span className="text-[11px] text-[#64748B]">4-Part Pre-Filtered Action Modules</span>
              </div>
              <div className="space-y-3">
                {ACTION_PLAN_ITEMS.map((item) => (
                  <ActionPlanRecommendationCard
                    key={item.id}
                    item={item}
                    completedActionIds={completedActionIds}
                    onTriggerAction={(action) => {
                      handleTriggerAction(action);
                      setViewMode('prototype');
                    }}
                    onOpenGlossary={openContextualGlossary}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
