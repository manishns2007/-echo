import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Pill,
  Users,
  Share2,
  Coins,
  MessageSquareCode,
  BellRing,
  Briefcase,
  Database,
  GitBranch,
  Sliders,
  History
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  pulse?: boolean;
  badge?: string | number;
  badgeColor?: string;
  highlight?: boolean;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, alertCount }) => {
  const navSections: NavSection[] = [
    {
      group: 'OPERATIONS',
      items: [
        { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
        { id: 'live-feed', label: 'Live Intel Stream', icon: Radio, pulse: true },
        { id: 'alert-center', label: 'Alert Triage Center', icon: BellRing, badge: alertCount || 12, badgeColor: 'bg-rose-600' }
      ]
    },
    {
      group: 'INTELLIGENCE FUSION',
      items: [
        { id: 'drug-intel', label: 'Drug Intelligence', icon: Pill },
        { id: 'entity-intel', label: 'Entity Directory & 360°', icon: Users },
        { id: 'network-graph', label: 'Network Graph (Cytoscape)', icon: Share2, highlight: true },
        { id: 'crypto-intel', label: 'Cryptocurrency Intelligence', icon: Coins },
        { id: 'encrypted-platforms', label: 'Encrypted Platforms', icon: MessageSquareCode },
        { id: 'correlation-engine', label: 'Correlation Rule Engine', icon: Sliders }
      ]
    },
    {
      group: 'INVESTIGATIONS & EVIDENCE',
      items: [
        { id: 'investigations', label: 'Case Workspace (CHD-0047)', icon: Briefcase, badge: 'ACTIVE' },
        { id: 'timeline', label: 'Timeline Escalation', icon: GitBranch },
        { id: 'evidence-vault', label: 'Evidence Vault (SHA-256)', icon: Database }
      ]
    },
    {
      group: 'SECURITY & GOVERNANCE',
      items: [
        { id: 'audit-logs', label: 'Audit Trail Logs', icon: History }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#080D16] border-r border-slate-800/80 flex flex-col justify-between select-none h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-3 space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              {sec.group}
            </div>
            <div className="space-y-0.5 pt-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id || (activeView.startsWith('entity-detail') && item.id === 'entity-intel') || (activeView.startsWith('case-detail') && item.id === 'investigations');
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-700/50 shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-cyan-400'
                            : 'text-slate-500 group-hover:text-slate-300'
                        } ${item.pulse ? 'animate-pulse text-rose-400' : ''}`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          typeof item.badge === 'number'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {item.highlight && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Legal & Mode Indicator */}
      <div className="p-3 m-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-xs">SYNTHETIC MODE</span>
          </span>
          <span className="text-[10px] text-slate-500">v1.0.4-PROT</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Investigative decision-support prototype for simulated darknet & encrypted platform drug intelligence.
        </p>
      </div>
    </aside>
  );
};
