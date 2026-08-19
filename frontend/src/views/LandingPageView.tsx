import React from 'react';
import {
  Shield,
  Activity,
  Share2,
  Briefcase,
  Users,
  Coins,
  Pill,
  MessageSquareCode,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  FileCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Flame
} from 'lucide-react';
import { SystemStats, AlertRecord } from '../types/intelligence';

interface LandingPageViewProps {
  stats: SystemStats | null;
  alerts: AlertRecord[];
  onNavigate: (view: string) => void;
  onSelectEntity: (entityId: string) => void;
  onStartDemoTour: () => void;
  onOpenAssistant: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  stats,
  alerts,
  onNavigate,
  onSelectEntity,
  onStartDemoTour,
  onOpenAssistant
}) => {
  const primaryOptions = [
    {
      id: 'command-center',
      title: 'Command Operations Center',
      tag: 'EXECUTIVE DASHBOARD',
      desc: 'Central threat barometer, high-risk alert triage, live darknet feeds, and platform-wide metrics.',
      icon: Activity,
      color: 'from-blue-950/60 to-cyan-950/40 border-cyan-700/60 hover:border-cyan-400',
      iconColor: 'text-cyan-400',
      stats: '12 Active Cases • 7 Alerts',
      actionText: 'Enter Operations Center'
    },
    {
      id: 'network-graph',
      title: 'Network Intelligence Graph',
      tag: '6 DEDICATED GRAPHS',
      desc: 'Cytoscape.js visualizer separated into distinct topologies: Suspects, Wallets, Listings, Markets & Comms.',
      icon: Share2,
      color: 'from-purple-950/60 to-blue-950/40 border-purple-700/60 hover:border-purple-400',
      iconColor: 'text-purple-400',
      stats: '15 Suspects • 48 Links',
      actionText: 'Launch Graph Visualizer'
    },
    {
      id: 'investigations',
      title: 'Investigation Workspace',
      tag: 'CASE #CHD-DRUG-0047',
      desc: 'Dedicated case folder with 19 sealed digital exhibits, suspect targets, and 1-click official intelligence reports.',
      icon: Briefcase,
      color: 'from-emerald-950/60 to-teal-950/40 border-emerald-700/60 hover:border-emerald-400',
      iconColor: 'text-emerald-400',
      stats: 'DSP R. Sharma • CRITICAL',
      actionText: 'Open Case Workspace'
    },
    {
      id: 'entity-detail',
      targetEntityId: 'ENTITY-0047',
      title: 'Target INDRA_47 (360° Profile)',
      tag: 'PRIORITY SUSPECT',
      desc: '6-tab deep inspection of primary coordinator INDRA_47 with 87/100 risk score and 91% correlation confidence.',
      icon: Users,
      color: 'from-rose-950/60 to-pink-950/40 border-rose-700/60 hover:border-rose-400',
      iconColor: 'text-rose-400',
      stats: 'Risk: 87/100 • Match: 91%',
      actionText: 'Inspect 360° Dossier'
    },
    {
      id: 'crypto-intel',
      title: 'Cryptocurrency Intelligence',
      tag: 'BITCOIN FLOW TRACER',
      desc: 'Analyze primary wallet bc1q92fa... (18.64 BTC), trace 3.45 BTC precursor settlements, and cold storage vaults.',
      icon: Coins,
      color: 'from-amber-950/60 to-orange-950/40 border-amber-700/60 hover:border-amber-400',
      iconColor: 'text-amber-400',
      stats: '18.64 BTC Total Inflow',
      actionText: 'Trace Crypto Flows'
    },
    {
      id: 'drug-intel',
      title: 'Drug Intelligence & Analytics',
      tag: 'SUBSTANCE REGISTRY',
      desc: 'Analytics covering MDMA crystals, Ketamine, synthetic opioids, counterfeit Oxycodone, and precursor chemicals.',
      icon: Pill,
      color: 'from-indigo-950/60 to-purple-950/40 border-indigo-700/60 hover:border-indigo-400',
      iconColor: 'text-indigo-400',
      stats: '15 Active Darknet Listings',
      actionText: 'View Substance Analytics'
    },
    {
      id: 'encrypted-platforms',
      title: 'Encrypted Platform Intelligence',
      tag: 'HANDLE RESOLVER',
      desc: 'Publicly & lawfully collected communication handles (@indra_ops, Session IDs, Matrix endpoints) mapped to sellers.',
      icon: MessageSquareCode,
      color: 'from-cyan-950/60 to-blue-950/40 border-cyan-700/60 hover:border-cyan-400',
      iconColor: 'text-cyan-400',
      stats: '10 Correlated Handles',
      actionText: 'Inspect Comms Resolvers'
    },
    {
      id: 'evidence-vault',
      title: 'Cryptographic Evidence Vault',
      tag: 'SHA-256 FORENSICS',
      desc: 'WORM-compliant forensic evidence repository with one-click cryptographic hash verification for all 30 exhibits.',
      icon: Database,
      color: 'from-slate-900 to-slate-950 border-slate-700 hover:border-slate-500',
      iconColor: 'text-slate-300',
      stats: '30 Verified Exhibits',
      actionText: 'Verify Evidence Vault'
    }
  ];

  const handleCardClick = (opt: any) => {
    if (opt.targetEntityId) {
      onSelectEntity(opt.targetEntityId);
    } else {
      onNavigate(opt.id);
    }
  };

  return (
    <div className="space-y-10 font-mono max-w-7xl mx-auto pb-20 pt-2 animate-in fade-in duration-300">
      {/* 1. Hero Portal Header */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0B1324] via-[#090F1C] to-[#070B11] border border-cyan-600/40 p-8 md:p-12 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/60 text-cyan-300 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>CHANDIGARH POLICE CYBER CRIME DIVISION</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SYSTEM ONLINE • SECURE FUSION ENGINE</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
              NARCO-FUSION
            </h1>
            <p className="text-sm sm:text-base text-cyan-300 font-semibold tracking-wide">
              Darknet & Encrypted Platform Drug Intelligence Fusion Platform
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl pt-1">
              Advanced law-enforcement intelligence prototype designed for <strong>Chandigarh Police Hackathon (Track 3)</strong>. Transforms fragmented digital signals across darknet storefronts, encrypted messengers, and blockchain ledgers into verified, actionable drug intelligence.
            </p>
          </div>

          {/* Key Quick Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <button
              onClick={() => onNavigate('command-center')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
            >
              <span>Enter Operations Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartDemoTour}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-950 to-slate-900 border border-amber-600/60 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Start 10-Step Jury Presentation Tour</span>
            </button>

            <button
              onClick={onOpenAssistant}
              className="flex items-center space-x-2 px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Decision Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Platform Options Grid (8 Clean, High-Priority Clickable Cards) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>Platform Workspaces & Options</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any dedicated workspace below to begin targeted analysis:
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
            8 Specialized Modules Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {primaryOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                onClick={() => handleCardClick(opt)}
                className={`p-6 rounded-2xl bg-gradient-to-b ${opt.color} border transition-all cursor-pointer group shadow-xl flex flex-col justify-between space-y-4 hover:scale-[1.02]`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center ${opt.iconColor} group-hover:scale-110 transition-transform shadow-inner`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950/90 text-slate-300 border border-slate-800 uppercase tracking-wider">
                      {opt.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                      {opt.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5 line-clamp-3">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">{opt.stats}</span>
                  <div className="flex items-center space-x-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span className="text-[11px]">{opt.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Core Intelligence Pipeline Workflow Strip */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            End-to-End Drug Intelligence Pipeline
          </span>
          <span className="text-[11px] text-slate-500">Autonomous Correlation → Human-in-the-Loop Decision</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
          {[
            { step: '01', name: 'Collection', desc: 'Darknet & Encrypted Streams' },
            { step: '02', name: 'Correlation', desc: 'Alias, Wallet & Comms Overlap' },
            { step: '03', name: 'Risk Detection', desc: 'Explainable Score (87/100)' },
            { step: '04', name: 'Network Graph', desc: 'Multi-Hop Topology Analysis' },
            { step: '05', name: 'Investigation', desc: 'Case #CHD-DRUG-0047 Folder' },
            { step: '06', name: 'Actionable Intel', desc: 'SHA-256 Sealed Dossiers' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1">
              <span className="text-[10px] font-bold text-cyan-400 block">{item.step}</span>
              <span className="font-bold text-slate-200 text-xs block">{item.name}</span>
              <span className="text-[10px] text-slate-400 block leading-tight">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
