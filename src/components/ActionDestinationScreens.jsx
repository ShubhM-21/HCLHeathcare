import React, { useState } from 'react';
import {
  ArrowLeft,
  Stethoscope,
  FlaskConical,
  Apple,
  Footprints,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  Users,
  Trophy,
  Sparkles,
  Info
} from 'lucide-react';

export function DoctorConsultationScreen({ onBack, onCompleteAction, isCompleted = false }) {
  const [selectedSlot, setSelectedSlot] = useState('slot1');
  const [applyCoins, setApplyCoins] = useState(true);
  const [confirmed, setConfirmed] = useState(isCompleted);

  const handleConfirm = () => {
    setConfirmed(true);
    if (onCompleteAction) {
      onCompleteAction('video-consult');
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
            Action Plan Destination
          </span>
          <h3 className="text-sm font-extrabold text-[#0F172A]">
            Doctor Consultation
          </h3>
        </div>
      </div>

      {/* Clinical Context Banner */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E]">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Why this is recommended for you</span>
        </div>
        <p className="text-xs text-[#B45309] leading-relaxed">
          Your Annual Health Check flagged <span className="font-bold">LDL Cholesterol (158 mg/dL)</span> and elevated <span className="font-bold">Blood Pressure (136/88 mmHg)</span>. A physician review maps a structured cardiometabolic plan.
        </p>
      </div>

      {/* Specialist Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold text-base flex-shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
              Available in 30 Mins
            </span>
            <h4 className="text-sm font-extrabold text-[#0F172A] mt-1">
              Dr. A. Verma (MD, DM Cardiology)
            </h4>
            <p className="text-xs text-[#64748B]">
              Senior Cardiologist • 14+ yrs experience
            </p>
          </div>
        </div>

        {/* Slot Selector */}
        <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
          <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
            Select Appointment Slot
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedSlot('slot1')}
              className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                selectedSlot === 'slot1'
                  ? 'border-[#0F766E] bg-[#CCFBF1]/30 font-bold text-[#0F172A]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
              }`}
            >
              <div>Today, 11:30 AM</div>
              <div className="text-[10px] font-normal text-[#64748B]">Video Consult</div>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSlot('slot2')}
              className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                selectedSlot === 'slot2'
                  ? 'border-[#0F766E] bg-[#CCFBF1]/30 font-bold text-[#0F172A]'
                  : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
              }`}
            >
              <div>Tomorrow, 10:00 AM</div>
              <div className="text-[10px] font-normal text-[#64748B]">Clinic Visit</div>
            </button>
          </div>
        </div>

        {/* Fee & Coins Breakdown */}
        <div className="border-t border-[#E2E8F0] pt-3 space-y-2 text-xs">
          <div className="flex justify-between text-[#64748B]">
            <span>Consultation Fee</span>
            <span className="font-bold text-[#0F172A]">₹499</span>
          </div>

          <label className="flex items-center justify-between cursor-pointer select-none">
            <span className="inline-flex items-center gap-2 text-[#0F172A] font-medium">
              <input
                type="checkbox"
                checked={applyCoins}
                onChange={(e) => setApplyCoins(e.target.checked)}
                className="w-4 h-4 rounded accent-[#0F766E]"
              />
              Apply 50 Healthy Coins
            </span>
            <span className="font-bold text-[#059669]">
              {applyCoins ? '-₹50' : '₹0'}
            </span>
          </label>

          <div className="pt-2 border-t border-dashed border-[#CBD5E1] flex items-center justify-between text-sm">
            <span className="font-bold text-[#0F172A]">Total Payable</span>
            <span className="text-base font-extrabold text-[#0F766E]">
              ₹{applyCoins ? 449 : 499}
            </span>
          </div>
        </div>

        {/* Confirmation State or CTA */}
        {confirmed ? (
          <div className="rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] p-3.5 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-[#065F46]">
              Demo Booking Flow Completed
            </div>
            <p className="text-[11px] text-[#047857]">
              Simulated interaction • No real appointment was booked or charged.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
          >
            Confirm Demo Booking (₹{applyCoins ? 449 : 499}) →
          </button>
        )}
      </div>

      {/* Return Button */}
      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition cursor-pointer"
      >
        ← Return to Action Plan
      </button>
    </div>
  );
}

export function LabTestsScreen({ onBack, onCompleteAction, isCompleted = false }) {
  const [confirmed, setConfirmed] = useState(isCompleted);

  const handleConfirm = () => {
    setConfirmed(true);
    if (onCompleteAction) {
      onCompleteAction('lab-followup');
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
            Action Plan Destination
          </span>
          <h3 className="text-sm font-extrabold text-[#0F172A]">
            90-Day Follow-Up Lab Tests
          </h3>
        </div>
      </div>

      {/* Context Banner */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#065F46]">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Why this is recommended</span>
        </div>
        <p className="text-xs text-[#047857] leading-relaxed">
          Lipid improvements and glycemic modifications take 60 to 90 days to reflect in serum markers. Re-testing tracks whether lifestyle shifts are working.
        </p>
      </div>

      {/* Package Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-bold text-base flex-shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
              Metropolis Healthcare (NABL)
            </span>
            <h4 className="text-sm font-extrabold text-[#0F172A] mt-1">
              Lipid Profile + HbA1c Monitoring Panel (8 Tests)
            </h4>
            <p className="text-xs text-[#64748B]">
              Includes LDL, HDL, Triglycerides, Non-HDL, HbA1c, eAG
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#64748B]">Collection Type</span>
            <span className="font-semibold text-[#0F172A]">Free Home Sample Collection</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Recommended Timing</span>
            <span className="font-semibold text-[#0F172A]">Mid-February 2027 (90 Days)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#64748B]">Digital Report Delivery</span>
            <span className="font-semibold text-[#059669]">Within 6 Hours (App Sync)</span>
          </div>
        </div>

        {confirmed ? (
          <div className="rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] p-3.5 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-[#065F46]">
              Illustrative Lab Request Confirmed
            </div>
            <p className="text-[11px] text-[#047857]">
              Demo scheduling simulated • No actual lab order was placed.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
          >
            Confirm Demo Lab Scheduling (Free Home Pickup) →
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition cursor-pointer"
      >
        ← Return to Action Plan
      </button>
    </div>
  );
}

export function NutritionGuidanceScreen({ onBack, onCompleteAction, isCompleted = false }) {
  const [confirmed, setConfirmed] = useState(isCompleted);

  const handleConfirm = () => {
    setConfirmed(true);
    if (onCompleteAction) {
      onCompleteAction('diet-guide');
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
            Action Plan Destination
          </span>
          <h3 className="text-sm font-extrabold text-[#0F172A]">
            Heart & Glycemic Nutrition Plan
          </h3>
        </div>
      </div>

      {/* Rationale */}
      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#065F46]">
          <Apple className="w-4 h-4 flex-shrink-0" />
          <span>Dietary Strategy for Elevated LDL & Blood Pressure</span>
        </div>
        <p className="text-xs text-[#047857] leading-relaxed">
          Capping daily sodium under 2,000 mg eases arterial resistance, while soluble fiber binds to intestinal bile acids to clear LDL from circulation.
        </p>
      </div>

      {/* Core Nutrition Recommendations */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
          Key Daily Nutrition Rules
        </h4>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-bold text-[#0F172A]">1. Sodium Cap (&lt; 2,000 mg/day)</span>
            <p className="text-[#64748B]">
              Avoid table salt on salads, packaged snacks, and papad. Use lemon and spices for flavor.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-bold text-[#0F172A]">2. Soluble Fiber (25g/day)</span>
            <p className="text-[#64748B]">
              Include oats for breakfast, methi leaves, chia/flax seeds, and legumes to capture cholesterol.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
            <span className="font-bold text-[#0F172A]">3. Low Glycemic Carbohydrates</span>
            <p className="text-[#64748B]">
              Swap white polished rice with unpolished millets or brown rice to prevent HbA1c spikes.
            </p>
          </div>
        </div>

        {confirmed ? (
          <div className="rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] p-3.5 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-[#065F46]">
              Illustrative Nutrition Plan Activated
            </div>
            <p className="text-[11px] text-[#047857]">
              Saved to your demo HealthyEHC wellness library.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
          >
            Activate Demo Nutrition Guide (Free) →
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition cursor-pointer"
      >
        ← Return to Action Plan
      </button>
    </div>
  );
}

export function PhysicalActivityScreen({ onBack, onCompleteAction, isCompleted = false }) {
  const [confirmed, setConfirmed] = useState(isCompleted);

  const handleConfirm = () => {
    setConfirmed(true);
    if (onCompleteAction) {
      onCompleteAction('step-goal');
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
            Action Plan Destination
          </span>
          <h3 className="text-sm font-extrabold text-[#0F172A]">
            Physical Activity & Step League
          </h3>
        </div>
      </div>

      {/* Rationale Banner */}
      <div className="bg-[#CCFBF1]/40 border border-[#99F6E4] rounded-2xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F766E]">
          <Footprints className="w-4 h-4 flex-shrink-0" />
          <span>Why activity matters for your results</span>
        </div>
        <p className="text-xs text-[#115E59] leading-relaxed">
          Your activity levels are an important factor in your risk profile. Start with a manageable step goal to reverse sedentary desk hours and lower cardiovascular risk.
        </p>
      </div>

      {/* Step Goal Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
            Target Step Goal
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            Recommended
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#64748B]">Current Baseline</div>
            <div className="text-sm font-bold text-[#475569]">5,000 steps/day</div>
          </div>
          <span className="text-xs font-extrabold text-[#0F766E]">→</span>
          <div className="text-right">
            <div className="text-xs text-[#0F766E] font-semibold">New Goal</div>
            <div className="text-base font-extrabold text-[#0F172A]">8,500 steps/day</div>
          </div>
        </div>

        {/* Company League Teaser */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center flex-shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#0F172A]">
              Company Challenge: "Heart Health Walk"
            </div>
            <div className="text-[11px] text-[#64748B]">
              142 colleagues participating • Earn +25 coins/week
            </div>
          </div>
        </div>

        {confirmed ? (
          <div className="rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] p-3.5 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-sm font-extrabold text-[#065F46]">
              Illustrative Activity Goal & Challenge Joined
            </div>
            <p className="text-[11px] text-[#047857]">
              Demo goal updated to 8,500 steps/day. Synced with simulated tracker.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-extrabold transition shadow-sm cursor-pointer"
          >
            Confirm 8,500 Step Goal & Join Challenge →
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition cursor-pointer"
      >
        ← Return to Action Plan
      </button>
    </div>
  );
}
