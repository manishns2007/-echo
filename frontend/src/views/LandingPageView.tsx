import React, { useState, useEffect } from 'react';
import {
  LogIn,
  Eye,
  EyeOff,
  Lock,
  User,
  ChevronRight,
  AlertTriangle,
  Clock,
  Shield,
} from 'lucide-react';

interface LandingPageViewProps {
  onNavigate: (view: string) => void;
  onSelectEntity: (entityId: string) => void;
  onStartDemoTour: () => void;
}

const ROLES = [
  {
    value: 'Investigator',
    label: 'DSP R. Sharma',
    rank: 'Deputy Superintendent of Police',
    badge: 'CPD-0047',
    access: 'FULL ACCESS — Investigation, Reports, Evidence',
  },
  {
    value: 'Analyst',
    label: 'P. Kaur',
    rank: 'Intelligence Analyst',
    badge: 'CPD-0112',
    access: 'READ ONLY — Analysis & Network Views',
  },
  {
    value: 'Administrator',
    label: 'Admin-01',
    rank: 'Technical Lead / Systems',
    badge: 'CPD-ADMIN',
    access: 'SYSTEM ACCESS — Audit, Configuration',
  },
];


const TICKER_ITEMS = [
  { label: 'ACTIVE CASES', value: '2', color: 'text-cyan-400' },
  { label: 'SUSPECT ENTITIES', value: '8', color: 'text-amber-400' },
  { label: 'OPEN ALERTS', value: '6', color: 'text-rose-400' },
  { label: 'EVIDENCE EXHIBITS', value: '16', color: 'text-emerald-400' },
  { label: 'WALLETS TRACKED', value: '6', color: 'text-purple-400' },
  { label: 'TIMELINE EVENTS', value: '20', color: 'text-blue-400' },
];

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onNavigate }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Ticker rotation
  useEffect(() => {
    const t = setInterval(() => setTickerIndex(i => (i + 1) % TICKER_ITEMS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleLogin = () => {
    if (pin.length < 4) {
      setLoginError('Enter your 4-digit access PIN.');
      return;
    }
    setLoginLoading(true);
    setLoginError('');
    setTimeout(() => {
      setLoginLoading(false);
      onNavigate('home');
    }, 1100);
  };

  const ticker = TICKER_ITEMS[tickerIndex];

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col overflow-hidden relative">

      {/* ── Animated background grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Top status bar ── */}
      <div className="relative z-10 border-b border-white/[0.05] bg-[#06090F]/90 backdrop-blur-sm px-6 py-2.5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-500">SYSTEM ONLINE</span>
          </div>
          <span className="text-slate-700">|</span>
          <span>CHANDIGARH POLICE · CYBER NARCOTICS DIVISION</span>
          <span className="text-slate-700">|</span>
          <span>HACKATHON TRACK 3 — PROTOTYPE</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <div className={`flex items-center gap-2 transition-all ${ticker.color}`}>
            <span className="text-slate-600 text-[10px]">{ticker.label}</span>
            <span className="font-bold text-sm">{ticker.value}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{time.toLocaleTimeString('en-IN', { hour12: false })}</span>
          </div>
        </div>
      </div>

      {/* ── Main content — full width ── */}
      <div className="flex-1 flex relative z-10">

        {/* ════════════════════════════════
            HERO CONTENT
            ════════════════════════════════ */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 gap-10">

          {/* Hero text */}
          <div className="text-center max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-[11px] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              CLASSIFIED — AUTHORISED PERSONNEL ONLY
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight tracking-tight">
              Dark Web & Encrypted<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Drug Intelligence Operations
              </span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed font-sans max-w-lg mx-auto">
              Intelligence fusion platform for detecting illicit drug sales on darknet markets
              and encrypted communication channels. Built for Chandigarh Police — Hackathon Track 3.
            </p>
          </div>

          {/* Dynamic case stats grid */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
            {[
              { label: 'Active Cases', value: '2', sub: 'CHD-0047 · CHD-0012', color: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400' },
              { label: 'Threat Level', value: 'CRITICAL', sub: 'Score 87/100', color: 'border-rose-500/20 bg-rose-500/5 text-rose-400' },
              { label: 'Open Alerts', value: '6', sub: '3 unacknowledged', color: 'border-amber-500/20 bg-amber-500/5 text-amber-400' },
            ].map(s => (
              <div key={s.label} className={`rounded border ${s.color} px-4 py-3.5 text-center`}>
                <div className={`text-2xl font-bold font-mono ${s.color.split(' ').find(c => c.startsWith('text-'))}`}>{s.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
                <div className="text-[10px] text-slate-600 mt-0.5 font-mono">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Primary action */}
          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#06090F] font-bold text-sm rounded transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
          >
            <LogIn className="w-4 h-4" />
            Sign In as Investigator
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════
          LOGIN MODAL
          ════════════════════════════════ */}
      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}
        >
          <div className="w-full max-w-sm bg-[#0A0E17] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">

            {/* Modal header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-100 font-mono tracking-wide">SECURE ACCESS</div>
                <div className="text-[11px] text-slate-500">Chandigarh Police · Narcotics Division</div>
              </div>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5">

              {/* Officer select */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Officer Identity
                </label>
                <div className="space-y-1.5">
                  {ROLES.map(r => (
                    <button
                      key={r.value}
                      onClick={() => setSelectedRole(r)}
                      className={`w-full flex items-start gap-3 px-3.5 py-3 rounded border text-left transition-all ${
                        selectedRole.value === r.value
                          ? 'border-cyan-500/40 bg-cyan-500/8 text-slate-100'
                          : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/[0.12] hover:text-slate-300'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${selectedRole.value === r.value ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                      <div>
                        <div className="text-[12px] font-semibold">{r.label}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{r.rank} · {r.badge}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{r.access}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PIN input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3 h-3" /> Access PIN
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={e => { setPin(e.target.value.slice(0, 4)); setLoginError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    maxLength={4}
                    placeholder="••••"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 rounded px-3.5 py-2.5 text-slate-200 text-sm font-mono tracking-[0.4em] outline-none placeholder:tracking-normal placeholder:text-slate-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" /> {loginError}
                  </p>
                )}
                <p className="text-[10px] text-slate-600 font-mono">For prototype: enter any 4-digit PIN</p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-6 flex gap-2.5">
              <button
                onClick={() => setShowLogin(false)}
                className="flex-1 py-2.5 rounded border border-white/[0.07] text-slate-500 hover:text-slate-300 text-[12px] font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="flex-2 flex-[2] flex items-center justify-center gap-2 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-[#06090F] font-bold text-[12px] font-mono transition-all"
              >
                {loginLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#06090F]/30 border-t-[#06090F] rounded-full animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    Authenticate & Enter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
