import React from 'react';
import {
  LayoutDashboard,
  Share2,
  Radio,
  Briefcase,
  Users,
  Coins,
  Pill,
  MessageSquareCode,
  Sliders,
  Database,
  Clock,
  History,
  BellRing,
  FileText,
  LogIn,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  alertCount: number;
}

const navSections = [
  {
    title: 'OPERATIONS',
    items: [
      { id: 'home', label: 'Command Center', icon: LayoutDashboard },
      { id: 'live-feed', label: 'Live Intel Stream', icon: Radio, live: true },
      { id: 'alert-center', label: 'Alert Triage', icon: BellRing, alertBadge: true },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { id: 'agents', label: 'Network Graph', icon: Share2 },
      { id: 'entity-intel', label: 'Suspect Directory', icon: Users },
      { id: 'crypto-intel', label: 'Crypto Tracker', icon: Coins },
      { id: 'drug-intel', label: 'Drug Listings', icon: Pill },
      { id: 'encrypted-platforms', label: 'Encrypted Comms', icon: MessageSquareCode },
      { id: 'correlation-engine', label: 'Correlation Engine', icon: Sliders },
    ],
  },
  {
    title: 'CASEWORK',
    items: [
      { id: 'investigations', label: 'Investigations', icon: Briefcase },
      { id: 'report-generation', label: 'Report Studio', icon: FileText },
      { id: 'timeline', label: 'Event Timeline', icon: Clock },
      { id: 'evidence-vault', label: 'Evidence Vault', icon: Database },
      { id: 'audit-logs', label: 'Audit Log', icon: History },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  alertCount,
}) => {
  return (
    <aside className="w-56 bg-[#06090F] border-r border-white/[0.06] flex flex-col font-mono text-xs flex-shrink-0 select-none">

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2.5 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <div className="px-2.5 mb-1.5 text-[9px] font-bold text-slate-600 tracking-[0.15em] uppercase">
              {section.title}
            </div>

            {/* Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeView === item.id ||
                  (item.id === 'home' && activeView === 'command-center') ||
                  (item.id === 'agents' && activeView === 'network-graph');

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded transition-all text-left ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border-l-2 border-cyan-500 pl-2'
                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04] border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-cyan-400' : 'text-slate-600'
                        }`}
                      />
                      <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Live pulse dot */}
                    {'live' in item && item.live && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    )}

                    {/* Alert count badge */}
                    {'alertBadge' in item && item.alertBadge && alertCount > 0 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/25 shrink-0 min-w-[18px] text-center">
                        {alertCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3.5 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-600 tracking-wide">SECURE</span>
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
          title="Portal"
        >
          <LogIn className="w-3 h-3" />
          <span>Portal</span>
        </button>
      </div>
    </aside>
  );
};
