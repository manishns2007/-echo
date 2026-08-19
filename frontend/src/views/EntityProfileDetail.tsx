import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Pill, 
  Coins, 
  MessageSquareCode, 
  Share2, 
  Database, 
  GitBranch, 
  CheckCircle2, 
  ArrowLeft, 
  FileCheck, 
  ExternalLink,
  Lock,
  Layers,
  AlertTriangle,
  Info
} from 'lucide-react';
import { EntityDetail } from '../types/intelligence';
import { api } from '../services/api';

interface EntityProfileDetailProps {
  entityId: string;
  onBack: () => void;
  onNavigate: (view: string) => void;
  onSelectEntity: (id: string) => void;
}

export const EntityProfileDetail: React.FC<EntityProfileDetailProps> = ({
  entityId,
  onBack,
  onNavigate,
  onSelectEntity
}) => {
  const [entity, setEntity] = useState<EntityDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'connections' | 'sources' | 'evidence' | 'timeline'>('overview');
  const [loading, setLoading] = useState(true);
  const [verifyingHash, setVerifyingHash] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntity = async () => {
      setLoading(true);
      try {
        const data = await api.getEntityDetail(entityId);
        setEntity(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntity();
  }, [entityId]);

  const handleVerifyEvidence = async (evId: string) => {
    setVerifyingHash(evId);
    try {
      await api.verifyEvidence(evId);
      setTimeout(() => {
        setVerifyingHash(null);
        alert(`Evidence ${evId} SHA-256 integrity verified successfully.`);
      }, 500);
    } catch (err) {
      setVerifyingHash(null);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-cyan-400 font-mono space-y-3">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p>Loading 360° Profile for {entityId}...</p>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="p-8 text-center text-slate-400 font-mono">
        <p>Entity {entityId} not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 rounded bg-slate-800 text-slate-200">
          Go Back
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: '1. Overview & Risk' },
    { id: 'activity', label: `2. Drug Activity (${entity.listings?.length || 0})` },
    { id: 'connections', label: '3. Connections & Wallets' },
    { id: 'sources', label: `4. Sources (${entity.marketplaces?.length || 0})` },
    { id: 'evidence', label: `5. Evidence Vault (${entity.evidence?.length || 0})` },
    { id: 'timeline', label: `6. Timeline (${entity.timeline?.length || 0})` }
  ];

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Entity Directory</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('network-graph')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold hover:bg-cyan-900"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>View in Network Graph</span>
          </button>
          <button
            onClick={() => onNavigate('investigations')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-slate-600"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open Investigation Dossier</span>
          </button>
        </div>
      </div>

      {/* Entity Profile Header Card */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0E1524] to-slate-900 border border-slate-700/80 p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-rose-950/80 border-2 border-rose-500/60 flex items-center justify-center text-rose-400 shadow-inner">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-slate-100">{entity.alias}</h1>
                <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                  {entity.threat_level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {entity.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{entity.entity_type}</p>
            </div>
          </div>

          {/* Key Metric Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-rose-800/80 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-500 uppercase block">Risk Score</span>
              <span className="text-xl font-bold text-rose-400">{entity.risk_score} / 100</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-800/80 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-500 uppercase block">Confidence</span>
              <span className="text-xl font-bold text-cyan-400">{entity.confidence_score}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 uppercase block">Status</span>
              <span className="text-xs font-bold text-emerald-400">{entity.status}</span>
            </div>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
          {entity.summary}
        </p>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/80 text-slate-400">
          <div><span className="text-slate-500 block text-[10px]">Primary Comms:</span> <span className="font-semibold text-purple-300">{entity.primary_comms || 'N/A'}</span></div>
          <div><span className="text-slate-500 block text-[10px]">Primary Wallet:</span> <span className="font-semibold text-amber-300">{entity.primary_wallet ? entity.primary_wallet.slice(0, 14) + '...' : 'N/A'}</span></div>
          <div><span className="text-slate-500 block text-[10px]">First Observed:</span> <span className="text-slate-200">{entity.first_seen?.split('T')[0]}</span></div>
          <div><span className="text-slate-500 block text-[10px]">Last Intelligence Pulse:</span> <span className="text-slate-200">{entity.last_seen?.split('T')[0]}</span></div>
        </div>
      </div>

      {/* Navigation Tabs (6 Tabs) */}
      <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-slate-800 text-cyan-300 border-t-2 border-cyan-400 border-x border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Risk Breakdown */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deterministic Match Signals */}
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">
                    Deterministic Correlation Signals
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400">Total Weight: 91%</span>
              </div>

              <div className="space-y-2.5">
                {entity.match_signals?.map((sig, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span className="text-slate-200">{sig.signal}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                        +{sig.weight} pts
                      </span>
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold">
                        {sig.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explainable Contributing Risk Factors */}
            <div className="rounded-xl bg-slate-900/80 border border-rose-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">
                    Transparent Risk Breakdown (87/100)
                  </h3>
                </div>
                <span className="text-[10px] text-rose-300 font-bold uppercase">TIER: CRITICAL</span>
              </div>

              <div className="space-y-2.5">
                {entity.risk_breakdown?.map((rf, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{rf.factor}</span>
                      <span className="font-bold text-rose-400 text-xs">+{rf.score} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{rf.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Drug Activity */}
      {activeTab === 'activity' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
            Indexed Darknet Drug Listings for {entity.alias}
          </h3>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden">
            {entity.listings?.map((list) => (
              <div key={list.id} className="p-4 bg-slate-950 hover:bg-slate-900/80 transition-colors space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                      {list.substance}
                    </span>
                    <span className="font-bold text-slate-100 text-sm">{list.listing_title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                    Risk {list.risk_score}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-400">
                  <div><span className="text-slate-500">Marketplace:</span> <span className="text-slate-200">{list.source_marketplace}</span></div>
                  <div><span className="text-slate-500">Price Indicator:</span> <span className="text-amber-300 font-semibold">{list.price_indicator}</span></div>
                  <div><span className="text-slate-500">Purity Claim:</span> <span className="text-cyan-300">{list.purity_claim}</span></div>
                  <div><span className="text-slate-500">Origin / Route:</span> <span className="text-slate-300">{list.origin_country}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Connections & Wallets */}
      {activeTab === 'connections' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
              Linked Cryptocurrency Wallets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entity.wallets?.map((w) => (
                <div key={w.address} className="p-4 rounded-lg bg-slate-950 border border-amber-900/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-300">{w.address}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                      Risk {w.risk_score}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>Balance: <span className="text-slate-200 font-semibold">{w.balance_est}</span></div>
                    <div>Total Inflow: <span className="text-emerald-400">{w.total_received}</span> | Outflow: <span className="text-rose-400">{w.total_sent}</span></div>
                    <div>Cluster Tag: <span className="text-cyan-300">{w.cluster_tag}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Sources */}
      {activeTab === 'sources' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
            Lawfully Collected Source Origins
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {entity.marketplaces?.map((mkt, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-cyan-300">{mkt}</div>
                <p className="text-[11px] text-slate-400">
                  Simulated crawl snapshots archived in WORM compliant vault with SHA-256 checksums.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Evidence Vault */}
      {activeTab === 'evidence' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
            Supporting Forensic Evidence Records ({entity.evidence?.length})
          </h3>

          <div className="space-y-3">
            {entity.evidence?.map((ev) => (
              <div key={ev.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-cyan-400">{ev.id}</span>
                    <span className="font-bold text-slate-200">{ev.title}</span>
                  </div>
                  <button
                    onClick={() => handleVerifyEvidence(ev.id)}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[10px] flex items-center space-x-1"
                  >
                    <FileCheck className="w-3 h-3 text-cyan-400" />
                    <span>{verifyingHash === ev.id ? 'Verifying...' : 'Verify Hash'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">{ev.description}</p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                  <span>SHA-256: <span className="font-mono text-slate-400">{ev.sha256_hash}</span></span>
                  <span className="text-emerald-400 font-semibold">{ev.integrity_status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wider">
            Chronological Activity Escalation
          </h3>
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 pl-8">
            {entity.timeline?.map((evt) => (
              <div key={evt.id} className="relative space-y-1 text-xs">
                <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-950"></span>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold text-cyan-300">{evt.date_str}</span>
                  <span className="font-bold text-slate-200">{evt.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
