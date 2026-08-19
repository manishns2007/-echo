import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Users, 
  Pill, 
  Coins, 
  MessageSquareCode, 
  Briefcase, 
  Database, 
  BellRing,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEntity,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const data = await api.searchGlobal(q);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0B0F17] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center space-x-3 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search suspect alias, wallet, @handle, substance, case, evidence..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
          />
          {query && (
            <button onClick={() => handleSearch('')} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200 text-xs border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {loading && (
            <div className="py-8 text-center text-cyan-400 space-y-2">
              <Sparkles className="w-5 h-5 animate-spin mx-auto" />
              <p>Searching multi-source fusion database...</p>
            </div>
          )}

          {!loading && !results && (
            <div className="py-8 text-center text-slate-500 space-y-2">
              <p>Type keywords like <span className="text-cyan-400">INDRA_47</span>, <span className="text-amber-400">bc1q92fa</span>, <span className="text-purple-400">@indra_ops</span>, <span className="text-emerald-400">MDMA</span>, or <span className="text-blue-400">CHD-0047</span></p>
            </div>
          )}

          {!loading && results && results.total_results === 0 && (
            <div className="py-8 text-center text-slate-500">
              No matching records found for "{query}".
            </div>
          )}

          {!loading && results && (
            <div className="space-y-4">
              {/* Entities Section */}
              {results.results.entities.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-rose-400" />
                    <span>Entities ({results.results.entities.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.entities.map((e: any) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          onSelectEntity(e.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
                      >
                        <div>
                          <div className="font-bold text-slate-100 group-hover:text-cyan-300">
                            {e.alias} <span className="text-slate-500 text-[11px]">({e.id})</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{e.entity_type}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                            Risk {e.risk_score}/100
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drug Listings Section */}
              {results.results.listings.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Pill className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Drug Listings ({results.results.listings.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.listings.map((l: any) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          onNavigate('drug-intel');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-slate-200">
                            [{l.substance}] {l.listing_title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Vendor: <span className="text-cyan-400">{l.seller_alias}</span> | Market: {l.source_marketplace}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          {l.id}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crypto Wallets Section */}
              {results.results.wallets.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cryptocurrency Wallets ({results.results.wallets.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.wallets.map((w: any) => (
                      <div
                        key={w.address}
                        onClick={() => {
                          onNavigate('crypto-intel');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-mono font-semibold text-amber-300">{w.address}</div>
                          <div className="text-[11px] text-slate-400">{w.cluster_tag}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                          Risk {w.risk_score}/100
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comms Identifiers */}
              {results.results.communication_identifiers.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <MessageSquareCode className="w-3.5 h-3.5 text-purple-400" />
                    <span>Encrypted Platform Identifiers ({results.results.communication_identifiers.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.communication_identifiers.map((c: any) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onNavigate('encrypted-platforms');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-mono font-bold text-purple-300">{c.identifier}</div>
                          <div className="text-[11px] text-slate-400">
                            Linked Alias: <span className="text-cyan-400">{c.related_alias}</span> | Platform: {c.platform_name}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
                          {c.confidence_score}% Confidence
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Investigations */}
              {results.results.investigations.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span>Investigations ({results.results.investigations.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.investigations.map((cs: any) => (
                      <div
                        key={cs.id}
                        onClick={() => {
                          onNavigate('investigations');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-bold text-blue-300">{cs.case_number}: {cs.title}</div>
                          <div className="text-[11px] text-slate-400">Status: {cs.status}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                          {cs.risk_level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
