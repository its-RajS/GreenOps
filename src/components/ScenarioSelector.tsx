'use client';

import React from 'react';
import { scenarios, ScenarioProfile } from '@/data/scenarios';
import { Leaf, DollarSign, Server, Zap, CheckCircle } from 'lucide-react';

interface ScenarioSelectorProps {
  onSelect: (scenario: ScenarioProfile) => void;
}

function getBadgeColor(id: string) {
  const map: Record<string, string> = {
    startup: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
    saas: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300',
    ecommerce: 'from-violet-500/20 to-purple-500/20 border-violet-500/40 text-violet-300',
    enterprise: 'from-orange-500/20 to-amber-500/20 border-orange-500/40 text-orange-300',
    'ai-platform': 'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300',
  };
  return map[id] || 'from-slate-500/20 to-slate-600/20 border-slate-500/40 text-slate-300';
}

function getGlowColor(id: string) {
  const map: Record<string, string> = {
    startup: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    saas: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    ecommerce: 'hover:border-violet-500/50 hover:shadow-violet-500/10',
    enterprise: 'hover:border-orange-500/50 hover:shadow-orange-500/10',
    'ai-platform': 'hover:border-rose-500/50 hover:shadow-rose-500/10',
  };
  return map[id] || 'hover:border-slate-500/50';
}

function getButtonGradient(id: string) {
  const map: Record<string, string> = {
    startup: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    saas: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500',
    ecommerce: 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500',
    enterprise: 'from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500',
    'ai-platform': 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
  };
  return map[id] || 'from-slate-600 to-slate-700';
}

function getScoreColor(emission: number) {
  if (emission <= 50) return 'text-emerald-400';
  if (emission <= 100) return 'text-blue-400';
  if (emission <= 140) return 'text-violet-400';
  if (emission <= 200) return 'text-orange-400';
  return 'text-rose-400';
}

export function ScenarioSelector({ onSelect }: ScenarioSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="text-center mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          Shift-Left Sustainability Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Choose Your Infrastructure{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Scenario
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Select your company profile and GreenOps AI will perform a real-time sustainability
          assessment of your cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            badgeColor={getBadgeColor(scenario.id)}
            glowColor={getGlowColor(scenario.id)}
            buttonGradient={getButtonGradient(scenario.id)}
            scoreColor={getScoreColor(scenario.monthlyCarbonEmission)}
            onSelect={onSelect}
          />
        ))}
      </div>

      <p className="mt-12 text-slate-500 text-sm text-center">
        No authentication required · Analysis runs in under 3 seconds · Powered by GreenOps AI
      </p>
    </div>
  );
}

interface ScenarioCardProps {
  scenario: ScenarioProfile;
  badgeColor: string;
  glowColor: string;
  buttonGradient: string;
  scoreColor: string;
  onSelect: (scenario: ScenarioProfile) => void;
}

function ScenarioCard({ scenario, badgeColor, glowColor, buttonGradient, scoreColor, onSelect }: ScenarioCardProps) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-2xl ${glowColor} cursor-pointer`}
      onClick={() => onSelect(scenario)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${badgeColor} border text-xs font-semibold uppercase tracking-wider`}>
          <span>{scenario.icon}</span>
          {scenario.name}
        </div>
        {scenario.renewableRegion && (
          <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-1">
            <Leaf className="h-3 w-3" />
            Green
          </div>
        )}
      </div>

      <p className="text-slate-400 text-sm mb-6 leading-relaxed">{scenario.tagline}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatBox
          icon={<Leaf className="h-4 w-4 text-emerald-400" />}
          label="Carbon / mo"
          value={`${scenario.monthlyCarbonEmission} Kg`}
          valueColor={scoreColor}
        />
        <StatBox
          icon={<DollarSign className="h-4 w-4 text-blue-400" />}
          label="Cloud Cost"
          value={`₹${(scenario.monthlyCloudCost / 1000).toFixed(1)}K`}
          valueColor="text-blue-300"
        />
        <StatBox
          icon={<Server className="h-4 w-4 text-violet-400" />}
          label="Instances"
          value={`${scenario.instances} nodes`}
          valueColor="text-violet-300"
        />
        <StatBox
          icon={<Zap className="h-4 w-4 text-amber-400" />}
          label="CPU Util"
          value={`${scenario.cpuUtilization}%`}
          valueColor="text-amber-300"
        />
      </div>

      <div className="flex flex-col gap-1.5 mb-6">
        <FeatureRow label="Auto-scaling" enabled={scenario.autoscaling} />
        <FeatureRow label="Renewable Region" enabled={scenario.renewableRegion} />
        <FeatureRow label={`${scenario.databaseInstances} Database instance${scenario.databaseInstances !== 1 ? 's' : ''}`} enabled={true} neutral />
      </div>

      <button
        className={`mt-auto w-full py-3 px-4 rounded-xl bg-gradient-to-r ${buttonGradient} text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0`}
        onClick={(e) => { e.stopPropagation(); onSelect(scenario); }}
      >
        Analyze This Scenario →
      </button>
    </div>
  );
}

function StatBox({ icon, label, value, valueColor }: { icon: React.ReactNode; label: string; value: string; valueColor: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-slate-800/50 border border-slate-700/30 p-3">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        {icon}
        {label}
      </div>
      <span className={`font-bold text-sm ${valueColor}`}>{value}</span>
    </div>
  );
}

function FeatureRow({ label, enabled, neutral }: { label: string; enabled: boolean; neutral?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <CheckCircle className={`h-3.5 w-3.5 flex-shrink-0 ${neutral ? 'text-slate-400' : enabled ? 'text-emerald-400' : 'text-slate-600'}`} />
      <span className={neutral ? 'text-slate-400' : enabled ? 'text-slate-300' : 'text-slate-600 line-through'}>
        {label}
      </span>
    </div>
  );
}
