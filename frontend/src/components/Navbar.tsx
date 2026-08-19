import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Bot, 
  FileText, 
  Activity, 
  AlertTriangle, 
  Lock, 
  UserCheck, 
  Radio, 
  Layers, 
  History,
  Sparkles
} from 'lucide-react';
import { SystemStats } from '../types/intelligence';

interface NavbarProps {
  stats: SystemStats | null;
  currentRole: string;
  onRoleChange: (role: string) => void;
  onOpenSearch: () => void;
  onOpenAssistant: () => void;
  onOpenAudit: () => void;
  onSelectEntity: (id: string) => void;
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  currentRole,
  onRoleChange,
  onOpenSearch,
  onOpenAssistant,
  onOpenAudit,
  activeView,
  onNavigate
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC') + ' [IST 10:48]');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-[#080D16]/95 border-b border-slate-800/80 backdrop-blur sticky top-0 z-40 px-4 flex items-center justify-between">
      {/* Brand & Platform Identity */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('command-center')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600/20 to-blue-800/30 border border-cyan-500/40 shadow-inner">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold tracking-wider text-slate-100 text-sm">NARCO-FUSION</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                OPS CENTER
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight">
              Chandigarh Police Cyber Narcotics Intelligence Platform
            </p>
          </div>
        </div>

        {/* Threat Level Barometer */}
        <div className="hidden lg:flex items-center pl-6 border-l border-slate-800 space-x-2">
          <span className="text-[11px] font-mono uppercase text-slate-400">Threat Level:</span>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-rose-950/40 border border-rose-600/40 text-rose-300">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-mono font-semibold text-xs tracking-wider">CRITICAL / SEVERE</span>
            <span className="font-mono text-[11px] bg-rose-900/60 px-1 rounded text-rose-200">
              {stats?.threat_score || 87}/100
            </span>
          </div>
        </div>
      </div>

      {/* Global Search Bar Trigger */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 transition-all text-xs font-mono shadow-inner group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>Search alias, wallet, @handle, case, evidence...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 border border-slate-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Quick Action Tools & Role Control */}
      <div className="flex items-center space-x-3">
        {/* Grounded AI Assistant */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-600/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono transition-all shadow-sm hover:shadow-cyan-900/20 group"
          title="Open AI Investigator Decision Support"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">AI Investigator</span>
        </button>

        {/* Audit Log Trigger */}
        <button
          onClick={onOpenAudit}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-colors"
          title="View Tamper-Evident Audit Log"
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Audit</span>
        </button>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-slate-200 font-medium">
              {currentRole === 'Investigator' && 'DSP R. Sharma'}
              {currentRole === 'Analyst' && 'Analyst P. Kaur'}
              {currentRole === 'Administrator' && 'Admin-01 (Tech Ops)'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Badge: #CHD-CYBER-{currentRole === 'Investigator' ? '027' : currentRole === 'Analyst' ? '014' : '001'}
            </div>
          </div>

          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
          >
            <option value="Investigator">Role: Investigator</option>
            <option value="Analyst">Role: Analyst</option>
            <option value="Administrator">Role: Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
};
