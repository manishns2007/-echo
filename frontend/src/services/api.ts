import {
  SystemStats,
  EntitySummary,
  EntityDetail,
  DrugListing,
  CryptoWallet,
  WalletTransaction,
  EncryptedPlatformRecord,
  AlertRecord,
  InvestigationCase,
  EvidenceRecord,
  TimelineEvent,
  AuditLog,
  NetworkGraphData
} from '../types/intelligence';

const API_BASE = (import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000') + '/api';

export const api = {
  // 1. Stats & KPIs
  getStats: async (): Promise<SystemStats> => {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // 2. Live Feed
  getLiveFeed: async (limit = 20): Promise<TimelineEvent[]> => {
    const res = await fetch(`${API_BASE}/live-feed?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch live feed');
    return res.json();
  },

  // 3. Entities
  getEntities: async (query?: string, threatLevel?: string): Promise<EntitySummary[]> => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (threatLevel) params.append('threat_level', threatLevel);
    const res = await fetch(`${API_BASE}/entities?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch entities');
    return res.json();
  },

  getEntityDetail: async (entityId: string): Promise<EntityDetail> => {
    const res = await fetch(`${API_BASE}/entities/${entityId}`);
    if (!res.ok) throw new Error(`Failed to fetch entity ${entityId}`);
    return res.json();
  },

  // 4. Drug Intelligence
  getDrugAnalytics: async () => {
    const res = await fetch(`${API_BASE}/drugs/analytics`);
    if (!res.ok) throw new Error('Failed to fetch drug analytics');
    return res.json();
  },

  getDrugListings: async (substance?: string, riskLevel?: string, marketplace?: string): Promise<DrugListing[]> => {
    const params = new URLSearchParams();
    if (substance) params.append('substance', substance);
    if (riskLevel) params.append('risk_level', riskLevel);
    if (marketplace) params.append('marketplace', marketplace);
    const res = await fetch(`${API_BASE}/listings?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch listings');
    return res.json();
  },

  // 5. Network Graph
  getNetworkGraph: async (): Promise<NetworkGraphData> => {
    const res = await fetch(`${API_BASE}/network`);
    if (!res.ok) throw new Error('Failed to fetch network graph');
    return res.json();
  },

  // 6. Cryptocurrency Intelligence
  getCryptoWallets: async (): Promise<CryptoWallet[]> => {
    const res = await fetch(`${API_BASE}/crypto`);
    if (!res.ok) throw new Error('Failed to fetch crypto wallets');
    return res.json();
  },

  getWalletDetails: async (address: string): Promise<{ wallet: CryptoWallet; transactions: WalletTransaction[] }> => {
    const res = await fetch(`${API_BASE}/crypto/${address}`);
    if (!res.ok) throw new Error(`Failed to fetch wallet ${address}`);
    return res.json();
  },

  // 7. Encrypted Platform Intelligence
  getEncryptedPlatformRecords: async (): Promise<EncryptedPlatformRecord[]> => {
    const res = await fetch(`${API_BASE}/encrypted-platforms`);
    if (!res.ok) throw new Error('Failed to fetch encrypted records');
    return res.json();
  },

  // 8. Alerts
  getAlerts: async (status?: string, severity?: string): Promise<AlertRecord[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (severity) params.append('severity', severity);
    const res = await fetch(`${API_BASE}/alerts?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  updateAlertStatus: async (alertId: string, status: string): Promise<{ message: string }> => {
    const res = await fetch(`${API_BASE}/alerts/${alertId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update alert status');
    return res.json();
  },

  // 9. Investigations & Reports
  getInvestigations: async (): Promise<InvestigationCase[]> => {
    const res = await fetch(`${API_BASE}/investigations`);
    if (!res.ok) throw new Error('Failed to fetch investigations');
    return res.json();
  },

  getInvestigationDossier: async (caseId: string): Promise<InvestigationCase> => {
    const res = await fetch(`${API_BASE}/investigations/${caseId}`);
    if (!res.ok) throw new Error(`Failed to fetch investigation ${caseId}`);
    return res.json();
  },

  getFormalReport: async (caseId: string) => {
    const res = await fetch(`${API_BASE}/investigations/${caseId}/report`);
    if (!res.ok) throw new Error(`Failed to generate report for ${caseId}`);
    return res.json();
  },

  // 10. Evidence
  getEvidence: async (entityId?: string, caseId?: string): Promise<EvidenceRecord[]> => {
    const params = new URLSearchParams();
    if (entityId) params.append('entity_id', entityId);
    if (caseId) params.append('case_id', caseId);
    const res = await fetch(`${API_BASE}/evidence?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch evidence');
    return res.json();
  },

  verifyEvidence: async (evidenceId: string) => {
    const res = await fetch(`${API_BASE}/evidence/${evidenceId}/verify`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to verify evidence');
    return res.json();
  },

  // 11. Correlation Engine
  calculateCorrelation: async (params: {
    alias_match?: boolean;
    wallet_overlap?: boolean;
    comms_match?: boolean;
    temporal_proximity?: boolean;
    substance_overlap?: boolean;
    pgp_link?: boolean;
  }) => {
    const res = await fetch(`${API_BASE}/correlation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Failed to compute correlation');
    return res.json();
  },

  // 12. AI Assistant
  askAssistant: async (question: string, targetEntityId?: string, targetCaseId?: string) => {
    const res = await fetch(`${API_BASE}/assistant/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        target_entity_id: targetEntityId,
        target_case_id: targetCaseId
      })
    });
    if (!res.ok) throw new Error('Failed to query assistant');
    return res.json();
  },

  // 13. Search
  searchGlobal: async (query: string) => {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to execute search');
    return res.json();
  },

  // 14. Audit Logs
  getAuditLogs: async (limit = 50): Promise<AuditLog[]> => {
    const res = await fetch(`${API_BASE}/audit?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return res.json();
  },

  logAuditEvent: async (data: {
    user_officer: string;
    role: string;
    action: string;
    resource_target: string;
    result?: string;
  }) => {
    const res = await fetch(`${API_BASE}/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to log audit event');
    return res.json();
  }
};
