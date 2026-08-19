import React, { useEffect, useState } from 'react';
import { 
  Database, 
  Search, 
  FileCheck, 
  Lock, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { EvidenceRecord } from '../types/intelligence';
import { api } from '../services/api';

export const EvidenceVaultView: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true);
      try {
        const data = await api.getEvidence();
        setEvidenceList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    try {
      await api.verifyEvidence(id);
      setTimeout(() => {
        setVerifyingId(null);
        setVerifiedMap((prev) => ({ ...prev, [id]: true }));
      }, 400);
    } catch (err) {
      setVerifyingId(null);
      console.error(err);
    }
  };

  const filtered = evidenceList.filter((ev) => 
    !searchTerm ||
    ev.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.sha256_hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Cryptographic Evidence Vault & Chain-of-Custody
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            WORM-compliant digital forensics archive sealed with SHA-256 integrity verification hashes ({evidenceList.length} Exhibits)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% SHA-256 Cryptographically Sealed</span>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs max-w-md">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search evidence ID, title, SHA-256 hash..."
          className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs font-mono"
        />
      </div>

      {/* Evidence Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Exhibit ID</th>
                <th className="p-3">Title & Classification</th>
                <th className="p-3">Source Origin</th>
                <th className="p-3">Collection Date</th>
                <th className="p-3">SHA-256 Hash</th>
                <th className="p-3">Chain of Custody</th>
                <th className="p-3 text-right">Integrity Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300">
              {filtered.map((ev) => {
                const isVerified = verifiedMap[ev.id];
                return (
                  <tr key={ev.id} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-3 font-bold font-mono text-cyan-400">{ev.id}</td>
                    <td className="p-3 max-w-xs">
                      <div className="font-semibold text-slate-100">{ev.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{ev.description}</div>
                    </td>
                    <td className="p-3 text-slate-300 text-[11px]">{ev.source_origin}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{ev.collection_timestamp.split('T')[0]}</td>
                    <td className="p-3 font-mono text-[10px] text-slate-400">
                      <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        {ev.sha256_hash.slice(0, 14)}...
                      </span>
                    </td>
                    <td className="p-3 text-[10px] text-slate-400 max-w-xs truncate">
                      {ev.chain_of_custody}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleVerify(ev.id)}
                        disabled={verifyingId === ev.id}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all inline-flex items-center space-x-1 ${
                          isVerified
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold'
                            : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700'
                        }`}
                      >
                        {isVerified ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>VERIFIED</span>
                          </>
                        ) : verifyingId === ev.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
                            <span>Checking...</span>
                          </>
                        ) : (
                          <>
                            <FileCheck className="w-3 h-3 text-cyan-400" />
                            <span>Verify Hash</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
