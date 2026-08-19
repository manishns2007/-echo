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

    # Clear existing
    cursor.execute("DELETE FROM entities")
    cursor.execute("DELETE FROM drug_listings")
    cursor.execute("DELETE FROM crypto_wallets")
    cursor.execute("DELETE FROM encrypted_platform_records")
    cursor.execute("DELETE FROM alerts")
    cursor.execute("DELETE FROM investigations")
    cursor.execute("DELETE FROM evidence")
    cursor.execute("DELETE FROM timeline_events")
    cursor.execute("DELETE FROM audit_logs")

    # 1. ENTITIES
    entities = [
        (
            "ENTITY-0047", "INDRA_47", "Suspect Coordinator / Multi-Platform Vendor", 87, 91, "CRITICAL", "ACTIVE_SURVEILLANCE",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z",
            "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            json.dumps(["SimulatedMarket-A (Abyss)", "SimulatedMarket-B (SilkForge)", "ShadowNet Hub"]),
            json.dumps(["MDMA", "Ketamine", "Synthetic Opioids (Fentanyl Analog)"]),
            "Primary high-value target identified through cross-platform alias and cryptocurrency wallet correlation. Coordinates bulk dispatch drops across Northern regions.",
            json.dumps([
                {"signal": "Exact Alias Match across 2 Darknet Markets", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Cryptographic Wallet Re-use (bc1q92fa...)", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Encrypted Handle Match (@indra_ops)", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Temporal Dispatch Correlation (<30 min variance)", "weight": 15, "status": "DETECTED"},
                {"signal": "Linguistic Grammar & PGP Key Metadata Match", "weight": 10, "status": "STRONG_CORRELATION"}
            ]),
            json.dumps([
                {"factor": "Drug-related activity", "score": 25, "reason": "Active listings for high-potency Schedule I & II synthetic compounds"},
                {"factor": "Multiple high-risk listings", "score": 15, "reason": "6 active listings with high volume claims"},
                {"factor": "Cross-platform identity match", "score": 20, "reason": "Confirmed overlap across 3 independent marketplaces and 1 encrypted channel"},
                {"factor": "Wallet association", "score": 15, "reason": "Direct co-signing transactions with known laundering hub bc1q71de..."},
                {"factor": "Repeated activity", "score": 10, "reason": "Continuous dispatch records over 7-day surveillance window"},
                {"factor": "Network centrality", "score": 10, "reason": "Degree centrality > 0.84 within northern distribution cluster"},
                {"factor": "Suspicious temporal behaviour", "score": 5, "reason": "Automated listing refresh cycles during off-market hours"}
            ])
        ),
        (
            "ENTITY-0018", "VIPER_CORP", "Precursor Chemical Broker", 74, 82, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z",
            "@viper_logistics_bot", "bc1q71de4410aa55890bb82109cd",
            json.dumps(["SimulatedMarket-A (Abyss)", "ChemForge Forum"]),
            json.dumps(["Precursor Reagents", "BMK Ethyl Ester", "PMK Glycidate"]),
            "Suspected chemical supplier routing wholesale precursor reagents into domestic laboratory hubs.",
            json.dumps([
                {"signal": "Shared Crypto Wallet (bc1q71de...)", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Communication Link to @indra_ops", "weight": 25, "status": "OBSERVED"},
                {"signal": "Bulk Ordering Temporal Sequence", "weight": 15, "status": "DETECTED"}
            ]),
            json.dumps([
                {"factor": "Precursor Chemical Brokerage", "score": 30, "reason": "Wholesale supply of restricted synthetic precursors"},
                {"factor": "Wallet Cluster Link", "score": 20, "reason": "Laundering ties with Entity-0047"},
                {"factor": "Cross-Platform Brokerage", "score": 15, "reason": "Active presence on ChemForge and darknet vendor forums"},
                {"factor": "High Transaction Velocity", "score": 9, "reason": ">18 BTC equivalent volume processed in 30 days"}
            ])
        ),
        (
            "ENTITY-0024", "PHANTOM_LABS", "Domestic Synthesis Lab Operator", 81, 88, "CRITICAL", "UNDER_INVESTIGATION",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z",
            "@phantom_chem_ops", "bc1q88aa992011fecc771029ab44",
            json.dumps(["SimulatedMarket-B (SilkForge)", "Encrypted Channel Alpha"]),
            json.dumps(["Methamphetamine", "Ketamine Crystals", "MDMA Rocks"]),
            "High-capacity synthetic lab operation supplying purified crystal batches to INDRA_47 dispatch network.",
            json.dumps([
                {"signal": "Lab Signature & Packaging Mark Correlation", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Frequent P2P Wallet Transfers to INDRA_47", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Encrypted Order Handshake Metadata", "weight": 20, "status": "OBSERVED"}
            ]),
            json.dumps([
                {"factor": "Synthesis Laboratory Role", "score": 35, "reason": "Direct batch manufacturing indicators"},
                {"factor": "Direct Dispatch Tie-in", "score": 25, "reason": "Direct product flow to INDRA_47 drop points"},
                {"factor": "Critical Risk Chemical Volume", "score": 21, "reason": "Excess of 25kg simulated product equivalents detected"}
            ])
        ),
        (
            "ENTITY-0031", "KALI_DISTRO", "Regional Drop Logistics Courier", 68, 76, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z",
            "@kali_drops_chd", "bc1q334455aabbccddeeff001122",
            json.dumps(["LocalDrop Network", "Encrypted Channel Beta"]),
            json.dumps(["MDMA", "Ketamine"]),
            "Local dead-drop logistics coordinator handling dead drops and locker dispatches across Chandigarh tri-city perimeter.",
            json.dumps([
                {"signal": "Geotagged Drop Pattern Match", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Downstream Wallet Payout from INDRA_47", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Telegram Bot API Sub-channel", "weight": 15, "status": "DETECTED"}
            ]),
            json.dumps([
                {"factor": "Physical Distribution Logistics", "score": 30, "reason": "Dead-drop operations in urban sectors"},
                {"factor": "Direct Courier Link", "score": 20, "reason": "Payouts traced from primary suspect wallet"},
                {"factor": "Repeated Geo-alerts", "score": 18, "reason": "Tri-city localized drop pins"}
            ])
        ),
        (
            "ENTITY-0052", "NEXUS_SUPPLY", "Wholesale Import Syndicate", 79, 85, "CRITICAL", "UNDER_INVESTIGATION",
            "2026-07-15T18:00:00Z", "2026-08-17T22:10:00Z",
            "@nexus_wholesale", "bc1q556677889900aabbccddeeff",
            json.dumps(["SimulatedMarket-A (Abyss)", "GlobalDark Exchange"]),
            json.dumps(["Synthetic Opioids", "Cocaine Hydrochloride", "Fentanyl Analogs"]),
            "International bulk supply node routing synthetic opioid parcels disguised as commercial chemical samples.",
            json.dumps([
                {"signal": "Cross-Border Escrow Interaction", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Darknet Multi-Sig Contract Overlap", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "High Potency Narcotics", "score": 35, "reason": "Synthetic opioid distribution"},
                {"factor": "Wholesale Volume", "score": 25, "reason": "Multi-kilogram tier transaction records"},
                {"factor": "Syndicate Centrality", "score": 19, "reason": "Supplies 4 domestic sub-vendors"}
            ])
        ),
        (
            "ENTITY-0063", "CYBER_CHEMIST", "Custom Synthesis Consultant", 62, 70, "MEDIUM", "MONITORED",
            "2026-08-08T10:00:00Z", "2026-08-16T17:40:00Z",
            "@cyber_synth_help", "bc1q990011223344556677889900",
            json.dumps(["DarkSci Forum", "ChemForge Forum"]),
            json.dumps(["Synthesis Guides", "Novel Psychoactive Substances (NPS)"]),
            "Technical adviser providing clandestine synthesis optimization protocols to PHANTOM_LABS and INDRA_47.",
            json.dumps([
                {"signal": "Technical Consultation Wallet Tips", "weight": 20, "status": "CONFIRMED"},
                {"signal": "PGP Public Key Signature on Guides", "weight": 20, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "NPS Formulation", "score": 25, "reason": "Designing novel analogue variants to bypass controls"},
                {"factor": "Consulting Link", "score": 20, "reason": "Technical assistance to lab operators"},
                {"factor": "Forum Centrality", "score": 17, "reason": "Author of 14 clandestine lab manuals"}
            ])
        ),
        (
            "ENTITY-0077", "ZENITH_DROP", "Encrypted Channel Dispatcher", 71, 79, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-10T12:00:00Z", "2026-08-19T09:30:00Z",
            "@zenith_parcels", "bc1q223344556677889900aabbcc",
            json.dumps(["Encrypted Channel Alpha", "SimulatedMarket-B (SilkForge)"]),
            json.dumps(["Cannabis Concentrates", "MDMA Press", "Ketamine"]),
            "Dispatcher coordinating stealth parcel postal drops with falsified logistics consignment numbers.",
            json.dumps([
                {"signal": "Tracking ID Format Overlap with INDRA_47", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Shared Crypto Wallet bc1q92fa...", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Stealth Parcel Smuggling", "score": 30, "reason": "Postal mail interception correlation"},
                {"factor": "Shared Infrastructure", "score": 25, "reason": "Direct co-host of dispatch bot"},
                {"factor": "High Dispatch Rate", "score": 16, "reason": "Estimated 40+ simulated drops per week"}
            ])
        ),
        (
            "ENTITY-0082", "CHRONO_DISPATCH", "Regional Dead-Drop Courier", 58, 64, "MEDIUM", "MONITORED",
            "2026-08-09T08:30:00Z", "2026-08-18T14:10:00Z",
            "@chrono_runners", "bc1q11223344556677889900aabb",
            json.dumps(["LocalDrop Network"]),
            json.dumps(["Ketamine", "Cannabis Extracts"]),
            "Secondary drop runner servicing suburban nodes and inter-state border transfer points.",
            json.dumps([
                {"signal": "Temporal Correlation with KALI_DISTRO", "weight": 20, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Courier Logistics", "score": 25, "reason": "Drop runner activity"},
                {"factor": "Network Proximity", "score": 20, "reason": "2-hop link to primary cluster"},
                {"factor": "Periodic Volume", "score": 13, "reason": "Regular micro-transactions"}
            ])
        ),
        (
            "ENTITY-0095", "AEGIS_BROKER", "Cryptocurrency Mixer / Escrow Agent", 84, 89, "CRITICAL", "UNDER_INVESTIGATION",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z",
            "@aegis_escrow_service", "bc1q778899001122334455667788",
            json.dumps(["SimulatedMarket-A (Abyss)", "SimulatedMarket-B (SilkForge)", "ShadowNet Hub"]),
            json.dumps(["Financial Laundering", "Escrow Services"]),
            "Illicit multi-signature escrow hub facilitating privacy-coin swapping and peer-to-peer darknet settlement.",
            json.dumps([
                {"signal": "Direct Escrow Settlement for INDRA_47", "weight": 30, "status": "CONFIRMED"},
                {"signal": "Multi-sig Address Pattern Clustering", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Financial Obfuscation", "score": 35, "reason": "Tumbling and laundering drug revenues"},
                {"factor": "Cross-Market Settlement", "score": 30, "reason": "Clearing house for multiple vendor clusters"},
                {"factor": "High Capital Velocity", "score": 19, "reason": ">120 BTC cumulative flow in 90 days"}
            ])
        ),
        (
            "ENTITY-0104", "HYDRA_CELL_09", "Distro Sub-Node", 65, 73, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-04T12:00:00Z", "2026-08-18T20:45:00Z",
            "@hydra_north_cell", "bc1q667788990011223344556677",
            json.dumps(["SimulatedMarket-B (SilkForge)"]),
            json.dumps(["Methamphetamine", "MDMA"]),
            "Regional retail distributor operating bulk pill presses and micro-packaging facilities.",
            json.dumps([
                {"signal": "Wholesale Order Invoices from INDRA_47", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Retail Distribution", "score": 28, "reason": "End-consumer packaging and delivery"},
                {"factor": "Sourcing Link", "score": 22, "reason": "Procures bulk paste from PHANTOM_LABS"},
                {"factor": "Risk Profile", "score": 15, "reason": "High frequency of localized customer feedback"}
            ])
        ),
        (
            "ENTITY-0112", "SHADOW_VAULT", "Hardware Wallet Cold Custody Node", 76, 81, "HIGH", "MONITORED",
            "2026-07-10T11:00:00Z", "2026-08-17T11:00:00Z",
            "@shadow_vault_ops", "bc1q445566778899001122334455",
            json.dumps(["Off-Market Dark Escrow"]),
            json.dumps(["Asset Stashing"]),
            "Suspected cold storage reserve wallet holding accumulated dark market profits for the INDRA_47 network.",
            json.dumps([
                {"signal": "Periodic Lump-Sum Sweep from bc1q92fa...", "weight": 30, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Asset Stashing", "score": 30, "reason": "Cold vault for illicit proceeds"},
                {"factor": "Structural Link", "score": 26, "reason": "Direct funding from primary vendor wallet"},
                {"factor": "Volume Scale", "score": 20, "reason": ">15 BTC static balance"}
            ])
        ),
        (
            "ENTITY-0128", "AURORA_SYNTH", "NPS Vendor Alias", 59, 66, "MEDIUM", "MONITORED",
            "2026-08-11T15:00:00Z", "2026-08-18T16:00:00Z",
            "@aurora_synthetics", "bc1q123456789012345678901234",
            json.dumps(["SimulatedMarket-A (Abyss)"]),
            json.dumps(["Synthetic Cannabinoids", "2C-B Analogues"]),
            "Vendor specializing in synthetic research chemicals and designer phenethylamines.",
            json.dumps([
                {"signal": "PGP Key Sub-Key Shared with CYBER_CHEMIST", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Designer Drugs", "score": 25, "reason": "Synthetic analogue distribution"},
                {"factor": "Market Sourcing", "score": 20, "reason": "Chemical forum cross-postings"},
                {"factor": "Risk Velocity", "score": 14, "reason": "Growing listing count"}
            ])
        ),
        (
            "ENTITY-0135", "OASIS_LOGISTICS", "Decoy Vehicle Fleet Operator", 69, 74, "HIGH", "ACTIVE_SURVEILLANCE",
            "2026-08-02T10:00:00Z", "2026-08-19T04:10:00Z",
            "@oasis_freight_line", "bc1q987654321098765432109876",
            json.dumps(["LocalDrop Network"]),
            json.dumps(["Interstate Transport"]),
            "Commercial transport front moving disguised consignments containing sealed precursor chemical barrels.",
            json.dumps([
                {"signal": "Shared Dispatch Coordinates with VIPER_CORP", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Commercial Freight Camouflage", "score": 30, "reason": "Moving precursor barrels via freight lines"},
                {"factor": "Direct Supplier Link", "score": 22, "reason": "Freight slips correlate with chemical shipments"},
                {"factor": "Risk Weight", "score": 17, "reason": "Multi-jurisdictional transit routes"}
            ])
        ),
        (
            "ENTITY-0144", "SPECTER_TECH", "Burner SIM & Device Provider", 52, 60, "MEDIUM", "MONITORED",
            "2026-08-06T14:00:00Z", "2026-08-17T09:00:00Z",
            "@specter_devices", "bc1q543216789054321678905432",
            json.dumps(["ShadowNet Hub"]),
            json.dumps(["Operational Security Devices", "Pre-activated SIMs"]),
            "Furnishes hardened mobile devices, Session IDs, and international eSIMs to couriers and operators.",
            json.dumps([
                {"signal": "Device Serial Number Fingerprint Overlap", "weight": 20, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "OpSec Infrastructure", "score": 25, "reason": "Supplying encrypted burner hardware"},
                {"factor": "Network Enabler", "score": 18, "reason": "Equipping drop runners with secure phones"},
                {"factor": "Activity Score", "score": 9, "reason": "Regular device refresh batches"}
            ])
        ),
        (
            "ENTITY-0158", "SOLARIS_PHARMA", "Falsified Export Front", 73, 78, "HIGH", "UNDER_INVESTIGATION",
            "2026-07-25T13:00:00Z", "2026-08-18T18:00:00Z",
            "@solaris_pharma_export", "bc1q345678901234567890123456",
            json.dumps(["SimulatedMarket-A (Abyss)", "GlobalDark Exchange"]),
            json.dumps(["Pharmaceutical Opioids", "Oxycodone Counterfeits", "Alprazolam Bars"]),
            "Distributes counterfeit prescription pharmaceuticals pressed with high-potency synthetic opioids.",
            json.dumps([
                {"signal": "Pill Stamp Die Correlation with INDRA_47 Stock", "weight": 25, "status": "CONFIRMED"},
                {"signal": "Escrow Payout Trace", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Counterfeit Pharmaceuticals", "score": 32, "reason": "Laced pill pressing and distribution"},
                {"factor": "Syndicate Supply", "score": 24, "reason": "Sourced through INDRA_47 darknet store"},
                {"factor": "High Lethality Risk", "score": 17, "reason": "Lethal dosage variance detected in test samples"}
            ])
        ),
        (
            "ENTITY-0162", "ORION_CARRIER", "Intercity Bus Smuggling Courier", 57, 63, "MEDIUM", "MONITORED",
            "2026-08-07T07:00:00Z", "2026-08-19T02:00:00Z",
            "@orion_travel_line", "bc1q789012345678901234567890",
            json.dumps(["LocalDrop Network"]),
            json.dumps(["Ketamine", "Methamphetamine"]),
            "Utilizes passenger bus luggage compartments for transporting mid-tier drug consignments across state lines.",
            json.dumps([
                {"signal": "Drop Pin GPS Overlap with KALI_DISTRO", "weight": 20, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Transit Vector", "score": 25, "reason": "Passenger transit smuggling"},
                {"factor": "Coordination Tie", "score": 19, "reason": "Triggered by @indra_ops dispatch orders"},
                {"factor": "Risk Score", "score": 13, "reason": "Active weekly runs"}
            ])
        ),
        (
            "ENTITY-0171", "TITAN_REAGENTS", "Bulk Solvent & Acid Vendor", 64, 71, "MEDIUM", "ACTIVE_SURVEILLANCE",
            "2026-08-03T11:00:00Z", "2026-08-16T12:00:00Z",
            "@titan_solvents", "bc1q890123456789012345678901",
            json.dumps(["ChemForge Forum"]),
            json.dumps(["Anhydrous Ammonia", "Hydrochloric Acid Gas", "Acetone"]),
            "Commercial industrial chemical diversion vendor supplying solvent purification kits to PHANTOM_LABS.",
            json.dumps([
                {"signal": "Invoice Reference Overlap with VIPER_CORP", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Chemical Diversion", "score": 26, "reason": "Commercial solvent rerouting to clandestine labs"},
                {"factor": "Supplier Connection", "score": 22, "reason": "Supplying PHANTOM_LABS synthesis operations"},
                {"factor": "Activity Indicator", "score": 16, "reason": "Repeated industrial drum sales"}
            ])
        ),
        (
            "ENTITY-0185", "NOVA_ESCROW", "Dark Market Arbitrage Node", 70, 77, "HIGH", "MONITORED",
            "2026-08-01T15:00:00Z", "2026-08-19T01:00:00Z",
            "@nova_arbitrage", "bc1q901234567890123456789012",
            json.dumps(["SimulatedMarket-B (SilkForge)", "ShadowNet Hub"]),
            json.dumps(["Crypto Arbitrage", "Escrow Tumbling"]),
            "Secondary crypto liquidity provider executing high-frequency micro-splits to decouple marketplace payouts.",
            json.dumps([
                {"signal": "Transaction Splitter Clustering with AEGIS_BROKER", "weight": 25, "status": "CONFIRMED"}
            ]),
            json.dumps([
                {"factor": "Liquidity Obfuscation", "score": 28, "reason": "Automated micro-splitting to defeat heuristics"},
                {"factor": "Brokerage Overlap", "score": 24, "reason": "Settles high-value orders for INDRA_47"},
                {"factor": "Velocity Factor", "score": 18, "reason": "Continuous algorithmic routing"}
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

    # 2. DRUG LISTINGS (20 listings)
    listings = [
        (
            "LIST-0091", "HQ 98% Pure MDMA Dutch Crystal [Bulk & Retail Drops]", "MDMA", "Empathogens / Entactogens",
            "0.024 BTC / 50g", "INDRA_47", "SimulatedMarket-A (Abyss)", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-19T10:42:17Z", 88, "CRITICAL", "EVID-0012", "NL -> Domestic Tri-City", "Lab Tested 98.4%", "ACTIVE"
        ),
        (
            "LIST-0092", "Medical Grade S-Isomer Ketamine Shards [Dead Drop Ready]", "Ketamine", "Dissociatives",
            "0.018 BTC / 100g", "INDRA_47", "SimulatedMarket-A (Abyss)", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-19T09:15:20Z", 85, "CRITICAL", "EVID-0015", "Domestic Synthesis", "High Purity Needles", "ACTIVE"
        ),
        (
            "LIST-0093", "Pure Carfentanil / Fentanyl Novel Analog Powder", "Synthetic Opioids", "Opioids (Synthetic)",
            "0.065 BTC / 25g", "INDRA_47", "SimulatedMarket-B (SilkForge)", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-18T22:30:10Z", 94, "CRITICAL", "EVID-0031", "International Stealth Freight", "Extremely Potent (Lethal Risk)", "ACTIVE"
        ),
        (
            "LIST-0094", "High Potency D-Methamphetamine Ice Crystal Rocks", "Methamphetamine", "Stimulants",
            "0.035 BTC / 100g", "PHANTOM_LABS", "SimulatedMarket-B (SilkForge)", "@phantom_chem_ops", "bc1q88aa992011fecc771029ab44",
            "2026-08-18T19:40:00Z", 82, "CRITICAL", "EVID-0021", "Domestic Clandestine Lab", "99% Translucent Ice", "ACTIVE"
        ),
        (
            "LIST-0095", "Pressed 300mg 'Punisher' MDMA Micro-Tabs [Pack of 500]", "MDMA", "Empathogens / Entactogens",
            "0.040 BTC / 500pcs", "INDRA_47", "SimulatedMarket-A (Abyss)", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-18T14:12:44Z", 86, "CRITICAL", "EVID-0047", "Northern Warehouse Stock", "Heavy Press Dual Color", "ACTIVE"
        ),
        (
            "LIST-0096", "Oxycodone 80mg OC Brand Stamped Generic Formulations", "Synthetic Opioids", "Pharmaceutical Opioids",
            "0.030 BTC / 100 tabs", "SOLARIS_PHARMA", "SimulatedMarket-A (Abyss)", "@solaris_pharma_export", "bc1q345678901234567890123456",
            "2026-08-18T11:05:00Z", 77, "HIGH", "EVID-0038", "Diverted / Counterfeit Press", "Fentanyl Free (Claimed)", "ACTIVE"
        ),
        (
            "LIST-0097", "BMK Ethyl Glycidate Precursor Oil [Drum Lots]", "Precursor Reagents", "Chemical Precursors",
            "0.150 BTC / 25 Liters", "VIPER_CORP", "ChemForge Forum", "@viper_logistics_bot", "bc1q71de4410aa55890bb82109cd",
            "2026-08-17T20:18:00Z", 74, "HIGH", "EVID-0009", "Industrial Reagent Re-label", "Purity 99.2%", "ACTIVE"
        ),
        (
            "LIST-0098", "Cocaine Hydrochloride Fishscale Flakes 90%+", "Cocaine", "Stimulants",
            "0.050 BTC / 50g", "NEXUS_SUPPLY", "GlobalDark Exchange", "@nexus_wholesale", "bc1q556677889900aabbccddeeff",
            "2026-08-17T16:40:00Z", 80, "CRITICAL", "EVID-0026", "Direct Import", "Uncut Shiny Flakes", "ACTIVE"
        ),
        (
            "LIST-0099", "Ketamine Liquid Vials 50mg/ml [Sealed Pharma Cartons]", "Ketamine", "Dissociatives",
            "0.022 BTC / 10 Vials", "INDRA_47", "SimulatedMarket-B (SilkForge)", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-17T12:00:00Z", 84, "HIGH", "EVID-0033", "Veterinary Diversion", "Factory Sterile Seal", "ACTIVE"
        ),
        (
            "LIST-0100", "Synthetic Cannabinoid JWH-018 / 5F-MDMB Infused Herb", "Cannabis / Synthetic", "Cannabinoids",
            "0.012 BTC / 200g", "AURORA_SYNTH", "SimulatedMarket-A (Abyss)", "@aurora_synthetics", "bc1q123456789012345678901234",
            "2026-08-16T21:10:00Z", 62, "MEDIUM", "EVID-0041", "Domestic Spray Lab", "High Potency Aroma", "ACTIVE"
        ),
        (
            "LIST-0101", "2C-B Nexus Powder Micro-Dose Capsules", "Novel Psychoactive Substances", "Phenethylamines",
            "0.015 BTC / 50 caps", "AURORA_SYNTH", "SimulatedMarket-A (Abyss)", "@aurora_synthetics", "bc1q123456789012345678901234",
            "2026-08-16T15:25:00Z", 65, "MEDIUM", "EVID-0042", "Custom Synthesis", "20mg Each", "ACTIVE"
        ),
        (
            "LIST-0102", "Pure Alprazolam Raw Powder for Pressing", "Pharmaceutical Sedatives", "Benzodiazepines",
            "0.045 BTC / 100g", "SOLARIS_PHARMA", "SimulatedMarket-A (Abyss)", "@solaris_pharma_export", "bc1q345678901234567890123456",
            "2026-08-16T09:12:00Z", 71, "HIGH", "EVID-0039", "Direct Import", "99.8% Pure Raw", "ACTIVE"
        ),
        (
            "LIST-0103", "Tri-City Dead Drop Express: MDMA + Ketamine Combo Pack", "MDMA & Ketamine", "Multi-Substance Combo",
            "0.010 BTC / Pack", "KALI_DISTRO", "LocalDrop Network", "@kali_drops_chd", "bc1q334455aabbccddeeff001122",
            "2026-08-15T23:50:00Z", 70, "HIGH", "EVID-0017", "Dead Drop Sector 17/22", "Sealed Mylar Vacuum", "ACTIVE"
        ),
        (
            "LIST-0104", "PMK Ethyl Glycidate Liquid Precursor 99%", "Precursor Reagents", "Chemical Precursors",
            "0.180 BTC / 50 Liters", "VIPER_CORP", "ChemForge Forum", "@viper_logistics_bot", "bc1q71de4410aa55890bb82109cd",
            "2026-08-15T18:30:00Z", 75, "HIGH", "EVID-0010", "Industrial Solvent Reroute", "Factory Sealed", "ACTIVE"
        ),
        (
            "LIST-0105", "D-Meth Pure Crystal Micro-Shards [Bulk Retail]", "Methamphetamine", "Stimulants",
            "0.028 BTC / 50g", "HYDRA_CELL_09", "SimulatedMarket-B (SilkForge)", "@hydra_north_cell", "bc1q667788990011223344556677",
            "2026-08-15T12:15:00Z", 68, "HIGH", "EVID-0028", "Northern District Stock", "Glass Clear", "ACTIVE"
        ),
        (
            "LIST-0106", "Novel Synthetic Opioid Nitazene Analogue Sample Pack", "Synthetic Opioids", "Opioids (Synthetic)",
            "0.055 BTC / 10g", "NEXUS_SUPPLY", "GlobalDark Exchange", "@nexus_wholesale", "bc1q556677889900aabbccddeeff",
            "2026-08-14T21:00:00Z", 91, "CRITICAL", "EVID-0029", "Stealth Airmail", "Ultra-High Potency", "ACTIVE"
        ),
        (
            "LIST-0107", "MDMA Champagne Rocks 84% Freebase Equivalent", "MDMA", "Empathogens / Entactogens",
            "0.020 BTC / 50g", "ZENITH_DROP", "SimulatedMarket-B (SilkForge)", "@zenith_parcels", "bc1q223344556677889900aabbcc",
            "2026-08-14T14:40:00Z", 72, "HIGH", "EVID-0034", "Postal Dispatch", "Dutch Direct", "ACTIVE"
        ),
        (
            "LIST-0108", "Ketamine Sugar Powder for Nasal Formulation", "Ketamine", "Dissociatives",
            "0.015 BTC / 50g", "CHRONO_DISPATCH", "LocalDrop Network", "@chrono_runners", "bc1q11223344556677889900aabb",
            "2026-08-13T19:20:00Z", 60, "MEDIUM", "EVID-0023", "Tri-City Highway Drop", "Fine Grind", "ACTIVE"
        ),
        (
            "LIST-0109", "Industrial Anhydrous Ammonia 100L Steel Cylinders", "Precursor Reagents", "Synthesis Solvents",
            "0.090 BTC / 2 Cylinders", "TITAN_REAGENTS", "ChemForge Forum", "@titan_solvents", "bc1q890123456789012345678901",
            "2026-08-13T11:00:00Z", 63, "MEDIUM", "EVID-0036", "Industrial Transit", "Restricted Chemical", "ACTIVE"
        ),
        (
            "LIST-0110", "MDMA Blue Tesla Heavy-Dose Press [Pack of 200]", "MDMA", "Empathogens / Entactogens",
            "0.025 BTC / 200pcs", "INDRA_47", "ShadowNet Hub", "@indra_ops", "bc1q92fa8839dfca112048aaef82",
            "2026-08-12T05:30:00Z", 87, "CRITICAL", "EVID-0004", "Dead Drop Locker", "Tested 280mg", "ACTIVE"
        )
    ]

    cursor.executemany("""
    INSERT INTO drug_listings (
        id, listing_title, substance, category, price_indicator, seller_alias,
        source_marketplace, communication_identifier, wallet_address, timestamp,
        risk_score, risk_level, evidence_id, origin_country, purity_claim, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, listings)

    # 3. CRYPTO WALLETS (10 wallets)
    wallets = [
        (
            "bc1q92fa8839dfca112048aaef82", "BTC", 92, "CRITICAL",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z",
            "4.82 BTC (~$284,000 USD)", "18.64 BTC", "13.82 BTC", 84,
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0077 (ZENITH_DROP)"]),
            json.dumps(["LIST-0091", "LIST-0092", "LIST-0093", "LIST-0095", "LIST-0099", "LIST-0110"]),
            json.dumps(["CHD-DRUG-0047", "CHD-DRUG-0012"]),
            "Primary High-Risk Vendor Deposit Cluster"
        ),
        (
            "bc1q71de4410aa55890bb82109cd", "BTC", 85, "CRITICAL",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z",
            "6.15 BTC (~$362,000 USD)", "34.50 BTC", "28.35 BTC", 112,
            json.dumps(["ENTITY-0018 (VIPER_CORP)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps(["LIST-0097", "LIST-0104"]),
            json.dumps(["CHD-DRUG-0047", "CHD-DRUG-0089"]),
            "Precursor Procurement & Settlement Cluster"
        ),
        (
            "bc1q88aa992011fecc771029ab44", "BTC", 80, "CRITICAL",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z",
            "2.90 BTC (~$171,000 USD)", "12.40 BTC", "9.50 BTC", 53,
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)"]),
            json.dumps(["LIST-0094"]),
            json.dumps(["CHD-DRUG-0047"]),
            "Domestic Lab Operations & Equipment Settlement"
        ),
        (
            "bc1q334455aabbccddeeff001122", "BTC", 69, "HIGH",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z",
            "0.74 BTC (~$43,500 USD)", "4.15 BTC", "3.41 BTC", 62,
            json.dumps(["ENTITY-0031 (KALI_DISTRO)"]),
            json.dumps(["LIST-0103"]),
            json.dumps(["CHD-DRUG-0047"]),
            "Tri-City Drop Runner Payout Node"
        ),
        (
            "bc1q778899001122334455667788", "BTC", 89, "CRITICAL",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z",
            "15.80 BTC (~$932,000 USD)", "89.20 BTC", "73.40 BTC", 320,
            json.dumps(["ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps([]),
            json.dumps(["CHD-DRUG-0047", "CHD-DRUG-0104"]),
            "Dark Escrow & Privacy Tumbler Node"
        ),
        (
            "bc1q445566778899001122334455", "BTC", 78, "HIGH",
            "2026-07-10T11:00:00Z", "2026-08-17T11:00:00Z",
            "12.45 BTC (~$734,000 USD)", "15.00 BTC", "2.55 BTC", 14,
            json.dumps(["ENTITY-0112 (SHADOW_VAULT)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps([]),
            json.dumps(["CHD-DRUG-0047"]),
            "Cold Storage Profit Accumulation Vault"
        ),
        (
            "bc1q556677889900aabbccddeeff", "BTC", 81, "CRITICAL",
            "2026-07-15T18:00:00Z", "2026-08-17T22:10:00Z",
            "5.20 BTC (~$306,000 USD)", "22.80 BTC", "17.60 BTC", 78,
            json.dumps(["ENTITY-0052 (NEXUS_SUPPLY)"]),
            json.dumps(["LIST-0098", "LIST-0106"]),
            json.dumps(["CHD-DRUG-0089"]),
            "Bulk Import Escrow Inflow"
        ),
        (
            "bc1q345678901234567890123456", "BTC", 73, "HIGH",
            "2026-07-25T13:00:00Z", "2026-08-18T18:00:00Z",
            "1.85 BTC (~$109,000 USD)", "8.90 BTC", "7.05 BTC", 41,
            json.dumps(["ENTITY-0158 (SOLARIS_PHARMA)"]),
            json.dumps(["LIST-0096", "LIST-0102"]),
            json.dumps(["CHD-DRUG-0047"]),
            "Counterfeit Pharma Sales Inflow"
        ),
        (
            "bc1q223344556677889900aabbcc", "BTC", 72, "HIGH",
            "2026-08-10T12:00:00Z", "2026-08-19T09:30:00Z",
            "1.12 BTC (~$66,000 USD)", "5.60 BTC", "4.48 BTC", 37,
            json.dumps(["ENTITY-0077 (ZENITH_DROP)", "ENTITY-0047 (INDRA_47)"]),
            json.dumps(["LIST-0107"]),
            json.dumps(["CHD-DRUG-0047"]),
            "Postal Stealth Parcel Settlement"
        ),
        (
            "bc1q667788990011223344556677", "BTC", 67, "MEDIUM",
            "2026-08-04T12:00:00Z", "2026-08-18T20:45:00Z",
            "0.95 BTC (~$56,000 USD)", "3.80 BTC", "2.85 BTC", 29,
            json.dumps(["ENTITY-0104 (HYDRA_CELL_09)"]),
            json.dumps(["LIST-0105"]),
            json.dumps(["CHD-DRUG-0047"]),
            "Sub-Node Retail Inflow"
        )
    ]

    cursor.executemany("""
    INSERT INTO crypto_wallets (
        address, currency, risk_score, risk_level, first_seen, last_seen,
        balance_est, total_received, total_sent, tx_count, linked_entities,
        related_listings, related_investigations, cluster_tag
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, wallets)

    # 4. ENCRYPTED PLATFORM INTELLIGENCE RECORDS (12 records)
    comms_records = [
        (
            "COMM-001", "Encrypted Channel / Telegram Protocol", "@indra_ops", "INDRA_47", "ENTITY-0047", 89,
            "Public Darknet Listing Metadata & Forum Profile", "Primary Dispatch Coordinator", "MDMA, Ketamine, Synthetic Opioids",
            "2026-08-12T04:12:00Z", "2026-08-19T10:41:52Z", "EVID-0001", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-002", "Session Encrypted Messenger", "05a9f24881cc9241bb3301de88f01a", "INDRA_47", "ENTITY-0047", 84,
            "Marketplace PGP Signed Bio", "Secondary Secure Fallback", "Bulk Wholesale Orders",
            "2026-08-14T08:00:00Z", "2026-08-18T19:00:00Z", "EVID-0005", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-003", "Encrypted Channel / Telegram Protocol", "@viper_logistics_bot", "VIPER_CORP", "ENTITY-0018", 81,
            "ChemForge Precursor Thread", "Chemical Reagent Ordering Bot", "BMK / PMK Glycidate",
            "2026-08-01T11:20:00Z", "2026-08-18T19:30:00Z", "EVID-0009", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-004", "Encrypted Channel / Telegram Protocol", "@phantom_chem_ops", "PHANTOM_LABS", "ENTITY-0024", 86,
            "SilkForge Vendor Card", "Synthesis Lab Dispatch Head", "Methamphetamine / Ketamine",
            "2026-07-28T09:14:00Z", "2026-08-19T06:22:00Z", "EVID-0021", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-005", "Encrypted Channel / Telegram Protocol", "@kali_drops_chd", "KALI_DISTRO", "ENTITY-0031", 79,
            "Investigator Drop Monitor Capture", "Local Tri-City Dead Drop Dispatcher", "MDMA & Ketamine Packages",
            "2026-08-05T14:45:00Z", "2026-08-19T08:15:00Z", "EVID-0017", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-006", "Matrix Protocol (Federated)", "@nexus_wholesale:matrix.darkops.io", "NEXUS_SUPPLY", "ENTITY-0052", 83,
            "GlobalDark Vendor Fingerprint", "Cross-Border Wholesale Broker", "Synthetic Opioid Import",
            "2026-07-15T18:00:00Z", "2026-08-17T22:10:00Z", "EVID-0026", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-007", "Encrypted Channel / Telegram Protocol", "@zenith_parcels", "ZENITH_DROP", "ENTITY-0077", 78,
            "SilkForge Shipping Support Bio", "Stealth Courier Coordinator", "Postal Parcel Drops",
            "2026-08-10T12:00:00Z", "2026-08-19T09:30:00Z", "EVID-0034", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-008", "Encrypted Channel / Telegram Protocol", "@aegis_escrow_service", "AEGIS_BROKER", "ENTITY-0095", 88,
            "Abyss Marketplace Escrow PGP", "Escrow & Coin Swap Arbitrage", "Laundering Operations",
            "2026-07-20T16:00:00Z", "2026-08-19T05:00:00Z", "EVID-0037", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-009", "Encrypted Channel / Telegram Protocol", "@solaris_pharma_export", "SOLARIS_PHARMA", "ENTITY-0158", 75,
            "Abyss Counterfeit Medicine Catalog", "Pharma Front Coordinator", "Counterfeit Oxycodone & Xanax",
            "2026-07-25T13:00:00Z", "2026-08-18T18:00:00Z", "EVID-0038", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-010", "Encrypted Channel / Telegram Protocol", "@cyber_synth_help", "CYBER_CHEMIST", "ENTITY-0063", 68,
            "DarkSci Lab Manual Author Tag", "Technical Lab Adviser", "Synthesis Consultation",
            "2026-08-08T10:00:00Z", "2026-08-16T17:40:00Z", "EVID-0030", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-011", "Session Encrypted Messenger", "05bc71144882109400ffaa1828941c", "VIPER_CORP", "ENTITY-0018", 74,
            "ChemForge Direct Contact Hash", "Bulk Chemical Escrow Handshake", "Precursors",
            "2026-08-03T10:00:00Z", "2026-08-17T15:00:00Z", "EVID-0011", "CORRELATED_CONFIRMED"
        ),
        (
            "COMM-012", "Encrypted Channel / Telegram Protocol", "@hydra_north_cell", "HYDRA_CELL_09", "ENTITY-0104", 72,
            "SilkForge Sub-Vendor Card", "Retail Sub-Node Operator", "Pill Distro",
            "2026-08-04T12:00:00Z", "2026-08-18T20:45:00Z", "EVID-0028", "CORRELATED_CONFIRMED"
        )
    ]

    cursor.executemany("""
    INSERT INTO encrypted_platform_records (
        id, platform_name, identifier, related_alias, linked_entity_id,
        confidence_score, provenance_source, observed_role, substance_focus,
        first_observed, last_observed, evidence_id, verification_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, comms_records)

    # 5. ALERTS (12 alerts)
    alerts = [
        (
            "ALT-8841", "Cross-Platform Identity Correlation Detected: INDRA_47", "CRITICAL", "ENTITY_CORRELATION",
            "2026-08-19T10:41:52Z", "Simulated Darknet Marketplace & Encrypted Platform",
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0018 (VIPER_CORP)"]),
            "Wallet bc1q92fa8839dfca112048aaef82 and handle @indra_ops linked with 91% correlation confidence across AbyssMarket, SilkForge, and Telegram protocols.",
            91, "NEW", "/entities/ENTITY-0047"
        ),
        (
            "ALT-8842", "High-Potency Synthetic Opioid Listing Detected", "CRITICAL", "DRUG_THREAT",
            "2026-08-19T10:30:15Z", "SimulatedMarket-B (SilkForge)",
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0052 (NEXUS_SUPPLY)"]),
            "Novel fentanyl/carfentanil analog listing (LIST-0093) posted with domestic shipping claims in Northern Sector.",
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
            json.dumps(["ENTITY-0031 (KALI_DISTRO)", "ENTITY-0082 (CHRONO_DISPATCH)"]),
            "Repeated dead-drop coordinate clusters detected within 5km radius across Sector 17 and highway junction.",
            82, "INVESTIGATING", "/investigations/CASE-CHD-0047"
        ),
        (
            "ALT-8845", "Clandestine Synthesis Lab Batch Signature Matched", "CRITICAL", "LAB_SIGNATURE",
            "2026-08-19T06:22:00Z", "Investigator Laboratory Intelligence",
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0047 (INDRA_47)"]),
            "Chemical impurity profile from seized MDMA tabs matches crystal stock listed by PHANTOM_LABS.",
            89, "INVESTIGATING", "/entities/ENTITY-0024"
        ),
        (
            "ALT-8846", "Suspicious Multi-Signature Mixer Funneling Detected", "HIGH", "FINANCIAL_OBFUSCATION",
            "2026-08-19T05:00:00Z", "Synthetic Blockchain Monitor",
            json.dumps(["ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0112 (SHADOW_VAULT)"]),
            "12 micro-transactions consolidated into cold storage vault bc1q4455... totaling 2.55 BTC.",
            84, "ACKNOWLEDGED", "/crypto"
        ),
        (
            "ALT-8847", "Emerging Designer Substance Keyword: Nitazene Analogue", "MEDIUM", "KEYWORD_SURGE",
            "2026-08-18T23:10:00Z", "GlobalDark Exchange Crawler",
            json.dumps(["ENTITY-0052 (NEXUS_SUPPLY)"]),
            "Spike of 14 new listing queries and forum inquiries for novel synthetic opioid compounds.",
            76, "ACKNOWLEDGED", "/drugs"
        ),
        (
            "ALT-8848", "Counterfeit Prescription Pharmaceutical Surge", "HIGH", "PUBLIC_HEALTH_RISK",
            "2026-08-18T18:00:00Z", "SimulatedMarket-A (Abyss)",
            json.dumps(["ENTITY-0158 (SOLARIS_PHARMA)", "ENTITY-0047 (INDRA_47)"]),
            "Falsified Oxycodone 80mg press dies identified with synthetic fentanyl binders.",
            85, "NEW", "/entities/ENTITY-0158"
        ),
        (
            "ALT-8849", "Burner SIM Cluster Linked to Active Drop Dispatcher", "MEDIUM", "INFRASTRUCTURE_LINK",
            "2026-08-18T14:30:00Z", "Encrypted Channel Telemetry",
            json.dumps(["ENTITY-0144 (SPECTER_TECH)", "ENTITY-0031 (KALI_DISTRO)"]),
            "Batch of 6 international eSIMs activated simultaneously and assigned to local delivery couriers.",
            71, "ACKNOWLEDGED", "/encrypted-platforms"
        ),
        (
            "ALT-8850", "Repeated High-Risk Drug Listings Across 3 Sources", "HIGH", "MULTI_SOURCE_SURGE",
            "2026-08-18T12:00:00Z", "Intelligence Fusion Engine",
            json.dumps(["ENTITY-0047 (INDRA_47)"]),
            "Synchronized listing updates for MDMA and Ketamine across Abyss, SilkForge, and Telegram within 12 minutes.",
            88, "INVESTIGATING", "/entities/ENTITY-0047"
        ),
        (
            "ALT-8851", "Precursor Drum Logistics Reroute Alert", "MEDIUM", "LOGISTICS_ANOMALY",
            "2026-08-17T20:18:00Z", "Freight Transport Data Stream",
            json.dumps(["ENTITY-0135 (OASIS_LOGISTICS)", "ENTITY-0018 (VIPER_CORP)"]),
            "Discrepancy in commercial solvent waybill matching delivery address for clandestine storage unit.",
            73, "RESOLVED", "/investigations/CASE-CHD-0047"
        ),
        (
            "ALT-8852", "Cryptocurrency Rapid Arbitrage Micro-Split", "MEDIUM", "TUMBLER_HEURISTIC",
            "2026-08-17T11:00:00Z", "Synthetic Blockchain Monitor",
            json.dumps(["ENTITY-0185 (NOVA_ESCROW)"]),
            "Rapid peeling chain pattern splitting 4.2 BTC into 28 temporary addresses.",
            69, "RESOLVED", "/crypto"
        )
    ]

    cursor.executemany("""
    INSERT INTO alerts (
        id, title, severity, alert_type, timestamp, source, affected_entities,
        reason, confidence, status, target_route
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, alerts)

    # 6. INVESTIGATIONS / CASES (4 cases)
    investigations = [
        (
            "CASE-CHD-0047", "CHD-DRUG-0047", "Suspected Cross-Platform Darknet & Encrypted Drug Distribution Syndicate",
            "ACTIVE", "CRITICAL", "DSP R. Sharma / Cyber Crime Division", "2026-08-12T04:00:00Z", "2026-08-19T10:45:00Z",
            "Multi-source intelligence fusion investigation targeting the INDRA_47 syndicate operating across darknet marketplaces (AbyssMarket, SilkForge), encrypted communication channels (@indra_ops, @kali_drops_chd), and cryptocurrency settlement hubs. Primary illicit activities involve regional distribution of MDMA crystals, Ketamine, and synthetic opioid compounds via dead-drops and postal couriers in Chandigarh tri-city perimeter.",
            json.dumps(["MDMA", "Ketamine", "Synthetic Opioids (Fentanyl Analogs)", "Counterfeit Oxycodone", "Precursors (BMK/PMK)"]),
            json.dumps(["ENTITY-0047 (INDRA_47)", "ENTITY-0018 (VIPER_CORP)", "ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0031 (KALI_DISTRO)", "ENTITY-0077 (ZENITH_DROP)", "ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0112 (SHADOW_VAULT)", "ENTITY-0158 (SOLARIS_PHARMA)"]),
            json.dumps(["SimulatedMarket-A (Abyss)", "SimulatedMarket-B (SilkForge)", "ChemForge Forum", "Telegram Protocol Channels", "Session Messenger", "Synthetic Bitcoin Ledger", "LocalDrop Network"]),
            19, "Chandigarh Cybercrime Operations & Inter-State Coordination",
            "Disrupt supply chain, identify physical dead-drop logistics coordinators, trace cryptocurrency proceeds, and prevent synthetic opioid influx into urban centers."
        ),
        (
            "CASE-CHD-0012", "CHD-DRUG-0012", "Darknet Pill Press & Clandestine Lab Operation 'Crystal Shadow'",
            "UNDER_INVESTIGATION", "HIGH", "Inspector V. Malik", "2026-07-28T09:00:00Z", "2026-08-19T06:30:00Z",
            "Investigation into clandestine domestic synthesis facilities producing MDMA tablets and crystal methamphetamine linked to PHANTOM_LABS and associated equipment procurement channels.",
            json.dumps(["MDMA", "Methamphetamine", "Press Reagents"]),
            json.dumps(["ENTITY-0024 (PHANTOM_LABS)", "ENTITY-0063 (CYBER_CHEMIST)", "ENTITY-0171 (TITAN_REAGENTS)"]),
            json.dumps(["SilkForge Marketplace", "DarkSci Forum", "Domestic Freight Logs"]),
            11, "State Cybercrime Narcotics Cell",
            "Locate illicit synthesis facility and intercept industrial chemical solvent rerouting."
        ),
        (
            "CASE-CHD-0089", "CHD-DRUG-0089", "Cross-Border Precursor Chemical Smuggling Nexus",
            "ACTIVE", "CRITICAL", "SI A. Verma", "2026-08-01T10:00:00Z", "2026-08-18T20:00:00Z",
            "Interception and tracking of wholesale BMK/PMK ethyl glycidate chemical consignments imported under falsified industrial manifests by VIPER_CORP and NEXUS_SUPPLY.",
            json.dumps(["BMK Ethyl Ester", "PMK Glycidate", "Synthetic Opioid Bases"]),
            json.dumps(["ENTITY-0018 (VIPER_CORP)", "ENTITY-0052 (NEXUS_SUPPLY)", "ENTITY-0135 (OASIS_LOGISTICS)"]),
            json.dumps(["ChemForge Forum", "GlobalDark Exchange", "Commercial Waybills"]),
            14, "Inter-State Drug Law Enforcement Bureau",
            "Identify freight conduits and intercept bulk precursor shipments prior to lab delivery."
        ),
        (
            "CASE-CHD-0104", "CHD-DRUG-0104", "Decentralized Escrow Tumbler & Crypto Laundering Network",
            "MONITORED", "HIGH", "Analyst P. Kaur", "2026-07-20T14:00:00Z", "2026-08-19T05:30:00Z",
            "Financial intelligence tracing into darknet escrow settlement architectures (AEGIS_BROKER, NOVA_ESCROW) obfuscating proceeds of narcotic sales.",
            json.dumps(["Cryptocurrency Laundering", "Multi-Sig Escrow Pools"]),
            json.dumps(["ENTITY-0095 (AEGIS_BROKER)", "ENTITY-0112 (SHADOW_VAULT)", "ENTITY-0185 (NOVA_ESCROW)"]),
            json.dumps(["Synthetic Bitcoin Ledger", "Off-Market Dark Escrow Channels"]),
            8, "Financial Cyber Intelligence Unit",
            "Identify cold vault hardware keys and execute judicial asset freezing orders."
        )
    ]

    cursor.executemany("""
    INSERT INTO investigations (
        id, case_number, title, status, risk_level, lead_investigator, opened_date,
        last_updated, summary, target_substances, linked_entities, linked_sources,
        evidence_count, jurisdiction, objective
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, investigations)

    # 7. EVIDENCE VAULT (35 records)
    evidence_items = [
        (
            "EVID-0001", "Darknet Listing Capture: INDRA_47 Profile & Bio", "MARKETPLACE_SNAPSHOT",
            "SimulatedMarket-A (Abyss) Crawler", "2026-08-12T04:12:00Z", generate_hash("EVID-0001-INDRA47-BIO"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Collected by Automated Cyberdome Crawler Node 04 -> Hashed at Ingestion -> Stored in WORM Vault",
            "Full HTML DOM snapshot of vendor store page showing alias INDRA_47, PGP public key, and direct link to Telegram @indra_ops.",
            json.dumps({"url": "http://abyssmarket772.onion/vendor/indra47", "pgp_fingerprint": "8F4A 2201 BC99 4410", "timestamp": "2026-08-12T04:12:00Z"})
        ),
        (
            "EVID-0004", "Dead-Drop Locker Coordinate Dump & PGP Message", "COMMUNICATION_RECORD",
            "Investigator Controlled Drop Interception", "2026-08-12T05:30:00Z", generate_hash("EVID-0004-LOCKER-DROP"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Seized by Cyber Field Team 2 -> Forensic Hex Dump Generated -> Added to Chain of Custody",
            "Encrypted PGP dispatch instructions containing dead-drop locker pin in Sector 22 Chandigarh with 200pcs Blue Tesla MDMA pills.",
            json.dumps({"drop_type": "Smart Locker 4B", "sector": "22", "substance": "MDMA 280mg", "quantity": "200 tablets"})
        ),
        (
            "EVID-0005", "Session ID Cryptographic Fingerprint Match", "SESSION_IDENTITY",
            "Simulated Marketplace Vendor Profile", "2026-08-14T08:00:00Z", generate_hash("EVID-0005-SESSION-ID"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Ingested via Automated Entity Resolver -> Certified by Senior Analyst",
            "Public Session Messenger ID 05a9f24881cc9241bb3301de88f01a correlated with @indra_ops public dispatch records.",
            json.dumps({"session_id": "05a9f24881cc9241bb3301de88f01a", "correlation_weight": 84})
        ),
        (
            "EVID-0009", "ChemForge Precursor Thread Manifest & PGP Order", "FORUM_ARCHIVE",
            "ChemForge Lawful Intelligence Mirror", "2026-08-01T11:20:00Z", generate_hash("EVID-0009-CHEMFORGE-BMK"),
            "ENTITY-0018", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Mirror node archive -> SHA-256 integrity stamped",
            "Vendor VIPER_CORP offering 25L drums of BMK Ethyl Glycidate with payout address bc1q71de4410aa55890bb82109cd.",
            json.dumps({"forum": "ChemForge", "thread_id": "88402", "reagent": "BMK Ethyl Ester"})
        ),
        (
            "EVID-0010", "PMK Ethyl Glycidate Invoice & Waybill Reference", "COMMERCIAL_DOCUMENT",
            "Freight Manifest Interception", "2026-08-15T18:30:00Z", generate_hash("EVID-0010-PMK-WAYBILL"),
            "ENTITY-0018", "CASE-CHD-0089", "VERIFIED_INTEGRITY",
            "Seized by Inter-State Tax and Narcotics Task Force",
            "Falsified commercial shipping bill describing 50L chemical drum as 'Polymer Industrial Cleaning Agent'.",
            json.dumps({"carrier": "Oasis Logistics Fleet", "consignment_no": "WB-99120-CHD", "weight_kg": 62.5})
        ),
        (
            "EVID-0011", "Session Messenger Precursor Negotiation Dump", "COMMUNICATION_RECORD",
            "Publicly Shared Scam-Alert Archive", "2026-08-03T10:00:00Z", generate_hash("EVID-0011-SESSION-NEGOTIATION"),
            "ENTITY-0018", "CASE-CHD-0089", "VERIFIED_INTEGRITY",
            "Ingested from Verified Public Forensic Source",
            "Negotiation transcripts verifying VIPER_CORP pricing for bulk PMK barrels and BTC settlement terms.",
            json.dumps({"session_handle": "05bc71144882109400ffaa1828941c", "price_quoted_btc": 0.18})
        ),
        (
            "EVID-0012", "Synthetic Darknet Listing Snapshot: LIST-0091 MDMA", "MARKETPLACE_SNAPSHOT",
            "AbyssMarket Daily Snapshot Feed", "2026-08-19T10:42:17Z", generate_hash("EVID-0012-LIST-0091-MDMA"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Real-time Intelligence Fusion Engine Ingestion -> Auto Hash Verification",
            "Listing for 50g 98% pure MDMA Dutch crystal posted by INDRA_47 quoting payout address bc1q92fa8839dfca112048aaef82.",
            json.dumps({"listing_id": "LIST-0091", "price_btc": 0.024, "substance": "MDMA Crystal", "purity": "98.4%"})
        ),
        (
            "EVID-0015", "Listing Capture: LIST-0092 S-Isomer Ketamine Shards", "MARKETPLACE_SNAPSHOT",
            "AbyssMarket Daily Snapshot Feed", "2026-08-19T09:15:20Z", generate_hash("EVID-0015-LIST-0092-KETAMINE"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Real-time Ingestion Pipeline",
            "High-potency Ketamine listing with dead-drop delivery tags in Northern Tri-City jurisdiction.",
            json.dumps({"listing_id": "LIST-0092", "price_btc": 0.018, "substance": "Ketamine Shards"})
        ),
        (
            "EVID-0017", "Telegram Channel Capture: @kali_drops_chd Dead-Drop Ticker", "COMMUNICATION_RECORD",
            "Investigator Monitored Telegram Feed", "2026-08-05T14:45:00Z", generate_hash("EVID-0017-KALI-DROPS"),
            "ENTITY-0031", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Screen Recording & JSON API Packet Capture Stored with Timestamp Certificate",
            "Automated Telegram channel broadcast announcing active dead-drop batches in Sector 17, 22, and 35.",
            json.dumps({"channel": "@kali_drops_chd", "posts_analyzed": 48, "active_geolocations": ["30.7333,76.7794", "30.7250,76.7600"]})
        ),
        (
            "EVID-0021", "Clandestine Synthesis Batch Analysis & Crystal Photo", "FORENSIC_LAB_REPORT",
            "State Forensic Science Laboratory", "2026-07-28T09:14:00Z", generate_hash("EVID-0021-FSL-METH-LAB"),
            "ENTITY-0024", "CASE-CHD-0012", "VERIFIED_INTEGRITY",
            "Official Digital Forensic Upload -> Signed by FSL Director",
            "Gas Chromatography-Mass Spectrometry (GC-MS) report confirming methamphetamine purity of 99.1% matching PHANTOM_LABS product stock.",
            json.dumps({"fsl_ref": "FSL-CHD-2026-9012", "substance": "D-Methamphetamine", "purity": "99.1%", "method": "GC-MS"})
        ),
        (
            "EVID-0023", "Ketamine Highway Transit Packet Dump", "FIELD_EVIDENCE",
            "Highway Patrol Checkpost Seizure", "2026-08-13T19:20:00Z", generate_hash("EVID-0023-HW-KETAMINE"),
            "ENTITY-0082", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Physical Evidence Vault Transfer -> Barcode Tagged",
            "50g vacuum sealed Ketamine sugar powder recovered from concealed bus luggage rack on Chandigarh-Delhi route.",
            json.dumps({"seizure_memo": "SM-2026-8801", "weight_g": 50, "vehicle_reg": "CH-01-TB-4412"})
        ),
        (
            "EVID-0026", "Matrix Protocol Chat Log: Bulk Opioid Import Agreement", "COMMUNICATION_RECORD",
            "Lawfully Shared Intelligence Archive", "2026-07-15T18:00:00Z", generate_hash("EVID-0026-MATRIX-NEXUS"),
            "ENTITY-0052", "CASE-CHD-0089", "VERIFIED_INTEGRITY",
            "Decrypted Session Archive with Server Metadata Signature",
            "Matrix chat between @nexus_wholesale and domestic purchaser arranging multi-kilogram synthetic opioid import via stealth air cargo.",
            json.dumps({"protocol": "Matrix", "server": "matrix.darkops.io", "compound": "Nitazene Analogue"})
        ),
        (
            "EVID-0028", "Hydra Sub-Node Wholesale Order Invoice Snapshot", "FINANCIAL_DOCUMENT",
            "SilkForge Encrypted Vendor Backup", "2026-08-04T12:00:00Z", generate_hash("EVID-0028-HYDRA-INVOICE"),
            "ENTITY-0104", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Forensic extraction from seized device storage",
            "Invoice record confirming order of 5,000 blank MDMA pill press dies and 100g pure crystal base from INDRA_47.",
            json.dumps({"invoice_id": "SF-INV-99014", "total_btc": 0.085, "vendor": "INDRA_47"})
        ),
        (
            "EVID-0029", "Nitazene Opioid Laboratory Testing Memo", "FORENSIC_LAB_REPORT",
            "Central Narcotics Laboratory", "2026-08-14T21:00:00Z", generate_hash("EVID-0029-NITAZENE-TEST"),
            "ENTITY-0052", "CASE-CHD-0089", "VERIFIED_INTEGRITY",
            "Certified by Chief Toxicologist",
            "Spectroscopic validation of Protonitazene derivative showing 40x potency multiplier relative to pharmaceutical morphine.",
            json.dumps({"compound": "Protonitazene Analogue", "lethality_index": "EXTREME_CRITICAL"})
        ),
        (
            "EVID-0030", "Clandestine Lab Manual: 'Continuous Flow Ephedrine Reduction'", "TECHNICAL_DOCUMENT",
            "DarkSci Forum Repository Archive", "2026-08-08T10:00:00Z", generate_hash("EVID-0030-LAB-MANUAL"),
            "ENTITY-0063", "CASE-CHD-0012", "VERIFIED_INTEGRITY",
            "Web Archive Stamped with Digital Signature",
            "PDF manual authored by CYBER_CHEMIST detailing high-yield crystal meth synthesis with industrial reagent bypasses.",
            json.dumps({"title": "Continuous Flow Ephedrine Reduction v3.1", "author": "CYBER_CHEMIST", "pages": 24})
        ),
        (
            "EVID-0031", "Listing Snapshot: LIST-0093 Synthetic Opioid / Carfentanil", "MARKETPLACE_SNAPSHOT",
            "SilkForge Marketplace Snapshot Feed", "2026-08-18T22:30:10Z", generate_hash("EVID-0031-LIST-0093-CARFENTANIL"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Automated Crawler Ingestion -> Immediate Threat Flagging",
            "Critical threat listing offering 25g pure novel synthetic opioid powder under seller handle INDRA_47.",
            json.dumps({"listing_id": "LIST-0093", "price_btc": 0.065, "threat_tier": "CRITICAL_LETHAL"})
        ),
        (
            "EVID-0033", "Pharmaceutical Ketamine Vial Seizure Photo & Barcode", "PHYSICAL_EVIDENCE_PHOTO",
            "Hospital Logistics Audit Interception", "2026-08-17T12:00:00Z", generate_hash("EVID-0033-PHARMA-KETAMINE"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Photographed with Evidence Ruler -> Stored with Exif Metadata",
            "Batch photographs of diverted veterinary Ketamine hydrochloride vials cross-referenced with LIST-0099 photo assets.",
            json.dumps({"batch_no": "KT-2026-880A", "vials": 10, "volume_ml": 50})
        ),
        (
            "EVID-0034", "Stealth Parcel Packing Guide & Postal Dispatch Label", "LOGISTICS_RECORD",
            "SilkForge Vendor Shipping Guide", "2026-08-10T12:00:00Z", generate_hash("EVID-0034-STEALTH-GUIDE"),
            "ENTITY-0077", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Crawled by Darknet Document Ingestion Bot",
            "Step-by-step instructions on vacuum sealing, mylar shielding, and forged return addresses used by ZENITH_DROP for postal dispatches.",
            json.dumps({"mylar_layers": 3, "shielding": "Carbon Anti-Xray Foil"})
        ),
        (
            "EVID-0036", "Industrial Cylinder Delivery Receipt & GPS Tracker Log", "COMMERCIAL_DOCUMENT",
            "Chemical Distributor Surveillance Unit", "2026-08-13T11:00:00Z", generate_hash("EVID-0036-AMMONIA-CYLINDER"),
            "ENTITY-0171", "CASE-CHD-0012", "VERIFIED_INTEGRITY",
            "Secured via Judicial Subpoena to Industrial Gas Supplier",
            "Delivery manifest for 2 steel cylinders of anhydrous ammonia delivered to abandoned warehouse in outskirts.",
            json.dumps({"cylinder_serial": ["NH3-9901", "NH3-9902"], "gps_dest": "30.6800,76.8100"})
        ),
        (
            "EVID-0037", "Multi-Signature Escrow Smart Contract Bytecode", "BLOCKCHAIN_RECORD",
            "Synthetic Blockchain Forensic Scanner", "2026-07-20T16:00:00Z", generate_hash("EVID-0037-AEGIS-ESCROW"),
            "ENTITY-0095", "CASE-CHD-0104", "VERIFIED_INTEGRITY",
            "Blockchain Transaction Proof Generated -> Validated Against Root Ledger",
            "2-of-3 multi-signature escrow contract address used by AEGIS_BROKER to settle transactions between buyers and INDRA_47.",
            json.dumps({"multisig_address": "bc1q778899001122334455667788", "keys_required": 2, "total_keys": 3})
        ),
        (
            "EVID-0038", "Counterfeit Oxycodone Pill Press Die & Lab Assay", "FORENSIC_LAB_REPORT",
            "State Forensic Science Laboratory", "2026-07-25T13:00:00Z", generate_hash("EVID-0038-SOLARIS-OXY"),
            "ENTITY-0158", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Laboratory Integrity Certification",
            "Chemical test confirming presence of synthetic opioid analogues inside pills stamped with 'OC 80' pharmaceutical imprint.",
            json.dumps({"imprint": "OC 80", "fentanyl_equivalent": "1.8mg/tablet", "binder": "Microcrystalline Cellulose"})
        ),
        (
            "EVID-0039", "Alprazolam Raw Chemical Import Custom Declaration", "CUSTOMS_RECORD",
            "Air Cargo Customs Intelligence Unit", "2026-08-16T09:12:00Z", generate_hash("EVID-0039-ALPRAZOLAM-CUSTOMS"),
            "ENTITY-0158", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Seized under Customs Act 1962",
            "Declaration document disguising 100g bulk Alprazolam powder as 'Spectroscopy Reference Dye Sample'.",
            json.dumps({"declared_value_usd": 25, "actual_street_value_usd": 15000})
        ),
        (
            "EVID-0041", "Synthetic Cannabinoid Herbal Spray Batch Sample", "FORENSIC_LAB_REPORT",
            "Narcotics Testing Mobile Unit", "2026-08-16T21:10:00Z", generate_hash("EVID-0041-SYNTH-HERB"),
            "ENTITY-0128", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Field Test Kit Colorimetric Assay -> Stored in Evidence Locker",
            "Sample of marshmallow leaf infused with 5F-MDMB-PINACA potent synthetic cannabinoid.",
            json.dumps({"cannabinoid_class": "5F-MDMB-PINACA", "sample_weight_g": 25})
        ),
        (
            "EVID-0042", "2C-B Nexus Capsule Spectral Signature", "FORENSIC_LAB_REPORT",
            "Central Forensic Science Laboratory", "2026-08-16T15:25:00Z", generate_hash("EVID-0042-2CB-SPECTRAL"),
            "ENTITY-0128", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "FTIR Spectroscopy Graph Authenticated",
            "Infrared spectrum verifying 4-bromo-2,5-dimethoxyphenethylamine in gelatin capsules.",
            json.dumps({"compound": "2C-B HCl", "dosage_mg": 20})
        ),
        (
            "EVID-0047", "Listing Snapshot: LIST-0095 'Punisher' Pressed MDMA Tabs", "MARKETPLACE_SNAPSHOT",
            "AbyssMarket Daily Snapshot Feed", "2026-08-18T14:12:44Z", generate_hash("EVID-0047-LIST-0095-PUNISHER"),
            "ENTITY-0047", "CASE-CHD-0047", "VERIFIED_INTEGRITY",
            "Automated Crawler Ingestion -> Linked to INDRA_47 Master Case",
            "Listing offering 500-pack of Blue/Silver Punisher pills with direct link to wallet bc1q92fa8839dfca112048aaef82.",
            json.dumps({"listing_id": "LIST-0095", "price_btc": 0.040, "imprint": "Punisher Skull", "quantity": 500})
        )
    ]

    cursor.executemany("""
    INSERT INTO evidence (
        id, title, evidence_type, source_origin, collection_timestamp, sha256_hash,
        associated_entity_id, associated_investigation_id, integrity_status,
        chain_of_custody, description, raw_metadata
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, evidence_items)

    # 8. TIMELINE EVENTS (55 events across the investigation universe)
    timeline = [
        (
            "EVT-01", "2026-08-12T04:12:00Z", "12 AUG 2026", "First Darknet Listing Detected: INDRA_47",
            "Automated crawler indexed high-risk MDMA listing on SimulatedMarket-A under alias INDRA_47 referencing Telegram contact @indra_ops.",
            "MARKETPLACE_LISTING", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A (Abyss)", "EVID-0001"
        ),
        (
            "EVT-02", "2026-08-12T05:30:00Z", "12 AUG 2026", "Dead-Drop Locker Coordinate Broadcast",
            "Encrypted message broadcast observed specifying locker coordinates in Chandigarh Sector 22 for Blue Tesla MDMA tabs.",
            "FIELD_INTELLIGENCE", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Field Interception Unit", "EVID-0004"
        ),
        (
            "EVT-03", "2026-08-12T14:00:00Z", "12 AUG 2026", "Investigation Formally Opened: CHD-DRUG-0047",
            "Superintendent of Police authorizes formal intelligence fusion probe under Case #CHD-DRUG-0047 targeting multi-platform vendor network.",
            "CASE_ACTION", "MEDIUM", "ENTITY-0047", "CASE-CHD-0047", "Cyber Crime Division", "EVID-0001"
        ),
        (
            "EVT-04", "2026-08-13T09:00:00Z", "13 AUG 2026", "Telegram Protocol Handle Correlation",
            "Intelligence engine correlates handle @indra_ops across 3 public drug discussion channels and 1 dead-drop announcement group.",
            "COMMUNICATION_LINK", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Encrypted Channel Telemetry", "EVID-0001"
        ),
        (
            "EVT-05", "2026-08-13T11:00:00Z", "13 AUG 2026", "Industrial Solvents Order Intercepted",
            "Consignment receipt for anhydrous ammonia delivered from TITAN_REAGENTS to clandestine laboratory drop location.",
            "CHEMICAL_LINK", "MEDIUM", "ENTITY-0171", "CASE-CHD-0012", "Chemical Logistics Unit", "EVID-0036"
        ),
        (
            "EVT-06", "2026-08-13T19:20:00Z", "13 AUG 2026", "Highway Checkpost Seizure: Ketamine Consignment",
            "50g vacuum sealed Ketamine intercepted on passenger bus en route from Delhi to Chandigarh.",
            "SEIZURE", "HIGH", "ENTITY-0082", "CASE-CHD-0047", "Highway Patrol Unit", "EVID-0023"
        ),
        (
            "EVT-07", "2026-08-14T08:00:00Z", "14 AUG 2026", "Primary Crypto Wallet Discovered: bc1q92fa...",
            "Synthetic blockchain tracing correlates deposit address bc1q92fa8839dfca112048aaef82 with 4 verified darknet listing escrows.",
            "CRYPTO_CORRELATION", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0012"
        ),
        (
            "EVT-08", "2026-08-14T14:40:00Z", "14 AUG 2026", "Stealth Parcel Dispatch Profile Identified",
            "SilkForge vendor ZENITH_DROP observed utilizing identical packaging guidelines and co-signing transactions with INDRA_47.",
            "VENDOR_LINK", "HIGH", "ENTITY-0077", "CASE-CHD-0047", "SimulatedMarket-B (SilkForge)", "EVID-0034"
        ),
        (
            "EVT-09", "2026-08-14T21:00:00Z", "14 AUG 2026", "Novel Nitazene Opioid Warning Issued",
            "Central Narcotics Lab confirms synthetic opioid compound exhibits lethal potency threshold.",
            "FORENSIC_ALERT", "CRITICAL", "ENTITY-0052", "CASE-CHD-0089", "Central Narcotics Lab", "EVID-0029"
        ),
        (
            "EVT-10", "2026-08-15T12:15:00Z", "15 AUG 2026", "Sub-Node Inflow: Hydra Cell 09 Procures Stock",
            "Wholesale invoice discovered linking retail vendor HYDRA_CELL_09 with INDRA_47 bulk crystal stock.",
            "SYNDICATE_ORDER", "HIGH", "ENTITY-0104", "CASE-CHD-0047", "SimulatedMarket-B (SilkForge)", "EVID-0028"
        ),
        (
            "EVT-11", "2026-08-15T18:30:00Z", "15 AUG 2026", "Precursor Smuggling Waybill Confirmed: VIPER_CORP",
            "50L PMK Glycidate drum shipment tracked through commercial freight disguise via Oasis Logistics.",
            "PRECURSOR_TRANSIT", "CRITICAL", "ENTITY-0018", "CASE-CHD-0089", "Freight Monitoring Unit", "EVID-0010"
        ),
        (
            "EVT-12", "2026-08-15T23:50:00Z", "15 AUG 2026", "Dead-Drop Channel Launched: @kali_drops_chd",
            "Local delivery courier begins posting live drop notifications for Chandigarh tri-city zones.",
            "CHANNEL_MONITOR", "HIGH", "ENTITY-0031", "CASE-CHD-0047", "Encrypted Channel Telemetry", "EVID-0017"
        ),
        (
            "EVT-13", "2026-08-16T09:12:00Z", "16 AUG 2026", "Customs Seizure: Counterfeit Pharma Raw Powder",
            "100g bulk Alprazolam disguised as chemical dye intercepted at air cargo facility.",
            "CUSTOMS_SEIZURE", "HIGH", "ENTITY-0158", "CASE-CHD-0047", "Air Cargo Customs Unit", "EVID-0039"
        ),
        (
            "EVT-14", "2026-08-16T15:25:00Z", "16 AUG 2026", "Designer NPS Compound Identified: 2C-B Nexus",
            "Spectroscopy report verifies research chemical distribution under vendor AURORA_SYNTH.",
            "DRUG_ANALYSIS", "MEDIUM", "ENTITY-0128", "CASE-CHD-0047", "Central Forensic Lab", "EVID-0042"
        ),
        (
            "EVT-15", "2026-08-16T21:10:00Z", "16 AUG 2026", "Synthetic Cannabinoid Herbal Spray Batch Flagged",
            "Field test identifies potent 5F-MDMB cannabinoid blend being distributed in retail packages.",
            "DRUG_ALERT", "MEDIUM", "ENTITY-0128", "CASE-CHD-0047", "Mobile Narcotics Unit", "EVID-0041"
        ),
        (
            "EVT-16", "2026-08-17T11:00:00Z", "17 AUG 2026", "Cold Storage Sweep: bc1q4455... (SHADOW_VAULT)",
            "12.45 BTC accumulated profits swept into cold vault from active darknet marketplace accounts.",
            "CRYPTO_SWEEP", "HIGH", "ENTITY-0112", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0037"
        ),
        (
            "EVT-17", "2026-08-17T12:00:00Z", "17 AUG 2026", "Pharma Ketamine Vials Diverted from Clinical Supply",
            "Photographic comparison confirms diverted hospital lot matches vendor listing photo assets.",
            "DIVERSION_MATCH", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Hospital Audit Unit", "EVID-0033"
        ),
        (
            "EVT-18", "2026-08-17T16:40:00Z", "17 AUG 2026", "Second Marketplace Activity: SilkForge & GlobalDark",
            "Cross-correlation engine detects INDRA_47 and affiliated alias NEXUS_SUPPLY operating parallel storefronts.",
            "CROSS_MARKET_LINK", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Cross-Platform Correlation Engine", "EVID-0026"
        ),
        (
            "EVT-19", "2026-08-17T20:18:00Z", "17 AUG 2026", "Precursor Settlement Observed: 3.45 BTC Transfer",
            "Direct blockchain transfer between primary wallet bc1q92fa... and precursor broker bc1q71de...",
            "FINANCIAL_TRANSFER", "CRITICAL", "ENTITY-0018", "CASE-CHD-0047", "Synthetic Bitcoin Ledger", "EVID-0009"
        ),
        (
            "EVT-20", "2026-08-18T11:05:00Z", "18 AUG 2026", "Counterfeit Oxycodone 80mg Stock Published",
            "Vendor SOLARIS_PHARMA lists pressed synthetic opioid pills with identical packaging stamps.",
            "MARKETPLACE_LISTING", "HIGH", "ENTITY-0158", "CASE-CHD-0047", "SimulatedMarket-A (Abyss)", "EVID-0038"
        ),
        (
            "EVT-21", "2026-08-18T14:12:44Z", "18 AUG 2026", "Bulk 'Punisher' MDMA Batch Published: 500 Units",
            "Listing LIST-0095 posted by INDRA_47 offering wholesale dual-color pressed tablets.",
            "MARKETPLACE_LISTING", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A (Abyss)", "EVID-0047"
        ),
        (
            "EVT-22", "2026-08-18T19:40:00Z", "18 AUG 2026", "PHANTOM_LABS Clandestine Synthesis Connection Verified",
            "Forensic GC-MS impurity profile matches crystal meth stock advertised on SilkForge.",
            "FORENSIC_LINK", "CRITICAL", "ENTITY-0024", "CASE-CHD-0012", "Forensic Science Lab", "EVID-0021"
        ),
        (
            "EVT-23", "2026-08-18T22:30:10Z", "18 AUG 2026", "Lethal Synthetic Opioid / Carfentanil Listing Flagged",
            "Listing LIST-0093 detected. Automated risk engine escalates INDRA_47 network threat level to CRITICAL.",
            "RISK_ESCALATION", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Automated Threat Engine", "EVID-0031"
        ),
        (
            "EVT-24", "2026-08-19T05:00:00Z", "19 AUG 2026", "Mixer Funneling Alert: AEGIS_BROKER Multi-Sig Pool",
            "Escrow tumbler settles 15.8 BTC through 2-of-3 multi-sig address to obfuscate drug proceeds.",
            "MIXER_ALERT", "HIGH", "ENTITY-0095", "CASE-CHD-0104", "Synthetic Blockchain Monitor", "EVID-0037"
        ),
        (
            "EVT-25", "2026-08-19T06:22:00Z", "19 AUG 2026", "Batch Signature Match: PHANTOM_LABS & INDRA_47",
            "Correlation engine confirms chemical fingerprint match between bulk lab supply and retail drops.",
            "CORRELATION_CONFIRMED", "CRITICAL", "ENTITY-0024", "CASE-CHD-0047", "Intelligence Fusion Engine", "EVID-0021"
        ),
        (
            "EVT-26", "2026-08-19T08:15:00Z", "19 AUG 2026", "Geospatial Dead-Drop Cluster: Sector 17 & 22",
            "Local delivery couriers @kali_drops_chd log 6 active drops within urban commercial centers.",
            "GEO_SURGE", "HIGH", "ENTITY-0031", "CASE-CHD-0047", "Field Surveillance Unit", "EVID-0017"
        ),
        (
            "EVT-27", "2026-08-19T09:15:20Z", "19 AUG 2026", "New High-Risk Listing: S-Isomer Ketamine Shards",
            "Listing LIST-0092 indexed on AbyssMarket with immediate courier dispatch in tri-city.",
            "MARKETPLACE_LISTING", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "SimulatedMarket-A (Abyss)", "EVID-0015"
        ),
        (
            "EVT-28", "2026-08-19T10:41:52Z", "19 AUG 2026", "Cross-Platform Fusion Alert Generated: ALT-8841",
            "System synthesizes 91% correlation confidence linking INDRA_47, @indra_ops, wallet bc1q92fa..., and 8 syndicate entities.",
            "FUSION_ALERT", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Intelligence Fusion Engine", "EVID-0012"
        ),
        (
            "EVT-29", "2026-08-19T10:42:17Z", "19 AUG 2026", "Live Listing Ingested: HQ 98% Pure MDMA Crystal",
            "Real-time SSE feed streams new listing capture LIST-0091 to Command Center operations console.",
            "LIVE_FEED_STREAM", "HIGH", "ENTITY-0047", "CASE-CHD-0047", "Live Intelligence Crawler", "EVID-0012"
        ),
        (
            "EVT-30", "2026-08-19T10:45:00Z", "19 AUG 2026", "Case CHD-DRUG-0047 Intelligence Summary Updated",
            "Formal intelligence dossier compiled with 19 verified evidence items ready for executive review and operational action.",
            "REPORT_READY", "CRITICAL", "ENTITY-0047", "CASE-CHD-0047", "Investigator Workspace", "EVID-0001"
        )
    ]

    cursor.executemany("""
    INSERT INTO timeline_events (
        id, timestamp, date_str, title, description, event_type, severity,
        associated_entity_id, associated_investigation_id, source, evidence_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, timeline)

    # 9. AUDIT LOGS (Sample verified audit records)
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
        ("AUD-1010", "Analyst-14 (P. Kaur)", "Analyst", "QUERY_AI_ASSISTANT", "ASSISTANT_INDRA_47_RISK", "2026-08-19T09:10:22Z", "SUCCESS", "10.24.110.45"),
        ("AUD-1011", "Analyst-14 (P. Kaur)", "Analyst", "FILTERED_DRUG_ANALYTICS", "MDMA & SYNTHETIC_OPIOIDS", "2026-08-19T09:25:00Z", "SUCCESS", "10.24.110.45"),
        ("AUD-1012", "Admin-01 (Tech Lead)", "Administrator", "CONFIGURED_CORRELATION_WEIGHTS", "CORRELATION_ENGINE", "2026-08-19T10:00:00Z", "SUCCESS", "10.24.110.02")
    ]

    cursor.executemany("""
    INSERT INTO audit_logs (
        id, user_officer, role, action, resource_target, timestamp, result, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, audit_records)

    conn.commit()
    conn.close()
    print("Seeded database with complete synthetic investigative universe successfully.")

if __name__ == "__main__":
    seed_database()
