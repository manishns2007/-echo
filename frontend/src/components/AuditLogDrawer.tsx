import React, { useEffect, useState } from 'react';
import { 
  History, 
  X, 
  ShieldCheck, 
  User, 
  RefreshCw, 
  Lock,
  Search
} from 'lucide-react';
import { AuditLog } from '../types/intelligence';
import { api } from '../services/api';

interface AuditLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogDrawer: React.FC<AuditLogDrawerProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAuditLogs(50);
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((l) => 
    !filter || 
    l.user_officer.toLowerCase().includes(filter.toLowerCase()) || 
    l.action.toLowerCase().includes(filter.toLowerCase()) ||
    l.resource_target.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#090E17]/95 border-l border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col font-mono text-xs animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-100 flex items-center space-x-2">
              <span>TAMPER-EVIDENT AUDIT TRAIL</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                WORM LOGGED
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Chain-of-Custody & User Action Records</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchLogs}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            title="Refresh logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by officer, action, or target..."
            className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none flex-1 text-xs"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-[11px]">{log.id}</span>
              <span className="text-[10px] text-slate-400">{log.timestamp}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold text-slate-100">{log.user_officer}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                {log.role}
              </span>
            </div>

            <div className="text-slate-400 text-[11px]">
              Action: <span className="font-mono text-slate-200 font-medium">{log.action}</span>
            </div>

            <div className="text-slate-400 text-[11px]">
              Resource Target: <span className="font-mono text-cyan-300">{log.resource_target}</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
              <span className="text-slate-400">IP: {log.ip_address}</span>
              <span className="text-emerald-400 font-semibold">{log.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
