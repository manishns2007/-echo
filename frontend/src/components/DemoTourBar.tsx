import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap,
  X
} from 'lucide-react';

export interface DemoStep {
  stepNumber: number;
  title: string;
  actionDesc: string;
  targetView: string;
  entityId?: string;
  caseId?: string;
  alertId?: string;
  walletAddress?: string;
}

interface DemoTourBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: "1. Command Center",
    actionDesc: "Executive overview of threat level, 6 core intelligence modules, and live operations.",
    targetView: "command-center"
  },
  {
    stepNumber: 2,
    title: "2. Alert Triage",
    actionDesc: "Triage Alert ALT-8841: 'Cross-platform identity correlation detected: INDRA_47'.",
    targetView: "alert-center",
    alertId: "ALT-8841"
  },
  {
    stepNumber: 3,
    title: "3. Target INDRA_47",
    actionDesc: "Inspect 360° Profile for primary suspect INDRA_47 across 6 dedicated tabs.",
    targetView: "entity-detail",
    entityId: "ENTITY-0047"
  },
  {
    stepNumber: 4,
    title: "4. Explainable Risk (87/100)",
    actionDesc: "Review transparent contributing risk factors and deterministic match signals (+30 alias, +30 wallet, +25 comms).",
    targetView: "entity-detail",
    entityId: "ENTITY-0047"
  },
  {
    stepNumber: 5,
    title: "5. Cytoscape Network",
    actionDesc: "Inspect dedicated full-canvas graph linking INDRA_47 to wallets, comms, listings & VIPER_CORP.",
    targetView: "network-graph",
    entityId: "ENTITY-0047"
  },
  {
    stepNumber: 6,
    title: "6. Wallet Intelligence",
    actionDesc: "Trace primary Bitcoin wallet bc1q92fa... and 3.45 BTC precursor settlements.",
    targetView: "crypto-intel",
    walletAddress: "bc1q92fa8839dfca112048aaef82"
  },
  {
    stepNumber: 7,
    title: "7. Investigation Timeline",
    actionDesc: "Review chronological escalation from first darknet post to CRITICAL threat.",
    targetView: "timeline"
  },
  {
    stepNumber: 8,
    title: "8. Case Workspace (CHD-0047)",
    actionDesc: "Open dedicated investigation workspace with 19 digital exhibits and syndicate targets.",
    targetView: "investigations",
    caseId: "CASE-CHD-0047"
  },
  {
    stepNumber: 9,
    title: "9. Generate Report",
    actionDesc: "Compile formal 10-section intelligence dossier with SHA-256 evidence citations.",
    targetView: "investigations",
    caseId: "CASE-CHD-0047"
  },
  {
    stepNumber: 10,
    title: "10. Executive Dossier",
    actionDesc: "Review final official police intelligence summary ready for leadership review.",
    targetView: "report-view",
    caseId: "CASE-CHD-0047"
  }
];

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  currentStep,
  onSelectStep,
  isOpen,
  onToggle
}) => {
  if (!isOpen) return null;

  const activeStepObj = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];

  return (
    <div className="bg-[#090F1C] border-b border-cyan-900/60 px-6 py-2 shadow-xl sticky top-16 z-30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
      {/* Step Info */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/50 text-cyan-300">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-bold text-[11px]">JURY DEMO STEP {currentStep}/10</span>
        </div>

        <div className="text-slate-300 truncate max-w-lg hidden lg:block">
          <span className="font-semibold text-cyan-300">{activeStepObj.title}: </span>
          <span className="text-slate-400 text-[11px]">{activeStepObj.actionDesc}</span>
        </div>
      </div>

      {/* Stepper Pills */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-full pb-0.5">
        {DEMO_STEPS.map((s) => {
          const isCurrent = s.stepNumber === currentStep;
          return (
            <button
              key={s.stepNumber}
              onClick={() => onSelectStep(s.stepNumber)}
              title={`${s.title}: ${s.actionDesc}`}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all whitespace-nowrap ${
                isCurrent
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {s.stepNumber}
            </button>
          );
        })}
      </div>

      {/* Nav Controls */}
      <div className="flex items-center space-x-1.5">
        <button
          disabled={currentStep <= 1}
          onClick={() => onSelectStep(currentStep - 1)}
          className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          disabled={currentStep >= 10}
          onClick={() => onSelectStep(currentStep + 1)}
          className="flex items-center space-x-1 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold disabled:opacity-40 text-xs"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggle}
          className="p-1 text-slate-400 hover:text-slate-200 ml-1"
          title="Close Tour Bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
