import React from 'react';
import {
  Shield,
  ArrowRight,
  Share2,
  Briefcase,
  Coins,
  Pill,
  MessageSquareCode,
  FileText,
  Database,
  Lock,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

interface LandingPageViewProps {
  onNavigate: (view: string) => void;
  onSelectEntity: (entityId: string) => void;
  onStartDemoTour: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigate,
  onSelectEntity,
  onStartDemoTour
}) => {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Dot Matrix & Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Sleek Navigation Header */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-800/40">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-blue-600 p-[1.5px] shadow-lg shadow-purple-950/40">
            <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center font-black text-rose-400 text-base">
              N
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-mono font-black text-slate-100 text-base tracking-widest">
              NARCO-FUSION
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold uppercase">
              AI OPS
            </span>
          </div>
        </div>

        {/* Header Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono text-slate-400">
          <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
          <a href="#options" className="hover:text-cyan-300 transition-colors">Modules</a>
          <a href="#architecture" className="hover:text-cyan-300 transition-colors">Architecture</a>
          <button 
            onClick={onStartDemoTour}
            className="hover:text-amber-400 transition-colors flex items-center space-x-1"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Jury Demo Tour</span>
          </button>
        </nav>

        {/* Enter Platform CTA */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/60 hover:border-blue-400 text-blue-300 font-mono text-xs font-bold transition-all shadow-md shadow-blue-950/50"
          >
            Enter Platform
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center space-y-7">
        {/* Glowing Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-600/40 text-blue-300 text-xs font-mono tracking-wider shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold uppercase text-[11px]">DIGITAL NARCOTICS FORENSICS REDEFINED</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
          AI-Assisted Digital
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Drug Investigation Platform
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
          Transform digital evidence into actionable intelligence through automated analysis, entity extraction, cryptocurrency tracing, and multi-source timeline reconstruction.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono">
          <button
            onClick={() => onNavigate('investigations')}
            className="flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-xl shadow-blue-600/30 hover:scale-[1.02]"
          >
            <span>Launch Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm transition-all hover:scale-[1.02]"
          >
            Explore Features
          </button>
        </div>
      </section>

      {/* 3. Direct Options Grid (4 Core Pathways) */}
      <section id="options" className="relative z-20 max-w-6xl mx-auto px-6 py-12 space-y-6 font-mono">
        <div className="text-center space-y-1.5">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">DIRECT ACCESS WORKSPACES</span>
          <h2 className="text-2xl font-bold text-slate-100">Select an Intelligence Module</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Home Command Center */}
          <div
            onClick={() => onNavigate('home')}
            className="p-6 rounded-2xl bg-[#090E1A]/80 border border-cyan-800/40 hover:border-cyan-400 transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 block uppercase font-bold">localhost:5173/home</span>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300">Command Center</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Executive threat monitoring, critical alerts triage, live darknet feeds, and platform-wide metrics.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-cyan-400 text-xs font-bold pt-2 border-t border-slate-800">
              <span>Open Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Investigation Panel */}
          <div
            onClick={() => onNavigate('investigations')}
            className="p-6 rounded-2xl bg-[#090E1A]/80 border border-emerald-800/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 block uppercase font-bold">localhost:5173/investigation-panel</span>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-emerald-300">Investigation Workspace</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Case #CHD-DRUG-0047 folder with 19 sealed digital exhibits, suspect targets, and prosecution summaries.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold pt-2 border-t border-slate-800">
              <span>Enter Workspace</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Agents & Network Graph */}
          <div
            onClick={() => onNavigate('agents')}
            className="p-6 rounded-2xl bg-[#090E1A]/80 border border-purple-800/40 hover:border-purple-400 transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-700/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-purple-400 block uppercase font-bold">localhost:5173/agents</span>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-purple-300">Agents & Network Graph</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                6 domain-specific Cytoscape visualizers for suspects, wallets, drug listings, and encrypted comms.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-purple-400 text-xs font-bold pt-2 border-t border-slate-800">
              <span>Explore Graphs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Report Generation */}
          <div
            onClick={() => onNavigate('report-generation')}
            className="p-6 rounded-2xl bg-[#090E1A]/80 border border-blue-800/40 hover:border-blue-400 transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-700/60 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-blue-400 block uppercase font-bold">localhost:5173/report-generation</span>
                <h3 className="font-bold text-slate-100 text-base group-hover:text-blue-300">Report Generation</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Generate, customize, print, and export 10-section official police intelligence dossiers with SHA-256 evidence index.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-blue-400 text-xs font-bold pt-2 border-t border-slate-800">
              <span>Generate Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Features Section */}
      <section id="features" className="relative z-20 max-w-6xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">BUILT FOR LAW ENFORCEMENT</span>
          <h2 className="text-3xl font-bold text-slate-100">End-to-End Digital Narcotics Forensics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <Coins className="w-6 h-6 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">Cryptocurrency Ledger Tracing</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Automated on-chain correlation linking vendor wallets (18.64 BTC), precursor payments (3.45 BTC), and cold storage sweeps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <Pill className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">Chemical Impurity Matching</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              GC-MS forensic report integration matching laboratory crystal synthesis signatures with seized dead-drop batches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <Lock className="w-6 h-6 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">WORM Evidence Vault</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Write-Once-Read-Many cryptographic vault sealing every crawled snapshot with SHA-256 checksums ready for legal prosecution.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="relative z-20 border-t border-slate-800/80 py-8 px-6 text-center text-xs font-mono text-slate-500">
        <p>CHANDIGARH POLICE HACKATHON — TRACK 3 PROTOTYPE</p>
        <p className="text-[11px] text-slate-600 mt-1">Platform for Detection of Illicit Drug Sales on Darknet and Other Encrypted Platforms</p>
      </footer>
    </div>
  );
};
