'use client';

import { useState, useCallback } from 'react';
import { Leaf, DollarSign, TrendingUp, Award, RefreshCw } from 'lucide-react';
import {
  KpiCard,
  CarbonTrendChart,
  ServiceBreakdownChart,
  AIInsightsCard,
  RecommendationCard,
  ScenarioSelector,
  AnalysisLoader,
  ShiftLeftPanel,
} from '@/components';
import { ScenarioProfile } from '@/data/scenarios';
import { formatNumber, formatCurrency } from '@/utils/formatters';

type ViewState = 'select' | 'analyzing' | 'dashboard';

interface AnalysisResult {
  scenario: {
    id: string;
    name: string;
    instances: number;
    storageGb: number;
    cpuUtilization: number;
    autoscaling: boolean;
    renewableRegion: boolean;
  };
  greenScore: {
    score: string;
    scoreValue: number;
  };
  shiftLeft: {
    score: string;
    value: number;
    projectedScore: string;
    projectedValue: number;
    risk: string;
    riskColor: string;
    projectedSavings: string;
    projectedCarbonReduction: string;
    findings: Array<{ severity: string; title: string; description: string; impact: string }>;
    recommendations: Array<{ id: string; title: string; priority: string; savings: string; carbonReduction: string; scoreIncrease: number }>;
    executiveSummary: { currentStatus: string; keyFindings: string[]; immediateActions: string[]; expectedOutcome: string };
  };
  recommendations: Array<{ id: string; title: string; description: string; impact: string; savings: string; carbonReduction: string; priority: 'High' | 'Medium' | 'Low' }>;
  dashboardMetrics: {
    totalCarbon: number;
    cloudCost: number;
    predictedCarbon: number;
    greenScore: string;
    monthlyCarbonData: Array<{ month: string; co2: number }>;
    serviceBreakdown: Array<{ name: string; value: number; percentage: number }>;
    aiInsight: { title: string; message: string; suggestion: string; severity: string };
  };
  forecast: {
    forecast: number[];
    confidence: number;
    months: string[];
  };
}

export default function Dashboard() {
  const [view, setView] = useState<ViewState>('select');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioProfile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleScenarioSelect = useCallback((scenario: ScenarioProfile) => {
    setSelectedScenario(scenario);
    setFetchError(null);
    setView('analyzing');

    fetch('/api/shift-left/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenarioId: scenario.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysisResult(data);
      })
      .catch(() => {
        setFetchError('Analysis failed. Please try again.');
        setView('select');
      });
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    if (fetchError) {
      setView('select');
    } else if (analysisResult) {
      setView('dashboard');
    }
  }, [analysisResult, fetchError]);

  const handleReset = useCallback(() => {
    setView('select');
    setSelectedScenario(null);
    setAnalysisResult(null);
    setFetchError(null);
  }, []);

  if (view === 'select') {
    return <ScenarioSelector onSelect={handleScenarioSelect} />;
  }

  if (view === 'analyzing' && selectedScenario) {
    return (
      <AnalysisLoader
        scenario={selectedScenario}
        onComplete={handleAnalysisComplete}
      />
    );
  }

  if (!analysisResult) return null;

  const d = analysisResult.dashboardMetrics;
  const aiInsight = d.aiInsight as { title: string; message: string; suggestion: string; severity: 'high' | 'medium' | 'low' };

  return (
    <div className="flex-1 p-8 lg:p-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{selectedScenario?.icon}</span>
            <h1 className="text-3xl font-bold text-white">{analysisResult.scenario.name} Dashboard</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Shift-Left sustainability assessment · {analysisResult.scenario.instances} instances ·{' '}
            {analysisResult.scenario.cpuUtilization}% CPU · {analysisResult.scenario.renewableRegion ? 'Renewable region' : 'Standard region'}
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700/50 bg-slate-800/40 text-slate-400 hover:text-white hover:border-emerald-500/40 transition-all text-sm font-medium"
        >
          <RefreshCw className="h-4 w-4" />
          Change Scenario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total Carbon Emissions"
          value={`${formatNumber(d.totalCarbon)} Kg CO₂`}
          icon={Leaf}
          trend={8}
          trendPositive={false}
        />
        <KpiCard
          title="Cloud Cost"
          value={formatCurrency(d.cloudCost)}
          icon={DollarSign}
          trend={5}
          trendPositive={true}
        />
        <KpiCard
          title="Predicted Next Month"
          value={`${formatNumber(d.predictedCarbon)} Kg CO₂`}
          icon={TrendingUp}
          subtitle="AI Forecast"
        />
        <KpiCard
          title="Green Score"
          value={d.greenScore}
          icon={Award}
          subtitle="Overall Rating"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <CarbonTrendChart data={d.monthlyCarbonData} forecastData={analysisResult.forecast} />
        </div>
        <ServiceBreakdownChart data={d.serviceBreakdown} />
      </div>

      <div className="mb-8">
        <ShiftLeftPanel data={analysisResult.shiftLeft} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <AIInsightsCard insight={aiInsight} />
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Recommendations</h3>
            <div className="space-y-4">
              {analysisResult.recommendations.slice(0, 3).map((rec) => (
                <div key={rec.id} className="pb-4 border-b border-slate-700/30 last:border-0">
                  <RecommendationCard recommendation={rec} />
                </div>
              ))}
              {analysisResult.recommendations.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-4">
                  Excellent posture — no critical recommendations at this time.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Sustainability Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">Shift-Left Score</p>
            <p className="text-2xl font-bold text-white">
              {analysisResult.shiftLeft.score}
              <span className="text-lg text-slate-400 ml-1">({analysisResult.shiftLeft.value}/100)</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">{analysisResult.shiftLeft.risk}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Projected After Fix</p>
            <p className="text-2xl font-bold text-emerald-400">
              {analysisResult.shiftLeft.projectedScore}
              <span className="text-lg text-slate-400 ml-1">({analysisResult.shiftLeft.projectedValue}/100)</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">Potential score</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Carbon Reduction Potential</p>
            <p className="text-2xl font-bold text-teal-400">{analysisResult.shiftLeft.projectedCarbonReduction}</p>
            <p className="text-xs text-slate-500 mt-1">{analysisResult.shiftLeft.projectedSavings} savings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
