import sqlite3
import json
import hashlib
from database import get_db, init_db

def generate_hash(seed_text: str) -> str:
    return hashlib.sha256(seed_text.encode('utf-8')).hexdigest()

def seed_database():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Clear all existing data
    cursor.execute("DELETE FROM entities")
    cursor.execute("DELETE FROM drug_listings")
    cursor.execute("DELETE FROM crypto_wallets")
    cursor.execute("DELETE FROM encrypted_platform_records")
    cursor.execute("DELETE FROM alerts")
    cursor.execute("DELETE FROM investigations")
    cursor.execute("DELETE FROM evidence")
    cursor.execute("DELETE FROM timeline_events")
    cursor.execute("DELETE FROM audit_logs")

    # ─────────────────────────────────────────────────────────────
    # 1. ENTITIES
    #    Case 1 (CHD-0047): INDRA_47, VIPER_CORP, PHANTOM_LABS, KALI_DISTRO, AEGIS_BROKER, SHADOW_VAULT
    #    Case 2 (CHD-0012): PHANTOM_LABS (shared), CYBER_CHEMIST, TITAN_REAGENTS
    # ─────────────────────────────────────────────────────────────
    entities = [
        # ── CHD-0047 Primary Target ──
        (
            "ENTITY-0047", "INDRA_47", "Suspect Coordinator / Multi-Platform Vendor", 87, 91, "CRITICAL", "ACTIVE_SURVEILLANCE",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z",
            "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            json.dumps(["SimulatedMarket-A", "SimulatedMarket-B"]),
            json.dumps(["MDMA", "Ketamine", "Synthetic Opioids"]),
            "Primary high-risk darknet vendor identified across SimulatedMarket-A and SimulatedMarket-B. Correlated with Telegram handle @indra_ops and primary deposit wallet bc1q92fa... coordinating regional dead-drop supply chains.",
            json.dumps([
                {"signal": "Alias exact match across 2 darknet marketplaces", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Wallet re-use (bc1q92fa...)", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Communication identifier match (@indra_ops)", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Temporal correlation (<30 min variance)", "weight": 15, "status": "DETECTED"},
                {"signal": "PGP key metadata overlap", "weight": 10, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Drug-related activity", "score": 25, "reason": "Active listings for Schedule I & II synthetic compounds"},
                {"factor": "Cross-platform identity match", "score": 20, "reason": "Confirmed match across SimulatedMarket-A, SimulatedMarket-B, and Telegram"},
                {"factor": "Wallet association", "score": 15, "reason": "Direct transactions with precursor wallet bc1q71de... and cold vault"},
                {"factor": "Multiple high-risk listings", "score": 15, "reason": "5 confirmed high-potency listings across darknet markets"},
                {"factor": "Network centrality", "score": 10, "reason": "Degree centrality > 0.84 linking suppliers and couriers"},
                {"factor": "Suspicious temporal behaviour", "score": 5, "reason": "Synchronized multi-channel broadcast drops"}
            ])
        ),
        # ── CHD-0047 Precursor Broker ──
        (
            "ENTITY-0018", "VIPER_CORP", "Precursor Chemical Broker", 74, 82, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z",
            "@viper_logistics_bot", "bc1q71de4410aa55890bb82109cd",
            json.dumps(["SimulatedMarket-A", "ChemForge Forum"]),
            json.dumps(["BMK Ethyl Ester", "PMK Glycidate", "Precursor Solvents"]),
            "Chemical broker supplying wholesale precursor reagents to synthesis labs. Received 3.45 BTC settlement from INDRA_47 for precursor drum consignments.",
            json.dumps([
                {"signal": "Wallet association with INDRA_47 (bc1q71de...)", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Direct communications link with @indra_ops", "weight": 25, "status": "OBSERVED"},
                {"signal": "Bulk order sequence correlation", "weight": 15, "status": "DETECTED"}
            ]),
            json.dumps([
                {"factor": "Precursor Chemical Brokerage", "score": 30, "reason": "Wholesale supply of restricted precursor compounds"},
                {"factor": "Wallet Cluster Link", "score": 20, "reason": "Settlement ties with INDRA_47 (3.45 BTC)"},
                {"factor": "Cross-Platform Brokerage", "score": 15, "reason": "Active vendor on ChemForge and SimulatedMarket-A"},
                {"factor": "Transaction Volume", "score": 9, "reason": ">18 BTC total processed"}
            ])
        ),
        # ── CHD-0047 & CHD-0012 Synthesis Lab (Shared) ──
        (
            "ENTITY-0024", "PHANTOM_LABS", "Domestic Synthesis Lab Operator", 81, 88, "CRITICAL", "UNDER_INVESTIGATION",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z",
            "@phantom_chem_ops", "bc1q88aa992011fecc771029ab44",
            json.dumps(["SimulatedMarket-B"]),
            json.dumps(["Methamphetamine", "Ketamine Crystals", "MDMA"]),
            "Clandestine laboratory synthesis operator producing high-potency crystal batches. GC-MS forensic analysis confirms impurity fingerprint match with INDRA_47 street seizures.",
            json.dumps([
                {"signal": "GC-MS forensic chemical impurity profile match", "weight": 30, "status": "CONFIRMED"},
                {"signal": "P2P wallet transfers with INDRA_47", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Encrypted handshake metadata overlap", "weight": 20, "status": "OBSERVED"}
            ]),
            json.dumps([
                {"factor": "Synthesis Laboratory Role", "score": 35, "reason": "Direct batch manufacturing evidence"},
                {"factor": "Product Flow to INDRA_47", "score": 25, "reason": "Crystal batches traced to distribution network"},
                {"factor": "Critical Volume", "score": 21, "reason": "Bulk synthetic compound production"}
            ])
        ),
        # ── CHD-0047 Logistics Courier ──
        (
            "ENTITY-0031", "KALI_DISTRO", "Regional Drop Logistics Courier", 68, 76, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z",
            "@kali_drops_chd", "bc1q334455aabbccddeeff001122",
            json.dumps(["LocalDrop Network"]),
            json.dumps(["MDMA", "Ketamine"]),
            "Physical dead-drop courier managing coordinate broadcasts and locker dispatches across Chandigarh tri-city perimeter. Receives payout from INDRA_47 primary wallet.",
            json.dumps([
                {"signal": "Geotagged dead-drop pattern match in Sector 17/22", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Courier fee payout from INDRA_47 wallet (0.74 BTC)", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Telegram channel @kali_drops_chd active", "weight": 20, "status": "DETECTED"}
            ]),
            json.dumps([
                {"factor": "Physical Distribution Logistics", "score": 30, "reason": "Dead-drop placements in urban sectors"},
                {"factor": "Direct Courier Link", "score": 20, "reason": "0.74 BTC payout traced from primary wallet"},
                {"factor": "Repeated Geo-alerts", "score": 18, "reason": "Tri-city localized drop coordinates"}
            ])
        ),
        # ── CHD-0047 Crypto Mixer ──
        (
            "ENTITY-0095", "AEGIS_BROKER", "Cryptocurrency Mixer / Escrow Agent", 84, 89, "CRITICAL", "UNDER_INVESTIGATION",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z",
            "@aegis_escrow_service", "bc1q778899001122334455667788",
            json.dumps(["SimulatedMarket-A", "SimulatedMarket-B"]),
            json.dumps(["Financial Laundering", "Escrow Tumbling"]),
            "Multi-signature escrow hub facilitating privacy coin swapping and settlement for INDRA_47 vendor accounts.",
            json.dumps([
                {"signal": "Direct escrow settlement for INDRA_47", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Multi-sig address pattern clustering", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Financial Obfuscation", "score": 35, "reason": "Tumbling and laundering drug revenues"},
                {"factor": "Cross-Market Settlement", "score": 30, "reason": "Clearing house for darknet vendors"},
                {"factor": "Capital Velocity", "score": 19, "reason": ">80 BTC cumulative volume"}
            ])
        ),
        # ── CHD-0047 Cold Vault ──
        (
            "ENTITY-0112", "SHADOW_VAULT", "Hardware Wallet Cold Custody Node", 76, 81, "HIGH", "MONITORED",
            "2026-07-10T11:00:00Z", "2026-08-17T11:00:00Z",
            "@shadow_vault_ops", "bc1q445566778899001122334455",
            json.dumps(["Off-Market Dark Escrow"]),
            json.dumps(["Asset Stashing"]),
            "Cold storage reserve wallet holding 12.45 BTC accumulated dark market profits swept from INDRA_47 primary wallet.",
            json.dumps([
                {"signal": "Periodic lump-sum sweep from bc1q92fa...", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Asset Stashing", "score": 30, "reason": "Cold vault for illicit proceeds"},
                {"factor": "Structural Link", "score": 26, "reason": "Direct funding from primary vendor wallet"},
                {"factor": "Volume Scale", "score": 20, "reason": ">12 BTC static balance"}
            ])
        ),
        # ── CHD-0012 Technical Adviser ──
        (
            "ENTITY-0063", "CYBER_CHEMIST", "Custom Synthesis Consultant", 62, 70, "MEDIUM", "MONITORED",
            "2026-08-08T10:00:00Z", "2026-08-16T17:40:00Z",
            "@cyber_synth_help", "bc1q990011223344556677889900",
            json.dumps(["DarkSci Forum", "ChemForge Forum"]),
            json.dumps(["Synthesis Protocols", "NPS Formulations"]),
            "Technical adviser publishing clandestine synthesis protocols and providing paid consulting to PHANTOM_LABS.",
            json.dumps([
                {"signal": "Wallet tip payments from PHANTOM_LABS", "weight": 20, "status": "CONFIRMED"},
                {"signal": "PGP key signature on seized lab manuals", "weight": 20, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "NPS Formulation Authorship", "score": 25, "reason": "Clandestine lab optimization manuals"},
                {"factor": "Lab Consulting Link", "score": 20, "reason": "Advising PHANTOM_LABS synthesis operations"},
                {"factor": "Forum Centrality", "score": 17, "reason": "Author of clandestine synthesis guides"}
            ])
        ),
        # ── CHD-0012 Chemical Supplier ──
        (
            "ENTITY-0171", "TITAN_REAGENTS", "Bulk Solvent & Acid Vendor", 64, 71, "MEDIUM", "ACTIVE_SURVEILLANCE",
            "2026-08-03T11:00:00Z", "2026-08-16T12:00:00Z",
            "@titan_solvents", "bc1q890123456789012345678901",
            json.dumps(["ChemForge Forum"]),
            json.dumps(["Anhydrous Ammonia", "Hydrochloric Acid", "Acetone"]),
            "Commercial chemical diversion vendor supplying solvent purification kits and reagents to PHANTOM_LABS clandestine laboratory.",
            json.dumps([
                {"signal": "Delivery manifest overlap with PHANTOM_LABS warehouse", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Chemical Diversion", "score": 26, "reason": "Solvent rerouting to clandestine labs"},
                {"factor": "Supplier Connection", "score": 22, "reason": "Supplying synthesis operations directly"},
                {"factor": "Activity Indicator", "score": 16, "reason": "Repeated industrial chemical sales"}
            ])
        )
    ]

    cursor.executemany("""
    INSERT INTO entities (
        id, alias, entity_type, risk_score, confidence_score, threat_level, status,
        first_seen, last_seen, primary_comms, primary_wallet, marketplaces, drug_categories,
        summary, match_signals, risk_breakdown
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, entities)

    # ─────────────────────────────────────────────────────────────
    # 2. DRUG LISTINGS — 8 listings, strictly from the 2 cases
    # ─────────────────────────────────────────────────────────────
    listings = [
        # ── INDRA_47 Listings (CHD-0047) ──
        (
            "LIST-0091", "HQ 98% Pure MDMA Dutch Crystal [Bulk & Retail Drops]", "MDMA", "Empathogens",
            "0.024 BTC / 50g", "INDRA_47", "SimulatedMarket-A", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-19T10:42:17Z", 88, "CRITICAL", "EVID-0012", "NL → Domestic Tri-City", "Lab Tested 98.4%", "ACTIVE"
        ),
        (
            "LIST-0092", "Medical Grade S-Isomer Ketamine Shards [Dead Drop Ready]", "Ketamine", "Dissociatives",
            "0.018 BTC / 100g", "INDRA_47", "SimulatedMarket-A", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-19T09:15:20Z", 85, "CRITICAL", "EVID-0015", "Domestic Synthesis", "High Purity", "ACTIVE"
        ),
        (
            "LIST-0093", "Pure Carfentanil / Novel Fentanyl Analog Powder", "Synthetic Opioids", "Opioids (Synthetic)",
            "0.065 BTC / 25g", "INDRA_47", "SimulatedMarket-B", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-18T22:30:10Z", 94, "CRITICAL", "EVID-0031", "International Stealth Freight", "LETHAL RISK", "ACTIVE"
        ),
        (
            "LIST-0095", "Pressed 300mg 'Punisher' MDMA Micro-Tabs [Pack of 500]", "MDMA", "Empathogens",
            "0.040 BTC / 500pcs", "INDRA_47", "SimulatedMarket-A", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-18T14:12:44Z", 86, "CRITICAL", "EVID-0047", "Northern Warehouse Stock", "Heavy Press Dual Color", "ACTIVE"
        ),
        # ── VIPER_CORP Precursor (CHD-0047) ──
        (
            "LIST-0097", "BMK Ethyl Glycidate Precursor Oil [25L Drum]", "Precursor Reagents", "Chemical Precursors",
            "0.150 BTC / 25 Liters", "VIPER_CORP", "ChemForge Forum", "@viper_logistics_bot", "bc1q71de4410aa55890bb82109cd",
            "2026-08-17T20:18:00Z", 74, "HIGH", "EVID-0009", "Industrial Reagent Re-label", "Purity 99.2%", "ACTIVE"
        ),
        # ── KALI_DISTRO Dead Drop (CHD-0047) ──
        (
            "LIST-0103", "Tri-City Dead Drop: MDMA + Ketamine Combo Pack", "MDMA & Ketamine", "Multi-Substance Combo",
            "0.010 BTC / Pack", "KALI_DISTRO", "LocalDrop Network", "@kali_drops_chd", "bc1q334455aabbccddeeff001122",
            "2026-08-15T23:50:00Z", 70, "HIGH", "EVID-0017", "Dead Drop Sector 17/22", "Sealed Mylar Vacuum", "ACTIVE"
        ),
        # ── PHANTOM_LABS Crystal Meth (CHD-0012) ──
        (
            "LIST-0094", "High Potency D-Methamphetamine Ice Crystal Rocks", "Methamphetamine", "Stimulants",
            "0.035 BTC / 100g", "PHANTOM_LABS", "SimulatedMarket-B", "@phantom_chem_ops", "bc1q88aa992011fecc771029ab44",
            "2026-08-18T19:40:00Z", 82, "CRITICAL", "EVID-0021", "Domestic Clandestine Lab", "99% Translucent Ice", "ACTIVE"
        ),
        # ── CYBER_CHEMIST NPS (CHD-0012) ──
        (
            "LIST-0106", "Custom NPS Synthesis Protocol Pack [PDF + Precursor Kit]", "Synthesis Protocols", "NPS Formulations",
            "0.008 BTC / Protocol", "CYBER_CHEMIST", "DarkSci Forum", "@cyber_synth_help", "bc1q990011223344556677889900",
            "2026-08-16T11:30:00Z", 60, "MEDIUM", "EVID-0030", "Forum Digital Sale", "Step-by-Step Guide", "ACTIVE"
        )
    ]

    cursor.executemany("""
    INSERT INTO drug_listings (
        id, listing_title, substance, category, price_indicator, seller_alias,
        source_marketplace, communication_identifier, wallet_address, timestamp,
        risk_score, risk_level, evidence_id, origin_country, purity_claim, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, listings)

    # ─────────────────────────────────────────────────────────────
    # 3. CRYPTO WALLETS — 6 wallets (one per entity that has one)
    # ─────────────────────────────────────────────────────────────
    wallets = [
        (
            "bc1q92fa8839dfca112048aaef82", "BTC", 92, "CRITICAL",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z",
            "4.82 BTC (~$284,000 USD)", "18.64 BTC", "13.82 BTC", 84,
            json.dumps(["ENTITY-0047 (INDRA_47)"]),
            json.dumps(["LIST-0091", "LIST-0092", "LIST-0093", "LIST-0095"]),
            json.dumps(["CASE-CHD-0047"]),
            "Primary High-Risk Vendor Deposit Cluster"
        ),
        (
            "bc1q71de4410aa55890bb82109cd", "BTC", 85, "CRITICAL",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z",
            "6.15 BTC (~$362,000 USD)", "34.50 BTC", "28.35 BTC", 112,
            json.dumps(["ENTITY-0018 (VIPER_CORP)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps(["LIST-0097"]),
            json.dumps(["CASE-CHD-0047"]),
            "Precursor Procurement & Settlement Cluster"
        ),
        (
            "bc1q88aa992011fecc771029ab44", "BTC", 80, "CRITICAL",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z",
            "2.90 BTC (~$171,000 USD)", "12.40 BTC", "9.50 BTC", 53,
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)"]),
            json.dumps(["LIST-0094"]),
            json.dumps(["CASE-CHD-0047", "CASE-CHD-0012"]),
            "Domestic Lab Operations & Equipment Settlement"
        ),
        (
            "bc1q334455aabbccddeeff001122", "BTC", 69, "HIGH",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z",
            "0.74 BTC (~$43,500 USD)", "4.15 BTC", "3.41 BTC", 62,
            json.dumps(["ENTITY-0031 (KALI_DISTRO)"]),
            json.dumps(["LIST-0103"]),
            json.dumps(["CASE-CHD-0047"]),
            "Tri-City Drop Runner Payout Node"
        ),
        (
            "bc1q778899001122334455667788", "BTC", 89, "CRITICAL",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z",
            "15.80 BTC (~$932,000 USD)", "89.20 BTC", "73.40 BTC", 320,
            json.dumps(["ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps([]),
            json.dumps(["CASE-CHD-0047"]),
            "Dark Escrow & Privacy Tumbler Node"
        ),
        (
            "bc1q445566778899001122334455", "BTC", 78, "HIGH",
            "2026-07-10T11:00:00Z", "2026-08-17T11:00:00Z",
            "12.45 BTC (~$734,000 USD)", "15.00 BTC", "2.55 BTC", 14,
            json.dumps(["ENTITY-0112 (SHADOW_VAULT)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps([]),
            json.dumps(["CASE-CHD-0047"]),
            "Cold Storage Profit Accumulation Vault"
        )
    ]

    cursor.executemany("""
    INSERT INTO crypto_wallets (
        address, currency, risk_score, risk_level, first_seen, last_seen,
        balance_est, total_received, total_sent, tx_count, linked_entities,
        related_listings, related_investigations, cluster_tag
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, wallets)

    # ─────────────────────────────────────────────────────────────
    # 4. ENCRYPTED PLATFORM RECORDS — 7 records (one per entity that has comms)
    # ─────────────────────────────────────────────────────────────
    comms_records = [
        (
            "COMM-001", "Encrypted Channel / Telegram", "@indra_ops", "INDRA_47", "ENTITY-0047", 89,
            "Public Darknet Listing Metadata & Forum Profile", "Primary Dispatch Coordinator", "MDMA, Ketamine, Synthetic Opioids",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z", "EVID-0001", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-002", "Session Encrypted Messenger", "05a9f24881cc9241bb3301de88f01a", "INDRA_47", "ENTITY-0047", 84,
            "Marketplace PGP Signed Bio", "Secondary Secure Fallback", "Bulk Wholesale Orders",
            "2026-08-14T08:00:00Z", "2026-08-18T19:00:00Z", "EVID-0005", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-003", "Encrypted Channel / Telegram", "@viper_logistics_bot", "VIPER_CORP", "ENTITY-0018", 81,
            "ChemForge Precursor Thread", "Chemical Reagent Ordering Bot", "BMK / PMK Glycidate",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z", "EVID-0009", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-004", "Encrypted Channel / Telegram", "@phantom_chem_ops", "PHANTOM_LABS", "ENTITY-0024", 86,
            "SimulatedMarket-B Vendor Card", "Synthesis Lab Dispatch Head", "Methamphetamine / Ketamine",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z", "EVID-0021", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-005", "Encrypted Channel / Telegram", "@kali_drops_chd", "KALI_DISTRO", "ENTITY-0031", 79,
            "Investigator Drop Monitor Capture", "Local Tri-City Dead Drop Dispatcher", "MDMA & Ketamine Packages",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z", "EVID-0017", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-006", "Encrypted Channel / Telegram", "@aegis_escrow_service", "AEGIS_BROKER", "ENTITY-0095", 88,
            "Marketplace Escrow PGP Key Bio", "Escrow & Coin Swap Arbitrage", "Laundering Operations",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z", "EVID-0037", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-007", "Encrypted Channel / Telegram", "@cyber_synth_help", "CYBER_CHEMIST", "ENTITY-0063", 68,
            "DarkSci Lab Manual Author Tag", "Technical Lab Adviser", "Synthesis Consultation",
            "2026-08-08T10:00:00Z", "2026-08-16T17:40:00Z", "EVID-0030", "CORRELATED_CONFIRMED"
        )
    ]

    cursor.executemany("""
    INSERT INTO encrypted_platform_records (
        id, platform_name, identifier, related_alias, linked_entity_id,
        confidence_score, provenance_source, observed_role, substance_focus,
        first_observed, last_observed, evidence_id, verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, comms_records)

    # ─────────────────────────────────────────────────────────────
    # 5. ALERTS — 6 alerts (CHD-0047 primary, 1 CHD-0012)
    # ─────────────────────────────────────────────────────────────
    alerts = [
        (
            "ALT-8841", "Cross-Platform Identity Correlation Detected: INDRA_47", "CRITICAL", "ENTITY_CORRELATION",
            "2026-08-19T10:41:52Z", "Simulated Darknet Marketplace & Encrypted Platform",
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0018 (VIPER_CORP)"]),
            "Wallet bc1q92fa8839dfca112048aaef82 and handle @indra_ops correlated with 91% confidence across SimulatedMarket-A, SimulatedMarket-B, and Telegram.",
            91, "NEW", "/entities/ENTITY-0047"
        ),
        (
            "ALT-8842", "High-Potency Synthetic Opioid Listing Detected", "CRITICAL", "DRUG_THREAT",
            "2026-08-19T10:30:15Z", "SimulatedMarket-B",
            json.dumps(["ENTITY-0047 (INDRA_47)"]),
            "Novel fentanyl/carfentanil analog listing (LIST-0093) posted with domestic shipping claims in Northern Sector. Lethal potency risk.",
            94, "NEW", "/drugs"
        ),
        (
            "ALT-8843", "High-Volume Precursor Chemical Escrow Settlement", "HIGH", "FINANCIAL_CORRELATION",
            "2026-08-19T09:12:40Z", "Synthetic Blockchain Monitor",
            json.dumps(["ENTITY-0018 (VIPER_CORP)", "ENTITY-0047 (INDRA_47)"]),
            "3.45 BTC settlement observed between primary vendor wallet bc1q92fa... and precursor hub bc1q71de...",
            87, "ACKNOWLEDGED", "/crypto"
        ),
        (
            "ALT-8844", "Dead-Drop Geospatial Surge: Tri-City Perimeter", "HIGH", "BEHAVIOURAL_ALERT",
            "2026-08-19T08:15:00Z", "LocalDrop Intelligence Capture",
            json.dumps(["ENTITY-0031 (KALI_DISTRO)"]),
            "Repeated dead-drop coordinate clusters detected within 5km radius across Sector 17 and highway junction.",
            82, "INVESTIGATING", "/investigation-panel"
        ),
        (
            "ALT-8845", "Clandestine Lab Batch Signature Matched: PHANTOM_LABS → INDRA_47", "CRITICAL", "LAB_SIGNATURE",
            "2026-08-19T06:22:00Z", "Forensic Laboratory Intelligence",
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0047 (INDRA_47)"]),
            "Chemical impurity profile from seized MDMA tabs matches crystal stock from PHANTOM_LABS. Direct supply chain link confirmed.",
            89, "INVESTIGATING", "/entities/ENTITY-0024"
        ),
        (
            "ALT-8846", "Crystal Shadow Lab: New NPS Synthesis Manual Detected", "MEDIUM", "DOCUMENT_THREAT",
            "2026-08-19T05:00:00Z", "DarkSci Forum Intelligence Crawler",
            json.dumps(["ENTITY-0063 (CYBER_CHEMIST)", "ENTITY-0024 (PHANTOM_LABS)"]),
            "CYBER_CHEMIST publishes new high-yield crystal synthesis protocol. Manual PGP-signed and cross-referenced with PHANTOM_LABS wallet.",
            72, "ACKNOWLEDGED", "/entities/ENTITY-0063"
        )
    ]

    cursor.executemany("""
    INSERT INTO alerts (
        id, title, severity, alert_type, timestamp, source, affected_entities,
        reason, confidence, status, target_route
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, alerts)

    # ─────────────────────────────────────────────────────────────
    # 6. INVESTIGATIONS — exactly 2 cases
    # ─────────────────────────────────────────────────────────────
    investigations = [
        (
            "CASE-CHD-0047", "CHD-DRUG-0047", "Operation INDRA: Cross-Platform Darknet & Encrypted Drug Distribution Syndicate",
            "ACTIVE", "CRITICAL", "DSP R. Sharma / Cyber Crime Division", "2026-08-12T04:00:00Z", "2026-08-19T10:45:00Z",
            "Multi-source intelligence fusion probe targeting the INDRA_47 syndicate operating across darknet marketplaces (SimulatedMarket-A, SimulatedMarket-B), encrypted communication channels (@indra_ops, @kali_drops_chd), and cryptocurrency settlement hubs. Primary illicit activities: regional distribution of MDMA crystals, Ketamine shards, and synthetic opioid compounds via dead-drops and postal couriers across the Chandigarh tri-city perimeter.",
            json.dumps(["MDMA", "Ketamine", "Synthetic Opioids (Fentanyl Analogs)", "Precursors (BMK/PMK)"]),
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0018 (VIPER_CORP)", "ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0031 (KALI_DISTRO)", "ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0112 (SHADOW_VAULT)"]),
            json.dumps(["SimulatedMarket-A", "SimulatedMarket-B", "ChemForge Forum", "Telegram Protocol Channels", "Session Messenger", "Synthetic Bitcoin Ledger", "LocalDrop Network"]),
            16, "Chandigarh Cybercrime Operations & Inter-State Coordination",
            "Disrupt supply chain, identify physical dead-drop logistics coordinators, trace cryptocurrency proceeds, and prevent synthetic opioid influx into urban centers."
        ),
        (
            "CASE-CHD-0012", "CHD-DRUG-0012", "Operation Crystal Shadow: Domestic Clandestine Lab & NPS Synthesis Network",
            "UNDER_INVESTIGATION", "HIGH", "Inspector V. Malik / State Narcotics Cell", "2026-07-28T09:00:00Z", "2026-08-19T06:30:00Z",
            "Investigation into a domestic clandestine methamphetamine synthesis facility operated by PHANTOM_LABS. Technical synthesis knowledge supplied by CYBER_CHEMIST via DarkSci Forum. Precursor solvents and acids procured from TITAN_REAGENTS through commercial camouflage. Batch impurity fingerprint ties this operation directly to INDRA_47 street-level distribution.",
            json.dumps(["MDMA", "Methamphetamine", "Synthesis Reagents", "Anhydrous Ammonia"]),
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0063 (CYBER_CHEMIST)", "ENTITY-0171 (TITAN_REAGENTS)"]),
            json.dumps(["SimulatedMarket-B", "DarkSci Forum", "ChemForge Forum", "Domestic Freight Logs"]),
            8, "State Cybercrime Narcotics Cell / Chandigarh",
            "Locate and shut down illicit synthesis facility, intercept industrial chemical solvent diversions, and prosecute technical adviser."
        )
    ]

    cursor.executemany("""
    INSERT INTO investigations (
        id, case_number, title, status, risk_level, lead_investigator, opened_date,
        last_updated, summary, target_substances, linked_entities, linked_sources,
        evidence_count, jurisdiction, objective
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, investigations)

    # ─────────────────────────────────────────────────────────────
    # 7. EVIDENCE VAULT — 16 key exhibits across both cases
    # ─────────────────────────────────────────────────────────────
    evidence_items = [
        # CHD-0047
        ("EVID-0001", "Darknet Listing Capture: INDRA_47 Vendor Profile & Bio (SimulatedMarket-A)", "MARKETPLACE_SNAPSHOT", "SimulatedMarket-A Crawler", "2026-08-12T04:12:00Z", generate_hash("EVID-0001-INDRA47-BIO"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "WORM Vault Ingestion Node 04", "Full DOM snapshot showing alias INDRA_47, PGP key fingerprint 8F4A2201BC994410, and Telegram contact @indra_ops.", json.dumps({"url": "http://simulatedmarket-a.onion/vendor/indra47", "pgp_fingerprint": "8F4A 2201 BC99 4410"})),
        ("EVID-0004", "Encrypted Dead-Drop Locker Coordinate Dump (Sector 22)", "COMMUNICATION_RECORD", "Field Interception Unit", "2026-08-12T05:30:00Z", generate_hash("EVID-0004-LOCKER-DROP"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Forensic Hex Dump → Chain of Custody", "PGP dispatch instructions for Sector 22 locker containing 200 Blue Tesla MDMA pills (280mg each).", json.dumps({"sector": "22", "substance": "MDMA 280mg", "quantity": "200 tablets"})),
        ("EVID-0005", "Session Messenger ID Cryptographic Fingerprint Match", "SESSION_IDENTITY", "Marketplace Profile Capture", "2026-08-14T08:00:00Z", generate_hash("EVID-0005-SESSION-ID"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Automated Entity Resolver → Certified", "Session ID 05a9f24881cc9241bb3301de88f01a correlated with @indra_ops dispatch records.", json.dumps({"session_id": "05a9f24881cc9241bb3301de88f01a"})),
        ("EVID-0009", "ChemForge Forum: VIPER_CORP Precursor Offer Thread & BTC Payout Address", "FORUM_ARCHIVE", "ChemForge Intelligence Mirror", "2026-08-01T11:20:00Z", generate_hash("EVID-0009-CHEMFORGE-BMK"), "ENTITY-0018", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Mirror node archive → SHA-256 stamped", "VIPER_CORP offering 25L BMK Ethyl Glycidate drums with BTC address bc1q71de4410aa55890bb82109cd.", json.dumps({"forum": "ChemForge", "reagent": "BMK Ethyl Ester"})),
        ("EVID-0012", "Listing Snapshot: LIST-0091 — MDMA Dutch Crystal 98%", "MARKETPLACE_SNAPSHOT", "SimulatedMarket-A Feed", "2026-08-19T10:42:17Z", generate_hash("EVID-0012-LIST-0091-MDMA"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Auto Hash Verification Ingestion", "Real-time listing for 50g 98.4% MDMA Dutch crystal posted by INDRA_47 with escrow wallet bc1q92fa...", json.dumps({"listing_id": "LIST-0091", "price_btc": 0.024})),
        ("EVID-0015", "Listing Snapshot: LIST-0092 — S-Isomer Ketamine Shards", "MARKETPLACE_SNAPSHOT", "SimulatedMarket-A Feed", "2026-08-19T09:15:20Z", generate_hash("EVID-0015-LIST-0092-KETAMINE"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Real-time Ingestion Pipeline", "High-potency Ketamine listing with dead-drop delivery tags in Northern Tri-City jurisdiction.", json.dumps({"listing_id": "LIST-0092", "price_btc": 0.018})),
        ("EVID-0017", "Telegram Channel Monitor Capture: @kali_drops_chd", "COMMUNICATION_RECORD", "Monitored Telegram Feed", "2026-08-05T14:45:00Z", generate_hash("EVID-0017-KALI-DROPS"), "ENTITY-0031", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Screen Recording & Packet Capture", "Channel broadcast announcing active drop batches in Sectors 17, 22, and 35. 48 posts analysed.", json.dumps({"channel": "@kali_drops_chd", "posts_analyzed": 48})),
        ("EVID-0031", "Listing Snapshot: LIST-0093 — Synthetic Opioid / Carfentanil Analog", "MARKETPLACE_SNAPSHOT", "SimulatedMarket-B Feed", "2026-08-18T22:30:10Z", generate_hash("EVID-0031-LIST-0093-CARFENTANIL"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Automated Threat Ingestion", "CRITICAL listing offering 25g novel synthetic opioid with extreme potency warning.", json.dumps({"listing_id": "LIST-0093", "price_btc": 0.065})),
        ("EVID-0037", "Multi-Signature Escrow Contract Bytecode — AEGIS_BROKER", "BLOCKCHAIN_RECORD", "Synthetic Blockchain Scanner", "2026-07-20T16:00:00Z", generate_hash("EVID-0037-AEGIS-ESCROW"), "ENTITY-0095", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Blockchain Proof Validated", "2-of-3 multi-sig escrow contract used by AEGIS_BROKER to settle INDRA_47 vendor proceeds.", json.dumps({"multisig_address": "bc1q778899001122334455667788"})),
        ("EVID-0047", "Listing Snapshot: LIST-0095 — 'Punisher' 300mg MDMA Pressed Tabs x500", "MARKETPLACE_SNAPSHOT", "SimulatedMarket-A Feed", "2026-08-18T14:12:44Z", generate_hash("EVID-0047-LIST-0095-PUNISHER"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Master Case Linked Ingestion", "Wholesale batch of 500 dual-color Punisher pressed MDMA tabs linked to wallet bc1q92fa...", json.dumps({"listing_id": "LIST-0095", "price_btc": 0.040, "quantity": 500})),
        ("EVID-0048", "PGP Key Certificate: INDRA_47 Master 4096-bit RSA", "CRYPTOGRAPHIC_CERTIFICATE", "Public Key Server Sync", "2026-08-12T04:12:00Z", generate_hash("EVID-0048-PGP-CERT"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Public Key Mirror Archive", "4096-bit RSA PGP master key matching vendor bio signature blocks.", json.dumps({"key_id": "0x8F4A2201BC994410", "bits": 4096})),
        ("EVID-0049", "Blockchain Inflow Trace: 18.64 BTC to bc1q92fa...", "FINANCIAL_DOCUMENT", "Synthetic Blockchain Unit", "2026-08-19T10:41:52Z", generate_hash("EVID-0049-BLOCKCHAIN-MEMO"), "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Certified Forensic Ledger Record", "84 inbound escrow settlements totalling 18.64 BTC into primary vendor wallet.", json.dumps({"wallet": "bc1q92fa8839dfca112048aaef82", "total_btc": 18.64})),
        # CHD-0012
        ("EVID-0021", "GC-MS Forensic Lab Report: PHANTOM_LABS Crystal Meth Batch", "FORENSIC_LAB_REPORT", "State Forensic Science Lab", "2026-07-28T09:14:00Z", generate_hash("EVID-0021-FSL-METH-LAB"), "ENTITY-0024", "CASE-CHD-0012", "VERIFIED_INTEGRITY", "Digital Forensic Upload → Signed", "Gas Chromatography-Mass Spectrometry report confirming 99.1% D-Methamphetamine purity matching PHANTOM_LABS stock.", json.dumps({"fsl_ref": "FSL-CHD-2026-9012", "substance": "D-Methamphetamine", "purity": "99.1%"})),
        ("EVID-0030", "DarkSci Forum: CYBER_CHEMIST Lab Manual 'Flow Ephedrine Reduction v3.1'", "TECHNICAL_DOCUMENT", "DarkSci Forum Repository Archive", "2026-08-08T10:00:00Z", generate_hash("EVID-0030-LAB-MANUAL"), "ENTITY-0063", "CASE-CHD-0012", "VERIFIED_INTEGRITY", "Digital Signature Stamped", "PDF manual detailing high-yield crystal meth synthesis protocol, PGP-signed by CYBER_CHEMIST.", json.dumps({"title": "Flow Ephedrine Reduction v3.1", "author": "CYBER_CHEMIST"})),
        ("EVID-0036", "Industrial Cylinder Delivery Receipt: TITAN_REAGENTS → Clandestine Warehouse", "COMMERCIAL_DOCUMENT", "Chemical Surveillance Unit", "2026-08-13T11:00:00Z", generate_hash("EVID-0036-AMMONIA-CYLINDER"), "ENTITY-0171", "CASE-CHD-0012", "VERIFIED_INTEGRITY", "Subpoena Execution", "Delivery manifest for 2 steel cylinders of anhydrous ammonia (serials NH3-9901, NH3-9902) to warehouse drop.", json.dumps({"cylinder_serial": ["NH3-9901", "NH3-9902"]})),
        ("EVID-0050", "Blockchain Trace: INDRA_47 → KALI_DISTRO Courier Fee (0.74 BTC)", "FINANCIAL_DOCUMENT", "Synthetic Blockchain Unit", "2026-08-15T23:00:00Z", generate_hash("EVID-0050-COURIER-PAYOUT"), "ENTITY-0031", "CASE-CHD-0047", "VERIFIED_INTEGRITY", "Blockchain Trace Hash Sealed", "On-chain settlement from INDRA_47 wallet to KALI_DISTRO courier wallet bc1q334455...", json.dumps({"txid": "55bb2233cc...", "amount_btc": 0.74}))
    ]

    cursor.executemany("""
    INSERT INTO evidence (
        id, title, evidence_type, source_origin, collection_timestamp, sha256_hash,
        associated_entity_id, associated_investigation_id, integrity_status,
        chain_of_custody, description, raw_metadata
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, evidence_items)

    # ─────────────────────────────────────────────────────────────
    # 8. TIMELINE EVENTS — 20 focused, high-value events for both cases
    # ─────────────────────────────────────────────────────────────
    timeline = [
        ("EVT-01", "2026-08-12T04:12:00Z", "12 AUG", "First Darknet Listing Detected: INDRA_47", "Crawler indexed high-risk MDMA listing on SimulatedMarket-A under alias INDRA_47 with @indra_ops contact.", "MARKETPLACE_LISTING", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A", "EVID-0001"),
        ("EVT-02", "2026-08-12T05:30:00Z", "12 AUG", "Encrypted Dead-Drop Broadcast: Sector 22 Locker", "PGP broadcast specifying Sector 22 locker coordinates for 200 Blue Tesla MDMA tabs.", "FIELD_INTELLIGENCE", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Field Interception Unit", "EVID-0004"),
        ("EVT-03", "2026-08-12T14:00:00Z", "12 AUG", "Investigation Opened: CHD-DRUG-0047", "SP authorizes intelligence fusion probe targeting multi-platform vendor network under Case #CHD-DRUG-0047.", "CASE_ACTION", "MEDIUM", "ENTITY-0047", "CASE-CHD-0047", "Cyber Crime Division", "EVID-0001"),
        ("EVT-04", "2026-08-13T09:00:00Z", "13 AUG", "Telegram Handle Correlation: @indra_ops", "Intelligence engine correlates @indra_ops across drug discussion channels and dead-drop groups.", "COMMUNICATION_LINK", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Encrypted Channel Telemetry", "EVID-0001"),
        ("EVT-05", "2026-08-13T11:00:00Z", "13 AUG", "[Crystal Shadow] Industrial Solvents Order Intercepted: TITAN_REAGENTS", "Anhydrous ammonia cylinders delivered to clandestine warehouse linked to PHANTOM_LABS.", "CHEMICAL_LINK", "MEDIUM", "ENTITY-0171", "CASE-CHD-0012", "Chemical Logistics Unit", "EVID-0036"),
        ("EVT-06", "2026-08-14T08:00:00Z", "14 AUG", "Primary Crypto Wallet Identified: bc1q92fa...", "Blockchain tracing links bc1q92fa... to 4 darknet listing escrows. 18.64 BTC cumulative inflow.", "CRYPTO_CORRELATION", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0012"),
        ("EVT-07", "2026-08-15T23:50:00Z", "15 AUG", "Dead-Drop Channel Active: @kali_drops_chd Launched", "Local courier begins live drop notifications for Chandigarh tri-city sectors.", "CHANNEL_MONITOR", "HIGH", "ENTITY-0031", "CASE-CHD-0047", "Encrypted Channel Telemetry", "EVID-0017"),
        ("EVT-08", "2026-08-15T23:00:00Z", "15 AUG", "Courier Fee Traced: 0.74 BTC to KALI_DISTRO", "Direct on-chain payout from INDRA_47 wallet to @kali_drops_chd courier wallet.", "FINANCIAL_TRANSFER", "HIGH", "ENTITY-0031", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0050"),
        ("EVT-09", "2026-08-16T11:30:00Z", "16 AUG", "[Crystal Shadow] CYBER_CHEMIST Publishes New Synthesis Manual", "Flow Ephedrine Reduction v3.1 posted on DarkSci Forum with PHANTOM_LABS wallet payment acknowledgement.", "DOCUMENT_THREAT", "MEDIUM", "ENTITY-0063", "CASE-CHD-0012", "DarkSci Forum Monitor", "EVID-0030"),
        ("EVT-10", "2026-08-17T11:00:00Z", "17 AUG", "Cold Vault Sweep: 12.45 BTC → SHADOW_VAULT", "Lump-sum BTC consolidation from active market wallet to cold storage bc1q4455...", "CRYPTO_SWEEP", "HIGH", "ENTITY-0112", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0037"),
        ("EVT-11", "2026-08-17T20:18:00Z", "17 AUG", "Precursor Settlement Confirmed: 3.45 BTC to VIPER_CORP", "Direct blockchain transfer from bc1q92fa... to precursor broker bc1q71de...", "FINANCIAL_TRANSFER", "CRITICAL", "ENTITY-0018", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0009"),
        ("EVT-12", "2026-08-18T14:12:44Z", "18 AUG", "Bulk 'Punisher' MDMA Batch Published: 500 Units", "LIST-0095 posted on SimulatedMarket-A — 500-pack dual-color pressed MDMA tabs.", "MARKETPLACE_LISTING", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A", "EVID-0047"),
        ("EVT-13", "2026-08-18T19:40:00Z", "18 AUG", "[Crystal Shadow] PHANTOM_LABS Crystal Meth Batch Verified by GC-MS", "Forensic impurity fingerprint confirms PHANTOM_LABS synthesis matches seized street samples.", "FORENSIC_LINK", "CRITICAL", "ENTITY-0024", "CASE-CHD-0012", "State Forensic Science Lab", "EVID-0021"),
        ("EVT-14", "2026-08-18T22:30:10Z", "18 AUG", "LETHAL THREAT: Carfentanil Analog Listing Detected (LIST-0093)", "Automated risk engine escalates INDRA_47 network to CRITICAL. Novel opioid offers 25g with domestic shipping.", "RISK_ESCALATION", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Automated Threat Engine", "EVID-0031"),
        ("EVT-15", "2026-08-19T05:00:00Z", "19 AUG", "Escrow Tumbler Alert: AEGIS_BROKER Multi-Sig Pool", "15.8 BTC settled through 2-of-3 multi-sig address to obscure drug proceeds.", "MIXER_ALERT", "HIGH", "ENTITY-0095", "CASE-CHD-0047", "Synthetic Blockchain Monitor", "EVID-0037"),
        ("EVT-16", "2026-08-19T06:22:00Z", "19 AUG", "Lab Fingerprint Match Confirmed: PHANTOM_LABS → INDRA_47 Network", "Correlation engine confirms chemical link between domestic synthesis and INDRA_47 retail distribution.", "CORRELATION_CONFIRMED", "CRITICAL", "ENTITY-0024", "CASE-CHD-0047", "Intelligence Fusion Engine", "EVID-0021"),
        ("EVT-17", "2026-08-19T08:15:00Z", "19 AUG", "Geospatial Drop Cluster: Sector 17 & 22 Active", "@kali_drops_chd logs active drops in urban commercial centers.", "GEO_SURGE", "HIGH", "ENTITY-0031", "CASE-CHD-0047", "Field Surveillance Unit", "EVID-0017"),
        ("EVT-18", "2026-08-19T09:15:20Z", "19 AUG", "New High-Risk Listing: Ketamine Shards (LIST-0092)", "LIST-0092 indexed on SimulatedMarket-A with dead-drop courier dispatch.", "MARKETPLACE_LISTING", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A", "EVID-0015"),
        ("EVT-19", "2026-08-19T10:41:52Z", "19 AUG", "FUSION ALERT ALT-8841: INDRA_47 Cross-Platform Correlation (91%)", "Intelligence system synthesizes 91% confidence linking INDRA_47, @indra_ops, and bc1q92fa...", "FUSION_ALERT", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Intelligence Fusion Engine", "EVID-0012"),
        ("EVT-20", "2026-08-19T10:42:17Z", "19 AUG", "Live Listing Ingested: 98% MDMA Dutch Crystal (LIST-0091)", "Real-time SSE stream captures new active listing from INDRA_47 on SimulatedMarket-A.", "LIVE_FEED_STREAM", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Live Intelligence Crawler", "EVID-0012")
    ]

    cursor.executemany("""
    INSERT INTO timeline_events (
        id, timestamp, date_str, title, description, event_type, severity,
        associated_entity_id, associated_investigation_id, source, evidence_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, timeline)

    # ─────────────────────────────────────────────────────────────
    # 9. AUDIT LOGS
    # ─────────────────────────────────────────────────────────────
    audit_records = [
        ("AUD-1001", "Officer-27 (DSP Sharma)", "Investigator", "LOGIN_AUTHENTICATED", "SYSTEM_AUTH", "2026-08-19T08:00:12Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1002", "Officer-27 (DSP Sharma)", "Investigator", "ACCESSED_COMMAND_CENTER", "DASHBOARD", "2026-08-19T08:00:15Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1003", "Officer-27 (DSP Sharma)", "Investigator", "VIEWED_ALERT", "ALT-8841", "2026-08-19T08:15:20Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1004", "Officer-27 (DSP Sharma)", "Investigator", "VIEWED_ENTITY_PROFILE", "ENTITY-0047 (INDRA_47)", "2026-08-19T08:16:05Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1005", "Officer-27 (DSP Sharma)", "Investigator", "INSPECTED_NETWORK_GRAPH", "GRAPH_ENTITY-0047", "2026-08-19T08:18:40Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1006", "Officer-27 (DSP Sharma)", "Investigator", "INSPECTED_WALLET_FLOW", "bc1q92fa8839dfca112048aaef82", "2026-08-19T08:21:10Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1007", "Officer-27 (DSP Sharma)", "Investigator", "ACCESSED_INVESTIGATION_CASE", "CASE-CHD-0047", "2026-08-19T08:25:30Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1008", "Officer-27 (DSP Sharma)", "Investigator", "VERIFIED_EVIDENCE_HASH", "EVID-0012", "2026-08-19T08:30:12Z", "SUCCESS (HASH_VALID)", "10.24.110.12"),
        ("AUD-1009", "Officer-27 (DSP Sharma)", "Investigator", "GENERATED_INTELLIGENCE_REPORT", "CHD-DRUG-0047-DOSSIER", "2026-08-19T08:35:00Z", "SUCCESS", "10.24.110.12"),
        ("AUD-1010", "Inspector-14 (V. Malik)", "Investigator", "ACCESSED_INVESTIGATION_CASE", "CASE-CHD-0012", "2026-08-19T09:00:00Z", "SUCCESS", "10.24.118.44"),
        ("AUD-1011", "Inspector-14 (V. Malik)", "Investigator", "VIEWED_ENTITY_PROFILE", "ENTITY-0024 (PHANTOM_LABS)", "2026-08-19T09:03:20Z", "SUCCESS", "10.24.118.44"),
        ("AUD-1012", "Inspector-14 (V. Malik)", "Investigator", "VERIFIED_EVIDENCE_HASH", "EVID-0021", "2026-08-19T09:10:05Z", "SUCCESS (HASH_VALID)", "10.24.118.44")
    ]

    cursor.executemany("""
    INSERT INTO audit_logs (
        id, user_officer, role, action, resource_target, timestamp, result, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, audit_records)

    conn.commit()
    conn.close()
    print("[OK] Clean 2-case dataset seeded: CASE-CHD-0047 (INDRA_47) + CASE-CHD-0012 (Crystal Shadow)")
    print("  Entities: 8 | Listings: 8 | Wallets: 6 | Comms: 7 | Alerts: 6 | Evidence: 16 | Timeline: 20")

if __name__ == "__main__":
    seed_database()
