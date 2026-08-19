import React from 'react';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  RotateCcw,
  Zap
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
    actionDesc: "Display threat level, 7 high-risk alerts, 63 entities, 21 wallets, 12 cases & live feed.",
    targetView: "command-center"
  },
  {
    stepNumber: 2,
    title: "2. High-Risk Alert",
    actionDesc: "Triage Alert ALT-8841: 'Cross-platform identity correlation detected'.",
    targetView: "alert-center",
    alertId: "ALT-8841"
  },
  {
    stepNumber: 3,
    title: "3. Target: INDRA_47",
    actionDesc: "Open Entity Profile for primary suspect INDRA_47 with 6 inspection tabs.",
    targetView: "entity-detail",
    entityId: "ENTITY-0047"
  },
  {
    stepNumber: 4,
    title: "4. Explainable Risk (87/100)",
    actionDesc: "Inspect transparent contributing risk factors & match signals with confidence scores.",
    targetView: "entity-detail",
    entityId: "ENTITY-0047"
  },
  {
    stepNumber: 5,
    title: "5. Cytoscape Network",
    actionDesc: "Inspect interactive multi-source graph linking suspect, comms (@indra_ops), listings & markets.",
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
    title: "7. Network Timeline",
    actionDesc: "Review multi-source chronological escalation from first darknet post to CRITICAL threat.",
    targetView: "timeline"
  },
  {
    stepNumber: 8,
    title: "8. Case CHD-DRUG-0047",
    actionDesc: "Open active investigation case folder with 8 tabs, 19 exhibits, and syndicate targets.",
    targetView: "investigations",
    caseId: "CASE-CHD-0047"
  },
  {
    stepNumber: 9,
    title: "9. Generate Report",
    actionDesc: "Trigger formal intelligence dossier generation with SHA-256 evidence citations.",
    targetView: "investigations",
    caseId: "CASE-CHD-0047"
  },
  {
    stepNumber: 10,
    title: "10. Executive Summary",
    actionDesc: "Present final multi-source intelligence report ready for senior police leadership.",
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
  const activeStepObj = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-mono text-xs font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all border border-cyan-400/40 animate-pulse-subtle"
      >
        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
        <span>Launch 10-Step Hackathon Demo Tour (3–5 min)</span>
      </button>
    );
  }

  return (
    <div className="bg-[#0B111D] border-b border-cyan-900/60 px-4 py-2.5 shadow-xl sticky top-16 z-30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
      {/* Header / Info */}
      <div className="flex items-center space-x-3 w-full md:w-auto">
        <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="font-bold">JURY DEMO STEPPER</span>
          <span className="bg-cyan-900/80 text-white text-[10px] px-1.5 py-0.2 rounded ml-1">
            {currentStep}/10
          </span>
        </div>

        <div className="hidden lg:block text-slate-300 truncate max-w-md">
          <span className="font-semibold text-cyan-300">{activeStepObj.title}: </span>
          <span className="text-slate-400 text-[11px]">{activeStepObj.actionDesc}</span>
        </div>
      </div>

      {/* Stepper Buttons (1 to 10) */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-full pb-1 md:pb-0">
        {DEMO_STEPS.map((s) => {
          const isCurrent = s.stepNumber === currentStep;
          const isPassed = s.stepNumber < currentStep;
          return (
            <button
              key={s.stepNumber}
              onClick={() => onSelectStep(s.stepNumber)}
              title={`${s.title}: ${s.actionDesc}`}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-mono transition-all whitespace-nowrap ${
                isCurrent
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-105'
                  : isPassed
                  ? 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  : 'bg-slate-900/60 text-slate-500 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <span>{s.stepNumber}</span>
              <span className="hidden xl:inline text-[10px]">{s.title.split('.')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        <button
          disabled={currentStep <= 1}
          onClick={() => onSelectStep(currentStep - 1)}
          className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900"
          title="Previous Step"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          disabled={currentStep >= 10}
          onClick={() => onSelectStep(currentStep + 1)}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold disabled:opacity-40"
          title="Next Step"
        >
          <span>Next Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggle}
          className="text-slate-400 hover:text-slate-200 px-1.5 py-1 text-[11px]"
          title="Hide Stepper"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
