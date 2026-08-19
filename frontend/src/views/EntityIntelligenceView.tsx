import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldAlert, 
  ArrowRight, 
  Coins, 
  MessageSquareCode, 
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { EntitySummary } from '../types/intelligence';

interface EntityIntelligenceViewProps {
  entities: EntitySummary[];
  onSelectEntity: (id: string) => void;
}

export const EntityIntelligenceView: React.FC<EntityIntelligenceViewProps> = ({
  entities,
  onSelectEntity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [threatFilter, setThreatFilter] = useState('ALL');

  const filtered = entities.filter((e) => {
    const matchesSearch = !searchTerm || 
      e.alias.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.primary_comms && e.primary_comms.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.primary_wallet && e.primary_wallet.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesThreat = threatFilter === 'ALL' || e.threat_level === threatFilter;
    return matchesSearch && matchesThreat;
  });

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Entity Intelligence Directory
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-source suspect profiles, synthetic personas, and automated cluster resolutions ({entities.length} Indexed)
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter alias, ID, wallet, comms..."
              className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs font-mono"
            />
          </div>

          <select
            value={threatFilter}
            onChange={(e) => setThreatFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Threat Levels</option>
            <option value="CRITICAL">Threat: CRITICAL</option>
            <option value="HIGH">Threat: HIGH</option>
            <option value="MEDIUM">Threat: MEDIUM</option>
          </select>
        </div>
      </div>

      {/* Entity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ent) => (
          <div
            key={ent.id}
            onClick={() => onSelectEntity(ent.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between space-y-3 ${
              ent.id === 'ENTITY-0047'
                ? 'bg-gradient-to-br from-[#180D16] to-slate-900 border-rose-600/70 shadow-lg shadow-rose-950/40 hover:border-rose-400'
                : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
            }`}
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                    {ent.alias}
                  </span>
                  <span className="text-[10px] text-slate-500">({ent.id})</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ent.threat_level === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : ent.threat_level === 'HIGH'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                }`}>
                  {ent.threat_level}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{ent.entity_type}</p>
            </div>

            {/* Scores & Summary */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Risk Score</span>
                <span className="font-bold text-rose-400 text-sm">{ent.risk_score} / 100</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Confidence</span>
                <span className="font-bold text-cyan-400 text-sm">{ent.confidence_score}%</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              {ent.summary}
            </p>

            {/* Identifiers Strip */}
            <div className="space-y-1 text-[11px] pt-2 border-t border-slate-800/80 text-slate-400">
              {ent.primary_comms && (
                <div className="flex items-center space-x-1.5 truncate">
                  <MessageSquareCode className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="text-purple-300 truncate">{ent.primary_comms}</span>
                </div>
              )}
              {ent.primary_wallet && (
                <div className="flex items-center space-x-1.5 truncate">
                  <Coins className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-300 font-mono truncate">{ent.primary_wallet.slice(0, 16)}...</span>
                </div>
              )}
            </div>

            {/* Footer action */}
            <div className="flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 pt-1">
              <span>Inspect 360° Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
