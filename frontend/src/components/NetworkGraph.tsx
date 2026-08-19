import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { 
  NetworkGraphData, 
  GraphNode, 
  GraphEdge 
} from '../types/intelligence';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Filter, 
  Eye, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2,
  Info,
  Maximize2,
  Minimize2,
  Compass
} from 'lucide-react';

interface NetworkGraphProps {
  graphData: NetworkGraphData | null;
  onSelectEntity: (entityId: string) => void;
  selectedEntityId?: string;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  graphData,
  onSelectEntity,
  selectedEntityId
}) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<cytoscape.Core | null>(null);

  const [selectedEdgeData, setSelectedEdgeData] = useState<any | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  // Filter toggles
  const [showWallets, setShowWallets] = useState<boolean>(true);
  const [showComms, setShowComms] = useState<boolean>(true);
  const [showListings, setShowListings] = useState<boolean>(true);
  const [showMarketplaces, setShowMarketplaces] = useState<boolean>(true);
  const [focusTarget, setFocusTarget] = useState<string>(selectedEntityId || 'ENTITY-0047');

  useEffect(() => {
    if (!cyRef.current || !graphData) return;

    // Filter nodes based on state
    const filteredNodes = graphData.nodes.filter((node) => {
      if (!showWallets && node.data.type === 'wallet') return false;
      if (!showComms && node.data.type === 'comms') return false;
      if (!showListings && node.data.type === 'listing') return false;
      if (!showMarketplaces && node.data.type === 'marketplace') return false;
      return true;
    });

    const activeNodeIds = new Set(filteredNodes.map((n) => n.data.id));

    const filteredEdges = graphData.edges.filter((edge) => {
      return activeNodeIds.has(edge.data.source) && activeNodeIds.has(edge.data.target);
    });

    // Initialize Cytoscape
    const cy = cytoscape({
      container: cyRef.current,
      elements: [...filteredNodes, ...filteredEdges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#E2E8F0',
            'font-family': 'ui-monospace, monospace',
            'font-size': '11px',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'text-outline-color': '#06090e',
            'text-outline-width': 2,
            'background-color': '#334155',
            'border-width': 2,
            'border-color': '#64748B',
            'width': 38,
            'height': 38,
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': 0.2
          }
        },
        // Node Type Specific Styles
        {
          selector: 'node[type = "suspect"]',
          style: {
            'background-color': '#0F172A',
            'border-color': '#F43F5E',
            'border-width': 3,
            'width': 44,
            'height': 44
          }
        },
        {
          selector: 'node[id = "ENTITY-0047"]',
          style: {
            'background-color': '#881337',
            'border-color': '#FB7185',
            'border-width': 4,
            'width': 56,
            'height': 56,
            'font-size': '13px',
            'font-weight': 'bold'
          }
        },
        {
          selector: 'node[type = "wallet"]',
          style: {
            'background-color': '#1E1B4B',
            'border-color': '#F59E0B',
            'shape': 'hexagon',
            'width': 36,
            'height': 36
          }
        },
        {
          selector: 'node[type = "comms"]',
          style: {
            'background-color': '#3B0764',
            'border-color': '#A855F7',
            'shape': 'diamond',
            'width': 34,
            'height': 34
          }
        },
        {
          selector: 'node[type = "listing"]',
          style: {
            'background-color': '#064E3B',
            'border-color': '#10B981',
            'shape': 'round-rectangle',
            'width': 38,
            'height': 32
          }
        },
        {
          selector: 'node[type = "marketplace"]',
          style: {
            'background-color': '#082F49',
            'border-color': '#06B6D4',
            'shape': 'ellipse',
            'width': 40,
            'height': 40
          }
        },
        // Edges styling
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#334155',
            'target-arrow-color': '#475569',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.75,
            'label': 'data(relationship)',
            'font-family': 'ui-monospace, monospace',
            'font-size': '8px',
            'color': '#94A3B8',
            'text-rotation': 'autorotate',
            'text-background-opacity': 0.8,
            'text-background-color': '#0B0F17',
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle'
          }
        },
        {
          selector: 'edge[confidence >= 85]',
          style: {
            'line-color': '#0284C7',
            'target-arrow-color': '#0284C7',
            'width': 2.5,
            'opacity': 0.9
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
        name: 'cose',
        animate: false,
        padding: 40,
        nodeRepulsion: () => 8000,
        idealEdgeLength: () => 100,
        nodeOverlap: 20
      }
    });

    // Event handlers
    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      setSelectedEdgeData(edge.data());
      setSelectedNodeData(null);
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      setSelectedNodeData(node.data());
      setSelectedEdgeData(null);
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedEdgeData(null);
        setSelectedNodeData(null);
      }
    });

    cyInstance.current = cy;

    // Focus on target if set
    if (focusTarget) {
      const targetNode = cy.$(`#${focusTarget}`);
      if (targetNode.length > 0) {
        cy.center(targetNode);
        cy.zoom({ level: 1.25, position: targetNode.position() });
        targetNode.select();
        setSelectedNodeData(targetNode.data());
      }
    }

    return () => {
      cy.destroy();
    };
  }, [graphData, showWallets, showComms, showListings, showMarketplaces]);

  const handleCenter = () => {
    if (cyInstance.current) {
      cyInstance.current.fit(undefined, 30);
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

  const handleIsolateTarget = (targetId = 'ENTITY-0047') => {
    if (!cyInstance.current) return;
    const cy = cyInstance.current;
    const target = cy.$(`#${targetId}`);
    if (target.length === 0) return;

    const neighborhood = target.neighborhood().add(target);
    cy.elements().removeClass('opacity-20');
    cy.elements().not(neighborhood).addClass('opacity-20');
    cy.center(neighborhood);
    cy.fit(neighborhood, 40);
  };

  const handleResetFilters = () => {
    if (!cyInstance.current) return;
    cyInstance.current.elements().removeClass('opacity-20');
    cyInstance.current.fit(undefined, 30);
  };

  return (
    <div className="relative w-full h-[calc(100vh-8.5rem)] rounded-xl overflow-hidden border border-slate-800 bg-[#070B11]">
      {/* Top Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 bg-slate-900/90 border border-slate-800/90 rounded-lg p-2 backdrop-blur shadow-lg text-xs font-mono">
        <div className="flex items-center space-x-1.5 px-2 py-1 bg-slate-950 rounded border border-slate-800 text-slate-300">
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold">Network Graph</span>
        </div>

        {/* Node Filters */}
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
          <button
            onClick={() => setShowWallets(!showWallets)}
            className={`px-2 py-1 rounded text-[11px] transition-colors ${
              showWallets ? 'bg-amber-950/80 text-amber-300 border border-amber-700' : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            Wallets
          </button>
          <button
            onClick={() => setShowComms(!showComms)}
            className={`px-2 py-1 rounded text-[11px] transition-colors ${
              showComms ? 'bg-purple-950/80 text-purple-300 border border-purple-700' : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            Comms
          </button>
          <button
            onClick={() => setShowListings(!showListings)}
            className={`px-2 py-1 rounded text-[11px] transition-colors ${
              showListings ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setShowMarketplaces(!showMarketplaces)}
            className={`px-2 py-1 rounded text-[11px] transition-colors ${
              showMarketplaces ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700' : 'bg-slate-950 text-slate-500 border border-slate-800'
            }`}
          >
            Markets
          </button>
        </div>

        {/* Quick Focus Actions */}
        <div className="flex items-center space-x-1 pl-2 border-l border-slate-800">
          <button
            onClick={() => handleIsolateTarget('ENTITY-0047')}
            className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-700 hover:bg-rose-900 text-[11px] font-semibold"
          >
            Isolate INDRA_47 Cluster
          </button>
          <button
            onClick={handleResetFilters}
            className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 text-[11px]"
          >
            Reset Focus
          </button>
        </div>
      </div>

      {/* Floating Canvas Controls (Zoom, Fit) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 backdrop-blur shadow-lg font-mono">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleCenter}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300"
          title="Fit to Screen"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Cytoscape Canvas Container */}
      <div ref={cyRef} className="w-full h-full" />

      {/* Graph Legend (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 backdrop-blur shadow-lg text-[11px] font-mono space-y-1.5 hidden sm:block">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legend & Entity Types</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-300"></span>
            <span>Suspect (INDRA_47)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 transform rotate-45"></span>
            <span>Crypto Wallet</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-purple-500 transform rotate-45"></span>
            <span>Encrypted Comms</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>Drug Listing</span>
          </div>
        </div>
      </div>

      {/* Edge Relationship Details Card (When Edge is Clicked) */}
      {selectedEdgeData && (
        <div className="absolute top-16 right-4 z-20 w-80 bg-slate-900/95 border border-cyan-500/40 rounded-xl p-4 backdrop-blur shadow-2xl font-mono text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold">
              <Share2 className="w-4 h-4" />
              <span>RELATIONSHIP INSPECTION</span>
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
              <span className="text-slate-500 block">Source → Target:</span>
              <span className="font-semibold text-slate-200">{selectedEdgeData.source}</span>
              <span className="text-cyan-400 mx-1.5">→</span>
              <span className="font-semibold text-slate-200">{selectedEdgeData.target}</span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Relationship Type:</span>
              <span className="font-bold text-cyan-300 text-sm">{selectedEdgeData.relationship}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Correlation Confidence:</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                {selectedEdgeData.confidence}%
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Forensic Evidence Basis:</span>
              <div className="mt-1 p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                {selectedEdgeData.evidence}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
              <div>
                <span className="block text-slate-500">First Observed:</span>
                <span className="text-slate-300">{selectedEdgeData.firstObserved || '12 Aug 2026'}</span>
              </div>
              <div>
                <span className="block text-slate-500">Last Observed:</span>
                <span className="text-slate-300">{selectedEdgeData.lastObserved || '19 Aug 2026'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Node Quick Inspector Drawer (When Node is Clicked) */}
      {selectedNodeData && (
        <div className="absolute top-16 right-4 z-20 w-80 bg-slate-900/95 border border-slate-700 rounded-xl p-4 backdrop-blur shadow-2xl font-mono text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-slate-200 font-bold">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>NODE INTELLIGENCE</span>
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
              <span className="text-slate-500 block text-[10px] uppercase">Node Label / ID:</span>
              <span className="font-bold text-slate-100 text-sm">{selectedNodeData.label || selectedNodeData.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Node Type:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-semibold text-[10px]">
                {selectedNodeData.type}
              </span>
            </div>

            {selectedNodeData.riskScore && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Risk Assessment:</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  selectedNodeData.riskScore >= 80 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {selectedNodeData.riskScore}/100 ({selectedNodeData.threatLevel || 'HIGH'})
                </span>
              </div>
            )}

            {selectedNodeData.subType && (
              <div>
                <span className="text-slate-500 block text-[10px]">Role / Classification:</span>
                <span className="text-slate-300">{selectedNodeData.subType}</span>
              </div>
            )}

            {selectedNodeData.type === 'suspect' && (
              <button
                onClick={() => onSelectEntity(selectedNodeData.id)}
                className="w-full mt-3 flex items-center justify-center space-x-2 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all"
              >
                <span>Open 360° Entity Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
