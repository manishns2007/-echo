import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Shield, 
  X, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface ReportViewerModalProps {
  reportData: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({
  reportData,
  isOpen,
  onClose
}) => {
  if (!isOpen || !reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `INTEL-DOSSIER-CHD-DRUG-0047.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const s = reportData.sections;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#0C121E] border border-cyan-800/80 rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col my-8 max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span>OFFICIAL DRUG INTELLIGENCE DOSSIER</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase font-bold">
                  {reportData.classification}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Case ID: {reportData.case_metadata?.case_number} | Ref: {reportData.report_id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Raw JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 text-xs text-slate-300 bg-[#090E17]">
          {/* Document Header Seal */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-cyan-400 font-bold text-sm tracking-wider">
                CHANDIGARH POLICE — CYBER CRIME & NARCOTICS INTELLIGENCE
              </div>
              <div className="text-slate-400 text-[11px]">
                Intelligence Fusion Operations Center | State Inter-Agency Coordination
              </div>
              <div className="text-slate-500 text-[10px]">
                Generated: {reportData.generated_timestamp} | System: NARCO-FUSION v1.0.4
              </div>
            </div>
            <div className="text-right font-mono text-[11px] space-y-1">
              <div className="text-rose-400 font-bold">THREAT LEVEL: CRITICAL (87/100)</div>
              <div className="text-slate-400">Lead Investigator: DSP R. Sharma</div>
              <div className="text-slate-500">Security Hash: 8a71...99ef (VERIFIED)</div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-1">
              <span>1. Executive Summary</span>
            </h3>
            <p className="leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/80 text-slate-200">
              {s["1_executive_summary"]}
            </p>
          </div>

          {/* Section 2 & 3: Objective & Key Entities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
                2. Investigation Objective
              </h3>
              <p className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-slate-300 leading-relaxed">
                {s["2_investigation_objective"]}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
                3. Key Target Entities
              </h3>
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 space-y-1.5">
                {s["3_key_entities"]?.map((ent: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span className="font-semibold text-slate-200">{ent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Drug Activity Summary */}
          <div className="space-y-2">
            <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
              4. Illicit Substance Intelligence
            </h3>
            <p className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-slate-300 leading-relaxed">
              {s["4_drug_activity_summary"]}
            </p>
          </div>

          {/* Section 5: Cross-Platform Correlations */}
          <div className="space-y-2">
            <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
              5. Cross-Platform Fusion & Identity Resolution
            </h3>
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 space-y-2">
              {s["5_cross_platform_correlations"]?.map((c: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-200 leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6 & 7: Crypto & Network Centrality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
                6. Cryptocurrency Intelligence
              </h3>
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-[11px] space-y-1.5">
                <div><span className="text-slate-500">Primary Wallet:</span> <span className="font-mono text-amber-300">{s["6_cryptocurrency_intelligence"]?.primary_cluster}</span></div>
                <div><span className="text-slate-500">Estimated Balance:</span> <span className="font-semibold text-slate-200">{s["6_cryptocurrency_intelligence"]?.balance}</span></div>
                <div><span className="text-slate-500">Total Inflow:</span> <span className="text-emerald-400 font-semibold">{s["6_cryptocurrency_intelligence"]?.total_inflow}</span></div>
                <div><span className="text-slate-500">Cold Vault Sweeps:</span> <span className="text-slate-300">{s["6_cryptocurrency_intelligence"]?.cold_storage_sweep}</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
                7. Network Centrality & Hierarchy
              </h3>
              <p className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
                {s["7_network_centrality_analysis"]}
              </p>
            </div>
          </div>

          {/* Section 9: Explainable Risk Assessment */}
          <div className="space-y-2">
            <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
              9. Transparent Risk Assessment (87/100)
            </h3>
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-rose-300 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Threat Tier: {s["9_risk_assessment"]?.threat_tier}</span>
              </div>
              <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                {s["9_risk_assessment"]?.primary_threat_drivers?.map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 10: Supporting Evidence Index */}
          <div className="space-y-2">
            <h3 className="text-cyan-300 font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1">
              10. Supporting Evidence Index (Cryptographically Hashed)
            </h3>
            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Evidence ID</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">SHA-256 Hash</th>
                    <th className="p-2">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 bg-slate-900/40">
                  {s["10_supporting_evidence_index"]?.map((ev: any) => (
                    <tr key={ev.id} className="hover:bg-slate-900/80">
                      <td className="p-2 font-mono font-bold text-cyan-400">{ev.id}</td>
                      <td className="p-2">{ev.title}</td>
                      <td className="p-2 font-mono text-slate-400 text-[10px]">{ev.hash.slice(0, 16)}...</td>
                      <td className="p-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                          {ev.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400 space-y-1">
            <div className="font-bold text-slate-300 uppercase">Operational Disclaimer</div>
            <p>
              This intelligence summary has been compiled for investigative decision-support and tactical lead generation. All digital records and cryptocurrency associations constitute intelligence leads requiring formal judicial warrant and evidentiary corroboration prior to prosecution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
