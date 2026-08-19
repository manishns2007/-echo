import React, { useEffect, useState } from 'react';
import { 
  Coins, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldAlert, 
  ExternalLink, 
  Activity, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { CryptoWallet, WalletTransaction } from '../types/intelligence';
import { api } from '../services/api';

interface CryptoIntelligenceViewProps {
  initialWallet?: string;
  onSelectEntity: (id: string) => void;
}

export const CryptoIntelligenceView: React.FC<CryptoIntelligenceViewProps> = ({
  initialWallet,
  onSelectEntity
}) => {
  const [wallets, setWallets] = useState<CryptoWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<CryptoWallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWallets = async () => {
      setLoading(true);
      try {
        const data = await api.getCryptoWallets();
        setWallets(data);
        const target = initialWallet 
          ? data.find((w) => w.address === initialWallet) || data[0]
          : data[0];
        if (target) {
          handleSelectWallet(target.address);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, [initialWallet]);

  const handleSelectWallet = async (address: string) => {
    try {
      const details = await api.getWalletDetails(address);
      setSelectedWallet(details.wallet);
      setTransactions(details.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredWallets = wallets.filter((w) => 
    !searchTerm || 
    w.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w.cluster_tag && w.cluster_tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Cryptocurrency Intelligence & Flow Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synthetic Bitcoin transaction clustering, escrow settlement tracing, and drug profit accumulation cold vaults
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold uppercase">
            10 Monitored Wallets (18.64 BTC Primary Cluster)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Wallet List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search address or cluster..."
              className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs font-mono"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredWallets.map((w) => {
              const isSelected = selectedWallet?.address === w.address;
              return (
                <div
                  key={w.address}
                  onClick={() => handleSelectWallet(w.address)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-md shadow-amber-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-xs font-mono">
                      {w.address.slice(0, 12)}...{w.address.slice(-6)}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      w.risk_level === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      Risk {w.risk_score}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300">{w.cluster_tag}</div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <span>Est. Balance: <span className="text-slate-200 font-semibold">{w.balance_est?.split(' ')[0]} BTC</span></span>
                    <span>{w.tx_count} Transactions</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Wallet Detail & Transactions */}
        <div className="lg:col-span-7 space-y-5">
          {selectedWallet ? (
            <div className="space-y-5">
              {/* Wallet Summary Card */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-900/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Inspected Wallet Address</span>
                    <h2 className="text-sm font-bold text-amber-300 font-mono select-all">
                      {selectedWallet.address}
                    </h2>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                    {selectedWallet.risk_level} (Score {selectedWallet.risk_score})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Current Holding</span>
                    <span className="font-bold text-slate-100 text-sm">{selectedWallet.balance_est}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Total Inflow</span>
                    <span className="font-bold text-emerald-400 text-sm">+{selectedWallet.total_received}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Total Outflow</span>
                    <span className="font-bold text-rose-400 text-sm">-{selectedWallet.total_sent}</span>
                  </div>
                </div>

                {/* Linked Targets */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Linked Suspect Entities:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedWallet.linked_entities?.map((ent, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-slate-950 border border-cyan-800 text-cyan-300 text-[11px] font-semibold"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Synthetic Transaction Ledger */}
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
                <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span>Synthetic Blockchain Transaction Traces</span>
                  <span className="text-[10px] text-slate-500">Forensic Heuristics Verified</span>
                </h3>

                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <div
                      key={tx.txid}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {tx.amount.startsWith('+') ? (
                            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-rose-400" />
                          )}
                          <span className="font-bold text-slate-200">{tx.type}</span>
                        </div>
                        <span className={`font-mono font-bold ${
                          tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {tx.amount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Counterparty: <span className="text-cyan-300 font-mono">{tx.counterparty}</span></span>
                        <span className="text-slate-500">{tx.timestamp.split('T')[1]?.slice(0, 8)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 border border-slate-800 rounded-xl">
              Select a wallet to inspect transaction telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
