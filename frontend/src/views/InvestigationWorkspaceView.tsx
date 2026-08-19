import React, { useEffect, useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Users, 
  GitBranch, 
  Share2, 
  Database, 
  BellRing, 
  Radio, 
  Download, 
  CheckCircle2,
  ExternalLink,
  Lock,
  Layers
} from 'lucide-react';
import { InvestigationCase, EvidenceRecord, TimelineEvent } from '../types/intelligence';
import { api } from '../services/api';

interface InvestigationWorkspaceViewProps {
  initialCaseId?: string;
  onGenerateReport: (caseId: string) => void;
  onSelectEntity: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const InvestigationWorkspaceView: React.FC<InvestigationWorkspaceViewProps> = ({
  initialCaseId = 'CASE-CHD-0047',
  onGenerateReport,
  onSelectEntity,
  onNavigate
}) => {
  const [cases, setCases] = useState<InvestigationCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<InvestigationCase | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'timeline' | 'evidence' | 'report'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const data = await api.getInvestigations();
        setCases(data);
        const target = data.find((c) => c.id === initialCaseId || c.case_number === initialCaseId) || data[0];
        if (target) {
          const dossier = await api.getInvestigationDossier(target.id);
          setSelectedCase(dossier);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [initialCaseId]);

  const handleSelectCase = async (caseId: string) => {
    try {
      const dossier = await api.getInvestigationDossier(caseId);
      setSelectedCase(dossier);
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { id: 'overview', label: '1. Case Overview' },
    { id: 'entities', label: `2. Targets (${selectedCase?.linked_entities?.length || 0})` },
    { id: 'timeline', label: `3. Timeline (${selectedCase?.timeline_records?.length || 0})` },
    { id: 'evidence', label: `4. Evidence Exhibits (${selectedCase?.evidence_records?.length || 0})` },
    { id: 'report', label: '5. Intelligence Dossier' }
  ];

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Investigation Workspace & Case Dossiers
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured case management, multi-source digital exhibit aggregation, and formal intelligence dossiers
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedCase?.id || ''}
            onChange={(e) => handleSelectCase(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.case_number}: {c.title.slice(0, 45)}...
              </option>
            ))}
          </select>

          {selectedCase && (
            <button
              onClick={() => onGenerateReport(selectedCase.id)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-900/30"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Intelligence Report</span>
            </button>
          )}
        </div>
      </div>

      {selectedCase && (
        <div className="space-y-6">
          {/* Case Header Card */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0D1525] to-slate-900 border border-slate-700 p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-cyan-400 font-bold text-sm bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {selectedCase.case_number}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                    THREAT: {selectedCase.risk_level}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase">
                    STATUS: {selectedCase.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-100 mt-2">{selectedCase.title}</h2>
                <p className="text-xs text-slate-400 mt-1">Lead: {selectedCase.lead_investigator} | {selectedCase.jurisdiction}</p>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[80px]">
                  <span className="text-[10px] text-slate-500 uppercase block">Entities</span>
                  <span className="text-lg font-bold text-cyan-400">{selectedCase.linked_entities?.length || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[80px]">
                  <span className="text-[10px] text-slate-500 uppercase block">Sources</span>
                  <span className="text-lg font-bold text-purple-400">{selectedCase.linked_sources?.length || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[80px]">
                  <span className="text-[10px] text-slate-500 uppercase block">Evidence</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedCase.evidence_count}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {selectedCase.summary}
            </p>
          </div>

          {/* Tabs Navigation */}
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

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                  Investigation Objective
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCase.objective}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                  Target Controlled Substances
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.target_substances?.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Entities */}
          {activeTab === 'entities' && (
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Linked Suspect Entities & Syndicates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCase.linked_entities?.map((ent, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const entityId = ent.includes('INDRA_47') ? 'ENTITY-0047' : ent.split(' ')[0];
                      onSelectEntity(entityId);
                    }}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      <span className="font-bold text-slate-200 group-hover:text-cyan-300 text-xs">{ent}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Timeline */}
          {activeTab === 'timeline' && (
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Case Activity Timeline ({selectedCase.timeline_records?.length})
              </h3>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 pl-8">
                {selectedCase.timeline_records?.map((evt) => (
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

          {/* Tab 4: Evidence Exhibits */}
          {activeTab === 'evidence' && (
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Sealed Evidence Records ({selectedCase.evidence_records?.length})
              </h3>
              <div className="space-y-2.5">
                {selectedCase.evidence_records?.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-400">{ev.id}: {ev.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        {ev.integrity_status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{ev.description}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      SHA-256: {ev.sha256_hash}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Report Trigger */}
          {activeTab === 'report' && (
            <div className="p-8 text-center rounded-xl bg-slate-900/80 border border-cyan-800/60 space-y-4">
              <FileText className="w-12 h-12 text-cyan-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-100">Ready to Generate Official Intelligence Dossier</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Aggregates all 10 intelligence sections including executive summary, cross-platform correlations, cryptocurrency ledger analysis, and SHA-256 evidence indexes.
                </p>
              </div>
              <button
                onClick={() => onGenerateReport(selectedCase.id)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all shadow-lg"
              >
                Launch Intelligence Dossier Preview
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
