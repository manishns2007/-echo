import React from 'react';
import {
  Briefcase,
  AlertTriangle,
  Pill,
  Users,
  Coins,
  Share2,
  Radio,
  ArrowRight,
  Shield,
  MessageSquareCode,
  Sliders,
  Database,
  ExternalLink,
  Flame,
  FileCheck
} from 'lucide-react';
import { SystemStats, AlertRecord } from '../types/intelligence';

interface CommandCenterProps {
  stats: SystemStats | null;
  alerts: AlertRecord[];
  onNavigate: (view: string) => void;
  onSelectEntity: (entityId: string) => void;
  onSelectAlert: (alertId: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  stats,
  alerts,
  onNavigate,
  onSelectEntity,
  onSelectAlert
}) => {
  const topCriticalAlert = alerts.find((a) => a.severity === 'CRITICAL') || alerts[0];

  const modules = [
    {
      id: 'network-graph',
      title: 'Interactive Network Graph',
      subtitle: 'Cytoscape.js Cross-Platform Visualizer',
      description: 'Explore multi-hop relationships linking suspects, cryptocurrency deposit wallets, encrypted handles (@indra_ops), and darknet listings.',
      icon: Share2,
      badge: 'Interactive Canvas',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      accentColor: 'border-cyan-800/80 hover:border-cyan-500',
      iconColor: 'text-cyan-400',
      statLabel: 'Detected Nodes',
      statValue: '48 Nodes & Edges'
    },
    {
      id: 'investigations',
      title: 'Investigation Workspace',
      subtitle: 'Case #CHD-DRUG-0047 Dossier',
      description: 'Active case folder aggregating 8 linked target entities, 19 cryptographically sealed exhibits, and one-click official intelligence report generation.',
      icon: Briefcase,
      badge: 'Case Active',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      accentColor: 'border-emerald-800/80 hover:border-emerald-500',
      iconColor: 'text-emerald-400',
      statLabel: 'Lead Investigator',
      statValue: 'DSP R. Sharma'
    },
    {
      id: 'entity-intel',
      title: 'Entity Intelligence & 360°',
      subtitle: 'Suspect Directory & Risk Factors',
      description: 'Searchable directory of 15 suspect entities featuring 6 deep-inspection tabs, transparent risk breakdowns (87/100), and deterministic match weights.',
      icon: Users,
      badge: '15 Suspects',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      accentColor: 'border-rose-800/80 hover:border-rose-500',
      iconColor: 'text-rose-400',
      statLabel: 'Primary Target',
      statValue: 'INDRA_47 (CRITICAL)'
    },
    {
      id: 'crypto-intel',
      title: 'Cryptocurrency Intelligence',
      subtitle: 'Bitcoin Flow & Precursor Tracing',
      description: 'Track 8 monitored wallets, analyze 18.64 BTC transaction inflows, and trace 3.45 BTC precursor settlements between INDRA_47 and VIPER_CORP.',
      icon: Coins,
      badge: '18.64 BTC Primary',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      accentColor: 'border-amber-800/80 hover:border-amber-500',
      iconColor: 'text-amber-400',
      statLabel: 'Cold Storage Vault',
      statValue: '12.45 BTC Swept'
    },
    {
      id: 'drug-intel',
      title: 'Drug Intelligence & Analytics',
      subtitle: 'Substance Breakdown & Pricing',
      description: 'Analytics covering MDMA crystals, Ketamine shards, novel synthetic opioids, counterfeit Oxycodone, and precursor chemicals across darknet markets.',
      icon: Pill,
      badge: '15 Active Listings',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      accentColor: 'border-purple-800/80 hover:border-purple-500',
      iconColor: 'text-purple-400',
      statLabel: 'Surge Velocity',
      statValue: '+84% Monthly Influx'
    },
    {
      id: 'encrypted-platforms',
      title: 'Encrypted Platform Intelligence',
      subtitle: 'Identifier Cross-Resolution',
      description: 'Publicly & lawfully collected communication handles (@indra_ops, Session IDs, Matrix endpoints) mapped directly to darknet seller personas.',
      icon: MessageSquareCode,
      badge: '10 Correlated Handles',
      badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
      accentColor: 'border-blue-800/80 hover:border-blue-500',
      iconColor: 'text-blue-400',
      statLabel: 'Correlation Accuracy',
      statValue: '91% Confidence'
    }
  ];

  return (
    <div className="space-y-8 font-mono max-w-7xl mx-auto pb-16">
      {/* 1. Executive Operations Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0C121E] via-[#0E1729] to-[#0C121E] border border-cyan-800/50 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                DRUG INTELLIGENCE FUSION SYSTEM • CHANDIGARH POLICE
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
              Intelligence Operations Center
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Law-enforcement intelligence fusion engine correlating darknet marketplace vendor personas, encrypted communication handles, and cryptocurrency settlement flows into actionable evidence.
            </p>
          </div>

          {/* Primary Target Spotlight Card */}
          <div className="w-full lg:w-auto p-4 rounded-xl bg-slate-950/90 border border-rose-800/80 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Priority Suspect Target</span>
              <div className="text-lg font-bold text-rose-300">INDRA_47 (Entity-0047)</div>
              <div className="text-xs text-slate-400 font-mono">
                Risk: <span className="text-rose-400 font-bold">87/100</span> | Confidence: <span className="text-cyan-400 font-bold">91%</span>
              </div>
            </div>

            <button
              onClick={() => onSelectEntity('ENTITY-0047')}
              className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-rose-950/50"
            >
              <span>Inspect 360° Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top High-Risk Alert Notice */}
      {topCriticalAlert && (
        <div 
          onClick={() => onSelectAlert(topCriticalAlert.id)}
          className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-600/50 hover:border-rose-400 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-600/60 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Flame className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {topCriticalAlert.severity}
                </span>
                <span className="font-bold text-slate-100 text-xs group-hover:text-cyan-300">
                  {topCriticalAlert.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {topCriticalAlert.reason}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-rose-300 font-bold group-hover:text-cyan-300 flex-shrink-0">
            <span>Triage Alert in Center</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* 3. Dedicated Intelligence Module Hubs (6 Clean, Clickable Gateways) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 text-slate-200">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Dedicated Intelligence Modules & Workspaces
            </h2>
          </div>
          <span className="text-xs text-slate-500">Select any module to open dedicated workspace</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className={`p-6 rounded-2xl bg-[#0B101C] border ${m.accentColor} hover:bg-[#0E1526] transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4 hover:scale-[1.01]`}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${m.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.badgeColor}`}>
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                      {m.title}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.subtitle}</div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">{m.statLabel}</span>
                    <span className="font-bold text-slate-200 text-xs font-mono">{m.statValue}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Actions / Governance Strip */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3 text-slate-400">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Evidence Vault: <strong className="text-slate-200">30 exhibits</strong> with SHA-256 integrity verification</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('evidence-vault')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Open Evidence Vault
          </button>
          <button
            onClick={() => onNavigate('timeline')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            View Full Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
