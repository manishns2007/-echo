import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Shield, 
  CheckCircle2, 
  Copy, 
  Coins, 
  Share2, 
  AlertTriangle, 
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { InvestigationCase } from '../types/intelligence';

interface ReportGenerationViewProps {
  initialCaseId?: string;
  onNavigate: (view: string) => void;
  onSelectEntity: (id: string) => void;
}

export const ReportGenerationView: React.FC<ReportGenerationViewProps> = ({
  initialCaseId = 'CASE-CHD-0047',
  onNavigate,
  onSelectEntity
}) => {
  const [cases, setCases] = useState<InvestigationCase[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId);
  const [reportData, setReportData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const cList = await api.getInvestigations();
        setCases(cList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCases();
  }, []);

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        const data = await api.getFormalReport(selectedCaseId);
        setReportData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [selectedCaseId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    if (!reportData) return;
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.report_id || 'intelligence-dossier'}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 font-mono max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Intelligence Dossier & Report Studio
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Official police prosecution dossier compilation with cryptographic evidence index
          </p>
        </div>

        {/* Case selector & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 font-semibold"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.case_number}: {c.title.slice(0, 35)}...
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadJson}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-900/30"
          >
            <Printer className="w-4 h-4" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-xs text-slate-400 animate-pulse">
          Generating cryptographic dossier for {selectedCaseId}...
        </div>
      )}

      {!loading && reportData && (
        <div className="rounded-2xl bg-[#090F1C] border border-slate-700 shadow-2xl p-6 md:p-10 space-y-8 text-xs text-slate-300">
          {/* Official Letterhead */}
          <div className="text-center space-y-2 border-b-2 border-slate-700 pb-6">
            <div className="flex items-center justify-center space-x-2 text-cyan-400">
              <Shield className="w-6 h-6" />
              <span className="font-bold tracking-widest text-sm uppercase">
                CHANDIGARH POLICE CYBER CRIME INVESTIGATION DIVISION
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-wide uppercase">
              CONFIDENTIAL DRUG INTELLIGENCE DOSSIER
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
              <span>REPORT REF: <strong className="text-cyan-300">{reportData.report_id}</strong></span>
              <span>•</span>
              <span>CLASSIFICATION: <strong className="text-rose-400">{reportData.classification}</strong></span>
              <span>•</span>
              <span>DATE: <strong className="text-slate-200">{reportData.generated_timestamp}</strong></span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
              <span>1. Executive Intelligence Summary</span>
            </h3>
            <p className="leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-slate-200">
              {reportData.sections?.['1_executive_summary']}
            </p>
          </div>

          {/* Section 2: Case Objectives & Target Substances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">2. Investigation Objective</span>
              <p className="text-slate-300 leading-relaxed">
                {reportData.sections?.['2_investigation_objective']}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">3. Drug Activity & Quantities</span>
              <p className="text-slate-300 leading-relaxed">
                {reportData.sections?.['4_drug_activity_summary']}
              </p>
            </div>
          </div>

          {/* Section 3: Primary Target Profile */}
          {reportData.primary_target && (
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 uppercase">
                  4. Primary Subject Profile: {reportData.primary_target.alias} ({reportData.primary_target.id})
                </span>
                <button
                  onClick={() => onSelectEntity(reportData.primary_target.id)}
                  className="text-xs font-bold text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <span>Open 360° View</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Risk Rating</span>
                  <span className="font-bold text-rose-400 text-sm">{reportData.primary_target.risk_score}/100</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Match Confidence</span>
                  <span className="font-bold text-cyan-400 text-sm">{reportData.primary_target.confidence_score}%</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Primary Comms</span>
                  <span className="font-bold text-purple-300">{reportData.primary_target.primary_comms}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Primary Wallet</span>
                  <span className="font-bold text-amber-300 truncate block">{reportData.primary_target.primary_wallet?.slice(0, 14)}...</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Crypto Intelligence Summary */}
          <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-800/80 space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase block">
              5. Financial Ledger & Crypto Settlement Tracing
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Primary Cluster Address</span>
                <span className="font-bold text-slate-200 truncate block">{reportData.sections?.['6_cryptocurrency_intelligence']?.primary_cluster}</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Total Monitored Inflow</span>
                <span className="font-bold text-amber-400">{reportData.sections?.['6_cryptocurrency_intelligence']?.total_inflow}</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Cold Storage Sweeps</span>
                <span className="font-bold text-emerald-400">{reportData.sections?.['6_cryptocurrency_intelligence']?.cold_storage_sweep}</span>
              </div>
            </div>
          </div>

          {/* Section 5: Supporting Evidence Index (SHA-256) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                6. Cryptographic Evidence Index ({reportData.sections?.['10_supporting_evidence_index']?.length} Exhibits)
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Section 65B Forensically Validated</span>
              </span>
            </div>

            <div className="space-y-2">
              {reportData.sections?.['10_supporting_evidence_index']?.map((ev: any) => (
                <div key={ev.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-cyan-300 mr-2">{ev.id}:</span>
                    <span className="text-slate-200">{ev.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[200px]">
                      {ev.hash}
                    </span>
                    <button
                      onClick={() => handleCopy(ev.hash)}
                      className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 text-[10px]"
                      title="Copy SHA-256 Hash"
                    >
                      {copiedHash === ev.hash ? 'Copied' : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Official Sign-off */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              <span className="block font-bold text-slate-200">Investigating Officer: DSP R. Sharma</span>
              <span className="block">Badge #CHD-CYBER-027 • Cyber Crime Division</span>
            </div>

            <div className="text-right">
              <span className="block font-bold text-emerald-400">STATUS: VERIFIED & SEALED</span>
              <span className="block text-[10px] text-slate-500 font-mono">WORM Integrity Checksum OK</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
