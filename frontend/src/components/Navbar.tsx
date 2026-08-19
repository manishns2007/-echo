import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Sparkles, 
  History, 
  Radio, 
  Zap,
  ChevronRight
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
  activeView,
  onNavigate,
  isDemoOpen,
  onToggleDemo
}) => {
  return (
    <header className="h-16 bg-[#080D16] border-b border-slate-800/90 sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center space-x-3.5">
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => onNavigate('command-center')}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-600/20 to-blue-700/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all shadow-inner">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-slate-100 text-sm tracking-wider">NARCO-FUSION</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 uppercase font-semibold">
                OPS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Chandigarh Police Cyber Narcotics Intelligence
            </p>
          </div>
        </div>

        {/* Threat Level */}
        <div className="hidden lg:flex items-center pl-5 border-l border-slate-800">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-800/60 text-rose-300">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wide">THREAT: CRITICAL</span>
            <span className="font-mono text-[11px] bg-rose-900/60 px-1 rounded text-rose-200">
              {stats?.threat_score || 87}/100
            </span>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 transition-all text-xs font-mono group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>Search suspect, wallet, @handle, case, exhibit...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 border border-slate-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Tools & Role Controls */}
      <div className="flex items-center space-x-3">
        {/* Demo Tour Toggle Pill */}
        <button
          onClick={onToggleDemo}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
            isDemoOpen
              ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="hidden sm:inline">10-Step Tour</span>
        </button>

        {/* Grounded AI Assistant */}
        <button
          onClick={onOpenAssistant}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-700/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">AI Investigator</span>
        </button>

        {/* Audit Log Trigger */}
        <button
          onClick={onOpenAudit}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-colors"
          title="Tamper-Evident Audit Trail"
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Audit</span>
        </button>

        {/* Role Switcher */}
        <div className="flex items-center pl-2 border-l border-slate-800">
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded px-2 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="Investigator">DSP R. Sharma (Investigator)</option>
            <option value="Analyst">Analyst P. Kaur (Analyst)</option>
            <option value="Administrator">Admin-01 (Tech Lead)</option>
          </select>
        </div>
      </div>
    </header>
  );
};
