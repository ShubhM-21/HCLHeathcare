import React from 'react';
import { Home, HeartPulse, ShoppingBag, User } from 'lucide-react';

export function AppBottomNav({ activeTab = 'health', onSelectTab }) {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'health',
      label: 'Health',
      icon: HeartPulse,
      badge: null,
    },
    {
      id: 'services',
      label: 'Services',
      icon: ShoppingBag,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="HealthyEHC App Navigation"
      className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E2E8F0] shadow-lg flex items-center justify-around px-2 py-2 select-none"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-[#0F766E]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.75]'
                }`}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 transition-all ${
                isActive ? 'font-bold text-[#0F766E]' : 'font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
