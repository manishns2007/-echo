import React, { useEffect, useState } from 'react';
import { 
  MessageSquareCode, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2,
  FileCheck,
  Lock
} from 'lucide-react';
import { EncryptedPlatformRecord } from '../types/intelligence';
import { api } from '../services/api';

interface EncryptedPlatformViewProps {
  onSelectEntity: (id: string) => void;
}

export const EncryptedPlatformView: React.FC<EncryptedPlatformViewProps> = ({
  onSelectEntity
}) => {
  const [records, setRecords] = useState<EncryptedPlatformRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const data = await api.getEncryptedPlatformRecords();
        setRecords(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const filtered = records.filter((r) => 
    !searchTerm ||
    r.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.related_alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.platform_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <MessageSquareCode className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Encrypted Platform Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Publicly & lawfully collected communication identifiers, vendor contact handles, and automated correlation records
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold uppercase">
            12 Correlated Handles
          </span>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-900/50 text-xs text-slate-300 flex items-start space-x-3">
        <Lock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-0.5">
          <span className="font-bold text-purple-300 uppercase">Provenance & Lawful Intelligence Standard:</span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Intelligence records displayed below originate exclusively from lawfully accessible public darknet listings, forum profiles, lawful intercepts, and authorized investigator-provided evidence. The system does not claim unauthorized platform decryption.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs max-w-md">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search handle, alias, or platform..."
          className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs font-mono"
        />
      </div>

      {/* Records Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold">
                  {rec.platform_name}
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">
                  {rec.confidence_score}% Confidence
                </span>
              </div>

              <div className="mt-2.5">
                <div className="font-mono font-bold text-slate-100 text-base select-all">
                  {rec.identifier}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Observed Role: <span className="text-slate-200 font-semibold">{rec.observed_role}</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[10px]">Linked Alias:</span>
                <span className="font-bold text-rose-300">{rec.related_alias}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[10px]">Substance Focus:</span>
                <span className="text-emerald-300 text-[11px] font-medium">{rec.substance_focus}</span>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                Provenance: <span className="text-slate-400">{rec.provenance_source}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[10px] font-mono text-cyan-400">Ref: {rec.evidence_id}</span>
              <button
                onClick={() => onSelectEntity(rec.linked_entity_id)}
                className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1"
              >
                <span>Inspect Entity</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
