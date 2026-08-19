import React, { useEffect, useState } from 'react';
import { 
  Pill, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { DrugListing } from '../types/intelligence';
import { api } from '../services/api';

const COLORS = ['#06b6d4', '#f43f5e', '#10b981', '#f59e0b', '#a855f7', '#3b82f6', '#ec4899'];

export const DrugIntelligenceView: React.FC = () => {
  const [listings, setListings] = useState<DrugListing[]>([]);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubstance, setSelectedSubstance] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [listData, analData] = await Promise.all([
          api.getDrugListings(),
          api.getDrugAnalytics()
        ]);
        setListings(listData);
        setAnalytics(analData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredListings = listings.filter((l) => {
    const matchesSub = selectedSubstance === 'ALL' || l.substance.toLowerCase().includes(selectedSubstance.toLowerCase()) || l.category.toLowerCase().includes(selectedSubstance.toLowerCase());
    const matchesSearch = !searchTerm || l.listing_title.toLowerCase().includes(searchTerm.toLowerCase()) || l.seller_alias.toLowerCase().includes(searchTerm.toLowerCase()) || l.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Pill className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
              Drug Intelligence & Distribution Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Indexed illicit substance categories, darknet market share, and synthetic chemical surge trends
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
            6 High Potency Listings Detected
          </span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Substance Breakdown Bar Chart */}
          <div className="lg:col-span-6 rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center justify-between">
              <span>Substance Distribution Across Markets</span>
              <span className="text-[10px] text-slate-500">Live Crawl Ingestion</span>
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.substances}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="substance" stroke="#64748B" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }} 
                  />
                  <Bar dataKey="count" fill="#06B6D4" radius={[4, 4, 0, 0]}>
                    {analytics.substances.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Temporal Trend Surge Line Chart */}
          <div className="lg:col-span-6 rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center justify-between">
              <span>Weekly Influx Trend by Substance Class</span>
              <span className="text-[10px] text-cyan-400">Surge Velocity: +84%</span>
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="period" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="MDMA" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Ketamine" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="SyntheticOpioids" stroke="#F43F5E" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Precursors" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Listing Search & Table */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <h2 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
            Indexed Listing Intelligence ({filteredListings.length})
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search listing title, seller..."
                className="bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none w-full text-xs"
              />
            </div>

            <select
              value={selectedSubstance}
              onChange={(e) => setSelectedSubstance(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Substances</option>
              <option value="MDMA">MDMA</option>
              <option value="Ketamine">Ketamine</option>
              <option value="Synthetic Opioids">Synthetic Opioids</option>
              <option value="Methamphetamine">Methamphetamine</option>
              <option value="Precursor Reagents">Precursors</option>
              <option value="Cocaine">Cocaine</option>
            </select>
          </div>
        </div>

        {/* Listing Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Listing ID</th>
                <th className="p-3">Substance / Title</th>
                <th className="p-3">Seller Alias</th>
                <th className="p-3">Marketplace</th>
                <th className="p-3">Price Indicator</th>
                <th className="p-3">Comms / Wallet</th>
                <th className="p-3">Risk Tier</th>
                <th className="p-3">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-950/40 text-slate-300">
              {filteredListings.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/80 transition-colors">
                  <td className="p-3 font-bold font-mono text-cyan-400">{l.id}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-100">{l.listing_title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{l.category} • Purity: {l.purity_claim || 'N/A'}</div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-rose-300">{l.seller_alias}</span>
                  </td>
                  <td className="p-3 text-slate-300 text-[11px]">{l.source_marketplace}</td>
                  <td className="p-3 font-semibold text-amber-300">{l.price_indicator}</td>
                  <td className="p-3 text-[11px]">
                    {l.communication_identifier && (
                      <span className="text-purple-300 block">{l.communication_identifier}</span>
                    )}
                    {l.wallet_address && (
                      <span className="text-slate-400 font-mono text-[10px]">{l.wallet_address.slice(0, 10)}...</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      l.risk_level === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {l.risk_level} ({l.risk_score})
                    </span>
                  </td>
                  <td className="p-3">
                    {l.evidence_id && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                        {l.evidence_id}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
