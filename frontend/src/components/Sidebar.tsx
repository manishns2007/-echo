import React from 'react';
import { 
  Home,
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
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onNavigate,
  alertCount
}) => {
  const navSections = [
    {
      title: "PORTAL & DASHBOARD",
      items: [
        { id: 'landing', path: '/', label: 'Landing Portal', icon: Home, badge: null },
        { id: 'home', path: '/home', label: 'Command Center', icon: LayoutDashboard, badge: null },
        { id: 'live-feed', path: '/live-feed', label: 'Live Intel Stream', icon: Radio, badge: 'LIVE' },
        { id: 'alert-center', path: '/alerts', label: 'Alert Triage Center', icon: BellRing, badge: alertCount ? `${alertCount}` : null, badgeColor: 'bg-rose-950 text-rose-300 border-rose-800' }
      ]
    },
    {
      title: "INTELLIGENCE FUSION",
      items: [
        { id: 'agents', path: '/agents', label: 'Agents & Network Graph', icon: Share2, badge: '6 Views' },
        { id: 'entity-intel', path: '/entities', label: 'Suspect 360° Directory', icon: Users, badge: null },
        { id: 'crypto-intel', path: '/crypto', label: 'Cryptocurrency Tracker', icon: Coins, badge: null },
        { id: 'drug-intel', path: '/drugs', label: 'Drug Analytics & Listings', icon: Pill, badge: null },
        { id: 'encrypted-platforms', path: '/comms', label: 'Encrypted Platform Comms', icon: MessageSquareCode, badge: null },
        { id: 'correlation-engine', path: '/correlation', label: 'Correlation Rule Engine', icon: Sliders, badge: null }
      ]
    },
    {
      title: "CASES & EVIDENCE",
      items: [
        { id: 'investigations', path: '/investigation-panel', label: 'Investigation Panel', icon: Briefcase, badge: 'ACTIVE', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
        { id: 'report-generation', path: '/report-generation', label: 'Report Generation', icon: FileText, badge: 'OFFICIAL' },
        { id: 'timeline', path: '/timeline', label: 'Timeline Escalation', icon: Clock, badge: null },
        { id: 'evidence-vault', path: '/evidence', label: 'Evidence Vault (SHA-256)', icon: Database, badge: null },
        { id: 'audit-logs', path: '/audit', label: 'Tamper-Evident Audit', icon: History, badge: null }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#080D16] border-r border-slate-800/90 flex flex-col justify-between hidden md:flex font-mono text-xs flex-shrink-0 select-none">
      <div className="py-4 px-3 space-y-6 overflow-y-auto">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {sec.title}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id || (item.id === 'home' && activeView === 'command-center') || (item.id === 'agents' && activeView === 'network-graph');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 text-cyan-300 border border-cyan-700/60 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${item.badgeColor || 'bg-cyan-950 text-cyan-400 border-cyan-800'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SECURE GATEWAY</span>
          </div>
          <span className="font-mono text-cyan-400">v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
