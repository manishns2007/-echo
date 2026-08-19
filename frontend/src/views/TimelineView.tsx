import React, { useEffect, useState } from 'react';
import { 
  GitBranch, 
  Search, 
  Filter, 
  Calendar, 
  ShieldAlert, 
  Radio, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { TimelineEvent } from '../types/intelligence';
import { api } from '../services/api';

export const TimelineView: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const data = await api.getLiveFeed(50);
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  const filtered = events.filter((e) => {
    const matchesSev = severityFilter === 'ALL' || e.severity === severityFilter;
    const matchesSearch = !searchTerm ||
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Investigation Escalation Timeline
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-source chronological progression combining marketplace crawling, blockchain traces, and physical intercepts
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
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-slate-800 pl-12 space-y-6">
        {filtered.map((evt, idx) => (
          <div
            key={evt.id}
            className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2 group shadow-sm"
          >
            {/* Timeline Node Dot */}
            <span className={`absolute -left-[38px] top-4 w-3.5 h-3.5 rounded-full ring-4 ring-[#070B11] ${
              evt.severity === 'CRITICAL' ? 'bg-rose-500 animate-ping' : evt.severity === 'HIGH' ? 'bg-amber-400' : 'bg-cyan-400'
            }`} />
            <span className={`absolute -left-[38px] top-4 w-3.5 h-3.5 rounded-full ${
              evt.severity === 'CRITICAL' ? 'bg-rose-500' : evt.severity === 'HIGH' ? 'bg-amber-400' : 'bg-cyan-400'
            }`} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-cyan-400 text-sm">{evt.date_str}</span>
                <span className="text-slate-500">({evt.timestamp.split('T')[1]?.slice(0, 8)})</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  evt.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-950 text-cyan-300 border border-cyan-800'
                }`}>
                  {evt.event_type}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">{evt.source}</span>
            </div>

            <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
              {evt.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {evt.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
              <span>Associated Case: <span className="text-slate-300 font-semibold">{evt.associated_investigation_id || 'CHD-DRUG-0047'}</span></span>
              {evt.evidence_id && (
                <span className="text-cyan-400 font-mono">Exhibit: {evt.evidence_id}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
