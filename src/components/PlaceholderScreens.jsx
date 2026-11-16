import React from 'react';
import {
  HeartPulse,
  Activity,
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  Building2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  User,
  Bell,
  FileText,
  HelpCircle,
  LogOut,
  Footprints,
  Flame,
  Award,
  Apple,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { EMPLOYER_BENEFITS } from '../data/patientData';

export function ServicesScreen({ onNavigateToService }) {
  const serviceCategories = [
    {
      id: 'doctor',
      name: 'Doctor Consultations',
      desc: 'Online video or in-clinic consultations with MD Physicians & Cardiologists',
      icon: Stethoscope,
      badge: '100% Covered',
      color: 'bg-[#CCFBF1] text-[#0F766E]',
    },
    {
      id: 'labs',
      name: 'Diagnostic Lab Tests',
      desc: 'Metropolis & Apollo NABL home sample collection with digital reports',
      icon: FlaskConical,
      badge: 'Up to 40% Off',
      color: 'bg-[#ECFDF5] text-[#059669]',
    },
    {
      id: 'nutrition',
      name: 'Nutrition & Diet Guidance',
      desc: 'Personalised heart-healthy dietary protocols & nutritionist reviews',
      icon: Apple,
      badge: 'Personalised',
      color: 'bg-[#FEF3C7] text-[#B45309]',
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy & Medicine Delivery',
      desc: 'Order prescribed maintenance medications with corporate discounts',
      icon: Pill,
      badge: '2-Hr Delivery',
      color: 'bg-[#FFFBEB] text-[#B45309]',
    },
    {
      id: 'clinic',
      name: 'Clinic Consultation & ECG',
      desc: 'In-person health checkup at HealthyEHC partner wellness centers',
      icon: Building2,
      badge: 'Near You',
      color: 'bg-[#F1F5F9] text-[#0F172A]',
    },
    {
      id: 'dental',
      name: 'Corporate Dental & Vision',
      desc: 'Employer-subsidized routine dental prophylaxis and eye checkups',
      icon: ShieldCheck,
      badge: 'Subsidized',
      color: 'bg-[#EFF6FF] text-[#1D4ED8]',
    },
  ];

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Services Header */}
      <div>
        <h3 className="text-base font-extrabold text-[#0F172A]">
          Healthcare Services & Benefits
        </h3>
        <p className="text-xs text-[#64748B]">
          Corporate healthcare network and subsidized employee medical services
        </p>
      </div>

      {/* Employer-Sponsored Benefits Spotlight */}
      <div className="bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#99F6E4] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> HCL Corporate Benefits
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white">
            4 Active
          </span>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-white">
            Employer-Sponsored Healthcare Plan
          </h4>
          <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
            Your corporate package includes 100% annual health checks, zero-copay teleconsultations, and subsidized laboratory tests.
          </p>
        </div>

        <div className="space-y-2 pt-1 border-t border-white/15">
          {EMPLOYER_BENEFITS.slice(0, 3).map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white/10 rounded-xl p-2.5 flex items-center justify-between text-xs"
            >
              <div className="min-w-0 pr-2">
                <div className="font-bold text-white truncate">{benefit.title}</div>
                <div className="text-[10px] text-white/70 line-clamp-1">
                  {benefit.coverage}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToService && onNavigateToService(benefit.id.includes('check') ? 'labs' : 'doctor')}
                className="px-2.5 py-1 rounded-lg bg-white text-[#0F766E] font-bold text-[10px] flex-shrink-0 cursor-pointer hover:bg-white/90"
              >
                {benefit.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Healthcare Services Catalogue */}
      <div className="space-y-2.5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#475569] px-0.5">
          Explore Services
        </span>

        {serviceCategories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigateToService && onNavigateToService(item.id)}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-3.5 shadow-xs hover:border-[#0F766E]/50 transition cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#0F172A] truncate">
                      {item.name}
                    </h4>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProfileScreen({
  patient,
  onSwitchProfile,
  currentProfileId,
  reportStatus,
  onSetReportStatus,
  quizCompleted,
  onToggleQuizCompleted,
}) {
  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] font-extrabold text-base flex items-center justify-center border border-[#99F6E4]">
            {patient.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-[#0F172A] truncate">
              {patient.name}
            </h3>
            <p className="text-xs text-[#64748B]">
              {patient.gender} • {patient.age} yrs • {patient.employeeId}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                {patient.company || 'HCL Technologies'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DEMO CONTROLS & SCENARIO SWITCHER (PRD SECTION 6) */}
      <div className="bg-white rounded-2xl border border-[#CBD5E1] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center text-xs font-bold">
              ★
            </span>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
              Interactive Scenario Switcher
            </h4>
          </div>
          <span className="text-[10px] text-[#64748B]">5 Scenarios</span>
        </div>

        <p className="text-[11px] text-[#64748B]">
          Test all 5 conditional homepage and report states specified in Section 6:
        </p>

        <div className="space-y-2">
          {/* Scenario 1: Report Ready, HRA Incomplete */}
          <button
            type="button"
            onClick={() => {
              onSwitchProfile('rohan');
              onSetReportStatus('ready');
              if (quizCompleted) onToggleQuizCompleted(false);
            }}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
              currentProfileId === 'rohan' && reportStatus === 'ready' && !quizCompleted
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="font-bold">Scenario 1: Report Ready + HRA Incomplete</div>
              <div className="text-[10px] opacity-80">
                Rohan (74 Score, 3 Flagged, HRA 0/5)
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </button>

          {/* Scenario 2: Report Ready, HRA Completed */}
          <button
            type="button"
            onClick={() => {
              onSwitchProfile('rohan');
              onSetReportStatus('ready');
              if (!quizCompleted) onToggleQuizCompleted(true);
            }}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
              currentProfileId === 'rohan' && reportStatus === 'ready' && quizCompleted
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="font-bold">Scenario 2: Report Ready + HRA Completed</div>
              <div className="text-[10px] opacity-80">
                Rohan (HRA 5/5, Risk Profile Unlocked)
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </button>

          {/* Scenario 3: Report Pending */}
          <button
            type="button"
            onClick={() => {
              onSetReportStatus('pending');
            }}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
              reportStatus === 'pending'
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="font-bold">Scenario 3: Report Pending in Laboratory</div>
              <div className="text-[10px] opacity-80">
                No misleading score, Metropolis processing
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </button>

          {/* Scenario 4: User with Priority Finding */}
          <button
            type="button"
            onClick={() => {
              onSwitchProfile('rohan');
              onSetReportStatus('ready');
            }}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
              currentProfileId === 'rohan' && reportStatus === 'ready'
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="font-bold">Scenario 4: Priority Health Finding</div>
              <div className="text-[10px] opacity-80">
                Rohan (LDL 158 Flagged, Doctor review recommended)
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </button>

          {/* Scenario 5: User with All Normal Results */}
          <button
            type="button"
            onClick={() => {
              onSwitchProfile('priya');
              onSetReportStatus('ready');
            }}
            className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${
              currentProfileId === 'priya' && reportStatus === 'ready'
                ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="font-bold">Scenario 5: Optimal Health (No Findings)</div>
              <div className="text-[10px] opacity-80">
                Priya (92 Score, 50 Normal, Preventive guidance)
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </button>
        </div>
      </div>

      {/* Account & Health Records List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-[#F1F5F9] overflow-hidden shadow-xs">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#0F766E]" />
            <span className="text-xs font-semibold text-[#0F172A]">Annual Health Check 2026</span>
          </div>
          <span className="text-[11px] font-bold text-[#059669]">Completed</span>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#0F766E]" />
            <span className="text-xs font-semibold text-[#0F172A]">Employer Benefits (HCL)</span>
          </div>
          <span className="text-[11px] text-[#64748B]">Active</span>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span className="text-xs font-semibold text-[#0F172A]">Data Privacy & Security</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
        </div>
      </div>
    </div>
  );
}
