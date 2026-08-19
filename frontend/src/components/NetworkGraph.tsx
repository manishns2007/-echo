import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { NetworkGraphData } from '../types/intelligence';
import { 
  Share2, 
  Coins, 
  Pill, 
  ShoppingBag, 
  MessageSquareCode, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface NetworkGraphProps {
  graphData: NetworkGraphData | null;
  onSelectEntity: (entityId: string) => void;
  selectedEntityId?: string;
}

export type GraphViewMode = 'suspects' | 'wallets' | 'listings' | 'markets' | 'comms' | 'master';

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  graphData,
  onSelectEntity,
  selectedEntityId = 'ENTITY-0047'
}) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  const [viewMode, setViewMode] = useState<GraphViewMode>('suspects');
  const [selectedEdgeData, setSelectedEdgeData] = useState<any | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  const viewModes: { id: GraphViewMode; label: string; icon: any; desc: string; countLabel: string }[] = [
    {
      id: 'suspects',
      label: '1. Suspect Syndicate Network',
      icon: Share2,
      desc: 'Organizational hierarchy & supply ties between INDRA_47, VIPER_CORP, PHANTOM_LABS, KALI_DISTRO',
      countLabel: '15 Suspect Nodes'
    },
    {
      id: 'wallets',
      label: '2. Crypto & Wallet Flow Graph',
      icon: Coins,
      desc: 'Blockchain transaction flows, 3.45 BTC precursor settlements, and 12.45 BTC cold vault sweeps',
      countLabel: '8 Wallets & Payout Links'
    },
    {
      id: 'listings',
      label: '3. Drug Listings & Products Graph',
      icon: Pill,
      desc: 'Direct mapping of vendors to active MDMA, Ketamine, Synthetic Opioid, and Meth listings',
      countLabel: '15 Catalog Listings'
    },
    {
      id: 'markets',
      label: '4. Marketplaces & Storefronts Graph',
      icon: ShoppingBag,
      desc: 'Vendor storefront infrastructure across SimulatedMarket-A, SimulatedMarket-B, ChemForge',
      countLabel: '4 Market Hubs'
    },
    {
      id: 'comms',
      label: '5. Encrypted Comms & Handles Graph',
      icon: MessageSquareCode,
      desc: 'Publicly & lawfully correlated handles: @indra_ops, @kali_drops_chd, Session & Matrix endpoints',
      countLabel: '10 Comms Handles'
    },
    {
      id: 'master',
      label: '6. Master Unified Fusion',
      icon: Layers,
      desc: 'Comprehensive multi-source correlation topology combining all intelligence layers',
      countLabel: 'Full Combined Fusion'
    }
  ];

  useEffect(() => {
    if (!cyRef.current || !graphData) return;

    let targetNodes = [...graphData.nodes];
    let targetEdges = [...graphData.edges];

    // Filter elements strictly based on the selected domain view mode
    if (viewMode === 'suspects') {
      // Show only suspect entities and inter-suspect syndicate relationships
      targetNodes = graphData.nodes.filter((n) => n.data.type === 'suspect');
      const nodeIds = new Set(targetNodes.map((n) => n.data.id));
      targetEdges = graphData.edges.filter((e) => nodeIds.has(e.data.source) && nodeIds.has(e.data.target));
    } else if (viewMode === 'wallets') {
      // Show suspects + crypto wallets + transaction flows
      targetNodes = graphData.nodes.filter((n) => n.data.type === 'suspect' || n.data.type === 'wallet');
      const nodeIds = new Set(targetNodes.map((n) => n.data.id));
      targetEdges = graphData.edges.filter((e) => 
        (e.data.relationship.includes('WALLET') || e.data.relationship.includes('SETTLEMENT') || e.data.relationship.includes('BTC') || e.data.relationship.includes('VAULT') || e.data.relationship.includes('CONTROLS')) &&
        nodeIds.has(e.data.source) && nodeIds.has(e.data.target)
      );
    } else if (viewMode === 'listings') {
      // Show suspects + drug listings + product supply links
      targetNodes = graphData.nodes.filter((n) => n.data.type === 'suspect' || n.data.type === 'listing');
      const nodeIds = new Set(targetNodes.map((n) => n.data.id));
      targetEdges = graphData.edges.filter((e) => 
        (e.data.relationship.includes('LISTING') || e.data.relationship.includes('PUBLISHED') || e.data.relationship.includes('SUPPLY')) &&
        nodeIds.has(e.data.source) && nodeIds.has(e.data.target)
      );
    } else if (viewMode === 'markets') {
      // Show suspects + marketplaces + hosting links
      targetNodes = graphData.nodes.filter((n) => n.data.type === 'suspect' || n.data.type === 'marketplace' || n.data.type === 'listing');
      const nodeIds = new Set(targetNodes.map((n) => n.data.id));
      targetEdges = graphData.edges.filter((e) => 
        (e.data.relationship.includes('HOSTED') || e.data.relationship.includes('MARKET') || e.data.relationship.includes('PUBLISHED')) &&
        nodeIds.has(e.data.source) && nodeIds.has(e.data.target)
      );
    } else if (viewMode === 'comms') {
      // Show suspects + comms handles
      targetNodes = graphData.nodes.filter((n) => n.data.type === 'suspect' || n.data.type === 'comms');
      const nodeIds = new Set(targetNodes.map((n) => n.data.id));
      targetEdges = graphData.edges.filter((e) => 
        (e.data.relationship.includes('IDENTIFIER') || e.data.relationship.includes('USES') || e.data.relationship.includes('CHANNEL')) &&
        nodeIds.has(e.data.source) && nodeIds.has(e.data.target)
      );
    }

    // Ensure all edges strictly connect nodes that exist in targetNodes to prevent Cytoscape errors
    const validNodeIds = new Set(targetNodes.map((n) => n.data.id));
    targetEdges = targetEdges.filter(
      (e) => validNodeIds.has(e.data.source) && validNodeIds.has(e.data.target)
    );

    // Initialize Cytoscape with domain-optimized layout & styling
    const cy = cytoscape({
      container: cyRef.current,
      elements: [...targetNodes, ...targetEdges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#E2E8F0',
            'font-family': 'ui-monospace, monospace',
            'font-size': '11px',
            'text-valign': 'bottom',
            'text-margin-y': 7,
            'text-outline-color': '#06090e',
            'text-outline-width': 2.5,
            'background-color': '#1E293B',
            'border-width': 2,
            'border-color': '#475569',
            'width': 40,
            'height': 40,
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': 0.2
          }
        },
        // Suspect Nodes
        {
          selector: 'node[type = "suspect"]',
          style: {
            'background-color': '#0F172A',
            'border-color': '#F43F5E',
            'border-width': 3,
            'width': 46,
            'height': 46
          }
        },
        {
          selector: 'node[id = "ENTITY-0047"]',
          style: {
            'background-color': '#881337',
            'border-color': '#FB7185',
            'border-width': 4,
            'width': 58,
            'height': 58,
            'font-size': '13px',
            'font-weight': 'bold'
          }
        },
        // Wallet Nodes
        {
          selector: 'node[type = "wallet"]',
          style: {
            'background-color': '#1E1B4B',
            'border-color': '#F59E0B',
            'shape': 'hexagon',
            'width': 42,
            'height': 42
          }
        },
        // Comms Nodes
        {
          selector: 'node[type = "comms"]',
          style: {
            'background-color': '#3B0764',
            'border-color': '#A855F7',
            'shape': 'diamond',
            'width': 38,
            'height': 38
          }
        },
        // Listing Nodes
        {
          selector: 'node[type = "listing"]',
          style: {
            'background-color': '#064E3B',
            'border-color': '#10B981',
            'shape': 'round-rectangle',
            'width': 48,
            'height': 34
          }
        },
        // Marketplace Nodes
        {
          selector: 'node[type = "marketplace"]',
          style: {
            'background-color': '#082F49',
            'border-color': '#06B6D4',
            'shape': 'ellipse',
            'width': 48,
            'height': 48
          }
        },
        // Edge styling
        {
          selector: 'edge',
          style: {
            'width': 2.5,
            'line-color': '#334155',
            'target-arrow-color': '#64748B',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.85,
            'label': 'data(relationship)',
            'font-family': 'ui-monospace, monospace',
            'font-size': '9px',
            'color': '#94A3B8',
            'text-rotation': 'autorotate',
            'text-background-opacity': 0.85,
            'text-background-color': '#0B0F17',
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle'
          }
        },
        {
          selector: 'edge[confidence >= 85]',
          style: {
            'line-color': '#0284C7',
            'target-arrow-color': '#0284C7',
            'width': 3,
            'opacity': 0.95
          }
        },
        {
          selector: ':selected',
          style: {
            'border-color': '#38BDF8',
            'border-width': 4,
            'line-color': '#38BDF8',
            'target-arrow-color': '#38BDF8',
            'width': 4
          }
        }
      ],
      layout: {
        name: viewMode === 'suspects' ? 'concentric' : 'cose',
        animate: false,
        padding: 60,
        nodeRepulsion: () => 12000,
        idealEdgeLength: () => 130,
        nodeOverlap: 30
      }
    });

    cy.on('tap', 'edge', (evt) => {
      setSelectedEdgeData(evt.target.data());
      setSelectedNodeData(null);
    });

    cy.on('tap', 'node', (evt) => {
      setSelectedNodeData(evt.target.data());
      setSelectedEdgeData(null);
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedEdgeData(null);
        setSelectedNodeData(null);
      }
    });

    cyInstance.current = cy;
    cy.fit(undefined, 50);

    return () => {
      cy.destroy();
    };
  }, [graphData, viewMode]);

  const handleCenter = () => {
    if (cyInstance.current) {
      cyInstance.current.fit(undefined, 50);
    }
  };

  const handleZoomIn = () => {
    if (cyInstance.current) {
      cyInstance.current.zoom(cyInstance.current.zoom() * 1.25);
    }
  };

  const handleZoomOut = () => {
    if (cyInstance.current) {
      cyInstance.current.zoom(cyInstance.current.zoom() * 0.8);
    }
  };

  const currentModeObj = viewModes.find((m) => m.id === viewMode) || viewModes[0];

  return (
    <div className="space-y-4 font-mono">
      {/* 1. Specialized Graph View Selector (Dedicated Clean Tabs) */}
      <div className="bg-[#090F1C] p-2 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setViewMode(mode.id);
                  setSelectedEdgeData(null);
                  setSelectedNodeData(null);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center space-x-2 pr-2">
          <span className="text-[11px] text-slate-400">{currentModeObj.countLabel}</span>
        </div>
      </div>

      {/* 2. Mode Description Bar */}
      <div className="px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2 truncate">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="truncate">{currentModeObj.desc}</span>
        </div>
        <span className="text-[10px] uppercase font-bold text-slate-500 hidden sm:inline">Click node or edge for deep telemetry</span>
      </div>

      {/* 3. Dedicated Cytoscape Canvas */}
      <div className="relative w-full h-[calc(100vh-14.5rem)] rounded-2xl overflow-hidden border border-slate-800 bg-[#070C15] shadow-2xl">
        {/* Floating Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-1.5 bg-[#090F1C]/95 border border-slate-800 rounded-xl p-1.5 backdrop-blur shadow-2xl">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleCenter}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            title="Fit to Screen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Cytoscape Container */}
        <div ref={cyRef} className="w-full h-full" />

        {/* Dynamic Legend based on active mode */}
        <div className="absolute bottom-4 left-4 z-10 bg-[#090F1C]/90 border border-slate-800 rounded-xl p-3 backdrop-blur shadow-2xl text-[11px] space-y-1.5 hidden sm:block">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Graph Mode: {viewMode.toUpperCase()}</div>
          <div className="flex items-center space-x-3 text-slate-300 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Suspects</span>
            </div>
            {viewMode === 'wallets' && (
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-amber-500 transform rotate-45"></span>
                <span>Crypto Wallets</span>
              </div>
            )}
            {viewMode === 'listings' && (
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                <span>Drug Listings</span>
              </div>
            )}
            {viewMode === 'markets' && (
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>Marketplaces</span>
              </div>
            )}
            {viewMode === 'comms' && (
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-purple-500 transform rotate-45"></span>
                <span>Comms Handles</span>
              </div>
            )}
          </div>
        </div>

        {/* Edge Inspector Card */}
        {selectedEdgeData && (
          <div className="absolute top-4 right-16 z-20 w-84 bg-[#090F1C]/95 border border-cyan-500/50 rounded-2xl p-5 backdrop-blur shadow-2xl text-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                <Share2 className="w-4 h-4" />
                <span>RELATIONSHIP INSPECTOR</span>
              </div>
              <button
                onClick={() => setSelectedEdgeData(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px]">
                <span className="text-slate-500 block text-[10px]">Connection:</span>
                <span className="font-bold text-slate-200">{selectedEdgeData.source}</span>
                <span className="text-cyan-400 mx-1.5">→</span>
                <span className="font-bold text-slate-200">{selectedEdgeData.target}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Relationship:</span>
                <span className="font-bold text-cyan-300 text-sm">{selectedEdgeData.relationship}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Confidence Score:</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {selectedEdgeData.confidence}%
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Evidence Basis:</span>
                <div className="mt-1 p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                  {selectedEdgeData.evidence}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Node Inspector Card */}
        {selectedNodeData && (
          <div className="absolute top-4 right-16 z-20 w-84 bg-[#090F1C]/95 border border-slate-700 rounded-2xl p-5 backdrop-blur shadow-2xl text-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-slate-200 font-bold">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>NODE TELEMETRY</span>
              </div>
              <button
                onClick={() => setSelectedNodeData(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Identifier:</span>
                <span className="font-bold text-slate-100 text-sm">{selectedNodeData.label || selectedNodeData.id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Type:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-bold text-[10px]">
                  {selectedNodeData.type}
                </span>
              </div>

              {selectedNodeData.riskScore && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Risk Score:</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    selectedNodeData.riskScore >= 80 
                      ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {selectedNodeData.riskScore}/100
                  </span>
                </div>
              )}

              {selectedNodeData.type === 'suspect' && (
                <button
                  onClick={() => onSelectEntity(selectedNodeData.id)}
                  className="w-full mt-2 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all"
                >
                  <span>Open 360° Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
