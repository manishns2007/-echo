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
  ArrowLeft,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  alertCount: number;
}

const sections = [
  {
    heading: 'Operations',
    items: [
      { id: 'home',         label: 'Command Center',    icon: LayoutDashboard },
      { id: 'live-feed',    label: 'Live Intel Stream', icon: Radio,   live: true },
      { id: 'alert-center', label: 'Alert Triage',      icon: BellRing, alerts: true },
    ],
  },
  {
    heading: 'Intelligence',
    items: [
      { id: 'agents',               label: 'Network Graph',    icon: Share2 },
      { id: 'entity-intel',         label: 'Suspect Directory',icon: Users },
      { id: 'crypto-intel',         label: 'Crypto Tracker',   icon: Coins },
      { id: 'drug-intel',           label: 'Drug Listings',    icon: Pill },
      { id: 'encrypted-platforms',  label: 'Encrypted Comms',  icon: MessageSquareCode },
      { id: 'correlation-engine',   label: 'Correlation',      icon: Sliders },
    ],
  },
  {
    heading: 'Casework',
    items: [
      { id: 'investigations',   label: 'Investigations', icon: Briefcase },
      { id: 'report-generation',label: 'Report Studio',  icon: FileText },
      { id: 'timeline',         label: 'Timeline',        icon: Clock },
      { id: 'evidence-vault',   label: 'Evidence Vault',  icon: Database },
      { id: 'audit-logs',       label: 'Audit Log',       icon: History },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, alertCount }) => {
  return (
    <aside className="w-56 bg-[#06090F] border-r border-white/[0.05] flex flex-col shrink-0 select-none">

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {sections.map((sec, si) => (
          <div key={si} className={si > 0 ? 'mt-3' : ''}>

            {/* Section label — Reddit-style small caps */}
            <div className="px-4 pt-1 pb-1.5 text-[10px] font-semibold text-slate-600 tracking-[0.14em] uppercase">
              {sec.heading}
            </div>

            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive =
                activeView === item.id ||
                (item.id === 'home' && activeView === 'command-center') ||
                (item.id === 'agents' && activeView === 'network-graph');
              const hasAlerts = 'alerts' in item && item.alerts && alertCount > 0;
              const isLive    = 'live' in item && item.live;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-[9px] text-left transition-colors
                    ${isActive
                      ? 'bg-white/[0.06] text-slate-100'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}
                  />
                  <span className={`text-[13px] flex-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>
                    {item.label}
                  </span>

                  {/* Live pulse */}
                  {isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}

                  {/* Alert count */}
                  {hasAlerts && (
                    <span className="text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20 shrink-0 px-1">
                      {alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.05] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Secure</span>
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-400 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Portal
        </button>
      </div>
    </aside>
  );
};
