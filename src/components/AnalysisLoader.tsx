'use client';

import React, { useEffect, useState } from 'react';
import { ScenarioProfile } from '@/data/scenarios';

const STEPS = [
  { label: 'Analyzing Infrastructure...', duration: 500 },
  { label: 'Evaluating Carbon Impact...', duration: 550 },
  { label: 'Generating Recommendations...', duration: 500 },
  { label: 'Calculating Sustainability Score...', duration: 550 },
  { label: 'Building Dashboard...', duration: 400 },
];

interface AnalysisLoaderProps {
  scenario: ScenarioProfile;
  onComplete: () => void;
}

export function AnalysisLoader({ scenario, onComplete }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    let elapsed = 0;
    const total = STEPS.reduce((s, step) => s + step.duration, 0);

    function runStep() {
      if (stepIndex >= STEPS.length) {
        setProgress(100);
        setTimeout(onComplete, 200);
        return;
      }
      setCurrentStep(stepIndex);
      const stepDuration = STEPS[stepIndex].duration;
      const startElapsed = elapsed;
      const start = performance.now();

      function tick() {
        const now = performance.now();
        const stepElapsed = Math.min(now - start, stepDuration);
        const pct = Math.round(((startElapsed + stepElapsed) / total) * 100);
        setProgress(pct);

        if (stepElapsed < stepDuration) {
          requestAnimationFrame(tick);
        } else {
          elapsed += stepDuration;
          stepIndex++;
          runStep();
        }
      }
      requestAnimationFrame(tick);
    }

    runStep();
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">{scenario.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Assessing {scenario.name}
          </h2>
          <p className="text-slate-400 text-sm">
            Running Shift-Left Sustainability Analysis
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm p-8">
          <div className="space-y-4 mb-8">
            {STEPS.map((step, index) => (
              <StepRow
                key={step.label}
                label={step.label}
                state={
                  index < currentStep
                    ? 'done'
                    : index === currentStep
                    ? 'active'
                    : 'pending'
                }
              />
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Powered by GreenOps AI Sustainability Engine
        </p>
      </div>
    </div>
  );
}

function StepRow({ label, state }: { label: string; state: 'pending' | 'active' | 'done' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {state === 'done' && (
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {state === 'active' && (
          <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        )}
        {state === 'pending' && (
          <div className="w-3 h-3 rounded-full bg-slate-700" />
        )}
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          state === 'done'
            ? 'text-emerald-400'
            : state === 'active'
            ? 'text-white'
            : 'text-slate-600'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
