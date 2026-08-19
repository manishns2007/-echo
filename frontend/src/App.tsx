import React, { useState, useEffect } from 'react';
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

export function App() {
  const [activeView, setActiveView] = useState<string>('landing');
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

  // Initial load
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

    if (stepObj.targetView === 'report-view') {
      try {
        const rep = await api.getFormalReport(stepObj.caseId || 'CASE-CHD-0047');
        setReportData(rep);
        setIsReportOpen(true);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (stepObj.entityId) setSelectedEntityId(stepObj.entityId);
    if (stepObj.caseId) setSelectedCaseId(stepObj.caseId);
    if (stepObj.walletAddress) setSelectedWalletAddress(stepObj.walletAddress);

    setActiveView(stepObj.targetView);
  };

  const handleStartDemoTour = () => {
    setIsDemoOpen(true);
    handleSelectDemoStep(1);
  };

  const handleSelectEntity = (id: string) => {
    setSelectedEntityId(id);
    setActiveView('entity-detail');
  };

  const handleSelectAlert = (id: string) => {
    setSelectedAlertId(id);
    setActiveView('alert-center');
  };

  const handleGenerateReport = async (caseId: string) => {
    try {
      const rep = await api.getFormalReport(caseId);
      setReportData(rep);
      setIsReportOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B11] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Clean Top Navbar */}
      <Navbar
        stats={stats}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        onSelectEntity={handleSelectEntity}
        activeView={activeView}
        onNavigate={setActiveView}
        isDemoOpen={isDemoOpen}
        onToggleDemo={() => setIsDemoOpen(!isDemoOpen)}
      />

      {/* Optional Slim Demo Stepper */}
      <DemoTourBar
        currentStep={demoStep}
        onSelectStep={handleSelectDemoStep}
        isOpen={isDemoOpen}
        onToggle={() => setIsDemoOpen(false)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          alertCount={alerts.length}
        />

        {/* Main Dedicated Content View Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#070B11]">
          {/* 0. Landing Page / Options Hub */}
          {activeView === 'landing' && (
            <LandingPageView
              stats={stats}
              alerts={alerts}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
              onStartDemoTour={handleStartDemoTour}
              onOpenAssistant={() => setIsAssistantOpen(true)}
            />
          )}

          {/* 1. Home / Central Operations Hub */}
          {activeView === 'command-center' && (
            <CommandCenter
              stats={stats}
              alerts={alerts}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
              onSelectAlert={handleSelectAlert}
            />
          )}

          {/* 2. Dedicated Cytoscape Network Graph Page */}
          {activeView === 'network-graph' && (
            <div className="space-y-4 font-mono max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h1 className="text-xl font-bold text-slate-100 uppercase tracking-tight">
                    Network Intelligence Graph
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

          {/* 3. Dedicated Investigation Workspace Page */}
          {activeView === 'investigations' && (
            <InvestigationWorkspaceView
              initialCaseId={selectedCaseId}
              onGenerateReport={handleGenerateReport}
              onSelectEntity={handleSelectEntity}
              onNavigate={setActiveView}
            />
          )}

          {/* 4. Dedicated Entity Directory Page */}
          {activeView === 'entity-intel' && (
            <EntityIntelligenceView
              entities={entities}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 5. Dedicated Entity 360 Profile Page */}
          {activeView === 'entity-detail' && (
            <EntityProfileDetail
              entityId={selectedEntityId}
              onBack={() => setActiveView('entity-intel')}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 6. Dedicated Alert Center Page */}
          {activeView === 'alert-center' && (
            <AlertCenterView
              onSelectAlert={setSelectedAlertId}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 7. Dedicated Drug Analytics Page */}
          {activeView === 'drug-intel' && (
            <DrugIntelligenceView />
          )}

          {/* 8. Dedicated Cryptocurrency Tracker Page */}
          {activeView === 'crypto-intel' && (
            <CryptoIntelligenceView
              initialWallet={selectedWalletAddress}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 9. Dedicated Encrypted Platforms Page */}
          {activeView === 'encrypted-platforms' && (
            <EncryptedPlatformView
              onSelectEntity={handleSelectEntity}
            />
          )}

          {/* 10. Dedicated Live Intel Stream Page */}
          {activeView === 'live-feed' && (
            <LiveFeedView />
          )}

          {/* 11. Dedicated Timeline Escalation Page */}
          {activeView === 'timeline' && (
            <TimelineView />
          )}

          {/* 12. Dedicated Evidence Vault Page */}
          {activeView === 'evidence-vault' && (
            <EvidenceVaultView />
          )}

          {/* 13. Dedicated Correlation Rule Engine Page */}
          {activeView === 'correlation-engine' && (
            <CorrelationSimulatorView />
          )}

          {/* 14. Audit Logs */}
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
        onNavigate={setActiveView}
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
