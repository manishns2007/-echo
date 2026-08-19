import sqlite3
import json
import os
from typing import Dict, Any, List

DB_PATH = os.path.join(os.path.dirname(__file__), "intelligence.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Entities table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS entities (
        id TEXT PRIMARY KEY,
        alias TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        risk_score INTEGER NOT NULL,
        confidence_score INTEGER NOT NULL,
        threat_level TEXT NOT NULL,
        status TEXT NOT NULL,
        first_seen TEXT NOT NULL,
        last_seen TEXT NOT NULL,
        primary_comms TEXT,
        primary_wallet TEXT,
        marketplaces TEXT,
        drug_categories TEXT,
        summary TEXT,
        match_signals TEXT,
        risk_breakdown TEXT
    )
    """)

    # Drug Listings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS drug_listings (
        id TEXT PRIMARY KEY,
        listing_title TEXT NOT NULL,
        substance TEXT NOT NULL,
        category TEXT NOT NULL,
        price_indicator TEXT NOT NULL,
        seller_alias TEXT NOT NULL,
        source_marketplace TEXT NOT NULL,
        communication_identifier TEXT,
        wallet_address TEXT,
        timestamp TEXT NOT NULL,
        risk_score INTEGER NOT NULL,
        risk_level TEXT NOT NULL,
        evidence_id TEXT,
        origin_country TEXT,
        purity_claim TEXT,
        status TEXT NOT NULL
    )
    """)

    # Wallets / Cryptocurrency table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS crypto_wallets (
        address TEXT PRIMARY KEY,
        currency TEXT NOT NULL,
        risk_score INTEGER NOT NULL,
        risk_level TEXT NOT NULL,
        first_seen TEXT NOT NULL,
        last_seen TEXT NOT NULL,
        balance_est TEXT,
        total_received TEXT,
        total_sent TEXT,
        tx_count INTEGER NOT NULL,
        linked_entities TEXT,
        related_listings TEXT,
        related_investigations TEXT,
        cluster_tag TEXT
    )
    """)

    # Encrypted platform records
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS encrypted_platform_records (
        id TEXT PRIMARY KEY,
        platform_name TEXT NOT NULL,
        identifier TEXT NOT NULL,
        related_alias TEXT NOT NULL,
        linked_entity_id TEXT NOT NULL,
        confidence_score INTEGER NOT NULL,
        provenance_source TEXT NOT NULL,
        observed_role TEXT,
        substance_focus TEXT,
        first_observed TEXT NOT NULL,
        last_observed TEXT NOT NULL,
        evidence_id TEXT NOT NULL,
        verification_status TEXT NOT NULL
    )
    """)

    # Alerts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        severity TEXT NOT NULL,
        alert_type TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        source TEXT NOT NULL,
        affected_entities TEXT NOT NULL,
        reason TEXT NOT NULL,
        confidence INTEGER NOT NULL,
        status TEXT NOT NULL,
        target_route TEXT
    )
    """)

    # Investigations / Cases table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS investigations (
        id TEXT PRIMARY KEY,
        case_number TEXT NOT NULL,
        title TEXT NOT NULL,
        status TEXT NOT NULL,
        risk_level TEXT NOT NULL,
        lead_investigator TEXT NOT NULL,
        opened_date TEXT NOT NULL,
        last_updated TEXT NOT NULL,
        summary TEXT NOT NULL,
        target_substances TEXT,
        linked_entities TEXT,
        linked_sources TEXT,
        evidence_count INTEGER NOT NULL,
        jurisdiction TEXT NOT NULL,
        objective TEXT NOT NULL
    )
    """)

    # Evidence Vault table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS evidence (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        evidence_type TEXT NOT NULL,
        source_origin TEXT NOT NULL,
        collection_timestamp TEXT NOT NULL,
        sha256_hash TEXT NOT NULL,
        associated_entity_id TEXT,
        associated_investigation_id TEXT,
        integrity_status TEXT NOT NULL,
        chain_of_custody TEXT NOT NULL,
        description TEXT NOT NULL,
        raw_metadata TEXT
    )
    """)

    # Timeline events table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS timeline_events (
        id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        date_str TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        event_type TEXT NOT NULL,
        severity TEXT NOT NULL,
        associated_entity_id TEXT,
        associated_investigation_id TEXT,
        source TEXT NOT NULL,
        evidence_id TEXT
    )
    """)

    # Audit log table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        user_officer TEXT NOT NULL,
        role TEXT NOT NULL,
        action TEXT NOT NULL,
        resource_target TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        result TEXT NOT NULL,
        ip_address TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
