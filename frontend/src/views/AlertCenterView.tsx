import React, { useEffect, useState } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  ShieldAlert,
  Flame
} from 'lucide-react';
import { AlertRecord } from '../types/intelligence';
import { api } from '../services/api';

interface AlertCenterViewProps {
  onSelectAlert: (alertId: string) => void;
  onNavigate: (view: string) => void;
  onSelectEntity: (id: string) => void;
}

export const AlertCenterView: React.FC<AlertCenterViewProps> = ({
  onSelectAlert,
  onNavigate,
  onSelectEntity
}) => {
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await api.getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleStatusChange = async (alertId: string, newStatus: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.updateAlertStatus(alertId, newStatus);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: newStatus as any } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = alerts.filter((a) => {
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesSev = severityFilter === 'ALL' || a.severity === severityFilter;
    return matchesStatus && matchesSev;
  });

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <BellRing className="w-5 h-5 text-rose-400 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Real-Time Alert Triage Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated intelligence anomalies, cross-platform correlation triggers, and lethal substance alerts
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Severity: CRITICAL</option>
            <option value="HIGH">Severity: HIGH</option>
            <option value="MEDIUM">Severity: MEDIUM</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">Status: NEW</option>
            <option value="ACKNOWLEDGED">Status: ACKNOWLEDGED</option>
            <option value="INVESTIGATING">Status: INVESTIGATING</option>
            <option value="RESOLVED">Status: RESOLVED</option>
          </select>
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-3">
        {filtered.map((a) => (
          <div
            key={a.id}
            onClick={() => onSelectAlert(a.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group space-y-3 ${
              a.severity === 'CRITICAL'
                ? 'bg-slate-900/90 border-rose-900/60 hover:border-rose-500 shadow-md shadow-rose-950/20'
                : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  a.severity === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : a.severity === 'HIGH'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                }`}>
                  {a.severity}
                </span>
                <span className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                  {a.title}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-slate-500 text-[11px]">{a.timestamp.replace('T', ' ').slice(0, 19)}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  a.status === 'NEW'
                    ? 'bg-rose-900/60 text-rose-200 border border-rose-700 animate-pulse'
                    : a.status === 'INVESTIGATING'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : a.status === 'ACKNOWLEDGED'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {a.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {a.reason}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1 border-t border-slate-800/80 text-slate-400">
              <div className="flex items-center space-x-3 text-[11px]">
                <span>Source: <span className="text-slate-200 font-semibold">{a.source}</span></span>
                <span className="text-cyan-400 font-bold">Confidence: {a.confidence}%</span>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                {a.status !== 'ACKNOWLEDGED' && (
                  <button
                    onClick={(e) => handleStatusChange(a.id, 'ACKNOWLEDGED', e)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold"
                  >
                    Acknowledge
                  </button>
                )}
                {a.status !== 'INVESTIGATING' && (
                  <button
                    onClick={(e) => handleStatusChange(a.id, 'INVESTIGATING', e)}
                    className="px-2 py-1 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800 text-[10px] font-semibold"
                  >
                    Investigate
                  </button>
                )}
                {a.status !== 'RESOLVED' && (
                  <button
                    onClick={(e) => handleStatusChange(a.id, 'RESOLVED', e)}
                    className="px-2 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[10px] font-semibold"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
