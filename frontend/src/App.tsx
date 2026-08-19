import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoTourBar, DEMO_STEPS } from './components/DemoTourBar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AIInvestigatorAssistant } from './components/AIInvestigatorAssistant';
import { AuditLogDrawer } from './components/AuditLogDrawer';
import { ReportViewerModal } from './components/ReportViewerModal';
import { NetworkGraph } from './components/NetworkGraph';

// Views
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
  const [activeView, setActiveView] = useState<string>('command-center');
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
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(true);

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
        onNavigate={setActiveView}
      />

      {/* 10-Step Interactive Demo Tour Stepper */}
      <DemoTourBar
        currentStep={demoStep}
        onSelectStep={handleSelectDemoStep}
        isOpen={isDemoOpen}
        onToggle={() => setIsDemoOpen(!isDemoOpen)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          alertCount={alerts.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#070B11]">
          {activeView === 'command-center' && (
            <CommandCenter
              stats={stats}
              alerts={alerts}
              liveFeed={liveFeed}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
              onSelectAlert={handleSelectAlert}
            />
          )}

          {activeView === 'live-feed' && (
            <LiveFeedView />
          )}

          {activeView === 'alert-center' && (
            <AlertCenterView
              onSelectAlert={setSelectedAlertId}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeView === 'drug-intel' && (
            <DrugIntelligenceView />
          )}

          {activeView === 'entity-intel' && (
            <EntityIntelligenceView
              entities={entities}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeView === 'entity-detail' && (
            <EntityProfileDetail
              entityId={selectedEntityId}
              onBack={() => setActiveView('entity-intel')}
              onNavigate={setActiveView}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeView === 'network-graph' && (
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-slate-100 uppercase tracking-tight">
                  Interactive Cytoscape Network Intelligence
                </h1>
                <span className="text-xs text-slate-400">
                  Target: {selectedEntityId} | 18 Suspect Nodes & Cross-Platform Edges
                </span>
              </div>
              <NetworkGraph
                graphData={graphData}
                onSelectEntity={handleSelectEntity}
                selectedEntityId={selectedEntityId}
              />
            </div>
          )}

          {activeView === 'crypto-intel' && (
            <CryptoIntelligenceView
              initialWallet={selectedWalletAddress}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeView === 'encrypted-platforms' && (
            <EncryptedPlatformView
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeView === 'investigations' && (
            <InvestigationWorkspaceView
              initialCaseId={selectedCaseId}
              onGenerateReport={handleGenerateReport}
              onSelectEntity={handleSelectEntity}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'timeline' && (
            <TimelineView />
          )}

          {activeView === 'evidence-vault' && (
            <EvidenceVaultView />
          )}

          {activeView === 'correlation-engine' && (
            <CorrelationSimulatorView />
          )}

          {activeView === 'audit-logs' && (
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h2 className="text-sm font-bold text-slate-100 font-mono mb-4">Tamper-Evident System Audit Logs</h2>
              <button
                onClick={() => setIsAuditOpen(true)}
                className="px-4 py-2 bg-cyan-600 font-bold text-slate-950 font-mono text-xs rounded-lg"
              >
                Open Full Audit Drawer
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
