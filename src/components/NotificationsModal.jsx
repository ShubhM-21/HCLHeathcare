import React from 'react';
import { X, Bell, Sparkles, Footprints, Clock, CheckCircle2 } from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../data/patientData';

export function NotificationsModal({ isOpen, onClose, onNavigateAction }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#E2E8F0] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#0F172A]">Notifications</h3>
              <p className="text-[10px] text-[#64748B]">Recent healthcare reminders</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-3 overflow-y-auto space-y-2.5 divide-y divide-[#F1F5F9]">
          {NOTIFICATIONS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                if (onNavigateAction) onNavigateAction(item.type);
              }}
              className="pt-2 first:pt-0 p-2 rounded-xl hover:bg-[#F8FAFC] transition cursor-pointer flex items-start gap-3"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.type === 'report'
                    ? 'bg-[#ECFDF5] text-[#059669]'
                    : item.type === 'activity'
                    ? 'bg-[#FEF3C7] text-[#B45309]'
                    : 'bg-[#CCFBF1] text-[#0F766E]'
                }`}
              >
                {item.type === 'report' && <Sparkles className="w-4 h-4" />}
                {item.type === 'activity' && <Footprints className="w-4 h-4" />}
                {item.type === 'hra' && <Clock className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0F172A] truncate">
                    {item.title}
                  </h4>
                  {item.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                  {item.message}
                </p>
                <span className="text-[10px] text-[#94A3B8] mt-1 block">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#475569] hover:bg-[#F1F5F9] transition cursor-pointer"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
