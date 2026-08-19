import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  FileCheck, 
  ExternalLink, 
  X, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { api } from '../services/api';

interface AIInvestigatorAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (id: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  evidenceCitations?: string[];
  confidence?: number;
  targetEntity?: string;
}

export const AIInvestigatorAssistant: React.FC<AIInvestigatorAssistantProps> = ({
  isOpen,
  onClose,
  onSelectEntity
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Investigator Decision Support AI initialized. I am grounded strictly in synthetic records stored within this prototype environment. You can ask why entities are flagged, trace cryptocurrency correlations, or inspect case dossiers.",
      evidenceCitations: ["EVID-0001", "EVID-0012"]
    }
  ]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (questionText: string) => {
    if (!questionText.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: questionText };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await api.askAssistant(questionText);
      const assistantMsg: Message = {
        role: 'assistant',
        content: res.response,
        evidenceCitations: res.evidence_citations,
        confidence: res.confidence,
        targetEntity: res.target_entity
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Unable to query synthetic intelligence engine. Please check backend connection."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    "Why is INDRA_47 considered high risk?",
    "Trace wallet flows and precursor payouts for bc1q92fa...",
    "Summarize Case #CHD-DRUG-0047 objective and evidence"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#0A0F1A]/95 border-l border-cyan-800/60 backdrop-blur-xl shadow-2xl flex flex-col font-mono text-xs animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-100 flex items-center space-x-2">
              <span>AI INVESTIGATOR ASSISTANT</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                GROUNDED INTEL
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Explainable Decision Support with Verifiable Evidence</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[90%] rounded-xl p-3.5 leading-relaxed whitespace-pre-line text-xs ${
                m.role === 'user'
                  ? 'bg-cyan-600 text-slate-950 font-semibold'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md'
              }`}
            >
              {m.content}

              {/* Evidence Citations Chips */}
              {m.evidenceCitations && m.evidenceCitations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1.5">
                    Cited Evidence Records:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.evidenceCitations.map((evId) => (
                      <span
                        key={evId}
                        className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono"
                      >
                        <FileCheck className="w-3 h-3 text-cyan-400" />
                        <span>{evId}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono p-3 bg-slate-900/60 rounded-lg border border-slate-800">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Cross-referencing entity graph and evidence vault...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-1.5">
        <div className="text-[10px] uppercase text-slate-500 font-semibold">Suggested Questions:</div>
        <div className="flex flex-col space-y-1">
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(sq)}
              className="text-left text-[11px] text-slate-400 hover:text-cyan-300 hover:bg-slate-900 px-2 py-1 rounded transition-colors truncate border border-transparent hover:border-slate-800"
            >
              👉 {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(query);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask why an entity is flagged, trace wallets..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold rounded-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
