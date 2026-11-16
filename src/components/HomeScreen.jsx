import React from 'react';
import {
  Sparkles,
  HeartPulse,
  Stethoscope,
  FlaskConical,
  Apple,
  Trophy,
  Footprints,
  Flame,
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Bell,
  User,
  RefreshCw,
  Compass
} from 'lucide-react';

export function HomeScreen({
  patient,
  reportStatus = 'ready', // 'ready' | 'pending' | 'not_completed' | 'viewed'
  quizCompleted = false,
  hraAnsweredCount = 0,
  onOpenHealthReport,
  onStartOrResumeHra,
  onOpenActivityDetail,
  onNavigateToService,
  onOpenNotifications,
  onOpenProfile,
  onTrackAnalytics,
}) {
  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = patient?.name?.split(' ')[0] || 'Employee';
  const movement = patient?.dailyMovement || {
    steps: 5420,
    goal: 8500,
    activeCalories: 284,
  };

  // Dynamic step percentage calculation
  const stepPercentage = Math.min(
    100,
    Math.round((movement.steps / movement.goal) * 100)
  );
  const remainingSteps = Math.max(0, movement.goal - movement.steps);

  const hasFlagged = (patient?.counts?.flagged || 0) > 0;

  const handleActionClick = (actionName, callback) => {
    if (onTrackAnalytics) {
      onTrackAnalytics('quick_service_clicked', { service: actionName });
    }
    if (callback) callback();
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* ====================================================================
          SECTION A: APP HEADER (COMPACT & BRANDED)
          ==================================================================== */}
      <header className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white flex items-center justify-center font-extrabold text-xs shadow-xs tracking-tight">
            EHC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-[#0F172A] tracking-tight">
                HealthyEHC
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
            </div>
            <p className="text-[10px] font-semibold text-[#64748B] leading-none">
              Employee Wellness Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications Trigger */}
          <button
            type="button"
            onClick={() => {
              if (onTrackAnalytics) onTrackAnalytics('notifications_clicked');
              if (onOpenNotifications) onOpenNotifications();
            }}
            className="relative w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition cursor-pointer shadow-2xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
          </button>

          {/* Profile / Avatar Trigger */}
          <button
            type="button"
            onClick={() => {
              if (onTrackAnalytics) onTrackAnalytics('profile_avatar_clicked');
              if (onOpenProfile) onOpenProfile();
            }}
            className="w-8 h-8 rounded-xl bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4] flex items-center justify-center font-bold text-xs hover:bg-[#99F6E4]/50 transition cursor-pointer shadow-2xs"
            aria-label="User Profile"
          >
            {patient?.name ? patient.name.slice(0, 2).toUpperCase() : 'US'}
          </button>
        </div>
      </header>

      {/* ====================================================================
          SECTION B: PERSONALISED GREETING
          ==================================================================== */}
      <section className="bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
        {/* Subtle Decorative Background Rings */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute right-12 -bottom-10 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-[#99F6E4] border border-white/10">
              <Building2 className="w-3 h-3" />
              {patient.company || 'HCL Technologies'}
            </span>
            <span className="text-[10px] text-white/75 font-medium">
              EMP ID: {patient.employeeId || 'EMP-78421'}
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-white pt-1">
            {getGreeting()}, {firstName}!
          </h2>
          <p className="text-xs text-white/85">
            Here's your health, daily movement and wellness snapshot.
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION C: HEALTH SNAPSHOT CARD (MOST IMPORTANT HOMEPAGE CARD)
          ==================================================================== */}
      <section className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3.5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-[#0F766E]" />
              Your Health Snapshot
            </span>
          </div>

          {/* Dynamic Status Badge */}
          {reportStatus === 'ready' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              <Sparkles className="w-3 h-3" /> Report Ready
            </span>
          )}
          {reportStatus === 'pending' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
              <Clock className="w-3 h-3" /> In Laboratory
            </span>
          )}
          {reportStatus === 'not_completed' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">
              <AlertTriangle className="w-3 h-3" /> Action Required
            </span>
          )}
          {reportStatus === 'viewed' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
              <CheckCircle2 className="w-3 h-3 text-[#059669]" /> Reviewed
            </span>
          )}
        </div>

        {/* --- STATE 1 & 4: REPORT READY / VIEWED --- */}
        {(reportStatus === 'ready' || reportStatus === 'viewed') && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]">
              <div>
                <span className="text-[11px] font-semibold text-[#64748B]">
                  Composite Health Score
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-[#0F172A]">
                    {patient.overallScore}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B]">/ 100</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      patient.overallScore >= 80
                        ? 'bg-[#ECFDF5] text-[#059669]'
                        : patient.overallScore >= 70
                        ? 'bg-[#FFFBEB] text-[#B45309]'
                        : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {patient.scoreTier || 'MODERATE'}
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] mt-1 font-medium">
                  {patient.interpretation}
                </p>
              </div>

              {/* Finding Pills */}
              <div className="text-right flex-shrink-0 space-y-1">
                <span className="text-[10px] text-[#64748B] block font-semibold">
                  Annual Check 2026
                </span>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626]">
                    {patient.counts?.flagged || 0} Flagged
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFFBEB] text-[#B45309]">
                    {patient.counts?.borderline || 0} Borderline
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B] block">
                  {patient.totalParameters || 50} parameters verified
                </span>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              Your latest health report is ready. Explore your results, clinical findings and personalised recommendations.
            </p>

            {/* Non-diagnostic disclaimer */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] bg-[#F1F5F9]/60 px-2.5 py-1.5 rounded-lg">
              <Info className="w-3.5 h-3.5 text-[#0F766E] flex-shrink-0" />
              <span>
                Baseline employee wellness index. Not an acute medical diagnosis.
              </span>
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => {
                if (onTrackAnalytics) onTrackAnalytics('health_snapshot_clicked');
                if (onOpenHealthReport) onOpenHealthReport();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>View Health Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* --- STATE 2: REPORT PENDING --- */}
        {reportStatus === 'pending' && (
          <div className="space-y-3">
            <div className="bg-[#FFFBEB] rounded-xl p-3.5 border border-[#FDE68A] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#92400E]">
                  Your report is currently being prepared
                </h4>
                <p className="text-[11px] text-[#B45309] mt-0.5 leading-relaxed">
                  Sample collected on 14 Jan 2026. Metropolis Healthcare (NABL) is processing your 50 biomarker parameters. Expected completion within 24 hours.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#64748B]">
              Score and risk analysis will be automatically computed once clinical parameters are certified.
            </p>

            <div className="flex items-center justify-between text-xs text-[#0F766E] font-bold bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span>Tracking ID: EHC-LAB-99214</span>
              <span className="flex items-center gap-1">
                Metropolis Labs <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              </span>
            </div>
          </div>
        )}

        {/* --- STATE 3: REPORT NOT COMPLETED --- */}
        {reportStatus === 'not_completed' && (
          <div className="space-y-3">
            <div className="bg-[#FEF2F2] rounded-xl p-3.5 border border-[#FECACA] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#991B1B]">
                  Annual Health Check 2026 Pending
                </h4>
                <p className="text-[11px] text-[#B91C1C] mt-0.5 leading-relaxed">
                  Your 100% employer-sponsored 50-parameter health checkup has not been booked yet.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onTrackAnalytics) onTrackAnalytics('schedule_checkup_clicked');
                if (onNavigateToService) onNavigateToService('labs');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>Book Sponsored Health Checkup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ====================================================================
          SECTION D: DAILY ACTIVITY DASHBOARD (DYNAMIC PROGRESS BAR)
          ==================================================================== */}
      <section
        onClick={() => {
          if (onTrackAnalytics) onTrackAnalytics('daily_activity_card_clicked');
          if (onOpenActivityDetail) onOpenActivityDetail();
        }}
        className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3 hover:border-[#0F766E]/50 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
            <Footprints className="w-4 h-4 text-[#0F766E]" />
            Today's Movement
          </span>
          <span className="text-[11px] text-[#0F766E] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 2-Column Movement Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center flex-shrink-0">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#0F172A]">
                {movement.steps.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#64748B]">
                of {movement.goal.toLocaleString()} steps
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#0F172A]">
                {movement.activeCalories}
              </div>
              <div className="text-[11px] text-[#64748B]">Active Kcal</div>
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#0F172A]">
              Daily Step Goal Progress
            </span>
            <span className="font-bold text-[#0F766E]">{stepPercentage}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] transition-all duration-500 ease-out"
              style={{ width: `${stepPercentage}%` }}
            />
          </div>

          {/* Motivational Message */}
          <p className="text-[11px] text-[#64748B]">
            You're {stepPercentage}% towards your daily step goal.{' '}
            {remainingSteps > 0 ? (
              <span className="text-[#0F766E] font-semibold">
                Just {remainingSteps.toLocaleString()} steps to go!
              </span>
            ) : (
              <span className="text-[#059669] font-bold">Goal achieved today! 🎉</span>
            )}
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION E: PERSONALISED NEXT HEALTH ACTION (CONTEXTUAL NUDGE)
          ==================================================================== */}
      <section className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-2xl border border-[#CBD5E1] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#0F766E]" />
            Your Next Health Action
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#475569] border border-[#CBD5E1]">
            Priority Nudge
          </span>
        </div>

        {/* CASE 1: HRA INCOMPLETE (PRIMARY PRIORITY) */}
        {!quizCompleted && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">
                Complete your Health Risk Assessment
              </h3>
              <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                Answer 5 short lifestyle questions to personalise your disease risk probabilities and unlock your 4-part action plan.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-0.5">
              <span className="flex items-center gap-1 font-semibold text-[#0F172A]">
                <Clock className="w-3.5 h-3.5 text-[#0F766E]" /> 5 questions • ~1 min
              </span>
              <span className="font-bold text-[#0F766E]">
                {hraAnsweredCount} of 5 completed
              </span>
            </div>

            {/* Mini Progress */}
            <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0F766E] transition-all duration-300"
                style={{ width: `${(hraAnsweredCount / 5) * 100}%` }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (onTrackAnalytics) onTrackAnalytics('hra_cta_clicked');
                if (onStartOrResumeHra) onStartOrResumeHra();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>
                {hraAnsweredCount === 0 ? 'Start Assessment' : `Continue Assessment (${hraAnsweredCount}/5)`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CASE 2: HRA COMPLETED & USER HAS FLAGGED FINDINGS (ROHAN) */}
        {quizCompleted && hasFlagged && (
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                <AlertTriangle className="w-4 h-4" />
                <span>Action Recommended: Clinical Review</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A] mt-1">
                Consult a Doctor regarding your lipid findings
              </h3>
              <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                Your elevated LDL cholesterol (158 mg/dL) benefits from an expert clinical review. Discuss with an MD Physician or Cardiologist.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] font-semibold text-[#0F172A]">
                Internal Medicine
              </span>
              <span>100% Employer-Covered Teleconsult</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onTrackAnalytics) onTrackAnalytics('next_health_action_doctor_clicked');
                  if (onNavigateToService) onNavigateToService('doctor');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Book Doctor Review</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onTrackAnalytics) onTrackAnalytics('view_risk_profile_clicked');
                  if (onOpenHealthReport) onOpenHealthReport();
                }}
                className="px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] font-bold text-xs hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                View Risk Profile
              </button>
            </div>
          </div>
        )}

        {/* CASE 3: HRA COMPLETED & USER ALL NORMAL (PRIYA) */}
        {quizCompleted && !hasFlagged && (
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Optimal Status: Preventive Maintenance</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A] mt-1">
                Maintain optimal metabolic health
              </h3>
              <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                All 50 parameters look optimal! Explore preventive nutrition habits, aerobic milestones and keep up your daily step streak.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] font-semibold text-[#059669]">
                50 / 50 Normal
              </span>
              <span>Low 10-Yr Cardiovascular Risk</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onTrackAnalytics) onTrackAnalytics('view_risk_profile_clicked');
                if (onOpenHealthReport) onOpenHealthReport();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>View Personalised Wellness Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ====================================================================
          SECTION F: QUICK HEALTH ACCESS (2-COLUMN GRID)
          ==================================================================== */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569]">
            Quick Health Access
          </span>
          <span className="text-[10px] text-[#64748B]">Subsidized Services</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. Consult a doctor */}
          <button
            type="button"
            onClick={() =>
              handleActionClick('doctor', () =>
                onNavigateToService ? onNavigateToService('doctor') : null
              )
            }
            className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E] text-left transition shadow-xs cursor-pointer flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
                <span>Consult a Doctor</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                Online or in-clinic consultations
              </p>
            </div>
          </button>

          {/* 2. Lab tests */}
          <button
            type="button"
            onClick={() =>
              handleActionClick('labs', () =>
                onNavigateToService ? onNavigateToService('labs') : null
              )
            }
            className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E] text-left transition shadow-xs cursor-pointer flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
                <span>Lab Tests</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                Tests and preventive checkups
              </p>
            </div>
          </button>

          {/* 3. Nutrition */}
          <button
            type="button"
            onClick={() =>
              handleActionClick('nutrition', () =>
                onNavigateToService ? onNavigateToService('nutrition') : null
              )
            }
            className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E] text-left transition shadow-xs cursor-pointer flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
                <span>Nutrition</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                Diet plans and guidance
              </p>
            </div>
          </button>

          {/* 4. Challenges / Physical activity */}
          <button
            type="button"
            onClick={() =>
              handleActionClick('activity', () =>
                onOpenActivityDetail ? onOpenActivityDetail() : null
              )
            }
            className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E] text-left transition shadow-xs cursor-pointer flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A] flex items-center justify-between">
                <span>Challenges</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                Join company wellness challenges
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* ====================================================================
          SECTION G: EMPLOYER-SPONSORED HEALTH BENEFITS
          ==================================================================== */}
      <section className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                Your Employee Health Benefits
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Sponsored by {patient.company || 'HCL Technologies'}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            4 Active
          </span>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed">
          Explore your employer-sponsored consultations, health checkups and wellness programmes.
        </p>

        {/* Benefit Summary Chips */}
        <div className="grid grid-cols-2 gap-1.5 pt-0.5">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-[11px] text-[#334155] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
            <span className="truncate">100% Annual Check</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-[11px] text-[#334155] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
            <span className="truncate">Free Teleconsults</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-[11px] text-[#334155] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
            <span className="truncate">Up to 40% Lab Off</span>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 text-[11px] text-[#334155] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
            <span className="truncate">Step Rewards</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onTrackAnalytics) onTrackAnalytics('employee_benefits_clicked');
            if (onNavigateToService) onNavigateToService('benefits');
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F766E] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <span>Explore All Benefits</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
}
