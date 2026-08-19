import React, { useEffect, useState } from 'react';
import { 
  Radio, 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  ShieldAlert, 
  RefreshCw,
  Flame
} from 'lucide-react';
import { TimelineEvent } from '../types/intelligence';
import { api } from '../services/api';

export const LiveFeedView: React.FC = () => {
  const [feedItems, setFeedItems] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('ALL');

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const data = await api.getLiveFeed(30);
        setFeedItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const filtered = feedItems.filter((f) => 
    sourceFilter === 'ALL' || f.source.toLowerCase().includes(sourceFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Live Intelligence Stream Console
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Streaming real-time simulated darknet listings, cryptographic correlations, and behavioral alerts
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-time Ingestion Stream Active</span>
          </span>
        </div>
      </div>

      {/* Stream Cards */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2 text-xs"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-cyan-400 text-sm font-mono">{item.timestamp.split('T')[1]?.slice(0, 8)}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  item.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}>
                  {item.event_type}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">{item.source}</span>
            </div>

            <div className="font-bold text-slate-100 text-sm">
              {item.title}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
              <span>Date: {item.date_str}</span>
              {item.evidence_id && (
                <span className="text-cyan-400 font-mono">Exhibit: {item.evidence_id}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
