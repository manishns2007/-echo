import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoTourBar, DEMO_STEPS } from './components/DemoTourBar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AIInvestigatorAssistant } from './components/AIInvestigatorAssistant';
import { AuditLogDrawer } from './components/AuditLogDrawer';
import { ReportViewerModal } from './components/ReportViewerModal';
import { NetworkGraph } from './components/NetworkGraph';

// Dedicated Views
import { LandingPageView } from './views/LandingPageView';
import { CommandCenter } from './views/CommandCenter';
import { LiveFeedView } from './views/LiveFeedView';
import { AlertCenterView } from './views/AlertCenterView';
import { DrugIntelligenceView } from './views/DrugIntelligenceView';
import { EntityIntelligenceView } from './views/EntityIntelligenceView';
import { EntityProfileDetail } from './views/EntityProfileDetail';
import { CryptoIntelligenceView } from './views/CryptoIntelligenceView';
import { EncryptedPlatformView } from './views/EncryptedPlatformView';
import { InvestigationWorkspaceView } from './views/InvestigationWorkspaceView';
import { ReportGenerationView } from './views/ReportGenerationView';
import { EvidenceVaultView } from './views/EvidenceVaultView';
import { TimelineView } from './views/TimelineView';
import { CorrelationSimulatorView } from './views/CorrelationSimulatorView';

import { 
  SystemStats, 
  AlertRecord, 
  TimelineEvent, 
  EntitySummary, 
  NetworkGraphData 
} from './types/intelligence';
import { api } from './services/api';

// URL Path to View ID Mapping
const PATH_TO_VIEW: Record<string, string> = {
  '/': 'landing',
  '/landing': 'landing',
  '/home': 'home',
  '/command-center': 'home',
  '/investigation-panel': 'investigations',
  '/investigation': 'investigations',
  '/investigations': 'investigations',
  '/agents': 'agents',
  '/network-graph': 'agents',
  '/report-generation': 'report-generation',
  '/reports': 'report-generation',
  '/entities': 'entity-intel',
  '/entity-intel': 'entity-intel',
  '/entity-detail': 'entity-detail',
  '/crypto': 'crypto-intel',
  '/crypto-intel': 'crypto-intel',
  '/drugs': 'drug-intel',
  '/drug-intel': 'drug-intel',
  '/comms': 'encrypted-platforms',
  '/encrypted-platforms': 'encrypted-platforms',
  '/alerts': 'alert-center',
  '/alert-center': 'alert-center',
  '/live-feed': 'live-feed',
  '/timeline': 'timeline',
  '/evidence': 'evidence-vault',
  '/evidence-vault': 'evidence-vault',
  '/correlation': 'correlation-engine',
  '/correlation-engine': 'correlation-engine'
};

const VIEW_TO_PATH: Record<string, string> = {
  'landing': '/',
  'home': '/home',
  'command-center': '/home',
  'investigations': '/investigation-panel',
  'agents': '/agents',
  'network-graph': '/agents',
  'report-generation': '/report-generation',
  'entity-intel': '/entities',
  'entity-detail': '/entity-detail',
  'crypto-intel': '/crypto',
  'drug-intel': '/drugs',
  'encrypted-platforms': '/comms',
  'alert-center': '/alerts',
  'live-feed': '/live-feed',
  'timeline': '/timeline',
  'evidence-vault': '/evidence',
  'correlation-engine': '/correlation'
};

function getInitialView(): string {
  const path = window.location.pathname.toLowerCase();
  return PATH_TO_VIEW[path] || 'landing';
}

export function App() {
  const [activeView, setActiveView] = useState<string>(getInitialView);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('ENTITY-0047');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-CHD-0047');
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string>('bc1q92fa8839dfca112048aaef82');
  const [selectedAlertId, setSelectedAlertId] = useState<string>('ALT-8841');

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportData, setReportData] = useState<any | null>(null);

  // Role & Demo state
  const [currentRole, setCurrentRole] = useState<string>('Investigator');
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);

  // Core Data Cache
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [liveFeed, setLiveFeed] = useState<TimelineEvent[]>([]);
  const [entities, setEntities] = useState<EntitySummary[]>([]);
  const [graphData, setGraphData] = useState<NetworkGraphData | null>(null);

  // Sync state with URL navigation
  const navigateTo = useCallback((view: string, updateUrl: boolean = true) => {
    const targetView = PATH_TO_VIEW[view] || view;
    setActiveView(targetView);
    if (updateUrl) {
      const targetPath = VIEW_TO_PATH[targetView] || `/${targetView}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: targetView }, '', targetPath);
      }
    }
  }, []);

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      const matchedView = PATH_TO_VIEW[currentPath] || 'landing';
      setActiveView(matchedView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initial data fetch
  useEffect(() => {
    const initApp = async () => {
      try {
        const [statsData, alertsData, feedData, entityData, gData] = await Promise.all([
          api.getStats(),
          api.getAlerts(),
          api.getLiveFeed(15),
          api.getEntities(),
          api.getNetworkGraph()
        ]);
        setStats(statsData);
        setAlerts(alertsData);
        setLiveFeed(feedData);
        setEntities(entityData);
        setGraphData(gData);
      } catch (err) {
        console.error('API Init Error:', err);
      }
    };
    initApp();
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Demo Tour step selection
  const handleSelectDemoStep = async (stepNum: number) => {
    setDemoStep(stepNum);
    const stepObj = DEMO_STEPS[stepNum - 1];
    if (!stepObj) return;

    if (stepObj.targetView === 'report-view' || stepObj.targetView === 'report-generation') {
      navigateTo('report-generation');
      return;
    }

    if (stepObj.entityId) setSelectedEntityId(stepObj.entityId);
    if (stepObj.caseId) setSelectedCaseId(stepObj.caseId);
    if (stepObj.walletAddress) setSelectedWalletAddress(stepObj.walletAddress);

    navigateTo(stepObj.targetView);
  };

  const handleStartDemoTour = () => {
    setIsDemoOpen(true);
    handleSelectDemoStep(1);
  };

  const handleSelectEntity = (id: string) => {
    setSelectedEntityId(id);
    navigateTo('entity-detail');
  };

  const handleSelectAlert = (id: string) => {
    setSelectedAlertId(id);
    navigateTo('alert-center');
  };

  const handleGenerateReport = async (caseId: string) => {
    setSelectedCaseId(caseId);
    navigateTo('report-generation');
  };

  // If on Landing Page (/), render full-screen standalone portal
  if (activeView === 'landing') {
    return (
      <LandingPageView
        onNavigate={navigateTo}
        onSelectEntity={handleSelectEntity}
        onStartDemoTour={handleStartDemoTour}
      />
    );
  }


  return (
    <div className="min-h-screen bg-[#06090F] text-slate-200 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        onSelectEntity={handleSelectEntity}
        activeView={activeView}
        onNavigate={navigateTo}
        isDemoOpen={isDemoOpen}
        onToggleDemo={() => setIsDemoOpen(!isDemoOpen)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={navigateTo}
          alertCount={alerts.length}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#06090F]">
          {/* 1. Home / Operations Hub: localhost:5173/home */}
          {(activeView === 'home' || activeView === 'command-center') && (
            <CommandCenter
              stats={stats}
              alerts={alerts}
              onNavigate={navigateTo}
              onSelectEntity={handleSelectEntity}
              onSelectAlert={handleSelectAlert}
            />
          )}

          {/* 2. Investigation Workspace: localhost:5173/investigation-panel */}
          {activeView === 'investigations' && (
            <InvestigationWorkspaceView
              initialCaseId={selectedCaseId}
              onGenerateReport={handleGenerateReport}
              onSelectEntity={handleSelectEntity}
              onNavigate={navigateTo}
            />
          )}

          {/* 3. Agents & Network Graph: localhost:5173/agents */}
          {(activeView === 'agents' || activeView === 'network-graph') && (
            <div className="space-y-4 font-mono max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
                    Agents & Network Intelligence Graph
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Multi-source Cytoscape.js correlation topology linking suspects, crypto wallets, and encrypted handles
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                    Target: INDRA_47 (87/100)
                  </span>
                </div>
              </div>
              <NetworkGraph
                graphData={graphData}
                onSelectEntity={handleSelectEntity}
                selectedEntityId={selectedEntityId}
              />
            </div>
          )}

          {/* 4. Report Generation Studio: localhost:5173/report-generation */}
          {activeView === 'report-generation' && (
            <ReportGenerationView
              initialCaseId={selectedCaseId}
              onNavigate={navigateTo}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 5. Dedicated Entity Directory: localhost:5173/entities */}
          {activeView === 'entity-intel' && (
            <EntityIntelligenceView
              entities={entities}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 6. Dedicated Entity 360 Profile: localhost:5173/entity-detail */}
          {activeView === 'entity-detail' && (
            <EntityProfileDetail
              entityId={selectedEntityId}
              onBack={() => navigateTo('entity-intel')}
              onNavigate={navigateTo}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 7. Dedicated Alert Center: localhost:5173/alerts */}
          {activeView === 'alert-center' && (
            <AlertCenterView
              onSelectAlert={setSelectedAlertId}
              onNavigate={navigateTo}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 8. Dedicated Drug Analytics: localhost:5173/drugs */}
          {activeView === 'drug-intel' && (
            <DrugIntelligenceView />
          )}

          {/* 9. Dedicated Cryptocurrency Tracker: localhost:5173/crypto */}
          {activeView === 'crypto-intel' && (
            <CryptoIntelligenceView
              initialWallet={selectedWalletAddress}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 10. Dedicated Encrypted Platforms: localhost:5173/comms */}
          {activeView === 'encrypted-platforms' && (
            <EncryptedPlatformView
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 11. Dedicated Live Intel Stream: localhost:5173/live-feed */}
          {activeView === 'live-feed' && (
            <LiveFeedView />
          )}

          {/* 12. Dedicated Timeline Escalation: localhost:5173/timeline */}
          {activeView === 'timeline' && (
            <TimelineView />
          )}

          {/* 13. Dedicated Evidence Vault: localhost:5173/evidence */}
          {activeView === 'evidence-vault' && (
            <EvidenceVaultView />
          )}

          {/* 14. Dedicated Correlation Rule Engine: localhost:5173/correlation */}
          {activeView === 'correlation-engine' && (
            <CorrelationSimulatorView />
          )}

          {/* 15. Audit Logs */}
          {activeView === 'audit-logs' && (
            <div className="p-8 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 max-w-2xl mx-auto text-center font-mono">
              <h2 className="text-base font-bold text-slate-100">Tamper-Evident System Audit Logs</h2>
              <p className="text-xs text-slate-400">
                WORM-compliant records capturing user logins, evidence hash verifications, and report generations.
              </p>
              <button
                onClick={() => setIsAuditOpen(true)}
                className="px-4 py-2 bg-cyan-600 font-bold text-slate-950 text-xs rounded-xl hover:bg-cyan-500 transition-colors"
              >
                Launch Audit Drawer Inspector
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEntity={handleSelectEntity}
        onNavigate={navigateTo}
      />

      {/* AI Investigator Assistant Drawer */}
      <AIInvestigatorAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onSelectEntity={handleSelectEntity}
      />

      {/* Audit Log Drawer */}
      <AuditLogDrawer
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      {/* Official Intelligence Dossier Report Modal */}
      <ReportViewerModal
        reportData={reportData}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
export default App;
