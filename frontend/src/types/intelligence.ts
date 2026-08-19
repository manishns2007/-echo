export interface SystemStats {
  threat_level: string;
  threat_score: number;
  kpis: {
    active_investigations: number;
    high_risk_alerts: number;
    drug_indicators: number;
    linked_entities: number;
    suspicious_wallets: number;
    networks_detected: number;
  };
  system_status: {
    crawler_nodes: number;
    tor_proxies: string;
    correlation_engine: string;
    integrity_verifier: string;
  };
}

export interface MatchSignal {
  signal: string;
  weight: number;
  status: string;
}

export interface RiskFactor {
  factor: string;
  score: number;
  reason: string;
}

export interface EntitySummary {
  id: string;
  alias: string;
  entity_type: string;
  risk_score: number;
  confidence_score: number;
  threat_level: string;
  status: string;
  first_seen: string;
  last_seen: string;
  primary_comms?: string;
  primary_wallet?: string;
  marketplaces: string[];
  drug_categories: string[];
  summary: string;
  match_signals: MatchSignal[];
  risk_breakdown: RiskFactor[];
}

export interface EntityDetail extends EntitySummary {
  listings: DrugListing[];
  comms_records: EncryptedPlatformRecord[];
  evidence: EvidenceRecord[];
  timeline: TimelineEvent[];
  wallets: CryptoWallet[];
}

export interface DrugListing {
  id: string;
  listing_title: string;
  substance: string;
  category: string;
  price_indicator: string;
  seller_alias: string;
  source_marketplace: string;
  communication_identifier?: string;
  wallet_address?: string;
  timestamp: string;
  risk_score: number;
  risk_level: string;
  evidence_id?: string;
  origin_country?: string;
  purity_claim?: string;
  status: string;
}

export interface CryptoWallet {
  address: string;
  currency: string;
  risk_score: number;
  risk_level: string;
  first_seen: string;
  last_seen: string;
  balance_est: string;
  total_received: string;
  total_sent: string;
  tx_count: number;
  linked_entities: string[];
  related_listings: string[];
  related_investigations: string[];
  cluster_tag?: string;
}

export interface WalletTransaction {
  txid: string;
  timestamp: string;
  type: string;
  amount: string;
  counterparty: string;
  risk: string;
}

export interface EncryptedPlatformRecord {
  id: string;
  platform_name: string;
  identifier: string;
  related_alias: string;
  linked_entity_id: string;
  confidence_score: number;
  provenance_source: string;
  observed_role?: string;
  substance_focus?: string;
  first_observed: string;
  last_observed: string;
  evidence_id: string;
  verification_status: string;
}

export interface AlertRecord {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  alert_type: string;
  timestamp: string;
  source: string;
  affected_entities: string[];
  reason: string;
  confidence: number;
  status: 'NEW' | 'ACKNOWLEDGED' | 'INVESTIGATING' | 'RESOLVED';
  target_route?: string;
}

export interface InvestigationCase {
  id: string;
  case_number: string;
  title: string;
  status: string;
  risk_level: string;
  lead_investigator: string;
  opened_date: string;
  last_updated: string;
  summary: string;
  target_substances: string[];
  linked_entities: string[];
  linked_sources: string[];
  evidence_count: number;
  jurisdiction: string;
  objective: string;
  evidence_records?: EvidenceRecord[];
  timeline_records?: TimelineEvent[];
}

export interface EvidenceRecord {
  id: string;
  title: string;
  evidence_type: string;
  source_origin: string;
  collection_timestamp: string;
  sha256_hash: string;
  associated_entity_id?: string;
  associated_investigation_id?: string;
  integrity_status: string;
  chain_of_custody: string;
  description: string;
  raw_metadata: Record<string, any>;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  date_str: string;
  title: string;
  description: string;
  event_type: string;
  severity: string;
  associated_entity_id?: string;
  associated_investigation_id?: string;
  source: string;
  evidence_id?: string;
}

export interface AuditLog {
  id: string;
  user_officer: string;
  role: string;
  action: string;
  resource_target: string;
  timestamp: string;
  result: string;
  ip_address: string;
}

export interface GraphNode {
  data: {
    id: string;
    label: string;
    type: 'suspect' | 'wallet' | 'comms' | 'listing' | 'marketplace';
    subType?: string;
    riskScore?: number;
    threatLevel?: string;
    primaryWallet?: string;
    primaryComms?: string;
    fullAddress?: string;
    platform?: string;
    confidence?: number;
    substance?: string;
    balance?: string;
  };
}

export interface GraphEdge {
  data: {
    id: string;
    source: string;
    target: string;
    relationship: string;
    confidence: number;
    evidence: string;
    firstObserved: string;
    lastObserved: string;
  };
}

export interface NetworkGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
