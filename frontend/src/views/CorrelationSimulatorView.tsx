import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Info,
  RefreshCw,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

export const CorrelationSimulatorView: React.FC = () => {
  const [params, setParams] = useState({
    alias_match: true,
    wallet_overlap: true,
    comms_match: true,
    temporal_proximity: true,
    substance_overlap: true,
    pgp_link: true
  });

  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const data = await api.calculateCorrelation(params);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [params]);

  const toggleParam = (key: keyof typeof params) => {
    setParams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Deterministic Correlation Rule Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent, rule-weighted entity resolution algorithms replacing black-box AI heuristics
          </p>
        </div>

        <button
          onClick={calculate}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-cyan-500"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Recalculate Signals</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Signal Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Configurable Fusion Indicators
            </h2>

            <div className="space-y-3">
              {[
                { key: 'alias_match', label: 'Exact Darknet Alias Match across independent marketplaces', weight: '+30 pts', desc: 'Identical seller handle observed on AbyssMarket and SilkForge' },
                { key: 'wallet_overlap', label: 'Cryptographic Wallet Re-use / Direct On-Chain Settlement', weight: '+30 pts', desc: 'Deposit address bc1q92fa... co-signed multi-BTC escrow' },
                { key: 'comms_match', label: 'Encrypted Platform Identifier Match (@indra_ops)', weight: '+25 pts', desc: 'Vendor contact bio references verified Telegram / Session account' },
                { key: 'temporal_proximity', label: 'Temporal Dispatch Sequence & Synchronization (<30 min)', weight: '+15 pts', desc: 'Listings published simultaneously across separate platforms' },
                { key: 'substance_overlap', label: 'Substance Category & Impurity Profile Overlap (MDMA / Ketamine)', weight: '+10 pts', desc: 'Identical chemical batch assay and packaging stamps' },
                { key: 'pgp_link', label: 'Cryptographic PGP Public Key Subkey Fingerprint', weight: '+10 pts', desc: 'Shared PGP encryption key in marketplace vendor store metadata' }
              ].map((item) => {
                const isActive = (params as any)[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => toggleParam(item.key as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
                      isActive
                        ? 'bg-slate-950 border-cyan-500/60 shadow-md shadow-cyan-950/20'
                        : 'bg-slate-950/50 border-slate-800/80 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                          isActive ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isActive ? '✓' : ''}
                        </span>
                        <span className="font-bold text-slate-200 text-xs">{item.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5.5">{item.desc}</p>
                    </div>

                    <span className={`px-2.5 py-1 rounded font-bold text-xs font-mono flex-shrink-0 ${
                      isActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {item.weight}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Output Score & Explainability */}
        <div className="lg:col-span-5 space-y-4">
          {result && (
            <div className="rounded-xl bg-slate-900/90 border border-cyan-800/80 p-6 shadow-xl space-y-5">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                  Computed Correlation Confidence
                </span>
                <div className="text-5xl font-bold font-mono text-cyan-400">
                  {result.confidence_score}%
                </div>
                <div className="inline-block px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold text-xs">
                  {result.confidence_tier}
                </div>
              </div>

              {/* Contributing Signal Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Active Contributing Match Signals ({result.signals.length}):
                </span>
                <div className="space-y-1.5">
                  {result.signals.map((sig: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-300">{sig.signal}</span>
                      <span className="font-bold text-cyan-300">{sig.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainability Note */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Explainability Guarantee</span>
                </div>
                <p>{result.explainability_note}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
