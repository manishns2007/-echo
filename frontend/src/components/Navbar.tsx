import React from 'react';
import {
  Shield,
  Search,
  Sparkles,
  ClipboardList,
  Radio,
  LogOut,
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
  isDemoOpen: boolean;
  onToggleDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  currentRole,
  onRoleChange,
  onOpenSearch,
  onOpenAssistant,
  onOpenAudit,
  onNavigate,
}) => {
  const threatScore = stats?.threat_score ?? 87;
  const threatLabel = threatScore >= 85 ? 'CRITICAL' : threatScore >= 65 ? 'HIGH' : 'MODERATE';
  const threatColor =
    threatScore >= 85
      ? 'text-rose-400 border-rose-800/70 bg-rose-950/30'
      : threatScore >= 65
      ? 'text-amber-400 border-amber-800/70 bg-amber-950/30'
      : 'text-emerald-400 border-emerald-800/70 bg-emerald-950/30';

  return (
    <header className="h-14 bg-[#06090F] border-b border-white/[0.06] sticky top-0 z-40 flex items-center justify-between px-5 gap-4">

      {/* ── Brand ── */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-3 shrink-0 group"
      >
        <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
          <Shield className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-[0.08em] text-slate-100 font-mono">
            NARCO-FUSION
          </div>
          <div className="text-[10px] text-slate-500 tracking-wide hidden sm:block">
            Chandigarh Police · Cyber Narcotics Division
          </div>
        </div>
      </button>

      {/* ── Threat indicator (separator) ── */}
      <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] font-mono font-medium tracking-wider ${threatColor} ml-2`}>
        <Radio className="w-3 h-3 animate-pulse" />
        <span>THREAT LEVEL</span>
        <span className="opacity-60">/</span>
        <span className="font-bold">{threatLabel}</span>
        <span className="opacity-50 text-[10px]">{threatScore}</span>
      </div>

      {/* ── Global Search (centre) ── */}
      <button
        onClick={onOpenSearch}
        className="flex-1 max-w-sm hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all text-slate-500 hover:text-slate-300 text-[11px] font-mono"
      >
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="flex-1 text-left">Search entity, wallet, case, exhibit…</span>
        <kbd className="px-1.5 py-0.5 text-[9px] rounded bg-white/[0.06] border border-white/[0.08] text-slate-500">
          Ctrl K
        </kbd>
      </button>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* AI Assistant */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-700/40 bg-cyan-950/30 hover:border-cyan-500/60 hover:bg-cyan-950/50 text-cyan-300 text-[11px] font-mono tracking-wide transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Intel Assist</span>
        </button>

        {/* Audit Trail */}
        <button
          onClick={onOpenAudit}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/[0.07] bg-white/[0.03] hover:border-white/[0.14] text-slate-400 hover:text-slate-200 text-[11px] font-mono tracking-wide transition-all"
          title="Tamper-Evident Audit Trail"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Audit Trail</span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-white/[0.07] mx-1" />

        {/* Officer Role */}
        <select
          value={currentRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.14] text-slate-300 text-[11px] font-mono rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50 cursor-pointer transition-all"
        >
          <option value="Investigator">DSP R. Sharma</option>
          <option value="Analyst">Analyst P. Kaur</option>
          <option value="Administrator">Admin-01</option>
        </select>

        {/* Divider */}
        <div className="h-5 w-px bg-white/[0.07] mx-1" />

        {/* Back to Portal */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/[0.07] bg-white/[0.03] hover:border-rose-500/30 hover:bg-rose-500/5 text-slate-500 hover:text-rose-400 text-[11px] font-mono transition-all"
          title="Back to Login Portal"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Portal</span>
        </button>
      </div>
    </header>
  );
};
