import React from 'react';
import {
  Briefcase,
  AlertTriangle,
  Pill,
  Users,
  Coins,
  Share2,
  TrendingUp,
  Radio,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Zap,
  Lock,
  ExternalLink,
  Flame
} from 'lucide-react';
import { SystemStats, AlertRecord, TimelineEvent } from '../types/intelligence';

interface CommandCenterProps {
  stats: SystemStats | null;
  alerts: AlertRecord[];
  liveFeed: TimelineEvent[];
  onNavigate: (view: string) => void;
  onSelectEntity: (entityId: string) => void;
  onSelectAlert: (alertId: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  stats,
  alerts,
  liveFeed,
  onNavigate,
  onSelectEntity,
  onSelectAlert
}) => {
  const kpis = [
    {
      id: 'investigations',
      label: 'ACTIVE INVESTIGATIONS',
      value: stats?.kpis.active_investigations || 12,
      sub: '4 High-Priority Cartels',
      icon: Briefcase,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40',
      borderColor: 'border-cyan-800/60',
      target: 'investigations'
    },
    {
      id: 'alerts',
      label: 'HIGH-RISK ALERTS',
      value: stats?.kpis.high_risk_alerts || '07',
      sub: '3 Critical Identity Matches',
      icon: AlertTriangle,
      color: 'text-rose-400',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-800/60',
      pulse: true,
      target: 'alert-center'
    },
    {
      id: 'drugs',
      label: 'DRUG INDICATORS',
      value: stats?.kpis.drug_indicators || 184,
      sub: 'MDMA, Ketamine, Synthetic Opioids',
      icon: Pill,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-800/60',
      target: 'drug-intel'
    },
    {
      id: 'entities',
      label: 'LINKED ENTITIES',
      value: stats?.kpis.linked_entities || 63,
      sub: 'INDRA_47 & 18 Suspects',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/40',
      borderColor: 'border-purple-800/60',
      target: 'entity-intel'
    },
    {
      id: 'wallets',
      label: 'SUSPICIOUS WALLETS',
      value: stats?.kpis.suspicious_wallets || 21,
      sub: '18.64 BTC Primary Cluster',
      icon: Coins,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-800/60',
      target: 'crypto-intel'
    },
    {
      id: 'networks',
      label: 'NETWORKS DETECTED',
      value: stats?.kpis.networks_detected || 8,
      sub: 'Cross-Market Hubs',
      icon: Share2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-950/40',
      borderColor: 'border-blue-800/60',
      target: 'network-graph'
    }
  ];

  return (
    <div className="space-y-6 font-mono pb-12">
      {/* Top Banner: Operations Center Status */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900 via-[#0C1424] to-slate-900 border border-cyan-800/50 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-cyan-500/5 pointer-events-none radar-grid"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                CYBER NARCOTICS FUSION ENGINE — STATUS: ONLINE
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
              Chandigarh Police Drug Intelligence Operations Center
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Automated multi-source correlation correlating darknet marketplace storefronts, encrypted platform identifiers, cryptocurrency settlement traces, and forensic evidence.
            </p>
          </div>

          {/* Quick Primary Target Action */}
          <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-lg border border-rose-800/60">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Primary Target:</div>
              <div className="text-sm font-bold text-rose-300">INDRA_47 (Entity-0047)</div>
              <div className="text-[10px] text-slate-400">Risk: 87/100 | Confidence: 91%</div>
            </div>
            <button
              onClick={() => onSelectEntity('ENTITY-0047')}
              className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md"
            >
              <span>Inspect Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (6 Main Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              onClick={() => onNavigate(kpi.target)}
              className={`p-4 rounded-xl border ${kpi.borderColor} ${kpi.bgColor} hover:bg-slate-900/90 transition-all cursor-pointer group shadow-sm hover:shadow-cyan-900/20 hover:scale-[1.02] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  {kpi.label}
                </span>
                <Icon
                  className={`w-4 h-4 ${kpi.color} ${
                    kpi.pulse ? 'animate-pulse' : ''
                  }`}
                />
              </div>

              <div className="my-2">
                <div className={`text-2xl md:text-3xl font-bold font-mono text-slate-100 ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{kpi.sub}</div>
              </div>

              <div className="text-[10px] text-slate-500 group-hover:text-cyan-400 flex items-center space-x-1 pt-1 border-t border-slate-800/60">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Operations Split (Left: High Risk Alert Center & Fusion Engine, Right: Live Intelligence Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: High-Priority Threat Triage & Cross-Source Fusion */}
        <div className="lg:col-span-7 space-y-6">
          {/* High-Risk Alert Box */}
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  High-Risk Alerts Requiring Triage
                </h2>
              </div>
              <button
                onClick={() => onNavigate('alert-center')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>View All (12)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {alerts.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  onClick={() => onSelectAlert(a.id)}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        a.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {a.severity}
                      </span>
                      <span className="font-bold text-slate-200 group-hover:text-cyan-300 text-xs">
                        {a.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">{a.timestamp.split('T')[1]?.slice(0, 8)}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {a.reason}
                  </p>

                  <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500">
                    <span>Source: <span className="text-slate-300">{a.source}</span></span>
                    <span className="text-cyan-400 font-semibold">Confidence: {a.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Source Correlation Showcase */}
          <div className="rounded-xl bg-slate-900/80 border border-cyan-900/50 p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Share2 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Automated Entity Correlation Cluster (INDRA_47)
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                91% MATCH CONFIDENCE
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 space-y-2 text-xs">
              <div className="font-semibold text-slate-200 flex items-center justify-between">
                <span>Unified Suspect Entity: INDRA_47</span>
                <span className="text-slate-400 text-[11px]">Entity ID: ENTITY-0047</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Darknet Seller</span>
                  <span className="text-slate-200 font-semibold">INDRA_47 (Abyss & SilkForge)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Communication ID</span>
                  <span className="text-purple-300 font-semibold">@indra_ops (Telegram)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Crypto Wallet</span>
                  <span className="text-amber-300 font-semibold">bc1q92fa...92fa</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Drug Indicators</span>
                  <span className="text-emerald-300 font-semibold">MDMA, Ketamine, Opioids</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Related Precursor Broker</span>
                  <span className="text-rose-300 font-semibold">VIPER_CORP (Entity-0018)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Historical Activity</span>
                  <span className="text-cyan-300 font-semibold">6 Listings / 19 Evidences</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400">Match Signals: Alias exact (+30), Wallet link (+30), Comms ID (+25)</span>
                <button
                  onClick={() => onNavigate('network-graph')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1"
                >
                  <span>Open Interactive Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Intelligence Stream Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  Live Intelligence Stream
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                STREAMING ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[520px] pr-1">
              {liveFeed.slice(0, 7).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-slate-400">{item.timestamp.split('T')[1]?.slice(0, 8)}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300' : item.severity === 'HIGH' ? 'bg-amber-950 text-amber-300' : 'bg-cyan-950 text-cyan-300'
                    }`}>
                      {item.event_type}
                    </span>
                  </div>

                  <div className="font-bold text-slate-200">
                    {item.title}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500 border-t border-slate-800/60">
                    <span>Source: {item.source}</span>
                    {item.evidence_id && (
                      <span className="text-cyan-400 font-mono">{item.evidence_id}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('live-feed')}
              className="w-full mt-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
            >
              <span>Open Dedicated Live Feed Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
