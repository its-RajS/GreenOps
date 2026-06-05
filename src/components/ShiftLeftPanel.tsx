'use client';

import React from 'react';
import { Zap, TrendingUp, AlertTriangle, DollarSign, Leaf, ChevronRight } from 'lucide-react';

interface ShiftLeftData {
  score: string;
  value: number;
  projectedScore: string;
  projectedValue: number;
  risk: string;
  riskColor: string;
  projectedSavings: string;
  projectedCarbonReduction: string;
  findings: Array<{
    severity: string;
    title: string;
    description: string;
    impact: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    priority: string;
    savings: string;
    carbonReduction: string;
    scoreIncrease: number;
  }>;
  executiveSummary: {
    currentStatus: string;
    keyFindings: string[];
    immediateActions: string[];
    expectedOutcome: string;
  };
}

interface ShiftLeftPanelProps {
  data: ShiftLeftData;
}

const GRADE_COLORS: Record<string, string> = {
  A: 'text-emerald-400',
  B: 'text-blue-400',
  C: 'text-violet-400',
  D: 'text-orange-400',
  F: 'text-rose-400',
};

const GRADE_BG: Record<string, string> = {
  A: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
  B: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
  C: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
  D: 'from-orange-500/20 to-amber-500/10 border-orange-500/30',
  F: 'from-rose-500/20 to-red-500/10 border-rose-500/30',
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  high: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  medium: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
};

export function ShiftLeftPanel({ data }: ShiftLeftPanelProps) {
  const scoreColor = GRADE_COLORS[data.score] || 'text-slate-400';
  const scoreBg = GRADE_BG[data.score] || '';
  const projColor = GRADE_COLORS[data.projectedScore] || 'text-slate-400';

  return (
    <div className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-800/30 p-6 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Zap className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Shift-Left Sustainability Analysis</h3>
          <p className="text-xs text-slate-500">AI-powered infrastructure sustainability intelligence</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreBox label="Current Score" grade={data.score} value={data.value} color={scoreColor} bg={scoreBg} />
        <ScoreBox label="Projected Score" grade={data.projectedScore} value={data.projectedValue} color={projColor} bg={GRADE_BG[data.projectedScore] || ''} />
        <MetricBox
          icon={<DollarSign className="h-4 w-4 text-emerald-400" />}
          label="Potential Savings"
          value={data.projectedSavings}
          valueColor="text-emerald-300"
        />
        <MetricBox
          icon={<Leaf className="h-4 w-4 text-teal-400" />}
          label="Carbon Reduction"
          value={data.projectedCarbonReduction}
          valueColor="text-teal-300"
        />
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" style={{ color: data.riskColor }} />
        <div className="flex-1 min-w-0">
          <span className="text-xs text-slate-500 block mb-0.5">Carbon Risk Level</span>
          <span className="font-semibold text-sm text-white">{data.risk}</span>
        </div>
        <TrendingUp className="h-4 w-4 text-slate-500" />
        <div className="text-right">
          <span className="text-xs text-slate-500 block mb-0.5">Score Gain</span>
          <span className="font-semibold text-sm text-emerald-400">
            +{data.projectedValue - data.value} pts
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/20">
        <p className="text-xs text-slate-500 mb-1">Executive Summary</p>
        <p className="text-sm text-slate-300 leading-relaxed">{data.executiveSummary.currentStatus}</p>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{data.executiveSummary.expectedOutcome}</p>
      </div>

      {data.findings.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            Top Findings
          </h4>
          <div className="space-y-2">
            {data.findings.slice(0, 3).map((finding, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border text-xs ${SEVERITY_COLORS[finding.severity] || 'bg-slate-700/30 border-slate-700/50 text-slate-400'}`}
              >
                <span className="uppercase font-bold tracking-wider mt-0.5 flex-shrink-0">
                  {finding.severity}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm">{finding.title}</p>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">{finding.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            Improvement Opportunities
          </h4>
          <div className="space-y-2">
            {data.recommendations.map((rec) => (
              <div key={rec.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/30">
                <ChevronRight className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{rec.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{rec.savings} · {rec.carbonReduction}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rec.priority === 'High' ? 'bg-orange-500/10 text-orange-400' : rec.priority === 'Medium' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-700/50 text-slate-400'}`}>
                  {rec.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreBox({ label, grade, value, color, bg }: { label: string; grade: string; value: number; color: string; bg: string }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br ${bg} border p-4 text-center`}>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <span className={`text-4xl font-black ${color}`}>{grade}</span>
      <span className="text-xs text-slate-500 mt-1">{value}/100</span>
    </div>
  );
}

function MetricBox({ icon, label, value, valueColor }: { icon: React.ReactNode; label: string; value: string; valueColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/30 p-4 text-center">
      <div className="mb-1">{icon}</div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <span className={`text-lg font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}
